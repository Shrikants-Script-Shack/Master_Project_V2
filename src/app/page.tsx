import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import Collection from "@/components/Collection";
import VInPlace from "@/components/VInPlace";
import FormatGuide from "@/components/FormatGuide";
import PlyExploder from "@/components/PlyExploder";
import HotelsBusiness from "@/components/HotelsBusiness";
import BuyingJourney from "@/components/BuyingJourney";
import Footer from "@/components/Footer";
import FloatingTissues from "@/components/FloatingTissues";
import CursorTrail from "@/components/CursorTrail";

export default function Home() {
  return (
    <>
      {/* Global ambient animations */}
      <FloatingTissues />
      <CursorTrail />

      <Header />
      <main className="flex-1">
        <Hero />
        <ProductHighlights />
        <Collection />
        <VInPlace />
        <PlyExploder />
        <FormatGuide />
        <HotelsBusiness />
        <BuyingJourney />
      </main>
      <Footer />
    </>
  );
}
