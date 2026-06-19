<template>
  <div class="kontakt-page">
    <div class="kp-inner">

      <div class="kp-header fade-up">
        <p class="sec-label">Kontakt & Beratung</p>
        <h1 class="kp-title">Wie können wir Ihnen helfen?</h1>
        <p class="kp-desc">Wählen Sie Ihr Anliegen und füllen Sie das Formular aus. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
      </div>

      <!-- Topic selection -->
      <div class="topic-grid fade-up" style="animation-delay:.1s">
        <button
          v-for="topic in topics" :key="topic.id"
          class="topic-card"
          :class="{ sel: selectedTopic === topic.id }"
          @click="selectedTopic = topic.id">
          <span class="topic-icon">{{ topic.icon }}</span>
          <span class="topic-name">{{ topic.label }}</span>
          <span class="topic-desc">{{ topic.desc }}</span>
        </button>
      </div>

      <!-- Form -->
      <div class="kontakt-form fade-up" style="animation-delay:.2s" v-if="selectedTopic">

        <!-- ENERGIE TOPIC -->
        <div v-if="selectedTopic === 'energie'">
          <div class="form-section-title">Energieberatung</div>
          <div class="form-grid">
            <div class="fg"><label>Anrede *</label>
              <select v-model="f.salutation"><option value="">Bitte wählen</option><option>Herr</option><option>Frau</option><option>Divers</option></select>
            </div>
            <div class="fg"><label>Name *</label><input v-model="f.name" placeholder="Max Mustermann" /></div>
            <div class="fg"><label>E-Mail *</label><input type="email" v-model="f.email" placeholder="max@beispiel.at" /></div>
            <div class="fg"><label>Telefon</label><input v-model="f.phone" placeholder="+43 660 123 456" /></div>
            <div class="fg span2"><label>Ihre Frage / Anliegen</label><textarea v-model="f.message" rows="4" placeholder="Beschreiben Sie Ihr Anliegen..."></textarea></div>
          </div>
        </div>

        <!-- SAMMELKLAGE TOPIC -->
        <div v-if="selectedTopic === 'sammelklage'">
          <div class="form-section-title">Sammelklage — Kreditgebühren</div>
          <div class="info-banner">
            <span>⚖️</span>
            <p>Wenn Ihnen Ihre Bank unzulässige Kreditgebühren verrechnet hat, haben Sie möglicherweise Anspruch auf Rückforderung. Wir koordinieren Sammelklagen und informieren Sie über Ihre Rechte.</p>
          </div>
          <div class="form-grid">
            <div class="fg"><label>Anrede *</label>
              <select v-model="f.salutation"><option value="">Bitte wählen</option><option>Herr</option><option>Frau</option><option>Divers</option></select>
            </div>
            <div class="fg"><label>Vor- und Nachname *</label><input v-model="f.name" placeholder="Max Mustermann" /></div>
            <div class="fg"><label>E-Mail *</label><input type="email" v-model="f.email" placeholder="max@beispiel.at" /></div>
            <div class="fg"><label>Telefon *</label><input v-model="f.phone" placeholder="+43 660 123 456" /></div>
            <div class="fg span2"><label>Adresse</label><input v-model="f.address" placeholder="Musterstraße 12, 1010 Wien" /></div>

            <div class="fg span2 section-divider"><strong>Angaben zu Ihrer Bank / Ihren Krediten</strong></div>

            <div class="fg"><label>Name Ihrer Bank *</label><input v-model="f.bankName" placeholder="z.B. Bank Austria, Erste Bank, Raiffeisen..." /></div>
            <div class="fg"><label>Art des Kredits *</label>
              <select v-model="f.kreditArt">
                <option value="">Bitte wählen</option>
                <option>Konsumkredit</option>
                <option>Wohnbaukredit / Hypothek</option>
                <option>Autokredit</option>
                <option>Überziehungskredit (Konto)</option>
                <option>Kreditkarte</option>
                <option>Mehrere Kredite</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div class="fg"><label>Kreditbetrag (ca.)</label>
              <select v-model="f.kreditBetrag">
                <option value="">Bitte wählen</option>
                <option>bis 5.000 €</option>
                <option>5.000 – 20.000 €</option>
                <option>20.000 – 50.000 €</option>
                <option>50.000 – 100.000 €</option>
                <option>über 100.000 €</option>
              </select>
            </div>
            <div class="fg"><label>Zeitraum des Kredits</label><input v-model="f.kreditZeitraum" placeholder="z.B. 2015–2022" /></div>
            <div class="fg span2"><label>Art der verrechneten Gebühren (soweit bekannt)</label><textarea v-model="f.gebuehren" rows="3" placeholder="z.B. Bearbeitungsgebühr, Kontoführungsgebühr, Spesen, Versicherungsprämien..."></textarea></div>
            <div class="fg span2"><label>Zusätzliche Informationen</label><textarea v-model="f.message" rows="3" placeholder="Weitere Details zu Ihrem Fall..."></textarea></div>
          </div>
          <div class="legal-note">
            <strong>Hinweis:</strong> Die Einreichung dieses Formulars begründet kein Mandatsverhältnis. Wir kontaktieren Sie zur Prüfung Ihres Falls und informieren Sie unverbindlich über Ihre Möglichkeiten.
          </div>
        </div>

        <!-- ALLGEMEIN TOPIC -->
        <div v-if="selectedTopic === 'allgemein'">
          <div class="form-section-title">Allgemeine Anfrage</div>
          <div class="form-grid">
            <div class="fg"><label>Name *</label><input v-model="f.name" placeholder="Max Mustermann" /></div>
            <div class="fg"><label>E-Mail *</label><input type="email" v-model="f.email" placeholder="max@beispiel.at" /></div>
            <div class="fg span2"><label>Betreff</label><input v-model="f.subject" placeholder="Ihr Anliegen" /></div>
            <div class="fg span2"><label>Nachricht *</label><textarea v-model="f.message" rows="5" placeholder="Schreiben Sie uns..."></textarea></div>
          </div>
        </div>

        <!-- DATENSCHUTZ TOPIC -->
        <div v-if="selectedTopic === 'datenschutz'">
          <div class="form-section-title">Datenschutz-Anfrage</div>
          <div class="info-banner">
            <span>🔒</span>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Datenübertragbarkeit Ihrer personenbezogenen Daten gemäß DSGVO Art. 15–20.</p>
          </div>
          <div class="form-grid">
            <div class="fg"><label>Name *</label><input v-model="f.name" placeholder="Max Mustermann" /></div>
            <div class="fg"><label>E-Mail *</label><input type="email" v-model="f.email" placeholder="max@beispiel.at" /></div>
            <div class="fg span2"><label>Art der Anfrage *</label>
              <select v-model="f.dsArt">
                <option value="">Bitte wählen</option>
                <option>Auskunft über gespeicherte Daten (Art. 15)</option>
                <option>Berichtigung meiner Daten (Art. 16)</option>
                <option>Löschung meiner Daten (Art. 17)</option>
                <option>Widerspruch gegen Verarbeitung (Art. 21)</option>
                <option>Datenübertragbarkeit (Art. 20)</option>
                <option>Widerruf meiner Einwilligung</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div class="fg span2"><label>Details zu Ihrer Anfrage</label><textarea v-model="f.message" rows="4" placeholder="Beschreiben Sie Ihre Anfrage..."></textarea></div>
          </div>
        </div>

        <!-- DATENSCHUTZ Consent -->
        <div class="consent-check">
          <div class="cbox" :class="{ on: f.consent }" @click="f.consent = !f.consent">
            <svg v-if="f.consent" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l3 3 5-5" stroke="#0d1b2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span>Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden. Weitere Informationen finden Sie in unserer <router-link to="/datenschutz" class="ds-link">DATENSCHUTZERKLÄRUNG</router-link>. *</span>
        </div>

        <div class="form-err" v-if="formErr">{{ formErr }}</div>

        <div class="form-actions">
          <button class="btn-gold" @click="submitForm" :disabled="submitting">
            <div v-if="submitting" class="spin-sm"></div>
            {{ submitting ? 'Wird gesendet…' : 'Anfrage absenden →' }}
          </button>
        </div>

        <div class="form-success" v-if="submitted">
          <div class="success-icon">✓</div>
          <h3>Ihre Anfrage wurde erfolgreich übermittelt!</h3>
          <p>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
            <button class="btn-gold" @click="resetForNew">Weiteres Anliegen senden →</button>
            <button class="btn-ghost" @click="resetForm">Thema wechseln</button>
          </div>
        </div>

      </div>

      <!-- Contact info -->
      <div class="contact-info fade-up">
        <div class="ci-card">
          <div class="ci-icon">📧</div>
          <div class="ci-title">E-Mail</div>
          <div class="ci-val"><a href="mailto:office@optivaro.at" style="color:var(--gold);text-decoration:none">office@optivaro.at</a></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { sendContactNotification } from '../utils/emailService.js'

