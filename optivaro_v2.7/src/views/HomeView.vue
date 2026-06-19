<template>
  <div class="home-page">

    <!-- ══ HERO ══ -->
    <section class="hero">
      <div class="hero-content fade-up">
        <div class="hero-badge">🇦🇹 Österreichs smarter Energieexperte</div>
        <h1 class="hero-title">
          Sparen Sie bis zu <span class="gold-text">41 %</span><br>
          auf Ihre Energiekosten
        </h1>
        <p class="hero-desc">
          Bereits mehrere tausende Haushalte und Betriebe in Österreich vertrauen auf Optivaro. Wir vergleichen die besten Tarife, finden Ihr Sparpotenzial und wickeln den Wechsel komplett für Sie ab — kostenlos und in wenigen Minuten.
        </p>
        <div class="hero-ctas">
          <router-link to="/rechner" class="btn-hero-primary">
            Anbieter vergleichen →
          </router-link>
          <router-link to="/vertrag" class="btn-hero-secondary">
            Direkt wechseln
          </router-link>
        </div>
        <div class="hero-trust">
          <div class="trust-item">✓ Keine Wechselgebühren</div>
          <div class="trust-item">✓ {{ settings.data.preisgarantieMonate }} Monate Preisgarantie</div>
          <div class="trust-item">✓ {{ settings.data.neukundenBonusMonate }} Monate gratis</div>
          <div class="trust-item">✓ Kündigung jederzeit möglich</div>
        </div>
      </div>

      <!-- Mini-Rechner im Hero -->
      
    </section>

    <!-- ══ WARUM OPTIVARO ══ -->
    <section class="why-section">
      <div class="section-center">
        <p class="sec-label">Warum Optivaro?</p>
        <h2 class="sec-title">Energie. Einfach. Günstiger.</h2>
        <p class="sec-desc">Wir sind ein unabhängiges Vergleichsportal — kein Energieversorger. Wir vergleichen den Markt und helfen Ihnen, den günstigsten Anbieter zu finden.</p>
      </div>
      <div class="why-grid">
        <div class="why-card" v-for="(w, i) in whyItems" :key="i" :style="`animation-delay:${i*0.08}s`">
          <div class="why-icon">{{ w.icon }}</div>
          <h3 class="why-title">{{ w.title }}</h3>
          <p class="why-text">{{ w.text }}</p>
        </div>
      </div>
    </section>

    <!-- ══ PRODUKT CARDS ══ -->
    <section class="products-section">
      <div class="section-center">
        <p class="sec-label">Unsere Tarife</p>
        <h2 class="sec-title">Transparent und günstig</h2>
        <p class="sec-desc">Alle Preise inkl. USt. — Preisgarantie für {{ settings.data.preisgarantieMonate }} Monate ab Lieferbeginn.</p>
      </div>

      <div class="prod-grid">
        <!-- Strom -->
        <div class="prod-card strom-card">
          <div class="prod-badge popular">⚡ Meist gewählt</div>
          <div class="prod-icon">⚡</div>
          <h3 class="prod-name">VERBUND Strom</h3>
          <p class="prod-sub">100 % Wasserkraft aus Österreich</p>
          <div class="prod-price">
            <span class="price-main">{{ settings.data.stromArbeitspreisHaushalt.toFixed(2) }} ct</span>
            <span class="price-unit">/kWh Arbeitspreis</span>
          </div>
          <div class="prod-grundpreis">+ {{ settings.data.stromGrundpreisHaushalt.toFixed(2) }} €/Monat Grundpreis</div>
          <ul class="prod-features">
            <li>✓ {{ settings.data.preisgarantieMonate }} Monate Preisgarantie</li>
            <li>✓ {{ settings.data.neukundenBonusMonate }} Monate <strong>Gratis-Strom</strong></li>
            <li>✓ Online-Rechnung: +2 Tage gratis</li>
            <li>✓ SEPA-Lastschrift: +2 Tage gratis</li>
            <li>✓ 100 % Ökostrom</li>
          </ul>
          <div class="prod-saving-hint" v-if="settings.data.vergleichStromCt">
            Ø Ersparnis ggü. Marktdurchschnitt:<br>
            <strong class="gold-text">bis zu {{ calcMaxPct('strom') }}% günstiger</strong>
          </div>
          <router-link to="/vertrag" class="prod-cta" @click="setProduct('strom')">
            Strom-Tarif wählen →
          </router-link>
        </div>

        <!-- Gas -->
        <div class="prod-card gas-card">
          <div class="prod-icon">🔥</div>
          <h3 class="prod-name">VERBUND Gas</h3>
          <p class="prod-sub">Zuverlässig für Haushalt & Gewerbe</p>
          <div class="prod-price">
            <span class="price-main">{{ settings.data.gasArbeitspreisHaushalt.toFixed(2) }} ct</span>
            <span class="price-unit">/kWh Arbeitspreis</span>
          </div>
          <div class="prod-grundpreis">+ {{ settings.data.gasGrundpreisHaushalt.toFixed(2) }} €/Monat Grundpreis</div>
          <ul class="prod-features">
            <li>✓ {{ settings.data.preisgarantieMonate }} Monate Preisgarantie</li>
            <li>✓ {{ settings.data.neukundenBonusMonate }} Monate <strong>Gratis-Gas</strong></li>
            <li>✓ Online-Rechnung: +2 Tage gratis</li>
            <li>✓ SEPA-Lastschrift: +2 Tage gratis</li>
            <li>✓ Für Haushalt & Gewerbe</li>
          </ul>
          <div class="prod-saving-hint" v-if="settings.data.vergleichGasCt">
            Ø Ersparnis ggü. Marktdurchschnitt:<br>
            <strong class="gold-text">bis zu {{ calcMaxPct('gas') }}% günstiger</strong>
          </div>
          <router-link to="/vertrag" class="prod-cta secondary-cta" @click="setProduct('gas')">
            Gas-Tarif wählen →
          </router-link>
        </div>
      </div>

      <div class="prod-note">
        * Alle Preise inkl. 20% USt. Netzkosten, Steuern und Abgaben sind nicht enthalten und werden vom zuständigen Netzbetreiber separat verrechnet. Preisgarantie gilt für {{ settings.data.preisgarantieMonate }} Monate ab Lieferbeginn.
      </div>
    </section>

    <!-- ══ WIE ES FUNKTIONIERT ══ -->
    <section class="how-section">
      <div class="section-center">
        <p class="sec-label">So einfach geht's</p>
        <h2 class="sec-title">In 4 Schritten zum günstigeren Tarif</h2>
      </div>
      <div class="steps-row">
        <div class="step-item" v-for="(s, i) in howSteps" :key="i">
          <div class="step-num">{{ i + 1 }}</div>
          <div class="step-icon">{{ s.icon }}</div>
          <h4 class="step-title">{{ s.title }}</h4>
          <p class="step-text">{{ s.text }}</p>
        </div>
        <div class="step-connector" v-for="i in 3" :key="'c'+i"></div>
      </div>
      <div class="how-cta">
        <router-link to="/vertrag" class="btn-gold">Jetzt kostenlos wechseln →</router-link>
      </div>
    </section>

    <!-- ══ KUNDENBEWERTUNGEN ══ -->
    <section class="reviews-section" v-if="reviews.length">
      <div class="section-center">
        <p class="sec-label">Was unsere Kunden sagen</p>
        <h2 class="sec-title">Echte Erfahrungen</h2>
        <div class="avg-stars">
          <div class="star-row">
            <span v-for="s in 5" :key="s" class="star" :class="s <= Math.round(avgRating) ? 'on' : ''">★</span>
          </div>
          <span class="avg-num">{{ avgRating.toFixed(1) }} / 5</span>
          <span class="avg-count">({{ reviews.length }} Bewertungen)</span>
        </div>
      </div>

      <div class="reviews-grid">
        <div class="review-card" v-for="r in reviews.slice(0, 6)" :key="r.id">
          <div class="rc-header">
            <div class="rc-avatar">{{ r.name?.[0]?.toUpperCase() || '?' }}</div>
            <div>
              <div class="rc-name">{{ r.name }}</div>
              <div class="rc-date">{{ fmtDate(r.date) }}</div>
            </div>
            <div class="rc-stars">
              <span v-for="s in 5" :key="s" class="star sm" :class="s <= r.stars ? 'on' : ''">★</span>
            </div>
          </div>
          <div class="rc-product" v-if="r.product">{{ r.product === 'strom' ? '⚡ Strom' : '🔥 Gas' }}</div>
          <p class="rc-text">{{ r.text }}</p>
        </div>
      </div>
    </section>

    <!-- ══ FAQ ══ -->
    <section class="faq-section">
      <div class="section-center">
        <p class="sec-label">Häufige Fragen</p>
        <h2 class="sec-title">Alles was Sie wissen müssen</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item" v-for="(q, i) in faqs" :key="i">
          <button class="faq-q" @click="openFaq = openFaq === i ? -1 : i">
            {{ q.q }}
            <span class="faq-arrow" :class="{ open: openFaq === i }">›</span>
          </button>
          <div class="faq-a" v-if="openFaq === i">{{ q.a }}</div>
        </div>
      </div>
    </section>

    <!-- ══ FINAL CTA ══ -->
    <section class="final-cta">
      <div class="fc-inner">
        <h2 class="fc-title">Bereit zu sparen?</h2>
        <p class="fc-desc">Schließen Sie Ihren Vertrag jetzt ab und profitieren Sie sofort von günstigeren Energiepreisen.</p>
        <div class="fc-btns">
          <router-link to="/rechner" class="btn-gold">Ersparnis berechnen</router-link>
          <router-link to="/vertrag" class="btn-ghost">Direkt zum Vertrag</router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings.js'

