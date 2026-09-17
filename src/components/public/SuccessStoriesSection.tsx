import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { SuccessStoryAvatar } from '@/components/media/SuccessStoryAvatar';
import { Trophy, Star, ArrowRight } from 'lucide-react';

export function SuccessStoriesSection() {
  const results = db.getResults();

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
            Success Stories & National Hall of Fame
          </h2>

          <p className="text-base text-charcoal-600 leading-relaxed font-sans">
            Real rankers and professionals who transformed their academic potential into MIT, AIIMS, and tier-1 tech career breakthroughs.
          </p>
        </div>

        <Link
          href="/results"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0 group"
        >
          <span>View All Hall of Fame Records</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] shadow-card flex flex-col justify-between space-y-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold text-charcoal-500 bg-stone-50 px-2.5 py-1 rounded-md border border-black/[0.06]">
                  Batch of {story.year}
                </span>
              </div>

              <p className="text-base text-slate-700 font-serif italic leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center gap-4">
              <SuccessStoryAvatar
                src={story.avatar}
                studentName={story.studentName}
              />
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-navy-900 font-display">{story.studentName}</h4>
                <div className="text-xs font-bold text-indigo-600 font-mono">{story.rankOrScore}</div>
                <div className="text-[11px] text-charcoal-600 font-medium">{story.instituteAdmittedTo}</div>
                <div className="text-[10px] text-charcoal-400">{story.courseTaken}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