const auth = useAuthStore()
const selectedTopic = ref('')
const submitting = ref(false)
const submitted = ref(false)
const formErr = ref('')

const topics = [
  { id: 'energie',     icon: '⚡', label: 'Energieberatung',         desc: 'Fragen zu Tarifen & Wechsel' },
  { id: 'sammelklage', icon: '⚖️', label: 'Sammelklage Kreditgebühren', desc: 'Unzulässige Bankgebühren zurückfordern' },
  { id: 'datenschutz', icon: '🔒', label: 'DATENSCHUTZ-Anfrage',     desc: 'Auskunft, Löschung, Widerruf' },
  { id: 'allgemein',   icon: '💬', label: 'Allgemeine Anfrage',       desc: 'Sonstige Anliegen' },
]

const f = reactive({
  salutation: '', name: '', email: '', phone: '', address: '', subject: '',
  message: '', bankName: '', kreditArt: '', kreditBetrag: '', kreditZeitraum: '',
  gebuehren: '', dsArt: '', consent: false,
})

function validate() {
  if (!f.name) return 'Bitte geben Sie Ihren Namen an.'
  if (!f.email || !f.email.includes('@')) return 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
  if (selectedTopic.value === 'sammelklage' && !f.bankName) return 'Bitte geben Sie den Namen Ihrer Bank an.'
  if (selectedTopic.value === 'sammelklage' && !f.kreditArt) return 'Bitte wählen Sie die Art des Kredits.'
  if (!f.consent) return 'Bitte stimmen Sie der Datenschutzerklärung zu.'
  return ''
}

