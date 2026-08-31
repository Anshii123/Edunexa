import React from 'react';
import { db } from '@/lib/db/storage';
import { Trophy, Star } from 'lucide-react';
import { SuccessStoryAvatar } from '@/components/media/SuccessStoryAvatar';

export default function ResultsPage() {
  const results = db.getResults();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 bg-[#FBF9F5]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Trophy className="w-3.5 h-3.5 text-amber-700" />
          <span>Hall of Fame & Placements</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Celebrating Extraordinary Achievements
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Year after year, EduNexa scholars secure top national entrance ranks, Olympiad medals, and high-impact engineering and medical placements.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">98.4%</div>
          <div className="text-xs text-stone-600 font-semibold uppercase mt-1 font-mono">Selection Rate</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-800 font-display">120+</div>
          <div className="text-xs text-stone-600 font-semibold uppercase mt-1 font-mono">Top 100 Ranks</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-display">$195k</div>
          <div className="text-xs text-stone-600 font-semibold uppercase mt-1 font-mono">Avg Tech Placement</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-brand-950 font-display">4,200+</div>
          <div className="text-xs text-stone-600 font-semibold uppercase mt-1 font-mono">Alumni Network</div>
        </div>
      </div>

      {/* Testimonials / Success Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-6 hover:shadow-card-hover transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-sm text-stone-700 italic leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-4">
              <SuccessStoryAvatar
                src={story.avatar}
                studentName={story.studentName}
              />
              <div>
                <h4 className="text-sm font-bold text-charcoal-900 font-display">{story.studentName}</h4>
                <div className="text-xs font-bold text-amber-800 font-mono">{story.rankOrScore}</div>
                <div className="text-[11px] text-stone-600 font-medium">{story.instituteAdmittedTo}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Program: {story.courseTaken}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

