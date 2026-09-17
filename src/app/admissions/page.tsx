'use client';

import React, { useState } from 'react';
import { LeadForm } from '@/components/public/LeadForm';
import {
  Sparkles,
  Award,
  HelpCircle,
  Layers
} from 'lucide-react';

const ELIGIBILITY_RULES = [
  {
    category: 'STEM & Competitive Olympiad Track',
    criteria: 'Class 10 / 11 students with min 75% in Science & Mathematics, or qualified via NSTHE diagnostic entrance score.',
    intake: 'September & January Batches',
  },
  {
    category: 'Full-Stack Software Engineering & Applied AI',
    criteria: 'Undergraduate STEM students, CS graduates, or working engineers seeking staff-tier career acceleration.',
    intake: 'Rolling Monthly Cohorts',
  },
  {
    category: 'Pre-Med Clinical Excellence & Biology',
    criteria: 'Class 10 / 11 / 12 students with Biology and Chemistry as primary academic subjects.',
    intake: 'October Intensive Cohort',
  },
  {
    category: 'Executive Business Analytics & Leadership',
    criteria: 'Graduates, consultants, and business analysts with quantitative analytical aptitude.',
    intake: 'Quarterly Executive Cohorts',
  },
];

const FAQS = [
  {
    q: 'How does the National Scholarship Talent Hunt (NSTHE) work?',
    a: 'NSTHE is a 90-minute conceptual test evaluated across analytical reasoning, mental aptitude, and core subject foundations. Top 15% rankers receive up to 100% tuition fee waivers.',
  },
  {
    q: 'Can I switch between classroom and online live modes during the semester?',
    a: 'Yes, our Hybrid model allows complete fluidity. You can attend live in smart amphitheaters or join real-time interactive streams from anywhere with zero disruption.',
  },
  {
    q: 'What study materials and kits are provided upon enrollment?',
    a: 'All enrolled scholars receive our complete proprietary 40-volume curriculum, 15-year entrance problem banks, 24/7 LMS portal credentials, and dedicated twilight doubt desk access.',
  },
  {
    q: 'Is there a refund or batch transfer policy?',
    a: 'Yes, we provide a 14-day transparent refund trial period from the first official lecture date.',
  },
];

export default function AdmissionsPage() {
  const [formMode, setFormMode] = useState<'application' | 'enquiry'>('application');

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-16 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
            Begin Your Academic Ascent at EduNexa
          </h1>
          <p className="text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-sans">
            Transparent admissions with nationwide merit scholarship opportunities, 1-on-1 diagnostic roadmap sessions, and personalized batch placement.
          </p>
        </div>

        {/* Main Grid: Pathway & Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (6 cols): Pathway & Scholarship Matrix */}
          <div className="lg:col-span-6 space-y-8">
            {/* 4-Step Admission Pathway */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-card space-y-6">
              <h2 className="text-2xl font-bold text-navy-900 font-display flex items-center gap-2 tracking-tight">
                <Layers className="w-5 h-5 text-indigo-600" /> 4-Step Admission Roadmap
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    01
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 font-display">Submit Application Profile</h3>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed font-sans">
                      Select your target program, share your academic credentials, and choose your preferred delivery mode (Classroom, Online, or Hybrid).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    02
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 font-display">Take Diagnostic Test (NSTHE)</h3>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed font-sans">
                      Complete our 90-minute conceptual assessment online or at our campus. Qualify for up to 100% tuition scholarships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    03
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 font-display">1-on-1 Academic Counseling</h3>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed font-sans">
                      Meet with a senior subject dean to review diagnostic analytics and customize your personalized 12-to-24 month milestone schedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    04
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 font-display">Batch Onboarding & Portal Access</h3>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed font-sans">
                      Receive your student ID card, 40-volume physical kit, and unlock 24/7 access to the EduNexa Digital Learning Portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scholarship Spotlight Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 border border-amber-500/25 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm uppercase tracking-wider font-mono">
                <Award className="w-5 h-5 text-amber-600" />
                <span>National Scholarship Talent Hunt (NSTHE 2026)</span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                Over <strong className="text-navy-900 font-semibold">$1.4 Million</strong> in merit-based fee remissions disbursed annually. Eligible across all STEM, Pre-Med, and Software cohorts.
              </p>
            </div>
          </div>

          {/* Right Column (6 cols): Form Section with Mode Tabs */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-card space-y-6">
              {/* Form Header */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 font-display">
                  Admissions & Diagnostic Registration
                </h3>
                <p className="text-xs text-charcoal-500 mt-1 font-sans">
                  Fill in your details below. You will receive an instant application reference ID and counselor callback.
                </p>
              </div>

              {/* Form Mode Selector */}
              <div className="flex rounded-xl bg-stone-100 p-1 border border-black/[0.06] text-xs">
                <button
                  type="button"
                  onClick={() => setFormMode('application')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${formMode === 'application'
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'text-charcoal-600 hover:text-navy-900'
                    }`}
                >
                  Full Application
                </button>
                <button
                  type="button"
                  onClick={() => setFormMode('enquiry')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${formMode === 'enquiry'
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                      : 'text-charcoal-600 hover:text-navy-900'
                    }`}
                >
                  Quick Course Enquiry
                </button>
              </div>

              <LeadForm formType={formMode === 'application' ? 'Admission Application' : 'Course Enquiry'} />
            </div>
          </div>
        </div>

        {/* Eligibility Criteria Matrix */}
        <div className="space-y-6 pt-8 border-t border-black/[0.06]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display tracking-tight">
              Cohort Eligibility & Intake Matrix
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 font-sans">
              Clear academic criteria ensuring dedicated peer groups and high-impact learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ELIGIBILITY_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card space-y-3 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900 font-display">{rule.category}</h3>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {rule.intake}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                  {rule.criteria}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions FAQs */}
        <div className="space-y-6 pt-8 border-t border-black/[0.06]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display flex items-center justify-center gap-2 tracking-tight">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 font-sans">
              Common questions regarding NSTHE tests, fees, batch shifts, and study materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card space-y-2 hover:shadow-card-hover transition-all"
              >
                <h4 className="text-sm font-bold text-navy-900 font-display">{faq.q}</h4>
                <p className="text-xs text-charcoal-600 leading-relaxed font-sans">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