async function submitForm() {
  formErr.value = validate()
  if (formErr.value) return
  submitting.value = true

  const contactData = {
    topic:         selectedTopic.value,
    topicLabel:    topics.find(t => t.id === selectedTopic.value)?.label,
    name:          f.name,
    email:         f.email,
    phone:         f.phone,
    address:       f.address,
    message:       f.message,
    subject:       f.subject,
    bankName:      f.bankName,
    kreditArt:     f.kreditArt,
    kreditBetrag:  f.kreditBetrag,
    kreditZeitraum:f.kreditZeitraum,
    gebuehren:     f.gebuehren,
    dsArt:         f.dsArt,
  }

  // 1. In Admin-Datenbank speichern (localStorage, bleibt erhalten)
  auth.saveContactRequest(contactData)

  // 2. Benachrichtigungs-E-Mail an guelfuture@gmail.com senden
  //    Bei Sammelklage-Anfragen: detaillierter Bericht mit allen Bankdaten
  //    Reply-To ist auf die Kunden-E-Mail gesetzt → einfach auf "Antworten" klicken
  try {
    await sendContactNotification(contactData)
  } catch(e) {
    // Email-Fehler soll Formular-Absenden nicht blockieren
    console.warn('Notification email failed:', e)
  }

  submitting.value = false
  submitted.value = true
  // Clear form fields immediately so user sees they were sent
  formErr.value = ''
}

function resetForm() {
  submitted.value = false
  selectedTopic.value = ''
  Object.keys(f).forEach(k => { f[k] = k === 'consent' ? false : '' })
}

// After successful submit: clear fields but stay on same topic so user can send another
function resetForNew() {
  submitted.value = false
  // Keep topic selected, just clear the fields
  const keepTopic = selectedTopic.value
  Object.keys(f).forEach(k => { f[k] = k === 'consent' ? false : '' })
  selectedTopic.value = keepTopic
}
</script>

