/* ============================================================
   faq.js — le domande frequenti, nelle quattro lingue.

   Ricostruite dalle FAQ del sito vecchio, ma verificate una per una contro
   la Knowledge Base dell'assistente (la stessa che usa l'agente vocale).
   Dove le due fonti divergevano ha vinto la Knowledge Base, che e' quella
   che la reception tiene aggiornata.

   Due correzioni rispetto al testo vecchio, entrambe volute:

   1. PISCINE: la pagina italiana diceva "4 piscine termali", quella tedesca
      "drei" e la Knowledge Base "tre vasche". Qui sono TRE. Due fonti su
      tre concordano, ed e' anche quello che l'ospite conta arrivando.

   2. GROTTE: non sono "naturali". Erano descritte cosi' in italiano e in
      tedesco; qui si dicono solo "sudatorie", che e' quello che sono.

   Le risposte non promettono mai disponibilita' o prezzi che cambiano: i
   prezzi citati sono quelli stabili del listino, il resto rimanda al sito.
   ============================================================ */

export const FAQ = {
  it: {
    label: "Domande frequenti",
    title: "Le domande che ci fanno più spesso",
    voci: [
      {
        d: "Dove si trova l'Hotel Terme Leonardo?",
        r: "A Monteortone, in Via Monteortone 46, nel verde dei Colli Euganei e a 1,5 km dal centro di Abano Terme. La stazione Terme Euganee Abano-Montegrotto dista 7 km, Padova 12, l'aeroporto di Venezia 60.",
      },
      {
        d: "Quante piscine termali ci sono?",
        r: "Tre vasche, tutte di acqua termale: una interna molto luminosa, una esterna calda collegata alla interna — si passa da dentro a fuori nuotando, e fuori si nuota anche sotto un ponte fra due vasche comunicanti — e una terza separata, con acqua più fresca e lettini a bordo vasca. La profondità va da 70 cm a 1,42 m: si cammina comodamente dappertutto.",
      },
      {
        d: "Qual è la temperatura dell'acqua?",
        r: "Le vasche interne sono fra 33 e 35 °C, l'esterna fra 29 e 31 °C. Sono 800 mq di superficie d'acqua, con oltre 30 lettini e sedie a getti massaggianti. La cuffia è obbligatoria in tutta la zona piscine.",
      },
      {
        d: "Cosa comprende il centro benessere?",
        r: "Il centro grotte, riservato agli adulti, ha due ambienti: una biosauna secca a 45 °C e una grotta umida con bagno turco ai vapori termali. Ci sono poi lettini massaggianti, docce emozionali con aromaterapia, whirlpool, cascata di acqua termale e cascata di ghiaccio. Non c'è la sauna finlandese.",
      },
      {
        d: "Si può fare la fangoterapia?",
        r: "Sì. L'hotel ha un reparto dedicato con fanghi maturati 60–90 giorni nelle acque salso-bromo-iodiche di Abano. Le cure sono convenzionate con il Servizio Sanitario Nazionale e richiedono la prescrizione del medico curante. La visita medica di ammissione è obbligatoria e si può fare anche senza soggiornare in hotel.",
      },
      {
        d: "Si può venire solo per un giorno, senza pernottare?",
        r: "Sì, con la formula Day Spa: piscine, grotte e area relax dalle 9:00 alle 18:30. L'ingresso costa 35 € dal lunedì al venerdì e 45 € il sabato, la domenica e i festivi. Venerdì e sabato c'è anche l'ingresso serale, 29 €, dalle 18:00 alle 22:30. Si prenota esclusivamente online: i posti sono limitati e la prenotazione è l'unico modo per garantire l'ingresso.",
      },
      {
        d: "L'hotel è adatto a chi gioca a golf?",
        r: "Sì: c'è un campo pratica di 15.000 mq adiacente alle piscine, con putting e pitching green, aperto dalle 9:00 alle 18:30. La range fee è di 6 € per chi soggiorna e 10 € per gli esterni, il gettone da 22 palline costa 3 €. La Golf Academy offre lezioni private su prenotazione, e i nostri ospiti hanno il green fee agevolato ai Golf Club Padova, Montecchia e Frassanelle, tutti a 10–15 minuti.",
      },
      {
        d: "Ci sono parcheggi e colonnine per l'auto elettrica?",
        r: "I parcheggi, coperti e scoperti, sono gratuiti. Ci sono otto colonnine da 11 kW: la ricarica si fa in autonomia con le app Next charge o My wallbox. Il cavo non è in dotazione, va portato — è la sorpresa più frequente all'arrivo.",
      },
      {
        d: "Si può venire con il cane?",
        r: "Sì, accogliamo cani di piccola e media taglia con un supplemento di 13 € al giorno, da segnalare al momento della prenotazione. Il cane può stare in camera, in hall, al Bistrot La Piazza e sulle terrazze. Non può accedere alla zona parco e piscine, al centro grotte, alla zona relax, al ristorante a cena e alla sala colazione.",
      },
      {
        d: "La tassa di soggiorno è compresa?",
        r: "No, si paga in hotel in contanti: 1,50 € al giorno a persona, per un massimo di sette notti. Sono esenti i minori di quattordici anni e le persone con disabilità.",
      },
      {
        d: "Qual è il periodo migliore per venire?",
        r: "Le acque termali sono calde tutto l'anno, quindi le piscine si godono anche d'inverno. L'hotel chiude solo per la pausa stagionale, da fine novembre a metà febbraio.",
      },
      {
        d: "L'hotel ha certificazioni di sostenibilità?",
        r: "Sì: l'Hotel Terme Leonardo è il primo hotel termale in Europa ad aver ottenuto la certificazione GSTC (Global Sustainable Tourism Council), uno dei principali standard internazionali per il turismo sostenibile.",
      },
    ],
  },

  de: {
    label: "Häufige Fragen",
    title: "Was uns am häufigsten gefragt wird",
    voci: [
      {
        d: "Wo liegt das Hotel Terme Leonardo?",
        r: "In Monteortone, Via Monteortone 46, im Grünen der Euganeischen Hügel und 1,5 km vom Zentrum von Abano Terme entfernt. Der Bahnhof Terme Euganee Abano-Montegrotto ist 7 km entfernt, Padua 12 km, der Flughafen Venedig 60 km.",
      },
      {
        d: "Wie viele Thermalbecken gibt es?",
        r: "Drei Becken, alle mit Thermalwasser: ein sehr helles Innenbecken, ein warmes Außenbecken, das mit dem Innenbecken verbunden ist — man schwimmt von drinnen nach draußen und draußen unter einer Brücke zwischen zwei verbundenen Becken hindurch — und ein drittes, separates Becken mit kühlerem Wasser und Sonnenliegen am Rand. Die Tiefe reicht von 70 cm bis 1,42 m: man steht überall bequem.",
      },
      {
        d: "Wie warm ist das Wasser?",
        r: "Die Innenbecken haben 33 bis 35 °C, das Außenbecken 29 bis 31 °C. Insgesamt 800 m² Wasserfläche mit über 30 Liegen und Sitzen mit Massagedüsen. Im gesamten Badebereich ist eine Badekappe Pflicht.",
      },
      {
        d: "Was umfasst der Wellnessbereich?",
        r: "Der Grottenbereich, Erwachsenen vorbehalten, besteht aus zwei Räumen: einer trockenen Biosauna bei 45 °C und einer feuchten Grotte mit Dampfbad aus Thermaldämpfen. Dazu kommen Massageliegen, Erlebnisduschen mit Aromatherapie, Whirlpool, Thermalwasserfall und Eisbrunnen. Eine finnische Sauna gibt es nicht.",
      },
      {
        d: "Kann man eine Fangotherapie machen?",
        r: "Ja. Das Hotel hat eine eigene Abteilung mit Fango, der 60 bis 90 Tage im salz-brom-jodhaltigen Thermalwasser von Abano gereift ist. Die Kuren sind vom italienischen Gesundheitsdienst anerkannt und benötigen eine ärztliche Verordnung. Das Hotel ist auch im Sinne des § 13 Abs. 4 Satz 2 SGB V anerkannt, die Fangokuren können also von der Krankenkasse erstattungsfähig sein — bitte prüfen Sie das mit Ihrer Kasse. Die ärztliche Aufnahmeuntersuchung ist Pflicht und auch ohne Übernachtung möglich.",
      },
      {
        d: "Kann man nur für einen Tag kommen?",
        r: "Ja, mit der Day-Spa-Formel: Becken, Grotten und Relaxbereich von 9:00 bis 18:30 Uhr. Der Eintritt kostet 35 € von Montag bis Freitag und 45 € samstags, sonntags und an Feiertagen. Freitags und samstags gibt es auch den Abendeintritt für 29 €, von 18:00 bis 22:30 Uhr. Die Buchung erfolgt ausschließlich online: die Plätze sind begrenzt und nur die Online-Buchung garantiert den Eintritt.",
      },
      {
        d: "Eignet sich das Hotel für Golfer?",
        r: "Ja: Direkt neben den Thermalbecken liegt eine 15.000 m² große Driving Range mit Putting- und Pitching-Green, geöffnet von 9:00 bis 18:30 Uhr. Die Range Fee beträgt 6 € für Hotelgäste und 10 € für externe Gäste, ein Token mit 22 Bällen kostet 3 €. Die Golf Academy bietet Privatstunden nach Vereinbarung, und unsere Gäste erhalten vergünstigte Greenfees in den Golfclubs Padova, Montecchia und Frassanelle, alle 10 bis 15 Minuten entfernt.",
      },
      {
        d: "Gibt es Parkplätze und Ladestationen?",
        r: "Die Parkplätze, überdacht und im Freien, sind kostenlos. Es gibt acht Ladestationen mit 11 kW: geladen wird selbstständig über die Apps Next charge oder My wallbox. Das Kabel ist nicht vorhanden und muss mitgebracht werden — das ist die häufigste Überraschung bei der Ankunft.",
      },
      {
        d: "Darf der Hund mitkommen?",
        r: "Ja, kleine und mittelgroße Hunde sind willkommen, gegen einen Aufschlag von 13 € pro Tag, bitte schon bei der Buchung angeben. Der Hund darf ins Zimmer, in die Halle, ins Bistrot La Piazza und auf die Terrassen. Nicht erlaubt sind Park- und Badebereich, Grottenbereich, Relaxbereich sowie Restaurant am Abend und Frühstücksraum.",
      },
      {
        d: "Ist die Kurtaxe inbegriffen?",
        r: "Nein, sie wird vor Ort in bar bezahlt: 1,50 € pro Person und Tag, für höchstens sieben Nächte. Kinder unter vierzehn Jahren und Menschen mit Behinderung sind befreit.",
      },
      {
        d: "Wann ist die beste Reisezeit?",
        r: "Das Thermalwasser ist das ganze Jahr über warm, die Becken lassen sich also auch im Winter genießen. Das Hotel schließt nur für die Saisonpause, von Ende November bis Mitte Februar.",
      },
      {
        d: "Hat das Hotel Nachhaltigkeitszertifizierungen?",
        r: "Ja: Das Hotel Terme Leonardo ist das erste Thermalhotel Europas mit der GSTC-Zertifizierung (Global Sustainable Tourism Council), einem der wichtigsten internationalen Standards für nachhaltigen Tourismus.",
      },
    ],
  },

  en: {
    label: "Frequently asked questions",
    title: "What guests ask us most",
    voci: [
      {
        d: "Where is Hotel Terme Leonardo?",
        r: "In Monteortone, at Via Monteortone 46, in the green of the Euganean Hills and 1.5 km from the centre of Abano Terme. Terme Euganee Abano-Montegrotto station is 7 km away, Padua 12 km, Venice airport 60 km.",
      },
      {
        d: "How many thermal pools are there?",
        r: "Three pools, all thermal: a bright indoor one, a warm outdoor one connected to it — you swim from inside to outside, and outside you swim under a bridge between two connected basins — and a third, separate pool with cooler water and sun loungers along the edge. The depth runs from 70 cm to 1.42 m: you can stand comfortably everywhere.",
      },
      {
        d: "How warm is the water?",
        r: "The indoor pools are 33 to 35 °C, the outdoor one 29 to 31 °C. That's 800 m² of water, with more than 30 loungers and seats with massage jets. A swimming cap is compulsory throughout the pool area.",
      },
      {
        d: "What does the wellness centre include?",
        r: "The grotto area, for adults only, has two rooms: a dry bio-sauna at 45 °C and a damp grotto with a steam bath of thermal vapours. There are also massage loungers, emotional showers with aromatherapy, a whirlpool, a thermal waterfall and an ice fountain. There is no Finnish sauna.",
      },
      {
        d: "Can I have mud therapy?",
        r: "Yes. The hotel has its own department, with mud matured for 60 to 90 days in the salt-bromine-iodine thermal water of Abano. The treatments are recognised by the Italian national health service and require a doctor's prescription. The admission medical examination is compulsory and can be done without staying at the hotel.",
      },
      {
        d: "Can I come just for a day?",
        r: "Yes, with the Day Spa formula: pools, grottoes and relaxation area from 9:00 to 18:30. Entry is €35 Monday to Friday and €45 on Saturdays, Sundays and public holidays. On Fridays and Saturdays there is also an evening entry at €29, from 18:00 to 22:30. Booking is online only: places are limited and booking is the only way to guarantee entry.",
      },
      {
        d: "Is the hotel suitable for golfers?",
        r: "Yes: there is a 15,000 m² driving range next to the pools, with putting and pitching greens, open from 9:00 to 18:30. The range fee is €6 for hotel guests and €10 for visitors, and a token of 22 balls costs €3. The Golf Academy offers private lessons by appointment, and our guests get reduced green fees at the Padova, Montecchia and Frassanelle golf clubs, all 10 to 15 minutes away.",
      },
      {
        d: "Is there parking and electric car charging?",
        r: "Parking, covered and open-air, is free. There are eight 11 kW charging points: you charge them yourself through the Next charge or My wallbox apps. The cable is not provided and must be brought with you — it's the most common surprise on arrival.",
      },
      {
        d: "Can I bring my dog?",
        r: "Yes, we welcome small and medium-sized dogs with a supplement of €13 per day, to be mentioned when booking. The dog may stay in the room, in the hall, at Bistrot La Piazza and on the terraces. It cannot enter the park and pool area, the grotto area, the relaxation area, the restaurant at dinner or the breakfast room.",
      },
      {
        d: "Is the tourist tax included?",
        r: "No, it is paid at the hotel in cash: €1.50 per person per day, for a maximum of seven nights. Children under fourteen and people with disabilities are exempt.",
      },
      {
        d: "When is the best time to come?",
        r: "The thermal water is warm all year round, so the pools are a pleasure in winter too. The hotel closes only for the seasonal break, from late November to mid-February.",
      },
      {
        d: "Does the hotel hold sustainability certifications?",
        r: "Yes: Hotel Terme Leonardo is the first thermal hotel in Europe to obtain GSTC certification (Global Sustainable Tourism Council), one of the leading international standards for sustainable tourism.",
      },
    ],
  },

  fr: {
    label: "Questions fréquentes",
    title: "Ce qu'on nous demande le plus souvent",
    voci: [
      {
        d: "Où se trouve l'Hôtel Terme Leonardo ?",
        r: "À Monteortone, Via Monteortone 46, dans la verdure des collines euganéennes et à 1,5 km du centre d'Abano Terme. La gare Terme Euganee Abano-Montegrotto est à 7 km, Padoue à 12 km, l'aéroport de Venise à 60 km.",
      },
      {
        d: "Combien y a-t-il de piscines thermales ?",
        r: "Trois bassins, tous d'eau thermale : un bassin intérieur très lumineux, un bassin extérieur chaud relié à l'intérieur — on passe de dedans à dehors en nageant, et dehors on nage aussi sous un pont entre deux bassins communicants — et un troisième bassin séparé, à l'eau plus fraîche, avec des transats au bord. La profondeur va de 70 cm à 1,42 m : on a pied partout.",
      },
      {
        d: "Quelle est la température de l'eau ?",
        r: "Les bassins intérieurs sont entre 33 et 35 °C, l'extérieur entre 29 et 31 °C. Cela représente 800 m² de plan d'eau, avec plus de 30 transats et sièges à jets massants. Le bonnet de bain est obligatoire dans tout l'espace piscines.",
      },
      {
        d: "Que comprend l'espace bien-être ?",
        r: "L'espace grottes, réservé aux adultes, comporte deux salles : un bio-sauna sec à 45 °C et une grotte humide avec bain turc aux vapeurs thermales. S'y ajoutent des lits de massage, des douches sensorielles à l'aromathérapie, un bain à remous, une cascade d'eau thermale et une cascade de glace. Il n'y a pas de sauna finlandais.",
      },
      {
        d: "Peut-on faire une cure de boue ?",
        r: "Oui. L'hôtel dispose de son propre service, avec des boues affinées 60 à 90 jours dans l'eau thermale salso-bromo-iodique d'Abano. Les cures sont conventionnées avec le service de santé italien et nécessitent une prescription médicale. La visite médicale d'admission est obligatoire et peut se faire sans séjourner à l'hôtel.",
      },
      {
        d: "Peut-on venir seulement pour la journée ?",
        r: "Oui, avec la formule Day Spa : piscines, grottes et espace détente de 9h00 à 18h30. L'entrée coûte 35 € du lundi au vendredi et 45 € le samedi, le dimanche et les jours fériés. Le vendredi et le samedi, il y a aussi l'entrée du soir à 29 €, de 18h00 à 22h30. La réservation se fait exclusivement en ligne : les places sont limitées et la réservation est le seul moyen de garantir l'entrée.",
      },
      {
        d: "L'hôtel convient-il aux golfeurs ?",
        r: "Oui : un practice de 15 000 m² jouxte les piscines, avec putting et pitching green, ouvert de 9h00 à 18h30. Le range fee est de 6 € pour les résidents et 10 € pour les extérieurs, un jeton de 22 balles coûte 3 €. La Golf Academy propose des cours particuliers sur réservation, et nos clients bénéficient de green fees réduits aux golfs de Padova, Montecchia et Frassanelle, tous à 10-15 minutes.",
      },
      {
        d: "Y a-t-il un parking et des bornes de recharge ?",
        r: "Les parkings, couverts et à ciel ouvert, sont gratuits. Il y a huit bornes de 11 kW : la recharge se fait en autonomie via les applications Next charge ou My wallbox. Le câble n'est pas fourni, il faut l'apporter — c'est la surprise la plus fréquente à l'arrivée.",
      },
      {
        d: "Peut-on venir avec son chien ?",
        r: "Oui, nous accueillons les chiens de petite et moyenne taille avec un supplément de 13 € par jour, à signaler dès la réservation. Le chien peut rester en chambre, dans le hall, au Bistrot La Piazza et sur les terrasses. Il ne peut pas accéder au parc et aux piscines, à l'espace grottes, à l'espace détente, au restaurant le soir ni à la salle du petit-déjeuner.",
      },
      {
        d: "La taxe de séjour est-elle comprise ?",
        r: "Non, elle se règle sur place en espèces : 1,50 € par personne et par jour, pour un maximum de sept nuits. Les moins de quatorze ans et les personnes en situation de handicap en sont exemptés.",
      },
      {
        d: "Quelle est la meilleure période pour venir ?",
        r: "L'eau thermale est chaude toute l'année, les piscines se profitent donc aussi en hiver. L'hôtel ne ferme que pour la pause saisonnière, de fin novembre à mi-février.",
      },
      {
        d: "L'hôtel a-t-il des certifications de durabilité ?",
        r: "Oui : l'Hôtel Terme Leonardo est le premier hôtel thermal d'Europe à avoir obtenu la certification GSTC (Global Sustainable Tourism Council), l'un des principaux standards internationaux du tourisme durable.",
      },
    ],
  },
};
