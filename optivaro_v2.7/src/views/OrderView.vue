<template>
  <div class="order-page">

    <!-- ── Step 0: Anbieter wählen ── -->
    <div v-if="step === 0" class="step0-wrap fade-up">
      <div class="step0-head">
        <p class="s0-label">Willkommen bei Optivaro</p>
        <h1 class="s0-title">Ihr Energievertrag<br/><span class="gold-text">in wenigen Minuten</span></h1>
        <p class="s0-desc">Wählen Sie Ihren Anbieter und laden Sie Ihren fertig ausgefüllten Vertrag direkt herunter — einfach, sicher und papierlos.</p>
        <div class="s0-badges">
          <span>✓ Kostenlos &amp; unverbindlich</span>
          <span>✓ SSL-verschlüsselt</span>
          <span>✓ PDF sofort verfügbar</span>
        </div>
      </div>

      <div class="s0-section-title">Anbieter wählen</div>
      <p class="s0-section-sub">Wählen Sie Ihren bevorzugten Energieanbieter. Beide Anbieter bieten {{ form.energyType === 'gas' ? 'Gas' : 'Strom' }}-Tarife für Privat &amp; Gewerbe an.</p>

      <div class="provider-grid">
        <!-- VERBUND -->
        <div class="prov-card" :class="{ sel: form.provider === 'verbund' }" @click="form.provider = 'verbund'">
          <div class="pc-glow"></div>
          <div class="pc-check" v-if="form.provider === 'verbund'">✓</div>
          <div class="prov-logo verbund-logo">⚡ VERBUND</div>
          <h3 class="pc-name">VERBUND Energy4Customers</h3>
          <p class="pc-desc">100 % Wasserkraft aus Österreich — 2 Monate Gratis-Strom, 12 Monate Preisgarantie.</p>
          <div class="prov-prices">
            <div v-if="form.energyType === 'strom'" class="price-row">
              <span class="pr-val">{{ form.customerType === 'kmu' ? '19,44' : '18,84' }} ct</span>
              <span class="pr-lbl">/kWh inkl. USt.</span>
            </div>
            <div v-else class="price-row">
              <span class="pr-val">9,48 ct</span>
              <span class="pr-lbl">/kWh inkl. USt.</span>
            </div>
            <div class="price-row2">+ 5,64 €/Monat Grundpreis</div>
          </div>
          <ul class="prov-features">
            <li>✓ 12 Monate Preisgarantie</li>
            <li>✓ 2 Monate Gratis-Energie</li>
            <li>✓ 100% Ökostrom</li>
            <li>✓ Privat &amp; Gewerbe</li>
          </ul>
          <button class="pc-btn" :class="{ active: form.provider === 'verbund' }" @click.stop="selectProvider('verbund')">
            VERBUND wählen →
          </button>
        </div>

        <!-- MONTANA -->
        <div class="prov-card" :class="{ sel: form.provider === 'montana' }" @click="form.provider = 'montana'">
          <div class="pc-glow"></div>
          <div class="pc-check" v-if="form.provider === 'montana'">✓</div>
          <div class="prov-logo montana-logo">🔵 MONTANA</div>
          <h3 class="pc-name">Montana Energie-Handel AT GmbH</h3>
          <p class="pc-desc">Zuverlässige Energieversorgung — 4 Monate Gratis-Energie, Preisgarantie bis April 2027.</p>
          <div class="prov-prices">
            <div v-if="form.energyType === 'strom'" class="price-row">
              <span class="pr-val">23,34 ct</span>
              <span class="pr-lbl">/kWh inkl. USt.</span>
            </div>
            <div v-else class="price-row">
              <span class="pr-val">11,22 ct</span>
              <span class="pr-lbl">/kWh inkl. USt.</span>
            </div>
            <div class="price-row2">+ 6,66 €/Monat Grundpreis</div>
          </div>
          <ul class="prov-features">
            <li>✓ Preisgarantie bis 29.04.2027</li>
            <li>✓ 4 Monate Gratis-Energie</li>
            <li>✓ SEPA-Lastschrift</li>
            <li>✓ Privat &amp; Gewerbe</li>
          </ul>
          <button class="pc-btn" :class="{ active: form.provider === 'montana' }" @click.stop="selectProvider('montana')">
            Montana wählen →
          </button>
        </div>
      </div>

      <div class="info-row">
        <div class="info-box"><span class="ib-icon">🔒</span><div><strong>Preisgarantie</strong><p>Verbund: 12 Monate · Montana: bis April 2027. Keine bösen Überraschungen.</p></div></div>
        <div class="info-box"><span class="ib-icon">🎁</span><div><strong>Gratis-Energie</strong><p>Verbund: 2 Monate gratis · Montana: 4 Monate gratis (bei 12 Mon. Laufzeit).</p></div></div>
        <div class="info-box"><span class="ib-icon">📄</span><div><strong>Sofort-Download</strong><p>Nach dem Ausfüllen erhalten Sie Ihren fertig ausgefüllten Vertrag als PDF.</p></div></div>
      </div>

      <div class="step0-nav">
        <span class="err-msg" v-if="validErr">{{ validErr }}</span>
        <button class="btn-gold" @click="nextStep" :disabled="!form.provider">Weiter →</button>
      </div>
    </div>

    <!-- ── Steps 1–4 ── -->
    <div v-if="step > 0" class="wizard-wrap">

      <div class="progress-bar">
        <div v-for="(s, i) in steps" :key="i" class="prog-item"
          :class="{ done: step > i+1, active: step === i+1 }"
          @click="step > i+1 && (step = i+1)">
          <div class="prog-dot">
            <svg v-if="step > i+1" width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-else>{{ i+1 }}</span>
          </div>
          <span class="prog-lbl">{{ s }}</span>
          <div class="prog-line" v-if="i < steps.length - 1"></div>
        </div>
      </div>

      <!-- STEP 1 -->
      <div v-if="step === 1" class="step-content fade-up">
        <h2 class="step-heading">Ihre persönlichen Daten</h2>
        <p class="step-sub">Bitte füllen Sie alle Pflichtfelder (mit * markiert) vollständig aus.</p>

        <div class="form-card">
          <div class="fc-title">Angaben zur Person</div>
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
            <div class="fg"><label>Vorname *</label><input v-model="form.firstName" placeholder="Max" /></div>
            <div class="fg"><label>Nachname *</label><input v-model="form.lastName" placeholder="Mustermann" /></div>
            <div class="fg span2" v-if="isGewerbe"><label>Firmenname</label><input v-model="form.company" placeholder="Muster GmbH" /></div>
            <div class="fg" v-if="isGewerbe"><label>UID / Firmenbuch-Nr.</label><input v-model="form.uid" placeholder="ATU12345678" /></div>
            <div class="fg"><label>Geburtsdatum *</label><input type="date" v-model="form.birthDate" /></div>
          </div>

          <div class="fc-title" style="margin-top:22px">Kontaktdaten</div>
          <div class="form-grid">
            <div class="fg span2">
              <label>E-Mail-Adresse *</label>
              <input type="email" v-model="form.email" placeholder="max@beispiel.at" />
              <span class="fg-hint">Für die Übermittlung Ihrer Vertragsunterlagen</span>
            </div>
            <div class="fg span2">
              <label>Telefonnummer *</label>
              <div class="input-pfx">
                <input v-model="form.phonePrefix" class="pfx-input" placeholder="+43" style="width:70px;border-radius:8px 0 0 8px;text-align:center;font-weight:600;color:var(--gold)" />
                <input v-model="form.phone" placeholder="660 123 456 78" style="border-radius:0 8px 8px 0" />
              </div>
            </div>
          </div>

          <div class="fc-title" style="margin-top:22px">Lieferadresse</div>
          <div class="form-grid">
            <div class="fg span2"><label>Straße *</label><input v-model="form.street" placeholder="Musterstraße" /></div>
            <div class="fg"><label>Hausnummer *</label><input v-model="form.houseNumber" placeholder="12" /></div>
            <div class="fg"><label>Stiege</label><input v-model="form.staircase" placeholder="A" /></div>
            <div class="fg"><label>Stock</label><input v-model="form.floor" placeholder="3" /></div>
            <div class="fg"><label>Tür</label><input v-model="form.door" placeholder="15" /></div>
            <div class="fg"><label>PLZ *</label><input v-model="form.postalCode" placeholder="1010" /></div>
            <div class="fg"><label>Ort *</label><input v-model="form.city" placeholder="Wien" /></div>
          </div>

          <div class="fc-title" style="margin-top:22px">Vertragstyp</div>
          <div class="ctype-row">
            <div class="ctype-opt" :class="{ sel: form.customerType === 'privat' }" @click="form.customerType = 'privat'">
              <div class="ct-radio" :class="{ on: form.customerType === 'privat' }"></div>
              <div><strong>Privat / Haushalt</strong><span>Für Privatpersonen</span></div>
            </div>
            <div class="ctype-opt" :class="{ sel: form.customerType === 'kmu' }" @click="form.customerType = 'kmu'">
              <div class="ct-radio" :class="{ on: form.customerType === 'kmu' }"></div>
              <div><strong>Gewerbe / KMU</strong><span>Bis 100.000 kWh/Jahr</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2 -->
      <div v-if="step === 2" class="step-content fade-up">
        <h2 class="step-heading">Zahlung &amp; Technische Daten</h2>
        <p class="step-sub">Zahlungsart wählen und technische Angaben zur Anlage eintragen.</p>

        <div class="form-card">
          <div class="fc-title">Zahlungsart</div>
          <div class="pay-opts">
            <div class="pay-opt" :class="{ sel: form.paymentMethod === 'sepa' }" @click="form.paymentMethod = 'sepa'">
              <div class="pay-radio" :class="{ on: form.paymentMethod === 'sepa' }"></div>
              <div class="pay-body"><strong>SEPA-Lastschriftmandat</strong><span>Bequeme automatische Abbuchung (+2 Tage gratis)</span></div>
              <span class="pay-badge">Empfohlen</span>
            </div>
            <div class="pay-opt" :class="{ sel: form.paymentMethod === 'invoice' }" @click="form.paymentMethod = 'invoice'">
              <div class="pay-radio" :class="{ on: form.paymentMethod === 'invoice' }"></div>
              <div class="pay-body"><strong>Zahlungsanweisung</strong><span>Manuelle Überweisung per Rechnung</span></div>
            </div>
          </div>
          <div v-if="form.paymentMethod === 'sepa'" class="sepa-fields">
            <div class="form-grid">
              <div class="fg span2"><label>Name des Kontoinhabers</label><input v-model="form.accountHolder" placeholder="Max Mustermann" /></div>
              <div class="fg span2">
                <label>IBAN *</label>
                <div class="iban-wrap">
                  <input
                    :value="form.iban"
                    @input="onIbanInput"
                    placeholder="AT12 3456 7890 1234 5678"
                    maxlength="34"
                    class="iban-input"
                    :class="{ 'iban-ok': ibanStatus && ibanStatus.valid, 'iban-error': ibanStatus && !ibanStatus.valid }"
                    style="font-family:monospace;letter-spacing:0.05em"
                  />
                  <div class="iban-icon" v-if="ibanStatus">
                    <span v-if="ibanStatus.valid" class="iban-check">✓</span>
                    <span v-else class="iban-x">✕</span>
                  </div>
                </div>
                <div class="iban-valid-msg" v-if="ibanStatus && ibanStatus.valid">✓ Gültige IBAN ({{ ibanStatus.countryName }})</div>
                <div class="iban-error-msg" v-if="ibanStatus && !ibanStatus.valid">{{ ibanStatus.error }}</div>
                <span class="fg-hint" v-if="!ibanStatus">Ihre IBAN finden Sie auf Ihrem Kontoauszug oder im Online-Banking</span>
              </div>
            </div>

            <!-- SEPA Unterschrift -->
            <div class="fc-title" style="margin-top:18px">SEPA-Lastschrift Unterschrift</div>
            <p class="fc-desc">Bitte unterschreiben Sie hier das SEPA-Lastschriftmandat digital.</p>
            <div class="sig-area">
              <canvas ref="sepaCanvas" class="sig-canvas"
                @mousedown="sepaStart" @mousemove="sepaDraw" @mouseup="sepaStop" @mouseleave="sepaStop"
                @touchstart.prevent="sepaStartT" @touchmove.prevent="sepaDrawT" @touchend="sepaStop">
              </canvas>
              <button class="sig-clear" @click="sepaClear">✕ Löschen</button>
              <p class="sig-hint">SEPA-Unterschrift hier eingeben</p>
            </div>
          </div>
        </div>

        <div class="form-card">
          <div class="fc-title">Übergabeart</div>
          <div class="del-opts">
            <div class="del-opt" :class="{ sel: form.deliveryType === 'wechsel' }" @click="form.deliveryType = 'wechsel'">
              <div class="del-radio" :class="{ on: form.deliveryType === 'wechsel' }"></div>
              <div><strong>Lieferantenwechsel</strong><p>Ich beziehe bereits Energie von einem anderen Anbieter.</p></div>
            </div>
            <div class="del-opt" :class="{ sel: form.deliveryType === 'neubezug' }" @click="form.deliveryType = 'neubezug'">
              <div class="del-radio" :class="{ on: form.deliveryType === 'neubezug' }"></div>
              <div><strong>Neueinzug</strong><p>Ich beziehe erstmalig Energie an diesem Standort.</p></div>
            </div>
          </div>
        </div>

        <div class="form-card">
          <div class="fc-title">Technische Angaben</div>
          <p class="fc-desc">Diese Informationen finden Sie auf Ihrer letzten Jahresabrechnung oder am Zähler selbst.</p>
          <div class="form-grid">
            <div class="fg span2"><label>Ihr Netzbetreiber</label><input v-model="form.gridOperator" :placeholder="erkannterNetzbetreiber || 'z.B. Netz Wien GmbH'" /></div>
            <div class="fg span2">
              <label>
                Zählpunktbezeichnung (33 Stellen)
                <button class="info-badge" @click="showZpInfo = !showZpInfo" type="button">?</button>
              </label>
              <input v-model="form.meterPointId" placeholder="AT0100000000000000000000000000001" maxlength="33" style="font-family:monospace;letter-spacing:0.04em" />
              <div class="zp-info-box" v-if="showZpInfo">
                <strong>📍 Wo finde ich die Zählpunktbezeichnung?</strong>
                <ul>
                  <li>Auf Ihrer <strong>Jahresabrechnung</strong> (meist oben rechts)</li>
                  <li>Im <strong>Online-Kundenportal</strong> Ihres aktuellen Anbieters</li>
                  <li>Auf dem <strong>Zähler selbst</strong> (aufgedruckt)</li>
                  <li>Beginnt immer mit <strong>„AT"</strong> gefolgt von 31 Zeichen</li>
                </ul>
                <p>Die Nummer ist optional — der Admin kann sie ggf. ergänzen.</p>
              </div>
              <span class="fg-hint" v-if="!showZpInfo">Beginnt mit „AT" — steht auf Ihrer Jahresabrechnung (optional)</span>
            </div>
            <div class="fg"><label>Zählernummer</label><input v-model="form.meterNumber" placeholder="12345678" /></div>
            <div class="fg"><label>Jahresverbrauch (kWh)</label><input type="number" v-model="form.annualConsumption" :placeholder="form.annualConsumption || '3500'" /></div>
            <div class="fg"><label>Gewünschter Lieferbeginn</label><input type="date" v-model="form.deliveryStart" /></div>
            <div class="fg"><label>Ablesedatum</label><input type="date" v-model="form.readingDate" /></div>
            <div class="fg span2">
              <label>Bisheriger Energielieferant</label>
              <input v-model="form.previousSupplier" :placeholder="form.previousSupplierHint || 'z.B. Wien Energie, EVN, Salzburg AG'" />
              <span class="fg-hint">Ihr aktueller Anbieter — für die Abwicklung des Wechsels</span>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 3 -->
      <div v-if="step === 3" class="step-content fade-up">
        <h2 class="step-heading">Bestätigung &amp; Unterschrift</h2>
        <p class="step-sub">Bitte lesen Sie die Einwilligungen und unterzeichnen Sie digital.</p>

        <div class="form-card">
          <div class="fc-title">Ort &amp; Datum</div>
          <div class="form-grid">
            <div class="fg"><label>Ort</label><input v-model="form.signLocation" placeholder="Wien" /></div>
            <div class="fg"><label>Datum</label><input type="date" v-model="form.signDate" /></div>
          </div>
        </div>

        <div class="form-card">
          <div class="fc-title">Einwilligungen</div>
          <p class="fc-desc">Die folgenden Einwilligungen sind freiwillig. Mit dem Abschluss akzeptieren Sie unsere <router-link to="/agb" class="consent-link" target="_blank">AGB</router-link> und <router-link to="/datenschutz" class="consent-link" target="_blank">Datenschutzerklärung</router-link>.</p>
          <div class="consent-list">
            <label class="consent-row" v-for="(c, k) in consents" :key="k" @click="form.consents[k] = !form.consents[k]">
              <div class="cbox" :class="{ on: form.consents[k] }">
                <svg v-if="form.consents[k]" width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5l3 3 5-5" stroke="#0d1b2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="ci-body"><strong>{{ c.title }}</strong><span>{{ c.desc }}</span></div>
              <span class="bonus-tag" v-if="c.bonus">{{ c.bonus }}</span>
            </label>
          </div>
        </div>

        <div class="form-card">
          <div class="fc-title">Digitale Unterschrift</div>
          <p class="fc-desc">Unterschreiben Sie mit der Maus oder per Touch. Die Unterschrift wird direkt auf dem Vertrag platziert.</p>
          <div class="sig-area">
            <canvas ref="sigCanvas" class="sig-canvas"
              @mousedown="sigStart" @mousemove="sigDraw" @mouseup="sigStop" @mouseleave="sigStop"
              @touchstart.prevent="sigStartT" @touchmove.prevent="sigDrawT" @touchend="sigStop">
            </canvas>
            <button class="sig-clear" @click="sigClear">✕ Löschen</button>
            <p class="sig-hint">Unterschrift hier eingeben</p>
          </div>
        </div>
      </div>

      <!-- STEP 4 -->
      <div v-if="step === 4" class="step-content fade-up">
        <div class="email-status-box" v-if="pdfDone && emailResult">
          <div v-if="emailResult.success" class="email-ok">
            <span>✉️</span>
            <div>
              <strong>E-Mail erfolgreich versendet!</strong>
              <p>Ihre Vertragsunterlagen wurden an <strong>{{ form.email }}</strong> gesendet.</p>
            </div>
          </div>
          <div v-else class="email-warn">
            <span>⚠️</span>
            <div>
              <strong>E-Mail konnte nicht zugestellt werden</strong>
              <p>Der Vertrag wurde heruntergeladen. Bitte senden Sie ihn an <strong>office@optivaro.at</strong>.</p>
            </div>
          </div>
        </div>

        <div class="completion-wrap">
          <div class="comp-icon" :class="{ done: pdfDone }">
            <svg v-if="pdfDone" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5"/>
              <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/>
              <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <h2 class="step-heading" :class="{ 'suc-title': pdfDone }">
            {{ pdfDone ? 'Vielen Dank — Ihr Vertrag wurde übermittelt! ✓' : 'Fast geschafft!' }}
          </h2>
          <p class="step-sub" :class="{ 'suc-sub': pdfDone }">
            {{ pdfDone ? 'Ihr ausgefüllter Vertrag wird per E-Mail an Sie gesendet.' : 'Überprüfen Sie Ihre Angaben und schließen Sie Ihren Vertrag verbindlich ab.' }}
          </p>
        </div>

        <div class="summary-card">
          <div class="sum-title">Ihre Zusammenfassung</div>
          <div class="sum-rows">
            <div class="sum-row"><span class="sk">Anbieter</span><span class="sv fw">{{ form.provider === 'verbund' ? '⚡ VERBUND Energy4Customers' : '🔵 Montana Energie' }}</span></div>
            <div class="sum-row"><span class="sk">Produkt</span><span class="sv fw">{{ form.energyType === 'strom' ? '⚡' : '🔥' }} {{ form.energyType?.toUpperCase() }} — {{ labelFor(form.customerType) }} — {{ form.deliveryType === 'wechsel' ? 'Lieferantenwechsel' : 'Neueinzug' }}</span></div>
            <div class="sum-row"><span class="sk">Vorlage</span><span class="sv mono">{{ templateName }}</span></div>
            <div class="sum-row"><span class="sk">Name</span><span class="sv">{{ form.salutation }} {{ form.title }} {{ form.firstName }} {{ form.lastName }}</span></div>
            <div class="sum-row" v-if="form.company"><span class="sk">Firma</span><span class="sv">{{ form.company }}</span></div>
            <div class="sum-row"><span class="sk">E-Mail</span><span class="sv">{{ form.email }}</span></div>
            <div class="sum-row"><span class="sk">Adresse</span><span class="sv">{{ form.street }} {{ form.houseNumber }}, {{ form.postalCode }} {{ form.city }}</span></div>
            <div class="sum-row"><span class="sk">Zahlung</span><span class="sv">{{ form.paymentMethod === 'sepa' ? 'SEPA-Lastschriftmandat' : 'Zahlungsanweisung' }}</span></div>
            <div class="sum-row" v-if="form.paymentMethod === 'sepa' && form.iban"><span class="sk">IBAN</span><span class="sv mono">{{ form.iban }}</span></div>
          </div>
        </div>

        <div class="pdf-actions">
          <button class="btn-pdf btn-abschluss" @click="abschliessen" :disabled="generating">
            <div v-if="generating" class="spin-w"></div>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ generating ? 'Wird verarbeitet…' : '' }}
          </button>
          <button class="btn-ghost" @click="resetAll">Neuen Vertrag ausfüllen</button>
          <button class="btn-ghost" style="font-size:12px;opacity:0.6" @click="emergencyDownload" v-if="pdfDone">PDF herunterladen (Backup)</button>
        </div>

        <div class="next-steps" v-if="pdfDone && !feedbackDone">
  <h3>🎉 Geschafft!</h3>
  <p style="font-size:14px;color:var(--white-dim);line-height:1.6;margin:0">
    Wir melden uns innerhalb von <strong style="color:#4ade80">48 Stunden</strong> bei Ihnen. 
    Sie können sich jetzt zurücklehnen und entspannt Geld sparen! 💰
  </p>