const settings = useSettingsStore()
const miniTyp = ref('strom')
const miniKwh = ref(3500)
const miniAnbieter = ref(settings.data.anbieter[0]?.name || '')
const miniResult = ref(null)
const openFaq = ref(-1)

const reviews = computed(() => settings.data.reviews || [])
const avgRating = computed(() => {
  if (!reviews.value.length) return 0
  return reviews.value.reduce((s, r) => s + r.stars, 0) / reviews.value.length
})

// Lokale Ersparnis-Berechnung (ersetzt settings.calcErsparnis)
function localCalcErsparnis(kwh, typ, anbieterName) {
  const s = settings.data
  const anbieterList = s.anbieter || []
  // Unser günstigster Anbieter (istOptivaro oder Platz 1)
  const unserer = anbieterList.find(a => a.istOptivaro) || anbieterList.find(a => a.platz === 1) || anbieterList[0]
  // Vergleichsanbieter
  const vergleich = anbieterList.find(a => a.name === anbieterName) || anbieterList.find(a => !a.istOptivaro && a.sichtbar)
  if (!unserer || !vergleich) return { vergleichJahr: 0, unserJahr: 0, ersparnis: 0, prozent: 0 }
  const unserCt    = typ === 'strom' ? unserer.stromCt    : unserer.gasCt
  const unserGP    = typ === 'strom' ? unserer.grundpreisStrom : unserer.grundpreisGas
  const verglCt    = typ === 'strom' ? vergleich.stromCt  : vergleich.gasCt
  const verglGP    = typ === 'strom' ? vergleich.grundpreisStrom : vergleich.grundpreisGas
  const unserJahr   = Math.round(kwh * unserCt / 100 + unserGP * 12)
  const verglJahr   = Math.round(kwh * verglCt / 100 + verglGP * 12)
  const ersparnis   = Math.round(verglJahr - unserJahr)
  const prozent     = verglJahr > 0 ? Math.round((ersparnis / verglJahr) * 1000) / 10 : 0
  return { vergleichJahr: verglJahr, unserJahr, ersparnis, prozent }
}

