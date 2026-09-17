import React from 'react';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { LeadForm } from '@/components/public/LeadForm';
import { Award, CheckCircle2 } from 'lucide-react';

export function AdmissionsCtaSection() {
  const data = HOMEPAGE_DATA.admissionsCta;

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#F8F7F4] rounded-3xl p-8 sm:p-12 lg:p-16 border border-black/[0.08] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (6 cols): Admissions Roadmap & Merit Info */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display leading-[1.28] sm:leading-[1.3] tracking-tight">
              Begin your academic journey at Skillora
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Admissions are cohort-based to preserve small batch sizes and guaranteed 1-on-1 twilight faculty access. Apply for the upcoming semester or book a diagnostic assessment.
            </p>

            {/* 4-Step Roadmap */}
            <div className="space-y-4 pt-2">
              {data.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-display">{step.title}</h3>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Merit Scholarship Spotlight */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider font-mono">
                  {data.scholarshipHighlight.title}
                </div>
                <div className="text-xs text-amber-800 mt-0.5 font-medium">
                  Up to 100% fee remission via diagnostic score benchmark.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Embedded Interactive Lead Form in White Card */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/[0.08] shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-1">
                Apply for Admission / Diagnostic Test
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
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
