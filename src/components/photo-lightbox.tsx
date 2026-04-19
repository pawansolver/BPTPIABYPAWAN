'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

import { PhotoItem } from '@/types/gallery';

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: PhotoItem[];
  initialIndex: number;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    startIndex: initialIndex,
    align: 'center',
    watchDrag: (emblaApi) => {
      // Disable embla dragging when zoomed in to allow panning
      return scale === 1;
    }
  });
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  // Update current index when embla settles
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const nextIndex = emblaApi.selectedScrollSnap();
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
      setScale(1); // Reset zoom on image change
    }
  }, [emblaApi, currentIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Sync embla with initialIndex if it changes when opening
  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(initialIndex, true);
      setScale(1);
    }
  }, [emblaApi, initialIndex, isOpen]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft' && scale === 1) scrollPrev();
      if (e.key === 'ArrowRight' && scale === 1) scrollNext();
      if (e.key === 'Escape') onClose();
      if (e.key === '=' || e.key === '+') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, scrollPrev, scrollNext, onClose, scale]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setScale(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-[10000]" onClick={e => e.stopPropagation()}>
            <div className="text-white font-medium text-sm md:text-lg bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Zoom Controls */}
              <div className="flex items-center bg-white/10 rounded-full p-1 backdrop-blur-md border border-white/10">
                <button 
                  onClick={handleZoomOut}
                  className="text-white/70 hover:text-white transition-colors p-2 disabled:opacity-30"
                  disabled={scale <= 1}
                  title="Zoom Out"
                >
                  <ZoomOut size={20} />
                </button>
                <div className="text-white/90 text-xs font-bold w-12 text-center select-none">
                  {Math.round(scale * 100)}%
                </div>
                <button 
                  onClick={handleZoomIn}
                  className="text-white/70 hover:text-white transition-colors p-2 disabled:opacity-30"
                  disabled={scale >= 4}
                  title="Zoom In"
                >
                  <ZoomIn size={20} />
                </button>
                {scale > 1 && (
                  <button 
                    onClick={resetZoom}
                    className="text-brandOrange hover:text-white transition-colors p-2"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
              </div>

              <button 
                onClick={toggleFullscreen}
                className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              
              <button 
                onClick={onClose}
                className="text-white/70 hover:text-brandOrange transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Slider Container */}
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-full overflow-hidden" ref={emblaRef}>
              <div className="flex h-full">
                {images.map((img, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center px-4">
                    <motion.div
                      className="relative h-[85vh] w-full flex items-center justify-center"
                      animate={{ scale }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      drag={scale > 1}
                      dragConstraints={{ left: -500 * scale, right: 500 * scale, top: -500 * scale, bottom: 500 * scale }}
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        className={`max-w-full max-h-full object-contain shadow-2xl rounded-sm select-none transition-shadow ${scale > 1 ? 'cursor-grab active:cursor-grabbing shadow-black/50' : ''}`}
                        draggable={false}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows (Only show if not zoomed or at 1x) */}
            {scale === 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-md border border-white/20 hidden md:flex"
                  onClick={scrollPrev}
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-md border border-white/20 hidden md:flex"
                  onClick={scrollNext}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>

          {/* Caption Area (Hide when zoomed) */}
          <AnimatePresence>
            {scale === 1 && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-center px-6 max-w-3xl mx-auto" 
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide mb-2">
                  {images[currentIndex].title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {images[currentIndex].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoLightbox;
