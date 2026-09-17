import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import {
  GraduationCap,
  Target,
  BookOpen,
  Building2,
  Trophy,
  Award,
  CheckCircle2
} from 'lucide-react';

export function WhyChooseSection() {
  const data = HOMEPAGE_DATA.whyChoose;

  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-[#4338CA]" />,
    Target: <Target className="w-5 h-5 text-[#4338CA]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#0891B2]" />,
    Building2: <Building2 className="w-5 h-5 text-[#D97706]" />,
    Trophy: <Trophy className="w-5 h-5 text-[#D97706]" />,
    Award: <Award className="w-5 h-5 text-[#7C3AED]" />,
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F1F0FA] border-y border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] font-display tracking-tight">
            {data.title}
          </h2>

          <p className="text-base text-[#4B5563] leading-relaxed max-w-2xl mx-auto font-normal">
            {data.subtitle}
          </p>
        </div>

        {/* 6-Pillar Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] shadow-card flex flex-col justify-between space-y-5 hover:shadow-card-hover hover:border-indigo-500/30 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#F1F0FA] border border-indigo-100 flex items-center justify-center">
                    {iconMap[pillar.iconName] || <GraduationCap className="w-5 h-5 text-[#4338CA]" />}
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#9CA3AF] border border-black/[0.08] px-2 py-0.5 rounded">
                    {pillar.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#111827] font-display group-hover:text-[#4338CA] transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Feature bullet list */}
              <div className="space-y-2 pt-4 border-t border-black/[0.06]">
                {pillar.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#374151]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

