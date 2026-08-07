import { NAV } from "../../data";
import { useLang } from "../../LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const labelFor = (href) => t.nav[href.slice(1)] || href;
  return (
    <footer data-testid="site-footer" className="bg-[#12241A] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif-display text-3xl text-white">Hotel Terme Leonardo</div>
            <p className="mt-4 max-w-sm text-sm">{f.tagline}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">{f.navigate}</h4>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (<li key={n.href}><a href={n.href} className="hover:text-[#E7C98B] transition-colors">{labelFor(n.href)}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">{f.contacts}</h4>
            <ul className="space-y-2 text-sm">
              <li>{t.info.address}</li>
              <li><a href={`tel:${t.info.phone.replace(/\s/g, "")}`} className="hover:text-[#E7C98B] transition-colors">{t.info.phone}</a></li>
              <li><a href={`mailto:${t.info.email}`} className="hover:text-[#E7C98B] transition-colors">{t.info.email}</a></li>
              <li><a href="#prenota" className="hover:text-[#E7C98B] transition-colors">{f.c4}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Hotel Terme Leonardo. {f.rights}</span>
          <span>{f.cookie}</span>
        </div>
      </div>
    </footer>
  );
}
