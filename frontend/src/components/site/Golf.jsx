import { Reveal, Label } from "./Reveal";
import { IMG, RICHIESTA_URL } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Golf() {
  const { t, lang } = useLang();
  const g = t.golf;
  /* le etichette dei pulsanti stanno dentro t.booking e non dentro t.golf:
     sono state aggiunte accanto agli altri testi dei moduli di richiesta,
     che vivono li' in tutte e quattro le lingue */
  const b = t.booking;
  return (
    <section id="golf" data-testid="golf-section" className="relative py-24 md:py-32 overflow-hidden">
      <img src={IMG.golf} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#1A3626]/75" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label className="text-[#E7C98B]">{g.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-white mt-5 leading-tight font-light">{g.title}</h2>
          <p className="text-white/85 text-lg mt-6">{g.body}</p>
          <div className="flex flex-wrap gap-10 mt-12">
            {g.stats.map((s) => (
              <div key={s.l}>
                <div className="font-serif-display text-4xl text-[#E7C98B]">{s.n}</div>
                <div className="text-sm text-white/70 mt-1 max-w-[140px]">{s.l}</div>
              </div>
            ))}
          </div>

          {/* La convenzione coi circoli e i due modi di giocare: il green fee
              fuori, la lezione sul campo pratica nostro. Sono due richieste
              diverse e due pulsanti diversi: unirli costringerebbe l'ospite
              a spiegare a parole cosa vuole. */}
          <div className="mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-white/85 text-[15px] leading-relaxed">{b.golfConv}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href={RICHIESTA_URL("greenfee", lang)} target="_blank" rel="noopener noreferrer"
                data-testid="golf-cta-greenfee"
                className="rounded-full bg-[#B08D57] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#E7C98B] hover:text-[#1A3626] transition-colors">
                {b.ctaGreen}
              </a>
              <a href={RICHIESTA_URL("maestro", lang)} target="_blank" rel="noopener noreferrer"
                data-testid="golf-cta-maestro"
                className="rounded-full border border-white/50 text-white px-7 py-3.5 text-sm font-semibold hover:border-[#E7C98B] hover:text-[#E7C98B] transition-colors">
                {b.ctaMaestro}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
