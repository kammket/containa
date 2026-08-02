import type { Address, Order, OrderItem } from '@prisma/client';
import {
  absoluteUrl,
  address as companyAddress,
  brand,
  contact,
  formatPrice,
  legal,
  routes,
} from '@emc/catalog';

type OrderWithRelations = Order & {
  items: OrderItem[];
  billingAddress?: Address | null;
  shippingAddress?: Address | null;
};

/** Einfaches HTML-Escaping – Kundendaten dürfen niemals roh ins Template. */
function esc(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Rahmen für alle Transaktionsmails.
 *
 * Tabellenlayout und Inline-Styles sind hier kein schlechter Stil, sondern
 * Notwendigkeit: Outlook und viele Webmailer unterstützen weder Flexbox noch
 * externe Stylesheets zuverlässig.
 */
export function layout(content: string): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(brand.name)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background-color:#111d2e;padding:24px 32px;">
<span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">EMC<span style="color:#f97316;"> Container</span></span>
<div style="margin-top:4px;font-size:12px;color:rgba(255,255,255,0.55);">Seecontainer für Deutschland</div>
</td>
</tr>

<tr><td style="padding:32px;">${content}</td></tr>

<tr>
<td style="background-color:#f8f9fa;padding:24px 32px;border-top:1px solid #e9ecef;">
<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#495057;">
Fragen? Rufen Sie uns an unter <a href="${contact.phoneHref}" style="color:#111d2e;font-weight:600;text-decoration:none;">${esc(contact.phoneDisplay)}</a>
oder antworten Sie einfach auf diese E-Mail.
</p>
<p style="margin:0;font-size:11px;line-height:1.6;color:#868e96;">
${esc(brand.legalName)} · ${esc(companyAddress.street)} · ${esc(companyAddress.postalCode)} ${esc(companyAddress.city)}<br>
Geschäftsführer: ${esc(legal.managingDirector)} · ${esc(legal.registerCourt)} ${esc(legal.registerNumber)} · USt-IdNr. ${esc(legal.vatId)}<br>
<a href="${absoluteUrl(routes.imprint)}" style="color:#868e96;">Impressum</a> ·
<a href="${absoluteUrl(routes.privacy)}" style="color:#868e96;">Datenschutz</a> ·
<a href="${absoluteUrl(routes.terms)}" style="color:#868e96;">AGB</a>
</p>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function itemRows(items: OrderItem[]): string {
  return items
    .map(
      (item) => `<tr>
<td style="padding:12px 0;border-bottom:1px solid #e9ecef;font-size:14px;color:#212529;">
<strong style="font-weight:600;">${esc(item.name)}</strong><br>
<span style="font-size:12px;color:#868e96;">Art.-Nr. ${esc(item.sku)} · ${item.quantity} × ${formatPrice(item.priceNet)} netto</span>
</td>
<td style="padding:12px 0;border-bottom:1px solid #e9ecef;font-size:14px;color:#212529;text-align:right;white-space:nowrap;vertical-align:top;">
${formatPrice(item.lineNet)}
</td>
</tr>`,
    )
    .join('');
}

function addressBlock(label: string, addr?: Address | null): string {
  if (!addr) return '';
  return `<td style="padding:0 8px 0 0;vertical-align:top;width:50%;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#868e96;">${esc(label)}</p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#495057;">
${addr.company ? `${esc(addr.company)}<br>` : ''}
${esc(addr.firstName)} ${esc(addr.lastName)}<br>
${esc(addr.street)} ${esc(addr.houseNumber)}<br>
${esc(addr.postalCode)} ${esc(addr.city)}
</p>
</td>`;
}

export function orderConfirmationBody(order: OrderWithRelations): string {
  const netTotal = order.subtotalNet - order.discountNet + order.shippingNet;

  return `
<h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0d1826;">Vielen Dank für Ihre Bestellung</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#495057;">
Ihre Bestellung ist bei uns eingegangen. Wir prüfen die Anlieferung an Ihrer Adresse und melden uns
in der Regel am nächsten Werktag telefonisch zur Terminabstimmung.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:8px;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<span style="font-size:13px;color:#495057;">Bestellnummer</span><br>
<strong style="font-size:18px;color:#0d1826;letter-spacing:0.02em;">${esc(order.orderNumber)}</strong>
</td></tr>
</table>

<h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0d1826;">Ihre Positionen</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
${itemRows(order.items)}
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
<tr><td style="padding:4px 0;font-size:14px;color:#495057;">Zwischensumme (netto)</td>
<td style="padding:4px 0;font-size:14px;color:#212529;text-align:right;">${formatPrice(order.subtotalNet)}</td></tr>
${
  order.discountNet > 0
    ? `<tr><td style="padding:4px 0;font-size:14px;color:#495057;">Rabatt${order.couponCode ? ` (${esc(order.couponCode)})` : ''}</td>
<td style="padding:4px 0;font-size:14px;color:#2f9e44;text-align:right;">− ${formatPrice(order.discountNet)}</td></tr>`
    : ''
}
<tr><td style="padding:4px 0;font-size:14px;color:#495057;">Lieferung</td>
<td style="padding:4px 0;font-size:14px;color:#212529;text-align:right;">${order.shippingNet === 0 ? 'kostenlos' : formatPrice(order.shippingNet)}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#495057;">Nettobetrag</td>
<td style="padding:4px 0;font-size:14px;color:#212529;text-align:right;">${formatPrice(netTotal)}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#495057;">zzgl. 19 % MwSt.</td>
<td style="padding:4px 0;font-size:14px;color:#212529;text-align:right;">${formatPrice(order.vatAmount)}</td></tr>
<tr><td style="padding:12px 0 0;border-top:2px solid #0d1826;font-size:16px;font-weight:700;color:#0d1826;">Gesamtbetrag</td>
<td style="padding:12px 0 0;border-top:2px solid #0d1826;font-size:18px;font-weight:700;color:#0d1826;text-align:right;">${formatPrice(order.totalGross)}</td></tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
<tr>
${addressBlock('Rechnungsadresse', order.billingAddress)}
${addressBlock('Lieferadresse', order.shippingAddress)}
</tr>
</table>

${
  order.deliveryNotes
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff4e6;border-radius:8px;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#9c4221;">Ihre Hinweise zur Anlieferung</p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#7c2d12;">${esc(order.deliveryNotes)}</p>
</td></tr>
</table>`
    : ''
}

<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
<tr><td style="background-color:#f97316;border-radius:8px;">
<a href="${absoluteUrl(routes.trackOrder)}?nr=${encodeURIComponent(order.orderNumber)}"
style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
Bestellstatus verfolgen</a>
</td></tr>
</table>
<p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:#868e96;">
Für die Statusabfrage benötigen Sie Ihre Bestellnummer und diese E-Mail-Adresse. Ein Kundenkonto ist nicht erforderlich.
</p>`;
}

export function statusUpdateBody(order: OrderWithRelations): string {
  const statusText: Record<string, { title: string; text: string }> = {
    BEZAHLT: {
      title: 'Ihre Zahlung ist eingegangen',
      text: 'Wir haben Ihre Zahlung erhalten und bereiten die Auslieferung vor.',
    },
    IN_BEARBEITUNG: {
      title: 'Ihre Bestellung wird bearbeitet',
      text: 'Wir prüfen die Anlieferung und stimmen den Liefertermin mit Ihnen ab.',
    },
    VERSANDBEREIT: {
      title: 'Ihr Container ist versandbereit',
      text: 'Ihre Bestellung ist für die Auslieferung eingeplant. Den genauen Termin stimmen wir telefonisch ab.',
    },
    IN_ZUSTELLUNG: {
      title: 'Ihr Container ist unterwegs',
      text: 'Am Vortag der Lieferung erhalten Sie ein Zeitfenster von zwei Stunden per SMS.',
    },
    GELIEFERT: {
      title: 'Ihr Container wurde geliefert',
      text: 'Vielen Dank für Ihren Auftrag. Bei Fragen zur Aufstellung helfen wir gern weiter.',
    },
    STORNIERT: {
      title: 'Ihre Bestellung wurde storniert',
      text: 'Bereits geleistete Zahlungen erstatten wir innerhalb von 5 Werktagen zurück.',
    },
  };

  const info = statusText[order.status] ?? {
    title: 'Ihre Bestellung wurde aktualisiert',
    text: 'Der Status Ihrer Bestellung hat sich geändert.',
  };

  return `
<h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0d1826;">${esc(info.title)}</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#495057;">${esc(info.text)}</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:8px;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<span style="font-size:13px;color:#495057;">Bestellnummer</span><br>
<strong style="font-size:18px;color:#0d1826;">${esc(order.orderNumber)}</strong>
${
  order.estimatedDelivery
    ? `<br><br><span style="font-size:13px;color:#495057;">Voraussichtliche Lieferung</span><br>
<strong style="font-size:15px;color:#0d1826;">${order.estimatedDelivery.toLocaleDateString('de-DE')}</strong>`
    : ''
}
</td></tr>
</table>

<table role="presentation" cellpadding="0" cellspacing="0">
<tr><td style="background-color:#111d2e;border-radius:8px;">
<a href="${absoluteUrl(routes.trackOrder)}?nr=${encodeURIComponent(order.orderNumber)}"
style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
Status ansehen</a>
</td></tr>
</table>`;
}
