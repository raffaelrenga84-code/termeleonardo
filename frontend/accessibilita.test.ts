/* ============================================================
   accessibilita.test.ts — i difetti che Lighthouse ha trovato il 3
   settembre 2026 (accessibilita' 92/100) non tornano.

   Tre cose, tutte piccole e tutte vere per chi ha piu' di sessant'anni e
   legge dal telefono, che e' la meta' degli ospiti di un albergo termale:

   · testo piccolo in oro chiaro (#B08D57) su bianco o crema: contrasto
     2,9-3,1, la soglia e' 4,5. La riga legale del footer al 45% di
     bianco: 3,3;
   · i titoli del footer erano h4 dopo un h2: chi naviga coi titoli si
     trova un gradino mancante;
   · i puntini della galleria delle camere erano pulsanti alti 8 px.

   Prove sul sorgente: il DOM in Deno non c'e'.

   Si lancia con:  deno test frontend/accessibilita.test.ts --allow-read
   ============================================================ */
import { assert, assertEquals } from 'jsr:@std/assert';

const qui = (p: string) => new URL(p, import.meta.url);
const leggi = (p: string): string => Deno.readTextFileSync(qui(p));
const componenti = (): [string, string][] =>
  [...Deno.readDirSync(qui('./src/components/site'))]
    .filter((e) => /\.jsx$/.test(e.name))
    .map((e) => [e.name, leggi('./src/components/site/' + e.name)]);

Deno.test('ci sono dei componenti da guardare', () => {
  assert(componenti().length >= 15);
});

Deno.test('nessun testo piccolo in oro chiaro su fondo chiaro', () => {
  const colpevoli: string[] = [];
  for (const [nome, s] of componenti()) {
    for (const m of s.matchAll(/className="([^"]*)"/g)) {
      const c = m[1];
      if (/\btext-(xs|sm)\b/.test(c) && c.includes('text-[#B08D57]')) colpevoli.push(`${nome}: ${c.slice(0, 70)}`);
    }
  }
  assertEquals(colpevoli, [], 'oro chiaro #B08D57 su testo piccolo: contrasto sotto 4,5');
});

Deno.test('l etichetta sopra i titoli usa il bronzo, non l oro chiaro', () => {
  const reveal = leggi('./src/components/site/Reveal.jsx');
  const label = reveal.match(/export const Label[\s\S]*?<span className=\{`([^`]*)`\}/);
  assert(label, 'Label non trovata');
  assert(label[1].includes('text-[#8A6A38]') && !label[1].includes('text-[#B08D57]'), `Label: ${label[1]}`);
});

Deno.test('la riga legale del footer si legge: bianco almeno al 70%', () => {
  const f = leggi('./src/components/site/Footer.jsx');
  const legale = f.match(/className="[^"]*text-\[11px\][^"]*"/);
  assert(legale, 'riga legale non trovata');
  const m = legale[0].match(/text-white\/(\d+)/);
  assert(m && Number(m[1]) >= 70, `riga legale: ${legale[0]}`);
  assert(!/text-white\/(45|50|60)\b/.test(f), 'nel footer ci sono ancora testi sotto il 70% di bianco');
});

Deno.test('i titoli del footer sono h3: dopo l h2 di Prenota, non un h4', () => {
  const f = leggi('./src/components/site/Footer.jsx');
  const colonne = f.match(/<h3 className="text-xs uppercase tracking-label/g) ?? [];
  assertEquals(colonne.length, 2, 'le due colonne del footer devono avere un h3');
  assert(!/<h4 className="text-xs uppercase tracking-label/.test(f), 'e tornato un h4 di colonna');
});

Deno.test('i puntini della galleria hanno un bersaglio di almeno 24 px', () => {
  const g = leggi('./src/components/site/RoomGallery.jsx');
  /* il tag si prende a mano: dentro c'e' una freccia «=>» che a
     un'espressione con [^>]* fermerebbe la lettura a meta' */
  const marca = g.indexOf('data-testid={`room-dot-');
  assert(marca > 0, 'pulsante dei puntini non trovato');
  const inizio = g.lastIndexOf('<button', marca);
  const fine = g.indexOf('>', g.indexOf('className=', marca));
  const bottone = g.slice(inizio, fine + 1);
  assert(/\bp-2\b/.test(bottone), `il pulsante non ha il margine interno: ${bottone.slice(0, 160)}`);
  assert(!/\bh-2\b/.test(bottone), 'il pulsante stesso non deve essere alto 8 px: il puntino va dentro');
});

Deno.test('il marchio nella barra dichiara le sue misure: senza, la barra salta quando arriva', () => {
  const n = leggi('./src/components/site/Navbar.jsx');
  const img = n.match(/<img[\s\S]*?\/>/);
  assert(img, 'marchio non trovato');
  assert(/\bwidth="\d+"/.test(img[0]) && /\bheight="\d+"/.test(img[0]), img[0]);
});
