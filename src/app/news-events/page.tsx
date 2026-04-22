'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';
import PhotoLightbox from '@/components/photo-lightbox';

// Backend Data Interface
export type NewsItem = {
  id: number;
  date: string;
  title: string;
  contentType: 'PDF' | 'IMAGE' | 'LINK';
  actionUrl: string;
};

export default function NewsEventsPage() {
  // --- States ---
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lightbox States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ src: '', title: '' });

  const API_BASE_URL = "https://api.bihartechassociation.com";

  // --- Fetch Data from Backend ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/news?active=true`);
        const result = await response.json();
        if (result.success) {
          setNewsData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [API_BASE_URL]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- Click Handler for Rows ---
  const handleItemClick = (e: React.MouseEvent, item: NewsItem) => {
    if (item.contentType === 'IMAGE') {
      e.preventDefault(); // Prevent navigating to a new tab
      setLightboxData({
        src: `${API_BASE_URL}${item.actionUrl}`,
        title: item.title
      });
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <TopBar />
      <NavBar />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-[#003366] py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">List of News / Events</h1>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">News & Events</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
          <div className="mb-6">
            <Link href="/contact" className="text-blue-600 hover:underline text-sm font-medium">
              Any Queries
            </Link>
            <p className="text-red-600 text-sm mt-1">
              Click on Appropriate News / Events for details:
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white text-[14px]">
                    <th className="py-3 px-4 font-semibold w-16 text-center border-r border-gray-700">Sl. No.</th>
                    <th className="py-3 px-4 font-semibold w-32 border-r border-gray-700">Published Date</th>
                    <th className="py-3 px-6 font-semibold">News / Events</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-800">
                  {isLoading ? (
                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">Loading Latest News...</td></tr>
                  ) : newsData.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">No News or Events found.</td></tr>
                  ) : (
                    currentItems.map((item, index) => {
                      // Determine final URL based on content type
                      const finalUrl = item.contentType === 'LINK' ? item.actionUrl : `${API_BASE_URL}${item.actionUrl}`;

                      return (
                        <tr
                          key={`${item.id}-${index}`}
                          className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <td className="py-4 px-4 text-center border-r border-gray-100 font-medium">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap border-r border-gray-100">
                            {new Date(item.date).toLocaleDateString('en-GB')}
                          </td>
                          <td className="py-4 px-6">
                            <a
                              href={finalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => handleItemClick(e, item)}
                              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-2"
                            >
                              {item.title}
                              <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase no-underline">
                                [{item.contentType}]
                              </span>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-500 hidden sm:block">
                Showing <span className="font-medium text-gray-900">{indexOfFirstItem + 1}</span> to <span className="font-medium text-gray-900">{Math.min(indexOfLastItem, newsData.length)}</span> of <span className="font-medium text-gray-900">{newsData.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600'}`}>
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => { setCurrentPage(pageNumber); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${currentPage === pageNumber ? 'bg-blue-600 text-white border border-blue-600' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}>
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600'}`}>
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Lightbox Component for Images */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={[{ src: lightboxData.src, title: lightboxData.title, description: '' }]}
        initialIndex={0}
      />
    </div>
  );
}