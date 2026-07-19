import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Wellness from "@/components/site/Wellness";
import Golf from "@/components/site/Golf";
import Rooms from "@/components/site/Rooms";
import Dining from "@/components/site/Dining";
import Offers from "@/components/site/Offers";
import DaySpa from "@/components/site/DaySpa";
import BookingForm from "@/components/site/BookingForm";
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
    <div className="App grain">
      <Navbar />
      <main>
        <Hero />
        <Wellness />
        <Golf />
        <Rooms />
        <Dining />
        <DaySpa />
        <Offers />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
