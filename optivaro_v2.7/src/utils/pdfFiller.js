/**
 * pdfFiller v5 — Optivaro
 * Zeichenweise Platzierung in PDF-Kästchen
 * Koordinaten direkt aus pdfminer gemessen
 */
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(d) {
  if (!d) return ''
  const dt = new Date(d)
  if (isNaN(dt)) return d
  return `${String(dt.getDate()).padStart(2,'0')}.${String(dt.getMonth()+1).padStart(2,'0')}.${dt.getFullYear()}`
}

function dl(bytes, name) {
  // Only called from fallback — normally email sends the PDF
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = name
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
}

function pdfName(form, templateName) {
  return `Optivaro_${templateName.replace('.pdf','')}_${form.lastName||'Kunde'}_${new Date().toISOString().split('T')[0]}.pdf`
}

// ── Cell grid positions (pdfminer measured) ──────────────────────────────────
// Zählpunkt-Zeile: 33 Kästchen, je ~15.5px breit
// (nur noch intern für IBAN-Feld genutzt — Zählpunkt-Felder sind aus dem Formular entfernt)
const CELLS_33 = [
  65.9, 81.4, 96.9,112.5,128.0,143.5,159.0,174.5,
 190.1,205.6,221.1,236.6,252.2,267.7,283.2,298.7,
 314.3,329.8,345.3,360.8,376.3,391.9,407.4,422.9,
 438.4,454.0,469.5,485.0,500.5,516.1,531.6,547.1,562.6
]
const CELL_W = 15.5   // Kästchen-Breite
const CHAR_SZ = 7     // Schriftgröße für Kästchen-Felder

// ── Main export ───────────────────────────────────────────────────────────────
/**
 * Generates the filled PDF and returns it as Uint8Array (for email attachment).
 * Does NOT trigger a download.
 */
export async function generateFilledPDF(form, templateName, signatureDataUrl = null, sepaSignatureDataUrl = null) {
  let pdfBytes
  try {
    const r = await fetch(`/pdfs/${templateName}`)
    if (!r.ok) throw new Error(`Template not found: ${templateName}`)
    pdfBytes = await r.arrayBuffer()
  } catch (e) {
    console.warn('PDF template fetch failed, using fallback:', e.message)
    return await fallbackPDF(form, templateName, signatureDataUrl)
  }

  const doc  = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const page = doc.getPages()[0]

  const isGas     = templateName.toLowerCase().includes('gas')
  const isGewerbe = templateName.toLowerCase().includes('gewerbe')

  // ── Drawing helpers ────────────────────────────────────────────────────────

  // Plain text at absolute position
  const t = (text, x, y, sz = 8) => {
    if (!text && text !== 0) return
    page.drawText(String(text), { x, y, size: sz, font, color: rgb(0,0,0) })
  }

  // Checkbox: draw X inside small box at (x0, y0) bottom-left
  const cb = (x0, y0) => {
    page.drawText('X', { x: x0 + 1, y: y0 + 1, size: 6, font, color: rgb(0,0,0) })
  }

  // Per-cell character placement — places each char centered in its box
  // cellXs: array of left-edges for each cell
  // lineY: y of the baseline line
  const cells = (text, cellXs, lineY, sz = CHAR_SZ) => {
    if (!text) return
    const str = String(text).toUpperCase()
    for (let i = 0; i < str.length && i < cellXs.length; i++) {
      const ch = str[i]
      // Center character in cell: cell_left + (cell_width - char_width) / 2
      // For Helvetica 7pt: ~4px wide, in 15.5px cell → offset ~5.75
      const x = cellXs[i] + (CELL_W - sz * 0.6) / 2
      t(ch, x, lineY + 3, sz)
    }
  }

  // ── Fill by template type ──────────────────────────────────────────────────
  const isMontana = templateName.toLowerCase().includes('montana')
  if (isMontana) {
    fillMontana(t, cb, form)
  } else if (!isGas && !isGewerbe) fillStromHaushalt(t, cb, cells, form)
  else if ( isGas && !isGewerbe) fillGasHaushalt  (t, cb, cells, form)
  else if (!isGas &&  isGewerbe) fillStromGewerbe  (t, cb, cells, form)
  else                           fillGasGewerbe    (t, cb, cells, form)

  // ── Signature embedding ────────────────────────────────────────────────────
  const isMontanaTemplate = templateName.toLowerCase().includes('montana')

  async function embedSig(dataUrl, x, y, w, h) {
    if (!dataUrl || !dataUrl.startsWith('data:image/png')) return
    try {
      const b64 = dataUrl.split(',')[1]
      const binStr = atob(b64)
      const imgBytes = Uint8Array.from(binStr, c => c.charCodeAt(0))
      if (imgBytes.length > 9000) {
        const img = await doc.embedPng(imgBytes)
        page.drawImage(img, { x, y, width: w, height: h, opacity: 1.0 })
      }
    } catch (e) { console.warn('Signature embed failed:', e) }
  }

  if (isMontanaTemplate) {
    // Montana: Auftraggeber signature bottom
    await embedSig(signatureDataUrl, 400, 62, 160, 20)
    // Montana: SEPA Kontoinhaber signature
    await embedSig(sepaSignatureDataUrl || signatureDataUrl, 430, 170, 130, 18)
  } else {
    const sigY = isGas ? 111.0 : 87.5
    await embedSig(signatureDataUrl, 315, sigY, 260, isGas ? 16 : 15.5)
    // SEPA sig (same line as kontoinhaber signature)
    if (sepaSignatureDataUrl) {
      const sepaY = isGas ? 350 : 328
      await embedSig(sepaSignatureDataUrl, 430, sepaY, 130, 14)
    }
  }

  return await doc.save()
}

