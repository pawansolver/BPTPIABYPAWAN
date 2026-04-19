'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  Mail,
  PhoneCall,
  HelpCircle,
  MapPin,
  Clock,
  ShieldAlert
} from 'lucide-react';

// Global Components
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';
import ContactSection from "@/components/home-content/contact-section";
import SlidingTestimonial from "@/components/ui/sliding-testimonial";

// ==========================================
// 1. ORIGIN UI STYLE FAQ ITEM COMPONENT
// ==========================================
function FAQItem({
  question,
  answer,
  icon: Icon,
  isOpen,
  onClick
}: {
  question: string;
  answer: string;
  icon: any;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between group transition-all"
      >
        <div className="flex items-center gap-4">
          {/* Left Icon with subtle color */}
          <div className="text-gray-400 group-hover:text-[var(--color-brandOrange)] transition-colors">
            <Icon size={20} strokeWidth={1.5} />
          </div>
          <span className={`text-[17px] font-medium text-left transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
            {question}
          </span>
        </div>

        {/* Right Plus/Minus Icon */}
        <div className="text-gray-400">
          {isOpen ? (
            <Minus size={20} strokeWidth={1.5} className="text-[var(--color-brandOrange)]" />
          ) : (
            <Plus size={20} strokeWidth={1.5} className="group-hover:text-gray-600" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 text-gray-500 leading-relaxed text-[15px] max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 2. MAIN CONTACT PAGE
// ==========================================
export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "How can I reach the administrative office for physical verification?",
      answer: "You can visit our Head Office at Maa Gayatri Residency, Jagdev Path, Patna. We recommend scheduling an appointment via phone before visiting for document verification.",
      icon: MapPin
    },
    {
      question: "What are the standard office hours for support?",
      answer: "Our support team is available Monday to Saturday, from 10:00 AM to 5:00 PM. We are closed on Sundays and gazetted public holidays.",
      icon: Clock
    },
    {
      question: "Is there a dedicated helpline for admission-related queries?",
      answer: "Yes, for admissions, you can directly call our counseling cell at +91-9934005543 or email us at admissions@bihartechassociation.com.",
      icon: PhoneCall
    },
    {
      question: "How do I report a technical issue with the portal?",
      answer: "For any technical glitches or login issues, please send a screenshot of the error to support@bihartechassociation.com with your institution ID.",
      icon: ShieldAlert
    },
    {
      question: "Whom should I contact for affiliation of a new college?",
      answer: "New affiliation queries are handled by the Secretary's office. You can find the detailed checklist in the 'Institution' section or contact the Administrative desk.",
      icon: HelpCircle
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <TopBar />
      <NavBar />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-[#003366] py-12 px-6 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-[0.2em]">Contact Us</h1>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-blue-200 uppercase tracking-widest font-semibold">
              <Link href="/" className="hover:text-white transition-colors opacity-80 hover:opacity-100">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-white">Get in Touch</span>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl text-white"></div>
        </div>

        {/* Contact Form Section */}
        <ContactSection />

        {/* Sliding Testimonials */}
        <SlidingTestimonial />

        {/* ========================================== */}
        {/* ORIGIN UI STYLE FAQ SECTION                */}
        {/* ========================================== */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Title Area */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold text-[var(--color-brandOrange)] uppercase tracking-tight mb-4">
                Common Questions
              </h2>
              <p className="text-[var(--color-brandGreen)] font-medium text-[16px] leading-relaxed max-w-sm">
                Everything you need to know about reaching out, scheduling visits, and support protocols.
              </p>
              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-[#003366] uppercase tracking-wider mb-2">Still need help?</p>
                <Link href="mailto:support@example.com" className="text-[var(--color-brandOrange)] font-semibold flex items-center gap-2 hover:underline">
                  Email our helpdesk <Mail size={16} />
                </Link>
              </div>
            </div>

            {/* Right FAQ Flow Area (Matching Screenshot Design) */}
            <div className="lg:col-span-8 bg-white px-8 rounded-3xl border border-gray-100 shadow-sm">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  icon={faq.icon}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}