const maxSparProzent = computed(() => {
  const r = localCalcErsparnis(3500, 'strom', settings.data.anbieter?.[1]?.name)
  return Math.max(0, r.prozent)
})

function calcMini() {
  miniResult.value = localCalcErsparnis(miniKwh.value, miniTyp.value, miniAnbieter.value)
}

function calcMaxPct(typ) {
  const r = localCalcErsparnis(3500, typ, settings.data.anbieter?.[1]?.name)
  return Math.max(0, r.prozent)
}

function setProduct(typ) {
  localStorage.setItem('ov_preselect', typ)
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' })
}

const whyItems = [
  { icon:'💰', title:'Bis zu 41 % sparen', text:'Durch direkten Vergleich mit Ihrem aktuellen Anbieter zeigen wir Ihnen Ihr genaues Sparpotenzial — ohne versteckte Kosten.' },
  { icon:'⚡', title:'Wechsel in 5 Minuten', text:'Füllen Sie einfach unser Formular aus. Den Rest erledigen wir — inklusive Kündigung beim alten Anbieter.' },
  { icon:'🔒', title:'Preisgarantie', text:`${settings.data.preisgarantieMonate} Monate lang bleibt Ihr Energiepreis stabil. Keine unangenehmen Überraschungen auf der Jahresabrechnung.` },
  { icon:'🌿', title:'100% Ökostrom', text:'Unser Strom stammt zu 100% aus österreichischer Wasserkraft — gut für die Umwelt, gut für Ihr Gewissen.' },
  { icon:'🎁', title:`${settings.data.neukundenBonusMonate} Monate gratis`, text:'Als Neukunde erhalten Sie bei mindestens 1 Jahr Laufzeit zwei komplette Monate Energie als Willkommensbonus.' },
  { icon:'📱', title:'Alles digital', text:'Von der Antragstellung bis zur Jahresrechnung — alles papierlos und bequem online erledigen.' },
]

