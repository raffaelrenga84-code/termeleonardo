import { Reveal, Label } from "./Reveal";
import { UtensilsCrossed, Clock, Download } from "lucide-react";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";

/* I tre menu in PDF. Stavano solo nella pagina "welcome" del sito vecchio,
   dove non ci arriva nessuno: qui sono accanto alla descrizione del posto
   che raccontano. Tutti e tre verificati raggiungibili. */
const MENU_PDF = [
  { k: "bistro", file: "hotel-terme-leonardo-menu-bistro.pdf" },
  { k: "bar", file: "hotel-terme-leonardo-bar-menu.pdf" },
  { k: "vini", file: "listino-vini.pdf" },
];

export default function Dining() {
  const { t } = useLang();
  const d = t.dining;
  /* le etichette dei PDF stanno in t.booking accanto agli altri testi dei
     moduli, dove sono state aggiunte in tutte e quattro le lingue */
  const etichette = (t.booking && t.booking.menuPdf) || {};
  return (
    <section id="ristorante" data-testid="dining-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label>{d.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{d.title}</h2>
          <p className="text-[#5A5A5A] text-lg mt-5">{d.body}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 mt-12 items-stretch">
          <Reveal>
            <div className="overflow-hidden rounded-2xl h-full min-h-[320px] group">
              <img src={IMG.dining} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <UtensilsCrossed size={20} className="text-[#B08D57]" />
                <h3 className="font-serif-display text-2xl text-[#1A3626]">{d.formulasTitle}</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {d.formulas.map((f) => (
                  <div key={f.name} data-testid={`formula-${f.name}`} className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
                    <h4 className="font-serif-display text-xl text-[#1A3626]">{f.name}</h4>
                    <p className="text-sm text-[#5A5A5A] mt-2">{f.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#5A5A5A] italic border-l-2 border-[#B08D57] pl-4">{d.noteFull}</p>
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <Reveal>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 h-full">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[#B08D57]" />
                <h3 className="font-serif-display text-2xl text-[#1A3626]">{d.hoursTitle}</h3>
              </div>
              <ul className="mt-6 divide-y divide-dashed divide-[#E5E0D8]">
                {d.hours.map((h) => (
                  <li key={h.t} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-[#1A3626] font-medium">{h.t}</span>
                    <span className="text-sm text-[#5A5A5A] shrink-0">{h.d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#1A3626] text-white rounded-2xl p-8 h-full flex flex-col justify-center">
              <span className="text-xs uppercase tracking-label text-[#E7C98B]">Bistrot</span>
              <h3 className="font-serif-display text-3xl mt-3">{d.bistroTitle}</h3>
              <p className="text-white/75 mt-4">{d.bistroDesc}</p>

              <div className="mt-7 flex flex-col gap-2.5">
                {MENU_PDF.map((m) => (
                  <a
                    key={m.k}
                    href={`https://www.termeleonardo.com/pdf/${m.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`dining-pdf-${m.k}`}
                    className="flex items-center gap-2.5 text-[15px] text-[#E7C98B] hover:text-white transition-colors"
                  >
                    <Download size={16} className="shrink-0" />
                    {etichette[m.k] || m.k}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
