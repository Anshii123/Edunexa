import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { Trophy } from 'lucide-react';

export function ImpactStatsSection() {
  const data = HOMEPAGE_DATA.impactStats;

  const accentStyles = {
    emerald: {
      text: 'text-emerald-800',
    },
    gold: {
      text: 'text-amber-800',
    },
    brand: {
      text: 'text-brand-900',
    },
    purple: {
      text: 'text-brand-950',
    },
  };

  return (
    <section className="relative py-20 bg-[#F4F1EA] border-y border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight">
            {data.title}
          </h2>

          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((item, i) => {
            const style = accentStyles[item.accent];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4 hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl sm:text-5xl font-extrabold font-display tracking-tight ${style.text}`}>
                      {item.number}
                    </span>
                    <span className={`text-2xl font-bold font-display ${style.text}`}>
                      {item.suffix}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-charcoal-900 mt-3 font-display">
                    {item.label}
                  </h3>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