// ── Strom Haushalt ────────────────────────────────────────────────────────────
// Koordinaten: pdfminer y0 (von unten), Seite 841.89pt hoch
function fillStromHaushalt(t, cb, cells, f) {
  // Vermittelt durch (y=783, x=540)
  t(f.agent, 540, 786, 7)

  // Anrede (checkbox y0=744.1): Herr@287.4 | Frau@321.1 | Divers@354.1
  if (f.salutation === 'Herr')   cb(287.4, 744.1)
  if (f.salutation === 'Frau')   cb(321.1, 744.1)
  if (f.salutation === 'Divers') cb(354.1, 744.1)

  // Name-Zeile (Linie y=730.2): Titel|Nachname|Vorname|Geburt
  // Diese Felder haben KEINE Kästchen, nur freie Linien
  t(f.title,           68,  733, 8)
  t(f.lastName,       140,  733, 8)
  t(f.firstName,      289,  733, 8)
  t(fmt(f.birthDate), 488,  733, 8)

  // Adresse (Linie y=710.6)
  t(f.street,          68,  713, 8)
  t(f.houseNumber,    268,  713, 8)
  t(f.staircase,      308,  713, 8)
  t(f.floor,          340,  713, 8)
  t(f.door,           371,  713, 8)
  t(f.postalCode,     402,  713, 8)
  t(f.city,           446,  713, 8)

  // Kontaktart (checkbox y0=689.7): Online@112.7 | Postal@307.3
  if (f.contactType === 'email') cb(112.7, 689.7)
  else                            cb(307.3, 689.7)

  // Email | Tel (Linie y=673.6)
  t(f.email,          115,  676, 8)
  t(f.phone,          364,  676, 8)

  // Lieferantenwechsel (checkbox y0=523.1): Wechsel@85.3 | Neubezug@350.9
  if (f.deliveryType === 'wechsel') cb(85.3,  523.1)
  else                               cb(350.9, 523.1)

  // Lieferbeginn (Linie y=484.9, rechts ab x=351)
  t(fmt(f.deliveryStart), 353, 487, 8)

  // Netzbetreiber | Jahresverbrauch (Linie y=459.0)
  t(f.gridOperator,               68, 462, 8)
  t(f.annualConsumption?.toString(), 338, 462, 8)

  // SEPA Box: Ort/Datum (box y0=293.4, y1=311.7, x0=65.7) → text y=298
  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 298, 7.5)

  // Zahlungsart (checkbox y0=358.2): SEPA@114.1 | Anweisung@274.2
  if (f.paymentMethod === 'sepa') cb(114.1, 358.2)
  else                             cb(274.2, 358.2)

  // Kontoinhaber (Linie y=325.8, x=65.2–221.8)
  t(f.accountHolder, 68, 328, 8)

  // IBAN (Linie y=326.1, x=236.2–578.0) — plain text (no fixed boxes for IBAN)
  t(f.iban?.replace(/\s/g, ''), 238, 328, 8)

  // Hauptunterschrift Ort/Datum (Box y0=86.7, y1=105.1, x0=65.9)
  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 91, 7.5)
}

