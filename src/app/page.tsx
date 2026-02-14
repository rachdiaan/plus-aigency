import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Features";
import AIFeatures from "@/components/AIFeatures";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <AIFeatures />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
