<template>
  <div class="ds-page">
    <div class="ds-inner">
      <div class="ds-header fade-up">
        <p class="sec-label">Rechtliches</p>
        <h1 class="ds-title">DATENSCHUTZERKLÄRUNG</h1>
        <p class="ds-meta">Letzte Aktualisierung: {{ today }} · Gemäß DSGVO und österreichischem Datenschutzgesetz (DSG)</p>
      </div>

      <div class="ds-toc fade-up">
        <div class="toc-title">Inhaltsverzeichnis</div>
        <ol class="toc-list">
          <li><a @click="scroll('s1')">Verantwortlicher</a></li>
          <li><a @click="scroll('s2')">Welche Daten wir erheben</a></li>
          <li><a @click="scroll('s3')">Zweck der Datenverarbeitung</a></li>
          <li><a @click="scroll('s4')">Rechtsgrundlagen</a></li>
          <li><a @click="scroll('s5')">Speicherdauer</a></li>
          <li><a @click="scroll('s6')">Ihre Rechte (DSGVO Art. 15–21)</a></li>
          <li><a @click="scroll('s7')">Weitergabe an Dritte</a></li>
          <li><a @click="scroll('s8')">Cookies & Tracking</a></li>
          <li><a @click="scroll('s9')">Sicherheit</a></li>
          <li><a @click="scroll('s10')">Beschwerderecht</a></li>
        </ol>
      </div>

      <div class="ds-content fade-up">

        <div class="ds-section" id="s1">
          <h2>1. Verantwortlicher</h2>
          <p>Verantwortlicher im Sinne der DSGVO und des österreichischen Datenschutzgesetzes (DSG):</p>
          <div class="ds-box">
            <strong>Optivaro Management e.U.</strong><br/>
            Hackhofergasse 1/E04<br/>
            1190 Wien, Österreich<br/>
            E-Mail: <a href="mailto:office@optivaro.at">office@optivaro.at</a><br/>
            
          </div>
        </div>

        <div class="ds-section" id="s2">
          <h2>2. Welche Daten wir erheben</h2>
          <p>Wir erheben und verarbeiten folgende personenbezogene Daten:</p>
          <div class="ds-table-wrap">
            <table class="ds-table">
              <thead><tr><th>Datenkategorie</th><th>Konkrete Daten</th><th>Herkunft</th></tr></thead>
              <tbody>
                <tr><td>Stammdaten</td><td>Anrede, Titel, Vor- und Nachname, Geburtsdatum</td><td>Direkt von Ihnen</td></tr>
                <tr><td>Kontaktdaten</td><td>E-Mail-Adresse, Telefonnummer, Postadresse</td><td>Direkt von Ihnen</td></tr>
                <tr><td>Vertragsdaten</td><td>Gewählter Tarif, Energieart, Zählpunktbezeichnung, Netzbetreiber, Jahresverbrauch</td><td>Direkt von Ihnen</td></tr>
                <tr><td>Zahlungsdaten</td><td>IBAN (nur zur Weiterleitung an den Energieversorger), Zahlungsart</td><td>Direkt von Ihnen</td></tr>
                <tr><td>Technische Daten</td><td>IP-Adresse, Browser-Typ, Zugriffszeiten (nur für Sicherheitszwecke)</td><td>Automatisch bei Webseitennutzung</td></tr>
                <tr><td>Anfragedaten</td><td>Inhalte von Kontaktformularen und Anfragen</td><td>Direkt von Ihnen</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="ds-section" id="s3">
          <h2>3. Zweck der Datenverarbeitung</h2>
          <ul class="ds-list">
            <li><strong>Vertragsabwicklung:</strong> Bearbeitung und Übermittlung Ihrer Energievertragsanträge an den jeweiligen Energieversorger (VERBUND Energy4Customers GmbH)</li>
            <li><strong>Kommunikation:</strong> Beantwortung Ihrer Anfragen und Bereitstellung des Vertrags per E-Mail</li>
            <li><strong>Tarifvergleich:</strong> Berechnung und Anzeige von Energievergleichen auf Basis Ihrer Verbrauchsangaben</li>
            <li><strong>Rechtliche Pflichten:</strong> Erfüllung gesetzlicher Aufbewahrungs- und Dokumentationspflichten</li>
            <li><strong>Betriebssicherheit:</strong> Schutz unserer Systeme vor Missbrauch</li>
          </ul>
        </div>

        <div class="ds-section" id="s4">
          <h2>4. Rechtsgrundlagen</h2>
          <div class="ds-box-list">
            <div class="ds-box-item">
              <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>
              <p>Verarbeitung zur Erfüllung eines Vertrages (Vertragsabschluss, Übermittlung an Energieversorger)</p>
            </div>
            <div class="ds-box-item">
              <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>
              <p>Einwilligung (z.B. für Marketing-E-Mails, sofern Sie dieser zugestimmt haben)</p>
            </div>
            <div class="ds-box-item">
              <strong>Art. 6 Abs. 1 lit. c DSGVO</strong>
              <p>Rechtliche Verpflichtung (Aufbewahrungspflichten nach UGB, BAO)</p>
            </div>
            <div class="ds-box-item">
              <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>
              <p>Berechtigte Interessen (Betriebssicherheit, Missbrauchsschutz)</p>
            </div>
          </div>
        </div>

        <div class="ds-section" id="s5">
          <h2>5. Speicherdauer</h2>
          <ul class="ds-list">
            <li><strong>Vertragsdaten:</strong> 7 Jahre nach Vertragsende (gesetzliche Aufbewahrungsfrist gemäß § 212 UGB)</li>
            <li><strong>Kontaktanfragen:</strong> 3 Jahre nach Bearbeitung</li>
            <li><strong>Technische Logs:</strong> Maximal 90 Tage</li>
            <li><strong>Marketing-Einwilligungen:</strong> Bis zum Widerruf Ihrer Einwilligung</li>
          </ul>
          <p>Nach Ablauf der Speicherdauer werden Ihre Daten sicher und unwiederbringlich gelöscht oder anonymisiert.</p>
        </div>

        <div class="ds-section" id="s6">
          <h2>6. Ihre Rechte gemäß DSGVO</h2>
          <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
          <div class="rights-grid">
            <div class="right-card">
              <div class="right-icon">📋</div>
              <strong>Auskunftsrecht (Art. 15)</strong>
              <p>Sie können jederzeit Auskunft darüber verlangen, welche Daten wir über Sie gespeichert haben.</p>
            </div>
            <div class="right-card">
              <div class="right-icon">✏️</div>
              <strong>Berichtigungsrecht (Art. 16)</strong>
              <p>Unrichtige Daten können Sie jederzeit berichtigen lassen.</p>
            </div>
            <div class="right-card">
              <div class="right-icon">🗑️</div>
              <strong>Löschungsrecht (Art. 17)</strong>
              <p>Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzliche Aufbewahrungspflicht besteht.</p>
            </div>
            <div class="right-card">
              <div class="right-icon">⏸️</div>
              <strong>Einschränkungsrecht (Art. 18)</strong>
              <p>Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</p>
            </div>
            <div class="right-card">
              <div class="right-icon">📤</div>
              <strong>Datenübertragbarkeit (Art. 20)</strong>
              <p>Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</p>
            </div>
            <div class="right-card">
              <div class="right-icon">🚫</div>
              <strong>Widerspruchsrecht (Art. 21)</strong>
              <p>Sie können der Verarbeitung Ihrer Daten auf Basis berechtigter Interessen widersprechen.</p>
            </div>
          </div>
          <div class="ds-highlight">
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:office@optivaro.at">office@optivaro.at</a> oder nutzen Sie unser <router-link to="/kontakt">Kontaktformular</router-link> (Thema: DATENSCHUTZ-Anfrage).
          </div>
        </div>

        <div class="ds-section" id="s7">
          <h2>7. Weitergabe an Dritte</h2>
          <p>Wir geben Ihre Daten nur in folgenden Fällen weiter:</p>
          <ul class="ds-list">
            <li><strong>Energieversorger:</strong> Bei Vertragsabschluss werden Ihre Vertragsdaten an den von Ihnen gewählten Energieversorger (z.B. VERBUND Energy4Customers GmbH) übermittelt. Dieser ist für die Weiterverarbeitung eigenverantwortlich.</li>
            <li><strong>E-Mail-Dienst:</strong> Zur Übermittlung Ihrer Vertragsunterlagen nutzen wir einen E-Mail-Versanddienst (verschlüsselt, EU-Rechenzentren).</li>
            <li><strong>Rechtliche Verpflichtung:</strong> Bei gesetzlicher Verpflichtung oder behördlichen Anordnungen.</li>
          </ul>
          <p>Eine Weitergabe zu Werbezwecken an Dritte erfolgt <strong>nicht</strong> ohne Ihre ausdrückliche Einwilligung.</p>
        </div>

        <div class="ds-section" id="s8">
          <h2>8. Cookies &amp; Tracking</h2>
          <p>Diese Website verwendet ausschließlich technisch notwendige Cookies (Session-Cookies für die Webseiten-Funktionalität). Es werden <strong>keine Tracking-Cookies</strong> und <strong>keine Werbecookies</strong> eingesetzt. Analysedienste wie Google Analytics werden nicht verwendet.</p>
          <div class="ds-box">
            <strong>Technisch notwendige Cookies:</strong><br/>
            Session-ID (temporär, wird nach Schließen des Browsers gelöscht) — Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Webseitennutzbarkeit)
          </div>
        </div>

        <div class="ds-section" id="s9">
          <h2>9. Datensicherheit</h2>
          <ul class="ds-list">
            <li>Alle Datenübertragungen erfolgen verschlüsselt über <strong>SSL/TLS</strong> (erkennbar am 🔒 in der Browserzeile)</li>
            <li>Unsere Server befinden sich ausschließlich in <strong>EU-Rechenzentren</strong></li>
            <li>Zugang zu personenbezogenen Daten ist auf autorisierte Mitarbeiter beschränkt</li>
            <li>Regelmäßige Sicherheitsaudits und Software-Updates</li>
            <li>Datensparsamkeit: Wir erheben nur die für den jeweiligen Zweck notwendigen Daten</li>
          </ul>
        </div>

        <div class="ds-section" id="s10">
          <h2>10. Beschwerderecht</h2>
          <p>Sie haben das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen:</p>
          <div class="ds-box">
            <strong>Österreichische Datenschutzbehörde</strong><br/>
            Wickenburggasse 8, 1080 Wien<br/>
            Tel: +43 1 531 15-202525<br/>
            E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a><br/>
            Web: <a href="https://www.dsb.gv.at" target="_blank">www.dsb.gv.at</a>
          </div>
        </div>

      </div>

      <div class="ds-contact fade-up">
        <h3>Datenschutz-Kontakt</h3>
        <p>Bei Fragen zum Datenschutz stehen wir Ihnen gerne zur Verfügung:</p>
        <router-link to="/kontakt" class="btn-gold">Datenschutz-Anfrage stellen →</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
