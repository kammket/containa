'use client';

import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { useState } from 'react';

import type { ProductImage } from '@emc/catalog';

import { blurDataUrl, imageSrc } from '@/lib/images';
import { cn } from '@/lib/utils';

/**
 * Produktgalerie mit Miniaturen und Lupe.
 *
 * Der Zoom folgt der Mausposition über `background-position` – das kommt ohne
 * zusätzliche Bibliothek aus und erzeugt keinen Layout-Shift. Auf
 * Touch-Geräten ist er deaktiviert, dort scrollt man stattdessen durch die
 * Miniaturen.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const active = images[activeIndex];
  if (!active) return null;

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMouseMove}
      >
        <Image
          key={active.publicId}
          src={imageSrc(active.publicId, { width: 1200, height: 900 })}
          alt={active.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={activeIndex === 0}
          placeholder="blur"
          blurDataURL={blurDataUrl(active.publicId)}
          className={cn('object-cover transition-transform duration-200', zooming && 'scale-[1.9]')}
          style={zooming ? { transformOrigin: `${origin.x}% ${origin.y}%` } : undefined}
        />

        <span className="pointer-events-none absolute right-3 bottom-3 hidden items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-2xs font-semibold text-navy-800 opacity-0 shadow-soft backdrop-blur-sm transition-opacity group-hover:opacity-100 lg:inline-flex">
          <ZoomIn className="size-3.5" aria-hidden />
          Zum Vergrößern bewegen
        </span>

        <span className="absolute top-3 left-3 rounded-lg bg-navy-950/70 px-2.5 py-1 text-2xs font-semibold text-white backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-6 gap-2" role="list">
          {images.map((image, index) => (
            <li key={image.publicId}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Bild ${index + 1} von ${images.length} anzeigen: ${image.alt}`}
                aria-current={index === activeIndex}
                className={cn(
                  'relative block aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 bg-stone-100 transition-all',
                  index === activeIndex
                    ? 'border-navy-800 shadow-soft'
                    : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <Image
                  src={imageSrc(image.publicId, { width: 160, height: 160 })}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-2xs text-stone-500">
        Abbildungen zeigen ein baugleiches Modell. Farbton und Gebrauchsspuren können bei
        Gebrauchtcontainern abweichen – Fotos des konkreten Containers senden wir auf Anfrage.
      </p>
      <span className="sr-only">Produktbilder für {name}</span>
    </div>
  );
}
