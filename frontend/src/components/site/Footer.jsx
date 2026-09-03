import { useState } from "react";
import { NAV, COMPANY_LINE, loginUrl, ULSS_TRANSPARENCY } from "../../data";
import { useLang } from "../../LanguageContext";
import { LEGAL } from "../../legal";
import Modal from "./Modal";

export default function Footer() {
  const { t, lang } = useLang();
  const f = t.footer;
  const L = LEGAL[lang] || LEGAL.it;
  const labelFor = (href) => t.nav[href.slice(1)] || href;
  const [modal, setModal] = useState(null); // 'cookie' | 'transparency'
  const eur = (n) =>
    n.toLocaleString(lang === "en" ? "en-GB" : lang || "it", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <footer data-testid="site-footer" className="bg-[#12241A] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif-display text-3xl text-white">Hotel Terme Leonardo</div>
            <p className="mt-4 max-w-sm text-sm">{f.tagline}</p>
          </div>
          <div>
            {/* h3 e non h4: prima del footer l'ultimo titolo e' un h2, e
                saltare un livello disorienta chi naviga coi titoli */}
            <h3 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">{f.navigate}</h3>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (<li key={n.href}><a href={n.href} className="hover:text-[#E7C98B] transition-colors">{labelFor(n.href)}</a></li>))}
              <li><a href={loginUrl(lang)} target="_blank" rel="noopener noreferrer" data-testid="footer-login" className="hover:text-[#E7C98B] transition-colors">{L.login}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">{f.contacts}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t.info.address}</li>
              <li><a href={`tel:${t.info.phone.replace(/\s/g, "")}`} className="hover:text-[#E7C98B] transition-colors">{t.info.phone}</a></li>
              <li><a href={`mailto:${t.info.email}`} className="hover:text-[#E7C98B] transition-colors">{t.info.email}</a></li>
              <li><a href="#prenota" className="hover:text-[#E7C98B] transition-colors">{f.c4}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <button data-testid="footer-cookie" onClick={() => setModal("cookie")} className="text-white/75 hover:text-[#E7C98B] transition-colors">{L.cookieLink}</button>
          <button data-testid="footer-transparency" onClick={() => setModal("transparency")} className="text-white/75 hover:text-[#E7C98B] transition-colors">{L.transparencyLink}</button>
          <a href={loginUrl(lang)} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-[#E7C98B] transition-colors">{L.login}</a>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-[11px] text-white/70">
          <span data-testid="footer-legal">{COMPANY_LINE}</span>
          <span className="whitespace-nowrap">© {new Date().getFullYear()} · {f.rights}</span>
        </div>
      </div>

      <Modal open={modal === "cookie"} onClose={() => setModal(null)} title={L.cookieTitle} closeLabel={L.close}>
        <p className="text-sm text-[#5A5A5A]">{L.cookieIntro}</p>
        <div className="mt-5 space-y-4">
          {L.cats.map((c) => (
            <div key={c.name} className="border-l-2 border-[#B08D57] pl-4">
              <h4 className="font-semibold text-[#1A3626]">{c.name}</h4>
              <p className="text-sm text-[#5A5A5A] mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#5A5A5A] mt-5">{L.manage}</p>
        <p className="text-xs text-[#8A6A38] mt-4">{L.updated}</p>
      </Modal>

      <Modal open={modal === "transparency"} onClose={() => setModal(null)} title={L.transparencyTitle} closeLabel={L.close}>
        <ul className="space-y-4">
          {L.transparency.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#5A5A5A]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B08D57] shrink-0" /> {p}
            </li>
          ))}
        </ul>

        <h4 className="font-serif-display text-xl text-[#1A3626] mt-8">{L.transparencyTableTitle}</h4>
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#E5E0D8]">
          <table data-testid="ulss-table" className="w-full min-w-[540px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1EFEB]">
                {L.transparencyCols.map((c, i) => (
                  <th
                    key={i}
                    className={`align-bottom px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#1A3626] border-b border-[#E5E0D8] ${
                      i === 0 ? "text-left w-16" : "text-right"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ULSS_TRANSPARENCY.map((r) => (
                <tr key={r.y} className="border-b border-[#E5E0D8] last:border-b-0">
                  <td className="px-3 py-2 font-medium text-[#1A3626]">{r.y}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#5A5A5A]">€ {eur(r.tot)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#5A5A5A]">€ {eur(r.ticket)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-[#5A5A5A]">€ {eur(r.ssr)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#8A6A38] mt-4">{L.transparencyTableNote}</p>
      </Modal>
    </footer>
  );
}
