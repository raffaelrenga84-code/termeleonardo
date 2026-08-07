import { Reveal, Label } from "./Reveal";
import { MapPin, Phone, Mail, Stethoscope, Car, Zap, CalendarDays } from "lucide-react";
import { useLang } from "../../LanguageContext";

export default function InfoContatti() {
  const { t } = useLang();
  const i = t.info;
  return (
    <section id="info" data-testid="info-section" className="py-24 md:py-32 bg-[#F1EFEB]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl">
          <Label>{i.label}</Label>
          <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{i.title}</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div data-testid="season-banner" className="flex items-start gap-4 bg-[#1A3626] text-white rounded-2xl p-6">
            <CalendarDays className="text-[#E7C98B] shrink-0 mt-1" size={22} />
            <div>
              <div className="text-xs uppercase tracking-label text-[#E7C98B]">{i.seasonTitle}</div>
              <div className="text-lg mt-1">{i.season}</div>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <Reveal>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 h-full">
              <h3 className="font-serif-display text-2xl text-[#1A3626]">{i.contactsTitle}</h3>
              <ul className="mt-6 space-y-4 text-[#1A3626]">
                <li className="flex items-start gap-3"><MapPin size={18} className="text-[#B08D57] mt-0.5 shrink-0" /><span>{i.address}</span></li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-[#B08D57] shrink-0" /><a href={`tel:${i.phone.replace(/\s/g, "")}`} className="hover:text-[#B08D57]">{i.phoneLabel}: {i.phone}</a></li>
                <li className="flex items-center gap-3"><Stethoscope size={18} className="text-[#B08D57] shrink-0" /><a href={`tel:${i.curePhone.replace(/\s/g, "")}`} className="hover:text-[#B08D57]">{i.cureLabel}: {i.curePhone}</a></li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-[#B08D57] shrink-0" /><a href={`mailto:${i.email}`} className="hover:text-[#B08D57]">{i.email}</a></li>
              </ul>
              <div className="mt-6 rounded-xl overflow-hidden h-56 border border-[#E5E0D8]">
                <iframe
                  title="map"
                  data-testid="info-map"
                  src="https://www.google.com/maps?q=Hotel%20Terme%20Leonardo%20Via%20Monteortone%2046%20Abano%20Terme&output=embed"
                  className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 h-full">
              <h3 className="font-serif-display text-2xl text-[#1A3626]">{i.getThereTitle}</h3>
              <ul className="mt-5 space-y-2">
                {i.distances.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[#1A3626] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" /> {d}
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-3 text-sm text-[#5A5A5A]">
                <p className="flex items-start gap-3"><Car size={16} className="text-[#B08D57] mt-0.5 shrink-0" /> {i.highway}</p>
                <p className="flex items-start gap-3"><Zap size={16} className="text-[#B08D57] mt-0.5 shrink-0" /> {i.ev}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8">
            <h3 className="font-serif-display text-2xl text-[#1A3626]">{i.usefulTitle}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {i.useful.map((u) => (
                <div key={u.t}>
                  <div className="text-sm font-semibold text-[#1A3626]">{u.t}</div>
                  <div className="text-sm text-[#5A5A5A] mt-1">{u.d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
