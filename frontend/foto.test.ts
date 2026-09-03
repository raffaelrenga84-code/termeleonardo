/* ============================================================
   foto.test.ts — le fotografie del sito stanno in casa, in tre misure,
   e ogni posto che le mostra dice quanto saranno larghe.

   IL DIFETTO CHE PRESIDIA, misurato il 3 settembre 2026: la home prendeva
   le foto dal sito precedente (termeleonardo.com/img), JPEG da 300-400 KB
   serviti uguali al telefono e al computer, 3,5 MB risparmiabili secondo
   Lighthouse, e la foto a tutto schermo era larga 650 px.

   Queste prove leggono i file veri: src/foto.js (generato), public/foto/,
   i componenti, public/index.html e vercel.json. Se una foto dichiarata
   non esiste, se torna un <img src> nudo, se il preload della prima foto
   non coincide con quella che il componente mostra davvero, diventa rosso
   qui invece che lento in produzione.

   Si lancia con:  deno test frontend/foto.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const qui = (p: string) => new URL(p, import.meta.url);
const leggi = (p: string): string => Deno.readTextFileSync(qui(p));

type Voce = { src: string; srcset: string; width: number; height: number };

/* src/foto.js e' un modulo ES con una sola export: si legge come testo e
   si ricavano le voci, senza eseguirlo */
