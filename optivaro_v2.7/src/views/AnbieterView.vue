np<template>
  <div class="anbieter-page">
    <div class="ap-inner">

      <div class="ap-header fade-up">
        <div class="platform-notice">
          <span class="pn-icon">ℹ️</span>
          <p>Optivaro ist ein <strong>unabhängiges Vergleichsportal</strong> — kein Energieversorger. Wir vergleichen den Markt und zeigen Ihnen die aktuell günstigsten Anbieter in Österreich. Die Entscheidung treffen Sie selbst.</p>
        </div>
        <p class="sec-label">Anbieter-Vergleich Österreich</p>
        <h1 class="ap-title">Die günstigsten Energieanbieter<br/>aktuell in Österreich</h1>
        <p class="ap-desc">Wir vergleichen laufend die Marktpreise und aktualisieren unsere Empfehlungen regelmäßig. Stand: {{ today }}</p>
      </div>

      <!-- Energy type toggle -->
      <div class="type-toggle">
        <button :class="['tt-btn', typ === 'strom' && 'on']" @click="typ='strom'">⚡ Strom</button>
        <button :class="['tt-btn', typ === 'gas' && 'on']" @click="typ='gas'">🔥 Gas</button>
      </div>

      <!-- TOP 3 Providers -->
      <div class="top3-grid">
        <div v-for="(p, i) in currentProviders" :key="p.name"
          class="provider-card fade-up" :style="`animation-delay:${i*0.1}s`"
          :class="{ winner: i === 0, second: i === 1, third: i === 2 }">

          <div class="rank-badge">
            <span class="rank-num">{{ i + 1 }}</span>
            <span class="rank-label">{{ i === 0 ? '🥇 Bestpreis' : i === 1 ? '🥈 Platz 2' : '🥉 Platz 3' }}</span>
          </div>

          <div class="prov-logo-area">
            <div class="prov-logo-placeholder">{{ p.name[0] }}</div>
          </div>

          <h2 class="prov-name">{{ p.name }}</h2>
          <p class="prov-tagline">{{ p.tagline }}</p>

          <div class="prov-prices">
            <div class="pp-item">
              <span class="pp-val">{{ p.arbeitspreis }} ct</span>
              <span class="pp-lbl">Arbeitspreis/kWh</span>
            </div>
            <div class="pp-divider"></div>
            <div class="pp-item">
              <span class="pp-val">{{ p.grundpreis }} €</span>
              <span class="pp-lbl">Grundpreis/Monat</span>
            </div>
          </div>

          <div class="prov-jahres">
            <span>Jahreskosten (3.500 kWh): </span>
            <strong class="prov-total">ca. {{ calcJahr(p.arbeitspreis, p.grundpreis) }} €</strong>
          </div>

          <ul class="prov-features">
            <li v-for="f in p.features" :key="f">✓ {{ f }}</li>
          </ul>

          <div class="prov-saving" v-if="i > 0">
            Ø {{ calcMehrkosten(p.arbeitspreis, p.grundpreis, currentProviders[0].arbeitspreis, currentProviders[0].grundpreis) }} € mehr/Jahr als Platz 1
          </div>

          <router-link to="/vertrag" class="prov-cta" :class="{ 'prov-cta-winner': i === 0 }">
            {{ i === 0 ? '✓ Diesen Tarif wählen →' : 'Tarif wählen →' }}
          </router-link>

          <div class="prov-note">* Preise inkl. 20% USt. Netzkosten nicht enthalten.</div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="compare-disclaimer">
        <h3>Wichtige Hinweise zum Vergleich</h3>
        <ul>
          <li>Die Preise werden regelmäßig aktualisiert, können sich aber jederzeit ändern. Prüfen Sie vor Vertragsabschluss die aktuellen Konditionen direkt beim Anbieter.</li>
          <li>Netzkosten werden separat vom Netzbetreiber verrechnet und sind im Vergleich nicht enthalten. Diese variieren je nach Region.</li>
          <li>Optivaro erhält eine Vermittlungsprovision bei Vertragsabschluss — dies hat keinen Einfluss auf unsere Bewertung der Anbieter.</li>
          <li>Alle Preise inkl. 20% Umsatzsteuer. Stand: {{ today }}</li>
        </ul>
      </div>

      <!-- Full comparison table -->
      <div class="full-table-section">
        <h2 class="ft-title">Vollständiger Anbieter-Überblick</h2>
        <p class="ft-desc">Alle aktuell von uns verglichenen Energieanbieter in Österreich</p>

        <div class="table-scroll">
          <table class="comp-table">
            <thead>
              <tr>
                <th>Platz</th>
                <th>Anbieter</th>
                <th>Arbeitspreis (ct/kWh)</th>
                <th>Grundpreis (€/Mon.)</th>
                <th>Jahreskosten*</th>
                <th>Bindung</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in currentProviders" :key="p.name" :class="{ 'best-row': i === 0 }">
                <td>
                  <span class="rank-pill" :class="`rank-${i+1}`">{{ i + 1 }}</span>
                </td>
                <td class="prov-name-td">
                  <strong>{{ p.name }}</strong>
                  <span v-if="i === 0" class="best-tag">Bestpreis</span>
                </td>
                <td class="price-td" :class="{ 'gold-val': i === 0 }">{{ p.arbeitspreis }} ct</td>
                <td class="price-td">{{ p.grundpreis }} €</td>
                <td class="price-td" :class="{ 'gold-val': i === 0 }">{{ calcJahr(p.arbeitspreis, p.grundpreis) }} €</td>
                <td class="bind-td">12 Monate</td>
                <td>
                  <router-link to="/vertrag" class="tbl-cta">Wählen →</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="tbl-note">* Jahreskosten basieren auf 3.500 kWh/Jahr (Durchschnittshaushalt 2 Personen). Netzkosten nicht enthalten.</p>
      </div>

      <!-- CTA Section -->
      <div class="anbieter-cta">
        <h2>Bereit zu wechseln?</h2>
        <p>Schließen Sie Ihren neuen Energievertrag jetzt online ab — schnell, sicher und ohne Papierkram.</p>
        <div class="cta-btns">
          <router-link to="/vertrag" class="btn-gold">Jetzt wechseln →</router-link>
          <router-link to="/rechner" class="btn-ghost">Ersparnis berechnen</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings.js'

