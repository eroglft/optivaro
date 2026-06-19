<template>
  <div class="customer-page">
    <!-- Top nav -->
    <nav class="top-nav">
      <div class="nav-brand">
        <OptivaroLogo :size="38" />
        <div>
          <div class="brand-name">OPTIVARO</div>
          <div class="brand-sub">Energie & Verträge</div>
        </div>
      </div>
      <router-link to="/login" class="admin-link">Admin ↗</router-link>
    </nav>

    <!-- Hero (step 0 only) -->
    <div class="hero" v-if="step === 0">
      <div class="hero-content fade-up">
        <p class="hero-label">Willkommen bei Optivaro</p>
        <h1 class="hero-title">Ihr Energievertrag<br/><span class="gold">in wenigen Minuten</span></h1>
        <p class="hero-desc">Wählen Sie Ihr Produkt, tragen Sie Ihre Daten ein und laden Sie Ihren fertig ausgefüllten Vertrag direkt herunter — einfach, sicher und papierlos.</p>
        <div class="hero-badges">
          <div class="badge">✓ Kostenlos & unverbindlich</div>
          <div class="badge">✓ SSL-verschlüsselt</div>
          <div class="badge">✓ PDF sofort verfügbar</div>
        </div>
      </div>
    </div>

    <!-- Step progress bar -->
    <div class="progress-wrap" v-if="step > 0">
      <div class="progress-inner">
        <div v-for="(s, i) in steps" :key="i" class="prog-item" :class="{ done: step > i+1, active: step === i+1 }">
          <div class="prog-dot">
            <svg v-if="step > i+1" width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l4 4 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
            <span v-else>{{ i+1 }}</span>
          </div>
          <span class="prog-label">{{ s }}</span>
          <div class="prog-line" v-if="i < steps.length - 1"></div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="page-body">

      <!-- ═══ STEP 0: Produktauswahl ═══ -->
      <div v-if="step === 0" class="section-wrap fade-up">
        <div class="section-head">
          <h2 class="section-title">Produkt wählen</h2>
          <p class="section-desc">Wählen Sie zuerst die Energieart und dann Ihren Vertragstyp. Alle Preise verstehen sich inkl. USt.</p>
        </div>

        <div class="product-grid">
          <div class="product-card" :class="{ sel: form.energyType === 'strom' }" @click="form.energyType = 'strom'">
            <div class="pc-glow"></div>
            <div class="pc-icon">⚡</div>
            <h3 class="pc-title">Strom</h3>
            <p class="pc-desc">100 % Wasserkraft aus Österreich — sauber und günstig für Ihr Zuhause oder Ihren Betrieb.</p>
            <div class="pc-options" @click.stop>
              <div class="opt-group">
                <p class="opt-title">Ihr Vertragstyp</p>
                <label class="radio-row" v-for="t in customerTypes" :key="t.v">
                  <span class="radio-box" :class="{ on: form.customerType === t.v }" @click="form.customerType = t.v"></span>
                  {{ t.l }}
                </label>
              </div>
              <div class="opt-group">
                <p class="opt-title">Tariftyp</p>
                <label class="radio-row" v-for="t in tariffTypes" :key="t.v">
                  <span class="radio-box" :class="{ on: form.tariffType === t.v }" @click="form.tariffType = t.v"></span>
                  {{ t.l }}
                </label>
              </div>
            </div>
            <button class="pc-btn" :class="{ active: form.energyType === 'strom' }" @click.stop="pickProduct('strom')">
              Strom wählen →
            </button>
          </div>

          <div class="product-card" :class="{ sel: form.energyType === 'gas' }" @click="form.energyType = 'gas'">
            <div class="pc-glow"></div>
            <div class="pc-icon">🔥</div>
            <h3 class="pc-title">Gas</h3>
            <p class="pc-desc">Zuverlässige Gasversorgung zu fairen Preisen — mit Preisgarantie im ersten Vertragsjahr.</p>
            <div class="pc-options" @click.stop>
              <div class="opt-group">
                <p class="opt-title">Ihr Vertragstyp</p>
                <label class="radio-row" v-for="t in customerTypes" :key="t.v">
                  <span class="radio-box" :class="{ on: form.customerType === t.v }" @click="form.customerType = t.v"></span>
                  {{ t.l }}
                </label>
              </div>
              <div class="opt-group">
                <p class="opt-title">Tariftyp</p>
                <label class="radio-row" v-for="t in tariffTypes" :key="t.v">
                  <span class="radio-box" :class="{ on: form.tariffType === t.v }" @click="form.tariffType = t.v"></span>
                  {{ t.l }}
                </label>
              </div>
            </div>
            <button class="pc-btn" :class="{ active: form.energyType === 'gas' }" @click.stop="pickProduct('gas')">
              Gas wählen →
            </button>
          </div>
        </div>

        <!-- Info boxes -->
        <div class="info-row">
          <div class="info-box">
            <div class="info-icon">🔒</div>
            <div>
              <strong>Preisgarantie 12 Monate</strong>
              <p>Der gesamte Energiepreis bleibt in den ersten 12 Liefermonaten fix — keine bösen Überraschungen.</p>
            </div>
          </div>
          <div class="info-box">
            <div class="info-icon">🎁</div>
            <div>
              <strong>2 Monate gratis</strong>
              <p>Als Neukunde erhalten Sie bei mindestens 1 Jahr Laufzeit 2 Monate Energie als Bonus.</p>
            </div>
          </div>
          <div class="info-box">
            <div class="info-icon">📄</div>
            <div>
              <strong>Sofort-Download</strong>
              <p>Nach dem Ausfüllen erhalten Sie Ihren fertig ausgefüllten Vertrag als PDF zum Herunterladen.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ STEP 1: Persönliche Daten ═══ -->
      <div v-if="step === 1" class="section-wrap fade-up">
        <div class="section-head">
          <h2 class="section-title">Ihre persönlichen Daten</h2>
          <p class="section-desc">Bitte füllen Sie alle Pflichtfelder (mit * markiert) vollständig aus. Ihre Daten werden ausschließlich für die Vertragsabwicklung verwendet.</p>
        </div>

        <div class="form-card">
          <div class="form-card-title">Angaben zur Person</div>
          <div class="form-grid">
            <div class="fg">
              <label>Anrede *</label>
              <select v-model="form.salutation">
                <option value="">Bitte wählen</option>
                <option>Herr</option><option>Frau</option><option>Divers</option>
              </select>
            </div>
            <div class="fg">
              <label>Titel</label>
              <select v-model="form.title">
                <option value="">Kein Titel</option>
                <option>Dr.</option><option>Mag.</option><option>Ing.</option><option>DI</option><option>Prof.</option>
              </select>
            </div>
            <div class="fg">
              <label>Vorname *</label>
              <input v-model="form.firstName" placeholder="Max" />
            </div>
            <div class="fg">
              <label>Nachname *</label>
              <input v-model="form.lastName" placeholder="Mustermann" />
            </div>
            <div class="fg span2" v-if="isGewerbe">
              <label>Firmenname</label>
              <input v-model="form.company" placeholder="Muster GmbH" />
            </div>
            <div class="fg" v-if="isGewerbe">
              <label>UID / Firmenbuch-Nr.</label>
              <input v-model="form.uid" placeholder="ATU12345678" />
            </div>
            <div class="fg">
              <label>Geburtsdatum *</label>
              <input type="date" v-model="form.birthDate" />
            </div>
          </div>

          <div class="form-card-title" style="margin-top:28px">Kontaktdaten</div>
          <div class="form-grid">
            <div class="fg span2">
              <label>E-Mail-Adresse *</label>
              <input type="email" v-model="form.email" placeholder="max@beispiel.at" />
              <span class="fg-hint">Für die Übermittlung Ihrer Vertragsunterlagen</span>
            </div>
            <div class="fg span2">
              <label>Telefonnummer *</label>
              <div class="input-row">
                <span class="prefix">+43</span>
                <input v-model="form.phone" placeholder="660 123 456 78" style="border-radius:0 8px 8px 0" />
              </div>
            </div>
          </div>

          <div class="form-card-title" style="margin-top:28px">Lieferadresse</div>
          <p class="form-card-desc">Die Adresse, an der die Energie geliefert wird.</p>
          <div class="form-grid">
            <div class="fg span2">
              <label>Straße *</label>
              <input v-model="form.street" placeholder="Musterstraße" />
            </div>
            <div class="fg">
              <label>Hausnummer *</label>
              <input v-model="form.houseNumber" placeholder="12" />
            </div>
            <div class="fg">
              <label>Stiege</label>
              <input v-model="form.staircase" placeholder="A" />
            </div>
            <div class="fg">
              <label>Stock</label>
              <input v-model="form.floor" placeholder="3" />
            </div>
            <div class="fg">
              <label>Tür</label>
              <input v-model="form.door" placeholder="15" />
            </div>
            <div class="fg">
              <label>PLZ *</label>
              <input v-model="form.postalCode" placeholder="1010" />
            </div>
            <div class="fg">
              <label>Ort *</label>
              <input v-model="form.city" placeholder="Wien" />
            </div>
          </div>

          <div class="form-card-title" style="margin-top:28px">Kommunikation & Rechnung</div>
          <div class="toggle-group">
            <div class="toggle-item" v-for="(lbl, key) in toggleFields" :key="key">
              <div class="tog" :class="{ on: form[key] }" @click="form[key] = !form[key]">
                <div class="tog-knob"></div>
              </div>
              <div class="tog-info">
                <strong>{{ lbl.title }}</strong>
                <span>{{ lbl.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ STEP 2: Zahlungsart ═══ -->
      <div v-if="step === 2" class="section-wrap fade-up">
        <div class="section-head">
          <h2 class="section-title">Zahlungsart & Anlage</h2>
          <p class="section-desc">Wählen Sie Ihre bevorzugte Zahlungsart und geben Sie die technischen Daten Ihrer Anlage an.</p>
        </div>

        <div class="form-card">
          <div class="form-card-title">Zahlungsart</div>
          <div class="pay-opts">
            <div class="pay-opt" :class="{ sel: form.paymentMethod === 'sepa' }" @click="form.paymentMethod = 'sepa'">
              <div class="pay-radio" :class="{ on: form.paymentMethod === 'sepa' }"></div>
              <div class="pay-info">
                <strong>SEPA-Lastschriftmandat</strong>
                <span>Bequeme automatische Abbuchung von Ihrem Konto</span>
              </div>
              <span class="pay-badge">Empfohlen</span>
            </div>
            <div class="pay-opt" :class="{ sel: form.paymentMethod === 'invoice' }" @click="form.paymentMethod = 'invoice'">
              <div class="pay-radio" :class="{ on: form.paymentMethod === 'invoice' }"></div>
              <div class="pay-info">
                <strong>Zahlungsanweisung</strong>
                <span>Manuelle Überweisung per Rechnung</span>
              </div>
            </div>
          </div>

          <div v-if="form.paymentMethod === 'sepa'" class="sepa-form">
            <div class="form-card-title" style="margin-top:0">SEPA-Lastschriftdaten</div>
            <p class="form-card-desc">Durch die Angabe Ihrer Bankdaten erteilen Sie uns ein Lastschriftmandat zur Abbuchung fälliger Beträge.</p>
            <div class="form-grid">
              <div class="fg span2">
                <label>Name des Kontoinhabers</label>
                <input v-model="form.accountHolder" placeholder="Max Mustermann" />
              </div>
              <div class="fg span2">
                <label>IBAN</label>
                <input v-model="form.iban" placeholder="AT12 3456 7890 1234 5678" />
                <span class="fg-hint">Ihre IBAN finden Sie auf Ihrem Kontoauszug oder im Online-Banking</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-card">
          <div class="form-card-title">Technische Angaben zur Anlage</div>
          <p class="form-card-desc">Diese Informationen finden Sie auf Ihrer letzten Jahresabrechnung oder auf dem Zähler selbst.</p>

          <div class="delivery-opts">
            <div class="del-opt" :class="{ sel: form.deliveryType === 'wechsel' }" @click="form.deliveryType = 'wechsel'">
              <div class="del-radio" :class="{ on: form.deliveryType === 'wechsel' }"></div>
              <div>
                <strong>Lieferantenwechsel</strong>
                <p>Ich beziehe bereits Energie von einem anderen Anbieter und möchte wechseln.</p>
              </div>
            </div>
            <div class="del-opt" :class="{ sel: form.deliveryType === 'neubezug' }" @click="form.deliveryType = 'neubezug'">
              <div class="del-radio" :class="{ on: form.deliveryType === 'neubezug' }"></div>
              <div>
                <strong>Neubezug</strong>
                <p>Ich beziehe erstmalig Energie an diesem Standort.</p>
              </div>
            </div>
          </div>

          <div class="form-grid" style="margin-top:20px">
            <div class="fg span2">
              <label>Ihr Netzbetreiber</label>
              <input v-model="form.gridOperator" placeholder="z.B. Netz Wien GmbH" />
              <span class="fg-hint">Steht auf Ihrer Jahresabrechnung oben rechts</span>
            </div>
            <div class="fg span2">
              <label>Zählpunktbezeichnung (33 Stellen)</label>
              <input v-model="form.meterPointId" placeholder="AT0100000000000000000000000000001" maxlength="33" style="font-family:monospace;letter-spacing:0.04em" />
              <span class="fg-hint">Beginnt mit „AT" — auf Ihrer Jahresabrechnung</span>
            </div>
            <div class="fg">
              <label>Zählernummer</label>
              <input v-model="form.meterNumber" placeholder="12345678" />
            </div>
            <div class="fg">
              <label>Aktueller Zählerstand</label>
              <input type="number" v-model="form.meterReading" placeholder="12345" />
            </div>
            <div class="fg">
              <label>Jahresverbrauch (kWh)</label>
              <input type="number" v-model="form.annualConsumption" placeholder="3500" />
            </div>
            <div class="fg">
              <label>Gewünschter Lieferbeginn</label>
              <input type="date" v-model="form.deliveryStart" />
            </div>
            <div class="fg">
              <label>Ablesedatum</label>
              <input type="date" v-model="form.readingDate" />
            </div>
          </div>

          <div class="form-card-title" style="margin-top:28px">Rechnungsversand</div>
          <div class="contact-opts">
            <div class="con-opt" :class="{ sel: form.contactType === 'email' }" @click="form.contactType = 'email'">
              <div class="con-radio" :class="{ on: form.contactType === 'email' }"></div>
              <div>
                <strong>Online-Rechnung per E-Mail</strong>
                <p>Umweltfreundlich und sofort verfügbar — direkt in Ihrem Postfach</p>
              </div>
              <span class="bonus-chip">+2 Tage Gratis</span>
            </div>
            <div class="con-opt" :class="{ sel: form.contactType === 'postal' }" @click="form.contactType = 'postal'">
              <div class="con-radio" :class="{ on: form.contactType === 'postal' }"></div>
              <div>
                <strong>Postalische Rechnung</strong>
                <p>Rechnung und Kommunikation per Post</p>
              </div>
            </div>
          </div>

          <div class="form-grid" style="margin-top:20px">
            <div class="fg span2">
              <label>Vermittelt durch (optional)</label>
              <input v-model="form.agent" placeholder="Name des Beraters / Partnernummer" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ STEP 3: Unterschrift & Einwilligungen ═══ -->
      <div v-if="step === 3" class="section-wrap fade-up">
        <div class="section-head">
          <h2 class="section-title">Bestätigung & Unterschrift</h2>
          <p class="section-desc">Bitte lesen Sie die Einwilligungen und unterzeichnen Sie digital. Ihre Unterschrift wird direkt in den Vertrag übernommen.</p>
        </div>

        <div class="form-card">
          <div class="form-card-title">Ort & Datum</div>
          <div class="form-grid">
            <div class="fg">
              <label>Ort</label>
              <input v-model="form.signLocation" placeholder="Wien" />
            </div>
            <div class="fg">
              <label>Datum</label>
              <input type="date" v-model="form.signDate" />
            </div>
          </div>
        </div>

        <div class="form-card">
          <div class="form-card-title">Einwilligungen</div>
          <p class="form-card-desc">Die folgenden Einwilligungen sind freiwillig und können jederzeit widerrufen werden.</p>
          <div class="consent-list">
            <label class="consent-row" v-for="(c, k) in consents" :key="k" @click="form.consents[k] = !form.consents[k]">
              <div class="cbox" :class="{ on: form.consents[k] }">
                <svg v-if="form.consents[k]" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l3 3 5-5" stroke="#0d1b2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="consent-info">
                <strong>{{ c.title }}</strong>
                <span>{{ c.desc }}</span>
              </div>
              <span class="bonus-chip" v-if="c.bonus">{{ c.bonus }}</span>
            </label>
          </div>
        </div>

        <div class="form-card">
          <div class="form-card-title">Digitale Unterschrift</div>
          <p class="form-card-desc">Unterschreiben Sie mit der Maus oder per Touch-Eingabe. Die Unterschrift wird auf dem Vertrag platziert.</p>
          <div class="sig-wrap">
            <canvas ref="sigCanvas" class="sig-canvas"
              @mousedown="sigStart" @mousemove="sigDraw" @mouseup="sigStop" @mouseleave="sigStop"
              @touchstart.prevent="sigStartT" @touchmove.prevent="sigDrawT" @touchend="sigStop">
            </canvas>
            <button class="sig-clear" @click="sigClear">✕ Löschen</button>
            <p class="sig-hint">Unterschrift hier eingeben</p>
          </div>
        </div>
      </div>

      <!-- ═══ STEP 4: Abschluss & PDF ═══ -->
      <div v-if="step === 4" class="section-wrap fade-up">
        <div class="completion-wrap">
          <div class="completion-icon" :class="{ done: pdfDone }">
            <svg v-if="pdfDone" width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg v-else width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
          <h2 class="section-title" v-if="!pdfDone">Fast geschafft!</h2>
          <h2 class="section-title success-title" v-else>Vertrag erfolgreich erstellt ✓</h2>
          <p class="section-desc" v-if="!pdfDone">Überprüfen Sie Ihre Angaben und laden Sie Ihren ausgefüllten Vertrag als PDF herunter.</p>
          <p class="section-desc success-desc" v-else>Ihr Vertrag wurde heruntergeladen. Bitte senden Sie ihn unterschrieben an uns zurück.</p>
        </div>

        <!-- Summary -->
        <div class="summary-card">
          <div class="sum-title">Ihre Zusammenfassung</div>
          <div class="sum-rows">
            <div class="sum-row"><span class="sum-k">Produkt</span><span class="sum-v prod-val">{{ form.energyType === 'strom' ? '⚡' : '🔥' }} {{ form.energyType?.toUpperCase() }} — {{ labelFor(form.customerType, customerTypes) }} — {{ labelFor(form.tariffType, tariffTypes) }}</span></div>
            <div class="sum-row"><span class="sum-k">Vorlage</span><span class="sum-v mono">{{ templateName }}</span></div>
            <div class="sum-row"><span class="sum-k">Name</span><span class="sum-v">{{ form.salutation }} {{ form.title }} {{ form.firstName }} {{ form.lastName }}</span></div>
            <div class="sum-row" v-if="form.company"><span class="sum-k">Firma</span><span class="sum-v">{{ form.company }}</span></div>
            <div class="sum-row"><span class="sum-k">E-Mail</span><span class="sum-v">{{ form.email }}</span></div>
            <div class="sum-row"><span class="sum-k">Adresse</span><span class="sum-v">{{ form.street }} {{ form.houseNumber }}, {{ form.postalCode }} {{ form.city }}</span></div>
            <div class="sum-row"><span class="sum-k">Zahlung</span><span class="sum-v">{{ form.paymentMethod === 'sepa' ? 'SEPA-Lastschriftmandat' : 'Zahlungsanweisung' }}</span></div>
            <div class="sum-row" v-if="form.paymentMethod === 'sepa' && form.iban"><span class="sum-k">IBAN</span><span class="sum-v mono">{{ form.iban }}</span></div>
            <div class="sum-row"><span class="sum-k">Übergabe</span><span class="sum-v">{{ form.deliveryType === 'wechsel' ? 'Lieferantenwechsel' : 'Neubezug' }}</span></div>
            <div class="sum-row" v-if="form.deliveryStart"><span class="sum-k">Lieferbeginn</span><span class="sum-v">{{ fmtDate(form.deliveryStart) }}</span></div>
          </div>
        </div>

        <div class="pdf-actions">
          <button class="btn-pdf" @click="genPDF" :disabled="generating">
            <span v-if="generating" class="spinner-w"></span>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2"/><polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/></svg>
            {{ generating ? 'PDF wird erstellt…' : 'Vertrag als PDF herunterladen' }}
          </button>
          <button class="btn-ghost" @click="resetAll">Neuen Vertrag ausfüllen</button>
        </div>

        <div class="next-steps" v-if="pdfDone">
          <h3>Nächste Schritte</h3>
          <ol>
            <li>Drucken Sie das heruntergeladene PDF aus.</li>
            <li>Unterschreiben Sie auf der markierten Linie.</li>
            <li>Senden Sie den Vertrag per E-Mail oder Post an uns zurück.</li>
            <li>Wir bestätigen Ihren Vertrag innerhalb von 21 Tagen.</li>
          </ol>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="nav-bar" v-if="step < 4 || step === 0">
        <button class="btn-ghost" @click="prevStep" v-if="step > 0">← Zurück</button>
        <div class="nav-spacer"></div>
        <div class="nav-right">
          <span class="err-inline" v-if="validErr">{{ validErr }}</span>
          <button class="btn-gold" @click="nextStep" :disabled="!canNext">
            {{ step === 3 ? 'Zur Übersicht →' : 'Weiter →' }}
          </button>
        </div>
      </div>

    </div><!-- /page-body -->

    <!-- Footer -->
    <footer class="page-footer">
      <p>© {{ new Date().getFullYear() }} Optivaro Management GmbH · <a href="#" class="foot-link">Datenschutz</a> · <a href="#" class="foot-link">Impressum</a></p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { generateFilledPDF } from '../utils/pdfFiller.js'
import OptivaroLogo from '../components/OptivaroLogo.vue'

const auth = useAuthStore()
const step = ref(0)
const pdfDone = ref(false)
const generating = ref(false)
const validErr = ref('')
const sigCanvas = ref(null)
let sigDrawing = false, sigLX = 0, sigLY = 0

const steps = ['Persönliche Daten', 'Zahlung & Anlage', 'Unterschrift', 'Abschluss']

const customerTypes = [
  { v: 'privat', l: 'Privat / Haushalt' },
  { v: 'kmu',    l: 'KMU < 100.000 kWh' },
  { v: 'business', l: 'Business > 100.000 kWh' },
]
const tariffTypes = [
  { v: 'fix',  l: 'Fixpreis' },
  { v: 'spot', l: 'Spotpreis' },
]

const toggleFields = {
  emailRechnung: { title: 'E-Mail Rechnung', desc: 'Rechnungen per E-Mail empfangen' },
  bindung12:     { title: '12 Monate Bindung', desc: 'Mindestlaufzeit mit Preisgarantie' },
}

const consents = {
  marketing:   { title: 'Newsletter & Angebote', desc: 'Ich möchte über neue Produkte und Angebote informiert werden.', bonus: '+1 Tag Gratis' },
  individual:  { title: 'Persönliche Angebote', desc: 'Ich stimme der Zusendung individuell angepasster Angebote zu.', bonus: '+1 Tag Gratis' },
  dataUsage:   { title: 'Datenverarbeitung', desc: 'Ich stimme der Verarbeitung meiner Daten zur Kundensegmentierung zu.', bonus: null },
}

const form = ref({
  energyType: '', customerType: 'privat', tariffType: 'fix',
  salutation: '', title: '', firstName: '', lastName: '', company: '', uid: '',
  email: '', phone: '', birthDate: '',
  emailRechnung: true, bindung12: true,
  street: '', houseNumber: '', staircase: '', floor: '', door: '', postalCode: '', city: '',
  paymentMethod: 'sepa', accountHolder: '', iban: '',
  deliveryType: 'wechsel', gridOperator: '', meterPointId: '', meterNumber: '',
  meterReading: '', annualConsumption: '', deliveryStart: '', readingDate: '',
  contactType: 'email', agent: '',
  signLocation: '', signDate: new Date().toISOString().split('T')[0],
  consents: { marketing: false, individual: false, dataUsage: false },
})

const isGewerbe = computed(() => form.value.customerType !== 'privat')
const templateName = computed(() => {
  const e = form.value.energyType
  const g = isGewerbe.value
  if (!e) return '—'
  if (e === 'strom') return g ? 'Verbund_Strom_Gewerbe.pdf' : 'Verbund_Strom_Haushalt.pdf'
  return g ? 'Verbund_Gas_Gewerbe.pdf' : 'Verbund_Gas_Haushalt.pdf'
})

const canNext = computed(() => {
  if (step.value === 0) return !!form.value.energyType
  if (step.value === 1) {
    return form.value.salutation && form.value.firstName && form.value.lastName &&
           form.value.email && form.value.street && form.value.houseNumber &&
           form.value.postalCode && form.value.city
  }
  return true
})

function labelFor(val, list) { return list.find(t => t.v === val)?.l || val }
function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${String(dt.getDate()).padStart(2,'0')}.${String(dt.getMonth()+1).padStart(2,'0')}.${dt.getFullYear()}`
}

function pickProduct(type) {
  form.value.energyType = type
  nextTick(() => nextStep())
}

function nextStep() {
  validErr.value = ''
  if (!canNext.value) {
    validErr.value = 'Bitte füllen Sie alle Pflichtfelder aus.'
    return
  }
  if (step.value === 0) { step.value = 1; return }
  step.value++
  if (step.value === 3) nextTick(() => initSig())
}

function prevStep() { step.value = Math.max(0, step.value - 1) }

function resetAll() { step.value = 0; pdfDone.value = false; form.value.energyType = '' }

// Signature
function initSig() {
  const c = sigCanvas.value; if (!c) return
  c.width = c.offsetWidth; c.height = 160
  const ctx = c.getContext('2d')
  ctx.strokeStyle = '#e4c06e'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
}
function pos(e, c) { const r = c.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top } }
function sigStart(e) { sigDrawing = true; const p = pos(e, sigCanvas.value); sigLX = p.x; sigLY = p.y }
function sigDraw(e) {
  if (!sigDrawing) return
  const c = sigCanvas.value, ctx = c.getContext('2d'), p = pos(e, c)
  ctx.beginPath(); ctx.moveTo(sigLX, sigLY); ctx.lineTo(p.x, p.y); ctx.stroke()
  sigLX = p.x; sigLY = p.y
}
function sigStartT(e) { sigDrawing = true; const c = sigCanvas.value, r = c.getBoundingClientRect(), t = e.touches[0]; sigLX = t.clientX-r.left; sigLY = t.clientY-r.top }
function sigDrawT(e) {
  if (!sigDrawing) return
  const c = sigCanvas.value, ctx = c.getContext('2d'), r = c.getBoundingClientRect(), t = e.touches[0]
  const x = t.clientX-r.left, y = t.clientY-r.top
  ctx.beginPath(); ctx.moveTo(sigLX, sigLY); ctx.lineTo(x, y); ctx.stroke()
  sigLX = x; sigLY = y
}
function sigStop() { sigDrawing = false }
function sigClear() { const c = sigCanvas.value; if (c) c.getContext('2d').clearRect(0,0,c.width,c.height) }

async function genPDF() {
  generating.value = true
  try {
    const sig = sigCanvas.value?.toDataURL('image/png') || null
    await generateFilledPDF(form.value, templateName.value, sig)
    auth.saveContract(form.value, templateName.value)
    pdfDone.value = true
  } catch (e) {
    console.error(e)
    alert('Fehler beim Erstellen des PDFs: ' + e.message)
  } finally {
    generating.value = false
  }
}
</script>

<style scoped>
.customer-page { min-height:100vh; display:flex; flex-direction:column; position:relative; z-index:1; }

/* Nav */
.top-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; background:rgba(13,27,46,0.85); border-bottom:1px solid var(--border); backdrop-filter:blur(16px); position:sticky; top:0; z-index:50; }
.nav-brand { display:flex; align-items:center; gap:12px; }
.brand-name { font-family:var(--font-d); font-size:16px; font-weight:700; letter-spacing:0.15em; background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.brand-sub { font-size:10px; color:var(--white-dim); letter-spacing:0.1em; }
.admin-link { font-size:12px; color:var(--white-muted); text-decoration:none; letter-spacing:0.08em; transition:color 0.2s; }
.admin-link:hover { color:var(--gold); }

/* Hero */
.hero { padding:80px 40px 40px; max-width:800px; margin:0 auto; text-align:center; }
.hero-label { font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; }
.hero-title { font-family:var(--font-d); font-size:clamp(36px,5vw,58px); font-weight:300; line-height:1.2; margin-bottom:20px; }
.hero-title .gold { background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.hero-desc { font-size:16px; color:var(--white-dim); line-height:1.7; max-width:560px; margin:0 auto 28px; }
.hero-badges { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.badge { background:rgba(201,168,76,0.1); border:1px solid var(--border); border-radius:20px; padding:6px 14px; font-size:13px; color:var(--gold-light); }

/* Progress */
.progress-wrap { padding:24px 40px 0; }
.progress-inner { display:flex; align-items:center; background:rgba(21,36,56,0.85); border:1px solid var(--border); border-radius:14px; padding:18px 28px; backdrop-filter:blur(12px); max-width:860px; margin:0 auto; }
.prog-item { display:flex; align-items:center; flex:1; gap:10px; }
.prog-dot { width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.05); border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:var(--white-dim); flex-shrink:0; transition:all 0.3s; }
.prog-item.active .prog-dot { background:linear-gradient(135deg,var(--gold),var(--gold-light)); border-color:var(--gold); color:var(--navy); box-shadow:0 0 18px rgba(201,168,76,.4); }
.prog-item.done .prog-dot { background:rgba(201,168,76,0.15); border-color:var(--gold-dim); color:var(--gold); }
.prog-label { font-size:12px; color:var(--white-dim); white-space:nowrap; }
.prog-item.active .prog-label { color:var(--gold-light); }
.prog-line { flex:1; height:1px; background:var(--border); }
.prog-item.done .prog-line { background:var(--gold-dim); }

/* Body */
.page-body { flex:1; padding:32px 40px 40px; max-width:900px; margin:0 auto; width:100%; }

.section-wrap { display:flex; flex-direction:column; gap:24px; }
.section-head { text-align:center; padding:0 20px; }
.section-title { font-family:var(--font-d); font-size:36px; font-weight:300; margin-bottom:10px; }
.section-desc { font-size:15px; color:var(--white-dim); line-height:1.65; max-width:580px; margin:0 auto; }

/* Product cards */
.product-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.product-card { background:rgba(21,36,56,0.85); border:1.5px solid var(--border); border-radius:20px; padding:28px; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; backdrop-filter:blur(12px); }
.product-card:hover { border-color:var(--border-hover); transform:translateY(-2px); }
.product-card.sel { border-color:var(--gold); background:rgba(201,168,76,0.06); }
.pc-glow { position:absolute; inset:0; background:radial-gradient(ellipse at top,rgba(201,168,76,0.07),transparent 70%); opacity:0; transition:opacity 0.3s; }
.product-card.sel .pc-glow { opacity:1; }
.pc-icon { font-size:40px; text-align:center; margin-bottom:14px; }
.pc-title { font-family:var(--font-d); font-size:26px; font-weight:500; text-align:center; margin-bottom:10px; }
.pc-desc { font-size:13px; color:var(--white-dim); text-align:center; line-height:1.6; margin-bottom:20px; }
.pc-options { display:flex; gap:20px; margin-bottom:20px; }
.opt-group { flex:1; }
.opt-title { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
.radio-row { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--white-dim); cursor:pointer; margin-bottom:6px; }
.radio-box { width:15px; height:15px; border-radius:50%; border:1.5px solid var(--border-hover); flex-shrink:0; transition:all 0.2s; }
.radio-box.on { border-color:var(--gold); background:var(--gold); }
.pc-btn { width:100%; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white-dim); padding:11px; border-radius:10px; font-size:13px; cursor:pointer; transition:all 0.25s; font-family:var(--font-b); }
.pc-btn:hover, .pc-btn.active { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border-color:transparent; font-weight:600; }

/* Info boxes */
.info-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.info-box { background:rgba(21,36,56,0.75); border:1px solid var(--border); border-radius:14px; padding:20px; display:flex; gap:14px; align-items:flex-start; }
.info-icon { font-size:24px; flex-shrink:0; margin-top:2px; }
.info-box strong { display:block; font-size:14px; margin-bottom:5px; }
.info-box p { font-size:12px; color:var(--white-dim); line-height:1.55; margin:0; }

/* Form cards */
.form-card { background:rgba(21,36,56,0.85); border:1px solid var(--border); border-radius:18px; padding:28px; backdrop-filter:blur(12px); }
.form-card-title { font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
.form-card-desc { font-size:13px; color:var(--white-dim); line-height:1.55; margin-bottom:18px; }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.fg { display:flex; flex-direction:column; }
.fg.span2 { grid-column:span 2; }
.fg-hint { font-size:11px; color:var(--white-muted); margin-top:4px; }
.input-row { display:flex; }
.prefix { background:rgba(201,168,76,0.1); border:1px solid var(--border); border-right:none; padding:11px 12px; border-radius:8px 0 0 8px; font-size:12px; color:var(--gold); display:flex; align-items:center; white-space:nowrap; }

/* Toggle group */
.toggle-group { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
.toggle-item { display:flex; align-items:flex-start; gap:14px; }
.tog { width:44px; min-width:44px; height:24px; background:rgba(255,255,255,0.1); border-radius:12px; position:relative; border:1px solid var(--border); cursor:pointer; transition:background 0.3s; }
.tog.on { background:var(--gold); border-color:var(--gold); }
.tog-knob { position:absolute; top:3px; left:3px; width:16px; height:16px; background:white; border-radius:50%; transition:transform 0.3s; box-shadow:0 1px 4px rgba(0,0,0,0.3); }
.tog.on .tog-knob { transform:translateX(20px); }
.tog-info { display:flex; flex-direction:column; }
.tog-info strong { font-size:13px; }
.tog-info span { font-size:12px; color:var(--white-dim); }

/* Payment options */
.pay-opts { display:flex; flex-direction:column; gap:10px; margin-bottom:0; }
.pay-opt { display:flex; align-items:center; gap:14px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:16px; cursor:pointer; transition:all 0.25s; }
.pay-opt:hover { border-color:var(--border-hover); }
.pay-opt.sel { border-color:var(--gold); background:rgba(201,168,76,0.05); }
.pay-radio { width:18px; height:18px; border-radius:50%; border:2px solid var(--border-hover); flex-shrink:0; transition:all 0.2s; }
.pay-radio.on { border-color:var(--gold); background:var(--gold); }
.pay-info { flex:1; }
.pay-info strong { display:block; font-size:14px; margin-bottom:3px; }
.pay-info span { font-size:12px; color:var(--white-dim); }
.pay-badge { background:rgba(42,125,90,0.2); border:1px solid rgba(42,125,90,0.4); border-radius:8px; padding:3px 10px; font-size:11px; color:#4ade80; white-space:nowrap; }
.sepa-form { margin-top:20px; padding-top:20px; border-top:1px solid var(--border); }

/* Delivery opts */
.delivery-opts { display:flex; flex-direction:column; gap:10px; }
.del-opt { display:flex; align-items:flex-start; gap:14px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:16px; cursor:pointer; transition:all 0.25s; }
.del-opt:hover { border-color:var(--border-hover); }
.del-opt.sel { border-color:var(--gold); }
.del-radio { width:18px; height:18px; min-width:18px; border-radius:50%; border:2px solid var(--border-hover); margin-top:2px; transition:all 0.2s; }
.del-radio.on { border-color:var(--gold); background:var(--gold); }
.del-opt strong { display:block; font-size:14px; margin-bottom:3px; }
.del-opt p { font-size:12px; color:var(--white-dim); margin:0; }

/* Contact opts */
.contact-opts { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
.con-opt { display:flex; align-items:flex-start; gap:14px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:16px; cursor:pointer; transition:all 0.25s; }
.con-opt:hover { border-color:var(--border-hover); }
.con-opt.sel { border-color:var(--gold); }
.con-radio { width:18px; height:18px; min-width:18px; border-radius:50%; border:2px solid var(--border-hover); margin-top:2px; transition:all 0.2s; }
.con-radio.on { border-color:var(--gold); background:var(--gold); }
.con-opt strong { display:block; font-size:14px; margin-bottom:3px; }
.con-opt p { font-size:12px; color:var(--white-dim); margin:0; }
.bonus-chip { background:rgba(201,168,76,0.12); border:1px solid var(--gold-dim); border-radius:10px; padding:3px 10px; font-size:11px; color:var(--gold); white-space:nowrap; margin-left:auto; }

/* Consent list */
.consent-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
.consent-row { display:flex; align-items:flex-start; gap:14px; background:rgba(13,27,46,0.5); border:1px solid var(--border); border-radius:12px; padding:14px; cursor:pointer; transition:border-color 0.2s; }
.consent-row:hover { border-color:var(--border-hover); }
.cbox { width:20px; height:20px; min-width:20px; border-radius:5px; border:2px solid var(--border-hover); display:flex; align-items:center; justify-content:center; transition:all 0.2s; margin-top:2px; }
.cbox.on { background:var(--gold); border-color:var(--gold); }
.consent-info { flex:1; }
.consent-info strong { display:block; font-size:13px; margin-bottom:3px; }
.consent-info span { font-size:12px; color:var(--white-dim); }

/* Signature */
.sig-wrap { background:rgba(13,27,46,0.6); border:1.5px dashed var(--border); border-radius:12px; padding:14px; position:relative; margin-top:8px; }
.sig-canvas { width:100%; height:160px; cursor:crosshair; display:block; }
.sig-clear { position:absolute; top:10px; right:10px; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white-dim); padding:5px 12px; border-radius:6px; font-size:12px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.sig-clear:hover { border-color:var(--border-hover); color:var(--white); }
.sig-hint { font-size:11px; color:var(--white-muted); text-align:center; margin-top:8px; }

/* Completion */
.completion-wrap { text-align:center; padding-bottom:8px; }
.completion-icon { width:76px; height:76px; border-radius:50%; background:rgba(201,168,76,0.1); border:2px solid var(--gold-dim); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; color:var(--gold); transition:all 0.4s; }
.completion-icon.done { background:rgba(42,125,90,0.15); border-color:#2a7d5a; color:#4ade80; animation:pulseGold 2.5s ease infinite; }
.success-title { color:var(--gold-light); }
.success-desc { color:#4ade80 !important; }

/* Summary */
.summary-card { background:rgba(21,36,56,0.85); border:1px solid var(--border); border-radius:16px; padding:24px; }
.sum-title { font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; }
.sum-rows { display:flex; flex-direction:column; gap:10px; }
.sum-row { display:flex; gap:16px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.04); }
.sum-row:last-child { border-bottom:none; padding-bottom:0; }
.sum-k { width:110px; font-size:12px; color:var(--white-dim); flex-shrink:0; padding-top:1px; }
.sum-v { font-size:13px; flex:1; }
.prod-val { font-weight:500; }
.mono { font-family:monospace; font-size:12px; }

/* PDF actions */
.pdf-actions { display:flex; flex-direction:column; align-items:center; gap:14px; }
.btn-pdf { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border:none; padding:16px 40px; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.25s; font-family:var(--font-b); display:flex; align-items:center; gap:12px; letter-spacing:0.02em; }
.btn-pdf:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 12px 30px rgba(201,168,76,0.4); }
.btn-pdf:disabled { opacity:0.5; cursor:not-allowed; }
.spinner-w { width:20px; height:20px; border:2.5px solid rgba(0,0,0,0.15); border-top-color:var(--navy); border-radius:50%; animation:spin 0.7s linear infinite; }

/* Next steps */
.next-steps { background:rgba(42,125,90,0.08); border:1px solid rgba(42,125,90,0.25); border-radius:14px; padding:20px 24px; }
.next-steps h3 { font-size:14px; font-weight:600; color:#4ade80; margin-bottom:12px; }
.next-steps ol { padding-left:20px; display:flex; flex-direction:column; gap:8px; }
.next-steps li { font-size:13px; color:var(--white-dim); line-height:1.5; }

/* Nav bar */
.nav-bar { display:flex; align-items:center; gap:14px; margin-top:8px; }
.nav-spacer { flex:1; }
.nav-right { display:flex; align-items:center; gap:12px; }
.err-inline { font-size:13px; color:#fca5a5; }

/* Footer */
.page-footer { text-align:center; padding:24px; font-size:12px; color:var(--white-muted); border-top:1px solid var(--border); margin-top:40px; }
.foot-link { color:var(--white-muted); text-decoration:none; }
.foot-link:hover { color:var(--gold); }

@media (max-width:700px) {
  .top-nav { padding:14px 20px; }
  .hero { padding:50px 20px 24px; }
  .progress-wrap { padding:16px 20px 0; }
  .page-body { padding:20px; }
  .product-grid { grid-template-columns:1fr; }
  .pc-options { flex-direction:column; gap:12px; }
  .info-row { grid-template-columns:1fr; }
  .form-grid { grid-template-columns:1fr; }
  .fg.span2 { grid-column:span 1; }
  .progress-inner { overflow-x:auto; }
}
</style>
