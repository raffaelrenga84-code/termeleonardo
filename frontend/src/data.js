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

export const BOOKING_URL = "https://www.termeleonardo.com/it";
export const DAYSPA_URL = "https://www.termeleonardo.com/it/day-spa/prenotazioni";

export const NAV = [
  { label: "Benessere", href: "#benessere" },
  { label: "Sport & Natura", href: "#golf" },
  { label: "Camere", href: "#camere" },
  { label: "Ristorante", href: "#ristorante" },
  { label: "Day Spa", href: "#dayspa" },
  { label: "Offerte", href: "#offerte" },
  { label: "Contatti", href: "#prenota" },
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
    tag: "Golf",
    title: "7 Giorni di Golf",
    desc: "Offerta Golf, 7 Giorni all'Hotel Terme Leonardo ad Abano Terme.",
    price: "820",
    unit: "a persona",
    img: `${BASE}/7-days-golf.jpg`,
    featured: true,
  },
  {
    tag: "Deluxe",
    title: "Soggiorno Deluxe",
    desc: "3 Notti & Massaggio in camera Deluxe con vista sui Colli.",
    price: "400",
    unit: "a persona",
    img: `${BASE}/sommer-spezial-hotel-terme-leonardo.jpg`,
  },
  {
    tag: "Smart",
    title: "Soggiorno Smart",
    desc: "1 Notte & Massaggio. La fuga breve dedicata al relax.",
    price: "180",
    unit: "a persona",
    img: `${BASE}/dolce-vita-mud-offer.jpg`,
  },
  {
    tag: "Escape",
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

export const ROOM_TYPES = ["Camera Classic", "Camera Deluxe", "Junior Suite", "Suite Panoramica"];
