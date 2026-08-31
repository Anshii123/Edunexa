'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { EduImage } from '@/components/ui/EduImage';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-stone-200/90 shadow-card hover:shadow-card-hover transition-all duration-200 group">
      {/* Thumbnail with EduImage */}
      <Link href={`/courses/${course.slug}`} className="block relative h-48 w-full overflow-hidden bg-stone-100">
        <EduImage
          src={course.thumbnail}
          alt={course.title}
          aspectRatio="16/9"
          zoomOnHover
        />
        
        {/* Category & Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-[11px] font-semibold text-white">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500/90 backdrop-blur-sm text-[11px] font-bold text-stone-950">
              {course.badge}
            </span>
          )}
        </div>

        {/* Level Tag */}
        <div className="absolute bottom-3 left-3 z-20 text-xs font-semibold text-stone-800 bg-white/90 px-2.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
          {course.level} Level
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {course.rating} ({course.reviewsCount})
            </span>
          </div>

          <h3 className="text-lg font-bold text-charcoal-900 leading-snug group-hover:text-brand-800 transition-colors font-display">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>
          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {course.shortDescription || course.description}
          </p>

          {/* Highlights */}
          <div className="mt-3.5 space-y-1.5 pt-3 border-t border-stone-100">
            {course.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-stone-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info & CTAs */}
        <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-stone-500 font-medium">Total Program Tuition</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-charcoal-900 font-display">
                {course.discountedFee ? formatCurrency(course.discountedFee) : formatCurrency(course.fee)}
              </span>
              {course.discountedFee && (
                <span className="text-xs text-stone-400 line-through">
                  {formatCurrency(course.fee)}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-900 hover:bg-brand-800 text-white shadow-sm transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

