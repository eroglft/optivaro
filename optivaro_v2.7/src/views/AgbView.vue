<template>
  <div class="agb-page">
    <div class="agb-inner">

      <div class="agb-header fade-up">
        <p class="sec-label">Rechtliches</p>
        <h1 class="agb-title">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p class="agb-meta">Gültig ab: {{ today }} · Optivaro Management e.U., Wien</p>
      </div>

      <div class="agb-toc fade-up">
        <div class="toc-title">Inhaltsverzeichnis</div>
        <ol class="toc-list">
          <li><a @click="scroll('s1')">Geltungsbereich und Vertragspartner</a></li>
          <li><a @click="scroll('s2')">Leistungsbeschreibung</a></li>
          <li><a @click="scroll('s3')">Vertragsabschluss</a></li>
          <li><a @click="scroll('s4')">Widerrufsrecht (§ 11 FAGG)</a></li>
          <li><a @click="scroll('s5')">Preise und Vermittlungsprovision</a></li>
          <li><a @click="scroll('s6')">Pflichten des Nutzers</a></li>
          <li><a @click="scroll('s7')">Haftung und Gewährleistung</a></li>
          <li><a @click="scroll('s8')">Datenschutz</a></li>
          <li><a @click="scroll('s9')">Änderungsvorbehalt</a></li>
          <li><a @click="scroll('s10')">Anwendbares Recht und Gerichtsstand</a></li>
        </ol>
      </div>

      <div class="agb-content fade-up">

        <div class="agb-section" id="s1">
          <h2>§ 1 Geltungsbereich und Vertragspartner</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen der <strong>Optivaro Management e.U.</strong> (nachfolgend „Optivaro"), einem unabhängigen Energie-Vergleichsportal mit Sitz in Wien, Österreich, gegenüber Verbrauchern und Unternehmern (nachfolgend „Nutzer").</p>
          <p>Optivaro ist <strong>kein Energieversorger</strong>, sondern ein Vermittlungsportal, das Nutzer mit Energieversorgern in Verbindung bringt. Der eigentliche Energieliefervertrag kommt ausschließlich zwischen dem Nutzer und dem jeweiligen Energieversorger zustande.</p>
          <p>Abweichende AGB des Nutzers werden nicht anerkannt, sofern Optivaro diesen nicht ausdrücklich schriftlich zugestimmt hat.</p>
        </div>

        <div class="agb-section" id="s2">
          <h2>§ 2 Leistungsbeschreibung</h2>
          <p>Optivaro erbringt folgende Leistungen:</p>
          <ul class="agb-list">
            <li><strong>Tarifvergleich:</strong> Kostenloser Vergleich von Energietarifen österreichischer Anbieter auf Basis der vom Nutzer angegebenen Verbrauchsdaten.</li>
            <li><strong>Vertragsformular:</strong> Bereitstellung eines Online-Formulars zur Übermittlung von Vertragsdaten an den gewählten Energieversorger.</li>
            <li><strong>Vertragsübermittlung:</strong> Elektronische Übermittlung des ausgefüllten Vertragsformulars als PDF per E-Mail an den Nutzer und weiterführend an den Energieversorger.</li>
            <li><strong>Beratung:</strong> Unverbindliche Informationen zu Energietarifen und Anbietern per Kontaktformular oder Telefon.</li>
          </ul>
          <p>Die Leistungen von Optivaro sind für Nutzer <strong>kostenlos</strong>. Optivaro erhält eine Vermittlungsprovision vom jeweiligen Energieversorger (siehe § 5).</p>
          <p>Optivaro übernimmt keine Garantie für die Richtigkeit, Vollständigkeit oder Aktualität der dargestellten Tarife. Preise können sich jederzeit ohne Vorankündigung ändern. Maßgeblich sind stets die aktuellen Konditionen des jeweiligen Energieversorgers.</p>
        </div>

        <div class="agb-section" id="s3">
          <h2>§ 3 Vertragsabschluss</h2>
          <p>Durch das Ausfüllen und Absenden des Online-Formulars auf optivaro.at gibt der Nutzer ein verbindliches Angebot zum Abschluss eines <strong>Energieliefervertrags</strong> mit dem gewählten Energieversorger ab.</p>
          <div class="agb-highlight">
            <strong>Wichtiger Hinweis:</strong> Der Vertrag kommt <strong>nicht</strong> mit Optivaro, sondern mit dem jeweiligen Energieversorger (z.B. VERBUND Energy4Customers GmbH) zustande. Optivaro übermittelt das ausgefüllte Vertragsformular als PDF per E-Mail an den Nutzer. Der Vertrag wird erst mit schriftlicher Annahme durch den Energieversorger rechtskräftig.
          </div>
          <p>Der Nutzer erhält nach dem Absenden des Formulars:</p>
          <ul class="agb-list">
            <li>Eine automatische Bestätigungs-E-Mail mit dem ausgefüllten Vertragsformular als PDF-Anhang</li>
            <li>Eine separate Vertragsbestätigung vom Energieversorger innerhalb von 21 Werktagen</li>
          </ul>
          <p>Optivaro speichert den Vertragsinhalt gemäß den datenschutzrechtlichen Bestimmungen. Nutzer können jederzeit Auskunft über gespeicherte Daten verlangen (siehe § 8).</p>
        </div>

        <div class="agb-section widerrufs-section" id="s4">
          <div class="wr-badge">⚖️ Gesetzliche Pflichtinformation</div>
          <h2>§ 4 Widerrufsrecht gemäß § 11 FAGG (Fern- und Auswärtsgeschäfte-Gesetz)</h2>

          <div class="widerrufs-box">
            <h3>WIDERRUFSBELEHRUNG</h3>

            <h4>Widerrufsrecht</h4>
            <p>Sie haben das Recht, binnen <strong>14 Tagen ohne Angabe von Gründen</strong> diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsabschlusses.</p>
            <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Optivaro Management e.U., office@optivaro.at) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
            <p>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>

            <h4>Folgen des Widerrufs</h4>
            <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Da die Vermittlungsleistung von Optivaro für Nutzer kostenlos ist, entstehen durch den Widerruf keine Kosten.</p>

            <h4>Besonderer Hinweis bei Beginn vor Ablauf der Widerrufsfrist</h4>
            <p>Wenn Sie verlangen, dass die Dienstleistung bereits während der Widerrufsfrist beginnen soll (z.B. durch Angabe eines Lieferbeginns innerhalb von 14 Tagen), müssen Sie uns einen angemessenen Betrag zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen entspricht.</p>

            <div class="musterwiderruf">
              <strong>Muster-Widerrufsformular</strong>
              <p>(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
              <p>An: Optivaro Management e.U., office@optivaro.at</p>
              <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistung (*)</p>
              <p>Bestellt am (*) / erhalten am (*): ___________</p>
              <p>Name des/der Verbraucher(s): ___________</p>
              <p>Anschrift des/der Verbraucher(s): ___________</p>
              <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ___________</p>
              <p>Datum: ___________</p>
              <p><em>(*) Unzutreffendes streichen</em></p>
            </div>
          </div>
        </div>

        <div class="agb-section" id="s5">
          <h2>§ 5 Preise und Vermittlungsprovision</h2>
          <p>Die Nutzung des Vergleichsportals und die Vermittlungsleistung von Optivaro sind für Nutzer <strong>vollständig kostenlos</strong>.</p>
          <p>Optivaro erhält vom jeweiligen Energieversorger eine <strong>Vermittlungsprovision</strong> für erfolgreich vermittelte Vertragsabschlüsse. Diese Provision hat keinen Einfluss auf den Energiepreis des Nutzers und wird vom Energieversorger getragen.</p>
          <p>Die auf der Website dargestellten Energiepreise sind:</p>
          <ul class="agb-list">
            <li>Inklusive 20% Umsatzsteuer (sofern nicht anders angegeben)</li>
            <li>Exklusive Netznutzungsentgelt, Netzverlustentgelt, Messgebühren und sonstiger Abgaben</li>
            <li>Exklusive der Erneuerbaren-Förderpauschale und des Erneuerbaren-Förderbeitrags</li>
          </ul>
          <p>Die tatsächlichen Gesamtkosten setzen sich aus dem Energiepreis und den netzspezifischen Kosten zusammen, die regional variieren.</p>
        </div>

        <div class="agb-section" id="s6">
          <h2>§ 6 Pflichten des Nutzers</h2>
          <p>Der Nutzer verpflichtet sich:</p>
          <ul class="agb-list">
            <li>Ausschließlich wahrheitsgemäße und vollständige Angaben im Vertragsformular zu machen</li>
            <li>Die angegebene E-Mail-Adresse regelmäßig zu kontrollieren</li>
            <li>Optivaro unverzüglich zu informieren, wenn Änderungen der angegebenen Daten eintreten</li>
            <li>Das Portal nicht für missbräuchliche Zwecke zu nutzen</li>
          </ul>
          <p>Falsche Angaben im Vertragsformular können zur Unwirksamkeit des Energieliefervertrags führen. Optivaro haftet nicht für Schäden, die durch falsche Nutzerangaben entstehen.</p>
        </div>

        <div class="agb-section" id="s7">
          <h2>§ 7 Haftung und Gewährleistung</h2>
          <p>Optivaro haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.</p>
          <p>Bei leichter Fahrlässigkeit haftet Optivaro nur bei Verletzung wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.</p>
          <p>Optivaro haftet <strong>nicht</strong> für:</p>
          <ul class="agb-list">
            <li>Die Richtigkeit, Aktualität und Vollständigkeit der Tarifinformationen der Energieversorger</li>
            <li>Die Erfüllung des Energieliefervertrags durch den Energieversorger</li>
            <li>Preisänderungen nach Vertragsabschluss durch den Energieversorger</li>
            <li>Technische Störungen oder Ausfälle der Website</li>
          </ul>
        </div>

        <div class="agb-section" id="s8">
          <h2>§ 8 Datenschutz</h2>
          <p>Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <router-link to="/datenschutz" class="agb-link">DATENSCHUTZERKLÄRUNG</router-link>, die Bestandteil dieser AGB ist.</p>
          <p>Mit der Nutzung des Portals stimmt der Nutzer der Verarbeitung seiner personenbezogenen Daten zum Zweck der Vertragsanbahnung und -vermittlung zu. Diese Einwilligung kann jederzeit widerrufen werden.</p>
          <p>Zur Übermittlung des Vertragsformulars per E-Mail nutzt Optivaro den Dienst EmailJS (emailjs.com). Dieser Dienst verarbeitet die E-Mail-Adresse des Nutzers ausschließlich zur Zustellung der Vertragsunterlagen.</p>
        </div>

        <div class="agb-section" id="s9">
          <h2>§ 9 Änderungsvorbehalt</h2>
          <p>Optivaro behält sich vor, diese AGB jederzeit mit Wirkung für die Zukunft zu ändern. Änderungen werden auf der Website unter optivaro.at/agb veröffentlicht. Das Datum der letzten Änderung ist oben angegeben.</p>
          <p>Für bereits abgeschlossene Verträge gelten die AGB in der zum Zeitpunkt des Vertragsabschlusses gültigen Fassung.</p>
        </div>

        <div class="agb-section" id="s10">
          <h2>§ 10 Anwendbares Recht und Gerichtsstand</h2>
          <p>Es gilt <strong>österreichisches Recht</strong> unter Ausschluss des UN-Kaufrechts (CISG) und der Kollisionsnormen des IPR.</p>
          <p>Für Streitigkeiten mit Verbrauchern gilt ausschließlich der gesetzliche Gerichtsstand. Bei Streitigkeiten aus oder im Zusammenhang mit Online-Verträgen besteht die Möglichkeit der Online-Streitbeilegung über die EU-Plattform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" class="agb-link">https://ec.europa.eu/consumers/odr</a>.</p>
          <p>Für Streitigkeiten mit Unternehmern ist der sachlich zuständige Gerichtsstand Wien vereinbart.</p>
          <p>Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.</p>
        </div>

      </div>

      <div class="agb-footer-links fade-up">
        <router-link to="/impressum" class="btn-ghost">Impressum →</router-link>
        <router-link to="/datenschutz" class="btn-ghost">DATENSCHUTZ →</router-link>
        <router-link to="/kontakt" class="btn-ghost">Kontakt →</router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
const today = new Date().toLocaleDateString('de-AT', { day:'2-digit', month:'2-digit', year:'numeric' })
function scroll(id) {
  document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })
}
</script>

