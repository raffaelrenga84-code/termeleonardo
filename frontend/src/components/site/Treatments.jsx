import { Reveal, Label } from "./Reveal";
import { useLang } from "../../LanguageContext";
import { RICHIESTA_URL } from "../../data";

export default function Treatments() {
  const { t, lang } = useLang();
  const tr = t.treatments;
  /* l'etichetta sta in t.booking accanto agli altri testi dei moduli di
     richiesta, che vivono li' in tutte e quattro le lingue */
  const b = t.booking;
  return (
    <section id="trattamenti" data-testid="treatments-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label>{tr.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{tr.title}</h2>
          <p className="text-[#5A5A5A] text-lg mt-5">{tr.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 md:p-10">
            <h3 className="font-serif-display text-2xl text-[#1A3626]">{tr.menuTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-1 mt-6">
              {tr.items.map((it) => (
                <div key={it.n} className="flex items-baseline justify-between gap-3 py-3 border-b border-dashed border-[#E5E0D8]">
                  <div>
                    <span className="text-[#1A3626] font-medium">{it.n}</span>
                    <span className="text-xs text-[#5A5A5A] ml-2">{it.d}</span>
                  </div>
                  <span className="font-serif-display text-xl text-[#B08D57] shrink-0">{tr.from} €{it.p}</span>
                </div>
              ))}
            </div>
            {/* Due azioni, non una: chi ha già le idee chiare chiede, chi
                vuole guardare con calma si scarica il listino intero. Sulla
                pagina se ne vedono sette — il resto era invisibile, e chi
                cercava un trattamento preciso o un Programma pensava che
                non lo facessimo.
                Il richiedi resta il pulsante pieno, lo scarica è secondario:
                l'obiettivo della sezione è ricevere richieste.

                Qui c'era scritto «otto voci» e «chi cercava lo Shiatsu»:
                lo Shiatsu non si fa più dal 20 agosto 2026 ed era proprio
                l'ottava. Un commento che porta un esempio inesistente manda
                chi legge a cercare una voce che non c'è. */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href={RICHIESTA_URL("trattamenti", lang)} target="_blank" rel="noopener noreferrer"
                data-testid="treatments-cta"
                className="inline-block rounded-full bg-[#1A3626] text-[#F9F6F0] px-8 py-4 text-sm font-semibold hover:bg-[#B08D57] transition-colors">
                {b.ctaSpa}
              </a>
              {/* download e non target="_blank": su un telefono il PDF si apre
                  dentro il browser e l'ospite perde la pagina dell'hotel */}
              <a href="/listino-trattamenti.pdf" download
                data-testid="treatments-listino"
                className="inline-flex items-center gap-2 rounded-full border border-[#1A3626] text-[#1A3626] px-8 py-4 text-sm font-semibold hover:bg-[#1A3626] hover:text-[#F9F6F0] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {tr.scaricaListino}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