</div>

        <div class="feedback-card" v-if="pdfDone && !feedbackDone">
          <h3 class="fb-title">✍️ Ihre Meinung zählt</h3>
          <p class="fb-desc">Wie war Ihre Erfahrung?</p>
          <div class="fb-stars">
            <span v-for="s in 5" :key="s" class="fb-star"
              :class="{ on: s <= fbStars, hov: s <= fbHover }"
              @mouseover="fbHover=s" @mouseleave="fbHover=0" @click="fbStars=s">★</span>
          </div>
          <div class="fb-lbl">{{ starLabels[fbStars] || 'Bewertung wählen' }}</div>
          <input class="fb-input" v-model="fbName" placeholder="Ihr Name (optional)" />
          <textarea class="fb-input" v-model="fbText" placeholder="Ihre Erfahrung beschreiben (optional)..." rows="3"></textarea>
          <button class="btn-gold" @click="submitFeedback" :disabled="fbStars === 0" style="width:100%">
            Bewertung abgeben →
          </button>
        </div>
        <div class="feedback-done" v-if="feedbackDone">
          <div>🌟 Danke für Ihre Bewertung!</div>
          <p>Ihr Feedback wurde gespeichert.</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="wiz-nav">
        <button class="btn-ghost" @click="prevStep" v-if="step > 1">← Zurück</button>
        <div class="nav-sp"></div>
        <div class="nav-right">
          <span class="err-msg" v-if="validErr">{{ validErr }}</span>
          <button class="btn-gold" @click="nextStep" v-if="step < 4">
            {{ step === 3 ? 'Zur Übersicht →' : 'Weiter →' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useSettingsStore } from '../stores/settings.js'
import { generateFilledPDF } from '../utils/pdfFiller.js'
import { sendContractEmail } from '../utils/emailService.js'
import { validateIBAN, formatIBAN, cleanIBAN } from '../utils/ibanValidator.js'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const settings = useSettingsStore()
const route = useRoute()
const step = ref(0)
const pdfDone = ref(false)
const generating = ref(false)
const validErr = ref('')
const showZpInfo = ref(false)
const fbStars = ref(0)
const fbHover = ref(0)
const fbName  = ref('')
const fbText  = ref('')
const feedbackDone = ref(false)
const starLabels = ['', 'Schlecht', 'Ausbaufähig', 'Gut', 'Sehr gut', 'Ausgezeichnet!']

const steps = ['Persönliche Daten', 'Zahlung & Anlage', 'Unterschrift', 'Abschluss']
const consents = {
  marketing:  { title: 'Newsletter & Angebote', desc: 'Ich möchte über neue Produkte und Angebote informiert werden.', bonus: '+1 Tag Gratis' },
  individual: { title: 'Persönliche Angebote', desc: 'Ich stimme der Zusendung individuell angepasster Angebote zu.', bonus: '+1 Tag Gratis' },
  dataUsage:  { title: 'Datenverarbeitung', desc: 'Ich stimme der Verarbeitung meiner Daten zur Kundensegmentierung zu.', bonus: null },
}

// Read params from route (pre-filled from Rechner)
const routeQuery = route.query

const form = ref({
  provider: '',
  energyType: routeQuery.energyType || '',
  customerType: 'privat',
  salutation: '', title: '', firstName: '', lastName: '', company: '', uid: '',
  email: '', phone: '', birthDate: '',
  phonePrefix: '+43',
  street: '', houseNumber: '', staircase: '', floor: '', door: '', postalCode: '', city: '',
  paymentMethod: 'sepa', accountHolder: '', iban: '',
  deliveryType: routeQuery.deliveryType || 'wechsel',
  gridOperator: routeQuery.gridOperator || '',
  meterPointId: '', meterNumber: '',
  annualConsumption: routeQuery.kwh || '',
  deliveryStart: '', readingDate: '',
  previousSupplier: routeQuery.previousSupplier || '',
  previousSupplierHint: routeQuery.previousSupplierHint || '',
  signLocation: '', signDate: new Date().toISOString().split('T')[0],
  consents: { marketing: false, individual: false, dataUsage: false },
})

// Also check localStorage for preselect from homepage
const preselect = localStorage.getItem('ov_preselect')
if (preselect && !form.value.energyType) {
  form.value.energyType = preselect
  localStorage.removeItem('ov_preselect')
}

const erkannterNetzbetreiber = computed(() => routeQuery.gridOperator || '')

const isGewerbe = computed(() => form.value.customerType === 'kmu')

const templateName = computed(() => {
  const e = form.value.energyType
  const p = form.value.provider
  const d = form.value.deliveryType
  const g = isGewerbe.value

  if (!p) return '—'

  // Wenn kein energyType gesetzt, Standard = strom
  const energy = e || 'strom'

  if (p === 'verbund') {
    if (energy === 'strom') return g ? 'Verbund_Strom_Gewerbe.pdf' : 'Verbund_Strom_Haushalt.pdf'
    return g ? 'Verbund_Gas_Gewerbe.pdf' : 'Verbund_Gas_Haushalt.pdf'
  }
  if (p === 'montana') {
    if (energy === 'strom') return d === 'neubezug' ? 'Montana_Strom_Neueinzug.pdf' : 'Montana_Strom_Lieferantenwechsel.pdf'
    return d === 'neubezug' ? 'Montana_Gas_Neueinzug.pdf' : 'Montana_Gas_Lieferantenwechsel.pdf'
  }
  return '—'
})

function labelFor(val) {
  const map = { privat: 'Privat / Haushalt', kmu: 'Gewerbe / KMU' }
  return map[val] || val
}

const canNext = computed(() => {
  if (step.value === 1) {
    return form.value.salutation && form.value.firstName && form.value.lastName &&
           form.value.email && form.value.phone && form.value.birthDate &&
           form.value.street && form.value.houseNumber && form.value.postalCode && form.value.city
  }
  if (step.value === 2 && form.value.paymentMethod === 'sepa') {
    const ibanCheck = validateIBAN(form.value.iban)
    if (!ibanCheck.valid) return false
  }
  return true
})

function selectProvider(p) {
  form.value.provider = p
  if (!form.value.energyType) form.value.energyType = 'strom' // Default
  nextTick(() => {
    nextStep()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

function nextStep() {
  validErr.value = ''
  if (step.value === 0 && !form.value.provider) { validErr.value = 'Bitte wählen Sie einen Anbieter.'; return }
  if (!canNext.value) { validErr.value = 'Bitte füllen Sie alle Pflichtfelder aus.'; return }
  step.value++
  if (step.value === 3) nextTick(() => { initSig(); initSepa() })
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}
function prevStep() { validErr.value = ''; if (step.value > 0) step.value-- }
function resetAll() { step.value = 0; pdfDone.value = false; feedbackDone.value = false; form.value.provider = '' }

// Main Signature
const sigCanvas = ref(null)
let sd = false, slx = 0, sly = 0
function initSig() {
  const c = sigCanvas.value; if (!c) return
  c.width = c.offsetWidth; c.height = 160
  const ctx = c.getContext('2d')
  ctx.strokeStyle = '#e4c06e'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
}
function posOf(e, c) { const r = c.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top } }
function sigStart(e)  { sd=true; const p=posOf(e,sigCanvas.value); slx=p.x; sly=p.y }
function sigDraw(e) {
  if (!sd) return
  const c=sigCanvas.value, ctx=c.getContext('2d'), p=posOf(e,c)
  ctx.beginPath(); ctx.moveTo(slx,sly); ctx.lineTo(p.x,p.y); ctx.stroke(); slx=p.x; sly=p.y
}
function sigStartT(e) { sd=true; const c=sigCanvas.value, r=c.getBoundingClientRect(), t=e.touches[0]; slx=t.clientX-r.left; sly=t.clientY-r.top }
function sigDrawT(e) {
  if (!sd) return
  const c=sigCanvas.value, ctx=c.getContext('2d'), r=c.getBoundingClientRect(), t=e.touches[0]
  const x=t.clientX-r.left, y=t.clientY-r.top
  ctx.beginPath(); ctx.moveTo(slx,sly); ctx.lineTo(x,y); ctx.stroke(); slx=x; sly=y
}
function sigStop() { sd=false }
function sigClear() { const c=sigCanvas.value; if(c) c.getContext('2d').clearRect(0,0,c.width,c.height) }

// SEPA Signature
const sepaCanvas = ref(null)
let sepaSd = false, sepaLx = 0, sepaLy = 0
function initSepa() {
  const c = sepaCanvas.value; if (!c) return
  c.width = c.offsetWidth; c.height = 120
  const ctx = c.getContext('2d')
  ctx.strokeStyle = '#e4c06e'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
}
function sepaStart(e) { sepaSd=true; const p=posOf(e,sepaCanvas.value); sepaLx=p.x; sepaLy=p.y }
function sepaDraw(e) {
  if (!sepaSd) return
  const c=sepaCanvas.value, ctx=c.getContext('2d'), p=posOf(e,c)
  ctx.beginPath(); ctx.moveTo(sepaLx,sepaLy); ctx.lineTo(p.x,p.y); ctx.stroke(); sepaLx=p.x; sepaLy=p.y
}
function sepaStartT(e) { sepaSd=true; const c=sepaCanvas.value, r=c.getBoundingClientRect(), t=e.touches[0]; sepaLx=t.clientX-r.left; sepaLy=t.clientY-r.top }
function sepaDrawT(e) {
  if (!sepaSd) return
  const c=sepaCanvas.value, ctx=c.getContext('2d'), r=c.getBoundingClientRect(), t=e.touches[0]
  const x=t.clientX-r.left, y=t.clientY-r.top
  ctx.beginPath(); ctx.moveTo(sepaLx,sepaLy); ctx.lineTo(x,y); ctx.stroke(); sepaLx=x; sepaLy=y
}
function sepaStop() { sepaSd=false }
function sepaClear() { const c=sepaCanvas.value; if(c) c.getContext('2d').clearRect(0,0,c.width,c.height) }

const emailResult = ref(null)
const ibanStatus = ref(null)

function onIbanInput(e) {
  const raw = e.target.value
  const clean = cleanIBAN(raw)
  form.value.iban = formatIBAN(clean)
  if (clean.length >= 5) {
    ibanStatus.value = validateIBAN(clean)
  } else {
    ibanStatus.value = null
  }
}

async function abschliessen() {
  generating.value = true
  emailResult.value = null
  try {
    const sig = sigCanvas.value?.toDataURL('image/png') || null
    const sepaSig = sepaCanvas.value?.toDataURL('image/png') || null

    const pdfBytes = await generateFilledPDF(form.value, templateName.value, sig, sepaSig)
    auth.saveContract(form.value, templateName.value)
    const result = await sendContractEmail(pdfBytes, form.value, templateName.value)
    emailResult.value = result
    pdfDone.value = true
  } catch(e) {
    console.error('Abschluss-Fehler:', e)
    alert('Fehler beim Vertragsabschluss: ' + e.message)
  } finally {
    generating.value = false
  }
}

async function emergencyDownload() {
  try {
    const sig = sigCanvas.value?.toDataURL('image/png') || null
    const sepaSig = sepaCanvas.value?.toDataURL('image/png') || null
    const pdfBytes = await generateFilledPDF(form.value, templateName.value, sig, sepaSig)
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Optivaro_Vertrag_${form.value.lastName}_${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  } catch(e) { alert('Download-Fehler: ' + e.message) }
}

function submitFeedback() {
  if (fbStars.value === 0) return
  settings.addReview({ name: fbName.value || 'Anonymer Kunde', stars: fbStars.value, text: fbText.value || '', product: form.value.energyType })
  feedbackDone.value = true
}
</script>

<style scoped>
.order-page { position:relative; z-index:1; padding-bottom:60px; }

/* Step 0 */
.step0-wrap { max-width:920px; margin:0 auto; padding:48px 40px 40px; }
.step0-head { text-align:center; margin-bottom:40px; }
.s0-label { font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.s0-title { font-family:var(--font-d); font-size:clamp(30px,5vw,52px); font-weight:300; line-height:1.2; margin-bottom:16px; }
.gold-text { background:linear-gradient(135deg,var(--gold-light),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; font-weight:600; }
.s0-desc { font-size:15px; color:var(--white-dim); line-height:1.7; max-width:540px; margin:0 auto 20px; }
.s0-badges { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
.s0-badges span { background:rgba(201,168,76,0.1); border:1px solid var(--border); border-radius:20px; padding:5px 14px; font-size:13px; color:var(--gold-light); }
.s0-section-title { font-family:var(--font-d); font-size:30px; font-weight:300; text-align:center; margin-bottom:8px; }
.s0-section-sub { font-size:14px; color:var(--white-dim); text-align:center; margin-bottom:24px; }

/* Provider grid */
.provider-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; }
.prov-card { background:rgba(21,36,56,0.88); border:1.5px solid var(--border); border-radius:20px; padding:28px; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; }
.prov-card:hover { border-color:var(--border-hover); transform:translateY(-2px); }
.prov-card.sel { border-color:var(--gold); background:rgba(201,168,76,0.06); }
.pc-glow { position:absolute; inset:0; background:radial-gradient(ellipse at top,rgba(201,168,76,0.07),transparent 70%); opacity:0; transition:opacity 0.3s; pointer-events:none; }
.prov-card.sel .pc-glow { opacity:1; }
.pc-check { position:absolute; top:16px; right:16px; background:var(--gold); color:var(--navy); width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; }
.prov-logo { font-size:20px; font-weight:700; margin-bottom:10px; padding:8px 14px; border-radius:8px; display:inline-block; }
.verbund-logo { background:rgba(37,99,168,0.15); color:#60b4ff; }
.montana-logo { background:rgba(42,125,90,0.15); color:#4ade80; }
.pc-name { font-family:var(--font-d); font-size:19px; font-weight:500; margin-bottom:8px; }
.pc-desc { font-size:13px; color:var(--white-dim); line-height:1.55; margin-bottom:16px; }
.prov-prices { background:rgba(13,27,46,0.5); border-radius:10px; padding:12px 14px; margin-bottom:14px; }
.price-row { display:flex; align-items:baseline; gap:6px; }
.pr-val { font-family:var(--font-d); font-size:28px; font-weight:600; color:var(--gold-light); }
.pr-lbl { font-size:13px; color:var(--white-dim); }
.price-row2 { font-size:12px; color:var(--white-dim); margin-top:4px; }
.prov-features { list-style:none; display:flex; flex-direction:column; gap:6px; margin-bottom:18px; }
.prov-features li { font-size:13px; color:var(--white-dim); }
.pc-btn { width:100%; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white-dim); padding:11px; border-radius:10px; font-size:13px; cursor:pointer; transition:all 0.25s; font-family:var(--font-b); }
.pc-btn:hover { background:rgba(201,168,76,0.1); border-color:var(--gold-dim); color:var(--gold-light); }
.pc-btn.active { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border-color:transparent; font-weight:700; }

.info-row { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
.info-box { background:rgba(21,36,56,0.75); border:1px solid var(--border); border-radius:14px; padding:16px; display:flex; gap:10px; align-items:flex-start; }
.ib-icon { font-size:20px; flex-shrink:0; margin-top:2px; }
.info-box strong { display:block; font-size:13px; margin-bottom:3px; }
.info-box p { font-size:12px; color:var(--white-dim); line-height:1.5; margin:0; }
.step0-nav { display:flex; flex-direction:column; align-items:flex-end; gap:8px; }

/* Wizard */
.wizard-wrap { max-width:760px; margin:0 auto; padding:32px 40px 40px; }
.progress-bar { display:flex; align-items:center; background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:14px; padding:16px 22px; margin-bottom:28px; backdrop-filter:blur(12px); }
.prog-item { display:flex; align-items:center; flex:1; gap:9px; }
.prog-dot { width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.05); border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:var(--white-dim); flex-shrink:0; transition:all 0.3s; }
.prog-item.active .prog-dot { background:linear-gradient(135deg,var(--gold),var(--gold-light)); border-color:var(--gold); color:var(--navy); box-shadow:0 0 14px rgba(201,168,76,0.3); }
.prog-item.done .prog-dot { background:rgba(201,168,76,0.15); border-color:var(--gold-dim); color:var(--gold); }
.prog-item.done { cursor:pointer; }
.prog-lbl { font-size:12px; color:var(--white-dim); white-space:nowrap; }
.prog-item.active .prog-lbl { color:var(--gold-light); }
.prog-line { flex:1; height:1px; background:var(--border); }
.prog-item.done .prog-line { background:var(--gold-dim); }
.step-content { display:flex; flex-direction:column; gap:18px; }
.step-heading { font-family:var(--font-d); font-size:30px; font-weight:300; }
.step-sub { font-size:14px; color:var(--white-dim); line-height:1.65; }
.suc-title { color:var(--gold-light); }
.suc-sub { color:#4ade80 !important; }
.form-card { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:22px; backdrop-filter:blur(12px); }
.fc-title { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
.fc-desc { font-size:13px; color:var(--white-dim); line-height:1.55; margin-bottom:12px; }
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
.fg { display:flex; flex-direction:column; gap:5px; }
.fg.span2 { grid-column:span 2; }
.fg-hint { font-size:11px; color:var(--white-muted); }
.input-pfx { display:flex; }
.pfx-input { background:rgba(201,168,76,0.1); border:1px solid var(--border); border-right:none; padding:11px 8px; font-size:13px; font-family:var(--font-b); color:var(--gold); outline:none; }
.pfx-input:focus { border-color:var(--gold); }

/* Customer type */
.ctype-row { display:flex; gap:12px; }
.ctype-opt { flex:1; display:flex; align-items:flex-start; gap:12px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:14px; cursor:pointer; transition:all 0.25s; }
.ctype-opt:hover { border-color:var(--border-hover); }
.ctype-opt.sel { border-color:var(--gold); background:rgba(201,168,76,0.05); }
.ct-radio { width:18px; height:18px; min-width:18px; border-radius:50%; border:2px solid var(--border-hover); margin-top:2px; transition:all 0.2s; }
.ct-radio.on { border-color:var(--gold); background:var(--gold); }
.ctype-opt strong { display:block; font-size:13px; margin-bottom:2px; }
.ctype-opt span { font-size:12px; color:var(--white-dim); }

/* Payment */
.pay-opts { display:flex; flex-direction:column; gap:9px; }
.pay-opt { display:flex; align-items:center; gap:12px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:13px 14px; cursor:pointer; transition:all 0.25s; }
.pay-opt:hover { border-color:var(--border-hover); }
.pay-opt.sel { border-color:var(--gold); background:rgba(201,168,76,0.05); }
.pay-radio { width:18px; height:18px; border-radius:50%; border:2px solid var(--border-hover); flex-shrink:0; transition:all 0.2s; }
.pay-radio.on { border-color:var(--gold); background:var(--gold); }
.pay-body { flex:1; }
.pay-body strong { display:block; font-size:13px; margin-bottom:2px; }
.pay-body span { font-size:12px; color:var(--white-dim); }
.pay-badge { background:rgba(42,125,90,0.2); border:1px solid rgba(42,125,90,0.4); border-radius:8px; padding:3px 10px; font-size:11px; color:#4ade80; white-space:nowrap; }
.sepa-fields { margin-top:14px; padding-top:14px; border-top:1px solid var(--border); }

/* Delivery */
.del-opts { display:flex; flex-direction:column; gap:9px; }
.del-opt { display:flex; align-items:flex-start; gap:12px; background:rgba(13,27,46,0.5); border:1.5px solid var(--border); border-radius:12px; padding:13px 14px; cursor:pointer; transition:all 0.25s; }
.del-opt:hover { border-color:var(--border-hover); }
.del-opt.sel { border-color:var(--gold); }
.del-radio { width:18px; height:18px; min-width:18px; border-radius:50%; border:2px solid var(--border-hover); margin-top:2px; transition:all 0.2s; }
.del-radio.on { border-color:var(--gold); background:var(--gold); }
.del-opt strong { display:block; font-size:13px; margin-bottom:2px; }
.del-opt p { font-size:12px; color:var(--white-dim); margin:0; }

/* Zählpunkt info */
.info-badge { display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; background:rgba(201,168,76,0.2); border:1px solid var(--gold-dim); border-radius:50%; font-size:10px; font-weight:700; color:var(--gold); cursor:pointer; margin-left:6px; transition:all 0.2s; }
.info-badge:hover { background:rgba(201,168,76,0.4); }
.zp-info-box { background:rgba(37,99,168,0.1); border:1px solid rgba(37,99,168,0.3); border-radius:10px; padding:14px; margin-top:6px; }
.zp-info-box strong { display:block; font-size:13px; color:var(--white); margin-bottom:8px; }
.zp-info-box ul { padding-left:16px; display:flex; flex-direction:column; gap:5px; }
.zp-info-box li { font-size:12px; color:var(--white-dim); }
.zp-info-box p { font-size:12px; color:var(--white-muted); margin-top:8px; margin-bottom:0; }

/* Signature */
.sig-area { background:rgba(13,27,46,0.6); border:1.5px dashed var(--border); border-radius:12px; padding:12px; position:relative; margin-top:8px; }
.sig-canvas { width:100%; height:160px; cursor:crosshair; display:block; touch-action:none; }
.sig-clear { position:absolute; top:10px; right:10px; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white-dim); padding:5px 12px; border-radius:6px; font-size:12px; cursor:pointer; font-family:var(--font-b); transition:all 0.2s; }
.sig-clear:hover { border-color:var(--border-hover); color:var(--white); }
.sig-hint { font-size:11px; color:var(--white-muted); text-align:center; margin-top:8px; }

/* Consent */
.consent-list { display:flex; flex-direction:column; gap:9px; }
.consent-row { display:flex; align-items:flex-start; gap:12px; background:rgba(13,27,46,0.5); border:1px solid var(--border); border-radius:12px; padding:12px 14px; cursor:pointer; transition:border-color 0.2s; }
.consent-row:hover { border-color:var(--border-hover); }
.cbox { width:18px; height:18px; min-width:18px; border-radius:5px; border:2px solid var(--border-hover); display:flex; align-items:center; justify-content:center; transition:all 0.2s; margin-top:2px; }
.cbox.on { background:var(--gold); border-color:var(--gold); }
.ci-body { flex:1; }
.ci-body strong { display:block; font-size:13px; margin-bottom:2px; }
.ci-body span { font-size:12px; color:var(--white-dim); }
.bonus-tag { background:rgba(201,168,76,0.12); border:1px solid var(--gold-dim); border-radius:10px; padding:3px 10px; font-size:11px; color:var(--gold); white-space:nowrap; margin-left:auto; }
.consent-link { color:var(--gold); text-decoration:none; }
.consent-link:hover { text-decoration:underline; }

/* Completion */
.completion-wrap { text-align:center; padding-bottom:8px; }
.comp-icon { width:70px; height:70px; border-radius:50%; background:rgba(201,168,76,0.1); border:2px solid var(--gold-dim); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:var(--gold); transition:all 0.4s; }
.comp-icon.done { background:rgba(42,125,90,0.15); border-color:#2a7d5a; color:#4ade80; animation:pulseGold 2.5s ease infinite; }

/* Summary */
.summary-card { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:20px; }
.sum-title { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:13px; }
.sum-rows { display:flex; flex-direction:column; gap:8px; }
.sum-row { display:flex; gap:12px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.04); }
.sum-row:last-child { border-bottom:none; padding-bottom:0; }
.sk { width:95px; font-size:12px; color:var(--white-dim); flex-shrink:0; padding-top:1px; }
.sv { font-size:13px; flex:1; }
.sv.fw { font-weight:500; }
.sv.mono { font-family:monospace; font-size:12px; }

/* PDF actions */
.pdf-actions { display:flex; flex-direction:column; align-items:center; gap:12px; }
.btn-pdf { background:linear-gradient(135deg,var(--gold),var(--gold-light)); color:var(--navy); border:none; padding:15px 32px; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.25s; font-family:var(--font-b); display:flex; align-items:center; gap:10px; }
.btn-pdf:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 12px 28px rgba(201,168,76,0.4); }
.btn-pdf:disabled { opacity:0.5; cursor:not-allowed; }
.spin-w { width:20px; height:20px; border:2.5px solid rgba(0,0,0,0.15); border-top-color:var(--navy); border-radius:50%; animation:spin 0.7s linear infinite; }
.btn-abschluss { background:linear-gradient(135deg,#1a7d40,#2a9d50) !important; }
.btn-abschluss:hover:not(:disabled) { box-shadow:0 12px 28px rgba(42,157,80,0.4) !important; }

/* Next steps */
.next-steps { background:rgba(42,125,90,0.08); border:1px solid rgba(42,125,90,0.25); border-radius:14px; padding:16px 20px; }
.next-steps h3 { font-size:13px; font-weight:600; color:#4ade80; margin-bottom:8px; }
.next-steps ol { padding-left:16px; display:flex; flex-direction:column; gap:6px; }
.next-steps li { font-size:13px; color:var(--white-dim); line-height:1.5; }

/* Feedback */
.feedback-card { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:20px; display:flex; flex-direction:column; gap:10px; }
.fb-title { font-family:var(--font-d); font-size:22px; font-weight:400; }
.fb-desc { font-size:13px; color:var(--white-dim); }
.fb-stars { display:flex; gap:6px; }
.fb-star { font-size:30px; color:rgba(255,255,255,0.15); cursor:pointer; transition:all 0.15s; line-height:1; }
.fb-star.on, .fb-star.hov { color:var(--gold); }
.fb-lbl { font-size:13px; color:var(--gold-light); min-height:18px; }
.fb-input { background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--white); border-radius:8px; padding:10px 13px; font-size:13px; font-family:var(--font-b); outline:none; transition:all 0.2s; resize:vertical; width:100%; }
.fb-input:focus { border-color:var(--gold); }
.fb-input::placeholder { color:var(--white-muted); }
.feedback-done { background:rgba(42,125,90,0.15); border:1px solid rgba(42,125,90,0.3); border-radius:12px; padding:18px; text-align:center; font-size:15px; font-weight:600; color:#4ade80; }
.feedback-done p { font-size:13px; color:var(--white-dim); margin-top:6px; font-weight:400; }

/* Navigation */
.wiz-nav { display:flex; align-items:center; gap:12px; margin-top:8px; }
.nav-sp { flex:1; }
.nav-right { display:flex; align-items:center; gap:10px; }
.err-msg { font-size:13px; color:#fca5a5; }

/* Email status */
.email-status-box { border-radius:14px; margin-bottom:4px; }
.email-ok { display:flex; gap:14px; align-items:flex-start; background:rgba(42,125,90,0.12); border:1px solid rgba(42,125,90,0.35); border-radius:14px; padding:18px; }
.email-ok span { font-size:28px; flex-shrink:0; }
.email-ok strong { display:block; font-size:14px; color:#4ade80; margin-bottom:4px; }
.email-ok p { font-size:13px; color:var(--white-dim); margin:0; }
.email-warn { display:flex; gap:14px; align-items:flex-start; background:rgba(255,180,0,0.08); border:1px solid rgba(255,180,0,0.3); border-radius:14px; padding:18px; }
.email-warn span { font-size:28px; flex-shrink:0; }
.email-warn strong { display:block; font-size:14px; color:#fbbf24; margin-bottom:4px; }
.email-warn p { font-size:13px; color:var(--white-dim); margin:0; }

/* IBAN */
.iban-wrap { position:relative; display:flex; align-items:center; }
.iban-input { flex:1; padding-right:36px; }
.iban-ok  { border-color:#2a7d5a !important; background:rgba(42,125,90,0.05) !important; }
.iban-error { border-color:#dc2626 !important; background:rgba(220,38,38,0.05) !important; }
.iban-icon { position:absolute; right:10px; font-size:16px; font-weight:700; pointer-events:none; }
.iban-check { color:#4ade80; }
.iban-x     { color:#f87171; }
.iban-valid-msg { font-size:12px; color:#4ade80; margin-top:4px; }
.iban-error-msg { font-size:12px; color:#f87171; margin-top:4px; }

@media(max-width:680px) {
  .step0-wrap { padding:24px 16px; }
  .wizard-wrap { padding:20px 16px; }
  .provider-grid { grid-template-columns:1fr; }
  .info-row { grid-template-columns:1fr; gap:10px; }
  .progress-bar { padding:10px 12px; overflow-x:auto; gap:4px; }
  .prog-lbl { display:none; }
  .prog-item { flex:0 0 auto; }
  .form-grid { grid-template-columns:1fr !important; }
  .fg.span2 { grid-column:span 1 !important; }
  .step-heading { font-size:24px; }
  .btn-pdf { padding:13px 18px; font-size:14px; width:100%; justify-content:center; }
  .btn-gold, .btn-ghost { width:100%; text-align:center; }
  .wiz-nav { flex-direction:column; align-items:stretch; }
  .nav-right { flex-direction:column; }
  .ctype-row { flex-direction:column; }
  .step0-nav { align-items:stretch; }
}
</style>
