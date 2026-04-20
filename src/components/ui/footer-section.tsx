'use client';

import React, { ComponentProps, ReactNode, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Globe, Mail, ChevronUp, ChevronDown } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type IMenu = {
  id: number;
  title: string;
  url: string;
  dropdown?: boolean;
  items?: IMenu[];
  badge?: string;
};

const universityMenus: IMenu[] = [
  { id: 1, title: 'Home', url: '/', dropdown: false },
  {
    id: 2, title: 'Who We Are?', url: '/about/bptpia', dropdown: true,
    items: [
      { id: 21, title: 'About BPTPIA', url: '/about/bptpia' },
      { id: 22, title: 'Mission & Vision', url: '/about/mission-vision' },
      { id: 23, title: 'President Message', url: '/about/chairman-message' },
      { id: 24, title: 'Secretary Message', url: '/about/secretary-message' },
    ],
  },
  { id: 3, title: 'Government Letter', url: '/government-letters', dropdown: false },
  { id: 4, title: 'List of Colleges', url: '/colleges', dropdown: false },
  { id: 5, title: 'News & Events', url: '/news-events', dropdown: false },
  {
    id: 6, title: 'Media Gallery', url: '/media', dropdown: true,
    items: [
      { id: 61, title: 'Photo Gallery', url: '/media/photos' },
      { id: 62, title: 'Video Gallery', url: '/media/videos' },
    ],
  },
  { id: 7, title: 'Contact Us', url: '/contact', dropdown: false },
  { id: 8, title: 'Results', url: '/results', dropdown: false, badge: 'NEW' },
];

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: 15, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev: number[]) =>
      prev.includes(id)
        ? prev.filter((item: number) => item !== id)
        : [...prev, id]
    );
  };

  return (
    // Compacted: Reduced margins from m-4/8 to m-3/5, reduced border radius
    <footer className="relative h-fit rounded-[2rem] overflow-hidden m-3 md:m-5 border border-white/10 shadow-xl bg-[#003366] text-white">

      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div aria-hidden className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#cc0000]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Compacted: Reduced py-16/20 to py-10/12 */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 lg:py-12 z-40 relative">

        {/* Compacted: Reduced gap-12/16 to gap-8/10, pb-12 to pb-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8">

          {/* Column 1: About */}
          <AnimatedContainer delay={0.1}>
            <h3 className="text-white text-base md:text-lg font-bold mb-4 uppercase tracking-wider">
              About Bihar Tech Association
            </h3>
            <p className="text-[13px] md:text-[14px] leading-relaxed text-white/80 text-justify font-medium">
              The Bihar Private Technical & Professional Institutions Association (BPTPIA) is a prominent
              organization representing private technical and professional educational institutions across
              Bihar. It plays a crucial role in facilitating admissions, standardizing educational
              practices, and ensuring quality education in the state's private sector.
            </p>
          </AnimatedContainer>

          {/* Column 2: Connect Us */}
          <AnimatedContainer delay={0.2}>
            <h3 className="text-white text-base md:text-lg font-bold mb-4 uppercase tracking-wider">
              Connect Us
            </h3>
            <div className="space-y-3 text-[13px] md:text-[14px] text-white/80 font-medium">
              <p className="leading-relaxed border-b border-white/20 pb-3 border-dotted">
                <strong className="text-[#fbc02d] block md:inline">Address: </strong>
                Maa Gayatri Residency, 2nd Floor, Mahua Bagh, Gandhi Puram, Jagdev Path, Patna-800014, (Bihar)
              </p>

              <p className="flex items-center gap-2.5 border-b border-white/20 pb-3 border-dotted">
                <Globe className="w-4 h-4 text-[#fbc02d] shrink-0" />
                <a href="https://www.bihartechassociation.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate">
                  www.bihartechassociation.com
                </a>
              </p>

              <p className="flex items-center gap-2.5 pb-1">
                <Mail className="w-4 h-4 text-[#fbc02d] shrink-0" />
                <a href="mailto:biharpvtassociation@gmail.com" className="hover:text-white transition-colors truncate">
                  biharpvtassociation@gmail.com
                </a>
              </p>

              {/* Fixed Social Icons - Shrunk slightly */}
              <div className="flex gap-2 pt-1">
                <a href="https://www.facebook.com/people/Bptpia-Patna/61559957417187/?rdid=ClHYgZRIe8VugLZp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18TrhQGRVF%2F" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#cc0000] hover:border-transparent transition-all">
                  <FaFacebook className="w-3.5 h-3.5" />
                </a>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/50 cursor-not-allowed">
                  <FaInstagram className="w-3.5 h-3.5" />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/50 cursor-not-allowed">
                  <FaTwitter className="w-3.5 h-3.5" />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white/50 cursor-not-allowed">
                  <FaYoutube className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* Column 3: Quick Links */}
          <AnimatedContainer delay={0.3}>
            <h3 className="text-white text-base md:text-lg font-bold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            {/* Compacted space-y */}
            <ul className="space-y-2 font-medium">
              {universityMenus.map((item) => (
                <li key={item.id} className="border-b border-white/20 border-dotted pb-2 last:border-0 relative">
                  {item.dropdown ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="flex items-center justify-between text-[13px] md:text-[14px] text-white/80 hover:text-[#fbc02d] transition-colors group w-full text-left"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#fbc02d]" />
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-white/40 transition-transform duration-300 ${expandedItems.includes(item.id) ? 'rotate-180 text-[#fbc02d]' : ''
                            }`}
                        />
                      </button>

                      {/* Sub-menu items */}
                      {expandedItems.includes(item.id) && item.items && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-2 ml-6"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.url}
                              className="flex items-center gap-2 py-1 text-[12px] md:text-[13px] text-white/60 hover:text-[#fbc02d] transition-colors group block"
                            >
                              <ChevronRight className="w-3 h-3 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#fbc02d]" />
                              {subItem.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 text-[13px] md:text-[14px] text-white/80 hover:text-[#fbc02d] transition-colors group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#fbc02d]" />
                      {item.title}
                      {item.badge && (
                        <span className="ml-2 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2 py-[1px] text-[8px] font-bold text-white tracking-widest shadow-sm shadow-orange-500/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                  {/* Pulse Indicator for Home */}
                  {item.id === 1 && <span className="absolute top-1.5 -left-2.5 w-1 h-1 rounded-full bg-[#cc0000] animate-pulse"></span>}
                </li>
              ))}
            </ul>
          </AnimatedContainer>

          {/* Column 4: Reach Us (GOOGLE MAPS) */}
          <AnimatedContainer delay={0.4}>
            <h3 className="text-white text-base md:text-lg font-bold mb-4 uppercase tracking-wider">
              Reach Us
            </h3>
            {/* Compacted Map Height */}
            <div className="w-full h-[180px] bg-white/5 border border-white/20 rounded-lg overflow-hidden p-1 relative z-0">
              <iframe
                src="https://maps.google.com/maps?q=Jagdev%20Path,%20Patna,%20Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 rounded-md opacity-90 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </AnimatedContainer>

        </div>

        {/* Compacted HR Margin */}
        <hr className="border-t border-white/20 my-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 relative z-50">

          <div className="text-white/70 text-[12px] md:text-[13px] font-medium text-center md:text-left">
            Copyright {new Date().getFullYear()} | Bihar Tech Association | All Rights Reserved <br className="md:hidden" />
            <span className="hidden md:inline text-white/30 font-bold mx-2"> | </span>
            Designed & Developed by <span className="text-white font-bold">Nighwan Technology</span>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-1">
              <Link href="/privacy-policy" className="text-white/60 hover:text-[#fbc02d] transition-colors text-xs md:text-xs">
                Privacy Policy
              </Link>
              <span className="text-white/30">|</span>
              <Link href="/terms-of-service" className="text-white/60 hover:text-[#fbc02d] transition-colors text-xs md:text-xs">
                Terms of Services
              </Link>
              <span className="text-white/30">|</span>
              <Link href="/refund-policy" className="text-white/60 hover:text-[#fbc02d] transition-colors text-xs md:text-xs">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Scroll to Top Button - Slightly smaller */}
          <button
            onClick={scrollToTop}
            className="bg-white/10 hover:bg-[#cc0000] border border-white/20 hover:border-transparent text-white w-10 h-10 flex items-center justify-center rounded-lg transition-all shadow-sm hover:shadow-md group focus:outline-none"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}