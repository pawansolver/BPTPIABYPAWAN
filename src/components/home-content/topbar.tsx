'use client';

import Link from 'next/link';
import { FileText, Library, ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

// =========================================================================
// 1. STANDARD UNIVERSITY BUTTON COMPONENT
// =========================================================================
interface UniversityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const UniversityButton: React.FC<UniversityButtonProps> = ({
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "group relative flex items-center justify-center font-bold uppercase tracking-wide text-white rounded-md overflow-hidden transition-all shadow-sm hover:shadow-md active:scale-[0.95]",
        // Mobile par padding aur text size thoda adjust kiya taaki fit ho
        "px-2 py-2.5 text-[11px] min-[400px]:text-[12px] sm:px-4 sm:py-2.5 sm:text-[12px] md:px-5 md:py-2.5 md:text-[14px]",
        className
      )}
    >
      <span className="absolute left-0 top-0 bottom-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full z-0"></span>

      <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
        {icon && <span className="opacity-90">{icon}</span>}
        <span className="text-center">{children}</span>
        <ArrowRight className="hidden sm:block w-3 h-3 md:w-4 md:h-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
      </span>
    </button>
  );
};

// =========================================================================
// 2. MAIN TOPBAR COMPONENT
// =========================================================================
export default function TopBar() {
  return (
    <>
      {/* Header Container */}
      <div className="w-full bg-white relative z-50 shadow-sm py-4 lg:py-0 min-h-[90px] lg:h-[100px] flex items-center overflow-hidden">

        {/* Layout Container */}
        <div className="w-full max-w-[1450px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">

          {/* ========================================= */}
          {/* LEFT SIDE: LOGO + TITLE TEXT              */}
          {/* ========================================= */}
          <Link
            href="/"
            className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 outline-none w-full lg:w-auto"
          >
            {/* Logo - Mobile par size bada kar diya hai (90px - 100px) */}
            <img
              src="/logoWebsite/Logo_page.jpg"
              alt="BPTPIA Logo"
              className="h-[90px] sm:h-[100px] lg:h-[110px] w-auto object-contain transition-all flex-shrink-0"
              loading="eager"
            />

            {/* Title Text */}
            <div className="flex flex-col items-center lg:items-start justify-center w-full px-1 sm:px-0">
              <h1
                className="text-[#004b87] font-extrabold uppercase font-sans tracking-tighter m-0 text-center lg:text-left"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
              >
                {/* Mobile: whitespace-normal (Wrap hoga taaki kate nahi). Desktop: whitespace-nowrap (1 line me rahega) */}
                <span className="block whitespace-normal lg:whitespace-nowrap text-[13px] min-[400px]:text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[21px] leading-snug lg:scale-y-110 lg:origin-left">
                  BIHAR PRIVATE TECHNICAL & PROFESSIONAL INSTITUTIONS ASSOCIATION
                </span>
              </h1>
            </div>
          </Link>

          {/* ========================================= */}
          {/* RIGHT SIDE: BUTTONS                       */}
          {/* ========================================= */}
          {/* Mobile par w-full aur dono buttons ko flex-1 de diya taaki perfect half-half space lein */}
          <div className="flex flex-row items-center justify-center lg:justify-end gap-2 sm:gap-4 w-full lg:w-auto flex-shrink-0 mt-2 lg:mt-0">

            {/* Button 1: Admission */}
            <Link href="/admission" className="outline-none w-full sm:w-auto flex-1 sm:flex-none">
              <UniversityButton
                className="bg-[#003366] hover:bg-[#002244] w-full"
                icon={<FileText className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />}
              >
                <span className="hidden sm:inline">Admission Form</span>
                <span className="sm:hidden">Apply Form</span>
              </UniversityButton>
            </Link>

            {/* Button 2: Colleges */}
            <Link href="/colleges" className="outline-none w-full sm:w-auto flex-1 sm:flex-none">
              <UniversityButton
                className="bg-[#003366] hover:bg-[#002244] w-full"
                icon={<Library className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />}
              >
                <span className="hidden sm:inline">List of Colleges</span>
                <span className="sm:hidden">Colleges</span>
              </UniversityButton>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}