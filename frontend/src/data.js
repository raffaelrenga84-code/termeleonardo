const BASE = "https://www.termeleonardo.com/img";

export const IMG = {
  heroPool: `${BASE}/outdoor-pool-hotel-leonardo-da-vinci-terme.jpg`,
  wellnessPool: `${BASE}/view-hotel-leonardo-da-vinci-terme.jpg`,
  spaMassage: `${BASE}/grotto-hotel-leonardo-da-vinci-terme.jpg`,
  golf: `${BASE}/7-days-golf.jpg`,
  roomView: `${BASE}/-hotel-leonardo-da-vinci-terme-3.jpg`,
  roomBalcony: `${BASE}/suite-533-hotel-terme-lonardo-@2x.jpg`,
  roomJunior: `${BASE}/junior-suite-32-1-hotel-terme-leonardo@2x.jpg`,
  dining: `${BASE}/sommer-spezial-hotel-terme-leonardo.jpg`,
  membership: `${BASE}/membership.jpg`,
};

export const ROOM_GALLERY = [
  { key: "single", img: `${BASE}/single-room-hotel-leonardo-da-vinci-terme@2x.jpg`, price: "100" },
  { key: "double", img: `${BASE}/double-room-hotel-terme-leonardo-@2x.jpg`, price: "90" },
  { key: "queen", img: `${BASE}/queen-room-@2x.jpg`, price: "90" },
  { key: "junior", img: `${BASE}/junior-suite-32-1-hotel-terme-leonardo@2x.jpg`, price: "105" },
  { key: "suite", img: `${BASE}/suite-533-hotel-terme-lonardo-@2x.jpg`, price: "115" },
];

/* Motore di prenotazione vecchio: resta definito come riserva, ma nessun
   pulsante del sito ci punta piu' (vedi PRENOTA_URL sotto). */
export const BOOKING_URL = "https://www.termeleonardo.com/booking/select-dates";
export const DAYSPA_URL = "https://www.termeleonardo.com/it/day-spa/prenotazioni";
export const SHOP_URL = "https://www.termeleonardo.com/shop";
/* i buoni regalo si comprano qui: pagina in IT/DE/EN/FR, pagamento con
   carta e buono spedito per email dalla funzione `buoni` */
export const REGALA_URL = "https://arrivo-terme-leonardo.vercel.app/buoni/regala/";
/* Le richieste vivono nelle pagine statiche: sono gia' multilingua e non
   richiedono un router.

   Due forme di indirizzo, e non per capriccio: il transfer ha una pagina
   sua perche' porta l'elenco chiuso delle 189 destinazioni dei tassisti,
   mentre green fee, maestro e trattamenti condividono una pagina sola che
   cambia in base al tipo — tre file quasi identici divergerebbero come e'
   gia' successo con l'anteprima del buono. */
const BASE_RICHIESTE = "https://arrivo-terme-leonardo.vercel.app/richieste";
export const TRANSFER_URL = (lang = "it") => `${BASE_RICHIESTE}/transfer/?l=${lang}`;
export const RICHIESTA_URL = (tipo, lang = "it") =>
  `${BASE_RICHIESTE}/?tipo=${tipo}&l=${lang}`;
/* La prenotazione camere sta nelle pagine statiche come le altre richieste:
   gia' multilingua, nessun router. */
export const PRENOTA_URL = (lang = "it") =>
  `https://arrivo-terme-leonardo.vercel.app/prenota/?l=${lang}`;
export const dayspaUrl = (lang = "it") => `https://www.termeleonardo.com/${lang}/day-spa/prenotazioni`;
export const COMPANY_LINE = "Hotel Terme Leonardo · Via Monteortone, 46 · 35037 Abano Terme · P: +39 049 9939 200 · info@termeleonardo.com · P.I. IT 02042330288 · CIN: IT028089A18QYO48ED";
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
  { href: "#benessere" },
  { href: "#golf" },
  { href: "#camere" },
  { href: "#dayspa" },
  { href: "#cure" },
  { href: "#offerte" },
  { href: "#faq" },
  { href: "#info" },
];

export const DAYSPA = {
  intro:
    "Con la formula Day Spa puoi coccolarti anche solo per un giorno nelle nostre piscine e grotte termali, usufruendo di tutti i servizi senza pernottare.",
  orari: "Aperto ogni giorno dalle 9:00 alle 18:30 · Apertura serale Ven. e Sab. 18:00–22:30",
  prezzi: [
    { nome: "Ingresso Giornaliero", sub: "Piscine & Grotte Termali", price: "35", note: "Feriale · €45 Weekend e Festivi" },
    { nome: "Ingresso Serale", sub: "Ven. e Sab. · 18:00–22:30", price: "29", note: "Percorso Spa + area relax" },
    { nome: "Abbonamento", sub: "10 ingressi a persona", price: "300", note: "Feriale · €400 tutti i giorni" },
  ],
  incluso: [
    "Ingresso Piscine Termali",
    "Ingresso Grotte Termali",
    "Bagno Turco & Bio-Grotta",
    "Docce emozionali & Cromoterapia",
    "Parcheggio gratuito",
    "Wi-Fi gratuito",
  ],
};

export const OFFERS = [
  {
    slug: "7-giorni-di-golf", tag: "Golf",
    title: "7 Giorni di Golf",
    desc: "Offerta Golf, 7 Giorni all'Hotel Terme Leonardo ad Abano Terme.",
    price: "820",
    unit: "a persona",
    img: `${BASE}/7-days-golf.jpg`,
    featured: true,
  },
  {
    slug: "deluxe", tag: "Deluxe",
    title: "Soggiorno Deluxe",
    desc: "3 Notti & Massaggio in camera Deluxe con vista sui Colli.",
    price: "400",
    unit: "a persona",
    img: `${BASE}/sommer-spezial-hotel-terme-leonardo.jpg`,
  },
  {
    slug: "smart", tag: "Smart",
    title: "Soggiorno Smart",
    desc: "1 Notte & Massaggio. La fuga breve dedicata al relax.",
    price: "180",
    unit: "a persona",
    img: `${BASE}/dolce-vita-mud-offer.jpg`,
  },
  {
    slug: "escape", tag: "Escape",
    title: "Thermal Escape",
    desc: "2 Notti immersi nelle piscine termali e nella natura.",
    price: "280",
    unit: "a persona",
    img: `${BASE}/november-special.jpg`,
  },
];

export const WELLNESS_FEATURES = [
  { title: "Piscine Termali 30–35°C", desc: "Piscine interne ed esterne alimentate dalle acque termali dei Colli Euganei." },
  { title: "Grotte Sudatorie", desc: "Un percorso rigenerante nel calore avvolgente delle grotte." },
  { title: "Lettini Idromassaggianti", desc: "Getti d'acqua che sciolgono le tensioni e riattivano la circolazione." },
  { title: "Docce Emozionali", desc: "Cromoterapia e profumi per un risveglio sensoriale completo." },
  { title: "Fangoterapia Medica", desc: "Trattamenti di fango termale maturo dalle proprietà curative." },
  { title: "Centro Benessere", desc: "Massaggi, trattamenti viso e corpo firmati dai nostri terapisti." },
];

export const ROOM_TYPES = ["Singola senza balcone", "Singola Parco", "Doppia", "Matrimoniale Queen", "Junior Suite Abano", "Junior Suite Colli Euganei", "Junior Suite Monteortone", "Junior Suite Accessibile", "Suite Colli Euganei", "Suite Monteortone"];
