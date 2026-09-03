import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";
import Foto from "./Foto";

export default function Rooms() {
  const { t } = useLang();
  const r = t.rooms;
  return (
    <section id="camere" data-testid="rooms-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 overflow-hidden rounded-2xl h-[420px] group">
                <Foto foto={IMG.roomView} alt="" sizes="(min-width: 1024px) 370px, 60vw"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="col-span-2 overflow-hidden rounded-2xl h-[420px] mt-12 group">
                <Foto foto={IMG.roomBalcony} alt="" sizes="(min-width: 1024px) 250px, 40vw"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Label>{r.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{r.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">{r.body}</p>
            <div className="flex gap-10 mt-10">
              <div><div className="font-serif-display text-5xl text-[#B08D57]">77</div><div className="text-sm text-[#5A5A5A] mt-1">{r.camere}</div></div>
              <div><div className="font-serif-display text-5xl text-[#B08D57]">21</div><div className="text-sm text-[#5A5A5A] mt-1">{r.suite}</div></div>
            </div>
            <a href="#rooms-gallery-section" data-testid="rooms-cta" className="inline-block mt-10 rounded-full bg-[#1A3626] text-[#F9F6F0] px-8 py-4 text-sm font-semibold hover:bg-[#B08D57] transition-colors">{r.cta}</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
