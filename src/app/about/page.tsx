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
  Sparkles,
  Building2,
  Cpu,
  Microscope,
  Library
} from 'lucide-react';
import { EduImage } from '@/components/ui/EduImage';

export default function AboutPage() {
  const milestones = [
    {
      year: '2008',
      title: 'Foundation & Physics Lab',
      description: 'Founded as an advanced physics and mathematics laboratory focused on Olympiad problem formulation.',
    },
    {
      year: '2014',
      title: 'Medical Sciences Division',
      description: 'Launched 3D bio-simulation anatomy suites and integrated NEET/AIIMS entrance coaching.',
    },
    {
      year: '2019',
      title: 'The Innovation Quad',
      description: 'Opened the flagship 45,000 sq ft campus featuring smart amphitheaters and developer cloud pods.',
    },
    {
      year: '2024',
      title: 'AI Diagnostic Pedagogy',
      description: 'Integrated continuous AI performance analytics tracking concept retention across 15,000+ scholars.',
    },
  ];

  const pillars = [
    {
      icon: BookOpen,
      title: 'First-Principles Rigor',
      description: 'We deconstruct complex multivariable calculus, quantum mechanics, and organic pathways down to foundational principles before building problem-solving speed.',
    },
    {
      icon: Users,
      title: '1-on-1 Mentorship Culture',
      description: 'Dedicated twilight study booths paired with subject deans ensure zero unaddressed doubts and personalized strategic guidance.',
    },
    {
      icon: Cpu,
      title: 'Research-Grade Infrastructure',
      description: 'Smart tiered amphitheaters, high-concurrency cloud computing clusters, and 3D anatomical simulation labs provide immersive learning.',
    },
    {
      icon: Sparkles,
      title: 'AI-Backed Analytics',
      description: 'Proprietary performance tracking maps individual weakness patterns, generating custom diagnostic problem sets tailored to each scholar.',
    },
  ];

  const facultyLeadership = [
    {
      name: 'Dr. Arthur Sterling',
      title: 'Dean of Advanced Physics',
      qualifications: 'Ph.D. in Theoretical Physics, MIT',
      experience: '18+ Years',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Former International Physics Olympiad lead coach who has mentored 45+ gold medalists and 120+ top 100 national rankers.',
    },
    {
      name: 'Prof. Sarah Lin',
      title: 'Head of Biological Sciences',
      qualifications: 'Ph.D. in Molecular Genetics, Harvard',
      experience: '15+ Years',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered 3D bio-simulation curriculum for medical aspirants with an unprecedented 98.4% entrance qualification record.',
    },
    {
      name: 'Dr. Vikramaditya Rao',
      title: 'Chair of Mathematics & Computing',
      qualifications: 'Ph.D. in Computer Science, Stanford',
      experience: '14+ Years',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in algorithmic problem solving and competitive programming for prospective MIT and FAANG engineers.',
    },
  ];

  return (
    <div className="bg-[#FBF9F5] py-16 lg:py-24 space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-800" />
            <span>Institutional Overview & Governance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 font-display tracking-tight leading-[1.12]">
            Shaping Visionaries, Rankers & High-Impact Builders
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Founded on the principle that structured first-principles mastery paired with deliberate mentorship turns high aspirations into repeatable, extraordinary outcomes.
          </p>
        </div>

        {/* 2. Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-900 text-xs font-bold font-mono uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Established 2008
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight leading-snug">
              A Benchmark Pedagogy Engineered for Ambitious Minds
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              EduNexa was established to bridge the gap between rote examination preparation and deep, first-principles academic mastery. Over 18 years, our academy has evolved into an elite institution where students master STEM, medical sciences, and advanced computing under the guidance of world-class faculty.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Our integrated campus model combines acoustically tuned lecture amphitheaters, 3D anatomical dissection suites, and high-concurrency cloud computing pods with continuous AI-backed performance analytics.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-charcoal-900 font-mono bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 98.4% Entrance Qualifiers
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-charcoal-900 font-mono bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-700" /> 45+ Olympiad Gold Medals
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-stone-200/90 shadow-card bg-white">
              <EduImage
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                aspectRatio="16/10"
                zoomOnHover
                priority
                showCaptionOverlay
                caption="The EduNexa Innovation Quad and Central Academic Complex"
              />
            </div>
          </div>
        </div>

        {/* 3. Core Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-brand-900 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 font-display">Our Core Mission</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              To provide uncompromising academic rigor, conceptual clarity, and outcome-oriented mentorship across STEM, medical sciences, and advanced computing—democratizing access to premier universities and high-growth global careers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-brand-900 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 font-display">Our Pedagogical Vision</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              To build a world-class educational ecosystem where artificial intelligence diagnostic insights merge seamlessly with the intuition of master educators to unlock each learner's unique mathematical and scientific potential.
            </p>
          </div>
        </div>

        {/* 4. The 4 Pedagogical Pillars */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-brand-800" /> Educational Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight">
              The Four Pillars of EduNexa Pedagogy
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Our systematic approach guarantees consistent conceptual mastery across all cohorts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4 hover:border-stone-300 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-brand-900 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-charcoal-900 font-display">{p.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Institutional History Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-card space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
              18-Year Institutional Journey
            </h2>
            <p className="text-xs text-stone-500 font-mono uppercase tracking-wider">
              Key Academic Milestones & Expansion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {milestones.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3 relative">
                <span className="px-3 py-1 rounded-md bg-brand-900 text-white text-xs font-bold font-mono">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-charcoal-900 font-display">{m.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Faculty Deans & Advisory Board */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-brand-800" /> Academic Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight">
              Led by Renowned Deans & Olympiad Coaches
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Our subject heads bring decades of research and competitive coaching distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facultyLeadership.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-stone-300 shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-charcoal-900 font-display">{f.name}</h3>
                    <p className="text-xs font-semibold text-brand-900">{f.title}</p>
                    <span className="text-[11px] text-stone-500 font-mono">{f.qualifications}</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{f.bio}</p>
                <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500">
                  Pedagogy Experience: <strong className="text-charcoal-900">{f.experience}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Institutional Governance & Benchmark Stats */}
        <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-card space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display text-center tracking-tight">
            Institutional Governance & Benchmark Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 text-center space-y-2 shadow-sm">
              <div className="text-3xl font-extrabold text-brand-900 font-display">18+</div>
              <div className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Years of Excellence</div>
              <p className="text-xs text-stone-500">Pioneering competitive prep</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 text-center space-y-2 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-800 font-display">98.4%</div>
              <div className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Selection Rate</div>
              <p className="text-xs text-stone-500">Across national entrances</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 text-center space-y-2 shadow-sm">
              <div className="text-3xl font-extrabold text-amber-800 font-display">45+</div>
              <div className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Olympiad Medals</div>
              <p className="text-xs text-stone-500">International STEM honors</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-stone-200/90 text-center space-y-2 shadow-sm">
              <div className="text-3xl font-extrabold text-brand-950 font-display">200+</div>
              <div className="text-xs font-bold text-charcoal-900 uppercase tracking-wider font-mono">Hiring Partners</div>
              <p className="text-xs text-stone-500">For engineering graduates</p>
            </div>
          </div>
        </div>

        {/* 8. Call to Action Banner */}
        <div className="bg-charcoal-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
              Begin Your Journey to Academic Distinction
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Schedule a guided campus walkthrough, meet our subject deans, or take the NSTHE Diagnostic Scholarship Assessment today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="px-6 py-3.5 rounded-xl font-bold bg-brand-800 hover:bg-brand-700 text-white text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <span>Apply for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20 transition-all"
              >
                Contact Admissions Desk
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
