import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { LeadForm } from '@/components/public/LeadForm';
import { Sparkles, Award } from 'lucide-react';

export function AdmissionsCtaSection() {
  const data = HOMEPAGE_DATA.admissionsCta;

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-12 lg:p-14 border border-stone-200/90 shadow-card relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column (6 cols): Admissions Roadmap & Scholarship Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{data.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display leading-[1.14] tracking-tight">
              {data.title}
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              {data.subtitle}
            </p>

            {/* 4-Step Roadmap */}
            <div className="space-y-4 pt-2">
              {data.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 text-brand-900 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal-900 font-display">{step.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Merit Scholarship Spotlight */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider font-mono">
                  {data.scholarshipHighlight.title}
                </div>
                <div className="text-xs text-stone-700 mt-0.5 font-medium">
                  Up to 100% fee remission via diagnostic score benchmark.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Embedded Interactive Lead Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-card">
              <h3 className="text-lg font-bold text-charcoal-900 font-display mb-1">
                Apply for Admission / Diagnostic Test
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Receive personalized syllabus blueprints & scholarship assessment slot.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

