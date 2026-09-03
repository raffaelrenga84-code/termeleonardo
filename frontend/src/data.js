import { FOTO } from "./foto";

/* LE FOTOGRAFIE STANNO IN CASA, dal 3 settembre 2026.

   Fino ad allora venivano prese dal sito precedente (termeleonardo.com/img):
   JPEG da 300-400 KB serviti uguali al telefono e al computer, e quella a
   tutto schermo in cima alla pagina era larga 650 px. Ora stanno in
   public/foto/, in WebP e in tre misure, prodotte da strumenti/foto.js a
   partire da strumenti/foto.json — che dice per ognuna da dove viene e
   perche' e' stata scelta. Qui si decide solo QUALE foto va in QUALE posto.

   Ogni voce si mostra con <Foto foto={IMG.x} sizes="..." />, mai con un
   <img src> nudo: e' il componente che porta srcset, misure e caricamento
   pigro. */
export const IMG = {
  /* la fotografia grande della home: il parco, le piscine e i colli */
  heroPool: FOTO.vista,
  /* la piscina termale coperta, dall'originale del fotografo */
  wellnessPool: FOTO.piscinaTermale,
  /* La grotta termale: sta bene sul Day Spa, che vende proprio piscine e
     grotte. Prima questa stessa fotografia stava anche sulle Cure Termali e
     sul Benessere — tre volte la stessa immagine, e sulle Cure Termali per
     giunta a illustrare la FANGOTERAPIA, che coi lettini della grotta non
     c'entra niente. */
  grotta: FOTO.grotta,
  /* Il fango vero, dalla pagina delle cure del sito precedente. */
  fango: FOTO.fango,
  /* La piscina interna coi getti, per il Benessere: e' la prima cosa che
     quella sezione elenca (piscine 30-35 gradi, lettini idromassaggianti). */
  idromassaggio: FOTO.idromassaggio,
  golf: FOTO.golf,
  /* Il campo pratica e il maestro sono nostri davvero: due fotografie del
     posto, non un'immagine di repertorio con una pallina. Stanno da anni
     sulla pagina del campo pratica del sito precedente. */
  drivingRange: FOTO.campoPratica,
  maestro: FOTO.maestro,
  /* le due foto della sezione camere: la junior suite e la suite. Prima
     nella grande c'era un bagno. */
  roomView: FOTO.juniorSuite,
  roomBalcony: FOTO.suite,
  /* il Bistrot vero: prima la sezione ristorante mostrava la piscina */
  dining: FOTO.bistrot,
};

export const ROOM_GALLERY = [
  { key: "single", foto: FOTO.cameraSingola, price: "100" },
  { key: "double", foto: FOTO.cameraDoppia, price: "90" },
  { key: "queen", foto: FOTO.cameraQueen, price: "90" },
  { key: "junior", foto: FOTO.juniorSuite, price: "105" },
  { key: "suite", foto: FOTO.suite, price: "115" },
];

/* Motore di prenotazione vecchio: resta definito come riserva, ma nessun
   pulsante del sito ci punta piu' (vedi PRENOTA_URL sotto). */
export const BOOKING_URL = "https://www.termeleonardo.com/booking/select-dates";
export const DAYSPA_URL = "https://www.termeleonardo.com/it/day-spa/prenotazioni";
export const SHOP_URL = "https://www.termeleonardo.com/shop";
/* Tutti gli indirizzi rivolti all'ospite stanno sul dominio dell'hotel e sono
   serviti dalle riscritture in `vercel.json`: le pagine restano dove sono,
   su arrivo-terme-leonardo.vercel.app, e i link gia' partiti nelle email dei
   buoni — che valgono un anno — continuano a rispondere. Indirizzo nuovo in
   aggiunta, mai al posto.

   Il percorso e' tradotto perche' un ospite tedesco che condivide il link non
   debba mandare in giro parole italiane. La lingua sta davanti, come nel sito
   vecchio, cosi' ogni lingua ha un indirizzo suo. */
const SITO = "https://www.hoteltermeleonardo.com";

