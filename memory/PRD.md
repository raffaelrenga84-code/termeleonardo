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

## Update (contenuti mancanti dalla KB Voice AI)
- Aggiunte sezioni multilingua (IT/DE/FR/EN):
  - Cure Termali (ciclo fanghi, visita medica, ticket €55, §13 SGB V)
  - Massaggi & Trattamenti (listino selezione)
  - Transfer & Taxi (navetta/taxi con tariffe + escursioni)
  - Info & Contatti: indirizzo Via Monteortone 46, tel reception +39 049 8669111, segreteria cure +39 049 9939234, email info@termeleonardo.com, mappa Google, "come arrivare" (distanze + autostrade + colonnine EV), banner apertura stagionale 14 feb–29 nov 2026, info utili (check-in/out, check-in online, tassa soggiorno €1,50, animali €13, cuffia €3).
- Navbar aggiornata: aggiunti "Cure Termali" (#cure) e "Info & Contatti" (#info); rimosso "Ristorante" dalla nav (sezione ancora in pagina).
- Contatti reali anche nel footer.
- Testing agent iteration_3: frontend 100%, reattività lingua verificata, nessun errore.
- Trovato URL reale booking engine: https://www.termeleonardo.com/{lang}/booking/select-dates (step "Select Room"). NON ancora collegato al pulsante Prenota su richiesta dell'utente (deprioritizzato).

## Backlog residuo
- Collegare i pulsanti "Prenota" al booking engine reale /{lang}/booking/select-dates (URL già individuato).
- Rifinire sezioni Piscine (3 vasche, temperature), Ristorante (orari pasti, mezza pensione) e "Servizi inclusi".
- Buoni regalo Day Spa, camera d'appoggio, condizioni cancellazione/caparra, accessibilità.

## Update (Ristorante ampliato)
- Sezione Ristorante estesa (IT/DE/FR/EN): formule B&B vs Mezza Pensione, orari pasti (colazione 7:30–10:00, cena dalle 19:30 ultimo ingresso 20:20, Bistrot pranzo/snack/bar), nota "niente pensione completa" e card dedicata Bistrot La Piazza.
- Testing agent iteration_4: frontend 100% (20/20), reattività lingua IT/EN/DE/FR verificata, nessun errore.
