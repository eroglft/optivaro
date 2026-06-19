# EMAIL SETUP — Optivaro v2.7
# =============================
# Einmalig einrichten — dauert ca. 15 Minuten
# Kostenlos bis 200 E-Mails/Monat

═══════════════════════════════════════════════════
  WAS PASSIERT NACH DEM SETUP:
  
  Kunde schließt Vertrag ab
    → Kunde bekommt E-Mail mit PDF-Anhang
    
  Jemand füllt Sammelklage-Formular aus  
    → DU bekommst E-Mail mit allen Details
    → Auf "Antworten" klicken → geht direkt an Kunden
═══════════════════════════════════════════════════

──────────────────────────────────────────────────
SCHRITT 1 — EmailJS Account erstellen
──────────────────────────────────────────────────
1. Gehe zu: https://www.emailjs.com
2. Klick "Sign Up Free"
3. Registriere dich mit guelfuture@gmail.com
4. E-Mail bestätigen

──────────────────────────────────────────────────
SCHRITT 2 — Gmail verbinden
──────────────────────────────────────────────────
1. Im Dashboard links: "Email Services"
2. Klick "Add New Service"
3. Wähle "Gmail"
4. Klick "Connect Account"
5. guelfuture@gmail.com auswählen → Zugriff erlauben
6. Service Name: optivaro  (beliebig)
7. Klick "Create Service"
8. ★ NOTIERE die Service ID (z.B. service_abc123)

──────────────────────────────────────────────────
SCHRITT 3 — Template 1: Vertragsabschluss (→ Kunden)
──────────────────────────────────────────────────
1. Links: "Email Templates" → "Create New Template"
2. Template Name: Vertrag Kunde
3. Inhalt exakt so eingeben:

   To:      {{to_email}}
   Subject: {{subject}}

   {{message}}

4. Unter "Attachments":
   - Variable: {{pdf_base64}}
   - Filename: {{pdf_filename}}
   
5. Klick "Save"
6. ★ NOTIERE die Template ID (z.B. template_abc123)

──────────────────────────────────────────────────
SCHRITT 4 — Template 2: Kontaktanfragen (→ Dich)
──────────────────────────────────────────────────
1. Nochmal: "Email Templates" → "Create New Template"
2. Template Name: Kontakt Admin
3. Inhalt:

   To:       {{to_email}}
   Subject:  {{subject}}
   Reply-To: {{reply_to}}

   {{message}}

   ← WICHTIG: Reply-To muss auf {{reply_to}} gesetzt sein!
      Dann geht deine Antwort direkt an den Kunden.

4. Klick "Save"
5. ★ NOTIERE die Template ID (z.B. template_xyz789)

──────────────────────────────────────────────────
SCHRITT 5 — Public Key holen
──────────────────────────────────────────────────
1. Oben rechts: Account-Icon → "Account"
2. Tab "General"
3. Unter "API Keys": Public Key kopieren
4. ★ NOTIERE den Public Key (z.B. aBcDeFgHiJkLmNoP)

──────────────────────────────────────────────────
SCHRITT 6 — In Optivaro eintragen
──────────────────────────────────────────────────
Öffne die Datei:
  src/utils/emailService.js

Suche diese 4 Zeilen ganz oben (ca. Zeile 12):

  const EMAILJS_SERVICE_ID       = 'service_optivaro'
  const EMAILJS_TEMPLATE_VERTRAG = 'template_vertrag'
  const EMAILJS_TEMPLATE_KONTAKT = 'template_kontakt'
  const EMAILJS_PUBLIC_KEY       = 'YOUR_PUBLIC_KEY'

Ersetze mit deinen notierten Werten, z.B.:

  const EMAILJS_SERVICE_ID       = 'service_abc123'
  const EMAILJS_TEMPLATE_VERTRAG = 'template_abc123'
  const EMAILJS_TEMPLATE_KONTAKT = 'template_xyz789'
  const EMAILJS_PUBLIC_KEY       = 'aBcDeFgHiJkLmNoP'

Datei speichern → fertig!

══════════════════════════════════════════════════
  FERTIG — So funktioniert es dann:
══════════════════════════════════════════════════

  Vertragsabschluss:
  ├── Kunde füllt Formular aus
  ├── Klickt "Jetzt verbindlich abschließen"
  ├── PDF wird erstellt und befüllt
  └── Kunde bekommt E-Mail mit PDF-Anhang ✓

  Sammelklage-Formular:
  ├── Interessent füllt Formular aus
  ├── Du bekommst sofort E-Mail mit allen Details
  │   (Bank, Kreditart, Betrag, Zeitraum, Gebühren)
  └── Auf "Antworten" → geht direkt an Interessenten ✓

  Alle Anfragen zusätzlich im Admin-Bereich:
  └── optivaro.at/#/admin → "Kontaktanfragen" ✓

══════════════════════════════════════════════════
  LIMIT & KOSTEN
══════════════════════════════════════════════════
  Kostenlos:  200 E-Mails/Monat
  Personal:   $15/Monat → 1.000 E-Mails
  
  Für den Anfang reicht kostenlos völlig aus.
  Bei mehr Verträgen: Upgrade in 2 Klicks.
