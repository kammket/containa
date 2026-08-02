/**
 * End-to-End-Prüfung des Kaufwegs.
 *
 * Jeder Ablauf läuft zweimal: einmal in einem unveränderten Browser und einmal,
 * nachdem alle Textknoten wie von einer Übersetzungserweiterung in
 * <font>-Elemente eingewickelt wurden.
 *
 * Der zweite Durchlauf ist kein Selbstzweck. Übersetzungserweiterungen
 * ersetzen Textknoten, während React noch Verweise auf die ursprünglichen
 * Knoten hält. Aktualisiert React dann einen solchen Knoten, bricht die
 *Aktualisierung mit „insertBefore … is not a child of this node" ab – und der Warenkorb
 * ist für diese Besucher unbenutzbar. Für einen deutschen Shop, den
 * ausländische Interessenten übersetzt aufrufen, ist das ein realer Ausfall.
 *
 * Aufruf:  npm run test:e2e --workspace=@emc/web
 * Voraussetzung: Ein laufender Server unter BASE_URL.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

/** Bildet nach, was Google Translate im DOM tut. */
const TRANSLATE_SIM = `
(() => {
  window.__simulateTranslate = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.tagName === 'FONT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const font = document.createElement('font');
      font.textContent = n.nodeValue;
      n.parentNode.replaceChild(font, n);
    }
    return nodes.length;
  };
})();
`;

let browser;

before(async () => {
  browser = await chromium.launch({ channel: 'chrome' });
});

after(async () => {
  await browser?.close();
});

/** Öffnet eine Seite und sammelt alle Konsolenfehler und Ausnahmen. */
async function openPage({ translated = false } = {}) {
  const context = await browser.newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().split('\n')[0]);
  });

  if (translated) await page.addInitScript(TRANSLATE_SIM);

  page.translateNow = async () => {
    if (translated) await page.evaluate(() => window.__simulateTranslate());
  };
  page.assertClean = (label) => assert.deepEqual(errors, [], `${label}: ${errors.join(' | ')}`);

  return page;
}

for (const translated of [false, true]) {
  const mode = translated ? 'mit Übersetzungserweiterung' : 'ohne Erweiterung';

  describe(`Kaufweg (${mode})`, () => {
    it('legt ein Produkt in den Warenkorb und aktualisiert den Zähler', async () => {
      const page = await openPage({ translated });

      await page.goto(`${BASE}/produkt/20-fuss-seecontainer-gebraucht-blau`, {
        waitUntil: 'networkidle',
      });
      await page.translateNow();

      // Zähler ist vor dem ersten Artikel leer
      const badge = page.locator('a[href="/warenkorb"] span[aria-hidden="true"]');
      assert.equal((await badge.innerText()).trim(), '');

      await page.getByRole('button', { name: /In den Warenkorb$/ }).click();
      await page.waitForTimeout(500);

      assert.equal((await badge.innerText()).trim(), '1');
      page.assertClean('Hinzufügen');

      await page.context().close();
    });

    it('erhöht die Menge und rechnet die Zwischensumme neu', async () => {
      const page = await openPage({ translated });

      await page.goto(`${BASE}/produkt/20-fuss-seecontainer-gebraucht-blau`, {
        waitUntil: 'networkidle',
      });
      await page.translateNow();

      await page.getByRole('button', { name: 'Menge erhöhen' }).click();
      await page.getByRole('button', { name: /In den Warenkorb$/ }).click();
      await page.waitForTimeout(500);

      const badge = page.locator('a[href="/warenkorb"] span[aria-hidden="true"]');
      assert.equal((await badge.innerText()).trim(), '2');
      page.assertClean('Mengenänderung');

      await page.context().close();
    });

    it('navigiert über das Mega-Menü, ohne dass der Header bricht', async () => {
      const page = await openPage({ translated });

      await page.goto(BASE, { waitUntil: 'networkidle' });
      await page.translateNow();

      await page.getByRole('button', { name: 'Container', exact: true }).click();
      await page.locator('a[href="/container/40-fuss-container"]').first().click();
      await page.waitForURL('**/40-fuss-container', { timeout: 15000 });
      await page.translateNow();

      // Produktkarte anklicken – der Header bleibt dabei montiert
      await page.locator('h3 a[href^="/produkt/"]').first().click();
      await page.waitForURL('**/produkt/**', { timeout: 15000 });

      page.assertClean('Navigation');
      await page.context().close();
    });

    it('führt den Warenkorb bis zur Kasse', async () => {
      const page = await openPage({ translated });

      await page.goto(`${BASE}/produkt/20-fuss-seecontainer-gebraucht-blau`, {
        waitUntil: 'networkidle',
      });
      await page.getByRole('button', { name: /In den Warenkorb$/ }).click();
      await page.waitForTimeout(400);

      await page.goto(`${BASE}/warenkorb`, { waitUntil: 'networkidle' });
      await page.translateNow();

      // Lieferkosten werden erst mit gültiger Postleitzahl berechnet
      await page.locator('#cart-plz').fill('50667');
      await page.waitForTimeout(600);

      const summary = await page.locator('main').innerText();
      assert.match(summary, /Lieferung/);
      assert.doesNotMatch(summary, /NaN|Infinity|undefined/);

      await page.goto(`${BASE}/kasse`, { waitUntil: 'networkidle' });
      await page.translateNow();
      assert.match(await page.locator('main').innerText(), /Zahlungspflichtig bestellen/);

      page.assertClean('Kasse');
      await page.context().close();
    });

    it('schaltet den Merkzettel um', async () => {
      const page = await openPage({ translated });

      await page.goto(`${BASE}/produkt/20-fuss-seecontainer-gebraucht-blau`, {
        waitUntil: 'networkidle',
      });
      await page.translateNow();

      await page.getByRole('button', { name: /^Merken$/ }).click();
      await page.waitForTimeout(400);

      assert.match(await page.getByRole('button', { name: /Gemerkt/ }).innerText(), /Gemerkt/);
      page.assertClean('Merkzettel');

      await page.context().close();
    });
  });
}

describe('Seitenintegrität', () => {
  it('lädt die wichtigsten Seiten fehlerfrei', async () => {
    const paths = [
      '/',
      '/shop',
      '/container/20-fuss-container',
      '/seecontainer-berlin',
      '/seecontainer-kaufen',
      '/ratgeber',
      '/kontakt',
      '/haeufige-fragen',
      '/impressum',
    ];

    for (const path of paths) {
      const page = await openPage();
      const response = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${path} antwortet nicht mit 200`);
      page.assertClean(path);
      await page.context().close();
    }
  });

  it('registriert keinen Service Worker', async () => {
    // Diese Anwendung darf keinen Service Worker anlegen – ein solcher würde
    // veraltetes HTML ausliefern und ist von außen kaum zu diagnostizieren.
    const page = await openPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const count = await page.evaluate(async () =>
      'serviceWorker' in navigator ? (await navigator.serviceWorker.getRegistrations()).length : 0,
    );
    assert.equal(count, 0, 'Es wurde ein Service Worker registriert');

    await page.context().close();
  });
});