const percorsi = (mappa) => (lang = "it") => `${SITO}${mappa[lang] || mappa.it}`;

export const REGALA_URL_LANG = percorsi({
  it: "/it/buoni-regalo", de: "/de/gutscheine",
  en: "/en/gift-vouchers", fr: "/fr/cheques-cadeaux",
});
export const REGALA_URL = REGALA_URL_LANG("it");

/* Il transfer ha una pagina sua perche' porta l'elenco chiuso delle 189
   destinazioni dei tassisti; green fee, maestro e trattamenti condividono una
   pagina sola che cambia in base al tipo — tre file quasi identici
   divergerebbero come e' gia' successo con l'anteprima del buono. Qui pero'
   l'ospite vede quattro indirizzi distinti: la pagina condivisa e' un fatto
   nostro, non suo. */
export const TRANSFER_URL = percorsi({
  it: "/it/transfer", de: "/de/transfer", en: "/en/transfer", fr: "/fr/transfert",
});

const RICHIESTA_PERCORSI = {
  greenfee: { it: "/it/green-fee", de: "/de/greenfee", en: "/en/green-fee", fr: "/fr/green-fee" },
  maestro: { it: "/it/maestro-di-golf", de: "/de/golflehrer", en: "/en/golf-pro", fr: "/fr/pro-de-golf" },
  trattamenti: { it: "/it/trattamenti", de: "/de/behandlungen", en: "/en/treatments", fr: "/fr/soins" },
};

export const RICHIESTA_URL = (tipo, lang = "it") => {
  const m = RICHIESTA_PERCORSI[tipo];
  /* un tipo non ancora battezzato non deve rompere il pulsante: passa dalla
     pagina condivisa, che sa gia' leggersi il tipo dal parametro */
  if (!m) return `${SITO}/richieste/?tipo=${tipo}&l=${lang}`;
  return `${SITO}${m[lang] || m.it}`;
};

export const PRENOTA_URL = percorsi({
  it: "/it/prenota", de: "/de/buchen", en: "/en/book", fr: "/fr/reserver",
});
export const dayspaUrl = (lang = "it") => `https://www.termeleonardo.com/${lang}/day-spa/prenotazioni`;
export const COMPANY_LINE = "Hotel Terme Leonardo · Via Monteortone, 46 · 35037 Monteortone di Abano Terme (PD) · P: +39 049 9939 200 · info@termeleonardo.com · P.I. IT 02042330288 · CIN: IT028089A18QYO48ED";
export const loginUrl = (lang = "it") => `https://www.termeleonardo.com/${lang}/login`;

/* Trasparenza ULSS — cure termali erogate in convenzione con il SSR.
   tot = fatturato totale · ticket = quota a carico del cittadino · ssr = contributo netto erogato */
export const ULSS_TRANSPARENCY = [
  { y: 2011, tot: 9997.8, ticket: 1784.1, ssr: 8213.7 },
  { y: 2012, tot: 9027.6, ticket: 1405.8, ssr: 7621.8 },
  { y: 2013, tot: 10066.4, ticket: 1699.6, ssr: 8366.8 },
  { y: 2014, tot: 10803.06, ticket: 2087.2, ssr: 8715.86 },
  { y: 2015, tot: 8026.12, ticket: 1734.1, ssr: 6292.02 },
  { y: 2016, tot: 9494.18, ticket: 1861.5, ssr: 7632.68 },
  { y: 2017, tot: 13101.25, ticket: 2463.4, ssr: 10637.85 },
  { y: 2018, tot: 14064.38, ticket: 2692.7, ssr: 11371.68 },
  { y: 2019, tot: 14365.42, ticket: 3007.2, ssr: 11358.22 },
  { y: 2020, tot: 5471.89, ticket: 849.86, ssr: 4622.03 },
  { y: 2021, tot: 9118.42, ticket: 1528.4, ssr: 7590.02 },
  { y: 2022, tot: 22071.23, ticket: 3349.6, ssr: 18721.63 },
  { y: 2023, tot: 34737.9, ticket: 5266.1, ssr: 29471.8 },
  { y: 2024, tot: 52578.46, ticket: 7714.0, ssr: 44864.46 },
  { y: 2025, tot: 83803.36, ticket: 12188.4, ssr: 71614.96 },
];

