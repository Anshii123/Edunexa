'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { CourseCard } from '@/components/public/CourseCard';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Award,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Competitive Exams',
  'Engineering & IT',
  'Medical Sciences',
  'Management',
];

const LEVELS = ['All Levels', 'Comprehensive', 'Advanced', 'Intermediate', 'Foundation'];

export default function CoursesCatalogPage() {
  const allCourses = db.getCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'fee-low' | 'fee-high'>('featured');

  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((c) => {
        const matchesCategory =
          selectedCategory === 'All' || c.category === selectedCategory;
        const matchesLevel =
          selectedLevel === 'All Levels' || c.level === selectedLevel;
        const matchesSearch =
          searchQuery.trim() === '' ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesLevel && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fee-low') return (a.discountedFee || a.fee) - (b.discountedFee || b.fee);
        if (sortBy === 'fee-high') return (b.discountedFee || b.fee) - (a.discountedFee || a.fee);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [allCourses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5 text-brand-800" />
            <span>Academic Catalog 2026-2027</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Explore Programs & Cohorts
          </h1>
          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            From two-year Olympiad foundations to full-stack engineering boot-tracks and pre-med clinical mastery, find the coaching program engineered for your ambitions.
          </p>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-card space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs, subjects, Olympiad tracks, or skills..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-charcoal-900 placeholder-stone-400 focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all"
              />
            </div>

            {/* Level Select */}
            <div className="w-full md:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:border-brand-800 transition-all"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-white text-stone-900">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:border-brand-800 transition-all"
              >
                <option value="featured" className="bg-white text-stone-900">Featured First</option>
                <option value="rating" className="bg-white text-stone-900">Highest Rated</option>
                <option value="fee-low" className="bg-white text-stone-900">Fee: Low to High</option>
                <option value="fee-high" className="bg-white text-stone-900">Fee: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-stone-400" /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 border border-stone-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong className="text-charcoal-900">{filteredCourses.length}</strong> programs available</span>
          {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All Levels') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All Levels');
              }}
              className="text-brand-900 hover:text-brand-700 underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="h-full flex flex-col">
                <CourseCard course={course} />
                <div className="mt-2 text-center">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-700 transition-colors py-1 group"
                  >
                    <span>View Full Syllabus & Faculty Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/90 shadow-card space-y-4">
            <BookOpen className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="text-lg font-bold text-charcoal-900 font-display">No matching programs found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search keywords or clearing active filters to see all available cohorts.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All Levels');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-900 text-white hover:bg-brand-800"
            >
              Show All Programs
            </button>
          </div>
        )}

        {/* Scholarship Assessment Banner */}
        <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
              <Award className="w-4 h-4 text-amber-700" /> National Scholarship & Talent Hunt (NSTHE)
            </div>
            <h3 className="text-2xl font-extrabold text-charcoal-900 font-display tracking-tight">
              Qualify for Up to 100% Tuition Fee Remission
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
              Take our 90-minute conceptual diagnostic test. High performers receive direct scholarships and personalized batch allocations.
            </p>
          </div>
          <Link
            href="/admissions"
            className="px-6 py-3.5 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 text-white text-xs shadow-sm shrink-0 transition-all uppercase tracking-wider"
          >
            Apply for Scholarship Test
          </Link>
        </div>
      </div>
    </div>
  );
}

