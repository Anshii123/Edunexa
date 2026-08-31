'use client';

import React from 'react';
import { EduImage } from '@/components/ui/EduImage';
import { MediaAsset } from '@/lib/media/types';

export interface CourseThumbnailProps {
  src: string | MediaAsset;
  alt: string;
  category?: string;
  className?: string;
}

export function CourseThumbnail({
  src,
  alt,
  category,
  className = '',
}: CourseThumbnailProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <EduImage
        src={src}
        alt={alt}
        aspectRatio="16/9"
        badge={category}
        zoomOnHover
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
