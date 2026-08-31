'use client';

import React from 'react';
import { EduImage } from '@/components/ui/EduImage';
import { MediaAsset } from '@/lib/media/types';

export interface SuccessStoryAvatarProps {
  src: string | MediaAsset;
  studentName: string;
  className?: string;
}

export function SuccessStoryAvatar({
  src,
  studentName,
  className = '',
}: SuccessStoryAvatarProps) {
  return (
    <div className={`relative overflow-hidden w-13 h-13 rounded-full border border-stone-300 shadow-sm ${className}`}>
      <EduImage
        src={src}
        alt={`Portrait of ${studentName}`}
        aspectRatio="1/1"
        zoomOnHover
      />
    </div>
  );
}

