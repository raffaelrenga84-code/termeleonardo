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
  assertEquals(a.streetAddress, 'Via Monteortone, 46');
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

/* ============================================================
   IL RISTORANTE DICHIARA QUANDO SI MANGIA, NON QUANDO E' APERTO IL BAR.

   Deciso dalla proprieta' il 19 agosto 2026, correggendo la prima stesura.
   Il Bistrot come locale sta aperto dalle 10:00 alle 23:00, ma la cucina
   serve il pranzo dalle 12:30 alle 14:30. Un `Restaurant` che dichiara
   10:00-23:00 dice a chi cerca «ristorante Abano» che alle nove di sera lo
   servono: quello si presenta e trova la cucina chiusa. Meglio dichiarare
   la fascia in cui la promessa e' vera.

   L'apertura del locale non si perde: resta scritta nella descrizione, che
   e' il posto dove una sfumatura si puo' spiegare invece che dichiarare.
   ============================================================ */
Deno.test('il ristorante dichiara l ora in cui si mangia', () => {
  const b = conTipo('Restaurant');
  const ore = b.openingHoursSpecification as Nodo[];
  assert(Array.isArray(ore) && ore.length === 1, 'un orario solo');
  assertEquals(ore[0].opens, '12:30');
  assertEquals(ore[0].closes, '14:30');
});

Deno.test('e l apertura del locale resta detta, ma a parole', () => {
  const d = String(conTipo('Restaurant').description ?? '');
  assert(/10:00/.test(d) && /23:00/.test(d), `la descrizione non dice quando apre: ${d}`);
  assert(/17:30/.test(d), `la descrizione non dice fino a quando ci sono gli spuntini: ${d}`);
});

/* ============================================================
   LE FOTOGRAFIE DELLA SCHEDA. Aggiunte il 21 agosto 2026.

   Tre difetti veri, trovati quel giorno guardando il blocco:

   · il nodo Restaurant non dichiarava NESSUNA fotografia, e la scheda del
     Bistrot usciva muta accanto a quelle dei locali vicini;
   · niente verificava che il file dichiarato esistesse. Queste immagini non
     le carica la pagina — le carica Googlebot: una che risponde 404 non si
     vede rotta da nessuna parte, viene scartata in silenzio;
   · la fotografia dell'hotel piu' grande era una sola, e la piscina stava a
     650px, sotto il minimo di 1200 che Google consiglia.
   ============================================================ */

/* le fotografie di TUTTI i nodi, non del solo hotel */
function fotografie(): { nodo: string; url: string }[] {
  const tutte: { nodo: string; url: string }[] = [];
  for (const n of grafo()) {
    for (const u of ([] as unknown[]).concat(n.image ?? [])) {
      tutte.push({ nodo: String(n['@type']), url: String(u) });
    }
  }
  return tutte;
}

Deno.test('anche il Bistrot e il Day Spa hanno la loro fotografia', () => {
  for (const tipo of ['Restaurant', 'DaySpa']) {
    const n = conTipo(tipo);
    const i = ([] as unknown[]).concat(n.image ?? []);
    assert(i.length > 0, `il nodo ${tipo} non dichiara nessuna fotografia`);
  }
});

Deno.test('ogni fotografia dichiarata e servita davvero', () => {
  /* o e' un file dentro public/, o la copre una riscrittura di vercel.json:
     una terza possibilita' non c'e' */
  const vercel = JSON.parse(
    Deno.readTextFileSync(new URL('./vercel.json', import.meta.url)),
  ) as { rewrites?: { source: string }[] };
  const riscritture = (vercel.rewrites ?? []).map((r) => r.source);

  const coperta = (percorso: string) =>
    riscritture.some((s) =>
      s.includes(':') ? percorso.startsWith(s.slice(0, s.indexOf(':'))) : percorso === s
    );

  const rotte: string[] = [];
  for (const { nodo, url } of fotografie()) {
    const percorso = new URL(url).pathname;
    if (coperta(percorso)) continue;
    let servita = false;
    try {
      servita = Deno.statSync(new URL('./public' + percorso, import.meta.url)).isFile;
    } catch { /* non esiste: resta false */ }
    if (!servita) rotte.push(`${nodo}: ${percorso}`);
  }
  assertEquals(
    rotte,
    [],
    "fotografie dichiarate che nessuno serve: ne' un file in public/, ne' una riscrittura",
  );
});

