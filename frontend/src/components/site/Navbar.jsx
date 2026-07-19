import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, BOOKING_URL } from "../../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        scrolled ? "bg-[#F9F6F0]/85 backdrop-blur-xl border-b border-[#1A3626]/10 py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex flex-col leading-none">
          <span className={`font-serif-display text-2xl md:text-3xl ${scrolled ? "text-[#1A3626]" : "text-white"} transition-colors`}>
            Terme Leonardo
          </span>
          <span className={`text-[10px] tracking-label uppercase ${scrolled ? "text-[#5A5A5A]" : "text-white/80"} transition-colors`}>
            Abano Terme · 4 Stelle
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.href.slice(1)}`}
              className={`text-sm font-medium transition-colors hover:text-[#B08D57] ${
                scrolled ? "text-[#1A3626]" : "text-white/90"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-book-btn"
            className="rounded-full bg-[#1A3626] text-[#F9F6F0] px-6 py-2.5 text-sm font-semibold hover:bg-[#B08D57] transition-colors"
          >
            Prenota
          </a>
        </nav>

        <button
          data-testid="nav-menu-toggle"
          className={`lg:hidden ${scrolled ? "text-[#1A3626]" : "text-white"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#F9F6F0] border-t border-[#1A3626]/10 px-6 py-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              data-testid={`nav-mobile-${n.href.slice(1)}`}
              className="text-[#1A3626] text-base font-medium"
            >
              {n.label}
            </a>
          ))}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="rounded-full bg-[#1A3626] text-[#F9F6F0] px-6 py-3 text-center font-semibold">
            Prenota
          </a>
        </div>
      )}
    </header>
  );
}
