import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULTS = {
  stromArbeitspreisHaushalt:   18.84,
  stromGrundpreisHaushalt:      5.64,
  gasArbeitspreisHaushalt:      9.48,
  gasGrundpreisHaushalt:        7.19,
  neukundenBonusMonate:         2,
  preisgarantieMonate:         12,
  bindungMonate:               12,

  // Anbieter — Admin verwaltet Platzierung, Preise, Sichtbarkeit
  // platz: 1/2/3 = Platzierung im Rechner; 0 = nicht anzeigen
  // istOptivaro: true = das ist unser eigener Tarif
  anbieter: [
    { id: 1, name: 'VERBUND Energy',     stromCt: 18.84, gasCt:  9.48, grundpreisStrom: 5.64, grundpreisGas: 7.19, platz: 1, sichtbar: true, istOptivaro: true,  logo: '⚡', farbe: '#2a7d5a' },
    { id: 2, name: 'Wien Energie',        stromCt: 27.20, gasCt: 13.10, grundpreisStrom: 6.50, grundpreisGas: 8.20, platz: 2, sichtbar: true, istOptivaro: false, logo: '🏙️', farbe: '#1a5fa8' },
    { id: 3, name: 'EVN',                 stromCt: 26.80, gasCt: 12.90, grundpreisStrom: 6.20, grundpreisGas: 7.90, platz: 3, sichtbar: true, istOptivaro: false, logo: '🔵', farbe: '#003d7a' },
    { id: 4, name: 'KELAG',               stromCt: 27.80, gasCt: 13.40, grundpreisStrom: 6.80, grundpreisGas: 8.50, platz: 0, sichtbar: false, istOptivaro: false, logo: '🟠', farbe: '#e05a00' },
    { id: 5, name: 'Energie AG OÖ',       stromCt: 25.90, gasCt: 12.60, grundpreisStrom: 6.10, grundpreisGas: 7.80, platz: 0, sichtbar: false, istOptivaro: false, logo: '🟢', farbe: '#2d8a4e' },
    { id: 6, name: 'Salzburg AG',         stromCt: 26.10, gasCt: 12.40, grundpreisStrom: 6.00, grundpreisGas: 7.60, platz: 0, sichtbar: false, istOptivaro: false, logo: '🔴', farbe: '#c0392b' },
    { id: 7, name: 'Energie Steiermark',  stromCt: 27.50, gasCt: 13.20, grundpreisStrom: 6.60, grundpreisGas: 8.30, platz: 0, sichtbar: false, istOptivaro: false, logo: '⚪', farbe: '#555' },
  ],

  // PLZ → Netzbetreiber Mapping (erweiterbar im Admin)
  netzbetreiber: [
    { plzVon: 1010, plzBis: 1230, name: 'Wiener Netze GmbH' },
    { plzVon: 2000, plzBis: 2999, name: 'EVN Netz GmbH' },
    { plzVon: 3000, plzBis: 3999, name: 'EVN Netz GmbH' },
    { plzVon: 4000, plzBis: 4999, name: 'Netz OÖ GmbH' },
    { plzVon: 5000, plzBis: 5999, name: 'Salzburg Netz GmbH' },
    { plzVon: 6000, plzBis: 6999, name: 'Vorarlberger Energienetze GmbH' },
    { plzVon: 7000, plzBis: 7999, name: 'Netz Burgenland GmbH' },
    { plzVon: 8000, plzBis: 8999, name: 'Energie Steiermark Netz GmbH' },
    { plzVon: 9000, plzBis: 9999, name: 'KELAG-Kärntner Elektrizitäts-AG' },
  ],

  reviews: [],
}

export const useSettingsStore = defineStore('settings', () => {
  let initialData = { ...DEFAULTS }
  try {
    const raw = localStorage.getItem('ov_settings')
    if (raw) {
      const saved = JSON.parse(raw)
      initialData = { ...DEFAULTS, ...saved }
      // Always use fresh anbieter structure if saved version is missing new fields
      if (!saved.anbieter || !saved.anbieter[0]?.grundpreisStrom) {
        initialData.anbieter = DEFAULTS.anbieter
      }
      if (!saved.netzbetreiber) {
        initialData.netzbetreiber = DEFAULTS.netzbetreiber
      }
    }
  } catch(e) {
    console.warn('Settings parse error, using defaults:', e)
    initialData = { ...DEFAULTS }
  }
  const data = ref(initialData)

  function save() {
    localStorage.setItem('ov_settings', JSON.stringify(data.value))
  }
  function update(key, val) { data.value[key] = val; save() }
  function updateAll(obj)   { Object.assign(data.value, obj); save() }

  function addReview(r) {
    if (!data.value.reviews) data.value.reviews = []
    data.value.reviews.unshift({ id: Date.now(), ...r, date: new Date().toISOString() })
    save()
  }
  function deleteReview(id) {
    data.value.reviews = data.value.reviews.filter(r => r.id !== id); save()
  }

  // Anbieter die im Rechner angezeigt werden (platz > 0, sichtbar), sortiert nach platz
  function getAktiveAnbieter() {
    return [...(data.value.anbieter || [])]
      .filter(a => a.sichtbar && a.platz > 0)
      .sort((a, b) => a.platz - b.platz)
  }

  // Netzbetreiber anhand PLZ ermitteln
  function getNetzbetreiberByPlz(plz) {
    const p = parseInt(plz)
    if (isNaN(p)) return ''
    const match = (data.value.netzbetreiber || []).find(n => p >= n.plzVon && p <= n.plzBis)
    return match ? match.name : ''
  }

  // Jahreskosten berechnen
  function calcJahrKosten(kwh, typ, anbieter) {
    const ct = typ === 'strom' ? anbieter.stromCt : anbieter.gasCt
    const gp = typ === 'strom' ? anbieter.grundpreisStrom : anbieter.grundpreisGas
    return Math.round(kwh * ct / 100 + gp * 12)
  }

  return {
    data, update, updateAll, save,
    addReview, deleteReview,
    getAktiveAnbieter, getNetzbetreiberByPlz, calcJahrKosten,
  }
})