<style scoped>
.kontakt-page { position:relative; z-index:1; padding:40px 0 60px; }
.kp-inner { max-width:860px; margin:0 auto; padding:0 40px; display:flex; flex-direction:column; gap:32px; }
.kp-header { text-align:center; }
.kp-title { font-family:var(--font-d); font-size:clamp(28px,4vw,44px); font-weight:300; margin-bottom:10px; }
.kp-desc { font-size:15px; color:var(--white-dim); line-height:1.65; }

/* Topics */
.topic-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.topic-card { background:rgba(21,36,56,0.88); border:1.5px solid var(--border); border-radius:16px; padding:20px 16px; cursor:pointer; transition:all 0.25s; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center; }
.topic-card:hover { border-color:var(--border-hover); transform:translateY(-2px); }
.topic-card.sel { border-color:var(--gold); background:rgba(201,168,76,0.07); }
/* topic icon handled below */
.topic-name { font-size:13px; font-weight:600; color:var(--white); }
.topic-desc { font-size:11px; color:rgba(255,255,255,0.7); line-height:1.4; }

/* Form */
.kontakt-form { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:20px; padding:28px; backdrop-filter:blur(12px); }
.form-section-title { font-family:var(--font-d); font-size:24px; font-weight:400; margin-bottom:20px; color:var(--gold-light); }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px; }
.fg { display:flex; flex-direction:column; gap:5px; }
.fg.span2 { grid-column:span 2; }
.section-divider { border-top:1px solid var(--border); padding-top:16px; margin-top:4px; font-size:14px; font-weight:600; color:var(--gold); }
.info-banner { display:flex; gap:12px; align-items:flex-start; background:rgba(37,99,168,0.1); border:1px solid rgba(37,99,168,0.3); border-radius:10px; padding:14px; margin-bottom:16px; }
.info-banner span { font-size:22px; flex-shrink:0; }
.info-banner p { font-size:13px; color:var(--white-dim); line-height:1.6; margin:0; }
.legal-note { background:rgba(255,200,0,0.06); border:1px solid rgba(255,200,0,0.2); border-radius:8px; padding:12px 14px; font-size:12px; color:var(--white-dim); line-height:1.5; margin-top:8px; }
.consent-check { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--white-dim); line-height:1.5; margin-top:8px; }
.cbox { width:18px; height:18px; min-width:18px; border-radius:4px; border:2px solid var(--border-hover); display:flex; align-items:center; justify-content:center; transition:all 0.2s; cursor:pointer; margin-top:1px; }
.cbox.on { background:var(--gold); border-color:var(--gold); }
.ds-link { color:var(--gold); text-decoration:none; }
.ds-link:hover { text-decoration:underline; }
.form-err { color:#fca5a5; font-size:13px; margin-top:4px; }
.form-actions { margin-top:16px; }
.form-success { text-align:center; padding:32px; }
.success-icon { font-size:48px; color:#4ade80; margin-bottom:14px; }
.form-success h3 { font-family:var(--font-d); font-size:24px; margin-bottom:10px; color:#4ade80; }
.form-success p { font-size:14px; color:var(--white-dim); }
.spin-sm { width:16px; height:16px; border:2px solid rgba(0,0,0,0.2); border-top-color:var(--navy); border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; margin-right:6px; }

/* Contact info */
.contact-info { display:grid; grid-template-columns:1fr; max-width:300px; gap:16px; }
.ci-card { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:14px; padding:20px; text-align:center; }
.ci-icon { font-size:28px; margin-bottom:8px; }
.ci-title { font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
.ci-val { font-size:14px; font-weight:500; }

@media(max-width:680px) {
  .kp-inner { padding:0 16px; }
  .topic-grid { grid-template-columns:1fr 1fr; }
  .form-grid { grid-template-columns:1fr !important; }
  .fg.span2 { grid-column:span 1; }
  .contact-info { grid-template-columns:1fr; }
}

/* Force white text in kontakt */
.topic-icon { font-size:28px; color:var(--white); }
.topic-name { font-size:13px; font-weight:600; color:#ffffff !important; }
.topic-desc { font-size:11px; color:rgba(255,255,255,0.75) !important; line-height:1.4; }
.topic-card { color:#ffffff; }
.topic-card.sel .topic-name { color:var(--gold-light) !important; }
</style>
