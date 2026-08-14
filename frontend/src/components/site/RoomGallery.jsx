import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal, Label } from "./Reveal";
import { ROOM_GALLERY, PRENOTA_URL } from "../../data";
import { useLang } from "../../LanguageContext";

export default function RoomGallery() {
  const { t, lang } = useLang();
  const g = t.roomsGallery;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), []);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
        <section id="rooms-gallery-section" data-testid="rooms-gallery-section" className="py-24 md:py-32 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <Label>{g.label}</Label>
            <h2 className="font-serif-display text-4xl md:text-6xl text-[#1A3626] mt-5 leading-tight font-light">{g.title}</h2>
            <p className="text-[#5A5A5A] text-lg mt-5 max-w-xl">{g.subtitle}</p>
          </Reveal>
          <div className="flex gap-3 shrink-0">
            <button onClick={scrollPrev} data-testid="rooms-prev" aria-label={g.prev}
              className="w-12 h-12 rounded-full border border-[#1A3626]/25 text-[#1A3626] flex items-center justify-center hover:bg-[#1A3626] hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </button>
            <button onClick={scrollNext} data-testid="rooms-next" aria-label={g.next}
              className="w-12 h-12 rounded-full border border-[#1A3626]/25 text-[#1A3626] flex items-center justify-center hover:bg-[#1A3626] hover:text-white transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden mt-12" ref={emblaRef} data-testid="rooms-embla">
          <div className="flex gap-6">
            {ROOM_GALLERY.map((room, i) => {
              const info = g.items[i];
              return (
                <div key={room.key} data-testid={`room-slide-${room.key}`}
                  className="flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_38%] min-w-0">
                  <div className="group h-full bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] flex flex-col">
                    <div className="h-72 overflow-hidden">
                      <img src={room.img} alt={info.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    </div>
                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif-display text-2xl text-[#1A3626]">{info.name}</h3>
                        <div className="text-right shrink-0">
                          <span className="block text-[10px] uppercase tracking-wider text-[#5A5A5A]">{g.from}</span>
                          <span className="font-serif-display text-2xl text-[#B08D57]">€{room.price}</span>
                        </div>
                      </div>
                      <p className="text-xs uppercase tracking-wider text-[#B08D57] mt-2">{info.spec}</p>
                      <p className="text-sm text-[#5A5A5A] mt-3 flex-grow">{info.desc}</p>
                      <a href={PRENOTA_URL(lang)} target="_blank" rel="noopener noreferrer" data-testid={`room-book-${room.key}`}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1A3626] text-[#F9F6F0] py-3 text-sm font-semibold hover:bg-[#B08D57] transition-colors">
                        {g.book}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {ROOM_GALLERY.map((r, i) => (
            <button key={r.key} onClick={() => emblaApi && emblaApi.scrollTo(i)} data-testid={`room-dot-${i}`}
              aria-label={`slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${selected === i ? "w-8 bg-[#B08D57]" : "w-2 bg-[#1A3626]/20"}`} />
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="bg-[#F1EFEB] rounded-2xl p-8 md:p-10">
            <h3 className="font-serif-display text-2xl text-[#1A3626]">{g.amenitiesTitle}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-6">
              {g.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 text-[#1A3626]">
                  <Check size={16} className="text-[#B08D57] shrink-0" /> <span className="text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
