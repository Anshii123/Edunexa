import React from 'react';
import Link from 'next/link';
import { EduImage } from '@/components/ui/EduImage';
import { ArrowRight, MapPin } from 'lucide-react';

export function CampusCommunitySection() {
  const campusMoments = [
    {
      title: 'Scholars Avenue & Morning Arrivals',
      desc: 'Students arriving for morning calculus masterclasses and Olympiad proof sessions.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      aspect: '16/10' as const,
      tag: 'Morning Routine',
    },
    {
      title: 'Peer Problem Sets & Collaboration',
      desc: 'Cross-cohort group study in the central Innovation Quad study pods.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      aspect: '4/3' as const,
      tag: 'Collaborative Learning',
    },
    {
      title: 'Acoustic Focus & Twilight Pods',
      desc: 'Sound-isolated study booths for undisturbed deep work and problem sets.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      aspect: '4/3' as const,
      tag: 'Deep Focus',
    },
    {
      title: 'Central Quad & Campus Grounds',
      desc: 'Open green lawns for post-exam discussions, debriefs, and relaxation.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80',
      aspect: '16/10' as const,
      tag: 'Campus Life',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0F172A] font-display tracking-tight leading-[1.28] sm:leading-[1.3]">
              A vibrant community built on curiosity, collaboration, and rigor
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
              Education at Skillora extends far beyond lecture halls into collaborative study pods, spontaneous whiteboard debates, and enduring peer friendships.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors shrink-0 group"
          >
            <span>Take full visual campus tour</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-Moment Non-Overlapping Editorial Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {campusMoments.map((moment, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-black/[0.08] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-stone-100">
                <EduImage
                  src={moment.image}
                  alt={moment.title}
                  aspectRatio={moment.aspect}
                  zoomOnHover
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-white/95 text-xs font-semibold text-[#0F172A] shadow-xs border border-black/[0.06]">
                  {moment.tag}
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2">
                <h3 className="text-xl font-bold text-[#0F172A] font-display">
                  {moment.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {moment.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
