import { hashCode } from './utils';

/**
 * Bildquelle mit Cloudinary als Primärquelle.
 *
 * Ist keine Cloud konfiguriert (lokale Entwicklung, CI, Vorschau-Deployments),
 * wird ein deterministisches SVG erzeugt. Dadurch ist die Seite jederzeit ohne
 * externe Abhängigkeit lauffähig und das Layout bleibt identisch – nur die
 * Bildinhalte fehlen.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export interface ImageOptions {
  width?: number;
  height?: number;
  /** Zuschnitt-Modus von Cloudinary */
  crop?: 'fill' | 'fit' | 'limit';
  quality?: number | 'auto';
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME);
}

/**
 * Baut eine Cloudinary-URL mit automatischer Format- und Qualitätswahl.
 * `f_auto` liefert AVIF/WebP je nach Browser, `q_auto` wählt die Kompression.
 */
export function cloudinaryUrl(publicId: string, options: ImageOptions = {}): string {
  const { width, height, crop = 'fill', quality = 'auto' } = options;

  const transforms = ['f_auto', `q_${quality}`, 'dpr_auto'];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width && height) transforms.push(`c_${crop}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Deterministischer SVG-Platzhalter im Markendesign. Aus der publicId wird ein
 * stabiler Farbton abgeleitet, sodass jedes Produkt konsistent dieselbe
 * Darstellung erhält – auch über Reloads und Builds hinweg.
 */
export function placeholderDataUrl(publicId: string, width = 1200, height = 900): string {
  const hash = hashCode(publicId);
  const hue = 205 + (hash % 40) - 20;
  const light = 34 + (hash % 14);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="hsl(${hue} 38% ${light}%)"/>
<stop offset="1" stop-color="hsl(${hue} 30% ${Math.max(14, light - 14)}%)"/>
</linearGradient>
<pattern id="corr" width="26" height="26" patternUnits="userSpaceOnUse">
<rect width="26" height="26" fill="none"/>
<path d="M13 0 V26" stroke="hsl(${hue} 30% ${light + 9}%)" stroke-width="7" opacity="0.5"/>
</pattern>
</defs>
<rect width="${width}" height="${height}" fill="url(#g)"/>
<rect width="${width}" height="${height}" fill="url(#corr)"/>
<rect x="${width * 0.06}" y="${height * 0.2}" width="${width * 0.88}" height="${height * 0.6}" rx="10" fill="hsl(${hue} 26% ${light + 5}%)" stroke="hsl(${hue} 24% ${light + 16}%)" stroke-width="3"/>
<rect x="${width * 0.06}" y="${height * 0.2}" width="${width * 0.88}" height="${height * 0.6}" rx="10" fill="url(#corr)" opacity="0.45"/>
<g fill="hsl(${hue} 20% ${light + 22}%)" opacity="0.85">
<rect x="${width * 0.07}" y="${height * 0.21}" width="${width * 0.045}" height="${height * 0.58}" rx="4"/>
<rect x="${width * 0.885}" y="${height * 0.21}" width="${width * 0.045}" height="${height * 0.58}" rx="4"/>
</g>
<text x="50%" y="${height * 0.94}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(height * 0.045)}" font-weight="600" fill="hsl(${hue} 20% ${light + 34}%)" opacity="0.7">EMC Container</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\n/g, ''))}`;
}

/** Bildquelle für ein `next/image`-Element. */
export function imageSrc(publicId: string, options: ImageOptions = {}): string {
  return isCloudinaryConfigured()
    ? cloudinaryUrl(publicId, options)
    : placeholderDataUrl(publicId, options.width ?? 1200, options.height ?? 900);
}

/** Winziger, unscharfer Platzhalter für die Blur-Up-Darstellung. */
export function blurDataUrl(publicId: string): string {
  const hash = hashCode(publicId);
  const hue = 205 + (hash % 40) - 20;
  const light = 34 + (hash % 14);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 6"><rect width="8" height="6" fill="hsl(${hue} 32% ${light}%)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Absolute Bild-URL für OpenGraph und Schema.org. */
export function ogImageUrl(publicId: string): string {
  return isCloudinaryConfigured()
    ? cloudinaryUrl(publicId, { width: 1200, height: 630, crop: 'fill' })
    : `/og-default.svg`;
}
