const steps = [
  {
    number: '01',
    title: 'Container auswählen',
    text: 'Größe, Zustand und Bauart passend zum Einsatz wählen – oder anrufen, wir beraten kostenlos.',
  },
  {
    number: '02',
    title: 'Lieferkosten prüfen',
    text: 'Postleitzahl eingeben, Lieferpauschale wird sofort berechnet. Keine Überraschung im Checkout.',
  },
  {
    number: '03',
    title: 'Zufahrt abstimmen',
    text: 'Wir prüfen die Anfahrt anhand Ihrer Angaben und bestellen bei Bedarf einen Autokran mit.',
  },
  {
    number: '04',
    title: 'Anlieferung & Aufstellung',
    text: 'Termin nach Absprache, Zeitfenster per SMS. Der Fahrer setzt den Container punktgenau ab.',
  },
];

/** Ablaufdarstellung mit durchgehender Verbindungslinie auf großen Schirmen. */
export function ProcessSteps() {
  return (
    <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div
        className="absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent lg:block"
        aria-hidden
      />
      {steps.map((step) => (
        <li key={step.number} className="relative">
          <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-xl bg-navy-900 font-display text-sm font-bold text-white shadow-card">
            {step.number}
          </span>
          <h3 className="mt-4 font-display text-base font-bold text-navy-900">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
