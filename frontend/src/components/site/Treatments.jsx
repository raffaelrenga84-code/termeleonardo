import { Reveal, Label } from "./Reveal";
import { useLang } from "../../LanguageContext";
import { RICHIESTA_URL } from "../../data";

export default function Treatments() {
  const { t, lang } = useLang();
  const tr = t.treatments;
  /* l'etichetta sta in t.booking accanto agli altri testi dei moduli di
     richiesta, che vivono li' in tutte e quattro le lingue */
  const b = t.booking;
  return (
    <section id="trattamenti" data-testid="treatments-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label>{tr.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{tr.title}</h2>
          <p className="text-[#5A5A5A] text-lg mt-5">{tr.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 md:p-10">
            <h3 className="font-serif-display text-2xl text-[#1A3626]">{tr.menuTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-1 mt-6">
              {tr.items.map((it) => (
                <div key={it.n} className="flex items-baseline justify-between gap-3 py-3 border-b border-dashed border-[#E5E0D8]">
                  <div>
                    <span className="text-[#1A3626] font-medium">{it.n}</span>
                    <span className="text-xs text-[#5A5A5A] ml-2">{it.d}</span>
                  </div>
                  <span className="font-serif-display text-xl text-[#B08D57] shrink-0">{tr.from} €{it.p}</span>
                </div>
              ))}
            </div>
            {/* il listino c'era ma non c'era modo di chiedere niente: chi lo
                leggeva doveva cercarsi il telefono da solo */}
            <a href={RICHIESTA_URL("trattamenti", lang)} target="_blank" rel="noopener noreferrer"
              data-testid="treatments-cta"
              className="inline-block mt-8 rounded-full bg-[#1A3626] text-[#F9F6F0] px-8 py-4 text-sm font-semibold hover:bg-[#B08D57] transition-colors">
              {b.ctaSpa}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
