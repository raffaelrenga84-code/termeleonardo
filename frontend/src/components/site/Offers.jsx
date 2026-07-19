import { Reveal, Label } from "./Reveal";
import { OFFERS } from "../../data";

export default function Offers() {
  return (
    <section id="offerte" data-testid="offers-section" className="py-24 md:py-32 bg-[#1A3626]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label className="text-[#E7C98B]">Offerte & Day Spa</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-white mt-5 leading-tight font-light">
            Pacchetti su misura per il tuo relax
          </h2>
          <p className="text-white/75 text-lg mt-5">
            Con la formula Day Spa accedi alle piscine e all'area wellness anche
            senza pernottare. Scopri le offerte dedicate per una giornata o un
            soggiorno più lungo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {OFFERS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <div
                data-testid={`offer-card-${i}`}
                className={`group h-full rounded-2xl p-7 flex flex-col transition-colors duration-500 ${
                  o.featured
                    ? "bg-[#B08D57] text-white"
                    : "bg-[#22452F] text-white hover:bg-[#B08D57]"
                }`}
              >
                <span className="text-xs uppercase tracking-label text-[#E7C98B]">{o.tag}</span>
                <h3 className="font-serif-display text-2xl mt-4">{o.title}</h3>
                <p className="text-sm text-white/75 mt-3 flex-grow">{o.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <span className="text-xs text-white/60">a partire da</span>
                  <div className="font-serif-display text-4xl">€ {o.price}</div>
                  <span className="text-xs text-white/60">{o.unit}</span>
                </div>
                <a href="#prenota" data-testid={`offer-cta-${i}`} className="mt-5 rounded-full bg-white/10 hover:bg-white/20 text-white text-center py-2.5 text-sm font-semibold transition-colors">
                  Richiedi
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