const settings = useSettingsStore()
const typ = ref('strom')
const today = new Date().toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' })

// Static provider data — admin can update prices in settings
const stromAnbieter = computed(() => [
  {
    name: 'VERBUND Energy',
    tagline: '100% Ökostrom aus österreichischer Wasserkraft',
    arbeitspreis: settings.data.stromArbeitspreisHaushalt,
    grundpreis: settings.data.stromGrundpreisHaushalt,
    features: ['100% Wasserkraft', '12 Monate Preisgarantie', '2 Monate Gratis', 'Online-Rechnung'],
  },
  ...(settings.data.anbieter || []).filter(a => a.name !== 'Wiener Netze').slice(0, 2).map(a => ({
    name: a.name,
    tagline: 'Österreichischer Energieanbieter',
    arbeitspreis: a.stromCt,
    grundpreis: 5.99,
    features: ['Standardtarif', 'Jahresabrechnung', 'Online-Kundenportal'],
  }))
].sort((a, b) => a.arbeitspreis - b.arbeitspreis))

const gasAnbieter = computed(() => [
  {
    name: 'VERBUND Energy',
    tagline: 'Zuverlässige Gasversorgung für Haushalt & Gewerbe',
    arbeitspreis: settings.data.gasArbeitspreisHaushalt,
    grundpreis: settings.data.gasGrundpreisHaushalt,
    features: ['12 Monate Preisgarantie', '2 Monate Gratis', 'Online-Rechnung', 'SEPA-Bonus'],
  },
  ...(settings.data.anbieter || []).filter(a => a.name !== 'Wiener Netze').slice(0, 2).map(a => ({
    name: a.name,
    tagline: 'Österreichischer Energieanbieter',
    arbeitspreis: a.gasCt,
    grundpreis: 7.99,
    features: ['Standardtarif', 'Jahresabrechnung', 'Online-Kundenportal'],
  }))
].sort((a, b) => a.arbeitspreis - b.arbeitspreis))