const howSteps = [
  { icon:'🔢', title:'Verbrauch eingeben', text:'Tragen Sie Ihren geschätzten Jahresverbrauch und Ihren aktuellen Anbieter ein.' },
  { icon:'📊', title:'Ersparnis sehen', text:'Unser Rechner zeigt Ihnen sofort, wie viel Sie mit Optivaro jährlich sparen können.' },
  { icon:'📝', title:'Vertrag ausfüllen', text:'Füllen Sie Ihr vorausgefülltes Vertragsformular in wenigen Minuten aus.' },
  { icon:'✅', title:'Wechsel läuft', text:'Wir kündigen Ihren alten Vertrag und starten die Belieferung zum günstigsten Zeitpunkt.' },
]

const faqs = [
  { q:'Was kostet der Wechsel zu Optivaro?', a:'Der Wechsel zu Optivaro ist für Sie vollständig kostenlos. Es fallen keine Wechselgebühren an. Alles — von der Antragstellung bis zur Kündigung beim alten Anbieter — erledigen wir für Sie.' },
  { q:'Wird meine Energieversorgung während des Wechsels unterbrochen?', a:'Nein, es gibt keine Unterbrechung. Der Wechsel läuft im Hintergrund ab. Ihre Energie fließt ununterbrochen weiter — nur der Lieferant ändert sich.' },
  { q:'Was ist die Preisgarantie genau?', a:`Die Preisgarantie bedeutet, dass Ihr Arbeits- und Grundpreis in den ersten ${settings.data.preisgarantieMonate} Monaten nach Lieferbeginn garantiert stabil bleibt. Keine einseitige Preiserhöhung in dieser Zeit.` },
  { q:'Was bedeuten die 2 Monate gratis?', a:`Als Neukunde mit mindestens 1 Jahr Mindestlaufzeit erhalten Sie ${settings.data.neukundenBonusMonate} Monate Energie als einmaligen Bonus. Der Bonus entspricht 16,67% Rabatt auf den Energiepreis für die ersten 12 Liefermonate.` },
  { q:'Kann ich den Vertrag vorzeitig kündigen?', a:'Nach dem ersten Vertragsjahr können Sie jederzeit mit 2 Wochen Frist kündigen. In der Mindestlaufzeit ist eine Kündigung zum Ende des ersten Vertragsjahres möglich.' },
  { q:'Gilt das auch für Gewerbebetriebe?', a:'Ja! Wir bieten spezielle Gewerbetarife für KMU (bis 100.000 kWh/Jahr) und größere Unternehmen an. Wählen Sie beim Vertragsabschluss einfach den passenden Kundentyp.' },
]
</script>

