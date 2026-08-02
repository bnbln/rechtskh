export const CONTACT_EMAIL = 'kanzlei@rechtsklarheit.de'

const clean = (value) => (typeof value === 'string' ? value.trim() : '')
const optional = (value) => clean(value) || 'Nicht angegeben'

export function buildContactMailto(values = {}) {
  const subject = `Kontaktanfrage über rechtsklarheit.de: ${optional(values.betreff)}`
  const callbackRequested =
    values.rueckruf === true || values.rueckruf === 'on' || values.rueckruf === 'Ja'
  const body = [
    'Kontaktanfrage über rechtsklarheit.de',
    '',
    `Vorname: ${optional(values.vorname)}`,
    `Nachname: ${optional(values.nachname)}`,
    `Straße und Hausnummer: ${optional(values.adresse)}`,
    `PLZ und Stadt: ${optional(values.stadt)}`,
    `E-Mail: ${optional(values.email)}`,
    `Telefonnummer: ${optional(values.telefon)}`,
    `Rückruf gewünscht: ${callbackRequested ? 'Ja' : 'Nein'}`,
    `Betreff: ${optional(values.betreff)}`,
    '',
    'Nachricht:',
    optional(values.message),
  ].join('\r\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
