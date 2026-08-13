import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal, Label } from "./Reveal";
import { useLang } from "../../LanguageContext";
import { FAQ } from "../../faq";

export default function Faq() {
  const { lang } = useLang();
  const f = FAQ[lang] || FAQ.it;
  /* aperta una alla volta: un elenco tutto aperto e' un muro di testo, e
     chi cerca una risposta precisa deve poterla trovare a colpo d'occhio */
  const [aperta, setAperta] = useState(null);

  return (
    <section id="faq" data-testid="faq-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <Label>{f.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-5xl text-[#1A3626] mt-5 leading-tight font-light">
            {f.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="divide-y divide-[#E5E0D8] border-y border-[#E5E0D8]">
            {f.voci.map((v, i) => {
              const isAperta = aperta === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setAperta(isAperta ? null : i)}
                    data-testid={`faq-domanda-${i}`}
                    aria-expanded={isAperta}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                  >
                    <span className="text-[#1A3626] font-medium text-[17px] leading-snug group-hover:text-[#B08D57] transition-colors">
                      {v.d}
                    </span>
                    <span className="shrink-0 mt-1 text-[#B08D57]">
                      {isAperta ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  {isAperta && (
                    <p data-testid={`faq-risposta-${i}`}
                      className="pb-6 pr-10 text-[#5A5A5A] leading-relaxed">
                      {v.r}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
