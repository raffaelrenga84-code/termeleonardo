import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Dining() {
  const { t } = useLang();
  const d = t.dining;
  return (
    <section id="ristorante" data-testid="dining-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <Label>{d.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{d.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">{d.body}</p>
            <ul className="mt-8 space-y-3">
              {d.list.map((tx) => (
                <li key={tx} className="flex items-center gap-3 text-[#1A3626]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" /> {tx}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl h-[460px] group">
              <img src={IMG.dining} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