const currentProviders = computed(() => typ.value === 'strom' ? stromAnbieter.value : gasAnbieter.value)

function calcJahr(ap, gp) {
  return Math.round(3500 * ap / 100 + gp * 12)
}
function calcMehrkosten(ap, gp, ap1, gp1) {
  return Math.abs(calcJahr(ap, gp) - calcJahr(ap1, gp1))
}
</script>

<style scoped>
.anbieter-page { position:relative; z-index:1; padding:40px 0 60px; }
.ap-inner { max-width:1100px; margin:0 auto; padding:0 40px; display:flex; flex-direction:column; gap:36px; }

/* Platform notice */
.platform-notice { background:rgba(37,99,168,0.1); border:1px solid rgba(37,99,168,0.3); border-radius:12px; padding:14px 18px; display:flex; gap:12px; align-items:flex-start; margin-bottom:8px; }
.pn-icon { font-size:18px; flex-shrink:0; margin-top:2px; }
.platform-notice p { font-size:13px; color:var(--white-dim); line-height:1.55; margin:0; }
.platform-notice strong { color:var(--white); }

.ap-header { text-align:center; display:flex; flex-direction:column; gap:16px; }
.ap-title { font-family:var(--font-d); font-size:clamp(28px,4vw,46px); font-weight:300; margin-bottom:12px; }
.ap-desc { font-size:14px; color:var(--white-dim); }

/* Toggle */
.type-toggle { display:flex; gap:10px; justify-content:center; }
.tt-btn { background:rgba(255,255,255,0.05); border:1.5px solid var(--border); color:var(--white-dim); border-radius:10px; padding:11px 28px; font-size:14px; font-weight:600; cursor:pointer; font-family:var(--font-b); transition:all 0.25s; }
.tt-btn.on { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border-color:transparent; }

/* Top 3 grid */
.top3-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.provider-card { background:rgba(21,36,56,0.88); border:1.5px solid var(--border); border-radius:20px; padding:28px; position:relative; transition:all 0.3s; animation:fadeUp 0.5s ease both; display:flex; flex-direction:column; gap:12px; }
.provider-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.3); }
.winner { border-color:var(--gold); background:linear-gradient(145deg,rgba(21,36,56,0.92),rgba(201,168,76,0.06)); }
.second { border-color:rgba(192,192,192,0.3); }
.third { border-color:rgba(205,127,50,0.3); }

.rank-badge { display:flex; align-items:center; gap:8px; }
.rank-num { font-family:var(--font-d); font-size:32px; font-weight:700; color:var(--gold); line-height:1; }
.winner .rank-num { font-size:40px; }
.rank-label { font-size:12px; color:var(--white-dim); }

.prov-logo-area { display:flex; justify-content:center; }
.prov-logo-placeholder { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--gold-dim),var(--gold)); display:flex; align-items:center; justify-content:center; font-family:var(--font-d); font-size:24px; font-weight:700; color:var(--navy); }

.prov-name { font-family:var(--font-d); font-size:22px; font-weight:500; text-align:center; }
.prov-tagline { font-size:12px; color:var(--white-dim); text-align:center; line-height:1.5; }