const today = new Date().toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' })
function scroll(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.ds-page { position:relative; z-index:1; padding:40px 0 60px; }
.ds-inner { max-width:860px; margin:0 auto; padding:0 40px; display:flex; flex-direction:column; gap:32px; }
.ds-header { text-align:center; }
.ds-title { font-family:var(--font-d); font-size:clamp(28px,4vw,46px); font-weight:300; margin-bottom:8px; letter-spacing:0.02em; }
.ds-meta { font-size:12px; color:var(--white-dim); }

.ds-toc { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:14px; padding:20px 24px; }
.toc-title { font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.toc-list { padding-left:18px; display:flex; flex-direction:column; gap:7px; }
.toc-list li a { font-size:13px; color:var(--white-dim); cursor:pointer; transition:color 0.2s; text-decoration:none; }
.toc-list li a:hover { color:var(--gold); }

.ds-content { display:flex; flex-direction:column; gap:32px; }
.ds-section { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:28px; }
.ds-section h2 { font-family:var(--font-d); font-size:22px; font-weight:500; margin-bottom:14px; color:var(--gold-light); }
.ds-section p { font-size:14px; color:var(--white-dim); line-height:1.7; margin-bottom:12px; }
.ds-section p:last-child { margin-bottom:0; }

.ds-box { background:rgba(13,27,46,0.6); border:1px solid var(--border); border-radius:10px; padding:16px; font-size:13px; color:var(--white-dim); line-height:1.7; }
.ds-box a { color:var(--gold); text-decoration:none; }
.ds-box strong { color:var(--white); display:block; margin-bottom:6px; }

.ds-list { padding-left:18px; display:flex; flex-direction:column; gap:8px; }
.ds-list li { font-size:14px; color:var(--white-dim); line-height:1.6; }
.ds-list li strong { color:var(--white); }

.ds-table-wrap { overflow-x:auto; border-radius:10px; border:1px solid var(--border); }
.ds-table { width:100%; border-collapse:collapse; }
.ds-table th { background:rgba(13,27,46,0.8); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); padding:10px 14px; text-align:left; }
.ds-table td { padding:10px 14px; font-size:13px; color:var(--white-dim); border-top:1px solid rgba(255,255,255,0.05); }
.ds-table tr:nth-child(even) td { background:rgba(255,255,255,0.02); }

.ds-box-list { display:flex; flex-direction:column; gap:10px; }
.ds-box-item { background:rgba(13,27,46,0.5); border:1px solid var(--border); border-radius:10px; padding:14px; }
.ds-box-item strong { display:block; font-size:13px; color:var(--gold-light); margin-bottom:4px; }
.ds-box-item p { font-size:13px; color:var(--white-dim); margin:0; }

.rights-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; }
.right-card { background:rgba(13,27,46,0.5); border:1px solid var(--border); border-radius:10px; padding:14px; }
.right-icon { font-size:22px; margin-bottom:6px; }
.right-card strong { display:block; font-size:13px; color:var(--white); margin-bottom:4px; }
.right-card p { font-size:12px; color:var(--white-dim); line-height:1.5; margin:0; }

.ds-highlight { background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); border-radius:10px; padding:14px; font-size:13px; color:var(--white-dim); }
.ds-highlight a { color:var(--gold); text-decoration:none; }

.ds-contact { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:28px; text-align:center; }
.ds-contact h3 { font-family:var(--font-d); font-size:24px; font-weight:400; margin-bottom:8px; }
.ds-contact p { font-size:14px; color:var(--white-dim); margin-bottom:16px; }

@media(max-width:680px) {
  .ds-inner { padding:0 16px; }
  .rights-grid { grid-template-columns:1fr; }
}
</style>
