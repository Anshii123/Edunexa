'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { CourseCard } from '@/components/public/CourseCard';
import { BookOpen, ArrowRight } from 'lucide-react';

export function FeaturedProgramsSection() {
  const allCourses = db.getCourses();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Competitive Exams', 'Engineering & IT', 'Medical Sciences', 'Management'];

  const filteredCourses = selectedCategory === 'All'
    ? allCourses
    : allCourses.filter(c => c.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5 text-brand-800" />
            <span>Academic Programs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Flagship Programs & Coaching Cohorts
          </h2>

          <p className="text-base text-stone-600 leading-relaxed">
            Engineered with conceptual rigor, multi-concept problem banks, and 1-on-1 twilight doubt mentorship.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors shrink-0 group"
        >
          <span>View All {allCourses.length} Programs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-200/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all select-none ${
              selectedCategory === cat
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 border border-stone-200/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

