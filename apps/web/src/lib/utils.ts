import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-Klassen zusammenführen; spätere Utilities gewinnen bei Konflikt. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** ISO-Datum → "14. Juli 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T12:00:00Z`));
}

/** ISO-Datum → "14.07.2026" */
export function formatDateShort(iso: string): string {
  return shortDateFormatter.format(new Date(`${iso}T12:00:00Z`));
}

/** Zahl mit deutschem Tausenderpunkt. */
export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits }).format(value);
}

/** Voraussichtliches Lieferdatum als Spanne, Wochenenden übersprungen. */
export function deliveryWindow([min, max]: [number, number]): string {
  const addWorkdays = (days: number) => {
    const date = new Date();
    let remaining = days;
    while (remaining > 0) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      if (day !== 0 && day !== 6) remaining--;
    }
    return date;
  };

  const from = addWorkdays(min);
  const to = addWorkdays(max);
  const fmt = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit' });
  return `${fmt.format(from)} – ${fmt.format(to)}`;
}

/** Kürzt Text auf volle Wörter und hängt ein Auslassungszeichen an. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(' '))} …`;
}

/** Erzeugt eine URL-taugliche Kennung aus deutschem Text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Stabile Pseudozufallszahl aus einem String – für deterministische Platzhalter. */
export function hashCode(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
