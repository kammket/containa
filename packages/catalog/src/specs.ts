import type { ContainerSpecs, Dimension, SpecRow } from './types.ts';

/** Formatiert eine Dimension als "6.058 × 2.438 × 2.591 mm". */
export function formatDimension(d: Dimension): string {
  const f = (n: number) => n.toLocaleString('de-DE');
  return `${f(d.length)} × ${f(d.width)} × ${f(d.height)} mm`;
}

/** Millimeter → Meter mit zwei Nachkommastellen, z. B. "6,06 m". */
export function mmToMeters(mm: number): string {
  return `${(mm / 1000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`;
}

export function formatKg(kg: number): string {
  return `${kg.toLocaleString('de-DE')} kg`;
}

/**
 * Erzeugt die Zeilen der Spezifikationstabelle aus den technischen Daten.
 * So bleibt die Produktdefinition frei von Formatierungslogik und die
 * Darstellung im gesamten Shop konsistent.
 */
export function buildSpecRows(specs: ContainerSpecs, extra: SpecRow[] = []): SpecRow[] {
  const rows: SpecRow[] = [];

  rows.push({
    label: 'Außenmaße (L × B × H)',
    value: formatDimension(specs.exterior),
    group: 'abmessungen',
  });

  if (specs.interior) {
    rows.push({
      label: 'Innenmaße (L × B × H)',
      value: formatDimension(specs.interior),
      group: 'abmessungen',
    });
  }

  if (specs.doorOpening) {
    rows.push({
      label: 'Türöffnung (B × H)',
      value: `${specs.doorOpening.width.toLocaleString('de-DE')} × ${specs.doorOpening.height.toLocaleString('de-DE')} mm`,
      group: 'abmessungen',
    });
  }

  if (specs.volume !== undefined) {
    rows.push({
      label: 'Innenvolumen',
      value: `${specs.volume.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m³`,
      group: 'abmessungen',
    });
  }

  rows.push({
    label: 'Stellfläche',
    value: `ca. ${((specs.exterior.length / 1000) * (specs.exterior.width / 1000)).toLocaleString('de-DE', { maximumFractionDigits: 1 })} m²`,
    group: 'abmessungen',
  });

  if (specs.tareWeight !== undefined) {
    rows.push({ label: 'Leergewicht (Tara)', value: formatKg(specs.tareWeight), group: 'gewicht' });
  }
  if (specs.payload !== undefined) {
    rows.push({ label: 'Max. Zuladung', value: formatKg(specs.payload), group: 'gewicht' });
  }
  if (specs.maxGross !== undefined) {
    rows.push({ label: 'Max. Bruttogewicht', value: formatKg(specs.maxGross), group: 'gewicht' });
  }

  rows.push({ label: 'Wandmaterial', value: specs.material, group: 'aufbau' });
  if (specs.flooring) {
    rows.push({ label: 'Bodenbelag', value: specs.flooring, group: 'aufbau' });
  }
  if (specs.ral) {
    rows.push({ label: 'Farbton', value: specs.ral, group: 'aufbau' });
  }

  if (specs.isoCode) {
    rows.push({ label: 'ISO-Baugrößencode', value: specs.isoCode, group: 'zertifizierung' });
  }
  rows.push({
    label: 'CSC-Plakette',
    value: specs.csc ? 'Vorhanden, gültig nach CSC-Übereinkommen' : 'Nicht vorhanden',
    group: 'zertifizierung',
  });
  rows.push({
    label: 'Wind- und wasserdicht',
    value: specs.wwt ? 'Ja, im Lichttest geprüft' : 'Nein',
    group: 'zertifizierung',
  });
  rows.push({
    label: 'Norm',
    value: 'ISO 668 (Baugrößen), ISO 6346 (Kennzeichnung), ISO 1496-1 (Prüfung)',
    group: 'zertifizierung',
  });

  return [...rows, ...extra];
}

