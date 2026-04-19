'use client';

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import PhotoLightbox from "@/components/photo-lightbox";

// Backend Data Interface
export type NewsItem = {
  id: number;
  date: string;
  title: string;
  contentType: 'PDF' | 'IMAGE' | 'LINK';
  actionUrl: string;
};

export default function NewsWidget() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Data States
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ src: '', title: '' });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // --- Fetch Data ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/news?active=true`);
        const result = await response.json();
        if (result.success) {
          setNewsData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch news widget data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [API_BASE_URL]);

  // --- Auto-scroll logic (like a marquee) ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || newsData.length === 0) return;

    let animationFrameId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!isHovered) {
        scrollPos += 0.7;
        if (scrollPos >= el.scrollHeight * (2 / 3)) {
          scrollPos = 0;
        }
        el.scrollTop = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, newsData]);

  // --- Click Handler ---
  const handleItemClick = (e: React.MouseEvent, item: NewsItem) => {
    if (item.contentType === 'IMAGE') {
      e.preventDefault(); // Stop default navigation
      setLightboxData({
        src: `${API_BASE_URL}${item.actionUrl}`,
        title: item.title
      });
      setIsLightboxOpen(true); // Open image in lightbox
    }
  };

  // Use actual data without duplication
  const displayData = newsData;

  return (
    <>
      {/* FORMAL BOX STYLING */}
      <div className="w-full bg-white rounded-sm shadow-md border border-gray-200 flex flex-col h-full overflow-hidden relative border-t-4 border-t-[var(--color-brandOrange)]">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white shrink-0">
          <div className="flex items-center">
            <div className="w-1.5 h-6 bg-[var(--color-brandOrange)] mr-3 rounded-sm"></div>
            <FileText className="w-5 h-5 text-gray-700 mr-2" />
            <h3 className="font-bold text-gray-900 text-[17px] uppercase tracking-wide">News / Events</h3>
          </div>
          <Link
            href="/news-events"
            className="flex items-center gap-1 text-[13px] font-bold text-[#003366] hover:text-[var(--color-brandOrange)] transition-colors group uppercase tracking-wider"
          >
            View All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* SCROLLING CONTENT */}
        <div
          ref={scrollRef}
          className="flex-grow overflow-y-auto no-scrollbar relative bg-[#fafafa]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLoading ? (
            <div className="p-5 text-center text-sm text-gray-500 font-medium">Loading Latest Updates...</div>
          ) : newsData.length === 0 ? (
            <div className="p-5 text-center text-sm text-gray-500 font-medium">No Recent News Available.</div>
          ) : (
            <div className="flex flex-col">
              {displayData.map((item, index) => {
                const finalUrl = item.contentType === 'LINK' ? item.actionUrl : `${API_BASE_URL}${item.actionUrl}`;

                return (
                  <a
                    key={`${item.id}-${index}`}
                    href={finalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleItemClick(e, item)}
                    className="block group bg-white border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <div className="p-5 border-l-2 border-transparent group-hover:border-[var(--color-brandOrange)] transition-all">
                      
                      <div className="flex items-center mb-2">
                        <span className="bg-[#003366] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                          Pub - {new Date(item.date).toLocaleDateString('en-GB')}
                        </span>
                        {/* Type Indicator */}
                        <span className="ml-2 text-[10px] text-brandOrange font-bold uppercase">
                          {item.contentType}
                        </span>
                      </div>

                      <p className="text-[14px] text-gray-800 leading-relaxed font-semibold group-hover:text-[#003366] transition-colors break-words whitespace-normal">
                        {item.title}
                      </p>

                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Hide Scrollbar CSS */}
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>

      {/* Lightbox for Images */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={[{ src: lightboxData.src, title: lightboxData.title, description: '' }]}
        initialIndex={0}
      />
    </>
  );
}