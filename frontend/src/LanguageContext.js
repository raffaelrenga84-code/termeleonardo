import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("tl_lang") || "it");
  useEffect(() => { localStorage.setItem("tl_lang", lang); }, [lang]);
  const t = translations[lang] || translations.it;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
