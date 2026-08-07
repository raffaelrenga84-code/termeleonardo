import { Reveal, Label } from "./Reveal";
import { Gift, Check } from "lucide-react";
import { useLang } from "../../LanguageContext";

export default function GiftVouchers() {
  const { t } = useLang();
  const g = t.gift;
  if (!g) return null;
  return (
    <section id="regali" data-testid="gift-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label>{g.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{g.title}</h2>
          <p className="text-[#5A5A5A] text-lg mt-5">{g.body}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {g.cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <div data-testid={`gift-card-${i}`} className="group h-full bg-white rounded-2xl border border-[#E5E0D8] p-8 flex flex-col hover:border-[#B08D57] transition-colors">
                <Gift size={26} className="text-[#B08D57]" />
                <h3 className="font-serif-display text-2xl text-[#1A3626] mt-5">{c.name}</h3>
                <p className="text-sm text-[#5A5A5A] mt-3 flex-grow">{c.desc}</p>
                <div className="mt-6 pt-5 border-t border-[#E5E0D8]">
                  <span className="text-xs text-[#5A5A5A]">{g.from}</span>
                  <div className="font-serif-display text-4xl text-[#B08D57]">€ {c.price}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1A3626] rounded-2xl p-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {g.conditions.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-white/80">
                  <Check size={15} className="text-[#E7C98B] shrink-0" /> {c}
                </li>
              ))}
            </ul>
            <a href="#prenota" data-testid="gift-cta" className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#B08D57] text-white px-8 py-4 text-sm font-semibold hover:bg-[#E7C98B] hover:text-[#1A3626] transition-colors">
              {g.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
