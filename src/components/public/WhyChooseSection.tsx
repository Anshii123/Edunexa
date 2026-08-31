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
    GraduationCap: <GraduationCap className="w-5 h-5 text-brand-900" />,
    Target: <Target className="w-5 h-5 text-brand-800" />,
    BookOpen: <BookOpen className="w-5 h-5 text-emerald-800" />,
    Building2: <Building2 className="w-5 h-5 text-amber-800" />,
    Trophy: <Trophy className="w-5 h-5 text-amber-700" />,
    Award: <Award className="w-5 h-5 text-rose-800" />,
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F4F1EA] border-y border-stone-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
            {data.title}
          </h2>

          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* 6-Pillar Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-5 hover:shadow-card-hover transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center">
                    {iconMap[pillar.iconName] || <GraduationCap className="w-5 h-5 text-brand-900" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400 border border-stone-200 px-2 py-0.5 rounded">
                    {pillar.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-charcoal-900 font-display group-hover:text-brand-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-800 mt-1 font-mono">
                    {pillar.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Feature bullet list */}
              <div className="space-y-2 pt-4 border-t border-stone-100">
                {pillar.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
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

