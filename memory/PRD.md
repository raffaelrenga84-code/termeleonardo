# Hotel Terme Leonardo — Redesign (Abano Terme)

## Problem statement
Rinnovare il sito https://www.termeleonardo.com/it — redesign moderno del look & feel mantenendo le stesse sezioni. Solo italiano. Stile elegante e lussuoso. Contenuti/offerte mantenuti dall'originale.

## Stack
React + Tailwind + Framer Motion + Lenis (smooth scroll). FastAPI + MongoDB (booking requests).

## Implemented
- Landing page single-page: Hero, Benessere, Sport&Natura/Golf, Camere, Ristorante, Day Spa, Offerte, Modulo prenotazione, Footer.
- Foto reali prelevate dal sito ufficiale termeleonardo.com/img (piscine, grotte, camere/suite, offerte).
- Sezione DAY SPA con prezzi reali + pulsante "Prenota Day Spa" (nuova scheda -> /it/day-spa/prenotazioni).
- Pulsanti "Prenota" (nav + hero) aprono il sito ufficiale in nuova scheda (BOOKING_URL).
- Backend: POST/GET /api/bookings (salva richieste prenotazione in Mongo). Testato via curl.
- Palette verde bosco + oro; font Cormorant Garamond + Manrope.

## Backlog / Next
- Foto ristorante dedicata (attualmente usa immagine promo del sito).
- Eventuale integrazione email di conferma (SendGrid/Resend) sul form.
- URL esatto del booking engine hotel (ora punta alla home ufficiale).
- Test end-to-end completo con testing agent.

## Update (multilingua)
- Sito ora multilingua IT/DE/FR/EN con switcher in navbar (default IT, persistito in localStorage).
- Traduzioni complete in /app/frontend/src/i18n.js; stato via /app/frontend/src/LanguageContext.js.
- Testing agent iteration_1: backend 100%, frontend 100% (switch lingua + form prenotazione + link nuova scheda verificati).
