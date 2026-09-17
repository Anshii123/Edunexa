import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';

export function ImpactStatsSection() {
  const data = HOMEPAGE_DATA.impactStats;

  return (
    <section className="relative py-20 lg:py-24 bg-[#F8F7F4] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] font-display tracking-tight">
            {data.title}
          </h2>

          <p className="text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
            {data.subtitle}
          </p>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-black/[0.08] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {item.number}
                  </span>
                  <span className="text-2xl font-bold font-display text-[#2563EB]">
                    {item.suffix}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#0F172A] mt-3 font-display">
                  {item.label}
                </h3>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed border-t border-black/[0.06] pt-3 font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