.prov-prices { display:flex; align-items:center; gap:0; background:rgba(13,27,46,0.5); border-radius:12px; padding:14px; }
.pp-item { flex:1; text-align:center; }
.pp-val { display:block; font-family:var(--font-d); font-size:26px; font-weight:600; color:var(--gold-light); }
.winner .pp-val { font-size:30px; }
.pp-lbl { font-size:11px; color:var(--white-dim); }
.pp-divider { width:1px; height:40px; background:var(--border); }

.prov-jahres { font-size:13px; color:var(--white-dim); text-align:center; }
.prov-total { color:var(--white); font-size:16px; }

.prov-features { list-style:none; display:flex; flex-direction:column; gap:6px; }
.prov-features li { font-size:13px; color:var(--white-dim); }
.winner .prov-features li { color:var(--white); }

.prov-saving { font-size:12px; color:rgba(255,100,100,0.7); text-align:center; padding:6px; background:rgba(255,100,100,0.05); border-radius:8px; }

.prov-cta { display:block; text-align:center; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white-dim); padding:12px; border-radius:10px; text-decoration:none; font-size:13px; font-weight:500; transition:all 0.25s; margin-top:auto; }
.prov-cta:hover { border-color:var(--gold-dim); color:var(--gold-light); }
.prov-cta-winner { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy)!important; border-color:transparent!important; font-weight:700; }
.prov-cta-winner:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(201,168,76,0.4); }

.prov-note { font-size:10px; color:var(--white-muted); text-align:center; }

/* Disclaimer */
.compare-disclaimer { background:rgba(21,36,56,0.7); border:1px solid var(--border); border-radius:14px; padding:20px 24px; }
.compare-disclaimer h3 { font-size:13px; font-weight:600; color:var(--gold); margin-bottom:10px; letter-spacing:0.06em; text-transform:uppercase; }
.compare-disclaimer ul { padding-left:16px; display:flex; flex-direction:column; gap:7px; }
.compare-disclaimer li { font-size:12px; color:var(--white-dim); line-height:1.55; }

/* Full table */
.full-table-section { }
.ft-title { font-family:var(--font-d); font-size:28px; font-weight:300; margin-bottom:8px; }
.ft-desc { font-size:14px; color:var(--white-dim); margin-bottom:20px; }
.table-scroll { overflow-x:auto; background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; }
.comp-table { width:100%; border-collapse:collapse; }
.comp-table th { font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--white-dim); padding:12px 16px; text-align:left; border-bottom:1px solid var(--border); }
.comp-table td { padding:14px 16px; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
.comp-table tr:last-child td { border-bottom:none; }
.best-row td { background:rgba(201,168,76,0.05); }
.rank-pill { width:26px; height:26px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; }
.rank-1 { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); }
.rank-2 { background:rgba(192,192,192,0.2); color:#ccc; }
.rank-3 { background:rgba(205,127,50,0.2); color:#cd7f32; }
.prov-name-td strong { display:block; }
.best-tag { background:rgba(42,125,90,0.2); color:#4ade80; border-radius:6px; padding:2px 8px; font-size:10px; margin-left:6px; }
.price-td { font-weight:500; }
.gold-val { color:var(--gold-light); }
.bind-td { font-size:12px; color:var(--white-dim); }
.tbl-cta { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); text-decoration:none; padding:6px 14px; border-radius:6px; font-size:12px; font-weight:700; white-space:nowrap; }
.tbl-note { font-size:11px; color:var(--white-muted); margin-top:10px; }

/* CTA */
.anbieter-cta { background:linear-gradient(135deg,rgba(201,168,76,0.08),rgba(37,99,168,0.06)); border:1px solid var(--border); border-radius:20px; padding:48px; text-align:center; }
.anbieter-cta h2 { font-family:var(--font-d); font-size:32px; font-weight:300; margin-bottom:10px; }
.anbieter-cta p { font-size:15px; color:var(--white-dim); margin-bottom:24px; }
.cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

@media(max-width:900px) {
  .top3-grid { grid-template-columns:1fr; }
  .ap-inner { padding:0 20px; }
}
</style>
