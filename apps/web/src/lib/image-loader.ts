/**
 * Bild-Loader für `next/image` (eingehängt über `images.loaderFile`).
 *
 * Hintergrund: Produktfotos liegen bei Cloudinary und kommen von dort bereits
 * fertig ausgeliefert – `f_auto` wählt AVIF/WebP je nach Browser, `q_auto` die
 * Kompression, `w_`/`h_`/`c_fill` den Zuschnitt. Sie zusätzlich durch den
 * Bildoptimierer von Vercel zu schicken, bringt kein besseres Bild, kostet
 * aber je Variante eine Transformation aus dem Kontingent des Tarifs. Ist das
 * aufgebraucht, antwortet `/_next/image` mit `402 Payment Required` und
 * **jedes** Foto bleibt leer – die Produktseite wirkt kaputt, obwohl an den
 * Daten nichts fehlt. Genau daran lag es.
 *
 * Der Loader ersetzt den Optimierer vollständig: Cloudinary-URLs gehen direkt
 * an dessen CDN, alles andere unverändert an die eigene Domain. Damit hängt
 * kein einziges Bild der Seite mehr an einem Transformationskontingent.
 *
 * Der Loader gilt notgedrungen für **alle** Bilder – ein Loader nur für
 * einzelne Bilder (`loader`-Attribut) funktioniert nicht, weil Funktionen
 * nicht aus Server Components an Client Components übergeben werden können,
 * und die meisten Aufrufstellen Server Components sind. Die wenigen lokalen
 * Dateien in `public/` liegen deshalb bereits in Anzeigegröße vor.
 *
 * Ohne konfigurierte Cloud liefert `imageSrc()` einen `data:`-Platzhalter.
 * Solche Quellen behandelt `next/image` von sich aus als unoptimiert, der
 * Loader wird dafür gar nicht erst aufgerufen.
 */

const CLOUDINARY_PREFIX = 'https://res.cloudinary.com/';
const UPLOAD_MARKER = '/image/upload/';

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width }: LoaderArgs): string {
  // Lokale Dateien aus public/ liegen fertig in Anzeigegröße vor und werden
  // unverändert ausgeliefert.
  if (!src.startsWith(CLOUDINARY_PREFIX)) return src;

  return cloudinaryVariant(src, width);
}

/**
 * Schreibt die Breite einer fertigen Cloudinary-URL auf den Wert um, den
 * `next/image` für das jeweilige `srcSet`-Element anfordert.
 *
 * Das Seitenverhältnis der ursprünglichen Angabe bleibt erhalten: Aus
 * `w_1200,h_900,c_fill` wird bei 640 px `w_640,h_480,c_fill`. Ohne diese
 * Umrechnung lieferte Cloudinary für jede Bildschirmbreite dieselbe große
 * Datei und das `srcSet` wäre wirkungslos.
 */
function cloudinaryVariant(src: string, width: number): string {
  const markerAt = src.indexOf(UPLOAD_MARKER);
  if (markerAt === -1) return src;

  const prefix = src.slice(0, markerAt + UPLOAD_MARKER.length);
  const rest = src.slice(markerAt + UPLOAD_MARKER.length);

  const slashAt = rest.indexOf('/');
  if (slashAt === -1) return src;

  const transforms = rest.slice(0, slashAt).split(',');
  const publicId = rest.slice(slashAt + 1);

  const currentWidth = numericTransform(transforms, 'w_');
  const currentHeight = numericTransform(transforms, 'h_');

  const height =
    currentWidth && currentHeight ? Math.round((currentHeight / currentWidth) * width) : null;

  const rewritten = transforms
    // Die passende Breite fordert der Browser bereits über `srcSet` an.
    // `dpr_auto` würde die Pixeldichte ein zweites Mal aufschlagen.
    .filter((transform) => transform !== 'dpr_auto')
    .map((transform) => {
      if (transform.startsWith('w_')) return `w_${width}`;
      if (transform.startsWith('h_')) return height === null ? transform : `h_${height}`;
      return transform;
    });

  if (!currentWidth) rewritten.unshift(`w_${width}`);

  return `${prefix}${rewritten.join(',')}/${publicId}`;
}

/** Zahlenwert einer Transformation wie `w_1200`, sonst `null`. */
function numericTransform(transforms: string[], prefix: string): number | null {
  const match = transforms.find((transform) => transform.startsWith(prefix));
  if (!match) return null;

  const value = Number(match.slice(prefix.length));
  return Number.isFinite(value) && value > 0 ? value : null;
}