/** Wiederverwendbare Maßsätze nach ISO 668. */
export const dimensionPresets = {
  '10ft': {
    exterior: { length: 2991, width: 2438, height: 2591 },
    interior: { length: 2831, width: 2352, height: 2393 },
    doorOpening: { length: 0, width: 2340, height: 2280 },
    volume: 16.0,
    tareWeight: 1300,
    payload: 9000,
    maxGross: 10300,
    isoCode: '10G1',
  },
  '10ft-hc': {
    exterior: { length: 2991, width: 2438, height: 2896 },
    interior: { length: 2831, width: 2352, height: 2698 },
    doorOpening: { length: 0, width: 2340, height: 2585 },
    volume: 17.9,
    tareWeight: 1400,
    payload: 8900,
    maxGross: 10300,
    isoCode: '10G5',
  },
  '20ft': {
    exterior: { length: 6058, width: 2438, height: 2591 },
    interior: { length: 5898, width: 2352, height: 2393 },
    doorOpening: { length: 0, width: 2340, height: 2280 },
    volume: 33.2,
    tareWeight: 2250,
    payload: 28230,
    maxGross: 30480,
    isoCode: '22G1',
  },
  '20ft-hc': {
    exterior: { length: 6058, width: 2438, height: 2896 },
    interior: { length: 5898, width: 2352, height: 2698 },
    doorOpening: { length: 0, width: 2340, height: 2585 },
    volume: 37.4,
    tareWeight: 2400,
    payload: 28080,
    maxGross: 30480,
    isoCode: '25G1',
  },
  '40ft': {
    exterior: { length: 12192, width: 2438, height: 2591 },
    interior: { length: 12032, width: 2352, height: 2393 },
    doorOpening: { length: 0, width: 2340, height: 2280 },
    volume: 67.7,
    tareWeight: 3750,
    payload: 26730,
    maxGross: 30480,
    isoCode: '42G1',
  },
  '40ft-hc': {
    exterior: { length: 12192, width: 2438, height: 2896 },
    interior: { length: 12032, width: 2352, height: 2698 },
    doorOpening: { length: 0, width: 2340, height: 2585 },
    volume: 76.3,
    tareWeight: 3940,
    payload: 26540,
    maxGross: 30480,
    isoCode: '45G1',
  },
  '45ft-hc': {
    exterior: { length: 13716, width: 2438, height: 2896 },
    interior: { length: 13556, width: 2352, height: 2698 },
    doorOpening: { length: 0, width: 2340, height: 2585 },
    volume: 86.0,
    tareWeight: 4800,
    payload: 27700,
    maxGross: 32500,
    isoCode: 'L5G1',
  },
  '20ft-reefer': {
    exterior: { length: 6058, width: 2438, height: 2591 },
    interior: { length: 5449, width: 2294, height: 2244 },
    doorOpening: { length: 0, width: 2290, height: 2210 },
    volume: 28.3,
    tareWeight: 3000,
    payload: 27480,
    maxGross: 30480,
    isoCode: '22R1',
  },
  '40ft-hc-reefer': {
    exterior: { length: 12192, width: 2438, height: 2896 },
    interior: { length: 11577, width: 2294, height: 2500 },
    doorOpening: { length: 0, width: 2290, height: 2460 },
    volume: 67.0,
    tareWeight: 4800,
    payload: 29200,
    maxGross: 34000,
    isoCode: '45R1',
  },
} as const;

export type DimensionPreset = keyof typeof dimensionPresets;

/** Standardmaterialien nach Zustand. */
export const materials = {
  corten: 'Corten-Stahl (wetterfester Baustahl), 2 mm Wellblech',
  cortenNew: 'Corten-Stahl (wetterfester Baustahl), 2 mm Wellblech, werksseitig grundiert',
  reefer: 'PU-Sandwichpaneel, 100 mm gedämmt, Innenauskleidung Edelstahl',
} as const;

export const floorings = {
  plywood: '28 mm Sperrholz, Hartholz-Mehrschichtplatte, verschraubt',
  plywoodNew: '28 mm Sperrholz, unbenutzt, IPPC-behandelt',
  aluminium: 'T-Profil-Aluminiumrost für Kaltluftzirkulation',
  vinyl: 'Trittschallgedämmter Vinylbelag auf Ausgleichsschicht',
} as const;

/** Erzeugt einen vollständigen ContainerSpecs-Satz aus einem Preset. */
export function specsFrom(
  preset: DimensionPreset,
  overrides: Partial<ContainerSpecs> & Pick<ContainerSpecs, 'material'>,
): ContainerSpecs {
  const base = dimensionPresets[preset];
  const doorOpening = base.doorOpening;
  return {
    isoCode: base.isoCode,
    exterior: { ...base.exterior },
    interior: { ...base.interior },
    doorOpening: { ...doorOpening },
    volume: base.volume,
    tareWeight: base.tareWeight,
    payload: base.payload,
    maxGross: base.maxGross,
    csc: true,
    wwt: true,
    ...overrides,
  };
}
