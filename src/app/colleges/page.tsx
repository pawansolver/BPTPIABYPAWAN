'use client';

import Header from "@/components/header";
import { GraduationCap, School } from "lucide-react";
import NewsWidget from "@/components/home-content/news-widget";
import CollegeCategoryCard from "@/components/colleges/category-card";
import { Footer } from "@/components/ui/footer-section";

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* 1. Header */}
      <Header />

      <main>
        {/* 2. Page Hero Section - Updated to match screenshot UI */}
        <div 
          className="py-20 border-b border-gray-200 shadow-sm relative z-10 flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/colleges/collegelistpage.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container-custom text-center relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              ⚡ Discovers BPTPIA
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
              List Of Colleges
            </h1>
            
            <div className="w-16 h-1 bg-[#004d80] mx-auto mb-8"></div>
            
            {/* Glass-morphism border container for description */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 md:p-8 shadow-2xl">
              <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
                These colleges are approved by the All India Council for Technical Education, Govt. of India & Deptt. Of Science and Technology, Govt. of Bihar, & affiliated to different universities. College list is given below along with approved intake and fee details.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Main Content Section (UNIQUE, CLEARLY VISIBLE & PREMIUM BACKGROUND) */}
        <section className="py-16 relative overflow-hidden border-t border-slate-200">

          {/* ======================================================== */}
          {/* 🔥 THE "MODERN TECH WAVE" BACKGROUND (NO EXTERNAL IMAGES) */}
          {/* ======================================================== */}
          <div className="absolute inset-0 z-0">
            {/* Base Color: Very light soft blue/gray to keep it professional */}
            <div className="absolute inset-0 bg-[#f4f7f9]"></div>

            {/* Dynamic CSS Mesh Gradient - Soft Brand Colors */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#004d80]/5 rounded-[100%] blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#cc0000]/5 rounded-[100%] blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>

            {/* The "Unique" Element: A sharp, tech-style isometric grid using pure CSS */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(30deg, #cbd5e1 12%, transparent 12.5%, transparent 87%, #cbd5e1 87.5%, #cbd5e1),
                  linear-gradient(150deg, #cbd5e1 12%, transparent 12.5%, transparent 87%, #cbd5e1 87.5%, #cbd5e1),
                  linear-gradient(30deg, #cbd5e1 12%, transparent 12.5%, transparent 87%, #cbd5e1 87.5%, #cbd5e1),
                  linear-gradient(150deg, #cbd5e1 12%, transparent 12.5%, transparent 87%, #cbd5e1 87.5%, #cbd5e1),
                  linear-gradient(60deg, #e2e8f0 25%, transparent 25.5%, transparent 75%, #e2e8f0 75%, #e2e8f0),
                  linear-gradient(60deg, #e2e8f0 25%, transparent 25.5%, transparent 75%, #e2e8f0 75%, #e2e8f0)
                `,
                backgroundSize: '40px 70px',
                backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px'
              }}
            ></div>

            {/* A soft white vignette around the edges to focus attention on the center cards */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.7)_100%)]"></div>
          </div>
          {/* ======================================================== */}

          <div className="max-w-[1536px] mx-auto px-2 md:px-4 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

              {/* LEFT: College Cards Section (8 Columns) */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <CollegeCategoryCard 
                    title="Engineering College List"
                    description="Access the comprehensive list of private engineering colleges in Bihar. Explore details about intake capacity, fee structures, and campus facilities for top-tier technical education."
                    image="/colleges/engineering.png"
                    href="/colleges/engineering-college-list"
                    Icon={GraduationCap}
                    color="#004d80" // brandBlue
                  />

                  <CollegeCategoryCard
                    title="Polytechnic College List"
                    description="Browse through the affiliated polytechnic institutes offering diploma courses in various engineering disciplines. Check approved intake and essential academic information."
                    image="/colleges/polytechnic.png"
                    href="/colleges/polytechnic"
                    Icon={School}
                    color="#cc0000" // brandOrange (Red)
                  />
                </div>
              </div>

              {/* RIGHT: News Widget (4 Columns) */}
              <div className="lg:col-span-4 h-[500px] lg:h-[700px] sticky top-[180px] lg:top-[120px] drop-shadow-xl">
                <NewsWidget />
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}