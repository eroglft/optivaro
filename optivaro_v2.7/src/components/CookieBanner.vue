<template>
  <Teleport to="body">
    <Transition name="cookie-slide">
      <div class="cookie-banner" v-if="visible" role="dialog" aria-label="Cookie-Einstellungen">
        <div class="cb-inner">

          <div class="cb-top">
            <div class="cb-icon">🍪</div>
            <div class="cb-text">
              <h3 class="cb-title">Wir respektieren Ihre Privatsphäre</h3>
              <p class="cb-desc">
                Diese Website verwendet ausschließlich <strong>technisch notwendige Cookies</strong> (Session-Cookies für die Grundfunktionalität). Es werden <strong>keine Tracking-Cookies</strong>, keine Werbecookies und keine Analyse-Dienste eingesetzt.
                Gemäß <strong>TKG 2021</strong> und <strong>DSGVO</strong> benötigen wir Ihre Zustimmung.
                <router-link to="/datenschutz" class="cb-link" @click="dismiss">DATENSCHUTZERKLÄRUNG</router-link> ·
                <router-link to="/impressum" class="cb-link" @click="dismiss">Impressum</router-link>
              </p>
            </div>
          </div>

          <!-- Cookie details (expandable) -->
          <div class="cb-details" v-if="showDetails">
            <div class="cd-table">
              <div class="cd-row cd-header">
                <span>Cookie</span><span>Zweck</span><span>Typ</span><span>Dauer</span>
              </div>
              <div class="cd-row">
                <span class="cd-name">ov_user</span>
                <span>Admin-Login Session</span>
                <span class="cd-necessary">Notwendig</span>
                <span>Browser-Session</span>
              </div>
              <div class="cd-row">
                <span class="cd-name">ov_contracts</span>
                <span>Vertragsarchiv (localStorage)</span>
                <span class="cd-necessary">Notwendig</span>
                <span>Dauerhaft (lokal)</span>
              </div>
              <div class="cd-row">
                <span class="cd-name">ov_contacts</span>
                <span>Kontaktanfragen (localStorage)</span>
                <span class="cd-necessary">Notwendig</span>
                <span>Dauerhaft (lokal)</span>
              </div>
              <div class="cd-row">
                <span class="cd-name">ov_cookie_consent</span>
                <span>Speichert Ihre Cookie-Entscheidung</span>
                <span class="cd-necessary">Notwendig</span>
                <span>12 Monate</span>
              </div>
            </div>
            <p class="cd-note">* „Notwendig" bedeutet, dass diese Cookies für den technischen Betrieb der Website unerlässlich sind. Ohne diese Cookies funktioniert die Website nicht korrekt. Gemäß TKG 2021 § 165 Abs. 3 ist für notwendige Cookies keine Einwilligung erforderlich — wir informieren Sie dennoch transparent darüber.</p>
          </div>

          <div class="cb-actions">
            <button class="cb-details-btn" @click="showDetails = !showDetails">
              {{ showDetails ? 'Weniger anzeigen ▲' : 'Cookie-Details ▼' }}
            </button>
            <div class="cb-btns">
              <button class="cb-reject" @click="reject">
                Nur notwendige Cookies
              </button>
              <button class="cb-accept" @click="accept">
                Alle akzeptieren ✓
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible    = ref(false)
const showDetails = ref(false)
const STORAGE_KEY = 'ov_cookie_consent'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    // Show after short delay so page loads first
    setTimeout(() => { visible.value = true }, 800)
  }
})

function accept() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    decision: 'accepted',
    date: new Date().toISOString(),
    version: '1.0'
  }))
  visible.value = false
}

function reject() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    decision: 'necessary_only',
    date: new Date().toISOString(),
    version: '1.0'
  }))
  visible.value = false
}

function dismiss() {
  visible.value = false
}

// Expose for parent to reopen settings
defineExpose({ open: () => { visible.value = true } })
</script>

<style scoped>
.cookie-banner {
  position:fixed; bottom:0; left:0; right:0; z-index:9999;
  background:rgba(8,18,34,0.98);
  border-top:1px solid rgba(201,168,76,0.3);
  backdrop-filter:blur(20px);
  box-shadow:0 -8px 40px rgba(0,0,0,0.5);
}
.cb-inner { max-width:1100px; margin:0 auto; padding:20px 32px; display:flex; flex-direction:column; gap:14px; }
.cb-top { display:flex; gap:16px; align-items:flex-start; }
.cb-icon { font-size:28px; flex-shrink:0; margin-top:2px; }
.cb-title { font-size:15px; font-weight:600; margin-bottom:6px; color:var(--white); }
.cb-desc { font-size:13px; color:var(--white-dim); line-height:1.6; margin:0; }
.cb-desc strong { color:var(--white); }
.cb-link { color:var(--gold); text-decoration:none; font-size:12px; }
.cb-link:hover { text-decoration:underline; }

/* Details table */
.cb-details { background:rgba(21,36,56,0.8); border:1px solid var(--border); border-radius:10px; padding:14px; }
.cd-table { display:flex; flex-direction:column; gap:0; }
.cd-row { display:grid; grid-template-columns:140px 1fr 110px 140px; gap:10px; padding:8px 10px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:12px; align-items:center; }
.cd-row:last-child { border-bottom:none; }
.cd-header { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); font-weight:600; background:rgba(201,168,76,0.05); border-radius:6px 6px 0 0; }
.cd-name { font-family:monospace; font-size:11px; color:var(--gold-light); }
.cd-necessary { background:rgba(42,125,90,0.2); color:#4ade80; border-radius:6px; padding:2px 8px; text-align:center; font-size:10px; font-weight:600; }
.cd-note { font-size:11px; color:var(--white-muted); line-height:1.5; margin-top:10px; margin-bottom:0; }

/* Actions */
.cb-actions { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
.cb-details-btn { background:none; border:1px solid var(--border); color:var(--white-dim); padding:7px 14px; border-radius:8px; font-size:12px; cursor:pointer; transition:all 0.2s; font-family:var(--font-b); }
.cb-details-btn:hover { border-color:var(--border-hover); color:var(--white); }
.cb-btns { display:flex; gap:10px; }
.cb-reject { background:rgba(255,255,255,0.06); border:1.5px solid var(--border); color:var(--white-dim); padding:10px 20px; border-radius:10px; font-size:13px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.cb-reject:hover { border-color:var(--border-hover); color:var(--white); }
.cb-accept { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border:none; padding:10px 24px; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.cb-accept:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(201,168,76,0.35); }

/* Animation */
.cookie-slide-enter-active { transition:transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease; }
.cookie-slide-leave-active { transition:transform 0.3s ease, opacity 0.25s ease; }
.cookie-slide-enter-from  { transform:translateY(100%); opacity:0; }
.cookie-slide-leave-to    { transform:translateY(100%); opacity:0; }

@media(max-width:680px) {
  .cb-inner { padding:16px; }
  .cb-top { flex-direction:column; gap:8px; }
  .cb-icon { display:none; }
  .cb-actions { flex-direction:column; align-items:stretch; }
  .cb-btns { flex-direction:column; }
  .cd-row { grid-template-columns:1fr 1fr; }
  .cd-header span:nth-child(3),
  .cd-header span:nth-child(4),
  .cd-row span:nth-child(3),
  .cd-row span:nth-child(4) { display:none; }
}
</style>
