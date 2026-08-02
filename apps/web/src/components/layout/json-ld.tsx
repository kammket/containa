/**
 * Gibt einen bereits serialisierten JSON-LD-Graph aus.
 *
 * Der String wird ausschließlich serverseitig aus eigenen Katalogdaten erzeugt
 * (`lib/schema.ts`); es fließen keine Nutzereingaben ein.
 */
export function JsonLd({ data }: { data: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}
