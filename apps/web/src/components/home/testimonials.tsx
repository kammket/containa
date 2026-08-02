import { Quote } from 'lucide-react';

import { testimonials } from '@emc/catalog';

/** Kundenstimmen als Zitatkarten – auf Mobilgeräten horizontal scrollbar. */
export function Testimonials() {
  return (
    <div className="scroll-snap-x -mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {testimonials.map((item) => (
        <figure
          key={item.author}
          className="snap-item flex w-[85vw] shrink-0 flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-card sm:w-auto"
        >
          <Quote className="size-7 text-accent-300" aria-hidden />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-700">
            {item.quote}
          </blockquote>
          <figcaption className="mt-5 border-t border-stone-100 pt-4">
            <p className="text-sm font-bold text-navy-900">{item.author}</p>
            <p className="text-xs text-stone-500">
              {item.role} · {item.company}
            </p>
            <p className="mt-0.5 text-xs text-stone-400">{item.city}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