// ── Gas Haushalt ──────────────────────────────────────────────────────────────
function fillGasHaushalt(t, cb, cells, f) {
  t(f.agent, 540, 786, 7)

  // Anrede: y0=746.3: Herr@343.4 | Frau@377.1 | Divers@410.1
  if (f.salutation === 'Herr')   cb(343.4, 746.3)
  if (f.salutation === 'Frau')   cb(377.1, 746.3)
  if (f.salutation === 'Divers') cb(410.1, 746.3)

  t(f.title,           68,  735, 8)
  t(f.lastName,       120,  735, 8)
  t(f.firstName,      323,  735, 8)
  t(fmt(f.birthDate), 488,  735, 8)

  t(f.street,          68,  715, 8)
  t(f.houseNumber,    251,  715, 8)
  t(f.staircase,      290,  715, 8)
  t(f.floor,          323,  715, 8)
  t(f.door,           354,  715, 8)
  t(f.postalCode,     384,  715, 8)
  t(f.city,           428,  715, 8)

  if (f.contactType === 'email') cb(112.7, 691.8)
  else                            cb(307.3, 691.8)

  t(f.email,          115,  678, 8)
  t(f.phone,          364,  678, 8)

  if (f.deliveryType === 'wechsel') cb(85.1,  521.7)
  else                               cb(350.9, 521.7)

  t(fmt(f.deliveryStart), 353, 487, 8)
  t(f.gridOperator,        68, 462, 8)
  t(f.annualConsumption?.toString(), 338, 462, 8)

  // SEPA Ort/Datum (box y0=317.0)
  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 321, 7.5)

  if (f.paymentMethod === 'sepa') cb(114.1, 378.9)
  else                             cb(277.1, 378.9)

  t(f.accountHolder, 68, 350, 8)
  t(f.iban?.replace(/\s/g, ''), 238, 350, 8)

  // Hauptunterschrift (box y0=110.4)
  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 115, 7.5)
}

// ── Strom Gewerbe ─────────────────────────────────────────────────────────────
function fillStromGewerbe(t, cb, cells, f) {
  t(f.agent, 540, 786, 7)

  if (f.salutation === 'Herr')   cb(341.4, 744.1)
  if (f.salutation === 'Frau')   cb(375.1, 744.1)
  if (f.salutation === 'Divers') cb(408.1, 744.1)

  // Gewerbe hat extra Zeile: Firma | UID | Titel | Nachname | Vorname
  t(f.company,   68, 733, 8)
  t(f.uid,      191, 733, 8)
  t(f.title,    292, 733, 8)
  t(f.lastName, 344, 733, 8)
  t(f.firstName,468, 733, 8)

  t(f.street,          68,  713, 8)
  t(f.houseNumber,    191,  713, 8)
  t(f.staircase,      229,  713, 8)
  t(f.floor,          261,  713, 8)
  t(f.door,           292,  713, 8)
  t(f.postalCode,     322,  713, 8)
  t(f.city,           365,  713, 8)
  t(fmt(f.birthDate), 488,  713, 8)

  if (f.contactType === 'email') cb(112.7, 689.7)
  else                            cb(307.3, 689.7)

  t(f.email,  115, 676, 8)
  t(f.phone,  364, 676, 8)

  if (f.deliveryType === 'wechsel') cb(85.3,  523.1)
  else                               cb(350.9, 523.1)

  t(fmt(f.deliveryStart), 353, 487, 8)
  t(f.gridOperator,        68, 462, 8)
  t(f.annualConsumption?.toString(), 338, 462, 8)

  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 298, 7.5)

  if (f.paymentMethod === 'sepa') cb(114.1, 358.2)
  else                             cb(274.2, 358.2)

  t(f.accountHolder, 68, 328, 8)
  t(f.iban?.replace(/\s/g, ''), 238, 328, 8)

  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 91, 7.5)
}

