# La home si apre in un terzo del tempo

*3 settembre 2026*

## Da dove si e' partiti

La proprieta' ha chiesto «analizza il sito e dimmi cosa migliorare», poi
«procedi con la sistemazione». La lettura da fuori (curl, sitemap, robots,
il pacchetto, le foto) e una misura vera con Lighthouse da telefono
dicevano questo:

| misura, 3 settembre 2026, mobile | prima |
|---|---|
| prestazioni (Lighthouse) | **43** / 100 |
| accessibilita' | 92 / 100 |
| primo disegno | 4,7 s |
| foto grande disegnata (LCP) | **11,9 s** |
| tempo bloccato dal JavaScript | 720 ms |
| peso della pagina | **5.063 KiB** |
| JavaScript | 517 KB (160 KB compressi) |
| foto risparmiabili (stima Lighthouse) | 3.532 KiB |
| pagine in sitemap | 3 |

Le cause, in ordine di peso:

1. **Le fotografie venivano dal sito precedente** (termeleonardo.com/img):
   JPEG da 300-400 KB serviti uguali al telefono e al computer, senza
   cache, e la foto a tutto schermo in cima alla pagina era larga
   **650 px** allargata a 1920.
2. **Due script di terzi in ogni pagina**: uno della piattaforma con cui
   il sito era stato costruito (emergent.sh), caricato dal loro server, e
   un tracciante PostHog con registrazione della sessione acceso prima di
   qualunque consenso, verso un terzo che l'informativa non nomina.
3. **I caratteri chiesti a Google con un `@import` dentro il CSS**: il
   browser scopriva di doverli chiedere solo dopo aver scaricato e letto
   il foglio di stile. In piu' un Inter che non usava nessuno.
4. **Nel pacchetto JavaScript**: framer-motion (110 KB) per due
   dissolvenze, react-query (25 KB) attorno a un'app che non lo chiamava
   mai, e in package.json altre cinquanta librerie — un intero kit di
   componenti, grafici, router, validatori — che nessun file importava ma
   che Vercel installava a ogni costruzione.
5. **La sitemap dichiarava tre indirizzi** su sedici: Prenota solo in
   italiano, il transfer assente, la home nelle altre tre lingue
   nemmeno.
6. **Tre difetti di accessibilita'** veri per chi legge dal telefono a
   sessant'anni: testo piccolo in oro chiaro su crema (contrasto 2,9), i
   titoli del footer h4 dopo un h2, i puntini della galleria alti 8 px.

## Cosa e' stato fatto, un commit per cosa

| commit | cosa | prova che lo tiene fermo |
|---|---|---|
| `1707b2a` | via emergent.sh e PostHog; caratteri in `index.html` coi soli pesi usati; via l'editor visuale della piattaforma da package.json e craco | `pagina-base.test.ts` |
| `da834e4` | le foto in casa: `strumenti/foto.js` + `strumenti/foto.json` → `public/foto/*.webp` in tre misure con l'impronta nel nome, `src/foto.js` generato, componente `<Foto>` con srcset/sizes/misure/caricamento pigro, preload della prima foto, cache di un anno in `vercel.json`; foto nuove dove quelle vecchie erano sbagliate o a 650 px | `foto.test.ts` |
| `e5d7a26` | dissolvenze in CSS + IntersectionObserver al posto di framer-motion; via react-query; chat in un file a parte con `lazy()`; 52 dipendenze morte tolte, cartelle del kit mai importato cancellate | `javascript.test.ts` |
| `c821824` | bronzo `#8A6A38` per il testo piccolo, footer leggibile e con h3, puntini toccabili, marchio con le misure | `accessibilita.test.ts` |
| `ca2de3b` | sitemap con le sedici pagine, hreflang reciproci, niente pagine nascoste | `sitemap.test.ts` |
| `2e4a79f` | il foglio dei caratteri non blocca il disegno (`media=print` + `onload`, copia in noscript) | `pagina-base.test.ts` |

Tutte le prove: `deno test frontend/ --allow-read` dalla radice del repo
(45 prove). La costruzione e' stata rifatta da zero con lo stesso comando
di installazione di Vercel prima di pubblicare.

## Le scelte sulle fotografie

Sono in `strumenti/foto.json`, ognuna con la sua nota. Le quattro che
cambiano soggetto:

- **in cima**: il parco, le piscine e i colli dall'alto (1920 px), al
  posto della piscina esterna a 650 px allargata a tutto schermo;
- **Benessere**: la piscina termale coperta con le palme, dall'originale
  del fotografo (consegnato il 21 agosto), al posto della vista aerea
  a 650 px;
