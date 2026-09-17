import React from 'react';
import Link from 'next/link';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { EduImage } from '@/components/ui/EduImage';
import { 
  ArrowRight, 
  Lightbulb, 
  HeartHandshake, 
  Building2, 
  MapPin, 
  Users
} from 'lucide-react';

export function IntroductionSection() {
  const data = HOMEPAGE_DATA.introduction;

  return (
    <section className="relative py-20 lg:py-28 bg-[#F8F7F4] text-[#0F172A] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): Narrative & Core Values */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Headline directly without tiny preheadings */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0F172A] font-display leading-[1.3] sm:leading-[1.32] tracking-tight">
              Where genuine curiosity meets{' '}
              <span className="font-serif italic font-normal text-[#2563EB]">dedicated mentorship</span>.
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#334155] font-normal leading-relaxed">
              {data.subheadline}
            </p>

            {/* Editorial highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#0F172A]">First Principles</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Intuition over rote formulas to solve complex problems.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#0F172A]">1-on-1 Mentorship</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Daily twilight doubt desks until concepts truly click.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#0F172A]">Acoustic Pods</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Quiet cabins & 24/7 research library for deep focus.
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="pt-4 border-t border-black/[0.08] flex flex-wrap items-center gap-8">
              {data.stats.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-[#64748B]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs group"
              >
                <span>Our Philosophy & Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-white hover:bg-stone-50 text-[#0F172A] border border-black/[0.1] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs group"
              >
                <Users className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                <span>Meet Faculty Deans</span>
              </Link>
            </div>
          </div>

          {/* Right Column (6 cols): Single High-Quality Visual */}
          <div className="lg:col-span-6 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-md bg-white">
              <EduImage
                src={data.images.main}
                aspectRatio="4/3"
                zoomOnHover
                priority
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 py-3 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between text-xs text-[#475569]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="font-medium text-[#0F172A]">Central Academic Quad</span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="text-[#64748B]">Collaboration Pod 2</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Mentorship Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