<style scoped>
.home-page { position:relative; z-index:1; }

/* ── Hero ── */
.hero { min-height:calc(100vh - 64px); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 40px 60px; max-width:900px; margin:0 auto; text-align:center; }
.hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.3); border-radius:20px; padding:6px 14px; font-size:13px; color:var(--gold-light); margin-bottom:20px; }
.hero-title { font-family:var(--font-d); font-size:clamp(36px,4.5vw,58px); font-weight:300; line-height:1.18; margin-bottom:20px; }
.gold-text { background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; font-weight:600; }
.hero-desc { font-size:16px; color:var(--white-dim); line-height:1.7; margin-bottom:32px; max-width:580px; margin-left:auto; margin-right:auto; }
.hero-ctas { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px; justify-content:center; }
.btn-hero-primary { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); padding:15px 28px; border-radius:10px; text-decoration:none; font-size:15px; font-weight:700; letter-spacing:0.02em; transition:all 0.25s; }
.btn-hero-primary:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(201,168,76,0.4); }
.btn-hero-secondary { background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white); padding:15px 24px; border-radius:10px; text-decoration:none; font-size:15px; transition:all 0.25s; }
.btn-hero-secondary:hover { border-color:var(--gold-dim); }
.hero-trust { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
.trust-item { font-size:12px; color:var(--white-dim); display:flex; align-items:center; gap:4px; }

/* ── Mini Rechner ── */
.hero-calc { background:rgba(21,36,56,0.9); border:1px solid var(--border); border-radius:20px; padding:28px; backdrop-filter:blur(16px); }
.hc-label { font-family:var(--font-d); font-size:20px; font-weight:400; margin-bottom:18px; }
.hc-type-row { display:flex; gap:8px; margin-bottom:16px; }
.hc-type { flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white-dim); border-radius:8px; padding:9px; font-size:13px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.hc-type.on { background:rgba(201,168,76,0.15); border-color:var(--gold); color:var(--gold-light); }
.hc-lbl { font-size:11px; letter-spacing:0.09em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:5px; margin-top:12px; }
.hc-input { width:100%; background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white); border-radius:8px; padding:10px 13px; font-size:14px; font-family:var(--font-b); outline:none; transition:all 0.2s; }
.hc-input:focus { border-color:var(--gold); background:rgba(201,168,76,0.06); }
.hc-input::placeholder { color:var(--white-muted); }
.hc-btn { width:100%; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border:none; border-radius:8px; padding:12px; font-size:14px; font-weight:700; cursor:pointer; margin-top:16px; font-family:var(--font-b); transition:all 0.25s; }
.hc-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(201,168,76,0.35); }
.hc-result { margin-top:16px; background:rgba(13,27,46,0.6); border:1px solid var(--border); border-radius:12px; padding:16px; }
.hcr-row { display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; }
.hcr-old { color:var(--white-dim); text-decoration:line-through; }
.hcr-new { color:var(--gold-light); font-weight:600; }
.hcr-saving { text-align:center; padding:10px; margin-top:8px; background:rgba(42,125,90,0.15); border-radius:8px; font-size:14px; }
.hcr-pct { font-size:12px; color:var(--gold); margin-left:4px; }
.hcr-cta { display:block; text-align:center; margin-top:12px; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); text-decoration:none; padding:11px; border-radius:8px; font-size:13px; font-weight:700; transition:all 0.2s; }
.hcr-cta:hover { transform:translateY(-1px); }

