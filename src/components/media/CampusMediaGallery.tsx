'use client';

import React, { useState } from 'react';
import { getGalleryMedia } from '@/lib/media/registry';
import { MediaAsset } from '@/lib/media/types';
import { EduImage } from '@/components/ui/EduImage';
import { Maximize2, X } from 'lucide-react';

export function CampusMediaGallery() {
  const allImages = getGalleryMedia();
  const [selectedImage, setSelectedImage] = useState<MediaAsset | null>(null);

  return (
    <div className="space-y-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allImages.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setSelectedImage(asset)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-stone-200/90 hover:border-brand-800 transition-all duration-200 shadow-card hover:shadow-card-hover bg-white"
          >
            <EduImage
              src={asset}
              aspectRatio="16/10"
              zoomOnHover
              showCaptionOverlay
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/90 text-charcoal-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-charcoal-900 font-display">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedImage.caption}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-100">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

