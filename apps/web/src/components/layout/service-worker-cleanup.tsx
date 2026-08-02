/**
 * Entfernt fremde Service Worker von dieser Domain.
 *
 * Diese Anwendung registriert bewusst keinen Service Worker. Ist dennoch einer
 * aktiv – etwa aus einem früheren Projekt unter derselben Adresse oder aus
 * einer versehentlich ausgelieferten Vorgängerversion –, liegt er zwischen
 * Netzwerk und Seite und liefert veraltetes HTML und JavaScript aus. Der
 * Fehler äußert sich dann als Hydration-Mismatch oder als abgebrochene
 * DOM-Aktualisierung und ist von außen kaum zu diagnostizieren, weil der
 * Server längst korrekten Code ausliefert.
 *
 * Das Skript läuft vor React, prüft in wenigen Millisekunden und tut in aller
 * Regel nichts. Findet es eine Registrierung, meldet es sie ab, leert die
 * zugehörigen Caches und lädt die Seite genau einmal neu. Die Sperre in
 * sessionStorage verhindert eine Schleife, falls die Abmeldung scheitert.
 */
const CLEANUP_SCRIPT = `
(function () {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations().then(function (regs) {
    if (!regs.length) return;
    Promise.all(regs.map(function (r) { return r.unregister(); }))
      .then(function () {
        return typeof caches !== 'undefined'
          ? caches.keys().then(function (keys) {
              return Promise.all(keys.map(function (k) { return caches.delete(k); }));
            })
          : null;
      })
      .then(function () {
        if (sessionStorage.getItem('emc.sw.cleaned')) return;
        sessionStorage.setItem('emc.sw.cleaned', '1');
        location.reload();
      })
      .catch(function () {});
  }).catch(function () {});
})();
`;

export function ServiceWorkerCleanup() {
  return (
    <script
      // Statischer, im Quelltext festgelegter Code – keine Nutzereingabe.
      dangerouslySetInnerHTML={{ __html: CLEANUP_SCRIPT }}
    />
  );
}
