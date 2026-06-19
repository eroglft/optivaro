<template>
  <div class="app-root">
    <div class="bg-layer">
      <div class="bg-orb orb1"></div>
      <div class="bg-orb orb2"></div>
      <div class="bg-grid"></div>
    </div>
    <nav class="top-nav" v-if="!isAdmin">
      <router-link to="/" class="nav-brand">
        <OptivaroLogo :size="108" />
        
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active">Startseite</router-link>
        <router-link to="/anbieter" class="nav-link" active-class="active">Anbieter</router-link>
        <router-link to="/rechner" class="nav-link" active-class="active">Tarifrechner</router-link>
        <router-link to="/kontakt" class="nav-link" active-class="active">Kontakt</router-link>
        <router-link to="/vertrag" class="nav-link cta-link" active-class="active">Jetzt wechseln →</router-link>
      </div>
      <div class="nav-right">
        <button class="burger" @click="mob=!mob"><span></span><span></span><span></span></button>
      </div>
      <div class="mobile-menu" v-if="mob" @click="mob=false">
        <router-link to="/" class="mob-link">Startseite</router-link>
        <router-link to="/anbieter" class="mob-link">Anbieter</router-link>
        <router-link to="/rechner" class="mob-link">Tarifrechner</router-link>
        <router-link to="/kontakt" class="mob-link">Kontakt</router-link>
        <router-link to="/vertrag" class="mob-link gold">Jetzt wechseln</router-link>
      </div>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <CookieBanner ref="cookieBanner" />
    <footer class="site-footer" v-if="!isAdmin && !isLogin">
      <div class="footer-inner">
        <div class="footer-col">
          <div class="footer-brand">
            <OptivaroLogo :size="30" />
            <div><div class="fb-name">OPTIVARO</div><div class="fb-sub">Ihr unabhängiger Energievergleich</div></div>
          </div>
          <p class="footer-mission">Optivaro ist ein unabhängiges Vergleichsportal. Wir sind kein Energieversorger — wir helfen Ihnen, den günstigsten Anbieter in Österreich zu finden.</p>
        </div>
        <div class="footer-col">
          <div class="footer-heading">Navigation</div>
          <div class="footer-links">
            <router-link to="/">Startseite</router-link>
            <router-link to="/anbieter">Anbieter-Vergleich</router-link>
            <router-link to="/rechner">Tarifrechner</router-link>
            <router-link to="/vertrag">Vertrag abschließen</router-link>
            <router-link to="/kontakt">Kontakt & Beratung</router-link>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-heading">Rechtliches</div>
          <div class="footer-links">
            <router-link to="/datenschutz">DATENSCHUTZ</router-link>
            <router-link to="/impressum">Impressum</router-link>
            <router-link to="/agb">AGB</router-link>
            <a href="#" @click.prevent="$refs.cookieBanner.open()">Cookie-Einstellungen</a>
            <router-link to="/admin" style="font-size:10px;color:rgba(255,255,255,0.15);margin-top:4px">Admin</router-link>
          </div>
          <div class="footer-cert">
            <span class="cert-badge">🔒 SSL-verschlüsselt</span>
            <span class="cert-badge">✓ DSGVO-konform</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} Optivaro Management GmbH · Österreich · Alle Rechte vorbehalten</p>
        <p class="footer-disclaimer">* Optivaro ist ein unabhängiges Vergleichsportal und kein Energielieferant. Preise können sich jederzeit ändern. Alle Angaben ohne Gewähr. Stand: {{ new Date().toLocaleDateString('de-AT') }}</p>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import OptivaroLogo from './components/OptivaroLogo.vue'
