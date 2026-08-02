import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { routes } from '@emc/catalog';

/**
 * Maßstabsgetreuer Größenvergleich der gängigen Formate. Die Balkenbreite
 * entspricht dem Längenverhältnis, damit der Unterschied unmittelbar sichtbar
 * wird – in der Beratung die häufigste offene Frage.
 */
const sizes = [
  {
    label: '10 Fuß',
    length: 2.99,
    volume: '16,0 m³',
    pallets: 4,
    equivalent: '1–2-Zimmer-Wohnung',
    href: routes.category('10-fuss-container'),
  },
  {
    label: '20 Fuß',
    length: 6.06,
    volume: '33,2 m³',
    pallets: 10,
    equivalent: '3-Zimmer-Wohnung',
    href: routes.category('20-fuss-container'),
  },
  {
    label: '40 Fuß',
    length: 12.19,
    volume: '67,7 m³',
    pallets: 21,
    equivalent: 'Einfamilienhaus',
    href: routes.category('40-fuss-container'),
  },
  {
    label: '45 Fuß',
    length: 13.72,
    volume: '86,0 m³',
    pallets: 33,
    equivalent: 'Haus + Garage',
    href: routes.category('high-cube-container'),
  },
];

const maxLength = Math.max(...sizes.map((s) => s.length));

export function SizeComparison() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <ul className="divide-y divide-stone-100">
        {sizes.map((size) => (
          <li key={size.label}>
            <Link
              href={size.href}
              className="group grid grid-cols-1 items-center gap-4 p-5 transition-colors hover:bg-stone-50 sm:grid-cols-[7rem_1fr_auto]"
            >
              <div>
                <p className="font-display text-lg font-bold text-navy-900">{size.label}</p>
                <p className="text-xs text-stone-500">
                  {size.length.toLocaleString('de-DE')} m lang
                </p>
              </div>

              <div className="min-w-0">
                {/* Maßstabsgetreuer Balken mit angedeuteter Wellblechstruktur */}
                <div
                  className="relative h-11 rounded-lg bg-gradient-to-r from-navy-800 to-navy-700 shadow-soft transition-transform duration-300 group-hover:origin-left group-hover:scale-x-[1.01]"
                  style={{ width: `${(size.length / maxLength) * 100}%` }}
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 rounded-lg opacity-30"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.35) 6px 8px)',
                    }}
                  />
                  <span className="absolute inset-y-0 left-2 flex items-center text-xs font-bold text-white/90">
                    {size.volume}
                  </span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  {size.pallets} Europaletten · fasst etwa {size.equivalent}
                </p>
              </div>

              <span className="hidden items-center gap-1 text-sm font-semibold text-navy-800 transition-colors group-hover:text-accent-700 sm:inline-flex">
                Ansehen
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