/* ── Sections ── */
.why-section, .products-section, .how-section, .reviews-section, .faq-section { padding:80px 60px; max-width:1200px; margin:0 auto; }
.section-center { text-align:center; margin-bottom:48px; }
.sec-label { font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
.sec-title { font-family:var(--font-d); font-size:clamp(28px,3.5vw,44px); font-weight:300; margin-bottom:14px; }
.sec-desc { font-size:15px; color:var(--white-dim); line-height:1.65; max-width:560px; margin:0 auto; }

/* ── Why grid ── */
.why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.why-card { background:rgba(21,36,56,0.8); border:1px solid var(--border); border-radius:16px; padding:28px; transition:all 0.3s; animation:fadeUp 0.5s ease both; }
.why-card:hover { border-color:var(--border-hover); transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.3); }
.why-icon { font-size:32px; margin-bottom:14px; }
.why-title { font-size:16px; font-weight:600; margin-bottom:8px; }
.why-text { font-size:13px; color:var(--white-dim); line-height:1.6; }

/* ── Products ── */
.prod-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-bottom:20px; }
.prod-card { background:rgba(21,36,56,0.85); border:1.5px solid var(--border); border-radius:20px; padding:36px; position:relative; transition:all 0.3s; }
.prod-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,0.35); }
.strom-card { border-color:rgba(37,99,168,0.4); background:linear-gradient(145deg,rgba(21,36,56,0.9),rgba(20,36,64,0.85)); }
.strom-card:hover { border-color:rgba(37,99,168,0.7); }
.gas-card { border-color:rgba(201,168,76,0.3); }
.gas-card:hover { border-color:var(--gold-dim); }
.prod-badge { position:absolute; top:20px; right:20px; background:rgba(42,125,90,0.2); border:1px solid rgba(42,125,90,0.4); border-radius:10px; padding:4px 12px; font-size:11px; color:#4ade80; }
.prod-icon { font-size:44px; margin-bottom:16px; }
.prod-name { font-family:var(--font-d); font-size:28px; font-weight:500; margin-bottom:4px; }
.prod-sub { font-size:13px; color:var(--white-dim); margin-bottom:20px; }
.prod-price { display:flex; align-items:baseline; gap:6px; margin-bottom:4px; }
.price-main { font-family:var(--font-d); font-size:42px; font-weight:600; color:var(--gold-light); }
.price-unit { font-size:14px; color:var(--white-dim); }
.prod-grundpreis { font-size:13px; color:var(--white-dim); margin-bottom:20px; }
.prod-features { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:20px; }
.prod-features li { font-size:14px; color:var(--white-dim); }
.prod-saving-hint { background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); border-radius:10px; padding:12px; font-size:12px; color:var(--white-dim); margin-bottom:20px; line-height:1.5; }
.prod-cta { display:block; text-align:center; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); text-decoration:none; padding:14px; border-radius:10px; font-size:14px; font-weight:700; transition:all 0.25s; }
.prod-cta:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(201,168,76,0.35); }
.secondary-cta { background:rgba(255,255,255,0.06); color:var(--white)!important; border:1px solid var(--border); }
.secondary-cta:hover { border-color:var(--gold-dim); background:rgba(201,168,76,0.08); box-shadow:none; }
.prod-note { font-size:11px; color:var(--white-muted); line-height:1.6; text-align:center; padding:0 20px; }

