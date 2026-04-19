'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import PhotoGalleryClient from '@/components/photo-gallery-client';
import { PhotoItem } from '@/types/gallery';
import { Footer } from '@/components/ui/footer-section';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const PhotoGalleryPage = () => {
  const [galleryData, setGalleryData] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/photos?active=true`);
        const result = await response.json();
        
        if (result.success) {
          // Map backend Photo model to frontend PhotoItem type
          const mappedPhotos: PhotoItem[] = result.data.map((item: any) => ({
            src: `${API_BASE_URL}${item.imagePath}`,
            title: item.title,
            description: item.description || ''
          }));
          setGalleryData(mappedPhotos);
        }
      } catch (error) {
        console.error("Failed to fetch gallery photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Global Header (TopBar + NavBar) */}
      <Header />

      <main>
        {/* Gallery Content */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-brandOrange/20 border-t-brandOrange rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Galleries...</p>
          </div>
        ) : (
          <PhotoGalleryClient images={galleryData} />
        )}

        {/* Future Admin Notification */}
        <div className="container-custom pb-16">
          <div className="bg-brandOrange/5 border border-brandOrange/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Want to see more events?</h3>
              <p className="text-gray-600">Our gallery is updated regularly with photos from the latest association workshops, seminars, and meetings.</p>
            </div>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PhotoGalleryPage;