/* ============================================================
   javascript.test.ts — il pacchetto contiene solo cio' che la pagina usa.

   IL DIFETTO CHE PRESIDIA, misurato il 3 settembre 2026: 517 KB di
   JavaScript da scaricare ed eseguire prima di vedere qualcosa (3,3 s di
   avvio su un telefono medio). Dentro: framer-motion (110 KB) per due
   dissolvenze, react-query (25 KB) attorno a un'app che non lo chiamava
   mai, e in package.json altre trenta librerie — grafici, router,
   validatori, un intero kit di componenti — che nessun file importava ma
   che Vercel installava a ogni costruzione.

   La regola qui e' in due direzioni: ogni import ha la sua dipendenza
   dichiarata, e ogni dipendenza dichiarata e' importata da qualcuno. Una
   libreria aggiunta «per dopo» resta rossa finche' qualcuno non la usa.

   Si lancia con:  deno test frontend/javascript.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const qui = (p: string) => new URL(p, import.meta.url);
const leggi = (p: string): string => Deno.readTextFileSync(qui(p));

/* tutti i file di codice sotto src/, ricorsivamente */
function sorgenti(dir = './src'): string[] {
  const out: string[] = [];
  for (const e of Deno.readDirSync(qui(dir))) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory) out.push(...sorgenti(p));
    else if (/\.(js|jsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

/* il nome del pacchetto da uno specificatore: "react-dom/client" -> react-dom,
   "@x/y/z" -> @x/y; percorsi relativi, alias @/ e CSS non sono pacchetti */
function pacchetto(spec: string): string | null {
  if (spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('@/')) return null;
  if (/\.css$/.test(spec)) return null;
  const parti = spec.split('/');
  return spec.startsWith('@') ? `${parti[0]}/${parti[1]}` : parti[0];
}

function importati(): Map<string, string[]> {
  const usi = new Map<string, string[]>();
  for (const f of sorgenti()) {
    const s = leggi(f);
    for (const m of s.matchAll(/(?:import\s[^'"]*?from\s*|import\s*\(\s*|import\s+)['"]([^'"]+)['"]/g)) {
      const p = pacchetto(m[1]);
      if (!p) continue;
      usi.set(p, [...(usi.get(p) ?? []), f]);
    }
  }
  return usi;
}

const pkg = JSON.parse(leggi('./package.json')) as {
  dependencies: Record<string, string>; devDependencies: Record<string, string>;
};

/* dipendenze che nessun file importa ma che servono lo stesso: la catena
   di costruzione, i plugin di lint che craco.config.js nomina per testo */
const STRUMENTI = new Set([
  'react-scripts', '@craco/craco', 'tailwindcss', 'postcss', 'autoprefixer', 'dotenv',
  'eslint', 'eslint-plugin-react-hooks', 'eslint-plugin-react', 'eslint-plugin-import',
  'eslint-plugin-jsx-a11y', '@eslint/js', 'globals', '@babel/plugin-proposal-private-property-in-object',
]);

Deno.test('ci sono dei sorgenti e degli import: altrimenti le prove sotto girano a vuoto', () => {
  assert(sorgenti().length >= 20, 'pochi file sotto src/');
  assert(importati().size >= 4, 'pochi pacchetti importati');
});

Deno.test('ogni pacchetto importato e dichiarato in package.json', () => {
  const dichiarate = new Set([...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]);
  const mancanti: string[] = [];
  for (const [p, dove] of importati()) if (!dichiarate.has(p)) mancanti.push(`${p} (da ${dove[0]})`);
  assertEquals(mancanti, [], 'import senza dipendenza: la costruzione fallirebbe su Vercel');
});

Deno.test('ogni dipendenza dichiarata e importata da qualcuno, o e uno strumento di costruzione', () => {
  const usate = importati();
  const morte: string[] = [];
  for (const p of [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]) {
    if (!usate.has(p) && !STRUMENTI.has(p)) morte.push(p);
  }
  assertEquals(morte, [], 'dipendenze che nessun file importa: Vercel le installa per niente');
});

Deno.test('le librerie tolte il 3 settembre 2026 non tornano', () => {
  const usate = importati();
  for (const p of ['framer-motion', '@tanstack/react-query', 'recharts', 'axios', 'react-router-dom', 'lodash']) {
    assert(!usate.has(p), `${p} e tornato: ${(usate.get(p) ?? []).join(', ')}`);
    assert(!pkg.dependencies[p], `${p} e tornato in package.json`);
  }
});

Deno.test('la dissolvenza allo scorrimento e in CSS, con rispetto per chi vuole meno movimento', () => {
  const reveal = leggi('./src/components/site/Reveal.jsx');
  assert(/IntersectionObserver/.test(reveal), 'Reveal non usa IntersectionObserver');
  assert(/"IntersectionObserver" in window/.test(reveal), 'senza IntersectionObserver il blocco deve comparire subito');
  const css = leggi('./src/index.css');
  assert(/\.reveal\s*\{/.test(css) && /\.reveal-visto\s*\{/.test(css), 'mancano le regole .reveal');
  const ridotto = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\.reveal[^}]*\}/);
  assert(ridotto, 'con prefers-reduced-motion il blocco deve essere visibile e fermo');
  assert(/hero-foto/.test(css) && /hero-testo/.test(css), 'mancano le animazioni della prima schermata');
});

Deno.test('la chat arriva in un file a parte', () => {
  const app = leggi('./src/App.js');
  assert(/lazy\(\(\) => import\("@\/components\/site\/ChatWidget"\)\)/.test(app), 'ChatWidget non e caricato con lazy()');
  assert(/<Suspense fallback=\{null\}>\s*<ChatWidget \/>\s*<\/Suspense>/.test(app), 'ChatWidget non sta dentro un Suspense');
});

Deno.test('le cartelle del kit di componenti mai importato sono sparite', () => {
  for (const d of ['./src/components/ui', './src/hooks', './src/lib', './src/constants']) {
    let c = false;
    try { c = Deno.statSync(qui(d)).isDirectory; } catch { /* non esiste: bene */ }
    assert(!c, `${d} esiste ancora`);
  }
});
