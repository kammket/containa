'use client';

import { ExternalLink, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import { address, brand } from '@emc/catalog';

import { Button } from '@/components/ui/button';
import { readConsent } from './cookie-banner';

/**
 * Google-Maps-Einbettung mit Zwei-Klick-Lösung.
 *
 * Google setzt beim Laden der Karte Cookies und überträgt die IP-Adresse in
 * die USA. Ohne Einwilligung wäre das nach DSGVO/TTDSG unzulässig – deshalb
 * wird die Karte erst nach ausdrücklicher Zustimmung geladen. Vorher steht
 * eine statische Vorschau mit Adresse und Link zu Google Maps.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent?.marketing) setHasConsent(true);

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<{ marketing: boolean }>).detail;
      setHasConsent(Boolean(detail?.marketing));
    };
    window.addEventListener('emc:consent', onConsent);
    return () => window.removeEventListener('emc:consent', onConsent);
  }, []);

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`;

  if (loaded || hasConsent) {
    return (
      <div className="overflow-hidden rounded-2xl border border-stone-200">
        <iframe
          title={`Standort von ${brand.name} auf Google Maps`}
          src={`https://www.google.com/maps?q=${address.mapsQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-100 text-navy-800">
        <MapPin className="size-6" aria-hidden />
      </span>

      <h3 className="mt-5 font-display text-lg font-bold text-navy-950">Kartenansicht</h3>
      <address className="mt-2 text-sm leading-relaxed text-stone-600 not-italic">
        {address.street}
        <br />
        {address.postalCode} {address.city}
      </address>

      <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-stone-500">
        Beim Laden der Karte werden Daten an Google übertragen und Cookies gesetzt. Mit einem Klick
        auf „Karte laden&ldquo; stimmen Sie dieser Übertragung zu.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => setLoaded(true)}>Karte laden</Button>
        <Button asChild variant="outline">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer">
            In Google Maps öffnen
            <ExternalLink aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
}
