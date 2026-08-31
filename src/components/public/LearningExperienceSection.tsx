import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { EduImage } from '@/components/ui/EduImage';
import { Compass, CheckCircle2 } from 'lucide-react';

export function LearningExperienceSection() {
  const data = HOMEPAGE_DATA.learningExperience;

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Compass className="w-3.5 h-3.5 text-brand-800" />
          <span>{data.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
          {data.title}
        </h2>

        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          {data.subtitle}
        </p>
      </div>

      {/* Alternating Architecture Rows */}
      <div className="space-y-20">
        {data.pillars.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-card bg-white">
                  <EduImage
                    src={item.media}
                    aspectRatio="16/10"
                    badge={item.badge}
                    zoomOnHover
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="text-xs font-mono font-bold text-brand-800 uppercase tracking-widest">
                  Facility Suite 0{index + 1}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2.5 pt-4 border-t border-stone-200/80">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

