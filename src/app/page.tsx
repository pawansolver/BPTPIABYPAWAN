'use client';

import HeroSection from "@/components/home-content/hero-section";
import NavBar from "@/components/home-content/navbar";
import TopBar from "@/components/home-content/topbar";
import AboutSection from "@/components/home-content/about-section";
import StatsCounterSection from "@/components/home-content/stats-counter";
import WhyChooseUsSection from "@/components/home-content/why-choose-us";
import ExperienceSection from "@/components/home-content/experience-section";
import CollegeActivitiesSection from "@/components/home-content/college-activities";
import ContactSection from "@/components/home-content/contact-section";
import { Footer } from '@/components/ui/footer-section';
import NewsWidget from "@/components/home-content/news-widget";
import SupportSection from "@/components/home-content/support-section";


// Naya import add kiya hai EnquiryPopup ke liye
import EnquiryPopup from "@/components/home-content/EnquiryPopup";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-x-hidden relative">

      {/* --- ABOVE THE FOLD SECTION (Desktop) --- */}
      {/* lg:h-screen lg:flex lg:flex-col ensures this whole block takes 100vh on desktop.
        Mobile pe flex hata dete hain taaki natural scrolling rahe.
      */}
      <div className="lg:h-screen lg:flex lg:flex-col">

        {/* 1. Global Headers */}
        <TopBar />
        <NavBar />

        {/* 2. Main Page Hero & News Section (Dynamic Height) */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 lg:min-h-0">

          {/* Grid container needs exact 100% height of its parent (the flex-1 main).
            This is CRITICAL for overflow-y-auto inside NewsWidget to work.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">

            {/* LEFT: Hero Section (Takes 8 columns out of 12) */}
            <div className="lg:col-span-8 rounded-sm shadow-md border border-gray-200 h-[500px] lg:h-full relative overflow-hidden">
              <HeroSection />
            </div>

            {/* RIGHT: News Widget (Takes 4 columns out of 12) */}
            {/* Is div ki height exact container jaisi honi chahiye, tabhi
              NewsWidget ke andar ki flex-grow / overflow property kaam karegi.
            */}
            <div className="lg:col-span-4 h-[500px] lg:h-full relative">
              <div className="absolute inset-0"> {/* Force exact dimensions */}
                <NewsWidget />
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* --- BELOW THE FOLD SECTIONS --- */}

      {/* 3. About & Leadership Section */}
      <AboutSection />

      {/* 4. Stats Counter Section */}
      <StatsCounterSection />

      {/* 5. Why Choose BPTPIA Section */}
      <WhyChooseUsSection />

       {/* 6. Support Section */}
      <SupportSection />

      <CollegeActivitiesSection />
      {/* 6. LPU Style Experience/Video Section */}
      <ExperienceSection />

      {/* 7. College Activities Carousel Section */}


      {/* 8. Contact Us Section */}
      <ContactSection />

      {/* 9. Main Footer */}
      <Footer />

      {/* ========================================= */}
      {/* 10. GLOBAL FLOATING BUTTON & POPUP FORM   */}
      {/* ========================================= */}
      <EnquiryPopup />

    </div>
  );
}