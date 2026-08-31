'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Pin, 
  Calendar, 
  User
} from 'lucide-react';
import { Notice } from '@/types';

const CATEGORIES = ['All', 'Academic', 'Exams', 'Events', 'General'];

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') queryParams.set('category', selectedCategory);
        if (searchQuery.trim()) queryParams.set('q', searchQuery.trim());

        const res = await fetch(`/api/student/notices?${queryParams.toString()}`);
        const json = await res.json();
        if (json.success) {
          setNotices(json.data);
        }
      } catch (err) {
        console.error('Failed to load notices', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotices();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Bell className="w-3.5 h-3.5 text-amber-700" />
          <span>Institute Announcements</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Notices & Official Circulars
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Stay updated with examination schedules, holiday circulars, and academic board announcements.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, exams, schedules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Feed */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-stone-200" />
          ))}
        </div>
      ) : notices.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-stone-200 text-center space-y-3 shadow-card">
          <Bell className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-charcoal-900 font-display">No Circulars Found</h3>
          <p className="text-xs text-stone-500">
            There are no notices matching your current search or category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((not) => (
            <div
              key={not.id}
              className={`bg-white rounded-2xl p-6 border shadow-card space-y-3.5 transition-all ${
                not.isPinned
                  ? 'border-amber-300 bg-amber-50/40'
                  : 'border-stone-200/90'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {not.isPinned && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 flex items-center gap-1 font-mono">
                      <Pin className="w-3 h-3 text-amber-700" /> Pinned Announcement
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200 font-mono">
                    {not.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Published: {not.publishDate}</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-charcoal-900 font-display tracking-tight">
                {not.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {not.content}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-800" />
                  <span>Issued by: <strong className="text-charcoal-900">{not.author}</strong></span>
                </span>
                <span className="text-[11px] text-emerald-800 font-mono">Target: {not.targetAudience}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

