import React from 'react';
import { CampusMediaGallery } from '@/components/media/CampusMediaGallery';
import { Image as ImageIcon, Video } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 bg-[#FBF9F5]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <ImageIcon className="w-3.5 h-3.5 text-brand-800" />
          <span>Campus Media & Tour</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Life & Learning at EduNexa
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Take an interactive visual tour through our tiered amphitheaters, high-performance simulation suites, quiet study cabins, and active student community.
        </p>
      </div>

      {/* Featured Campus Tour Video */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-card">
        <div className="flex items-center gap-2 text-brand-900 font-bold text-sm mb-4 px-2 font-display">
          <Video className="w-4 h-4 text-brand-800" />
          <span>Campus Video Tour: Daily Student Life & Facilities</span>
        </div>
        <div className="relative aspect-video max-h-[520px] w-full rounded-2xl overflow-hidden bg-stone-900">
          <video
            src="/assets/videos/campus-tour.mp4"
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Interactive Infrastructure Gallery */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-charcoal-900 font-display tracking-tight">Infrastructure Gallery</h2>
          <span className="text-xs text-stone-500 font-mono">Click any image to expand</span>
        </div>
        <CampusMediaGallery />
      </div>
    </div>
  );
}

