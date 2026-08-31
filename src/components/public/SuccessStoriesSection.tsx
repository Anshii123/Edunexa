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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Student Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Success Stories & National Hall of Fame
          </h2>

          <p className="text-base text-stone-600 leading-relaxed">
            Real rankers and professionals who transformed their academic potential into MIT, AIIMS, and tier-1 tech career breakthroughs.
          </p>
        </div>

        <Link
          href="/results"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors shrink-0 group"
        >
          <span>View All Hall of Fame Records</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-6 hover:shadow-card-hover transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  Batch of {story.year}
                </span>
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
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-charcoal-900 font-display">{story.studentName}</h4>
                <div className="text-xs font-bold text-amber-800 font-mono">{story.rankOrScore}</div>
                <div className="text-[11px] text-stone-600 font-medium">{story.instituteAdmittedTo}</div>
                <div className="text-[10px] text-stone-400">{story.courseTaken}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

