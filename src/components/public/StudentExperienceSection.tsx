import React from 'react';
import Link from 'next/link';
import { EduImage } from '@/components/ui/EduImage';
import { 
  BookOpen, 
  Layers, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  ArrowRight 
} from 'lucide-react';

export function StudentExperienceSection() {
  const steps = [
    {
      number: '01',
      title: 'Conceptual Foundations',
      desc: 'Lectures structured around first principles, deconstructing complex formulas into intuitive proofs before timed problem-solving.',
      icon: BookOpen,
    },
    {
      number: '02',
      title: 'Deliberate Practice',
      desc: 'Multi-tiered problem sets spanning fundamental retention to unseen Olympiad-grade problem sets with step-by-step analyses.',
      icon: Layers,
    },
    {
      number: '03',
      title: 'Daily Mentorship Desks',
      desc: 'Direct access to faculty mentors every evening for unhurried, 1-on-1 doubt resolution in dedicated acoustic study cabins.',
      icon: MessageSquare,
    },
    {
      number: '04',
      title: 'Adaptive Progress Tracking',
      desc: 'Synchronized student workspace showing mastery metrics, speed percentiles, and personalized recommended revision modules.',
      icon: TrendingUp,
    },
    {
      number: '05',
      title: 'Scholar Community',
      desc: 'A vibrant culture of motivated peers collaborating on research papers, coding hackathons, and mock competitive simulations.',
      icon: Users,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.28] sm:leading-[1.3]">
            The student journey at Skillora: built around deliberate mastery
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
            From the morning masterclass to late-night study sessions, every hour is intentionally supported by teachers, peers, and personalized diagnostics.
          </p>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Visual Story & Student Highlight */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-md bg-white">
              <EduImage
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Students studying collaboratively in academic quad"
                aspectRatio="4/3"
                zoomOnHover
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-3">
              <p className="text-sm italic text-[#334155] leading-relaxed">
                "The evening mentorship desks transformed how I approach physics. Instead of memorizing solution patterns, my mentor pushed me to derive every relation from scratch."
              </p>
              <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">Aarav Sharma</span>
                <span>National Olympiad Gold Medalist</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/student/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-[#0F172A] hover:bg-[#2563EB] text-white shadow-xs transition-all text-xs"
              >
                <span>Preview Student Learning Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Editorial Numbered Workflow Rows */}
          <div className="lg:col-span-7 divide-y divide-black/[0.06]">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="py-7 first:pt-0 last:pb-0 flex items-start gap-6 group">
                  <div className="text-lg font-mono font-bold text-[#94A3B8] group-hover:text-[#2563EB] transition-colors shrink-0 pt-0.5">
                    {step.number}
                  </div>

                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] font-display">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