function voci(): Record<string, Voce> {
  const s = leggi('./src/foto.js');
  const out: Record<string, Voce> = {};
  for (const m of s.matchAll(
    /(\w+): \{\s*src: "([^"]+)",\s*srcset:\s*"([^"]+)",\s*width: (\d+),\s*height: (\d+),/g,
  )) {
    out[m[1]] = { src: m[2], srcset: m[3], width: Number(m[4]), height: Number(m[5]) };
  }
  return out;
}

const esiste = (percorso: string): boolean => {
  try { return Deno.statSync(qui('./public' + percorso)).isFile; } catch { return false; }
};

Deno.test('il modulo generato ha delle voci, e ogni file che nomina esiste davvero', () => {
  const v = voci();
  assert(Object.keys(v).length >= 15, `poche voci: ${Object.keys(v).length}`);
  for (const [k, f] of Object.entries(v)) {
    assert(f.width > 0 && f.height > 0, `${k} senza misure`);
    assert(esiste(f.src), `${k}: manca ${f.src}`);
    const candidati = f.srcset.split(',').map((x) => x.trim().split(' '));
    assert(candidati.length >= 1, `${k}: srcset vuoto`);
    for (const [url, w] of candidati) {
      assert(esiste(url), `${k}: manca ${url}`);
      assert(/^\d+w$/.test(w), `${k}: descrittore non valido «${w}»`);
      assert(/\.[0-9a-f]{8}\.\d+\.webp$/.test(url), `${k}: ${url} non porta l'impronta nel nome`);
    }
    assert(candidati.some(([url]) => url === f.src), `${k}: src non e uno dei candidati di srcset`);
  }
});

Deno.test('nessun file orfano in public/foto: tutto cio che c e viene da src/foto.js', () => {
  const nominati = new Set<string>();
  for (const f of Object.values(voci())) {
    for (const [url] of f.srcset.split(',').map((x) => x.trim().split(' '))) nominati.add(url.replace('/foto/', ''));
  }
  const orfani = [...Deno.readDirSync(qui('./public/foto'))].map((e) => e.name).filter((n) => !nominati.has(n));
  assertEquals(orfani, [], 'file in public/foto che nessuna voce usa: strumenti/foto.js li avrebbe tolti');
});

Deno.test('il peso complessivo resta sotto i 3,5 MB: una foto sola pesa quanto ne pesavano dieci', () => {
  let tot = 0;
  for (const e of Deno.readDirSync(qui('./public/foto'))) tot += Deno.statSync(qui('./public/foto/' + e.name)).size;
  assert(tot < 3.5 * 1024 * 1024, `public/foto pesa ${(tot / 1024 / 1024).toFixed(2)} MB`);
});

/* i commenti raccontano da dove venivano le foto: si guarda solo il codice */
const codice = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

Deno.test('nessuna fotografia viene piu presa dal sito precedente', () => {
  for (const e of Deno.readDirSync(qui('./src'))) {
    if (!e.isFile) continue;
    const s = codice(leggi('./src/' + e.name));
    assert(!/termeleonardo\.com\/img/.test(s), `src/${e.name} prende ancora foto da termeleonardo.com/img`);
  }
  for (const e of Deno.readDirSync(qui('./src/components/site'))) {
    const s = codice(leggi('./src/components/site/' + e.name));
    assert(!/termeleonardo\.com\/img/.test(s), `${e.name} prende ancora foto da termeleonardo.com/img`);
  }
});

Deno.test('nei componenti l unico <img> nudo e il marchio nella barra: le foto passano da <Foto>', () => {
  const nudi: string[] = [];
  for (const e of Deno.readDirSync(qui('./src/components/site'))) {
    if (e.name === 'Foto.jsx') continue;
    const s = leggi('./src/components/site/' + e.name);
    for (const m of s.matchAll(/<img\b[^>]*>/gs)) {
      if (!/\/logo(-bianco)?\.svg/.test(m[0])) nudi.push(`${e.name}: ${m[0].slice(0, 60)}`);
    }
  }
  assertEquals(nudi, [], 'un <img src> nudo non ha srcset ne misure ne caricamento pigro');
});

Deno.test('ogni <Foto> dice quanto sara larga (sizes), altrimenti il browser scarica la misura piu grande', () => {
  const senza: string[] = [];
  for (const e of Deno.readDirSync(qui('./src/components/site'))) {
    if (e.name === 'Foto.jsx') continue;
    const s = leggi('./src/components/site/' + e.name);
    for (const m of s.matchAll(/<Foto\b[^>]*?\/>/gs)) {
      if (!/\bsizes=/.test(m[0])) senza.push(`${e.name}: ${m[0].slice(0, 60)}`);
    }
  }
  assertEquals(senza, []);
});

Deno.test('una sola foto ha la priorita, ed e quella in cima alla pagina', () => {
  const conPriorita: string[] = [];
  for (const e of Deno.readDirSync(qui('./src/components/site'))) {
    const s = leggi('./src/components/site/' + e.name);
    if (e.name !== 'Foto.jsx' && /<Foto\b[^>]*\bpriorita\b/s.test(s)) conPriorita.push(e.name);
  }
  assertEquals(conPriorita, ['Hero.jsx']);
});

Deno.test('il preload in index.html e la foto che Hero mostra sono lo stesso file', () => {
  const html = leggi('./public/index.html');
  const pre = html.match(/<link rel="preload" as="image" href="([^"]+)" imagesrcset="([^"]+)" imagesizes="([^"]+)"/);
  assert(pre, 'manca il preload della prima foto');
  const dati = leggi('./src/data.js');
  const chiave = (dati.match(/heroPool: FOTO\.(\w+)/) ?? [])[1];
  assert(chiave, 'data.js non dice quale foto e heroPool');
  const v = voci()[chiave];
  assert(v, `la voce ${chiave} non esiste in src/foto.js`);
  assertEquals(pre[1], v.src, 'il preload punta a un file diverso da quello mostrato');
  assertEquals(pre[2], v.srcset);
  const hero = leggi('./src/components/site/Hero.jsx');
  const sizes = (hero.match(/<Foto\b[^>]*\bsizes="([^"]+)"[^>]*\bpriorita/s) ?? [])[1];
  assertEquals(pre[3], sizes, 'imagesizes del preload e sizes di Hero devono coincidere');
});

Deno.test('vercel.json tiene le foto in cache un anno: il nome porta l impronta, quindi non si puo servire quella vecchia', () => {
  const v = JSON.parse(leggi('./vercel.json')) as { headers?: { source: string; headers: { key: string; value: string }[] }[] };
  const regola = (v.headers ?? []).find((h) => h.source === '/foto/(.*)');
  assert(regola, 'manca la regola per /foto/');
  const cc = regola.headers.find((h) => h.key === 'Cache-Control');
  assert(cc && /immutable/.test(cc.value) && /max-age=31536000/.test(cc.value), `Cache-Control sbagliato: ${cc?.value}`);
});

Deno.test('la prima foto e larga almeno 1600 px: prima era 650 allargata a tutto schermo', () => {
  const dati = leggi('./src/data.js');
  const chiave = (dati.match(/heroPool: FOTO\.(\w+)/) ?? [])[1];
  assert(voci()[chiave].width >= 1600);
});
