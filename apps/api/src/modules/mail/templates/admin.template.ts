import type { Address, Inquiry, Order, OrderItem } from '@prisma/client';
import { brand, formatPrice } from '@emc/catalog';

import { conditionLabels, formatInquiryAddress, sizeLabels } from './inquiry.template';

/**
 * Interne Benachrichtigungen an das Team.
 *
 * Bewusst vollständig: Diese E-Mails sollen den Adminbereich für den ersten
 * Blick ersetzen. Wer unterwegs eine Bestellung sieht, soll erkennen können,
 * was bestellt wurde, wohin es geht und wen er anrufen muss – ohne sich
 * einzuloggen. Der Link an das Ende führt trotzdem in die Verwaltung.
 */

type OrderWithRelations = Order & {
  items: OrderItem[];
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};

function esc(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NAVY = '#0d1826';
const MUTED = '#868e96';
const LINE = '#e9ecef';

function heading(text: string): string {
  return `<h2 style="margin:28px 0 10px;font-size:14px;font-weight:700;color:${NAVY};text-transform:uppercase;letter-spacing:0.04em;">${esc(text)}</h2>`;
}

/** Definitionsliste aus Beschriftung und Wert; leere Werte entfallen. */
function rows(entries: [string, string | number | null | undefined][]): string {
  const body = entries
    .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '')
    .map(
      ([label, value]) => `<tr>
<td style="padding:7px 0;border-bottom:1px solid ${LINE};font-size:13px;color:${MUTED};width:40%;vertical-align:top;">${esc(label)}</td>
<td style="padding:7px 0;border-bottom:1px solid ${LINE};font-size:14px;color:#212529;font-weight:600;">${esc(value).replace(/\n/g, '<br>')}</td>
</tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>`;
}

function addressText(addr?: Address | null): string | null {
  if (!addr) return null;
  const name = [addr.firstName, addr.lastName].filter(Boolean).join(' ');
  return [
    addr.company,
    name,
    [addr.street, addr.houseNumber].filter(Boolean).join(' '),
    [addr.postalCode, addr.city].filter(Boolean).join(' '),
    addr.country && addr.country !== 'DE' ? addr.country : null,
    addr.phone ? `Tel. ${addr.phone}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function itemTable(items: OrderItem[]): string {
  const body = items
    .map(
      (item) => `<tr>
<td style="padding:8px 0;border-bottom:1px solid ${LINE};font-size:13px;color:#212529;">
<strong style="font-weight:600;">${esc(item.name)}</strong><br>
<span style="color:${MUTED};font-size:12px;">${esc(item.sku)}</span>
</td>
<td style="padding:8px 0;border-bottom:1px solid ${LINE};font-size:13px;color:#212529;text-align:center;white-space:nowrap;">${esc(item.quantity)} ×<br><span style="color:${MUTED};font-size:12px;">${esc(formatPrice(item.priceNet))}</span></td>
<td style="padding:8px 0;border-bottom:1px solid ${LINE};font-size:13px;color:#212529;text-align:right;white-space:nowrap;">${esc(formatPrice(item.lineNet))}</td>
</tr>`,
    )
    .join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<th align="left" style="padding:0 0 6px;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.04em;">Position</th>
<th align="center" style="padding:0 0 6px;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.04em;">Menge</th>
<th align="right" style="padding:0 0 6px;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.04em;">Netto</th>
</tr>
${body}</table>`;
}

function adminLink(path: string, label: string, appUrl: string | undefined): string {
  if (!appUrl) return '';
  return `<p style="margin:26px 0 0;">
<a href="${esc(appUrl.replace(/\/$/, '') + path)}" style="display:inline-block;background-color:#e8590c;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:11px 20px;border-radius:8px;">${esc(label)}</a>
</p>`;
}

export function adminOrderNotificationBody(order: OrderWithRelations, appUrl?: string): string {
  const customerType = order.customerType === 'GEWERBLICH' ? 'Geschäftskunde' : 'Privatkunde';
  const shipping = addressText(order.shippingAddress) ?? addressText(order.billingAddress);
  const billing = addressText(order.billingAddress);

  return `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${NAVY};">Neue Bestellung ${esc(order.orderNumber)}</h1>
<p style="margin:0;font-size:15px;color:#495057;">
${esc(formatPrice(order.totalGross))} brutto · ${esc(customerType)}
</p>

${heading('Kontakt')}
${rows([
  ['E-Mail', order.email],
  ['Telefon', order.shippingAddress?.phone ?? order.billingAddress?.phone],
  ['USt-IdNr.', order.vatId],
])}

${heading('Lieferadresse')}
${rows([['Anschrift', shipping]])}
${
  billing && billing !== shipping
    ? `${heading('Rechnungsadresse')}${rows([['Anschrift', billing]])}`
    : ''
}

${heading('Positionen')}
${itemTable(order.items)}

${heading('Beträge')}
${rows([
  ['Zwischensumme netto', formatPrice(order.subtotalNet)],
  ['Rabatt', order.discountNet ? `− ${formatPrice(order.discountNet)}` : null],
  ['Gutscheincode', order.couponCode],
  ['Versand netto', formatPrice(order.shippingNet)],
  ['Mehrwertsteuer', formatPrice(order.vatAmount)],
  ['Gesamt brutto', formatPrice(order.totalGross)],
])}

${order.deliveryNotes ? `${heading('Hinweise zur Anlieferung')}<p style="margin:0;font-size:14px;line-height:1.6;color:#212529;white-space:pre-line;">${esc(order.deliveryNotes)}</p>` : ''}

${adminLink(`/admin/bestellungen/${order.orderNumber}`, 'Bestellung in der Verwaltung öffnen', appUrl)}
`;
}

export function adminInquiryNotificationBody(inquiry: Inquiry, appUrl?: string): string {
  const isQuote = inquiry.type === 'ANGEBOT';

  const detail: [string, string | number | null | undefined][] = isQuote
    ? [
        ['Containergröße', sizeLabels[inquiry.size ?? ''] ?? inquiry.size],
        ['Zustand', conditionLabels[inquiry.condition ?? ''] ?? inquiry.condition],
        ['Anzahl', inquiry.quantity],
        ['Verwendungszweck', inquiry.usage],
        ['Wunschtermin', inquiry.deliveryDate?.toLocaleDateString('de-DE')],
        ['Angefragtes Produkt', inquiry.productSlug],
      ]
    : [['Anliegen', inquiry.subject]];

  return `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${NAVY};">
${isQuote ? 'Neue Angebotsanfrage' : 'Neue Kontaktanfrage'} ${esc(inquiry.reference)}
</h1>
<p style="margin:0;font-size:15px;color:#495057;">von ${esc(inquiry.name)}${
    inquiry.company ? ` · ${esc(inquiry.company)}` : ''
  }</p>

${heading('Kontakt')}
${rows([
  ['Name', inquiry.name],
  ['Firma', inquiry.company],
  ['E-Mail', inquiry.email],
  ['Telefon', inquiry.phone],
  ['Anschrift', formatInquiryAddress(inquiry)],
  [
    'Kundentyp',
    inquiry.customerType
      ? inquiry.customerType === 'GEWERBLICH'
        ? 'Geschäftskunde'
        : 'Privatkunde'
      : null,
  ],
])}

${heading(isQuote ? 'Angefragter Bedarf' : 'Anliegen')}
${rows(detail)}

${
  inquiry.message
    ? `${heading('Nachricht')}<p style="margin:0;padding:14px 16px;background-color:#f8f9fa;border-radius:8px;font-size:14px;line-height:1.6;color:#212529;white-space:pre-line;">${esc(inquiry.message)}</p>`
    : ''
}

${adminLink(`/admin/anfragen/${inquiry.id}`, 'Anfrage in der Verwaltung öffnen', appUrl)}
`;
}

export function adminNewsletterNotificationBody(email: string, appUrl?: string): string {
  return `
<h1 style="margin:0 0 4px;font-size:20px;font-weight:700;color:${NAVY};">Neue Newsletter-Anmeldung</h1>
${heading('Anmeldung')}
${rows([
  ['E-Mail', email],
  ['Eingegangen am', new Date().toLocaleString('de-DE')],
  ['Website', brand.url],
])}
${adminLink('/admin', 'Zur Verwaltung', appUrl)}
`;
}