import CookieBanner from './components/CookieBanner.vue'
const route = useRoute()
const mob = ref(false)
const cookieBanner = ref(null)
const isAdmin = computed(() => route.path.startsWith('/admin'))
const isLogin = computed(() => route.path === '/login')
</script>
<style>
.app-root{min-height:100vh;display:flex;flex-direction:column;position:relative;}
.bg-layer{position:fixed;inset:0;z-index:0;pointer-events:none;}
.bg-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.09;}
.orb1{width:700px;height:700px;background:radial-gradient(circle,#2563a8,transparent);top:-250px;right:-150px;animation:floatOrb1 14s ease-in-out infinite;}
.orb2{width:500px;height:500px;background:radial-gradient(circle,#c9a84c,transparent);bottom:-150px;left:10%;animation:floatOrb2 18s ease-in-out infinite;}
.bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.02) 1px,transparent 1px);background-size:60px 60px;}
@keyframes floatOrb1{0%,100%{transform:translate(0,0)}50%{transform:translate(25px,35px)}}
@keyframes floatOrb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-18px,-25px)}}
.top-nav{display:flex;align-items:center;gap:20px;padding:0 40px;height:64px;background:rgba(10,22,40,0.94);border-bottom:1px solid rgba(201,168,76,0.15);backdrop-filter:blur(20px);position:sticky;top:0;z-index:50;position:relative;}
.nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
.brand-name{font-family:var(--font-d);font-size:15px;font-weight:700;letter-spacing:0.15em;background:linear-gradient(135deg,var(--gold-light),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.brand-sub{font-size:9px;color:var(--white-dim);letter-spacing:0.1em;}
.nav-links{display:flex;align-items:center;gap:2px;flex:1;justify-content:center;}
.nav-link{padding:7px 14px;border-radius:8px;color:var(--white-dim);text-decoration:none;font-size:13.5px;transition:all 0.2s;}
.nav-link:hover{color:var(--white);background:rgba(255,255,255,0.06);}
.nav-link.active{color:var(--gold-light);}
.cta-link{background:linear-gradient(135deg,var(--gold),var(--gold-light));color:var(--navy)!important;font-weight:600;margin-left:6px;}
.cta-link:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(201,168,76,0.3);}
.nav-right{display:flex;align-items:center;gap:10px;}
.admin-link{font-size:11px;color:var(--white-muted);text-decoration:none;transition:color 0.2s;}
.admin-link:hover{color:var(--gold);}
.burger{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:4px;}
.burger span{display:block;width:20px;height:2px;background:var(--white-dim);border-radius:1px;}
.mobile-menu{position:absolute;top:64px;left:0;right:0;background:rgba(10,22,40,0.98);border-bottom:1px solid var(--border);display:flex;flex-direction:column;z-index:100;}
.mob-link{padding:14px 24px;color:var(--white-dim);text-decoration:none;font-size:15px;border-bottom:1px solid rgba(255,255,255,0.04);transition:all 0.2s;}
.mob-link:hover{color:var(--white);}
.mob-link.gold{color:var(--gold);}
.mob-link.dim{color:var(--white-muted);}
/* Footer */
.site-footer{background:rgba(6,14,26,0.98);border-top:1px solid var(--border);padding:48px 40px 24px;margin-top:auto;position:relative;z-index:1;}
.footer-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:40px;margin-bottom:32px;}
.footer-col{}
.footer-brand{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.fb-name{font-family:var(--font-d);font-size:14px;font-weight:700;letter-spacing:0.15em;background:linear-gradient(135deg,var(--gold-light),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.fb-sub{font-size:10px;color:var(--white-dim);}
.footer-mission{font-size:12px;color:var(--white-muted);line-height:1.6;max-width:300px;}
.footer-heading{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
.footer-links{display:flex;flex-direction:column;gap:9px;}
.footer-links a{color:var(--white-dim);text-decoration:none;font-size:13px;transition:color 0.2s;}
.footer-links a:hover{color:var(--gold);}
.footer-cert{display:flex;flex-direction:column;gap:6px;margin-top:16px;}
.cert-badge{font-size:11px;color:var(--white-dim);display:flex;align-items:center;gap:6px;}
.footer-bottom{max-width:1100px;margin:0 auto;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);}
.footer-bottom p{font-size:12px;color:var(--white-muted);margin-bottom:4px;}
.footer-disclaimer{font-size:11px!important;color:rgba(255,255,255,0.2)!important;line-height:1.5;}
/* Page transition */
.page-enter-active,.page-leave-active{transition:all 0.25s ease;}
.page-enter-from{opacity:0;transform:translateY(8px);}
.page-leave-to{opacity:0;}
@media(max-width:680px){.nav-links{display:none}.burger{display:flex}.top-nav{padding:0 20px}.footer-inner{grid-template-columns:1fr}}
</style>