- **Camere**: la junior suite al posto di un **bagno**, che era la foto
  grande della sezione;
- **Ristorante**: il Bistrot vero al posto della piscina con gli
  ombrelloni;
- **Day Spa**: la grotta a 1920 px al posto della sala dei lettini a 650.

Le offerte restano a 600 px perche' non c'e' di meglio: il sito
precedente non ha originali piu' grandi. Se la proprieta' ne consegna
altre (vedi `Desktop/foto-leonardo/LEGGIMI.txt`), si aggiunge una riga
al manifesto e si rilancia lo strumento.

## Misurato dopo

Stessa Lighthouse, stesso telefono simulato, sulla costruzione servita in
locale (le foto e il pacchetto sono gli stessi che vanno in produzione;
cambia solo la rete, che Lighthouse simula):

| misura, mobile | prima | dopo (locale) |
|---|---|---|
| prestazioni | 43 | **78-82** (due corse) |
| accessibilita' | 92 | **100** |
| primo disegno | 4,7 s | 2,6 s |
| foto grande disegnata (LCP) | 11,9 s | 4,1 s |
| tempo bloccato dal JavaScript | 720 ms | 130-200 ms |
| peso della pagina | 5.063 KiB | **569 KiB** |
| JavaScript (compresso) | 160 KB | 116 KB + 4 KB la chat |
| CSS (compresso) | 11,9 KB | 6,5 KB |
| pagine in sitemap | 3 | 16 |

E in produzione, su www.hoteltermeleonardo.com, un'ora dopo il push
(due corse, stesso telefono simulato):

| misura, mobile, produzione | prima | dopo |
|---|---|---|
| prestazioni | 43 | **79-80** |
| accessibilita' | 92 | **100** |
| primo disegno | 4,7 s | 2,9 s |
| foto grande disegnata (LCP) | 11,9 s | **3,7-3,8 s** |
| tempo bloccato dal JavaScript | 720 ms | 120-140 ms |
| pagina interattiva | 12,4 s | 3,7-3,9 s |
| peso della pagina | 5.063 KiB | **571 KiB** |
| script di terzi | 2 | 0 |

Quello che Lighthouse segnala ancora, per chi vorra' continuare: la foto
in cima arriva a 1280 px su un telefono che ne mostrerebbe 1080 (una
misura in piu' nel manifesto, `larghezze`); i file dei caratteri di
Google hanno una cache corta che non dipende da noi; il CSS del sito
(6,5 KB) e' l'unico foglio ancora bloccante, ed e' normale che lo sia.

## Cosa NON e' stato fatto, e perche'

- **La home leggibile al server** (pre-rendering o SSR: 3-5 giornate nella
  radiografia). Il 19 agosto 2026 la proprieta' ha deciso che **il sito che
  si posiziona e' termeleonardo.com**, e che questo resta la vetrina e la
  casa dei moduli. Rendere la home leggibile ai motori senza JavaScript
  servirebbe a farla competere: e' il contrario di quella decisione. Se la
  decisione cambia, questo e' il primo lavoro da fare, e va progettato a
  parte (la pagina e' un'app React con animazioni, lingua nel
  localStorage e sedici sezioni).
- **I pulsanti dorati** (`#B08D57` con testo bianco, contrasto 3,1) sono
  rimasti: cambiarli tocca l'identita' del sito, non un dettaglio. Il
  testo piccolo in oro e' passato al bronzo; i pulsanti sono una scelta
  della proprieta'.
- **Lenis** (lo scorrimento morbido, 15 KB) resta: e' una scelta di
  stile, non un peso morto.
- **Un lockfile** non e' stato aggiunto: Vercel installa con
  `npm install --legacy-peer-deps` senza lockfile da sempre, e cambiare il
  modo in cui si costruisce e' un lavoro a se'.

## Come si rifanno le foto

Dalla cartella `frontend/`, con sharp installato in una cartella qualunque
fuori dal progetto (non sta fra le dipendenze apposta: e' un binario da
decine di MB che Vercel scaricherebbe per niente):

```
set NODE_PATH=C:\sharp\node_modules
node strumenti/foto.js --proprieta "C:/Users/admin/Desktop/foto-leonardo"
```

Lo strumento scarica da solo le foto del sito precedente che gli servono
(in `.foto-vecchio/`, ignorata da git), scrive `public/foto/` e
`src/foto.js`, e toglie i file che nessuna voce usa piu'. Il nome di ogni
file porta l'impronta del contenuto: cambia la foto, cambia il nome, e la
cache di un anno dichiarata in `vercel.json` non puo' servire quella
vecchia.
