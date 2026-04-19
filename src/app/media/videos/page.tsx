import React from 'react';
import Header from '@/components/header';
import VideoGalleryClient from '@/components/video-gallery-client';
import { Footer } from '@/components/ui/footer-section';

export const metadata = {
  title: 'Video Gallery | BPTPIA',
  description: 'Watch the latest events and seminars from the Bihar Private Technical & Professional Institutions Association.',
};

export default function VideoGalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Global Header (TopBar + NavBar) */}
      <Header />

      <main>
        {/* 2. Professional Video Gallery Section */}
        <VideoGalleryClient />

      </main>
        {/* Footer */}
            <Footer />
    </div>
  );
}
