import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Wellness() {
  const { t } = useLang();
  const w = t.wellness;
  return (
    <section id="benessere" data-testid="wellness-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal className="order-2 lg:order-1">
            <Label>{w.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{w.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">{w.body}</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mt-10">
              {/* Una scheda puo' portare altrove: «Centro Benessere» descrive
                  esattamente la sezione dei massaggi, che pero' non era
                  raggiungibile da nessuna parte — non c'e' una voce sua nella
                  barra in alto, e la barra e' gia' piena. Chi cercava un
                  massaggio leggeva quella riga e non aveva dove andare.

                  Il collegamento sta nel DATO e non in una posizione fissa
                  della griglia: se domani le schede cambiano ordine o numero,
                  resta attaccato alla scheda giusta invece che alla quinta.

                  La freccia e il testo lo dicono: una scheda cliccabile che
                  non sembra cliccabile e' un pulsante che nessuno preme —
                  in questo progetto e' gia' successo con la bolla della chat. */}
              {w.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="border-l-2 border-[#B08D57] pl-4">
                    <h3 className="font-serif-display text-xl text-[#1A3626]">{f.title}</h3>
                    <p className="text-sm text-[#5A5A5A] mt-1">{f.desc}</p>
                    {f.href && (
                      <a href={f.href} data-testid="wellness-vai-trattamenti"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3626] mt-2 border-b border-[#B08D57] pb-0.5 hover:text-[#B08D57] transition-colors">
                        {f.vai}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl col-span-2 h-72 group">
                <img src={IMG.wellnessPool} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-2xl h-56 group">
                <img src={IMG.spaMassage} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="rounded-2xl h-56 bg-[#1A3626] text-[#F9F6F0] flex flex-col justify-center px-6">
                <span className="font-serif-display text-5xl text-[#E7C98B]">35°C</span>
                <span className="text-sm mt-2 text-white/80">{w.tempCaption}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
