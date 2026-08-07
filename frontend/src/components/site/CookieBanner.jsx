import { useEffect, useState } from "react";
import { useLang } from "../../LanguageContext";
import { LEGAL } from "../../legal";

export default function CookieBanner() {
  const { lang } = useLang();
  const L = LEGAL[lang] || LEGAL.it;
  const b = L.banner;
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [stats, setStats] = useState(false);
  const [mkt, setMkt] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("tl_cookie_consent")) setVisible(true);
  }, []);

  const save = (choice) => {
    localStorage.setItem("tl_cookie_consent", JSON.stringify(choice));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6" role="dialog" aria-label="Cookies" data-testid="cookie-banner">
      <div className="max-w-2xl mx-auto bg-white border-t-4 border-[#B08D57] shadow-2xl rounded-t-xl p-6">
        <p className="text-sm leading-snug text-[#5A5A5A]">{b.text}</p>

        {showPrefs && (
          <div className="mt-4 divide-y divide-[#E5E0D8]" data-testid="cookie-prefs">
            {L.cats.map((c, i) => (
              <div key={c.name} className="flex items-start justify-between py-3 gap-4">
                <div>
                  <span className="block text-sm font-bold text-[#1A3626]">{c.name}</span>
                  <span className="block mt-1 text-xs text-[#5A5A5A]">{c.desc}</span>
                </div>
                {i === 0 ? (
                  <span className="mt-1 text-xs italic whitespace-nowrap text-[#5A5A5A]">{b.always}</span>
                ) : (
                  <input
                    type="checkbox"
                    data-testid={`cookie-toggle-${i}`}
                    checked={i === 1 ? stats : mkt}
                    onChange={(e) => (i === 1 ? setStats(e.target.checked) : setMkt(e.target.checked))}
                    className="w-5 h-5 mt-1 accent-[#1A3626]"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <button data-testid="cookie-accept" onClick={() => save({ necessary: true, statistics: true, marketing: true })}
            className="px-5 py-2 text-sm text-white bg-[#1A3626] hover:bg-[#B08D57] transition-colors rounded-full">{b.accept}</button>
          <button data-testid="cookie-reject" onClick={() => save({ necessary: true, statistics: false, marketing: false })}
            className="px-5 py-2 text-sm border border-[#1A3626] text-[#1A3626] hover:bg-[#1A3626] hover:text-white transition-colors rounded-full">{b.reject}</button>
          {showPrefs ? (
            <button data-testid="cookie-save" onClick={() => save({ necessary: true, statistics: stats, marketing: mkt })}
              className="px-5 py-2 text-sm border border-[#1A3626] text-[#1A3626] hover:bg-[#1A3626] hover:text-white transition-colors rounded-full">{b.save}</button>
          ) : (
            <button data-testid="cookie-prefs-btn" onClick={() => setShowPrefs(true)}
              className="px-2 py-2 text-sm underline text-[#5A5A5A] hover:text-[#1A3626] sm:ml-auto">{b.prefs}</button>
          )}
        </div>
      </div>
    </div>
  );
}
