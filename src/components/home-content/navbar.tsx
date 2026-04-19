'use client';



import Link from 'next/link';

import React, { useState } from 'react';

import { motion, MotionConfig, AnimatePresence } from 'framer-motion';

import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';



// =========================================================

// 1. DEFINE TYPES & MENU DATA

// =========================================================

export type IMenu = {

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

  {

    id: 3, title: 'Government Letter', url: '/government-letters', dropdown: false,

  },

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



// =========================================================

// 2. MAIN NAVBAR COMPONENT (Premium Sleek Look)

// =========================================================

export default function NavBar() {

  const [hovered, setHovered] = useState<number | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);



  const [position, setPosition] = useState({

    left: 0,

    width: 0,

    opacity: 0,

  });



  const toggleMobileExpand = (id: number) => {

    setMobileExpanded(mobileExpanded === id ? null : id);

  };



  const customShadowStyle = `

    .sliding-cursor-bg {

      background-color: rgba(255, 255, 255, 0.1);

      border-radius: 8px;

    }

    .premium-industry-font {

      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

      -webkit-font-smoothing: antialiased;

      -moz-osx-font-smoothing: grayscale;

    }

    /* Hide scrollbar for compact mobile menu */

    .no-scrollbar::-webkit-scrollbar {

      display: none;

    }

    .no-scrollbar {

      -ms-overflow-style: none;

      scrollbar-width: none;

    }

  `;



  return (

    <header className="w-full z-50">

      <style dangerouslySetInnerHTML={{ __html: customShadowStyle }} />



      <MotionConfig transition={{ bounce: 0, type: 'tween' }}>

        <nav

          className={'premium-industry-font relative flex h-16 items-center w-full justify-between lg:justify-center bg-[#003366] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)] border-b border-[#002244] px-4 lg:px-0'}

          onMouseLeave={() => {

            setPosition((pv) => ({ ...pv, opacity: 0 }));

            setHovered(null);

          }}

        >

          {/* Mobile Logo */}

          <div className="lg:hidden flex items-center">

            <span className="text-white font-bold text-lg tracking-tight">BPTPIA</span>

          </div>



          {/* Mobile Menu Toggle Button */}

          <button

            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

            className="lg:hidden relative z-50 flex items-center justify-center w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 active:scale-95 transition-all shadow-sm"

            aria-label="Toggle menu"

          >

            <AnimatePresence mode="wait">

              {mobileMenuOpen ? (

                <motion.div

                  key="close"

                  initial={{ rotate: -90, opacity: 0 }}

                  animate={{ rotate: 0, opacity: 1 }}

                  exit={{ rotate: 90, opacity: 0 }}

                  transition={{ duration: 0.15 }}

                >

                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />

                </motion.div>

              ) : (

                <motion.div

                  key="menu"

                  initial={{ rotate: 90, opacity: 0 }}

                  animate={{ rotate: 0, opacity: 1 }}

                  exit={{ rotate: -90, opacity: 0 }}

                  transition={{ duration: 0.15 }}

                >

                  <Menu className="w-5 h-5 text-white" strokeWidth={2.5} />

                </motion.div>

              )}

            </AnimatePresence>

          </button>



          {/* ============================================== */}

          {/* DESKTOP MENU (Unchanged - Already Optimized)     */}

          {/* ============================================== */}

          <ul className={'relative hidden lg:flex w-full max-w-[1200px] items-center justify-between px-4'}>

            <motion.li

              animate={position}

              transition={{ type: "spring", stiffness: 400, damping: 30 }}

              className="absolute z-0 h-10 sliding-cursor-bg pointer-events-none"

            />

            {universityMenus.map((item) => {

              const isHovered = hovered === item?.id;

              return (

                <li

                  key={item.id}

                  className={'relative z-10 h-full flex items-center'}

                  onMouseEnter={(e) => {

                    setHovered(item.id);

                    const { offsetWidth, offsetLeft } = e.currentTarget;

                    setPosition({ width: offsetWidth, left: offsetLeft, opacity: 1 });

                  }}

                >

                  <Link

                    href={item?.url}

                    className={`group relative flex items-center justify-center px-4 py-2 transition-colors duration-300 text-[15px] font-semibold tracking-wide ${isHovered ? 'text-orange-500' : 'text-gray-100 hover:text-orange-400'}`}

                  >

                    {item?.title}

                    {item.dropdown && (

                      <ChevronDown

                        className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ${isHovered ? 'rotate-180 text-orange-500' : 'text-gray-300 group-hover:text-orange-400'}`}

                        strokeWidth={2.5}

                      />

                    )}

                    {item.badge && (

                      <span className="ml-2 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-2 py-[2px] text-[9px] font-bold text-white tracking-widest shadow-sm shadow-orange-500/30">

                        {item.badge}

                      </span>

                    )}

                  </Link>

                  <AnimatePresence>

                    {item.dropdown && isHovered && (

                      <motion.div

                        initial={{ opacity: 0, y: 10 }}

                        animate={{ opacity: 1, y: 0 }}

                        exit={{ opacity: 0, y: 5 }}

                        transition={{ duration: 0.15, ease: "easeOut" }}

                        className="absolute top-full left-0 min-w-[240px] pt-1 z-[100]"

                      >

                        <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col py-2">

                          {item.items?.map((nav, navIndex) => (

                            <Link

                              key={nav.id}

                              href={nav.url}

                              className={`group flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors ${navIndex !== (item.items?.length || 0) - 1 ? 'border-b border-gray-100' : ''}`}

                              onClick={() => setHovered(null)}

                            >

                              <span className="text-[14px] text-gray-800 font-medium group-hover:text-[var(--color-brandOrange)] transition-colors">

                                {nav.title}

                              </span>

                              <ChevronRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-brandOrange)] transition-all transform -translate-x-2 group-hover:translate-x-0" />

                            </Link>

                          ))}

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </li>

              );

            })}

          </ul>



          {/* ============================================== */}

          {/* MOBILE MENU (Compact & Client Friendly)          */}

          {/* ============================================== */}

          <AnimatePresence>

            {mobileMenuOpen && (

              <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                transition={{ duration: 0.2 }}

                className="lg:hidden absolute left-0 right-0 top-full z-40 flex justify-end"

              >

                {/* Backdrop with slight blur */}

                <div

                  className="absolute inset-0 bg-[#001122]/60 backdrop-blur-sm"

                  onClick={() => setMobileMenuOpen(false)}

                />



                {/* Drawer Panel - Made slightly narrower for a sleeker look */}

                <motion.div

                  initial={{ x: '100%' }}

                  animate={{ x: 0 }}

                  exit={{ x: '100%' }}

                  transition={{ type: 'spring', stiffness: 350, damping: 35 }}

                  className="relative h-[calc(100vh-4rem)] w-[80%] max-w-[280px] bg-[#002b55] shadow-2xl border-l border-white/10 flex flex-col"

                >

                  {/* Scrollable Menu Items */}

                  <div className="flex-1 overflow-y-auto no-scrollbar p-3 pt-4">

                    <ul className="space-y-0.5">

                      {universityMenus.map((item) => (

                        <li key={item.id} className="border-b border-white/5 last:border-0">

                          {item.dropdown ? (

                            <div className="flex flex-col">

                              <button

                                onClick={() => toggleMobileExpand(item.id)}

                                className="w-full flex items-center justify-between px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-colors"

                              >

                                <span className="font-medium text-[14px]">{item.title}</span>

                                <ChevronDown

                                  className={`w-4 h-4 transition-transform duration-300 opacity-70 ${mobileExpanded === item.id ? 'rotate-180 text-orange-400 opacity-100' : ''}`}

                                />

                              </button>



                              <AnimatePresence>

                                {mobileExpanded === item.id && (

                                  <motion.div

                                    initial={{ height: 0, opacity: 0 }}

                                    animate={{ height: 'auto', opacity: 1 }}

                                    exit={{ height: 0, opacity: 0 }}

                                    transition={{ duration: 0.2 }}

                                    className="overflow-hidden"

                                  >

                                    <ul className="pl-4 pb-2 pt-1 space-y-0.5">

                                      {item.items?.map((subItem) => (

                                        <li key={subItem.id}>

                                          <Link

                                            href={subItem.url}

                                            onClick={() => setMobileMenuOpen(false)}

                                            className="flex items-center px-3 py-2 text-white/60 hover:text-orange-400 hover:bg-white/5 rounded-md transition-colors text-[13px] font-medium"

                                          >

                                            <ChevronRight className="w-3.5 h-3.5 mr-2 opacity-50" />

                                            {subItem.title}

                                          </Link>

                                        </li>

                                      ))}

                                    </ul>

                                  </motion.div>

                                )}

                              </AnimatePresence>

                            </div>

                          ) : (

                            <Link

                              href={item.url}

                              onClick={() => setMobileMenuOpen(false)}

                              className="flex items-center justify-between px-3 py-2.5 text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-colors"

                            >

                              <span className="font-medium text-[14px]">{item.title}</span>

                              {item.badge && (

                                <span className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-1.5 py-[2px] text-[8px] font-bold text-white shadow-sm">

                                  {item.badge}

                                </span>

                              )}

                            </Link>

                          )}

                        </li>

                      ))}

                    </ul>

                  </div>



                  {/* Sticky Mobile CTA at the bottom */}

                  <div className="p-4 border-t border-white/10 bg-[#002244]">

                    <Link

                      href="/admission"

                      onClick={() => setMobileMenuOpen(false)}

                      className="flex w-full items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold py-2.5 rounded-md shadow-md transition-all text-[14px] tracking-wide"

                    >

                      Apply Now

                    </Link>

                  </div>

                </motion.div>

              </motion.div>

            )}

          </AnimatePresence>

        </nav>

      </MotionConfig>

    </header>

  );

}