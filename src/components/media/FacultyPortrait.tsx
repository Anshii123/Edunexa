'use client';

import React from 'react';
import { EduImage } from '@/components/ui/EduImage';
import { MediaAsset } from '@/lib/media/types';
import { Star } from 'lucide-react';

export interface FacultyPortraitProps {
  src: string | MediaAsset;
  name: string;
  rating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-14 h-14 rounded-xl',
  md: 'w-20 h-20 rounded-xl',
  lg: 'w-28 h-28 rounded-2xl',
};

export function FacultyPortrait({
  src,
  name,
  rating,
  size = 'md',
  className = '',
}: FacultyPortraitProps) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`overflow-hidden border border-stone-200 shadow-sm ${sizeClass}`}>
        <EduImage
          src={src}
          alt={`Portrait of ${name}`}
          aspectRatio="1/1"
          zoomOnHover
        />
      </div>

      {rating !== undefined && (
        <div className="absolute -top-1.5 -right-1.5 flex items-center gap-1 text-[10px] font-bold text-stone-900 bg-white border border-stone-200 px-1.5 py-0.5 rounded-md shadow-sm">
          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
          <span>{rating}</span>
        </div>
      )}
    </div>
  );
}

