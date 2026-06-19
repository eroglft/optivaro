<template>
  <div class="admin-page">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="side-logo">
        <OptivaroLogo :size="36" />
        <div>
          <div class="logo-name">OPTIVARO</div>
          <div class="logo-tag">Admin</div>
        </div>
      </div>
      <nav class="side-nav">
        <button class="side-item" :class="{ active: view === 'dashboard' }" @click="view = 'dashboard'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>
          Übersicht
        </button>
        <button class="side-item" :class="{ active: view === 'anbieter' }" @click="view = 'anbieter'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5"/></svg>
          Anbieter & Preise
        </button>
        <button class="side-item" :class="{ active: view === 'settings' }" @click="view = 'settings'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/></svg>
          Preise & Einstellungen
        </button>
        <button class="side-item" :class="{ active: view === 'reviews' }" @click="view = 'reviews'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Kundenbewertungen
        </button>
        <button class="side-item" :class="{ active: view === 'contacts' }" @click="view = 'contacts'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5"/></svg>
          Kontaktanfragen
          <span class="side-badge" v-if="auth.contactRequests.length">{{ auth.contactRequests.length }}</span>
        </button>
        <button class="side-item" :class="{ active: view === 'contracts' }" @click="view = 'contracts'">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="1.5"/></svg>
          Verträge
          <span class="side-badge" v-if="contracts.length">{{ contracts.length }}</span>
        </button>
      </nav>
      <div class="side-bottom">
        <div class="side-user">
          <div class="user-av">{{ auth.user?.name?.[0] }}</div>
          <div>
            <div class="user-nm">{{ auth.user?.name }}</div>
            <div class="user-rl">Administrator</div>
          </div>
        </div>
        <button class="logout-btn" @click="doLogout">Abmelden</button>
        <router-link to="/" class="customer-link">Zur Kundenansicht ↗</router-link>
      </div>
    </aside>

    <!-- Main -->
    <main class="admin-main">

      <!-- DASHBOARD VIEW -->
      <div v-if="view === 'dashboard'" class="fade-up">
        <div class="main-header">
          <div>
            <p class="main-label">Administrator</p>
            <h1 class="main-title">Dashboard</h1>
          </div>
          <div class="header-date">{{ todayStr }}</div>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-card" v-for="s in stats" :key="s.label">
            <div class="stat-icon">{{ s.icon }}</div>
            <div class="stat-val">{{ s.val }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>

        <!-- Recent table -->
        <div class="section-card">
          <div class="sc-header">
            <h2 class="sc-title">Letzte Verträge</h2>
            <button class="btn-ghost sm" @click="view = 'contracts'">Alle anzeigen →</button>
          </div>
          <div class="empty-state" v-if="!contracts.length">
            <div class="es-icon">📋</div>
            <div class="es-text">Noch keine Verträge erfasst</div>
            <div class="es-sub">Wenn Kunden Verträge abschließen, erscheinen sie hier.</div>
          </div>
          <table class="contract-table" v-else>
            <thead>
              <tr>
                <th>Datum</th><th>Kunde</th><th>Produkt</th><th>Zahlung</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in contracts.slice(0,5)" :key="c.id">
                <td class="td-date">{{ fmtDateTime(c.createdAt) }}</td>
                <td class="td-name">{{ c.customer.firstName }} {{ c.customer.lastName }}</td>
                <td class="td-prod">
                  <span class="prod-chip" :class="c.product.energyType">
                    {{ c.product.energyType === 'strom' ? '⚡' : '🔥' }} {{ c.product.energyType?.toUpperCase() }}
                  </span>
                </td>
                <td class="td-pay">{{ c.product.paymentMethod === 'sepa' ? 'SEPA' : 'Überweisung' }}</td>
                <td class="td-agent">{{ c.agent || '—' }}</td>
                <td><span class="status-chip done">{{ c.status }}</span></td>
                <td><button class="view-btn" @click="openDetail(c)">Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      <!-- CONTACTS VIEW -->
      <div v-if="view === 'contacts'" class="fade-up">
        <div class="main-header">
          <div><p class="main-label">Administrator</p><h1 class="main-title">Kontaktanfragen</h1></div>
          <button class="btn-gold sm" @click="exportContacts">📥 Exportieren</button>
        </div>
        <div class="section-card">
          <div class="empty-state" v-if="!auth.contactRequests.length">
            <div class="es-icon">💬</div>
            <div class="es-text">Noch keine Kontaktanfragen</div>
          </div>
          <table class="contract-table" v-else>
            <thead><tr><th>Datum</th><th>Name</th><th>E-Mail</th><th>Thema</th><th>Details</th><th>Status</th><th></th></tr></thead>
            <tbody>
              <tr v-for="r in auth.contactRequests" :key="r.id">
                <td class="td-date">{{ fmtDateTime(r.createdAt) }}</td>
                <td>{{ r.name }}</td>
                <td class="td-email">{{ r.email }}</td>
                <td><span class="status-chip done">{{ r.topicLabel }}</span></td>
                <td style="max-width:280px">
                  <div v-if="r.bankName" class="detail-line"><strong>Bank:</strong> {{ r.bankName }}</div>
                  <div v-if="r.kreditArt" class="detail-line"><strong>Kredit:</strong> {{ r.kreditArt }}</div>
                  <div v-if="r.kreditBetrag" class="detail-line"><strong>Betrag:</strong> {{ r.kreditBetrag }}</div>
                  <div v-if="r.message" class="detail-line" style="color:var(--white-dim);font-size:12px">{{ r.message?.substring(0,80) }}{{ r.message?.length > 80 ? '…' : '' }}</div>
                </td>
                <td><span class="status-chip" :class="r.status === 'neu' ? 'new-chip' : 'done'">{{ r.status }}</span></td>
                <td><button class="del-btn" @click="auth.deleteContactRequest(r.id)">✕</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ANBIETER VERWALTUNG -->
      <div v-if="view === 'anbieter'" class="fade-up">
        <div class="main-header">
          <div><p class="main-label">Administrator</p><h1 class="main-title">Anbieter & Platzierungen</h1></div>
          <div style="display:flex;gap:10px">
            <button class="btn-ghost sm" @click="resetAnbieter" title="Auf Standardwerte zurücksetzen">↺ Reset</button>
            <button class="btn-gold sm" @click="addAnbieter">+ Neuer Anbieter</button>
          </div>
        </div>

        <div class="info-banner-admin">
          <strong>So funktioniert es:</strong>
          Platz 1 = Bestpreis (goldener Rahmen im Rechner) · Platz 2 & 3 = weitere Anbieter · Platz 0 = nicht anzeigen.
          Änderungen werden sofort gespeichert und sind live auf der Webseite sichtbar.
        </div>

        <div class="anbieter-cards">
          <div class="anb-card" v-for="a in settings.data.anbieter" :key="a.id"
            :class="{ 'anb-platz1': a.platz === 1, 'anb-hidden': !a.sichtbar || a.platz === 0 }">

            <div class="anb-card-header">
              <div class="anb-platz-badge" :class="'platz-' + a.platz">
                {{ a.platz === 0 ? 'Nicht anzeigen' : 'Platz ' + a.platz }}
              </div>
              <div class="anb-card-name">{{ a.name }}</div>
              <div style="display:flex;align-items:center;gap:10px;margin-left:auto">
                <span style="font-size:12px;color:var(--white-dim)">Sichtbar</span>
                <div class="tog sm" :class="{ on: a.sichtbar && a.platz > 0 }"
                  @click="a.sichtbar = !a.sichtbar; if(a.sichtbar && a.platz===0) a.platz=1; settings.save()">
                  <div class="tog-knob"></div>
                </div>
                <button class="del-btn" @click="delAnbieter(a.id)">✕</button>
              </div>
            </div>

            <div class="anb-card-body">
              <div class="anb-field">
                <label>Name</label>
                <input class="td-input" v-model="a.name" @change="settings.save()" style="width:100%" />
              </div>
              <div class="anb-field">
                <label>Platzierung</label>
                <select class="td-input" v-model="a.platz" @change="settings.save()" style="width:100%">
                  <option :value="0">Nicht anzeigen (Platz 0)</option>
                  <option :value="1">Platz 1 — Bestpreis ⭐</option>
                  <option :value="2">Platz 2</option>
                  <option :value="3">Platz 3</option>
                  <option v-for="n in [4,5,6,7,8,9,10]" :key="n" :value="n">Platz {{ n }}</option>
                </select>
              </div>
              <div class="anb-field">
                <label>Strom (ct/kWh)</label>
                <input class="td-input" type="number" step="0.01" v-model.number="a.stromCt" @change="settings.save()" style="width:100%" />
              </div>
              <div class="anb-field">
                <label>Gas (ct/kWh)</label>
                <input class="td-input" type="number" step="0.01" v-model.number="a.gasCt" @change="settings.save()" style="width:100%" />
              </div>
              <div class="anb-field">
                <label>Grundpreis Strom (€/Mon)</label>
                <input class="td-input" type="number" step="0.01" v-model.number="a.grundpreisStrom" @change="settings.save()" style="width:100%" />
              </div>
              <div class="anb-field">
                <label>Grundpreis Gas (€/Mon)</label>
                <input class="td-input" type="number" step="0.01" v-model.number="a.grundpreisGas" @change="settings.save()" style="width:100%" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- SETTINGS VIEW -->
      <div v-if="view === 'settings'" class="fade-up">
        <div class="main-header">
          <div><p class="main-label">Administrator</p><h1 class="main-title">Preise & Einstellungen</h1></div>
          <button class="btn-gold" @click="saveSettings">Änderungen speichern</button>
        </div>
        <div class="settings-grid">
          <div class="section-card">
            <div class="sc-header"><h2 class="sc-title">⚡ Strompreise</h2></div>
            <div class="set-grid">
              <div class="set-field">
                <label>Arbeitspreis Haushalt (ct/kWh inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.stromArbeitspreisHaushalt" />
              </div>
              <div class="set-field">
                <label>Grundpreis Haushalt (€/Monat inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.stromGrundpreisHaushalt" />
              </div>
              <div class="set-field">
                <label>Arbeitspreis Gewerbe (ct/kWh inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.stromArbeitspreisGewerbe" />
              </div>
              <div class="set-field">
                <label>Grundpreis Gewerbe (€/Monat inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.stromGrundpreisGewerbe" />
              </div>
            </div>
          </div>
          <div class="section-card">
            <div class="sc-header"><h2 class="sc-title">🔥 Gaspreise</h2></div>
            <div class="set-grid">
              <div class="set-field">
                <label>Arbeitspreis Haushalt (ct/kWh inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.gasArbeitspreisHaushalt" />
              </div>
              <div class="set-field">
                <label>Grundpreis Haushalt (€/Monat inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.gasGrundpreisHaushalt" />
              </div>
              <div class="set-field">
                <label>Arbeitspreis Gewerbe (ct/kWh inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.gasArbeitspreisGewerbe" />
              </div>
              <div class="set-field">
                <label>Grundpreis Gewerbe (€/Monat inkl. USt.)</label>
                <input type="number" step="0.01" v-model.number="sd.gasGrundpreisGewerbe" />
              </div>
            </div>
          </div>
          <div class="section-card">
            <div class="sc-header"><h2 class="sc-title">🎁 Aktionen & Boni</h2></div>
            <div class="set-grid">
              <div class="set-field">
                <label>Neukunden-Bonus (Monate gratis)</label>
                <input type="number" step="1" min="0" max="12" v-model.number="sd.neukundenBonusMonate" />
                <span class="set-hint">Erscheint auf der Startseite und in allen Tarifinformationen</span>
              </div>
              <div class="set-field">
                <label>Preisgarantie (Monate)</label>
                <input type="number" step="1" min="0" max="24" v-model.number="sd.preisgarantieMonate" />
              </div>
              <div class="set-field">
                <label>Mindestlaufzeit (Monate)</label>
                <input type="number" step="1" min="0" max="24" v-model.number="sd.bindungMonate" />
              </div>
            </div>
          </div>
          <div class="section-card">
            <div class="sc-header"><h2 class="sc-title">📊 Vergleichspreise (für Rechner)</h2></div>
            <div class="set-grid">
              <div class="set-field">
                <label>Vergleichs-Strom AT Durchschnitt (ct/kWh)</label>
                <input type="number" step="0.1" v-model.number="sd.vergleichStromCt" />
                <span class="set-hint">Basis für Ersparnis-Berechnung wenn Anbieter unbekannt</span>
              </div>
              <div class="set-field">
                <label>Vergleichs-Gas AT Durchschnitt (ct/kWh)</label>
                <input type="number" step="0.1" v-model.number="sd.vergleichGasCt" />
              </div>
              <div class="set-field">
                <label>Netzkosten Strom (ct/kWh, Schätzwert)</label>
                <input type="number" step="0.1" v-model.number="sd.netzkostenStromProKwh" />
              </div>
              <div class="set-field">
                <label>Netzkosten Gas (ct/kWh, Schätzwert)</label>
                <input type="number" step="0.1" v-model.number="sd.netzkostenGasProKwh" />
              </div>
            </div>
          </div>
          <div class="section-card full-span">
            <div class="sc-header"><h2 class="sc-title">🏢 Anbieter-Vergleichspreise</h2></div>
            <p style="font-size:13px;color:var(--white-dim);margin-bottom:16px">Diese Preise erscheinen im Tarifrechner als Vergleich. Aktuell halten basierend auf aktuellen Marktpreisen.</p>
            <div class="anbieter-table">
              <div class="at-header">
                <span>Anbieter</span><span>Strom (ct/kWh)</span><span>Gas (ct/kWh)</span>
              </div>
              <div class="at-row" v-for="(a, i) in sd.anbieter" :key="i">
                <input v-model="a.name" placeholder="Anbietername" class="at-input" />
                <input type="number" step="0.1" v-model.number="a.stromCt" class="at-input" />
                <input type="number" step="0.1" v-model.number="a.gasCt" class="at-input" />
              </div>
            </div>
          </div>
        </div>
        <div class="save-bar">
          <div class="save-note">Änderungen werden sofort auf der Kundenseite sichtbar.</div>
          <button class="btn-gold" @click="saveSettings">💾 Alle Änderungen speichern</button>
        </div>
      </div>

      <!-- REVIEWS VIEW -->
      <div v-if="view === 'reviews'" class="fade-up">
        <div class="main-header">
          <div><p class="main-label">Administrator</p><h1 class="main-title">Kundenbewertungen</h1></div>
        </div>
        <div class="section-card">
          <div class="empty-state" v-if="!allReviews.length">
            <div class="es-icon">⭐</div>
            <div class="es-text">Noch keine Bewertungen</div>
            <div class="es-sub">Bewertungen erscheinen hier nach dem Vertragsabschluss.</div>
          </div>
          <table class="contract-table" v-else>
            <thead><tr><th>Datum</th><th>Name</th><th>Produkt</th><th>Sterne</th><th>Kommentar</th><th>Status</th><th></th></tr></thead>
            <tbody>
              <tr v-for="r in allReviews" :key="r.id">
                <td class="td-date">{{ fmtDateTime(r.date) }}</td>
                <td>{{ r.name }}</td>
                <td>{{ r.product === 'strom' ? '⚡' : '🔥' }} {{ r.product?.toUpperCase() }}</td>
                <td>
                  <span v-for="s in 5" :key="s" :style="{ color: s <= r.stars ? '#c9a84c' : 'rgba(255,255,255,0.2)' }">★</span>
                </td>
                <td style="max-width:300px;font-size:12px;color:var(--white-dim)">{{ r.text || '—' }}</td>
                <td><span class="status-chip done">Sichtbar</span></td>
                <td><button class="del-btn" @click="deleteReview(r.id)">✕</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CONTRACTS VIEW -->
      <div v-if="view === 'contracts'" class="fade-up">
        <div class="main-header">
          <div>
            <p class="main-label">Administrator</p>
            <h1 class="main-title">Alle Verträge</h1>
          </div>
          <div class="header-actions">
            <input v-model="search" class="search-input" placeholder="Name, E-Mail suchen…" />
            <select v-model="filterType" class="filter-sel">
              <option value="">Alle Produkte</option>
              <option value="strom">Strom</option>
              <option value="gas">Gas</option>
            </select>
          </div>
        </div>

        <div class="section-card">
          <div class="empty-state" v-if="!filteredContracts.length">
            <div class="es-icon">🔍</div>
            <div class="es-text">Keine Verträge gefunden</div>
            <div class="es-sub" v-if="search || filterType">Andere Suchkriterien versuchen.</div>
            <div class="es-sub" v-else>Noch keine Verträge erfasst.</div>
          </div>
          <table class="contract-table" v-else>
            <thead>
              <tr>
                <th>Datum</th><th>Kunde</th><th>E-Mail</th><th>Produkt</th><th>Kundentyp</th><th>Zahlung</th><th>Vermittelt durch</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in filteredContracts" :key="c.id" class="table-row">
                <td class="td-date">{{ fmtDateTime(c.createdAt) }}</td>
                <td class="td-name">
                  <div>{{ c.customer.firstName }} {{ c.customer.lastName }}</div>
                  <div class="sub-text" v-if="c.customer.company">{{ c.customer.company }}</div>
                </td>
                <td class="td-email">{{ c.customer.email }}</td>
                <td>
                  <span class="prod-chip" :class="c.product.energyType">
                    {{ c.product.energyType === 'strom' ? '⚡' : '🔥' }} {{ c.product.energyType?.toUpperCase() }}
                  </span>
                </td>
                <td class="td-type">{{ labelCt(c.product.customerType) }}</td>
                <td class="td-pay">{{ c.product.paymentMethod === 'sepa' ? 'SEPA' : 'Überweisung' }}</td>
                <td><span class="status-chip done">{{ c.status }}</span></td>
                <td>
                  <div class="row-actions">
                    <button class="view-btn" @click="openDetail(c)">Details</button>
                    <button class="del-btn" @click="confirmDelete(c)">✕</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>

    <!-- Detail Modal -->
    <div class="modal-overlay" v-if="detailContract" @click.self="detailContract = null">
      <div class="modal fade-up">
        <div class="modal-header">
          <h3 class="modal-title">Vertragsdetails</h3>
          <button class="modal-close" @click="detailContract = null">✕</button>
        </div>
        <div class="modal-body">
          <div class="detail-section">
            <div class="ds-title">Produkt</div>
            <div class="ds-rows">
              <div class="ds-row"><span>Energieart</span><span>{{ detailContract.product.energyType?.toUpperCase() }}</span></div>
              <div class="ds-row"><span>Kundentyp</span><span>{{ labelCt(detailContract.product.customerType) }}</span></div>
              <div class="ds-row"><span>Tarif</span><span>{{ detailContract.product.tariffType }}</span></div>
              <div class="ds-row"><span>PDF-Vorlage</span><span class="mono">{{ detailContract.templateName }}</span></div>
            </div>
          </div>
          <div class="detail-section">
            <div class="ds-title">Kundeninformationen</div>
            <div class="ds-rows">
              <div class="ds-row"><span>Name</span><span>{{ detailContract.customer.salutation }} {{ detailContract.customer.title }} {{ detailContract.customer.firstName }} {{ detailContract.customer.lastName }}</span></div>
              <div class="ds-row" v-if="detailContract.customer.company"><span>Firma</span><span>{{ detailContract.customer.company }}</span></div>
              <div class="ds-row"><span>E-Mail</span><span>{{ detailContract.customer.email }}</span></div>
              <div class="ds-row"><span>Telefon</span><span>{{ detailContract.customer.phone }}</span></div>
              <div class="ds-row"><span>Geburtsdatum</span><span>{{ fmtDate(detailContract.customer.birthDate) }}</span></div>
              <div class="ds-row"><span>Adresse</span><span>{{ detailContract.customer.street }} {{ detailContract.customer.houseNumber }}, {{ detailContract.customer.postalCode }} {{ detailContract.customer.city }}</span></div>
            </div>
          </div>
          <div class="detail-section">
            <div class="ds-title">Vertragsdaten</div>
            <div class="ds-rows">
              <div class="ds-row"><span>Anbieter</span><span>{{ detailContract.product.provider === 'verbund' ? 'VERBUND Energy4Customers' : detailContract.product.provider === 'montana' ? 'Montana Energie' : '—' }}</span></div>
              <div class="ds-row"><span>Zahlungsart</span><span>{{ detailContract.product.paymentMethod === 'sepa' ? 'SEPA-Lastschriftmandat' : 'Zahlungsanweisung' }}</span></div>
              <div class="ds-row" v-if="detailContract.product.iban"><span>IBAN</span><span class="mono">{{ detailContract.product.iban }}</span></div>
              <div class="ds-row"><span>Kontoinhaber</span><span>{{ detailContract.product.accountHolder || '—' }}</span></div>
              <div class="ds-row"><span>Übergabeart</span><span>{{ detailContract.product.deliveryType === 'wechsel' ? 'Lieferantenwechsel' : 'Neubezug' }}</span></div>
              <div class="ds-row"><span>Netzbetreiber</span><span>{{ detailContract.product.gridOperator || '—' }}</span></div>
              <div class="ds-row"><span>Jahresverbrauch</span><span>{{ detailContract.product.annualConsumption ? detailContract.product.annualConsumption + ' kWh' : '—' }}</span></div>
              <div class="ds-row"><span>Zählpunktbezeichnung</span><span class="mono" style="font-size:11px">{{ detailContract.product.meterPointId || '—' }}</span></div>
              <div class="ds-row"><span>Zählernummer</span><span>{{ detailContract.product.meterNumber || '—' }}</span></div>
              <div class="ds-row"><span>Bisheriger Lieferant</span><span>{{ detailContract.product.previousSupplier || '—' }}</span></div>
              <div class="ds-row"><span>Lieferbeginn</span><span>{{ fmtDate(detailContract.product.deliveryStart) || '—' }}</span></div>
              <div class="ds-row"><span>Vermittelt durch</span><span>{{ detailContract.agent || '—' }}</span></div>
              <div class="ds-row"><span>Erfasst am</span><span>{{ fmtDateTime(detailContract.createdAt) }}</span></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <span class="status-chip done">{{ detailContract.status }}</span>
          <button class="dl-btn" @click="downloadContractPdf(detailContract)">📄 PDF herunterladen</button>
          <button class="del-btn-lg" @click="confirmDelete(detailContract); detailContract = null">Vertrag löschen</button>
          <button class="btn-gold" @click="detailContract = null">Schließen</button>
        </div>
      </div>
    </div>

    <!-- Confirm delete -->
    <div class="modal-overlay" v-if="deleteTarget" @click.self="deleteTarget = null">
      <div class="modal small fade-up">
        <div class="modal-header">
          <h3 class="modal-title">Vertrag löschen</h3>
          <button class="modal-close" @click="deleteTarget = null">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:14px;color:var(--white-dim);line-height:1.6">
            Möchten Sie den Vertrag von <strong>{{ deleteTarget.customer.firstName }} {{ deleteTarget.customer.lastName }}</strong> wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn-ghost" @click="deleteTarget = null">Abbrechen</button>
          <button class="del-btn-lg" @click="doDelete">Ja, löschen</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useSettingsStore } from '../stores/settings.js'
import OptivaroLogo from '../components/OptivaroLogo.vue'

const router = useRouter()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const settings = settingsStore  // alias for template
const sd = settingsStore.data  // reactive ref to settings data

const allReviews = computed(() => settingsStore.data.reviews || [])

function saveSettings() {
  settingsStore.updateAll(sd)
  alert('Einstellungen gespeichert! Änderungen sind sofort auf der Kundenseite sichtbar.')
}

function deleteReview(id) {
  settingsStore.deleteReview(id)
}
const view = ref('dashboard')
const search = ref('')
const filterType = ref('')
const detailContract = ref(null)
const deleteTarget = ref(null)

const contracts = computed(() => auth.contracts)
const todayStr = new Date().toLocaleDateString('de-AT', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

const stats = computed(() => [
  { icon:'📄', val: contracts.value.length, label:'Verträge gesamt' },
  { icon:'⚡', val: contracts.value.filter(c=>c.product.energyType==='strom').length, label:'Strom-Verträge' },
  { icon:'🔥', val: contracts.value.filter(c=>c.product.energyType==='gas').length, label:'Gas-Verträge' },
  { icon:'🏢', val: contracts.value.filter(c=>c.product.customerType!=='privat').length, label:'Gewerbe-Kunden' },
])

const filteredContracts = computed(() => {
  let list = contracts.value
  if (filterType.value) list = list.filter(c => c.product.energyType === filterType.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(c =>
      (c.customer.firstName + ' ' + c.customer.lastName).toLowerCase().includes(q) ||
      c.customer.email?.toLowerCase().includes(q) ||
      c.customer.company?.toLowerCase().includes(q)
    )
  }
  return list
})

const ctLabels = { privat:'Privat', kmu:'KMU', business:'Business' }
function labelCt(v) { return ctLabels[v] || v }

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${String(dt.getDate()).padStart(2,'0')}.${String(dt.getMonth()+1).padStart(2,'0')}.${dt.getFullYear()}`
}
function fmtDateTime(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${fmtDate(d)} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`
}

function openDetail(c) { detailContract.value = c }
function confirmDelete(c) { deleteTarget.value = c }
function doDelete() { auth.deleteContract(deleteTarget.value.id); deleteTarget.value = null }

async function downloadContractPdf(contract) {
  try {
    const { generateFilledPDF } = await import('../utils/pdfFiller.js')
    const form = {
      ...contract.customer,
      ...contract.product,
    }
    const pdfBytes = await generateFilledPDF(form, contract.templateName, null, null)
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Optivaro_${contract.templateName}_${contract.customer.lastName}_${fmtDate(contract.createdAt)}.pdf`
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  } catch(e) {
    alert('PDF-Fehler: ' + e.message)
  }
}
function resetAnbieter() {
  if (!confirm('Alle Anbieter auf Standardwerte zurücksetzen? (Ihre Änderungen gehen verloren)')) return
  const DEFAULTS = [
    { id: 1, name: 'VERBUND Energy',    stromCt: 18.84, gasCt:  9.48, grundpreisStrom: 5.64, grundpreisGas: 7.19, platz: 1, sichtbar: true,  istOptivaro: true,  logo: '⚡', farbe: '#2a7d5a' },
    { id: 2, name: 'Wien Energie',       stromCt: 27.20, gasCt: 13.10, grundpreisStrom: 6.50, grundpreisGas: 8.20, platz: 2, sichtbar: true,  istOptivaro: false, logo: '🏙️', farbe: '#1a5fa8' },
    { id: 3, name: 'EVN',                stromCt: 26.80, gasCt: 12.90, grundpreisStrom: 6.20, grundpreisGas: 7.90, platz: 3, sichtbar: true,  istOptivaro: false, logo: '🔵', farbe: '#003d7a' },
    { id: 4, name: 'KELAG',              stromCt: 27.80, gasCt: 13.40, grundpreisStrom: 6.80, grundpreisGas: 8.50, platz: 0, sichtbar: false, istOptivaro: false, logo: '🟠', farbe: '#e05a00' },
    { id: 5, name: 'Energie AG OÖ',      stromCt: 25.90, gasCt: 12.60, grundpreisStrom: 6.10, grundpreisGas: 7.80, platz: 0, sichtbar: false, istOptivaro: false, logo: '🟢', farbe: '#2d8a4e' },
    { id: 6, name: 'Salzburg AG',        stromCt: 26.10, gasCt: 12.40, grundpreisStrom: 6.00, grundpreisGas: 7.60, platz: 0, sichtbar: false, istOptivaro: false, logo: '🔴', farbe: '#c0392b' },
    { id: 7, name: 'Energie Steiermark', stromCt: 27.50, gasCt: 13.20, grundpreisStrom: 6.60, grundpreisGas: 8.30, platz: 0, sichtbar: false, istOptivaro: false, logo: '⚪', farbe: '#555' },
  ]
  settings.data.anbieter = DEFAULTS
  settings.save()
}
function addAnbieter() {
  const ids = (settings.data.anbieter || []).map(a => a.id)
  const newId = Math.max(0, ...ids) + 1
  settings.data.anbieter.push({
    id: newId, name: 'Neuer Anbieter', stromCt: 25.0, gasCt: 12.0,
    grundpreisStrom: 6.0, grundpreisGas: 7.5, platz: 0, sichtbar: false,
    istOptivaro: false, logo: '⚪', farbe: '#888'
  })
  settings.save()
}
function delAnbieter(id) {
  if (!confirm('Anbieter löschen?')) return
  settings.data.anbieter = settings.data.anbieter.filter(a => a.id !== id)
  settings.save()
}
function doLogout() { auth.logout(); router.push('/login') }
function exportContacts() { auth.exportData() }
</script>

<style scoped>
.admin-page { display:flex; min-height:100vh; position:relative; z-index:1; }

/* Sidebar */
.admin-sidebar { width:240px; background:rgba(13,27,46,0.96); border-right:1px solid var(--border); display:flex; flex-direction:column; position:fixed; top:0; left:0; bottom:0; backdrop-filter:blur(20px); z-index:10; }
.side-logo { display:flex; align-items:center; gap:12px; padding:22px 18px; border-bottom:1px solid var(--border); }
.logo-name { font-family:var(--font-d); font-size:15px; font-weight:700; letter-spacing:0.15em; background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.logo-tag { font-size:9px; letter-spacing:0.2em; color:var(--white-dim); }
.side-nav { flex:1; padding:16px 10px; display:flex; flex-direction:column; gap:4px; }
.side-item { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; color:var(--white-dim); background:none; border:none; font-family:var(--font-b); font-size:13px; cursor:pointer; transition:all 0.2s; width:100%; text-align:left; position:relative; }
.side-item:hover { color:var(--white); background:rgba(255,255,255,0.05); }
.side-item.active { color:var(--gold-light); background:rgba(201,168,76,0.1); }
.side-badge { margin-left:auto; background:var(--gold); color:var(--navy); border-radius:10px; padding:2px 7px; font-size:10px; font-weight:700; }
.side-bottom { padding:14px; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:10px; }
.side-user { display:flex; align-items:center; gap:10px; }
.user-av { width:34px; height:34px; background:linear-gradient(135deg,var(--gold),var(--gold-dim)); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:var(--navy); flex-shrink:0; }
.user-nm { font-size:13px; font-weight:500; }
.user-rl { font-size:11px; color:var(--white-dim); }
.logout-btn { width:100%; background:rgba(155,44,44,0.15); border:1px solid rgba(155,44,44,0.3); color:#fca5a5; border-radius:8px; padding:8px; font-family:var(--font-b); font-size:13px; cursor:pointer; transition:all 0.2s; }
.logout-btn:hover { background:rgba(155,44,44,0.25); }
.customer-link { text-align:center; font-size:12px; color:var(--white-muted); text-decoration:none; transition:color 0.2s; }
.customer-link:hover { color:var(--gold); }

/* Main */
.admin-main { flex:1; margin-left:240px; padding:36px 40px; max-width:calc(100vw - 240px); }
.main-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; flex-wrap:wrap; gap:16px; }
.main-label { font-size:11px; color:var(--gold); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px; }
.main-title { font-family:var(--font-d); font-size:38px; font-weight:300; }
.header-date { font-size:13px; color:var(--white-dim); margin-top:10px; }
.header-actions { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.search-input { background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white); border-radius:8px; padding:9px 14px; font-size:13px; font-family:var(--font-b); width:220px; outline:none; transition:all 0.2s; }
.search-input:focus { border-color:var(--gold); }
.search-input::placeholder { color:var(--white-muted); }
.filter-sel { background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white); border-radius:8px; padding:9px 14px; font-size:13px; font-family:var(--font-b); outline:none; cursor:pointer; }

/* Stats */
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:28px; }
.stat-card { background:rgba(21,36,56,0.85); border:1px solid var(--border); border-radius:16px; padding:22px; text-align:center; transition:all 0.25s; backdrop-filter:blur(10px); }
.stat-card:hover { border-color:var(--border-hover); transform:translateY(-2px); }
.stat-icon { font-size:28px; margin-bottom:8px; }
.stat-val { font-family:var(--font-d); font-size:36px; font-weight:600; margin-bottom:4px; }
.stat-label { font-size:12px; color:var(--white-dim); }

/* Section card */
.section-card { background:rgba(21,36,56,0.85); border:1px solid var(--border); border-radius:18px; padding:24px; backdrop-filter:blur(12px); }
.sc-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
.sc-title { font-family:var(--font-d); font-size:22px; font-weight:400; }
.sm { padding:7px 16px; font-size:12px; }

/* Table */
.contract-table { width:100%; border-collapse:collapse; }
.contract-table th { font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--white-dim); padding:8px 12px; text-align:left; border-bottom:1px solid var(--border); }
.contract-table td { padding:12px 12px; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
.table-row:hover td { background:rgba(255,255,255,0.02); }
.td-date { color:var(--white-dim); font-size:12px; white-space:nowrap; }
.td-name { font-weight:500; }
.td-email { color:var(--white-dim); font-size:12px; }
.td-pay { font-size:12px; color:var(--white-dim); }
.td-type { font-size:12px; }
.sub-text { font-size:11px; color:var(--white-dim); margin-top:2px; }
.prod-chip { border-radius:8px; padding:3px 10px; font-size:11px; font-weight:600; }
.prod-chip.strom { background:rgba(37,99,168,0.2); color:#60b4ff; }
.prod-chip.gas   { background:rgba(201,168,76,0.15); color:var(--gold-light); }
.status-chip { border-radius:8px; padding:4px 10px; font-size:11px; font-weight:600; }
.status-chip.done { background:rgba(42,125,90,0.2); color:#4ade80; }
.view-btn { background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white-dim); border-radius:6px; padding:5px 12px; font-size:12px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.view-btn:hover { border-color:var(--gold-dim); color:var(--gold); }
.del-btn { background:rgba(155,44,44,0.1); border:1px solid rgba(155,44,44,0.25); color:#fca5a5; border-radius:6px; padding:5px 10px; font-size:12px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.del-btn:hover { background:rgba(155,44,44,0.2); }
.row-actions { display:flex; gap:6px; }

/* Empty state */
.empty-state { text-align:center; padding:48px 20px; }
.es-icon { font-size:40px; margin-bottom:12px; }
.es-text { font-size:16px; font-weight:500; margin-bottom:6px; }
.es-sub { font-size:13px; color:var(--white-dim); }

/* Modal */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
.modal { background:rgba(21,36,56,0.98); border:1px solid var(--border); border-radius:20px; width:100%; max-width:560px; max-height:85vh; overflow-y:auto; }
.modal.small { max-width:420px; }
.modal-header { display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid var(--border); }
.modal-title { font-family:var(--font-d); font-size:22px; font-weight:400; }
.modal-close { background:none; border:none; color:var(--white-dim); font-size:18px; cursor:pointer; padding:4px 8px; border-radius:4px; font-family:var(--font-b); }
.modal-close:hover { color:var(--white); }
.modal-body { padding:20px 24px; display:flex; flex-direction:column; gap:20px; }
.modal-footer { display:flex; justify-content:flex-end; align-items:center; gap:12px; padding:16px 24px; border-top:1px solid var(--border); }
.detail-section { }
.ds-title { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
.ds-rows { display:flex; flex-direction:column; gap:8px; }
.ds-row { display:flex; gap:12px; font-size:13px; }
.ds-row span:first-child { width:130px; color:var(--white-dim); flex-shrink:0; font-size:12px; padding-top:1px; }
.ds-row span:last-child { flex:1; }
.mono { font-family:monospace; font-size:12px; }
.del-btn-lg { background:rgba(155,44,44,0.15); border:1px solid rgba(155,44,44,0.3); color:#fca5a5; border-radius:8px; padding:10px 18px; font-size:13px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.del-btn-lg:hover { background:rgba(155,44,44,0.3); }

/* Settings */
.settings-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.full-span{grid-column:span 2;}
.set-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.set-field{display:flex;flex-direction:column;gap:6px;}
.set-field label{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold);}
.set-field input{background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--white);border-radius:8px;padding:9px 13px;font-size:14px;font-family:var(--font-b);outline:none;transition:all 0.2s;}
.set-field input:focus{border-color:var(--gold);background:rgba(201,168,76,0.07);}
.set-hint{font-size:11px;color:var(--white-muted);line-height:1.4;}
.anbieter-table{display:flex;flex-direction:column;gap:8px;}
.at-header{display:grid;grid-template-columns:1fr 140px 140px;gap:10px;font-size:11px;color:var(--white-dim);letter-spacing:0.06em;text-transform:uppercase;padding:0 4px;}
.at-row{display:grid;grid-template-columns:1fr 140px 140px;gap:10px;}
.at-input{background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--white);border-radius:8px;padding:8px 12px;font-size:13px;font-family:var(--font-b);outline:none;transition:all 0.2s;}
.at-input:focus{border-color:var(--gold);}
.save-bar{display:flex;justify-content:space-between;align-items:center;background:rgba(201,168,76,0.08);border:1px solid var(--border);border-radius:12px;padding:16px 24px;margin-top:8px;}
.save-note{font-size:13px;color:var(--white-dim);}

.td-agent { font-size:12px; color:var(--white-dim); max-width:120px; }
.detail-line { font-size:12px; margin-bottom:2px; }
.new-chip { background:rgba(37,99,168,0.2); color:#60b4ff; }
.btn-gold.sm { padding:8px 16px; font-size:12px; }

.td-input { background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white); border-radius:6px; padding:5px 8px; font-size:12px; font-family:var(--font-b); outline:none; }
.td-input:focus { border-color:var(--gold); }
.tog.sm { width:34px; min-width:34px; height:18px; }
.tog.sm .tog-knob { width:12px; height:12px; top:2px; left:2px; }
.tog.sm.on .tog-knob { transform:translateX(16px); }

.info-banner-admin { background:rgba(37,99,168,0.1); border:1px solid rgba(37,99,168,0.3); border-radius:10px; padding:12px 16px; font-size:13px; color:var(--white-dim); margin-bottom:20px; line-height:1.6; }
.info-banner-admin strong { color:var(--white); }
.anbieter-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:16px; }
.anb-card { background:rgba(21,36,56,0.88); border:1.5px solid var(--border); border-radius:16px; overflow:hidden; transition:border-color 0.2s; }
.anb-card.anb-platz1 { border-color:var(--gold); }
.anb-card.anb-hidden { opacity:0.5; }
.anb-card-header { display:flex; align-items:center; gap:10px; padding:14px 16px; background:rgba(13,27,46,0.5); border-bottom:1px solid var(--border); }
.anb-card-name { font-size:14px; font-weight:600; }
.anb-platz-badge { font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; background:rgba(255,255,255,0.08); color:var(--white-dim); white-space:nowrap; }
.platz-1 { background:rgba(201,168,76,0.2); color:var(--gold); }
.platz-2 { background:rgba(200,200,200,0.1); color:#ccc; }
.platz-3 { background:rgba(180,130,80,0.1); color:#cd7f32; }
.anb-card-body { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:16px; }
.anb-field { display:flex; flex-direction:column; gap:4px; }
.anb-field label { font-size:10px; letter-spacing:0.07em; text-transform:uppercase; color:var(--gold); }
.anb-field:first-child { grid-column:span 2; }
.anb-field:nth-child(2) { grid-column:span 2; }
.btn-ghost.sm { padding:8px 16px; font-size:12px; }
.dl-btn { background:rgba(37,99,168,0.15); border:1px solid rgba(37,99,168,0.35); color:#90b4ff; border-radius:8px; padding:10px 18px; font-size:13px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.dl-btn:hover { background:rgba(37,99,168,0.25); }
</style>
