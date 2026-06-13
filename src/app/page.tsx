import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Features";
import AIFeatures from "@/components/AIFeatures";
import BlogSection from "@/components/BlogSection";
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
      <BlogSection />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
