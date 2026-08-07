import { Reveal, Label } from "./Reveal";
import { Plane } from "lucide-react";
import { useLang } from "../../LanguageContext";

export default function Transfer() {
  const { t } = useLang();
  const tr = t.transfer;
  return (
    <section id="transfer" data-testid="transfer-section" className="py-24 md:py-32 bg-[#12241A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <Reveal className="lg:col-span-2">
            <Label className="text-[#E7C98B]">{tr.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-5 leading-tight font-light">{tr.title}</h2>
            <p className="text-white/70 text-lg mt-5">{tr.body}</p>
            <div className="mt-8 bg-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 text-[#E7C98B]">
                <Plane size={18} /> <span className="font-serif-display text-xl">{tr.excursionsTitle}</span>
              </div>
              <p className="text-sm text-white/70 mt-3">{tr.excursions}</p>
            </div>
            <a href="#prenota" data-testid="transfer-cta" className="inline-block mt-8 rounded-full bg-[#B08D57] text-white px-8 py-4 text-sm font-semibold hover:bg-[#E7C98B] hover:text-[#1A3626] transition-colors">{tr.cta}</a>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={0.12}>
            <div className="divide-y divide-white/10">
              {tr.items.map((it) => (
                <div key={it.r} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <div className="text-white font-medium">{it.r}</div>
                    {it.note && <div className="text-xs text-white/50 mt-1">{it.note}</div>}
                  </div>
                  <div className="font-serif-display text-xl text-[#E7C98B] shrink-0 text-right">{it.p}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
