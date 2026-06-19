import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import AnbieterView from './views/AnbieterView.vue'
import RechnerView from './views/RechnerView.vue'
import OrderView from './views/OrderView.vue'
import KontaktView from './views/KontaktView.vue'
import DatenschutzView from './views/DatenschutzView.vue'
import LoginView from './views/LoginView.vue'
import AdminView from './views/AdminView.vue'
import ImpressumView from './views/ImpressumView.vue'
import AgbView from './views/AgbView.vue'
import './assets/global.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',            component: HomeView },
    { path: '/anbieter',    component: AnbieterView },
    { path: '/rechner',     component: RechnerView },
    { path: '/vertrag',     component: OrderView },
    { path: '/kontakt',     component: KontaktView },
    { path: '/datenschutz', component: DatenschutzView },
    { path: '/login',       component: LoginView },
    { path: '/impressum',   component: ImpressumView },
    { path: '/agb',         component: AgbView },
    { path: '/admin',       component: AdminView,
      beforeEnter: (to, from, next) => {
        const user = JSON.parse(localStorage.getItem('ov_user') || 'null')
        if (user?.role === 'admin') next()
        else next('/login')
      }
    },
  ],
  scrollBehavior: () => ({ top: 0 })
})

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
