import Image from 'next/image';

/**
 * Hintergrundfoto für dunkle Kopfbereiche (Serviceseiten, Über uns,
 * Karriere …). Dieselbe Bildbehandlung wie im Startseiten-Hero, damit die
 * Marke seitenübergreifend konsistent auftritt.
 */
export function HeroPhoto() {
  return (
    <>
      <Image src="/hero-terminal.jpg" alt="" fill unoptimized className="object-cover" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/30"
        aria-hidden
      />
    </>
  );
}
