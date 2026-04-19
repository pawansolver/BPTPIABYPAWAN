'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, FileText, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import PhotoLightbox from '@/components/photo-lightbox';
import { PhotoItem } from '@/types/gallery';

interface LetterData {
  id: string;
  title: string;
  refNumber: string;
  date: string;
  subject: string;
  description: string;
  imageSrc: string; // Keep for backward compatibility
  images?: string[]; // Multiple images support
  category: string;
}

interface GovernmentLetterClientDetailsProps {
  letter: LetterData;
}

const GovernmentLetterClientDetails: React.FC<GovernmentLetterClientDetailsProps> = ({ letter }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use images array if provided, fallback to single imageSrc
  const rawImages = letter.images && letter.images.length > 0 
    ? letter.images 
    : [letter.imageSrc];
  
  // Filter out invalid/undefined/empty URLs
  const images = rawImages.filter(src => src && typeof src === 'string' && src.trim() !== '' && !src.includes('undefined') && !src.includes('null'));

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    skipSnaps: false
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Convert images to PhotoItem for the existing Lightbox component
  const lightboxImages: PhotoItem[] = images.map(src => ({
    src,
    title: letter.title,
    description: letter.subject
  }));

  const handleDownload = async () => {
    try {
      const response = await fetch(images[selectedIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${letter.title.replace(/\s+/g, '_')}_${letter.refNumber}_page_${selectedIndex + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      const link = document.createElement('a');
      link.href = images[selectedIndex];
      link.download = letter.title;
      link.click();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        
        {/* Left Column: Image Slider */}
        <div className="bg-white relative overflow-hidden group border-r border-slate-100 flex flex-col min-h-[500px] lg:min-h-[650px]">
          
          <div className="embla overflow-hidden h-full flex-grow cursor-pointer" ref={emblaRef} onClick={() => setIsLightboxOpen(true)}>
            <div className="embla__container flex h-full">
              {images.map((src, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 flex items-center justify-center p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                      src={src} 
                      alt={`${letter.title} - Page ${index + 1}`}
                      width={1000}
                      height={1400}
                      className="max-w-full max-h-[600px] object-contain select-none shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls (Only if multiple images) */}
          {images.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-slate-800 hover:bg-brandOrange hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
                disabled={selectedIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); scrollNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-slate-800 hover:bg-brandOrange hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
                disabled={selectedIndex === images.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots / Indicators */}
              <div className="flex justify-center gap-2 py-4 absolute bottom-4 left-0 right-0 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); emblaApi?.scrollTo(index); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? 'w-8 bg-brandOrange' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Counter Indicator */}
              <div className="absolute top-4 right-4 bg-slate-900/10 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest z-10">
                {selectedIndex + 1} / {images.length} Pages
              </div>
            </>
          )}
          
          {/* Fullscreen Overlay Label */}
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-slate-900 shadow-sm flex items-center border border-slate-100">
              <ExternalLink className="w-3.5 h-3.5 mr-2 text-brandOrange" />
              CLICK TO ZOOM
            </span>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex-grow">
            <div className="inline-block px-3 py-1 bg-brandOrange/10 text-brandOrange text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              {letter.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {letter.title}
            </h1>
            
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <FileText className="w-5 h-5 text-brandOrange mt-1 mr-4" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reference Number</p>
                    <p className="text-slate-800 font-semibold">{letter.refNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Calendar className="w-5 h-5 text-brandOrange mt-1 mr-4" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date Issued</p>
                    <p className="text-slate-800 font-semibold">{letter.date}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-brandGreen mb-3 border-l-4 border-brandOrange pl-4">Subject</h3>
                <p className="text-slate-600 leading-relaxed font-medium italic">
                  "{letter.subject}"
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-brandGreen mb-3 border-l-4 border-brandOrange pl-4">Summary</h3>
                <p className="text-slate-600 leading-relaxed">
                  {letter.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-8 space-y-4">
            <button 
              onClick={handleDownload}
              className="btn-primary w-full py-5 text-lg shadow-xl shadow-brandOrange/10"
            >
              <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              Download Official Letter
            </button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Digital Document • SECURE PDF/PNG
            </p>
          </div>
        </div>

      </div>

      {/* Lightbox Integration */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={selectedIndex}
      />
    </>
  );
};

export default GovernmentLetterClientDetails;
