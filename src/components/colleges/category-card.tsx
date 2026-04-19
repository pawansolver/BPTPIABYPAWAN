'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CollegeCategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  Icon: LucideIcon;
  color: string;
}

export default function CollegeCategoryCard({ title, description, image, href, Icon, color }: CollegeCategoryCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Floating Icon Badge */}
        <div 
          className="absolute bottom-4 left-4 p-3 rounded-lg backdrop-blur-md shadow-xl border border-white/20"
          style={{ backgroundColor: `${color}99` }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brandBlue transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>
        
        <Link 
          href={href}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all group/link"
          style={{ color: color }}
        >
          Explore More
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-50 group-hover/link:translate-x-1"
            style={{ color: 'white', backgroundColor: color }}
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Hover accent top line */}
      <div 
        className="absolute top-0 left-0 h-1 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: color, width: '0%' }}
      />
    </motion.div>
  );
}
