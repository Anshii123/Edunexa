import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Compass,
  ArrowRight,
  Award,
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle2,
  Building2,
  Cpu,
  Library
} from 'lucide-react';
import { EduImage } from '@/components/ui/EduImage';

export default function AboutPage() {
  const milestones = [
    {
      year: '2008',
      title: 'Foundation & Theoretical Physics Lab',
      description: 'Established as an advanced physics and mathematics laboratory focused on Olympiad problem formulation and derivation rigor.',
    },
    {
      year: '2014',
      title: 'Pre-Med Clinical Sciences Division',
      description: 'Integrated 3D bio-simulation anatomy suites and comprehensive medical entrance pedagogy under Harvard and AIIMS alumni.',
    },
    {
      year: '2019',
      title: 'The Academic Innovation Quad',
      description: 'Opened the flagship 45,000 sq ft campus featuring smart lecture amphitheaters, quiet study cabins, and developer cloud pods.',
    },
    {
      year: '2024',
      title: 'Diagnostic Pedagogy & Analytics',
      description: 'Integrated continuous diagnostic retention analytics mapping unseen problem retention across 15,000+ scholars.',
    },
  ];

  const pillars = [
    {
      icon: BookOpen,
      title: 'First-Principles Rigor',
      description: 'We deconstruct complex multivariable calculus, quantum mechanics, and organic pathways down to foundational principles before timed problem-solving.',
    },
    {
      icon: Users,
      title: 'Daily Mentorship Desks',
      description: 'Dedicated twilight study booths paired with subject deans ensure zero unaddressed doubts and personalized strategic guidance.',
    },
    {
      icon: Cpu,
      title: 'Research-Grade Infrastructure',
      description: 'Smart tiered amphitheaters, high-concurrency cloud computing clusters, and 3D anatomical simulation labs provide immersive learning.',
    },
    {
      icon: ShieldCheck,
      title: 'Quantitative Mastery',
      description: 'Continuous diagnostic testing maps individual weakness patterns, generating custom problem sets tailored to each scholar.',
    },
  ];

  const facultyLeadership = [
    {
      name: 'Dr. Arthur Sterling',
      title: 'Dean of Theoretical Physics',
      qualifications: 'Ph.D. in Theoretical Physics, MIT',
      experience: '18+ Years',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Former International Physics Olympiad coach who has guided 45+ gold medalists and 120+ top 100 national rankers.',
    },
    {
      name: 'Prof. Sarah Lin',
      title: 'Head of Biological Sciences',
      qualifications: 'Ph.D. in Molecular Genetics, Harvard',
      experience: '15+ Years',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered clinical anatomy simulation curricula with an unprecedented 98.4% competitive qualification benchmark.',
    },
    {
      name: 'Dr. Vikramaditya Rao',
      title: 'Chair of Computing & Mathematics',
      qualifications: 'Ph.D. in Computer Science, Stanford',
      experience: '14+ Years',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in algorithmic complexity and competitive coding for prospective MIT, Stanford, and tier-1 tech engineers.',
    },
  ];

  return (
    <div className="bg-[#FBFBF9] pt-28 pb-20 space-y-24 font-sans text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 1. Header Hero (Large Editorial Typography) */}
        <div className="max-w-4xl space-y-6">
          <div className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            About Skillora Academy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.2]">
            Shaping visionary scholars through conceptual depth and lifelong mentorship.
          </h1>
          <p className="text-lg sm:text-xl text-[#475569] leading-relaxed font-normal max-w-3xl">
            Skillora was founded on a singular premise: when high-caliber faculty teach from first principles with individual daily attention, ambitious students achieve extraordinary outcomes.
          </p>
        </div>

        {/* 2. Storytelling Narrative with Editorial Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight leading-snug">
              A benchmark pedagogy engineered for curious minds
            </h2>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
              Skillora was established to dismantle the rote memorization culture prevalent in competitive entrance preparation. For over 18 years, our academy has cultivated an academic sanctuary where students master STEM, clinical medical sciences, and computer architectures through deep understanding.
            </p>
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
              Our campus integrates acoustically tuned lecture amphitheaters, 3D anatomical dissection suites, and high-speed developer workstations with daily twilight doubt desks where faculty work side-by-side with students.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#0F172A]">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/[0.08] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 98.4% Entrance Qualifiers
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/[0.08] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> 45+ Olympiad Medals
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="rounded-3xl overflow-hidden border border-black/[0.08] shadow-md bg-white">
              <EduImage
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                aspectRatio="16/10"
                zoomOnHover
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 py-2 text-xs text-[#64748B] flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>The Skillora Innovation Quad & Research Complex</span>
            </div>
          </div>
        </div>

        {/* 3. Mission & Learning Philosophy (Editorial Split Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.08] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-display">Our Institutional Mission</h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              To provide uncompromising academic rigor, conceptual clarity, and outcome-oriented mentorship across STEM, medical sciences, and advanced computing—empowering scholars into premier universities and impactful research careers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.08] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] font-display">Our Learning Philosophy</h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              To nurture authentic intellectual curiosity over short-term test tricks. When students understand the fundamental mechanisms and logic behind a theorem, high exam scores and breakthrough research naturally follow.
            </p>
          </div>
        </div>

        {/* 4. Pedagogical Pillars (Structured Horizontal Rows) */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight">
              The Four Pillars of Skillora Pedagogy
            </h2>
            <p className="text-sm text-[#475569]">
              Our systematic approach guarantees consistent conceptual mastery across all cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-xs space-y-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] font-display">{p.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Institutional History Timeline */}
        <div className="bg-[#F8F7F4] rounded-3xl p-8 sm:p-12 border border-black/[0.08] space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight">
              18 Years of Academic Pedagogy
            </h2>
            <p className="text-xs text-[#64748B]">
              Key Institutional Milestones & Foundation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-black/[0.06] space-y-2.5 shadow-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-xs font-bold font-mono">
                  {m.year}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] font-display">{m.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Faculty Deans & Mentors */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight">
              Faculty Deans & Lead Coaches
            </h2>
            <p className="text-sm text-[#475569]">
              Every department head brings international research and national coaching distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facultyLeadership.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-xs space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-14 h-14 rounded-xl object-cover border border-black/[0.08] shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] font-display">{f.name}</h3>
                    <p className="text-xs text-[#2563EB] font-medium">{f.title}</p>
                    <span className="text-[10px] text-[#64748B]">{f.qualifications}</span>
                  </div>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  {f.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-black/[0.08] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0F172A] font-display">Ready to join an upcoming cohort?</h3>
            <p className="text-xs text-[#475569]">Applications are reviewed on a rolling basis with scholarship assessment options.</p>
          </div>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs shadow-xs shrink-0 transition-all"
          >
            <span>Apply for Admission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
