/**
 * Nacharbeit am CommonJS-Build.
 *
 * Zwei Dinge, die `tsc` hier nicht selbst erledigt:
 *
 * 1. Der Ordner braucht ein eigenes `package.json` mit `"type": "commonjs"`.
 *    Ohne diese Datei erbt er `"type": "module"` aus dem Paketmanifest, und
 *    Node lehnt die erzeugten `require`-Aufrufe ab.
 *
 * 2. Die Quellen importieren mit `.ts`-Endung, damit Node sie direkt per
 *    Type-Stripping ausführen kann. Beim JavaScript-Emit schreibt
 *    `rewriteRelativeImportExtensions` die Endungen auf `.js` um – beim
 *    Deklarations-Emit unter `moduleResolution: "Node"` jedoch nicht. Die
 *    `.d.ts`-Dateien verweisen dann auf `./types.ts`, was in dist/cjs nicht
 *    existiert. TypeScript findet daraufhin die ESM-Quelle und meldet im
 *    API-Projekt TS1479. Also hier korrigieren.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath statt URL.pathname: Letzteres liefert den Pfad prozentkodiert,
// ein Leerzeichen im Projektpfad würde als %20 im Dateinamen landen.
const OUT_DIR = fileURLToPath(new URL('../dist/cjs/', import.meta.url));

// Nur relative Spezifizierer – Paketnamen wie "node:fs" bleiben unberührt.
const TS_SPECIFIER = /(from\s+['"]|import\(['"]|require\(['"])(\.{1,2}\/[^'"]+)\.ts(['"])/g;

const declarations = (await readdir(OUT_DIR, { recursive: true })).filter((f) =>
  f.endsWith('.d.ts'),
);

let rewritten = 0;

for (const file of declarations) {
  const path = join(OUT_DIR, file);
  const source = await readFile(path, 'utf8');
  const result = source.replace(TS_SPECIFIER, '$1$2.js$3');

  if (result !== source) {
    await writeFile(path, result, 'utf8');
    rewritten += 1;
  }
}

await writeFile(join(OUT_DIR, 'package.json'), '{"type":"commonjs"}\n', 'utf8');

console.log(
  `CommonJS-Build abgeschlossen: ${declarations.length} Deklarationsdateien, ` +
    `${rewritten} davon mit korrigierten Endungen.`,
);
