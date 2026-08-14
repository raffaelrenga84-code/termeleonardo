import { useEffect, useState } from "react";
import { Menu, X, Lock, Gift } from "lucide-react";
import { NAV, PRENOTA_URL, REGALA_URL, loginUrl, dayspaUrl } from "../../data";
import { LANGS } from "../../i18n";
import { LEGAL } from "../../legal";
import { useLang } from "../../LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const L = LEGAL[lang] || LEGAL.it;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labelFor = (href) => t.nav[href.slice(1)] || href;

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${
        scrolled ? "bg-[#F9F6F0] shadow-md border-b border-[#1A3626]/10 py-3" : "py-6"
      }`}
    >
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* due file invece di ricolorare via CSS: il marchio e' incluso come
            immagine e i selettori della pagina non arrivano dentro l'SVG.
            Bianco sopra la foto, nero sulla barra chiara dopo lo scroll. */}
        {/* shrink-0 e spazio a destra: il menu e' largo e senza questi
            il marchio finisce attaccato alla prima voce */}
        <a href="#top" data-testid="nav-logo" className="block shrink-0 pr-8">
          <img
            src={scrolled ? "/logo.svg" : "/logo-bianco.svg"}
            alt="Hotel Terme Leonardo · Abano Terme · 4 stelle"
            className="h-8 md:h-10 w-auto transition-opacity"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.href.slice(1)}`}
              className={`text-sm font-medium transition-colors hover:text-[#B08D57] ${scrolled ? "text-[#1A3626]" : "text-white/90"}`}
            >
              {labelFor(n.href)}
            </a>
          ))}
          <div className="flex items-center gap-1" data-testid="lang-switcher">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                data-testid={`lang-${l.code}`}
                className={`text-xs font-semibold px-1.5 py-0.5 rounded transition-colors ${
                  lang === l.code
                    ? "text-[#B08D57]"
                    : scrolled ? "text-[#1A3626]/50 hover:text-[#1A3626]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            href={`${REGALA_URL}?l=${lang || "it"}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-gift-btn"
            aria-label={t.gift?.label || "Buoni Regalo"}
            title={t.gift?.label || "Buoni Regalo"}
            className={`transition-colors hover:text-[#B08D57] ${scrolled ? "text-[#1A3626]" : "text-white/90"}`}
          >
            <Gift size={18} />
          </a>
          <a
            href={loginUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-login-btn"
            aria-label={L.login}
            title={L.login}
            className={`transition-colors hover:text-[#B08D57] ${scrolled ? "text-[#1A3626]" : "text-white/90"}`}
          >
            <Lock size={18} />
          </a>
          <a
            href={dayspaUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-dayspa-btn"
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[#B08D57] hover:text-[#B08D57] ${scrolled ? "border-[#1A3626]/40 text-[#1A3626]" : "border-white/50 text-white"}`}
          >
            {t.dayspa.bookBtn}
          </a>
          <a
            href={PRENOTA_URL(lang)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-book-btn"
            className="rounded-full bg-[#1A3626] text-[#F9F6F0] px-6 py-2.5 text-sm font-semibold hover:bg-[#B08D57] transition-colors"
          >
            {t.nav.prenota}
          </a>
        </nav>

        <button
          data-testid="nav-menu-toggle"
          className={`lg:hidden ${scrolled ? "text-[#1A3626]" : "text-white"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#F9F6F0] border-t border-[#1A3626]/10 px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                data-testid={`lang-mobile-${l.code}`}
                className={`text-sm font-semibold ${lang === l.code ? "text-[#B08D57]" : "text-[#1A3626]/50"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} data-testid={`nav-mobile-${n.href.slice(1)}`} className="text-[#1A3626] text-base font-medium">
              {labelFor(n.href)}
            </a>
          ))}
          <a href={`${REGALA_URL}?l=${lang || "it"}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} data-testid="nav-mobile-gift" className="flex items-center gap-2 text-[#1A3626] text-base font-medium">
            <Gift size={16} /> {t.gift?.label || "Buoni Regalo"}
          </a>
          <a href={loginUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} data-testid="nav-mobile-login" className="flex items-center gap-2 text-[#1A3626] text-base font-medium">
            <Lock size={16} /> {L.login}
          </a>
          <a href={dayspaUrl(lang)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} data-testid="nav-mobile-dayspa" className="rounded-full border border-[#1A3626] text-[#1A3626] px-6 py-3 text-center font-semibold">
            {t.dayspa.bookBtn}
          </a>
          <a href={PRENOTA_URL(lang)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="rounded-full bg-[#1A3626] text-[#F9F6F0] px-6 py-3 text-center font-semibold">
            {t.nav.prenota}
          </a>
        </div>
      )}
    </header>
  );
}
