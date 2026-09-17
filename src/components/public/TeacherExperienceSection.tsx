import React from 'react';
import Link from 'next/link';
import { EduImage } from '@/components/ui/EduImage';
import { 
  FileEdit, 
  Settings, 
  Users2, 
  BarChart3, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function TeacherExperienceSection() {
  const capabilities = [
    {
      icon: FileEdit,
      title: 'Curriculum & Content Creation',
      desc: 'Seamlessly upload lecture syllabi, problem sets, and video archives into structured, cohort-specific learning modules.',
    },
    {
      icon: Settings,
      title: 'Comprehensive Course Management',
      desc: 'Control batch enrollments, amphitheater timetables, and assignment release schedules with unified institute tools.',
    },
    {
      icon: Users2,
      title: 'Individual Student Mentorship',
      desc: 'Coordinate daily 1-on-1 doubt desks, give qualitative feedback on assignments, and mentor scholars through competitive exam stress.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Diagnostic Analytics',
      desc: 'Monitor class concept retention, average diagnostic percentiles, and attendance trends to intervene early when students struggle.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F7F4] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading directly */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.28] sm:leading-[1.3]">
            Empowering master educators to teach with focus and precision
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
            Skillora removes administrative overhead, giving faculty modern tools to author courses, guide students individually, and observe actual learning outcomes.
          </p>
        </div>

        {/* Visually Distinct Layout: Asymmetric Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): 4 Structured Capability Rows */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-black/[0.08] shadow-xs space-y-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] font-display">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-[#0F172A] hover:bg-[#2563EB] text-white shadow-xs transition-all text-xs"
              >
                <span>Explore Teacher Governance Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (6 cols): Realistic Faculty Photo & Editorial Badge */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-md bg-white">
              <EduImage
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
                alt="Teacher mentoring student in modern lecture amphitheater"
                aspectRatio="16/10"
                zoomOnHover
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between text-xs text-[#475569]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span className="font-semibold text-[#0F172A]">Dr. Arthur Sterling, Dean of Theoretical Physics</span>
              </div>
              <span className="text-[#64748B]">18+ Yrs Pedagogy</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