<style scoped>
.agb-page { position:relative; z-index:1; padding:40px 0 60px; }
.agb-inner { max-width:860px; margin:0 auto; padding:0 40px; display:flex; flex-direction:column; gap:28px; }
.agb-header { text-align:center; }
.agb-title { font-family:var(--font-d); font-size:clamp(26px,4vw,42px); font-weight:300; margin-bottom:8px; }
.agb-meta { font-size:12px; color:var(--white-dim); }
.agb-toc { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:14px; padding:20px 24px; }
.toc-title { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.toc-list { padding-left:18px; display:flex; flex-direction:column; gap:7px; }
.toc-list li a { font-size:13px; color:var(--white-dim); cursor:pointer; text-decoration:none; transition:color 0.2s; }
.toc-list li a:hover { color:var(--gold); }
.agb-content { display:flex; flex-direction:column; gap:20px; }
.agb-section { background:rgba(21,36,56,0.88); border:1px solid var(--border); border-radius:16px; padding:24px; }
.agb-section h2 { font-family:var(--font-d); font-size:20px; font-weight:500; color:var(--gold-light); margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid var(--border); }
.agb-section p { font-size:13px; color:var(--white-dim); line-height:1.7; margin-bottom:10px; }
.agb-section p:last-child { margin-bottom:0; }
.agb-section strong { color:var(--white); }
.agb-list { padding-left:18px; display:flex; flex-direction:column; gap:7px; margin-bottom:12px; }
.agb-list li { font-size:13px; color:var(--white-dim); line-height:1.6; }
.agb-list li strong { color:var(--white); }
.agb-link { color:var(--gold); text-decoration:none; }
.agb-link:hover { text-decoration:underline; }
.agb-highlight { background:rgba(201,168,76,0.07); border:1px solid rgba(201,168,76,0.25); border-radius:10px; padding:14px 16px; font-size:13px; color:var(--white-dim); line-height:1.65; margin:12px 0; }
.agb-highlight strong { color:var(--gold-light); display:block; margin-bottom:6px; }

/* Widerrufs section */
.widerrufs-section { border-color:rgba(201,168,76,0.3); }
.wr-badge { display:inline-flex; background:rgba(201,168,76,0.15); border:1px solid var(--gold-dim); border-radius:20px; padding:4px 14px; font-size:11px; color:var(--gold); margin-bottom:12px; }
.widerrufs-box { background:rgba(13,27,46,0.7); border:1px solid rgba(201,168,76,0.2); border-radius:12px; padding:20px; margin-top:12px; }
.widerrufs-box h3 { font-size:14px; font-weight:700; color:var(--gold); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:14px; }
.widerrufs-box h4 { font-size:13px; font-weight:600; color:var(--white); margin:14px 0 8px; }
.widerrufs-box p { font-size:13px; color:var(--white-dim); line-height:1.65; margin-bottom:8px; }
.widerrufs-box strong { color:var(--white); }
.musterwiderruf { background:rgba(255,255,255,0.03); border:1px dashed rgba(255,255,255,0.15); border-radius:8px; padding:14px; margin-top:14px; }
.musterwiderruf strong { display:block; font-size:13px; color:var(--gold-light); margin-bottom:10px; }
.musterwiderruf p { font-size:12px; color:var(--white-muted); margin-bottom:5px; line-height:1.55; }

.agb-footer-links { display:flex; gap:14px; flex-wrap:wrap; }

@media(max-width:680px) {
  .agb-inner { padding:0 16px; }
  .agb-footer-links { flex-direction:column; }
}
</style>
