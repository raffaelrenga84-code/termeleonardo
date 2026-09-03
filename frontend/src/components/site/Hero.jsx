import { ChevronDown } from "lucide-react";
import { IMG, PRENOTA_URL } from "../../data";
import { useLang } from "../../LanguageContext";
import Foto from "./Foto";

/* Le due animazioni d'ingresso (la foto che si avvicina, il testo che sale)
   sono in CSS, in index.css: prima le faceva framer-motion, che per questo
   e per le dissolvenze allo scorrimento costava 110 KB di JavaScript da
   scaricare prima di vedere qualcosa. */

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-screen flex items-end overflow-hidden">
      {/* priorita: e' la foto su cui si misura quanto ci mette la pagina ad
          aprirsi, e public/index.html la preannuncia con un preload */}
      <Foto foto={IMG.heroPool} alt="Hotel Terme Leonardo" sizes="100vw" priorita
        className="absolute inset-0 w-full h-full object-cover hero-foto" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
      <div className="relative max-w-7xl mx-auto px-6 w-full pb-20 md:pb-28">
        <div className="max-w-3xl hero-testo">
          <span className="inline-block text-xs uppercase tracking-label text-white/90 font-semibold mb-6">{h.badge}</span>
          <h1 className="font-serif-display text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light">
            {h.title1} <em className="text-[#E7C98B]">{h.titleEm}</em>
          </h1>
          <p className="text-white/85 text-lg md:text-xl mt-8 max-w-xl font-light">{h.subtitle}</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href={PRENOTA_URL(lang)} target="_blank" rel="noopener noreferrer" data-testid="hero-book-btn"
              className="rounded-full bg-[#F9F6F0] text-[#1A3626] px-8 py-4 text-sm font-semibold hover:bg-[#B08D57] hover:text-white transition-colors">{h.book}</a>
            <a href="#benessere" data-testid="hero-discover-btn"
              className="rounded-full border border-white/60 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-colors">{h.discover}</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-white/70 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-label rotate-90 origin-center mb-6">{h.scroll}</span>
        <ChevronDown className="animate-bounce" size={20} />
      </div>
    </section>
  );
}