// ── Gas Gewerbe ───────────────────────────────────────────────────────────────
function fillGasGewerbe(t, cb, cells, f) {
  t(f.agent, 540, 786, 7)

  if (f.salutation === 'Herr')   cb(343.4, 746.3)
  if (f.salutation === 'Frau')   cb(377.1, 746.3)
  if (f.salutation === 'Divers') cb(410.1, 746.3)

  t(f.company,   68, 735, 8)
  t(f.uid,      191, 735, 8)
  t(f.title,    292, 735, 8)
  t(f.lastName, 344, 735, 8)
  t(f.firstName,468, 735, 8)

  t(f.street,          68,  715, 8)
  t(f.houseNumber,    191,  715, 8)
  t(f.staircase,      229,  715, 8)
  t(f.floor,          261,  715, 8)
  t(f.door,           292,  715, 8)
  t(f.postalCode,     322,  715, 8)
  t(f.city,           365,  715, 8)
  t(fmt(f.birthDate), 488,  715, 8)

  if (f.contactType === 'email') cb(112.7, 691.8)
  else                            cb(307.3, 691.8)

  t(f.email,  115, 678, 8)
  t(f.phone,  364, 678, 8)

  if (f.deliveryType === 'wechsel') cb(85.1,  521.7)
  else                               cb(350.9, 521.7)

  t(fmt(f.deliveryStart), 353, 487, 8)
  t(f.gridOperator,        68, 462, 8)
  t(f.annualConsumption?.toString(), 338, 462, 8)

  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 321, 7.5)

  if (f.paymentMethod === 'sepa') cb(114.1, 378.9)
  else                             cb(277.1, 378.9)

  t(f.accountHolder, 68, 350, 8)
  t(f.iban?.replace(/\s/g, ''), 238, 350, 8)

  t(`${f.signLocation}, ${fmt(f.signDate)}`, 68, 115, 7.5)
}


// ── Montana (alle 4 Varianten haben gleiche Struktur) ────────────────────────
function fillMontana(t, cb, form) {
  const f = form

  // Anrede checkboxes (approx positions — Montana hat Frau/Herr/Firma oben links)
  if (f.salutation === 'Frau')   cb(70,  742)
  if (f.salutation === 'Herr')   cb(100, 742)

  // Titel | Nachname | Vorname | Geburtsdatum
  t(f.title,           130, 732, 8)
  t(f.lastName,        185, 732, 8)
  t(f.firstName,       355, 732, 8)
  t(fmt(f.birthDate),  480, 732, 8)

  // Straße | Hausnr | Stiege | Tür | PLZ | Ort
  t(f.street,          70,  713, 8)
  t(f.houseNumber,    248,  713, 8)
  t(f.staircase,      286,  713, 8)
  t(f.door,           322,  713, 8)
  t(f.postalCode,     358,  713, 8)
  t(f.city,           408,  713, 8)

  // Telefon | E-Mail
  t(f.phonePrefix && f.phone ? f.phonePrefix + ' ' + f.phone : f.phone, 70, 696, 8)
  t(f.email,          280,  696, 8)

  // Netzbetreiber | Jahresverbrauch (Zählpunkt Section)
  t(f.gridOperator,        70,  577, 8)
  t(f.annualConsumption?.toString(), 400, 577, 8)

  // Zählpunkt (AT + rest)
  if (f.meterPointId) {
    const zp = f.meterPointId.replace(/^AT/i, '')
    t('AT', 70, 558, 8)
    t(zp,   90, 558, 7)
  }

  // SEPA: Name Kontoinhaber | Adresse
  t(f.accountHolder,   70,  188, 8)
  t(`${f.street} ${f.houseNumber}, ${f.postalCode} ${f.city}`, 280, 188, 7.5)

  // IBAN
  t(f.iban?.replace(/\s/g,''), 70, 172, 8)

  // Ort/Datum Auftraggeber (unten)
  t(`${f.signLocation}, ${fmt(f.signDate)}`, 70, 66, 7.5)

  // Vermittelt durch
  if (f.agent) t(f.agent, 380, 796, 7)

  // UID wenn Gewerbe
  if (f.uid) t(f.uid, 390, 742, 8)
}

