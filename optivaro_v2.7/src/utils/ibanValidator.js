/**
 * ibanValidator.js — Optivaro
 * ISO 7064 MOD-97-10 IBAN-Prüfung
 * Kein externes API — läuft komplett im Browser
 */

// Bekannte Länder mit korrekter IBAN-Länge
const IBAN_LENGTHS = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28,
  BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
  BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24,
  DE: 22, DK: 18, DO: 28, EE: 20, EG: 29,
  ES: 24, FI: 18, FO: 18, FR: 27, GB: 22,
  GE: 22, GI: 23, GL: 18, GR: 27, GT: 28,
  HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23,
  IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20,
  LB: 28, LC: 32, LI: 21, LT: 20, LU: 20,
  LV: 21, LY: 25, MC: 27, MD: 24, ME: 22,
  MK: 19, MR: 27, MT: 31, MU: 30, NL: 18,
  NO: 15, PK: 24, PL: 28, PS: 29, PT: 25,
  QA: 29, RO: 24, RS: 22, SA: 24, SC: 31,
  SE: 24, SI: 19, SK: 24, SM: 27, ST: 25,
  SV: 28, TL: 23, TN: 24, TR: 26, UA: 29,
  VA: 22, VG: 24, XK: 20,
}

/**
 * Bereinigt eine IBAN (Leerzeichen entfernen, Großbuchstaben)
 */
export function cleanIBAN(iban) {
  return (iban || '').replace(/\s+/g, '').toUpperCase()
}

/**
 * Formatiert IBAN in Gruppen zu je 4 Zeichen: AT12 3456 7890 1234 5678
 */
export function formatIBAN(iban) {
  const clean = cleanIBAN(iban)
  return clean.replace(/(.{4})/g, '$1 ').trim()
}

/**
 * Validiert eine IBAN vollständig:
 * 1. Ländercode bekannt?
 * 2. Länge korrekt?
 * 3. MOD-97 Prüfziffer korrekt?
 *
 * @returns {{ valid: boolean, error: string|null, country: string|null }}
 */
export function validateIBAN(rawIban) {
  const iban = cleanIBAN(rawIban)

  if (!iban) {
    return { valid: false, error: 'Bitte geben Sie Ihre IBAN ein.', country: null }
  }

  // Mindest-Format: 2 Buchstaben + 2 Ziffern + mind. 1 Zeichen
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban)) {
    return { valid: false, error: 'IBAN hat ein ungültiges Format. Beginnt mit 2 Buchstaben (z.B. AT).', country: null }
  }

  const countryCode = iban.substring(0, 2)
  const expectedLength = IBAN_LENGTHS[countryCode]

  // Unbekanntes Land
  if (!expectedLength) {
    return { valid: false, error: `Unbekannter Ländercode „${countryCode}". Bitte prüfen Sie Ihre IBAN.`, country: null }
  }

  // Länge falsch
  if (iban.length !== expectedLength) {
    return {
      valid: false,
      error: `IBAN für ${countryCode} muss genau ${expectedLength} Zeichen haben (Sie haben ${iban.length}).`,
      country: countryCode,
    }
  }

  // MOD-97 Prüfziffer (ISO 7064)
  // Schritt 1: Erste 4 Zeichen ans Ende
  const rearranged = iban.substring(4) + iban.substring(0, 4)

  // Schritt 2: Buchstaben → Zahlen (A=10, B=11, ..., Z=35)
  const numeric = rearranged.split('').map(ch => {
    const code = ch.charCodeAt(0)
    if (code >= 65 && code <= 90) return String(code - 55) // A=10..Z=35
    return ch
  }).join('')

  // Schritt 3: MOD 97 (auf BigInt wegen Zahllänge)
  const remainder = BigInt(numeric) % 97n

  if (remainder !== 1n) {
    return {
      valid: false,
      error: 'IBAN-Prüfziffer ungültig. Bitte kontrollieren Sie Ihre Eingabe.',
      country: countryCode,
    }
  }

  // ✓ Alles korrekt
  const countryNames = {
    AT: 'Österreich', DE: 'Deutschland', CH: 'Schweiz',
    IT: 'Italien',    HU: 'Ungarn',      CZ: 'Tschechien',
    SK: 'Slowakei',   PL: 'Polen',       NL: 'Niederlande',
    BE: 'Belgien',    FR: 'Frankreich',  ES: 'Spanien',
    GB: 'Großbritannien',
  }

  return {
    valid: true,
    error: null,
    country: countryCode,
    countryName: countryNames[countryCode] || countryCode,
  }
}
