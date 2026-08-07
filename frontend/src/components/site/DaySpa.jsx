import { Reveal, Label } from "./Reveal";
import { Check } from "lucide-react";
import { IMG, DAYSPA_URL } from "../../data";
import { useLang } from "../../LanguageContext";

export default function DaySpa() {
  const { t } = useLang();
  const d = t.dayspa;
  return (
    <section id="dayspa" data-testid="dayspa-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <Reveal>
            <Label>{d.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{d.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">{d.intro}</p>
            <p className="text-sm text-[#B08D57] font-semibold mt-4">{d.orari}</p>
            <div className="mt-8 overflow-hidden rounded-2xl h-72 group">
              <img src={IMG.spaMassage} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
              {d.incluso.map((tx) => (
                <li key={tx} className="flex items-center gap-3 text-[#1A3626]">
                  <Check size={16} className="text-[#B08D57] shrink-0" /> <span className="text-sm">{tx}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="bg-[#1A3626] rounded-2xl p-8 md:p-10">
              <h3 className="font-serif-display text-3xl text-white">{d.panelTitle}</h3>
              <div className="mt-8 space-y-4">
                {d.prezzi.map((p) => (
                  <div key={p.nome} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="text-white font-semibold">{p.nome}</div>
                      <div className="text-sm text-white/60">{p.sub}</div>
                      <div className="text-xs text-[#E7C98B] mt-1">{p.note}</div>
                    </div>
                    <div className="text-right shrink-0"><span className="font-serif-display text-3xl text-[#E7C98B]">€{p.price}</span></div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-5">{d.disclaimer}</p>
              <a href={DAYSPA_URL} target="_blank" rel="noopener noreferrer" data-testid="dayspa-book-btn"
                className="mt-7 w-full inline-flex items-center justify-center rounded-full bg-[#B08D57] text-white py-4 font-semibold hover:bg-[#E7C98B] hover:text-[#1A3626] transition-colors">{d.bookBtn}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
