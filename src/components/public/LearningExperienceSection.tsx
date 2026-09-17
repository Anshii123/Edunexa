import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { EduImage } from '@/components/ui/EduImage';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LearningExperienceSection() {
  const data = HOMEPAGE_DATA.learningExperience;

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section Header directly without tiny preheadings */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.28] sm:leading-[1.3]">
          Designed for immersive, first-principles learning
        </h2>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
          Every space at Skillora is engineered to bridge abstract academic theory with hands-on computational, clinical, and Olympiad problem solving.
        </p>
      </div>

      {/* Asymmetric Alternating Editorial Rows */}
      <div className="space-y-16 sm:space-y-20">
        {data.pillars.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white p-6 sm:p-10 rounded-3xl border border-black/[0.06] shadow-xs"
            >
              {/* Image Column (7 cols) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm bg-stone-100">
                  <EduImage
                    src={item.media}
                    aspectRatio="16/10"
                    zoomOnHover
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Narrative & Points Column (5 cols) */}
              <div className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2.5 pt-3 border-t border-black/[0.06]">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group"
                  >
                    <span>Explore facility specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
