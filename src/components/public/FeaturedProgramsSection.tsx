'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { CourseCard } from '@/components/public/CourseCard';
import { EduImage } from '@/components/ui/EduImage';
import { formatCurrency } from '@/lib/utils';
import { 
  ArrowRight, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

export function FeaturedProgramsSection() {
  const allCourses = db.getCourses();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Competitive Exams', 'Engineering & IT', 'Medical Sciences', 'Management'];

  // Identify featured flagship course
  const featuredCourse = allCourses.find(c => c.featured) || allCourses[0];

  // Supporting courses (excluding the featured one if showing All, or filtered)
  const supportingCourses = (selectedCategory === 'All'
    ? allCourses.filter(c => c.id !== featuredCourse?.id)
    : allCourses.filter(c => c.category === selectedCategory && c.id !== featuredCourse?.id)
  ).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F7F4] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.28] sm:leading-[1.3]">
              Carefully engineered courses built around real outcomes
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              From competitive Olympiads to pre-med clinical mastery and computer science architectures, discover rigorous cohorts led by premier faculty.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0 group"
          >
            <span>Explore all {allCourses.length} programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 1. Featured Flagship Course (Large Visual + Detailed Overview) */}
        {featuredCourse && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.08] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (6 cols): Large Visual Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-black/[0.06] shadow-xs bg-stone-100 relative">
                <EduImage
                  src={featuredCourse.thumbnail}
                  alt={featuredCourse.title}
                  aspectRatio="16/10"
                  zoomOnHover
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Meta Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#475569] pt-1">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#0F172A]">
                  <Clock className="w-4 h-4 text-[#2563EB]" />
                  {featuredCourse.duration}
                </span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {featuredCourse.rating} ({featuredCourse.reviewsCount} reviews)
                </span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="font-medium text-[#0F172A]">
                  {featuredCourse.level} Level
                </span>
              </div>
            </div>

            {/* Right Column (6 cols): Deep Course Information */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Flagship Cohort
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight leading-snug">
                <Link href={`/courses/${featuredCourse.slug}`} className="hover:text-[#2563EB] transition-colors">
                  {featuredCourse.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                {featuredCourse.description || featuredCourse.shortDescription}
              </p>

              {/* Curriculum & Features Checklist */}
              <div className="space-y-2 pt-2 border-t border-black/[0.06]">
                {featuredCourse.highlights.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Faculty Anchor & Tuition */}
              <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-medium text-[#64748B]">Total Tuition</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#0F172A] font-display">
                      {featuredCourse.discountedFee
                        ? formatCurrency(featuredCourse.discountedFee)
                        : formatCurrency(featuredCourse.fee)}
                    </span>
                    {featuredCourse.discountedFee && (
                      <span className="text-sm text-[#94A3B8] line-through">
                        {formatCurrency(featuredCourse.fee)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/courses/${featuredCourse.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs"
                  >
                    <span>View Syllabus & Cohort Schedule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. Supporting Courses Section with Category Filtering */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-4">
            <h3 className="text-xl font-bold text-[#0F172A] font-display">
              More Specialized Programs
            </h3>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none ${
                    selectedCategory === cat
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-white text-[#475569] hover:text-[#0F172A] hover:bg-stone-50 border border-black/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Supporting Courses Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
