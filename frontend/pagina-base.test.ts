/* ============================================================
   pagina-base.test.ts — il guscio della pagina: public/index.html, il CSS
   di partenza, package.json, craco.

   IL DIFETTO CHE PRESIDIA, misurato il 3 settembre 2026 con Lighthouse da
   telefono (prestazioni 43/100, primo disegno a 4,7 s): la home caricava
   uno script della piattaforma con cui era stata costruita (emergent.sh),
   un tracciante PostHog con registrazione della sessione acceso prima di
   qualunque consenso, e chiedeva i caratteri a Google dentro il CSS con un
   @import — tre viaggi in fila prima di disegnare una riga.

   Questa prova legge i file veri: se qualcuno rimette uno di quei pezzi,
   diventa rossa qui invece che lenta in produzione.

   Si lancia con:  deno test frontend/pagina-base.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const leggi = (p: string): string => Deno.readTextFileSync(new URL(p, import.meta.url));
const HTML = leggi('./public/index.html');
const CSS = leggi('./src/index.css');
const PKG = leggi('./package.json');
const CRACO = leggi('./craco.config.js');

/* il commento in index.html cita emergent e PostHog per spiegare perche'
   non ci sono piu': qui si guarda solo cosa viene ESEGUITO o SCARICATO */
const senzaCommenti = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '');

Deno.test('nessuno script di terzi: ne emergent.sh ne PostHog', () => {
  const vivo = senzaCommenti(HTML);
  assert(!/emergent\.sh/i.test(vivo), 'uno script emergent.sh e tornato nella pagina');
  assert(!/posthog/i.test(vivo), 'PostHog e tornato nella pagina');
  assert(!/PerformanceServerTiming/.test(vivo), 'e tornato il rattoppo di errore della piattaforma');
  /* l'unico script esterno ammesso e' quello del pacchetto nostro,
     che la costruzione inserisce da sola */
  const esterni = [...vivo.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  assertEquals(esterni, [], `script esterni nel guscio: ${esterni.join(', ')}`);
});

Deno.test('i caratteri si chiedono dalla testa della pagina, una volta, con display=swap', () => {
  const vivo = senzaCommenti(HTML);
  const fogli = [...vivo.matchAll(/<link[^>]+href=["'](https:\/\/fonts\.googleapis\.com[^"']+)["'][^>]*>/gi)]
    .map((m) => m[1]);
  assertEquals(fogli.length, 1, `un solo foglio da Google Fonts, trovati ${fogli.length}`);
  const [url] = fogli;
  assert(/Cormorant\+Garamond/.test(url), 'manca il Cormorant dei titoli');
  assert(/Manrope/.test(url), 'manca il Manrope del testo');
  assert(/display=swap/.test(url), 'senza display=swap il testo resta invisibile finche il carattere non arriva');
  assert(!/Inter/.test(url), 'Inter non e usato da nessuna parte: non va scaricato');
  assert(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin/.test(vivo),
    'manca il preconnect a fonts.gstatic.com, da dove arrivano i file dei caratteri');
});

Deno.test('il CSS non chiede piu i caratteri con @import', () => {
  assert(!/@import\s+url\(/.test(CSS), 'un @import nel CSS fa scoprire i caratteri troppo tardi');
});

Deno.test('nessun pacchetto della piattaforma fra le dipendenze', () => {
  const pkg = JSON.parse(PKG) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };
  const tutte = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
  for (const [nome, versione] of Object.entries(tutte)) {
    assert(!/emergent/i.test(nome) && !/emergent/i.test(versione),
      `${nome} viene ancora da emergent.sh`);
  }
  assert(!/visual-edits/.test(CRACO), 'craco carica ancora l editor visuale della piattaforma');
});
