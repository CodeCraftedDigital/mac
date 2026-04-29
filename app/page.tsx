import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurProcess from "@/components/OurProcess";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Header />
        <Hero />
        <Services />
        <WhyChooseUs />
        <OurProcess />
        <Projects />
        <Blog />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
