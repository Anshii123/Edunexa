import React from 'react';
import Link from 'next/link';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { EduImage } from '@/components/ui/EduImage';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function IntroductionSection() {
  const data = HOMEPAGE_DATA.introduction;

  return (
    <section className="relative py-20 lg:py-28 bg-[#FBF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols): Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-800" />
              <span>{data.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display leading-[1.14] tracking-tight">
              {data.headline}
            </h2>

            <p className="text-lg text-stone-700 font-medium leading-relaxed max-w-2xl">
              {data.subheadline}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Micro Stats Row with clean hairline borders */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">{stat.label}</div>
                  <div className="text-[12px] text-stone-500">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 text-white shadow-sm hover:scale-[1.01] active:scale-98 transition-all text-sm"
              >
                <span>Our Philosophy & Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-stone-100 hover:bg-stone-200/90 text-stone-800 border border-stone-200 transition-all text-sm"
              >
                <span>Meet Faculty Deans</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Non-Overlapping Premium Dual Media Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Primary Image Card */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-card bg-white group">
              <EduImage
                src={data.images.main}
                aspectRatio="16/10"
                zoomOnHover
                priority
                showCaptionOverlay
                caption={data.images.caption}
              />
            </div>

            {/* Secondary Highlight Image Card (Non-overlapping, below main card) */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-card bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-brand-900 text-xs font-bold font-mono">
                  🎓 1-on-1 Mentorship & Doubt Clearance
                </span>
                <span className="text-[10px] text-stone-400 font-mono uppercase font-semibold">Interactive Desk</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-stone-100">
                <EduImage
                  src={data.images.secondary}
                  aspectRatio="21/9"
                  zoomOnHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

