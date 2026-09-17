'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { CourseCard } from '@/components/public/CourseCard';
import { 
  Search, 
  Filter, 
  BookOpen,
  X
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

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All Levels');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] font-display tracking-tight leading-[1.25]">
            Explore Academic Programs & Cohorts
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
            From two-year Olympiad foundations to full-stack engineering boot-tracks and pre-med clinical mastery, find the coaching program engineered for your ambitions.
          </p>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-black/[0.08] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3.5">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs, subjects, Olympiad tracks, or skills..."
                className="w-full bg-[#F8F7F4] border border-black/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
              />
            </div>

            {/* Level Select */}
            <div className="w-full md:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#F8F7F4] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-white text-[#0F172A]">
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
                className="w-full bg-[#F8F7F4] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
              >
                <option value="featured" className="bg-white text-[#0F172A]">Featured First</option>
                <option value="rating" className="bg-white text-[#0F172A]">Highest Rated</option>
                <option value="fee-low" className="bg-white text-[#0F172A]">Tuition: Low to High</option>
                <option value="fee-high" className="bg-white text-[#0F172A]">Tuition: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-black/[0.06]">
            <span className="text-xs font-semibold text-[#64748B] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#94A3B8]" /> Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F8F7F4] text-[#475569] hover:text-[#0F172A] hover:bg-stone-200/60 border border-black/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <span>Showing <strong className="text-[#0F172A] font-semibold">{filteredCourses.length}</strong> programs</span>
          {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All Levels') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[#2563EB] hover:underline font-medium"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-black/[0.08] space-y-4 shadow-xs">
            <BookOpen className="w-12 h-12 text-[#94A3B8] mx-auto" />
            <h2 className="text-lg font-bold text-[#0F172A]">No programs match your search</h2>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Try adjusting your search query, selecting "All" categories, or resetting the level filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold shadow-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
