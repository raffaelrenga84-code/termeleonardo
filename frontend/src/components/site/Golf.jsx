import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";

export default function Golf() {
  return (
    <section id="golf" data-testid="golf-section" className="relative py-24 md:py-32 overflow-hidden">
      <img src={IMG.golf} alt="Campo pratica golf" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#1A3626]/75" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label className="text-[#E7C98B]">Sport & Natura</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-white mt-5 leading-tight font-light">
            Gioca, respira, rilassati
          </h2>
          <p className="text-white/85 text-lg mt-6">
            Circondato da un parco privato, l'hotel con campo pratica golf ad Abano
            Terme è il rifugio perfetto per chi ama sport, natura e tranquillità.
            La scelta ideale per chi cerca il giusto equilibrio tra movimento dolce,
            relax e benessere nei Colli Euganei.
          </p>
          <div className="flex flex-wrap gap-10 mt-12">
            {[
              { n: "1 km", l: "dal centro di Abano" },
              { n: "Parco", l: "privato immerso nel verde" },
              { n: "Golf", l: "campo pratica dedicato" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif-display text-4xl text-[#E7C98B]">{s.n}</div>
                <div className="text-sm text-white/70 mt-1 max-w-[140px]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
