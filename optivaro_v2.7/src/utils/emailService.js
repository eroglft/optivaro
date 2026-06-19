/**
 * emailService.js — Optivaro v2.7
 * Web3Forms — kostenlos, 250 E-Mails/Monat, kein Blocking
 *
 * SETUP (1 Minute):
 * 1. https://web3forms.com
 * 2. E-Mail eingeben: guelfuture@gmail.com → "Get your Access Key"
 * 3. Key aus der E-Mail kopieren
 * 4. Unten bei WEB3FORMS_KEY eintragen
 */

// ══════════════════════════════════════════
// ▼ HIER NUR DIESEN EINEN WERT EINTRAGEN ▼
const WEB3FORMS_KEY = 'DEIN_ACCESS_KEY_HIER'
// ══════════════════════════════════════════

export const FROM_EMAIL = 'guelfuture@gmail.com'

const API = 'https://api.web3forms.com/submit'

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('de-AT') } catch { return d }
}

// ── Vertragsabschluss ─────────────────────────────────────────────────────────
// PDF wird direkt heruntergeladen + du bekommst Benachrichtigung
export async function sendContractEmail(pdfBytes, form, templateName) {
  // 1. PDF direkt beim Kunden herunterladen
  const filename = `Optivaro_Vertrag_${form.lastName}_${new Date().toISOString().split('T')[0]}.pdf`
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = filename
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)

  // 2. Benachrichtigung an guelfuture@gmail.com
  const energie = form.energyType === 'strom' ? 'Strom' : 'Gas'
  const typ     = form.customerType === 'kmu' ? 'Gewerbe/KMU' : 'Privat/Haushalt'

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject:    `✅ Neuer Vertragsabschluss: ${form.firstName} ${form.lastName} — ${energie}`,
        from_name:  'Optivaro System',
        replyto:    form.email,
        // Alle Felder kommen übersichtlich in der E-Mail an
        Kunde:          `${form.salutation} ${form.firstName} ${form.lastName}`,
        'E-Mail Kunde': form.email,
        Telefon:        form.phone || '—',
        Produkt:        `${energie} — ${typ} — Fixpreis`,
        Lieferbeginn:   fmtDate(form.deliveryStart),
        Netzbetreiber:  form.gridOperator || '—',
        Jahresverbrauch:form.annualConsumption ? form.annualConsumption + ' kWh' : '—',
        Adresse:        `${form.street} ${form.houseNumber}, ${form.postalCode} ${form.city}`,
        Zahlung:        form.paymentMethod === 'sepa' ? 'SEPA-Lastschrift' : 'Zahlungsanweisung',
        'Vermittelt durch': form.agent || '—',
        Vorlage:        templateName,
        Hinweis:        '📄 PDF wurde direkt an den Kunden heruntergeladen.',
      })
    })
    const data = await res.json()
    if (data.success) return { success: true }
    throw new Error(data.message || 'Web3Forms Fehler')
  } catch (err) {
    console.error('sendContractEmail error:', err)
    return { success: false, error: err.message }
  }
}

// ── Kontaktanfrage ────────────────────────────────────────────────────────────
// Benachrichtigung an guelfuture@gmail.com mit allen Details
export async function sendContactNotification(d) {
  const isSammel = d.topic === 'sammelklage'
  const isDsgvo  = d.topic === 'datenschutz'

  const subject = isSammel
    ? `⚖️ SAMMELKLAGE-ANFRAGE: ${d.name} — ${d.bankName || '?'}`
    : isDsgvo
      ? `🔒 DATENSCHUTZ-Anfrage: ${d.name}`
      : `📬 Kontaktanfrage (${d.topicLabel}): ${d.name}`

  const body = {
    access_key: WEB3FORMS_KEY,
    subject,
    from_name:  'Optivaro Kontaktformular',
    replyto:    d.email,  // ← Antworten geht direkt an den Kunden
    Name:       d.name,
    Email:      d.email,
    Telefon:    d.phone   || '—',
    Thema:      d.topicLabel,
    // Sammelklage-Felder
    ...(isSammel && {
      '🏦 Bank':       d.bankName      || '—',
      'Kreditart':     d.kreditArt     || '—',
      'Betrag':        d.kreditBetrag  || '—',
      'Zeitraum':      d.kreditZeitraum|| '—',
      'Gebühren':      d.gebuehren     || '—',
    }),
    // DSGVO-Felder
    ...(isDsgvo && {
      'Anfrage-Typ':   d.dsArt || '—',
      '⚠️ Frist':     'Antwort innerhalb 30 Tage (DSGVO Art. 12)',
    }),
    Nachricht:  d.message || '—',
  }

  try {
    const res  = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data.success) return { success: true }
    throw new Error(data.message || 'Web3Forms Fehler')
  } catch (err) {
    console.error('sendContactNotification error:', err)
    return { success: false, error: err.message }
  }
}
