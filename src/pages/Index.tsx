import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { DigitalFeaturesSection } from "@/components/home/DigitalFeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsEventsSection } from "@/components/home/NewsEventsSection";
import { RegistrationSection } from "@/components/home/RegistrationSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProgramsSection />
          <DigitalFeaturesSection />
          <TestimonialsSection />
          <NewsEventsSection />
          <RegistrationSection />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default Index;