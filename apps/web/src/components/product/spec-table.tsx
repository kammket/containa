import type { SpecRow } from '@emc/catalog';

const groupLabels: Record<SpecRow['group'], string> = {
  abmessungen: 'Abmessungen',
  gewicht: 'Gewichte',
  aufbau: 'Aufbau & Material',
  zertifizierung: 'Zertifizierung & Normen',
  lieferung: 'Lieferung & Anschluss',
};

const groupOrder: SpecRow['group'][] = [
  'abmessungen',
  'gewicht',
  'aufbau',
  'zertifizierung',
  'lieferung',
];

/** Technische Daten, gruppiert und als semantische Tabellen ausgegeben. */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  const grouped = groupOrder
    .map((group) => ({ group, items: rows.filter((row) => row.group === group) }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div className="space-y-6">
      {grouped.map(({ group, items }) => (
        <div key={group}>
          <h3 className="mb-3 text-xs font-bold tracking-wider text-stone-400 uppercase">
            {groupLabels[group]}
          </h3>
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <caption className="sr-only">{groupLabels[group]}</caption>
              <tbody className="divide-y divide-stone-100">
                {items.map((row) => (
                  <tr key={row.label} className="even:bg-stone-50/60">
                    <th
                      scope="row"
                      className="w-2/5 px-4 py-3 text-left font-medium text-stone-600"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 font-medium text-navy-900">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
