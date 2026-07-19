import { NAV } from "../../data";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#12241A] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif-display text-3xl text-white">Hotel Terme Leonardo</div>
            <p className="mt-4 max-w-sm text-sm">
              Il tuo 4 stelle termale ad Abano Terme, immerso nella quiete dei
              Colli Euganei. Piscine termali, benessere, golf e cucina veneta.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">Naviga</h4>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-[#E7C98B] transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-label text-[#E7C98B] mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm">
              <li>Monteortone · Abano Terme (PD)</li>
              <li>Colli Euganei, Veneto — Italia</li>
              <li>A 1 km dal centro</li>
              <li><a href="#prenota" className="hover:text-[#E7C98B] transition-colors">Richiedi prenotazione</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Hotel Terme Leonardo. Tutti i diritti riservati.</span>
          <span>Cookie Policy · Privacy</span>
        </div>
      </div>
    </footer>
  );
}
