<template>
  <div class="rechner-page">
    <div class="rp-inner">

      <div class="rp-header fade-up">
        <p class="sec-label">Tarifrechner</p>
        <h1 class="rp-title">Wie viel können Sie sparen?</h1>
        <p class="rp-desc">Geben Sie Ihren Jahresverbrauch ein — wir zeigen Ihnen sofort die günstigsten Anbieter in Ihrer Region.</p>
      </div>

      <div class="calc-card fade-up">

        <!-- Energie Typ -->
        <div class="typ-toggle">
          <button :class="['typ-btn', typ==='strom' && 'on']" @click="typ='strom'; reset()">⚡ Strom</button>
          <button :class="['typ-btn', typ==='gas'   && 'on']" @click="typ='gas';   reset()">🔥 Gas</button>
        </div>

        <!-- PLZ für Netzbetreiber -->
        <div class="input-group">
          <label class="inp-label">Ihre Postleitzahl <span class="inp-hint">(für Netzbetreiber-Erkennung)</span></label>
          <div class="plz-row">
            <input class="calc-input plz-input" v-model="plz" placeholder="z.B. 1010"
              maxlength="4" @input="onPlzInput" type="number" />
            <div class="plz-result" v-if="erkannterNetzbetreiber">
              <span class="plz-ok">✓</span> {{ erkannterNetzbetreiber }}
            </div>
          </div>
        </div>

        <!-- Jahresverbrauch -->
        <div class="input-group">
          <label class="inp-label">
            Ihr Jahresverbrauch in kWh
            <span class="inp-hint">— steht auf Ihrer Jahresabrechnung</span>
          </label>
          <input
            class="calc-input kwh-input"
            v-model.number="kwh"
            type="number"
            min="0"
            placeholder="Verbrauch eingeben..."
            @input="onKwhInput"
          />

          <!-- Live Haushalts-Indikator -->
          <Transition name="fade-ind">
            <div class="household-indicator" v-if="haushaltsTyp">
              <span class="hh-icon">{{ haushaltsTyp.icon }}</span>
              <div class="hh-text">
                <span class="hh-label">{{ haushaltsTyp.label }}</span>
                <span class="hh-range">Typischer Verbrauch: {{ haushaltsTyp.range }}</span>
              </div>
              <div class="hh-bar">
                <div class="hh-fill" :style="{ width: haushaltsTyp.pct + '%' }"></div>
              </div>
            </div>
          </Transition>

          <!-- Orientierungshilfe -->
          <div class="kwh-help" v-if="!kwh">
            <span class="help-icon">💡 Nicht sicher? Typische Richtwerte:</span>
            <span>
              <button class="kwh-chip" v-for="h in haushaltsTabelle" :key="h.label"
                @click="kwh=h.strom; onKwhInput()">
                {{ h.label }} ~{{ h.strom.toLocaleString('de-AT') }} kWh
              </button>
            </span>
          </div>
        </div>

        <!-- Aktueller Anbieter -->
        <div class="input-group">
          <label class="inp-label">Ihr aktueller Energieanbieter</label>
          <select class="calc-input" v-model="aktuellerAnbieter">
            <option value="">Bitte wählen...</option>
            <option v-for="a in alleAnbieter" :key="a.id" :value="a.id">{{ a.name }}</option>
            <option value="andere">Anderer / Unbekannt</option>
          </select>
        </div>

        <button class="calc-btn" @click="berechnen" :disabled="!kwh || kwh <= 0">
          Jetzt Ersparnis berechnen →
        </button>
      </div>

      <!-- ERGEBNIS: Anbieter-Ranking -->
      <Transition name="slide-up">
        <div class="result-section" v-if="ergebnis">

          <div class="result-header">
            <h2 class="result-title">Die besten Tarife für Sie</h2>
            <p class="result-sub">Basierend auf {{ kwh.toLocaleString('de-AT') }} kWh/Jahr · {{ typ === 'strom' ? 'Strom' : 'Gas' }} · {{ erkannterNetzbetreiber || 'Österreich' }}</p>
          </div>

          <div class="anbieter-liste">
            <div
              v-for="(eintrag, idx) in ergebnis"
              :key="eintrag.anbieter.id"
              class="anbieter-result-card"
              :class="{
                'platz1': idx === 0,
                'platz2': idx === 1,
                'platz3': idx === 2,
                'aktuell': eintrag.istAktuell,
                'empfohlen': idx === 0 && !eintrag.istAktuell
              }"
            >
              <!-- Badge -->
              <div class="arc-badge" v-if="idx === 0 && !eintrag.istAktuell">
                🏆 Bestpreis
              </div>
              <div class="arc-badge aktuell-badge" v-if="eintrag.istAktuell">
                📍 Ihr aktueller Anbieter
              </div>

              <div class="arc-top">
                <div class="arc-platz">{{ idx + 1 }}</div>
                <div class="arc-logo">{{ eintrag.anbieter.logo }}</div>
                <div class="arc-info">
                  <div class="arc-name">{{ eintrag.anbieter.name }}</div>
                  <div class="arc-preise">
                    {{ typ === 'strom' ? eintrag.anbieter.stromCt : eintrag.anbieter.gasCt }} ct/kWh
                    · {{ typ === 'strom' ? eintrag.anbieter.grundpreisStrom : eintrag.anbieter.grundpreisGas }} €/Mon
                  </div>
                </div>
                <div class="arc-jahres">
                  <span class="arc-preis-big">{{ eintrag.jahrKosten }} €</span>
                  <span class="arc-preis-lbl">/Jahr</span>
                </div>
              </div>

              <!-- Ersparnis vs Platz 1 -->
              <div class="arc-ersparnis" v-if="idx > 0 && !eintrag.istAktuell">
                <span class="ers-mehr">+ {{ eintrag.jahrKosten - ergebnis[0].jahrKosten }} € mehr/Jahr als Platz 1</span>
              </div>
              <div class="arc-ersparnis green" v-if="eintrag.istAktuell && ergebnis[0] && !ergebnis[0].istAktuell">
                <span>Mit {{ ergebnis[0].anbieter.name }} sparen Sie <strong>{{ eintrag.jahrKosten - ergebnis[0].jahrKosten }} €/Jahr</strong></span>
              </div>

              <!-- CTA -->
              <button
                v-if="!eintrag.istAktuell"
                class="arc-cta"
                :class="{ 'arc-cta-gold': idx === 0 }"
                @click="goToVertrag()"
              >
                {{ idx === 0 ? 'Jetzt zu diesem Tarif wechseln →' : 'Diesen Tarif wählen →' }}
              </button>
              <div v-else class="arc-cta-current">
                Sie sind bereits bei diesem Anbieter
              </div>
            </div>
          </div>

          <p class="result-note">* Jahreskosten inkl. Grundpreis, exkl. Netzkosten. Preise inkl. 20% USt. Stand: {{ heute }}</p>
        </div>
      </Transition>

      <!-- Orientierungstabelle (kompakt, immer sichtbar) -->
      <div class="orient-table fade-up">
        <h3 class="ot-title">📊 Orientierungshilfe — Typischer Verbrauch</h3>
        <div class="ot-scroll">
          <table class="ot-table">
            <thead>
              <tr>
                <th>Haushalt</th>
                <th>Personen</th>
                <th>Strom kWh</th>
                <th>Gas kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in haushaltsTabelle" :key="h.label"
                :class="{ 'ot-active': haushaltsTyp && haushaltsTyp.label === h.label }"
                @click="kwh = typ === 'gas' ? h.gas : h.strom; onKwhInput()">
                <td><strong>{{ h.label }}</strong></td>
                <td>{{ h.personen }}</td>
                <td class="ot-kwh">{{ h.strom.toLocaleString('de-AT') }}</td>
                <td class="ot-kwh">{{ h.gas.toLocaleString('de-AT') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="ot-note">* Geschätzte Richtwerte (Näherungswerte). Klicken Sie auf eine Zeile um den Wert zu übernehmen.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '../stores/settings.js'

const settings = useSettingsStore()
const router   = useRouter()
const typ      = ref('strom')
const kwh      = ref(null)
const plz      = ref('')
const aktuellerAnbieter = ref('')
const ergebnis = ref(null)
const heute    = new Date().toLocaleDateString('de-AT')

// Alle Anbieter für Dropdown
const alleAnbieter = computed(() => settings.data.anbieter || [])

// PLZ → Netzbetreiber
const erkannterNetzbetreiber = computed(() => {
  if (!plz.value || plz.value.length < 4) return ''
  return settings.getNetzbetreiberByPlz(plz.value)
})

function onPlzInput() {
  ergebnis.value = null
}

function onKwhInput() {
  ergebnis.value = null
}

function reset() {
  ergebnis.value = null
}

// Haushaltstabelle
// Geschätzte Richtwerte — Näherungswerte nach E-Control Österreich
const haushaltsTabelle = [
  { label: 'Single',      personen: '1 Person',    strom: 1600,  gas: 6000,  min: 800,  max: 2200  },
  { label: 'Klein',       personen: '2 Personen',  strom: 2700,  gas: 10000, min: 2200, max: 3400  },
  { label: 'Mittel',      personen: '3 Personen',  strom: 3500,  gas: 14000, min: 3400, max: 4300  },
  { label: 'Groß',        personen: '4 Personen',  strom: 4500,  gas: 18000, min: 4300, max: 5500  },
  { label: 'Familienhaus',personen: '5+ Personen', strom: 6000,  gas: 25000, min: 5500, max: 8000  },
  { label: 'Kleinbetrieb',personen: 'Gewerbe',     strom: 15000, gas: 50000, min: 8000, max: 999999},
]

// Live Haushalts-Indikator
const haushaltsTyp = computed(() => {
  if (!kwh.value || kwh.value <= 0) return null
  const icons = ['🧑','👫','👨‍👩‍👧','👨‍👩‍👧‍👦','🏠','🏢']
  const v = typ.value === 'gas'
    ? haushaltsTabelle.map(h => ({ ...h, range: h.gas + ' kWh', pct: Math.min(100, (kwh.value / h.gas) * 100) }))
    : haushaltsTabelle.map(h => ({ ...h, range: h.strom + ' kWh', pct: Math.min(100, (kwh.value / h.strom) * 100) }))

  const ref_val = typ.value === 'gas' ? 'gas' : 'strom'
  for (let i = 0; i < haushaltsTabelle.length; i++) {
    const h = haushaltsTabelle[i]
    if (kwh.value >= h.min && kwh.value <= h.max) {
      return {
        icon:  icons[i],
        label: h.label + (h.personen !== 'Gewerbe' ? ' (' + h.personen + ')' : ''),
        range: h[ref_val].toLocaleString('de-AT') + ' kWh Richtwert',
        pct:   Math.min(100, Math.round((kwh.value / h[ref_val]) * 100)),
      }
    }
  }
  return null
})

// Berechnen
function berechnen() {
  if (!kwh.value || kwh.value <= 0) return

  const aktive = settings.getAktiveAnbieter()
  if (!aktive.length) return

  const aktuellId = parseInt(aktuellerAnbieter.value) || null

  const liste = aktive.map(a => ({
    anbieter:   a,
    jahrKosten: settings.calcJahrKosten(kwh.value, typ.value, a),
    istAktuell: a.id === aktuellId,
  }))

  // Wenn aktueller Anbieter NICHT in der aktiven Liste ist → trotzdem anzeigen ganz unten
  if (aktuellId && aktuellId !== 'andere') {
    const inListe = liste.find(e => e.istAktuell)
    if (!inListe) {
      const aktuellAnbieter = (settings.data.anbieter || []).find(a => a.id === aktuellId)
      if (aktuellAnbieter) {
        liste.push({
          anbieter:   aktuellAnbieter,
          jahrKosten: settings.calcJahrKosten(kwh.value, typ.value, aktuellAnbieter),
          istAktuell: true,
        })
      }
    }
  }

  // Sortieren: aktueller Anbieter ans Ende, Rest nach Preis
  liste.sort((a, b) => {
    if (a.istAktuell && !b.istAktuell) return 1
    if (!a.istAktuell && b.istAktuell) return -1
    return a.jahrKosten - b.jahrKosten
  })

  ergebnis.value = liste
  setTimeout(() => {
    document.querySelector('.result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
function goToVertrag() {
  const aktuell = (settings.data.anbieter || []).find(a => a.id === parseInt(aktuellerAnbieter.value))
  const query = {
    energyType: typ.value,
    kwh: kwh.value,
    gridOperator: erkannterNetzbetreiber.value || '',
    previousSupplierHint: aktuell?.name || '',
  }
  router.push({ path: '/vertrag', query })
}

</script>

<style scoped>
.rechner-page { position:relative; z-index:1; padding:40px 0 60px; }
.rp-inner { max-width:720px; margin:0 auto; padding:0 20px; display:flex; flex-direction:column; gap:28px; }
.rp-header { text-align:center; }
.rp-title { font-family:var(--font-d); font-size:clamp(26px,4vw,42px); font-weight:300; margin-bottom:8px; }
.rp-desc { font-size:14px; color:var(--white-dim); }

/* Calc card */
.calc-card { background:rgba(21,36,56,0.92); border:1px solid var(--border); border-radius:20px; padding:28px; display:flex; flex-direction:column; gap:20px; }
.typ-toggle { display:flex; gap:8px; }
.typ-btn { flex:1; background:rgba(255,255,255,0.05); border:1.5px solid var(--border); color:var(--white-dim); border-radius:10px; padding:12px; font-size:14px; font-weight:600; cursor:pointer; font-family:var(--font-b); transition:all 0.25s; }
.typ-btn.on { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border-color:transparent; }

.input-group { display:flex; flex-direction:column; gap:8px; }
.inp-label { font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); }
.inp-hint { font-size:10px; color:var(--white-muted); text-transform:none; letter-spacing:0; font-weight:400; }
.calc-input { background:rgba(13,27,46,0.7); border:1.5px solid var(--border); color:var(--white); border-radius:10px; padding:13px 16px; font-size:15px; font-family:var(--font-b); outline:none; transition:all 0.2s; width:100%; }
.calc-input:focus { border-color:var(--gold); background:rgba(201,168,76,0.04); }
.calc-input::placeholder { color:var(--white-muted); }

/* PLZ row */
.plz-row { display:flex; align-items:center; gap:12px; }
.plz-input { max-width:160px; }
.plz-result { font-size:13px; color:#4ade80; display:flex; align-items:center; gap:6px; }
.plz-ok { font-weight:700; }

/* Household indicator */
.household-indicator { background:rgba(201,168,76,0.07); border:1px solid rgba(201,168,76,0.2); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:12px; }
.hh-icon { font-size:28px; flex-shrink:0; }
.hh-text { flex:1; }
.hh-label { display:block; font-size:14px; font-weight:600; color:var(--gold-light); }
.hh-range { display:block; font-size:12px; color:var(--white-dim); }
.hh-bar { width:80px; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden; }
.hh-fill { height:100%; background:linear-gradient(90deg,var(--gold-dim),var(--gold)); border-radius:3px; transition:width 0.4s ease; }

/* KWh help chips */
.kwh-help { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--white-dim); flex-wrap:wrap; }
.help-icon { font-size:14px; flex-shrink:0; margin-top:1px; }
.kwh-chip { background:rgba(255,255,255,0.07); border:1px solid var(--border); color:var(--white-dim); border-radius:6px; padding:3px 10px; font-size:11px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; margin:2px; }
.kwh-chip:hover { border-color:var(--gold-dim); color:var(--gold-light); }

.calc-btn { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border:none; padding:15px; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; font-family:var(--font-b); transition:all 0.25s; }
.calc-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 24px rgba(201,168,76,0.4); }
.calc-btn:disabled { opacity:0.4; cursor:not-allowed; }

/* Results */
.result-section { display:flex; flex-direction:column; gap:16px; }
.result-header { text-align:center; }
.result-title { font-family:var(--font-d); font-size:26px; font-weight:400; margin-bottom:6px; }
.result-sub { font-size:13px; color:var(--white-dim); }

.anbieter-liste { display:flex; flex-direction:column; gap:12px; }
.anbieter-result-card { background:rgba(21,36,56,0.92); border:1.5px solid var(--border); border-radius:16px; padding:18px; position:relative; transition:all 0.3s; }
.anbieter-result-card.platz1 { border-color:var(--gold); background:rgba(201,168,76,0.06); }
.anbieter-result-card.aktuell { border-color:rgba(100,150,255,0.4); opacity:0.8; }
.arc-badge { display:inline-flex; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; margin-bottom:10px; }
.aktuell-badge { background:rgba(100,150,255,0.2) !important; color:#90b4ff !important; border:1px solid rgba(100,150,255,0.3); }
.arc-top { display:flex; align-items:center; gap:12px; }
.arc-platz { font-family:var(--font-d); font-size:28px; font-weight:700; color:var(--gold); width:36px; flex-shrink:0; line-height:1; }
.platz2 .arc-platz { color:rgba(200,200,200,0.7); }
.platz3 .arc-platz { color:rgba(180,130,80,0.8); }
.aktuell .arc-platz { color:rgba(100,150,255,0.6); }
.arc-logo { font-size:24px; flex-shrink:0; }
.arc-info { flex:1; }
.arc-name { font-size:15px; font-weight:600; margin-bottom:3px; }
.arc-preise { font-size:12px; color:var(--white-dim); }
.arc-jahres { text-align:right; flex-shrink:0; }
.arc-preis-big { font-family:var(--font-d); font-size:24px; font-weight:600; color:var(--gold-light); }
.platz1 .arc-preis-big { font-size:28px; }
.arc-preis-lbl { font-size:11px; color:var(--white-dim); display:block; }
.arc-ersparnis { font-size:13px; color:#f87171; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.06); }
.arc-ersparnis.green { color:#4ade80; }
.arc-cta { display:block; text-align:center; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white-dim); padding:11px; border-radius:10px; text-decoration:none; font-size:13px; font-weight:500; margin-top:12px; transition:all 0.25s; }
.arc-cta:hover { border-color:var(--gold-dim); color:var(--gold-light); }
.arc-cta-gold { background:linear-gradient(135deg,var(--gold),var(--gold-light)) !important; color:var(--navy) !important; border-color:transparent !important; font-weight:700 !important; }
.arc-cta-gold:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(201,168,76,0.4); }
.arc-cta-current { text-align:center; font-size:12px; color:rgba(100,150,255,0.7); margin-top:10px; padding:8px; background:rgba(100,150,255,0.05); border-radius:8px; }
.result-note { font-size:11px; color:var(--white-muted); text-align:center; }

/* Orientierungstabelle */
.orient-table { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:22px; }
.ot-title { font-family:var(--font-d); font-size:19px; font-weight:400; margin-bottom:14px; }
.ot-scroll { overflow-x:auto; }
.ot-table { width:100%; border-collapse:collapse; }
.ot-table th { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); padding:8px 12px; text-align:left; border-bottom:1px solid var(--border); }
.ot-table td { padding:10px 12px; font-size:13px; color:var(--white-dim); border-bottom:1px solid rgba(255,255,255,0.04); cursor:pointer; transition:all 0.2s; }
.ot-table tr:hover td { background:rgba(201,168,76,0.05); color:var(--white); }
.ot-table tr.ot-active td { background:rgba(201,168,76,0.08); color:var(--white); }
.ot-kwh { font-family:monospace; }
.ot-note { font-size:11px; color:var(--white-muted); margin-top:10px; }

/* Animations */
.fade-ind-enter-active,.fade-ind-leave-active { transition:all 0.35s ease; }
.fade-ind-enter-from,.fade-ind-leave-to { opacity:0; transform:translateY(-6px); }
.slide-up-enter-active,.slide-up-leave-active { transition:all 0.4s cubic-bezier(.22,1,.36,1); }
.slide-up-enter-from { opacity:0; transform:translateY(20px); }
.slide-up-leave-to { opacity:0; }

@media(max-width:600px) {
  .rp-inner { padding:0 14px; }
  .calc-card { padding:18px; }
  .kwh-help { flex-direction:column; }
  .arc-top { flex-wrap:wrap; }
  .arc-jahres { margin-left:auto; }
}
</style>
