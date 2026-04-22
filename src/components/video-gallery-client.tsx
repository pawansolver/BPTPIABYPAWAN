'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, Video as VideoIcon } from 'lucide-react';
import VideoModal from './video-modal';
import { VideoItem } from '@/types/video';

const API_BASE_URL = "https://api.bihartechassociation.com";

const VideoGalleryClient = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // YouTube Thumbnail Helper
  const getYTThumb = (url: string) => {
    const idMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return idMatch ? `https://img.youtube.com/vi/${idMatch[1]}/maxresdefault.jpg` : '/media/placeholder-video.jpg';
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/videos?active=true`);
        const result = await response.json();
        
        if (result.success) {
          const mappedVideos: VideoItem[] = result.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description || '',
            thumbnail: getYTThumb(item.videoUrl),
            videoUrl: item.videoUrl,
            category: 'Gallery', // Default category
            duration: '' // Duration not stored in DB currently
          }));
          setVideos(mappedVideos);
        }
      } catch (error) {
        console.error("Failed to fetch gallery videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="py-8 md:py-12 bg-gray-50/50 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <h2 className="heading-xl">Association Video Gallery</h2>
          <div className="w-24 h-1 bg-brandOrange rounded-full mb-4"></div>
          <p className="text-muted text-lg">
            Stay updated with the latest events, workshops, and seminars through our professional video archives.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="animate-spin text-brandOrange mb-4" size={48} />
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Video Gallery...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
             <VideoIcon size={64} className="text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">No Videos Found</h3>
             <p className="text-gray-400 mt-2">Check back later for new updates.</p>
          </div>
        ) : (
          /* Video Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col bg-white rounded-[2rem] shadow-xl shadow-black/5 overflow-hidden border border-gray-100 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Thumbnail Area */}
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if maxresdefault doesn't exist
                      (e.target as HTMLImageElement).src = video.thumbnail.replace('maxresdefault.jpg', 'mqdefault.jpg');
                    }}
                  />
                  
                  {/* Overlay & Play Button */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-brandOrange text-white rounded-full flex items-center justify-center shadow-lg shadow-brandOrange/40 transform group-hover:scale-110 transition-transform duration-500"
                    >
                      <Play size={32} fill="white" className="ml-1" />
                    </motion.div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-brandOrange/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/10">
                    {video.category}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 pb-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brandOrange transition-colors leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedVideo(video)}
                      className="text-brandOrange font-bold text-sm uppercase tracking-widest hover:underline underline-offset-8 flex items-center gap-2 group/btn"
                    >
                      Watch Now
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ''}
        videoTitle={selectedVideo?.title || ''}
      />
    </div>
  );
};

export default VideoGalleryClient;
