import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./i18n";

const LanguageContext = createContext();

const LINGUE = ["it", "de", "fr", "en"];

/* La lingua sta nell'indirizzo, non solo in localStorage: un link
   condiviso deve arrivare all'altro nella lingua in cui l'hai letto.
   Si usa un parametro invece di un percorso per non introdurre il router
   e non dover configurare le riscritture su Vercel. */
function linguaIniziale() {
  const daUrl = new URLSearchParams(window.location.search).get("lang");
  if (LINGUE.includes(daUrl)) return daUrl;
  const salvata = localStorage.getItem("tl_lang");
  if (LINGUE.includes(salvata)) return salvata;
  const browser = (navigator.language || "").slice(0, 2).toLowerCase();
  return LINGUE.includes(browser) ? browser : "it";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(linguaIniziale);

  useEffect(() => {
    localStorage.setItem("tl_lang", lang);
    /* l'attributo lang del documento serve a Google e ai lettori di
       schermo: lasciarlo su "en" mentre la pagina e' in italiano li
       manda fuori strada */
    document.documentElement.lang = lang;
    /* replaceState e non pushState: cambiare lingua non deve riempire
       la cronologia di passi indietro */
    const url = new URL(window.location.href);
    if (url.searchParams.get("lang") !== lang) {
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url.toString());
    }
  }, [lang]);

  const t = translations[lang] || translations.it;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
