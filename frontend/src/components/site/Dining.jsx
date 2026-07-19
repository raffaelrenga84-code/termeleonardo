import { Reveal, Label } from "./Reveal";
import { IMG } from "../../data";

export default function Dining() {
  return (
    <section id="ristorante" data-testid="dining-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <Label>Gusto & Cucina Veneta</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">
              I sapori autentici del territorio
            </h2>
            <p className="text-[#5A5A5A] text-lg mt-6 max-w-lg">
              Benessere, gusto e relax nel cuore di Abano Terme. Nel nostro
              ristorante e Bistrot potrai assaporare la cucina veneta con
              ingredienti freschi e genuini, per un'esperienza unica di armonia
              tra sapore e territorio.
            </p>
            <ul className="mt-8 space-y-3">
              {["Ristorante con cucina veneta", "Bistrot informale", "Ingredienti freschi e locali", "Menù dedicati al benessere"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[#1A3626]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl h-[460px] group">
              <img src={IMG.dining} alt="Cucina veneta" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
