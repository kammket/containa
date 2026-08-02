import type { Inquiry } from '@prisma/client';
import { absoluteUrl, contact, routes } from '@emc/catalog';

function esc(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const sizeLabels: Record<string, string> = {
  '10ft': '10 Fuß',
  '20ft': '20 Fuß',
  '20ft-hc': '20 Fuß High Cube',
  '40ft': '40 Fuß',
  '40ft-hc': '40 Fuß High Cube',
  '45ft': '45 Fuß High Cube',
  unklar: 'noch offen – Beratung gewünscht',
};

const conditionLabels: Record<string, string> = {
  neu: 'Fabrikneu',
  'one-trip': 'One-Trip',
  generalueberholt: 'Generalüberholt',
  gebraucht: 'Gebraucht',
  egal: 'Egal',
};

export function contactAcknowledgementBody(inquiry: Inquiry): string {
  return `
<h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0d1826;">Ihre Anfrage ist eingegangen</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#495057;">
Guten Tag ${esc(inquiry.name)},<br><br>
vielen Dank für Ihre Nachricht. Wir melden uns in der Regel innerhalb eines Werktages bei Ihnen.
Bei dringenden Anliegen erreichen Sie uns telefonisch schneller unter
<a href="${contact.phoneHref}" style="color:#111d2e;font-weight:600;text-decoration:none;">${esc(contact.phoneDisplay)}</a>.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:8px;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<span style="font-size:13px;color:#495057;">Ihre Referenz</span><br>
<strong style="font-size:18px;color:#0d1826;">${esc(inquiry.reference)}</strong>
</td></tr>
</table>

<h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0d1826;">Ihre Nachricht</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #e9ecef;">
<tr><td style="padding:4px 0 4px 16px;">
<p style="margin:0 0 8px;font-size:13px;color:#868e96;">Betreff: ${esc(inquiry.subject)}</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#495057;white-space:pre-line;">${esc(inquiry.message)}</p>
</td></tr>
</table>

<p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#868e96;">
In der Zwischenzeit finden Sie in unseren
<a href="${absoluteUrl(routes.faq)}" style="color:#111d2e;">häufigen Fragen</a> Antworten zu Lieferung,
Aufstellung und Genehmigungen.
</p>`;
}

export function quoteAcknowledgementBody(inquiry: Inquiry): string {
  const rows = [
    ['Containergröße', sizeLabels[inquiry.size ?? ''] ?? inquiry.size],
    ['Zustand', conditionLabels[inquiry.condition ?? ''] ?? inquiry.condition],
    ['Anzahl', inquiry.quantity ? String(inquiry.quantity) : null],
    ['Lieferpostleitzahl', inquiry.postalCode],
    ['Verwendungszweck', inquiry.usage],
    [
      'Wunschtermin',
      inquiry.deliveryDate ? inquiry.deliveryDate.toLocaleDateString('de-DE') : null,
    ],
  ]
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) => `<tr>
<td style="padding:8px 0;border-bottom:1px solid #e9ecef;font-size:13px;color:#868e96;width:45%;">${esc(label)}</td>
<td style="padding:8px 0;border-bottom:1px solid #e9ecef;font-size:14px;color:#212529;font-weight:600;">${esc(value)}</td>
</tr>`,
    )
    .join('');

  return `
<h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0d1826;">Ihre Angebotsanfrage ist eingegangen</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#495057;">
Guten Tag ${esc(inquiry.name)},<br><br>
vielen Dank für Ihre Anfrage. Wir prüfen jetzt Verfügbarkeit und Zufahrt und senden Ihnen in der
Regel innerhalb eines Werktages ein verbindliches Festpreisangebot inklusive Anlieferung.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:8px;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<span style="font-size:13px;color:#495057;">Ihre Referenz</span><br>
<strong style="font-size:18px;color:#0d1826;">${esc(inquiry.reference)}</strong>
</td></tr>
</table>

<h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0d1826;">Ihre Angaben</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
${rows}
</table>

${
  inquiry.message
    ? `<h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0d1826;">Ihre Anmerkungen</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #e9ecef;margin-bottom:24px;">
<tr><td style="padding:4px 0 4px 16px;">
<p style="margin:0;font-size:14px;line-height:1.7;color:#495057;white-space:pre-line;">${esc(inquiry.message)}</p>
</td></tr>
</table>`
    : ''
}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff4e6;border-radius:8px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0;font-size:13px;line-height:1.6;color:#7c2d12;">
<strong>Gut zu wissen:</strong> Unser Angebot enthält Container und Anlieferung als Festpreis.
Sollte für Ihren Stellplatz ein Autokran nötig sein, weisen wir die Kosten vorab gesondert aus –
Nachträge nach Auftragsbestätigung gibt es bei uns nicht.
</p>
</td></tr>
</table>`;
}
