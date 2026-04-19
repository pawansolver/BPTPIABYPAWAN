'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc }) => {
  const [zoom, setZoom] = useState(1);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  const handleDownload = async () => {
    if (!imageSrc) return;
    try {
      // Ensure we use the full backend URL for relative paths
      const fullUrl = imageSrc.startsWith('http') 
        ? imageSrc 
        : `${API_BASE_URL}${imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`}`;
        
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageSrc.split('/').pop() || 'government-letter.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="image-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="image-modal-close" onClick={onClose}>
              <X size={32} />
            </button>

            <div className="image-modal-view-wrapper">
              <img
                src={imageSrc}
                alt="Government Letter"
                className="image-modal-img"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            <div className="image-modal-controls">
              <button className="image-modal-btn" onClick={handleZoomOut} title="Zoom Out">
                <ZoomOut size={20} />
              </button>
              <span className="text-white font-medium min-w-[3ch] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button className="image-modal-btn" onClick={handleZoomIn} title="Zoom In">
                <ZoomIn size={20} />
              </button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              <button className="image-modal-btn download" onClick={handleDownload}>
                <Download size={20} />
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
