'use client';

import React, { useState, useEffect } from 'react';
import { MediaAsset, AspectRatioType } from '@/lib/media/types';
import { ImageOff } from 'lucide-react';

export interface EduImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | MediaAsset;
  alt?: string;
  aspectRatio?: AspectRatioType;
  fallbackSrc?: string;
  caption?: string;
  badge?: string;
  zoomOnHover?: boolean;
  priority?: boolean;
  imgClassName?: string;
  showCaptionOverlay?: boolean;
}

const ASPECT_RATIO_CLASSES: Record<AspectRatioType, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
  'auto': 'aspect-auto',
};

export function EduImage({
  src,
  alt,
  aspectRatio = '16/10',
  fallbackSrc = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
  caption,
  badge,
  zoomOnHover = false,
  priority = false,
  className = '',
  imgClassName = '',
  showCaptionOverlay = false,
  ...props
}: EduImageProps) {
  // Resolve MediaAsset vs string URL
  const isMediaAsset = typeof src === 'object' && src !== null;
  const imageUrl = isMediaAsset ? src.url : src;
  const imageAlt = alt || (isMediaAsset ? src.alt : 'EduNexa Academic Media');
  const imageCaption = caption || (isMediaAsset ? src.caption : undefined);
  const resolvedAspectRatio = aspectRatio || (isMediaAsset ? src.aspectRatio : '16/10') || '16/10';

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(imageUrl);
    setIsLoading(true);
    setHasError(false);

    // Fallback timer to guarantee loading spinner disappears even if onLoad event is swallowed by browser caching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [imageUrl]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const ratioClass = ASPECT_RATIO_CLASSES[resolvedAspectRatio] || 'aspect-[16/10]';

  return (
    <div
      className={`relative overflow-hidden bg-stone-100 ${ratioClass} ${className} group`}
      {...props}
    >
      {/* 1. Loading Skeleton / Shimmer State */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-stone-200/60 animate-pulse flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full border-2 border-stone-400/40 border-t-brand-800 animate-spin" />
        </div>
      )}

      {/* 2. Error Fallback State */}
      {hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-stone-100 text-stone-500 text-center space-y-2 border border-stone-200">
          <ImageOff className="w-7 h-7 text-stone-400" />
          <span className="text-xs font-medium">Image preview unavailable</span>
        </div>
      ) : (
        /* 3. Render Image */
        <img
          ref={imgRef}
          src={currentSrc}
          alt={imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-300 ${
            zoomOnHover ? 'group-hover:scale-105' : ''
          } ${imgClassName}`}
        />
      )}

      {/* Badge Tag */}
      {badge && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-[11px] font-semibold text-white shadow-sm">
          {badge}
        </div>
      )}

      {/* Bottom Caption Overlay */}
      {showCaptionOverlay && imageCaption && (
        <div className="absolute inset-x-0 bottom-0 z-20 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent">
          <p className="text-xs text-stone-100 font-medium truncate">
            {imageCaption}
          </p>
        </div>
      )}
    </div>
  );
}