// ── Fallback PDF ──────────────────────────────────────────────────────────────
async function fallbackPDF(form, templateName, signatureDataUrl) {
  const doc  = await PDFDocument.create()
  const page = doc.addPage([595, 842])
  const f    = await doc.embedFont(StandardFonts.Helvetica)
  const b    = await doc.embedFont(StandardFonts.HelveticaBold)
  const { width, height } = page.getSize()
  const gold  = rgb(0.784, 0.659, 0.298)
  const navy  = rgb(0.051, 0.106, 0.180)
  const white = rgb(1,1,1)
  const gray  = rgb(0.6, 0.7, 0.8)

  page.drawRectangle({ x:0, y:0, width, height, color:navy })
  page.drawRectangle({ x:0, y:height-80, width, height:80, color:rgb(0.07,0.13,0.22) })
  page.drawText('OPTIVARO MANAGEMENT', { x:40, y:height-46, size:20, font:b, color:gold })
  page.drawText('Energievertrag — ' + templateName.replace('.pdf','').replace(/_/g,' '),
                { x:40, y:height-66, size:9, font:f, color:gray })

  let y = height - 105
  const lh = 18
  const sec = (title) => {
    y -= 8
    page.drawText(title, { x:40, y, size:10, font:b, color:gold })
    y -= lh
  }
  const row = (label, val) => {
    if (!val) return
    page.drawText(label + ':', { x:40,  y, size:8.5, font:f, color:gray })
    page.drawText(String(val),  { x:195, y, size:8.5, font:f, color:white })
    y -= lh
  }

  sec('PRODUKT')
  row('Energieart',  form.energyType?.toUpperCase())
  row('Kundentyp',   form.customerType === 'kmu' ? 'Gewerbe/KMU' : 'Privat/Haushalt')
  row('Tarif',       'Fixpreis — 12 Monate Mindestlaufzeit')

  sec('PERSÖNLICHE DATEN')
  row('Name',        `${form.salutation} ${form.title} ${form.firstName} ${form.lastName}`.trim())
  if (form.company) row('Firma', form.company)
  row('E-Mail',      form.email)
  row('Telefon',     form.phone)
  row('Geburtsdatum',fmt(form.birthDate))

  sec('LIEFERADRESSE')
  row('Straße',  `${form.street} ${form.houseNumber}`)
  row('PLZ/Ort', `${form.postalCode} ${form.city}`)

  sec('ZAHLUNG')
  row('Zahlungsart', form.paymentMethod === 'sepa' ? 'SEPA-Lastschriftmandat' : 'Zahlungsanweisung')
  if (form.iban) row('IBAN', form.iban)

  sec('ANLAGE')
  row('Netzbetreiber',   form.gridOperator)
  row('Jahresverbrauch', form.annualConsumption ? form.annualConsumption + ' kWh' : '')
  row('Lieferbeginn',    fmt(form.deliveryStart))

  sec('UNTERSCHRIFT')
  row('Ort/Datum', `${form.signLocation}, ${fmt(form.signDate)}`)
  row('Vermittelt durch', form.agent)

  // Embed signature if available
  if (signatureDataUrl && signatureDataUrl.startsWith('data:image/png')) {
    try {
      const b64 = signatureDataUrl.split(',')[1]
      const bin = atob(b64)
      const bytes = Uint8Array.from(bin, c => c.charCodeAt(0))
      if (bytes.length > 9000) {
        const img = await doc.embedPng(bytes)
        page.drawImage(img, { x:195, y:y+2, width:200, height:30, opacity:1.0 })
      }
    } catch {}
  }

  return await doc.save()
}
