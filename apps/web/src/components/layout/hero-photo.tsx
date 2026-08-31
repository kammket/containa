import Image from 'next/image';

/**
 * Abgedunkeltes Hintergrundfoto für dunkle Kopfbereiche (Serviceseiten,
 * Über uns, Karriere …). Dieselbe Bildbehandlung wie im Startseiten-Hero,
 * damit die Marke seitenübergreifend konsistent auftritt.
 */
export function HeroPhoto() {
  return (
    <>
      <Image
        src="/hero-terminal.jpg"
        alt=""
        fill
        unoptimized
        className="object-cover opacity-25"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/90 to-navy-900/75"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
    </>
  );
}
