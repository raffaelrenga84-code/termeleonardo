import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLang } from "../../LanguageContext";

const FUNZIONE = "https://mvuiuwakuseockotlcnp.supabase.co/functions/v1/chat";

/* Testi del widget. Stanno qui e non in i18n.js perche' riguardano solo
   questo componente: tenerli vicini a chi li usa evita che restino orfani
   il giorno che il widget cambia. */
const T = {
  it: {
    apri: "Chiedi qualcosa",
    titolo: "Assistente dell'hotel",
    sotto: "Risposte automatiche · la reception risponde allo +39 049 9939200",
    ph: "Scriva la sua domanda…",
    invia: "Invia",
    benvenuto:
      "Buongiorno. Sono l'assistente automatico dell'Hotel Terme Leonardo: posso darle informazioni su camere, Day Spa, cure e trattamenti, e passare la sua richiesta alla reception.\n\nI dati che mi lascia servono solo a gestire la sua richiesta. L'informativa completa è nel footer del sito.",
    errore:
      "Non riesco a rispondere in questo momento. Ci scriva a info@termeleonardo.com o chiami la reception allo +39 049 9939200.",
    chiudi: "Chiudi",
  },
  de: {
    apri: "Fragen Sie uns",
    titolo: "Hotel-Assistent",
    sotto: "Automatische Antworten · Rezeption: +39 049 9939200",
    ph: "Ihre Frage…",
    invia: "Senden",
    benvenuto:
      "Guten Tag. Ich bin der automatische Assistent des Hotels Terme Leonardo: Ich informiere Sie über Zimmer, Day Spa, Kuren und Anwendungen und leite Ihre Anfrage an die Rezeption weiter.\n\nIhre Daten dienen ausschließlich der Bearbeitung Ihrer Anfrage. Die vollständige Datenschutzerklärung finden Sie im Footer.",
    errore:
      "Ich kann im Moment nicht antworten. Schreiben Sie an info@termeleonardo.com oder rufen Sie die Rezeption unter +39 049 9939200 an.",
    chiudi: "Schließen",
  },
  en: {
    apri: "Ask us",
    titolo: "Hotel assistant",
    sotto: "Automated answers · reception: +39 049 9939200",
    ph: "Your question…",
    invia: "Send",
    benvenuto:
      "Good morning. I'm the automated assistant of Hotel Terme Leonardo: I can tell you about rooms, the Day Spa, thermal cures and treatments, and pass your request to reception.\n\nThe details you give me are used only to handle your request. The full privacy notice is in the site footer.",
    errore:
      "I can't answer right now. Please write to info@termeleonardo.com or call reception on +39 049 9939200.",
    chiudi: "Close",
  },
  fr: {
    apri: "Posez une question",
    titolo: "Assistant de l'hôtel",
    sotto: "Réponses automatiques · réception : +39 049 9939200",
    ph: "Votre question…",
    invia: "Envoyer",
    benvenuto:
      "Bonjour. Je suis l'assistant automatique de l'Hôtel Terme Leonardo : je peux vous renseigner sur les chambres, le Day Spa, les cures et les soins, et transmettre votre demande à la réception.\n\nLes données que vous me confiez servent uniquement à traiter votre demande. La politique complète est dans le pied de page.",
    errore:
      "Je ne peux pas répondre pour le moment. Écrivez à info@termeleonardo.com ou appelez la réception au +39 049 9939200.",
    chiudi: "Fermer",
  },
};

/* Il modello risponde in markdown. Invece di aggiungere una libreria per
   grassetto e link, si sfugge tutto l'HTML e si riconoscono solo quelle due
   cose: cosi' non c'e' modo di iniettare markup, nemmeno se il modello
   venisse indotto a produrlo. */
function formatta(testo) {
  const esc = String(testo)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    /* solo http/https: un link javascript: non deve poter passare */
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>')
    .replace(/\n/g, "<br />");
}

