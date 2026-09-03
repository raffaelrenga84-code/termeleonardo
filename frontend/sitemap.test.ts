/* ============================================================
   sitemap.test.ts — la mappa del sito dice il vero: solo pagine che
   esistono, tutte quelle che meritano, ognuna con le sue traduzioni.

   IL DIFETTO CHE PRESIDIA, trovato il 3 settembre 2026: la sitemap
   dichiarava tre indirizzi. Prenota c'era solo in italiano, il transfer
   non c'era, la home tedesca, inglese e francese nemmeno: dodici pagine
   su sedici invisibili a chi le avrebbe cercate nella sua lingua.

   E il difetto opposto, che questa prova impedisce di reintrodurre: i
   moduli di richiesta (trattamenti, green fee, maestro, day spa) sono una
   pagina sola con lo stesso titolo per sedici indirizzi e dichiarano
   noindex — elencarli farebbe apparire sedici risultati identici.

   Si lancia con:  deno test frontend/sitemap.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const leggi = (p: string): string => Deno.readTextFileSync(new URL(p, import.meta.url));
const XML = leggi('./public/sitemap.xml');
const ROBOTS = leggi('./public/robots.txt');
const VERCEL = JSON.parse(leggi('./vercel.json')) as { rewrites: { source: string; destination: string }[] };
const DOMINIO = 'https://www.hoteltermeleonardo.com';

type Url = { loc: string; alternate: Record<string, string> };

function urls(): Url[] {
  const senzaCommenti = XML.replace(/<!--[\s\S]*?-->/g, '');
  const out: Url[] = [];
  for (const m of senzaCommenti.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) ?? [])[1];
    assert(loc, 'un <url> senza <loc>');
    const alternate: Record<string, string> = {};
    for (const a of m[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) alternate[a[1]] = a[2];
    out.push({ loc, alternate });
  }
  return out;
}

const percorso = (u: string) => new URL(u).pathname;
const RISCRITTE = new Set(VERCEL.rewrites.map((r) => r.source));

Deno.test('la sitemap ha le sedici pagine: home, buoni, Prenota, transfer, per quattro lingue', () => {
  const tutte = urls();
  assertEquals(tutte.length, 16);
  const loc = new Set(tutte.map((u) => u.loc));
  for (const l of [`${DOMINIO}/`, `${DOMINIO}/?lang=de`, `${DOMINIO}/it/prenota`, `${DOMINIO}/de/buchen`,
    `${DOMINIO}/en/book`, `${DOMINIO}/fr/reserver`, `${DOMINIO}/it/transfer`, `${DOMINIO}/fr/transfert`,
    `${DOMINIO}/it/buoni-regalo`, `${DOMINIO}/de/gutscheine`]) {
    assert(loc.has(l), `manca ${l}`);
  }
  assertEquals(loc.size, tutte.length, 'indirizzi ripetuti');
});

Deno.test('ogni indirizzo esiste davvero: e la home, o una riscrittura di vercel.json', () => {
  for (const u of urls()) {
    const p = percorso(u.loc);
    assert(u.loc.startsWith(DOMINIO), `${u.loc} non sta sul dominio dell hotel`);
    assert(p === '/' || RISCRITTE.has(p), `${p} non e servito da nessuna riscrittura: risponderebbe con la home`);
  }
});

Deno.test('ogni pagina dichiara le sue quattro lingue, e ognuna delle quattro sta nella sitemap', () => {
  const tutte = urls();
  const loc = new Set(tutte.map((u) => u.loc));
  for (const u of tutte) {
    for (const l of ['it', 'de', 'en', 'fr']) {
      const alt = u.alternate[l];
      assert(alt, `${u.loc}: manca hreflang ${l}`);
      /* la home italiana e' "/" nella sitemap e "/?lang=it" come alternate:
         due nomi della stessa pagina */
      const nome = alt === `${DOMINIO}/?lang=it` ? `${DOMINIO}/` : alt;
      assert(loc.has(nome), `${u.loc}: l alternate ${alt} non e nella sitemap, e Google ignora gli hreflang non reciproci`);
    }
    /* e la lingua della pagina stessa punta a se stessa */
    const propria = Object.values(u.alternate).some((a) => a === u.loc || (u.loc === `${DOMINIO}/` && a === `${DOMINIO}/?lang=it`));
    assert(propria, `${u.loc} non compare fra i propri alternate`);
  }
});

Deno.test('niente moduli di richiesta, niente back office: le pagine nascoste restano nascoste', () => {
  const vietati = [/\/richieste\//, /\/gestione\//, /\/buoni\/stampa/, /\/comune\//,
    /\/(it|de|en|fr)\/(trattamenti|behandlungen|treatments|soins|green-?fee|maestro-di-golf|golflehrer|golf-pro|pro-de-golf|day-spa)$/];
  for (const u of urls()) {
    const p = percorso(u.loc);
    for (const v of vietati) assert(!v.test(p), `${p} e in sitemap ma e una pagina nascosta o un modulo senza titolo suo`);
  }
  /* e quello che robots.txt vieta non ci deve essere, per definizione */
  for (const riga of ROBOTS.matchAll(/^Disallow:\s*(\S+)/gm)) {
    for (const u of urls()) assert(!percorso(u.loc).startsWith(riga[1]), `${u.loc} e vietata da robots.txt`);
  }
});

Deno.test('robots.txt dichiara questa sitemap', () => {
  assert(/^Sitemap:\s*https:\/\/www\.hoteltermeleonardo\.com\/sitemap\.xml/m.test(ROBOTS));
});
