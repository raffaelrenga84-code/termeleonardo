import { Reveal, Label } from "./Reveal";
import { OFFERS } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Offers() {
  const { t } = useLang();
  const o = t.offers;
  return (
    <section id="offerte" data-testid="offers-section" className="py-24 md:py-32 bg-[#1A3626]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label className="text-[#E7C98B]">{o.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-white mt-5 leading-tight font-light">{o.title}</h2>
          <p className="text-white/75 text-lg mt-5">{o.body}</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {OFFERS.map((offer, i) => {
            const c = o.cards[i];
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div data-testid={`offer-card-${i}`} className="group relative h-full min-h-[380px] rounded-2xl overflow-hidden flex flex-col justify-end">
                  <img src={offer.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className={`absolute inset-0 ${offer.featured ? "bg-gradient-to-t from-[#1A3626]/95 via-[#1A3626]/50 to-transparent" : "bg-gradient-to-t from-black/85 via-black/40 to-transparent"}`} />
                  <div className="relative p-7 text-white">
                    <span className="text-xs uppercase tracking-label text-[#E7C98B]">{c.tag}</span>
                    <h3 className="font-serif-display text-2xl mt-3">{c.title}</h3>
                    <p className="text-sm text-white/80 mt-2">{c.desc}</p>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] text-white/60 block">{o.from}</span>
                        <span className="font-serif-display text-3xl">€ {offer.price}</span>
                      </div>
                      <a href={`https://www.termeleonardo.com/offerte/${offer.slug}`} target="_blank" rel="noopener noreferrer" data-testid={`offer-cta-${i}`} className="rounded-full bg-white/15 hover:bg-[#B08D57] backdrop-blur-sm text-white px-5 py-2 text-sm font-semibold transition-colors">{o.request}</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
