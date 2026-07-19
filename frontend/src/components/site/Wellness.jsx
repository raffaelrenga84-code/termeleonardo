import { Reveal, Label } from "./Reveal";
import { IMG, WELLNESS_FEATURES } from "../../data";

export default function Wellness() {
  return (
    <section id="benessere" data-testid="wellness-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal className="order-2 lg:order-1">
            <Label>Benessere</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">
              Un'oasi per corpo e mente
            </h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">
              Nel cuore di Monteortone, immergiti nelle piscine termali a 30–35°C,
              rilassati nelle grotte sudatorie naturali e lasciati avvolgere dalle
              docce emozionali. Un percorso rigenerante che rende il Terme Leonardo
              uno degli alberghi più apprezzati ad Abano Terme.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mt-10">
              {WELLNESS_FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="border-l-2 border-[#B08D57] pl-4">
                    <h3 className="font-serif-display text-xl text-[#1A3626]">{f.title}</h3>
                    <p className="text-sm text-[#5A5A5A] mt-1">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl col-span-2 h-72 group">
                <img src={IMG.wellnessPool} alt="Piscine termali" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-2xl h-56 group">
                <img src={IMG.spaMassage} alt="Massaggio" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="rounded-2xl h-56 bg-[#1A3626] text-[#F9F6F0] flex flex-col justify-center px-6">
                <span className="font-serif-display text-5xl text-[#E7C98B]">35°C</span>
                <span className="text-sm mt-2 text-white/80">La temperatura naturale delle nostre acque termali</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