export const NAV = [
  /* «Benessere» porta ai massaggi e trattamenti, non all'introduzione: è lì
     che c'è il listino e il pulsante per chiedere qualcosa. L'introduzione
     resta raggiungibile scorrendo e dal pulsante «Scopri» della foto grande.
     `voce` esiste perché altrimenti l'etichetta la deciderebbe la
     destinazione (labelFor in Navbar.jsx) e la barra si leggerebbe
     «#trattamenti» in tutte e quattro le lingue. */
  { href: "#trattamenti", voce: "benessere" },
  { href: "#golf" },
  { href: "#camere" },
  { href: "#dayspa" },
  { href: "#cure" },
  { href: "#offerte" },
  { href: "#faq" },
  { href: "#info" },
];



/* LE OFFERTE NON SONO LE STESSE IN TUTTE LE LINGUE.

   Prima erano un elenco solo, tradotto quattro volte. Ma la clientela
   italiana prenota soggiorni brevi — una o due notti, al massimo la
   settimana di golf — mentre quella di lingua tedesca prenota le settimane
   lunghe: sono due listini diversi, non due traduzioni. Chi sceglie quali
   mostrare e' ogni lingua, in i18n.js (`offers.cards`).

   Qui restano le due cose che NON cambiano con la lingua: il prezzo e la
   fotografia. Stanno insieme, per `slug`, cosi' non si puo' pubblicare una
   cifra diversa a un tedesco e a un italiano per la stessa offerta.

   Prezzi e finestre presi il 18 agosto 2026 dalle pagine dell'hotel
   (termeleonardo.com/it/offerte e /de/angebote). «Sommer Spezial» e
   «Februar Spezial» NON sono qui: le loro finestre — giugno 2026 e
   febbraio-marzo 2026 — erano gia' passate. Il sito precedente le mostra
   ancora; non e' una ragione per ricopiarle. */
export const OFFERTE = {
  /* italiane: soggiorni brevi */
  "7-giorni-di-golf": { price: "820", foto: FOTO.offertaGolf, featured: true },
  deluxe: { price: "400", foto: FOTO.offertaDeluxe },
  smart: { price: "180", foto: FOTO.offertaFango },
  escape: { price: "280", foto: FOTO.offertaNovembre },
  /* tedesche: settimane lunghe. Il golf e' lo stesso soggiorno e lo stesso
     prezzo dell'italiano, con un indirizzo suo sul sito dell'hotel. */
  "7-tage-golf": { price: "820", foto: FOTO.offertaGolf, featured: true },
  "dolce-vita-fango-woche": { price: "1157,5", foto: FOTO.offertaFango },
  "november-spezial": { price: "108", foto: FOTO.offertaNovembre },
};

export const WELLNESS_FEATURES = [
  { title: "Piscine Termali 30–35°C", desc: "Piscine interne ed esterne alimentate dalle acque termali dei Colli Euganei." },
  { title: "Grotte Sudatorie", desc: "Un percorso rigenerante nel calore avvolgente delle grotte." },
  { title: "Lettini Idromassaggianti", desc: "Getti d'acqua che sciolgono le tensioni e riattivano la circolazione." },
  { title: "Docce Emozionali", desc: "Cromoterapia e profumi per un risveglio sensoriale completo." },
  { title: "Fangoterapia Medica", desc: "Trattamenti di fango termale maturo dalle proprietà curative." },
  { title: "Centro Benessere", desc: "Massaggi, trattamenti viso e corpo firmati dai nostri terapisti." },
];

export const ROOM_TYPES = ["Singola senza balcone", "Singola Parco", "Doppia", "Matrimoniale Queen", "Junior Suite Abano", "Junior Suite Colli Euganei", "Junior Suite Monteortone", "Junior Suite Accessibile", "Suite Colli Euganei", "Suite Monteortone"];