export default function ChatWidget() {
  const { lang } = useLang();
  const t = T[lang] || T.it;
  const [aperto, setAperto] = useState(false);
  const [messaggi, setMessaggi] = useState([]);
  const [bozza, setBozza] = useState("");
  const [attesa, setAttesa] = useState(false);
  const fondo = useRef(null);
  const sessione = useRef(null);

  if (!sessione.current) {
    /* un identificativo per conversazione, non per persona: serve solo a
       tenere insieme le battute nel registro */
    sessione.current = Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  /* il benvenuto cambia con la lingua finche' non si e' scritto niente */
  useEffect(() => {
    if (!messaggi.length || (messaggi.length === 1 && messaggi[0].ruolo === "assistente")) {
      setMessaggi([{ ruolo: "assistente", testo: t.benvenuto }]);
    }
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (aperto) fondo.current?.scrollIntoView({ behavior: "smooth" });
  }, [messaggi, aperto]);

  const invia = async (e) => {
    e?.preventDefault();
    const testo = bozza.trim();
    if (!testo || attesa) return;
    const storia = [...messaggi, { ruolo: "utente", testo }];
    setMessaggi(storia);
    setBozza("");
    setAttesa(true);
    try {
      const r = await fetch(FUNZIONE, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lingua: lang,
          sessione: sessione.current,
          /* l'informativa e' nel primo messaggio, che l'ospite ha davanti
             prima di poter scrivere: senza, il server rifiuta di registrare
             qualunque richiesta */
          privacy_vista: true,
          messaggi: storia,
        }),
      });
      const d = await r.json().catch(() => ({}));
      setMessaggi([...storia, { ruolo: "assistente", testo: d.risposta || t.errore }]);
    } catch (err) {
      console.error(err);
      setMessaggi([...storia, { ruolo: "assistente", testo: t.errore }]);
    } finally {
      setAttesa(false);
    }
  };

  return (
    <>
      {!aperto && (
        <button
          onClick={() => setAperto(true)}
          data-testid="chat-apri"
          aria-label={t.apri}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#1A3626] text-[#F9F6F0] pl-4 pr-5 py-3.5 shadow-lg hover:bg-[#B08D57] transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-sm font-semibold hidden sm:inline">{t.apri}</span>
        </button>
      )}

      {aperto && (
        <div
          data-testid="chat-pannello"
          /* a schermo pieno sul telefono, riquadro sul desktop: una finestrella
             di 380px su un telefono e' inutilizzabile */
          className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:h-[600px] z-[60] flex flex-col bg-[#F9F6F0] sm:rounded-2xl shadow-2xl border border-[#E5E0D8] overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3 bg-[#1A3626] text-[#F9F6F0] px-4 py-3">
            <div>
              <div className="font-semibold text-sm">{t.titolo}</div>
              <div className="text-[11px] text-white/70 leading-snug">{t.sotto}</div>
            </div>
            <button onClick={() => setAperto(false)} aria-label={t.chiudi}
              data-testid="chat-chiudi" className="shrink-0 p-1 hover:text-[#E7C98B]">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messaggi.map((m, i) => (
              <div key={i}
                className={m.ruolo === "utente" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed ${
                    m.ruolo === "utente"
                      ? "bg-[#1A3626] text-[#F9F6F0]"
                      : "bg-white text-[#1C1C1C] border border-[#E5E0D8]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatta(m.testo) }}
                />
              </div>
            ))}
            {attesa && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white border border-[#E5E0D8] px-3.5 py-2.5">
                  <Loader2 className="animate-spin text-[#5A5A5A]" size={16} />
                </div>
              </div>
            )}
            <div ref={fondo} />
          </div>

          <form onSubmit={invia} className="flex items-end gap-2 border-t border-[#E5E0D8] bg-white p-3">
            <textarea
              data-testid="chat-testo"
              value={bozza}
              onChange={(e) => setBozza(e.target.value)}
              onKeyDown={(e) => {
                /* invio manda, maiuscolo+invio va a capo: e' quello che la
                   gente si aspetta da una chat */
                if (e.key === "Enter" && !e.shiftKey) invia(e);
              }}
              rows={1}
              placeholder={t.ph}
              className="flex-1 resize-none rounded-xl border border-[#E5E0D8] bg-[#F9F6F0] px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-[#1A3626] max-h-28"
            />
            <button type="submit" disabled={attesa || !bozza.trim()}
              data-testid="chat-invia" aria-label={t.invia}
              className="shrink-0 rounded-xl bg-[#1A3626] text-[#F9F6F0] p-2.5 disabled:opacity-40 hover:bg-[#B08D57] transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
