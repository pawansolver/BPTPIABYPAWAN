import React from "react";
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

// College Specific Data (Chairman, Secretary & Association Info)
const leadershipMessages = [
  {
    quote:
      "Welcome to BPTPIA. We are dedicated to maintaining the highest standards of technical and professional education in Bihar. Our goal is to empower private institutions, ensuring standardized practices and fostering a collaborative environment for sustainable growth.",
    name: "ER. Ravi Shankar Prasad Singh",
    designation: "Chairman, BPTPIA",
    src: "https://bihartechassociation.com/wp-content/uploads/2025/05/chairman.jpeg",
  },
  {
    quote:
      "Our association acts as a strong unified platform. We actively engage with regulatory bodies to address challenges faced by member colleges. Together, we are building a robust infrastructure for the future engineers and professionals of Bihar.",
    name: "ER. Awadhesh Kumar",
    designation: "Secretary, BPTPIA",
    src: "https://bihartechassociation.com/wp-content/uploads/2025/05/secretary.jpeg",
  },
  {
    quote:
      "BPTPIA ensures that all member institutions share resources efficiently and contribute to policy formulations. We are proud to be the guiding force behind the private technical education sector across the state of Bihar.",
    name: "About The Association",
    designation: "Our Mission",
    src: "/why-choose-us/slide6wcu.png",
  },
];

export default function AboutSection() {
  return (
    // 1. Added `.section` for global padding & layout, kept specific min-h and bg
    <section className="section bg-[#fdfcfb] min-h-[85vh] relative overflow-hidden w-full">

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#fff9f0] pointer-events-none"></div>

      {/* 2. Added `.container-custom` for global width limit & side paddings */}
      <div className="container-custom relative z-10 w-full">

        {/* Title for the section */}
        <div className="flex flex-col items-center mb-8 md:mb-12 w-full">
          {/* 3. Applied `.heading-xl` (Red, Bold, Uppercase). Used 'text-textmain' for 'Leadership' to keep it black, while 'Messages' becomes Red. */}
          <h2 className="heading-xl">
            <span className="text-textmain"></span>Leadership Messages
          </h2>
          <div className="w-24 h-1 bg-[#fbc02d] mt-2 rounded-full mx-auto"></div>
        </div>

        {/* --- Image Size Control Wrapper --- */}
        {/* Is class se testimonials ki images limit ho jayengi bina logic disturb kiye */}
        <div className="max-w-5xl mx-auto w-full [&_img]:max-h-[350px] [&_img]:w-auto [&_img]:mx-auto [&_img]:object-contain">
          <CircularTestimonials
            testimonials={leadershipMessages}
            autoplay={true}
            colors={{
              // 4. Synced colors with your global CSS variables!
              name: "var(--color-brandOrange)",       // Red Headings (#cc0000)
              designation: "var(--color-brandGreen)", // Blue Subheadings (#004d80)
              testimony: "var(--color-textmain)",     // Deep Black Paragraphs (#050505)
              arrowBackground: "#e5e7eb",
              arrowForeground: "#111827",
              arrowHoverBackground: "#fbc02d",        // Yellow hover on arrows
            }}
            fontSizes={{
              name: "28px",
              designation: "18px",
              quote: "18px",
            }}
          />
        </div>
      </div>
    </section>
  );
}