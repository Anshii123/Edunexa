import React from 'react';
import { db } from '@/lib/db/storage';
import { Trophy, Star } from 'lucide-react';
import { SuccessStoryAvatar } from '@/components/media/SuccessStoryAvatar';

export default function ResultsPage() {
  const results = db.getResults();

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-16 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
            Celebrating Extraordinary Achievements
          </h1>
          <p className="text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-sans">
            Year after year, EduNexa scholars secure top national entrance ranks, Olympiad medals, and high-impact engineering and medical placements.
          </p>
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card text-center hover:shadow-card-hover transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-display">98.4%</div>
            <div className="text-xs text-charcoal-600 font-semibold uppercase mt-1 font-mono">Selection Rate</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card text-center hover:shadow-card-hover transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-display">120+</div>
            <div className="text-xs text-charcoal-600 font-semibold uppercase mt-1 font-mono">Top 100 Ranks</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card text-center hover:shadow-card-hover transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-display">$195k</div>
            <div className="text-xs text-charcoal-600 font-semibold uppercase mt-1 font-mono">Avg Tech Placement</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card text-center hover:shadow-card-hover transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-violet-600 font-display">4,200+</div>
            <div className="text-xs text-charcoal-600 font-semibold uppercase mt-1 font-mono">Alumni Network</div>
          </div>
        </div>

        {/* Testimonials / Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-card flex flex-col justify-between space-y-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-700 italic leading-relaxed font-sans">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center gap-4">
                <SuccessStoryAvatar
                  src={story.avatar}
                  studentName={story.studentName}
                />
                <div>
                  <h4 className="text-sm font-bold text-navy-900 font-display">{story.studentName}</h4>
                  <div className="text-xs font-bold text-indigo-600 font-mono">{story.rankOrScore}</div>
                  <div className="text-[11px] text-charcoal-600 font-medium">{story.instituteAdmittedTo}</div>
                  <div className="text-[10px] text-charcoal-400 mt-0.5">Program: {story.courseTaken}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

