import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Golf() {
  const { t } = useLang();
  const g = t.golf;
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
        </Reveal>
      </div>
    </section>
  );
}