Deno.test('almeno una fotografia dell hotel supera i 1200px', () => {
  /* Google chiede il lato lungo sopra i 1200. La misura si legge dal file,
     non si indovina dal nome: un file rimpiazzato con uno piccolo passerebbe
     un controllo fatto sull'elenco. */
  const misura = (percorso: string): number => {
    const b = Deno.readFileSync(new URL('./public' + percorso, import.meta.url));
    /* il marcatore SOFn di un JPEG porta altezza e larghezza */
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const k = b[i + 1];
      if (k >= 0xc0 && k <= 0xcf && k !== 0xc4 && k !== 0xc8 && k !== 0xcc) {
        const alto = (b[i + 5] << 8) | b[i + 6];
        const largo = (b[i + 7] << 8) | b[i + 8];
        return Math.max(alto, largo);
      }
      i += 2 + ((b[i + 2] << 8) | b[i + 3]);
    }
    return 0;
  };

  const proprie = (conTipo('Hotel').image as string[])
    .map((u) => new URL(u).pathname)
    .filter((p) => p.startsWith('/img/'));
  assert(proprie.length > 0, 'nessuna fotografia servita da public/img');

  const grandi = proprie.filter((p) => misura(p) >= 1200);
  assert(
    grandi.length > 0,
    `nessuna fotografia sopra i 1200px (misurate: ${
      proprie.map((p) => `${p} ${misura(p)}px`).join(', ')
    }): la scheda su Google esce con quella piccola, o senza`,
  );
});

/* ============================================================
   L'ANTEPRIMA SOCIAL. Aggiunta il 21 agosto 2026, dopo averla rotta.

   og:image e' la fotografia che esce quando qualcuno incolla il sito su
   WhatsApp, Facebook o LinkedIn — cioe' quando l'hotel viene consigliato
   da una persona a un'altra, che e' il momento in cui l'immagine conta di
   piu'. Puntava a /buoni/img/dayspa.jpg: un file che appartiene a un'altra
   superficie (l'email del buono regalo) ed e' tagliato per quella, 654px.

   Sostituendo quella fotografia il 21 agosto l'anteprima del sito e'
   cambiata da sola, senza che nessuno la guardasse. Un file con due
   padroni non ne ha nessuno: adesso l'anteprima ha il suo.

   Open Graph chiede 1200x630 (1,91:1): sotto, i lettori la ritagliano o la
   mostrano piccola di fianco al testo invece che grande sopra.
   ============================================================ */
Deno.test('l anteprima social ha la sua fotografia, sua e della misura giusta', () => {
  const m = HTML.match(/<meta property="og:image" content="([^"]+)"/);
  assert(m, 'og:image non dichiarato: chi incolla il link non vede nessuna fotografia');
  const percorso = new URL(m[1]).pathname;

  assert(
    !percorso.startsWith('/buoni/'),
    `og:image punta a ${percorso}, che appartiene all email del buono regalo: ` +
      'cambiare quella fotografia cambierebbe di nascosto l anteprima del sito',
  );

  const b = Deno.readFileSync(new URL('./public' + percorso, import.meta.url));
  let i = 2, largo = 0, alto = 0;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const k = b[i + 1];
    if (k >= 0xc0 && k <= 0xcf && k !== 0xc4 && k !== 0xc8 && k !== 0xcc) {
      alto = (b[i + 5] << 8) | b[i + 6];
      largo = (b[i + 7] << 8) | b[i + 8];
      break;
    }
    i += 2 + ((b[i + 2] << 8) | b[i + 3]);
  }
  assert(largo >= 1200, `og:image larga ${largo}px: Open Graph ne chiede almeno 1200`);
  const r = largo / alto;
  assert(
    Math.abs(r - 1200 / 630) < 0.06,
    `og:image ha rapporto ${r.toFixed(3)}, atteso ~1,905: i lettori la ritagliano`,
  );
});
