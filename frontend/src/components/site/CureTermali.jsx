import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";
import Foto from "./Foto";

export default function CureTermali() {
  const { t } = useLang();
  const c = t.cure;
  return (
    <section id="cure" data-testid="cure-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl h-[460px] group">
              <Foto foto={IMG.fango} alt="" sizes="(min-width: 1024px) 620px, 100vw"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
          </Reveal>
          <Reveal>
            <Label>{c.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{c.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">{c.body}</p>
            <div className="mt-8 space-y-5">
              {c.points.map((p) => (
                <div key={p.t} className="border-l-2 border-[#B08D57] pl-4">
                  <h3 className="font-serif-display text-xl text-[#1A3626]">{p.t}</h3>
                  <p className="text-sm text-[#5A5A5A] mt-1">{p.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#8A6A38] font-semibold mt-6 whitespace-pre-line">{c.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
