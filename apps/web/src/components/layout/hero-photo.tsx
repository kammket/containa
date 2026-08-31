/**
 * Hintergrundfoto für dunkle Kopfbereiche (Serviceseiten, Über uns,
 * Karriere …). Dieselbe Bildbehandlung wie im Startseiten-Hero, damit die
 * Marke seitenübergreifend konsistent auftritt.
 *
 * Natives `<img>` mit `srcSet` statt `next/image`: Der eigene Bild-Loader
 * liefert lokale Dateien unverändert aus und kann sie nicht verkleinern –
 * siehe die ausführliche Begründung in home/hero.tsx.
 */
const HERO_SRCSET =
  '/hero-terminal-640.jpg 640w, /hero-terminal-960.jpg 960w, /hero-terminal-1280.jpg 1280w, /hero-terminal.jpg 1600w';

export function HeroPhoto() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image kann lokale Dateien über den eigenen Loader nicht verkleinern, siehe Kommentar oben */}
      <img
        src="/hero-terminal.jpg"
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/30"
        aria-hidden
      />
    </>
  );
}
