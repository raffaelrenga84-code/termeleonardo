import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { IMG, BOOKING_URL } from "../../data";

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-screen flex items-end overflow-hidden">
      <motion.img
        src={IMG.heroPool}
        alt="Piscina termale Hotel Terme Leonardo"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

      <div className="relative max-w-7xl mx-auto px-6 w-full pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs uppercase tracking-label text-white/90 font-semibold mb-6">
            Colli Euganei · Monteortone
          </span>
          <h1 className="font-serif-display text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-light">
            Riscopri il tuo <em className="text-[#E7C98B]">equilibrio</em>
          </h1>
          <p className="text-white/85 text-lg md:text-xl mt-8 max-w-xl font-light">
            L'Hotel Terme Leonardo, il tuo 4 stelle termale ad Abano Terme,
            immerso nella quiete dei Colli Euganei tra piscine termali, benessere e golf.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-book-btn"
              className="rounded-full bg-[#F9F6F0] text-[#1A3626] px-8 py-4 text-sm font-semibold hover:bg-[#B08D57] hover:text-white transition-colors"
            >
              Prenota Ora
            </a>
            <a
              href="#benessere"
              data-testid="hero-discover-btn"
              className="rounded-full border border-white/60 text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Scopri l'Hotel
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 text-white/70 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-label rotate-90 origin-center mb-6">Scorri</span>
        <ChevronDown className="animate-bounce" size={20} />
      </div>
    </section>
  );
}
