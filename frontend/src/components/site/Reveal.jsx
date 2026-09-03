import { useEffect, useRef, useState } from "react";

/* Un blocco che compare con una dissolvenza quando entra nello schermo.

   Fino al 3 settembre 2026 lo faceva framer-motion: 110 KB di JavaScript
   nel pacchetto, per questo e per le due animazioni della prima
   schermata. Ora e' un IntersectionObserver di dieci righe e una regola
   CSS in index.css (.reveal): stesso ritardo, stessa curva, stesso
   margine di 80 px. Chi ha chiesto al sistema meno movimento vede tutto
   fermo e subito visibile; un browser senza IntersectionObserver idem. */
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const ref = useRef(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) { setVisto(true); return undefined; }
    const io = new IntersectionObserver(
      ([voce]) => {
        if (voce.isIntersecting) { setVisto(true); io.disconnect(); }
      },
      { rootMargin: "-80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visto ? "reveal-visto" : ""} ${className}`}
      style={{ "--reveal-y": `${y}px`, "--reveal-ritardo": `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* L'etichetta e' piccola (12 px): l'oro chiaro dei titoli qui non si legge
   abbastanza (contrasto 2,9 sul crema, la soglia e' 4,5). Bronzo #8A6A38.
   Sui fondi scuri chi la usa passa className="text-[#E7C98B]", che resta. */
export const Label = ({ children, className = "" }) => (
  <span className={`inline-block text-xs uppercase tracking-label text-[#8A6A38] font-semibold ${className}`}>
    {children}
  </span>
);
