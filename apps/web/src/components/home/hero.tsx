import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from 'lucide-react';

import {
  aggregateRating,
  formatPriceCompact,
  grossFromNet,
  containerPriceRange,
  routes,
} from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/ui/rating';
import { homeHeroImages } from '@/lib/hero-images';
import { blurDataUrl, imageSrc } from '@/lib/images';

/**
 * Rückfallbild, falls kein Angebot mit Foto ermittelbar ist (API nicht
 * erreichbar). Die Datei liegt nicht in Cloudinary; ausgeliefert wird dann der
 * Ersatzplatzhalter – wie bisher.
 */
const fallbackImage = 'emc/hero/container-yard';

const proofPoints = [
  { icon: Truck, label: 'Lieferung in 3–7 Werktagen', sub: 'deutschlandweit' },
  { icon: BadgeCheck, label: 'CSC-zertifiziert', sub: 'nach ISO 668 & 6346' },
  { icon: ShieldCheck, label: 'Bis 60 Monate Garantie', sub: 'auf Neucontainer' },
];

/**
 * Startseiten-Hero. Das Bild ist das LCP-Element und wird mit `priority`
 * geladen; alle Texte stehen im HTML, damit der Inhalt ohne JavaScript sofort
 * sichtbar ist.
 *
 * Gezeigt wird das Titelfoto eines echten Angebots aus dem Bestand – siehe
 * `homeHeroImage`. Vorher stand hier eine Vektorgrafik über einem
 * Hintergrundbild, das es in Cloudinary nie gab.
 */
export async function Hero() {
  const { card: listing, backdrop } = await homeHeroImages();
  const backdropId = backdrop?.publicId ?? fallbackImage;

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src={imageSrc(backdropId, { width: 1920, height: 1080 })}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurDataUrl(backdropId)}
        className="object-cover opacity-35"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/60"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />

      <div className="container-page relative grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-success-600" aria-hidden />
            Über 25 Modelle sofort ab Lager verfügbar
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
            Seecontainer kaufen – <span className="text-accent-500">deutschlandweit geliefert</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Neue, gebrauchte und individuell umgebaute Container in 10, 20, 40 und 45 Fuß. Zum
            Festpreis inklusive Anlieferung per Kranfahrzeug – ohne versteckte Zuschläge.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="sm:w-auto">
              <Link href={routes.shop}>
                Container ansehen
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/15"
            >
              <Link href={routes.quote}>
                Angebot anfordern
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2.5">
              <RatingStars value={aggregateRating.ratingValue} size="md" />
              <span className="text-sm text-white/70">
                <strong className="font-semibold text-white">
                  {aggregateRating.ratingValue.toLocaleString('de-DE')}
                </strong>{' '}
                aus {aggregateRating.reviewCount} Bewertungen
              </span>
            </div>
            <p className="text-sm text-white/70">
              Container ab{' '}
              <strong className="font-semibold text-white">
                {formatPriceCompact(grossFromNet(containerPriceRange.min))}
              </strong>{' '}
              inkl. MwSt.
            </p>
          </div>
        </div>

        {/*
          Foto eines lieferbaren Containers aus dem Bestand statt einer
          Illustration – es zeigt, was Kundinnen und Kunden tatsächlich
          bekommen. Ohne erreichbare API bleibt die Fläche leer statt einen
          grauen Platzhalter zu zeigen; die Textspalte trägt den Hero dann
          allein.
        */}
        {listing && (
          <div className="relative w-full lg:justify-self-end">
            <div
              className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent-500/20 blur-3xl"
              aria-hidden
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
              <Image
                src={imageSrc(listing.publicId, { width: 1200, height: 900 })}
                alt={listing.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 45vw"
                placeholder="blur"
                blurDataURL={blurDataUrl(listing.publicId)}
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Vertrauensleiste */}
      <div className="relative border-t border-white/10 bg-navy-950/70 backdrop-blur-sm">
        <ul className="container-page grid gap-4 py-5 sm:grid-cols-3">
          {proofPoints.map((point) => (
            <li key={point.label} className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-600/20 text-accent-400">
                <point.icon className="size-4.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{point.label}</span>
                <span className="block text-xs text-white/50">{point.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
