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

export const BOOKING_URL = "https://www.termeleonardo.com/booking/select-dates";
export const DAYSPA_URL = "https://www.termeleonardo.com/it/day-spa/prenotazioni";
export const SHOP_URL = "https://www.termeleonardo.com/shop";
export const dayspaUrl = (lang = "it") => `https://www.termeleonardo.com/${lang}/day-spa/prenotazioni`;
export const COMPANY_LINE = "Hotel Terme Leonardo · Via Monteortone, 46 · 35037 Abano Terme · P: +39 049 9939 200 · info@termeleonardo.com · P.I. IT 02042330288 · CIN: IT028089A18QYO48ED";
export const loginUrl = (lang = "it") => `https://www.termeleonardo.com/${lang}/login`;

export const NAV = [
  { href: "#benessere" },
  { href: "#golf" },
  { href: "#camere" },
  { href: "#dayspa" },
  { href: "#cure" },
  { href: "#offerte" },
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
  { title: "Grotte Sudatorie Naturali", desc: "Un percorso rigenerante nel calore avvolgente delle grotte naturali." },
  { title: "Lettini Idromassaggianti", desc: "Getti d'acqua che sciolgono le tensioni e riattivano la circolazione." },
  { title: "Docce Emozionali", desc: "Cromoterapia e profumi per un risveglio sensoriale completo." },
  { title: "Fangoterapia Medica", desc: "Trattamenti di fango termale maturo dalle proprietà curative." },
  { title: "Centro Benessere", desc: "Massaggi, trattamenti viso e corpo firmati dai nostri terapisti." },
];

export const ROOM_TYPES = ["Singola senza balcone", "Singola Parco", "Doppia", "Matrimoniale Queen", "Junior Suite Abano", "Junior Suite Colli Euganei", "Junior Suite Monteortone", "Junior Suite Accessibile", "Suite Colli Euganei", "Suite Monteortone"];
