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
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-black/[0.08] shadow-xs hover:shadow-md hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all duration-200 group">
      {/* Thumbnail with EduImage */}
      <Link href={`/courses/${course.slug}`} className="block relative h-48 w-full overflow-hidden bg-stone-100">
        <EduImage
          src={course.thumbnail}
          alt={course.title}
          aspectRatio="16/9"
          zoomOnHover
        />

        {/* Category & Badge (Light badges) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          <span className="px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-semibold text-[#0F172A] shadow-xs border border-black/[0.06]">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-2.5 py-1 rounded-md bg-amber-50 text-[11px] font-bold text-amber-800 border border-amber-200 shadow-xs">
              {course.badge}
            </span>
          )}
        </div>

        {/* Level Tag */}
        <div className="absolute bottom-3 left-3 z-20 text-xs font-semibold text-[#0F172A] bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs border border-black/[0.06]">
          {course.level} Level
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
            <span className="flex items-center gap-1 font-medium text-[#475569]">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {course.rating} ({course.reviewsCount})
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors font-display">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </h3>
          <p className="text-xs text-[#475569] mt-2 line-clamp-2 leading-relaxed font-normal">
            {course.shortDescription || course.description}
          </p>

          {/* Highlights */}
          <div className="mt-3.5 space-y-1.5 pt-3 border-t border-black/[0.06]">
            {course.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-[#334155]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info & CTAs */}
        <div className="pt-3.5 border-t border-black/[0.06] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#64748B] font-medium">Tuition</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#0F172A] font-display">
                {course.discountedFee ? formatCurrency(course.discountedFee) : formatCurrency(course.fee)}
              </span>
              {course.discountedFee && (
                <span className="text-xs text-[#94A3B8] line-through">
                  {formatCurrency(course.fee)}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
