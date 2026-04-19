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

        "group relative flex items-center justify-center font-bold uppercase tracking-wider text-white rounded-md overflow-hidden transition-all shadow-sm hover:shadow-md active:scale-[0.95]",

        "px-3 py-2.5 text-[11px] sm:px-4 sm:py-2.5 sm:text-[12px] md:px-5 md:py-2.5 md:text-[13px]",

        className

      )}

    >

      <span className="absolute left-0 top-0 bottom-0 w-0 bg-black/20 transition-all duration-300 ease-out group-hover:w-full z-0"></span>



      <span className="relative z-10 flex items-center gap-1.5 md:gap-2">

        {icon && <span className="opacity-90">{icon}</span>}

        <span>{children}</span>

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

      {/* Header Container - Padding adjust ki hai taaki clean lage */}

      <div className="w-full bg-white relative z-50 shadow-sm border-b border-gray-300 py-3 md:py-0 md:h-[100px]">

       

        {/* MOBILE PAR: flex-col (upar niche), DESKTOP PAR: flex-row (aamne samne) */}

        <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-8 h-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">



          {/* ========================================= */}

          {/* UPAR WALA HISSA: LOGO (Mobile ke liye)    */}

          {/* ========================================= */}

          <Link

            href="/"

            className="relative outline-none w-full md:w-auto flex justify-center md:justify-start"

          >

            <img

              src="https://bihartechassociation.com/wp-content/uploads/2025/04/logo.png"

              alt="BPTPIA Logo"

              // Mobile par height mast dikhegi (50px), desktop pe 75px

              className="h-[50px] sm:h-[55px] md:h-[75px] w-auto object-contain transition-all"

              loading="eager"

            />

          </Link>



          {/* ========================================= */}

          {/* NICHE WALA HISSA: BUTTONS (Mobile ke liye)*/}

          {/* ========================================= */}

          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-2 sm:gap-4">

           

            {/* Button 1: Admission */}

            <Link href="/admission" className="outline-none w-1/2 md:w-auto">

              <UniversityButton

                className="bg-[#003366] w-full"

                icon={<FileText className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />}

              >

                <span className="hidden sm:inline">Admission Form</span>

                {/* Mobile par thoda chota text taaki fit ho */}

                <span className="sm:hidden">Apply Now</span>

              </UniversityButton>

            </Link>



            {/* Button 2: Colleges */}

            <Link href="/colleges" className="outline-none w-1/2 md:w-auto">

              <UniversityButton

                className="bg-[#003366] hover:bg-[#004080] w-full"

                icon={<Library className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />}

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