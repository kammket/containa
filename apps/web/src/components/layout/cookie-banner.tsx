'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { routes } from '@emc/catalog';

import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'emc.consent.v1';

export interface ConsentState {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  decidedAt: string;
}

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

/**
 * Consent-Banner nach TTDSG/DSGVO. Ohne Einwilligung werden ausschließlich
 * technisch notwendige Daten verarbeitet – es sind keine Statistik- oder
 * Marketing-Skripte eingebunden, solange nicht zugestimmt wurde. Ablehnen ist
 * genauso einfach wie Zustimmen (gleichwertige Schaltflächen).
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      // Kurz verzögert einblenden, damit der Largest Contentful Paint nicht
      // durch das Banner verzögert wird.
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (statistics: boolean, marketing: boolean) => {
    const state: ConsentState = {
      necessary: true,
      statistics,
      marketing,
      decidedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    } catch {
      // Kein Speicher verfügbar – Banner erscheint bei der nächsten Sitzung erneut.
    }
    window.dispatchEvent(new CustomEvent('emc:consent', { detail: state }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[70] animate-fade-up border-t border-stone-200 bg-white/95 backdrop-blur-lg"
    >
      <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-3xl">
          <h2 id="consent-title" className="text-sm font-bold text-navy-900">
            Wir respektieren Ihre Privatsphäre
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            Technisch notwendige Cookies benötigen wir für Warenkorb und Bestellprozess – sie sind
            immer aktiv. Statistik- und Marketing-Cookies setzen wir nur mit Ihrer Einwilligung ein.
            Mehr dazu in unserer{' '}
            <Link
              href={routes.privacy}
              className="font-medium text-navy-800 underline underline-offset-2"
            >
              Datenschutzerklärung
            </Link>{' '}
            und der{' '}
            <Link
              href={routes.cookies}
              className="font-medium text-navy-800 underline underline-offset-2"
            >
              Cookie-Richtlinie
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => decide(false, false)} className="sm:min-w-36">
            Nur notwendige
          </Button>
          <Button onClick={() => decide(true, true)} className="sm:min-w-36">
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
