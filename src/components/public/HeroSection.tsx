'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Award, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Video
} from 'lucide-react';

export function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none radial-ambient -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 pointer-events-none radial-ambient-gold -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ranked #1 Coaching & Professional Academy 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12]">
              Elevate Your Potential with{' '}
              <span className="text-gradient">Elite Faculty & Mentorship</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empowering students and aspiring professionals across competitive STEM olympiads, pre-med sciences, full-stack computing, and leadership tracks with structured pedagogy and guaranteed outcome roadmaps.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Top 1% Faculty from MIT, Stanford & AIIMS</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personalized 1-on-1 Diagnostic Mentorship</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>98.4% Competitive Entrance Success Rate</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 100% Merit Scholarships (NSTHE)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all text-base"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all text-base"
              >
                <span>Explore Programs</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">98.4%</div>
                <div className="text-xs text-slate-400 mt-0.5">Selection Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-display">3,450+</div>
                <div className="text-xs text-slate-400 mt-0.5">Active Learners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">$1.4M+</div>
                <div className="text-xs text-slate-400 mt-0.5">Scholarships Given</div>
              </div>
            </div>
          </div>

          {/* Right Column: Campus Showcase & Preserved Video Tour */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden glass-card p-2 border border-slate-700/60 shadow-2xl shadow-indigo-950/50">
              {/* Campus Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                <video
                  src="/assets/videos/campus-tour.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Campus Atmosphere</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] text-slate-200">
                  📍 Main Innovation Campus
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Next Batch Starts Soon</h4>
                    <p className="text-[11px] text-slate-400">Orientation & Diagnostic Prep</p>
                  </div>
                </div>
                <Link
                  href="/admissions"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Register <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
