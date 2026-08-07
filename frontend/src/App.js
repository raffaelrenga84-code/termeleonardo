import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { LanguageProvider } from "@/LanguageContext";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Wellness from "@/components/site/Wellness";
import Golf from "@/components/site/Golf";
import Rooms from "@/components/site/Rooms";
import RoomGallery from "@/components/site/RoomGallery";
import Dining from "@/components/site/Dining";
import Offers from "@/components/site/Offers";
import DaySpa from "@/components/site/DaySpa";
import GiftVouchers from "@/components/site/GiftVouchers";
import CureTermali from "@/components/site/CureTermali";
import Treatments from "@/components/site/Treatments";
import Transfer from "@/components/site/Transfer";
import InfoContatti from "@/components/site/InfoContatti";
import BookingForm from "@/components/site/BookingForm";
import CookieBanner from "@/components/site/CookieBanner";
import Footer from "@/components/site/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="App grain">
        <Navbar />
        <main>
          <Hero />
          <Wellness />
          <Golf />
          <Rooms />
          <RoomGallery />
          <Dining />
          <DaySpa />
          <GiftVouchers />
          <CureTermali />
          <Treatments />
          <Offers />
          <Transfer />
          <InfoContatti />
          <BookingForm />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

export default App;