/* ── How it works ── */
.steps-row { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; margin-bottom:40px; }
.step-item { text-align:center; padding:0 20px; position:relative; }
.step-num { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); font-size:20px; font-weight:700; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:0 0 20px rgba(201,168,76,0.3); }
.step-icon { font-size:28px; margin-bottom:10px; }
.step-title { font-size:15px; font-weight:600; margin-bottom:6px; }
.step-text { font-size:13px; color:var(--white-dim); line-height:1.55; }
.step-connector { position:absolute; top:24px; right:-50%; width:100%; height:1px; background:linear-gradient(90deg,var(--gold-dim),transparent); display:none; }
.how-cta { text-align:center; }

/* ── Reviews ── */
.avg-stars { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:12px; }
.star-row { display:flex; gap:2px; }
.star { font-size:22px; color:rgba(255,255,255,0.2); }
.star.on { color:var(--gold); }
.star.sm { font-size:15px; }
.avg-num { font-family:var(--font-d); font-size:22px; }
.avg-count { font-size:13px; color:var(--white-dim); }
.reviews-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.review-card { background:rgba(21,36,56,0.8); border:1px solid var(--border); border-radius:16px; padding:24px; transition:all 0.3s; }
.review-card:hover { border-color:var(--border-hover); }
.rc-header { display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; }
.rc-avatar { width:38px; height:38px; min-width:38px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--gold-dim)); color:var(--navy); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px; }
.rc-name { font-size:14px; font-weight:500; }
.rc-date { font-size:11px; color:var(--white-dim); margin-top:2px; }
.rc-stars { margin-left:auto; display:flex; gap:1px; }
.rc-product { font-size:11px; color:var(--gold); margin-bottom:8px; }
.rc-text { font-size:13px; color:var(--white-dim); line-height:1.6; font-style:italic; }

/* ── FAQ ── */
.faq-list { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:8px; }
.faq-item { background:rgba(21,36,56,0.8); border:1px solid var(--border); border-radius:12px; overflow:hidden; transition:border-color 0.2s; }
.faq-item:has(.faq-a) { border-color:var(--border-hover); }
.faq-q { width:100%; display:flex; justify-content:space-between; align-items:center; padding:16px 20px; background:none; border:none; color:var(--white); font-family:var(--font-b); font-size:14px; font-weight:500; cursor:pointer; text-align:left; gap:16px; }
.faq-arrow { font-size:18px; color:var(--gold); transition:transform 0.25s; flex-shrink:0; }
.faq-arrow.open { transform:rotate(90deg); }
.faq-a { padding:0 20px 16px; font-size:13px; color:var(--white-dim); line-height:1.65; border-top:1px solid var(--border); padding-top:14px; }

/* ── Final CTA ── */
.final-cta { background:linear-gradient(135deg,rgba(21,36,56,0.9),rgba(15,28,50,0.95)); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:80px 40px; text-align:center; position:relative; z-index:1; }
.fc-inner { max-width:600px; margin:0 auto; }
.fc-title { font-family:var(--font-d); font-size:clamp(28px,4vw,48px); font-weight:300; margin-bottom:16px; }
.fc-desc { font-size:16px; color:var(--white-dim); line-height:1.65; margin-bottom:32px; }
.fc-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }

@media(max-width:960px){
  .hero{grid-template-columns:1fr;padding:40px 24px;gap:32px;}
  .hero-calc{order:-1;}
  .why-grid{grid-template-columns:1fr 1fr;}
  .prod-grid{grid-template-columns:1fr;}
  .steps-row{grid-template-columns:1fr 1fr;gap:24px;}
  .reviews-grid{grid-template-columns:1fr 1fr;}
  .why-section,.products-section,.how-section,.reviews-section,.faq-section{padding:50px 24px;}
}
@media(max-width:600px){
  .why-grid{grid-template-columns:1fr;}
  .reviews-grid{grid-template-columns:1fr;}
  .steps-row{grid-template-columns:1fr;}
}
</style>
