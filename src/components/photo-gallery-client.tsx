'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoLightbox from '@/components/photo-lightbox';

import { PhotoItem } from '@/types/gallery';

interface PhotoGalleryClientProps {
  images: PhotoItem[];
}

const PhotoGalleryClient: React.FC<PhotoGalleryClientProps> = ({ images }) => {
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    index: 0
  });

  const openLightbox = (index: number) => {
    setLightboxState({
      isOpen: true,
      index
    });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <div className="py-8 md:py-12 bg-gray-50/50">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 w-full">
        <div className="flex flex-col items-center mb-10">
          <h2 className="heading-xl">Our Photo Gallery</h2>
          <div className="w-24 h-1 bg-brandOrange rounded-full mb-4"></div>
          <p className="text-muted text-lg">
            Explore the vibrant life and events at Bihar Private Technical & Professional Institutions Association.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-2xl shadow-xl shadow-black/5 overflow-hidden border border-gray-100 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image Card Top */}
              <div 
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                
                {/* View Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-brandOrange text-white p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                </div>
              </div>

              {/* Text Content Bottom */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brandOrange transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  {/* Future tags or date can go here */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">No photos found in the gallery.</p>
          </div>
        )}
      </div>

      {/* Lightbox Component */}
      <PhotoLightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        images={images}
        initialIndex={lightboxState.index}
      />
    </div>
  );
};
export default PhotoGalleryClient;
