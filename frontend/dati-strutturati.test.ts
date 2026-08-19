/* ============================================================
   dati-strutturati.test.ts — il blocco JSON-LD di public/index.html.

   PERCHE' ESISTE. Quel blocco e' JSON scritto a mano dentro un HTML: una
   virgola di troppo non rompe la pagina, non si vede da nessuna parte, e
   azzera in silenzio TUTTI i dati strutturati. Nessuno se ne accorge finche'
   qualcuno non va a chiedersi perche' la scheda su Google e' smagrita.
   Questa prova legge il file vero e prova a interpretarlo: se non e' JSON,
   diventa rossa qui invece che invisibile in produzione.

   COSA CI DEVE ESSERE, e perche', deciso il 19 agosto 2026 con la proprieta':
   il pubblico locale — chi cerca «day spa Abano» dal telefono — ha bisogno
   degli ORARI e dei collegamenti ai profili social, che sono le righe con cui
   Google capisce che il sito, la scheda Maps e le pagine social sono la
   stessa attivita'. Gli orari del Day Spa non sono quelli dell'hotel: sono
   di un servizio aperto anche a chi non soggiorna, e vanno su un'entita' sua.

   Si lancia con:  deno test frontend/dati-strutturati.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const HTML = Deno.readTextFileSync(new URL('./public/index.html', import.meta.url));

type Nodo = Record<string, unknown>;

function grafo(): Nodo[] {
  const trovati = [...HTML.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  )];
  assertEquals(trovati.length, 1, 'ci deve essere un blocco JSON-LD, e uno solo');
  const dato = JSON.parse(trovati[0][1]) as Nodo;
  const g = dato['@graph'];
  assert(Array.isArray(g), 'il blocco deve essere un @graph');
  return g as Nodo[];
}

const conTipo = (t: string): Nodo => {
  const n = grafo().find((x) => x['@type'] === t);
  assert(n, `manca il nodo ${t}`);
  return n as Nodo;
};

Deno.test('il blocco e JSON valido: e la ragione per cui questa prova esiste', () => {
  assert(grafo().length >= 2, 'servono almeno l hotel e il day spa');
});

Deno.test('l hotel dice dove sta, con indirizzo e coordinate', () => {
  const h = conTipo('Hotel');
  const a = h.address as Nodo;
  assertEquals(a.streetAddress, 'Via Monteortone 46');
  assertEquals(a.addressCountry, 'IT');
  assert(h.geo, 'senza coordinate la scheda non sa dove mettere il punto');
  assert(String(h.telephone ?? '').startsWith('+39'), 'il telefono va in forma internazionale');
});

/* sameAs e' la riga che dice a Google: il sito, la scheda su Maps e quelle
   pagine social sono la stessa attivita'. Senza, restano tre cose separate. */
Deno.test('l hotel dichiara i suoi profili, che e come si lega alla scheda Maps', () => {
  const s = conTipo('Hotel').sameAs as string[];
  assert(Array.isArray(s) && s.length >= 2, 'sameAs manca o e troppo corto');
  assert(s.some((u) => /facebook\.com/.test(u)), 'manca Facebook');
  assert(s.some((u) => /instagram\.com/.test(u)), 'manca Instagram');
  for (const u of s) assert(/^https:\/\//.test(u), `indirizzo non completo: ${u}`);
});

Deno.test('l hotel ha delle fotografie, e sono sue', () => {
  const i = conTipo('Hotel').image as string[];
  assert(Array.isArray(i) && i.length > 0, 'nessuna immagine');
  for (const u of i) {
    assert(/^https:\/\//.test(u), `indirizzo non completo: ${u}`);
    assert(
      /termeleonardo/.test(u),
      `${u} non sta su un nostro dominio: una foto presa altrove non e' l hotel`,
    );
  }
});

/* ============================================================
   IL DAY SPA E' UN'ALTRA COSA DALL'HOTEL.

   Gli orari dell'hotel sono quelli della reception; quelli che servono a chi
   cerca da fuori sono gli orari dell'INGRESSO GIORNALIERO, che e' un servizio
   aperto anche a chi non dorme qui. Metterli come orari dell'hotel direbbe
   una cosa falsa: che alle 18:31 l'albergo chiude.
   ============================================================ */
Deno.test('il Day Spa e un entita sua, dentro l hotel', () => {
  const d = conTipo('DaySpa');
  const dentro = d.containedInPlace as Nodo;
  assertEquals(dentro['@id'], conTipo('Hotel')['@id'], 'il Day Spa non e legato all hotel');
});

Deno.test('il Day Spa dichiara le due fasce che ha davvero', () => {
  const ore = conTipo('DaySpa').openingHoursSpecification as Nodo[];
  assert(Array.isArray(ore), 'nessun orario dichiarato');
  assertEquals(ore.length, 2, 'sono due: la giornata, e la serata di venerdi e sabato');

  const giorno = ore.find((o) => o.opens === '09:00');
  assert(giorno, 'manca la fascia 9:00-18:30');
  assertEquals(giorno.closes, '18:30');
  assertEquals((giorno.dayOfWeek as string[]).length, 7, 'la giornata vale tutti i giorni');

  const sera = ore.find((o) => o.opens === '18:00');
  assert(sera, 'manca la serata');
  assertEquals(sera.closes, '22:30');
  assertEquals(sera.dayOfWeek, ['Friday', 'Saturday'], 'la serata e solo venerdi e sabato');
});

Deno.test('il Bistrot dichiara l orario vero, non quello dei modelli email', () => {
  const b = conTipo('Restaurant');
  const ore = b.openingHoursSpecification as Nodo[];
  assert(Array.isArray(ore) && ore.length === 1, 'un orario solo');
  assertEquals(ore[0].opens, '10:00');
  assertEquals(ore[0].closes, '23:00');
});
