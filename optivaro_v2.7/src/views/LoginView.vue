<template>
  <div class="login-page">
    <div class="login-card fade-up">
      <div class="login-logo">
        <OptivaroLogo />
        <div class="logo-text">
          <span class="logo-name">OPTIVARO</span>
          <span class="logo-sub">MANAGEMENT</span>
        </div>
      </div>

      <div class="login-body">
        <h2 class="login-title">Administrator Login</h2>
        <p class="login-desc">Bitte melden Sie sich mit Ihren Zugangsdaten an.</p>

        <div class="form-group">
          <label>Benutzername</label>
          <input v-model="username" type="text" placeholder="admin" @keyup.enter="doLogin" autofocus />
        </div>
        <div class="form-group">
          <label>Passwort</label>
          <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="doLogin" />
        </div>

        <div class="error-msg" v-if="error">{{ error }}</div>

        <button class="btn-gold w-full" @click="doLogin" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Anmelden</span>
        </button>
      </div>

      <div class="login-footer">
        <router-link to="/" class="back-link">← Zur Kundenansicht</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import OptivaroLogo from '../components/OptivaroLogo.vue'

const router = useRouter()
const auth = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function doLogin() {
  if (!username.value || !password.value) {
    error.value = 'Bitte Benutzername und Passwort eingeben.'
    return
  }
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 600))
  const ok = auth.login(username.value, password.value)
  loading.value = false
  if (ok && auth.isAdmin) {
    router.push('/admin')
  } else {
    error.value = 'Ungültige Zugangsdaten oder keine Admin-Berechtigung.'
  }
}
</script>

<style scoped>
.login-page { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; position:relative; z-index:1; }
.login-card { width:100%; max-width:420px; background:rgba(21,36,56,0.92); border:1px solid var(--border); border-radius:24px; padding:40px; backdrop-filter:blur(20px); }
.login-logo { display:flex; align-items:center; gap:14px; margin-bottom:32px; padding-bottom:24px; border-bottom:1px solid var(--border); }
.logo-text { display:flex; flex-direction:column; }
.logo-name { font-family:var(--font-d); font-size:20px; font-weight:700; letter-spacing:0.15em; background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.logo-sub { font-size:9px; letter-spacing:0.22em; color:var(--white-dim); }
.login-title { font-family:var(--font-d); font-size:26px; font-weight:400; margin-bottom:8px; }
.login-desc { font-size:13px; color:var(--white-dim); margin-bottom:28px; }
.login-body { display:flex; flex-direction:column; gap:16px; }
.form-group { display:flex; flex-direction:column; }
.error-msg { background:rgba(155,44,44,0.2); border:1px solid rgba(155,44,44,0.4); border-radius:8px; padding:10px 14px; font-size:13px; color:#fca5a5; }
.w-full { width:100%; }
.spinner { width:16px; height:16px; border:2px solid rgba(0,0,0,0.2); border-top-color:var(--navy); border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; }
.login-footer { margin-top:24px; text-align:center; }
.back-link { font-size:13px; color:var(--white-dim); text-decoration:none; transition:color 0.2s; }
.back-link:hover { color:var(--gold); }
</style>
