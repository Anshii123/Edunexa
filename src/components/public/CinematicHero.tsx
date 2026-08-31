'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    id: 'stage-1',
    eyebrow: 'EduNexa Institute',
    eyebrowColor: 'text-blue-300',
    dotColor: 'bg-blue-400',
    titleLine1: 'YOUR JOURNEY',
    titleLine2: 'BEGINS HERE.',
    description: 'Where master faculty, conceptual depth, and individual mentorship empower ambitious scholars into premier universities and careers.',
    hasCta: true,
  },
  {
    id: 'stage-2',
    eyebrow: 'Academic Pathway',
    eyebrowColor: 'text-amber-300',
    dotColor: 'bg-amber-400',
    titleLine1: 'DISCOVER',
    titleLine2: 'YOUR PATH.',
    description: 'Every milestone is guided by educators and researchers from MIT, Stanford, and AIIMS who have walked the same path to distinction.',
    hasCta: false,
  },
  {
    id: 'stage-3',
    eyebrow: 'The Innovation Quad',
    eyebrowColor: 'text-emerald-300',
    dotColor: 'bg-emerald-400',
    titleLine1: 'STEP INTO',
    titleLine2: 'POSSIBILITY.',
    description: 'Immerse yourself in smart amphitheaters, 3D bio-simulation labs, high-speed coding pods, and 1-on-1 twilight problem desks.',
    hasCta: false,
  },
  {
    id: 'stage-4',
    eyebrow: 'Foundational Rigor',
    eyebrowColor: 'text-blue-300',
    dotColor: 'bg-blue-400',
    titleLine1: 'LEARN. GROW.',
    titleLine2: 'ACHIEVE.',
    description: 'Transforming complex conceptual frameworks into intuitive problem-solving mastery with a 98.4% competitive entrance track record.',
    hasCta: false,
  },
  {
    id: 'stage-5',
    eyebrow: 'Excellence Awaits',
    eyebrowColor: 'text-amber-300',
    dotColor: 'bg-amber-400',
    titleLine1: 'WELCOME TO',
    titleLine2: 'EDUNEXA.',
    description: 'Your seat at the forefront of STEM Olympiads, Medical Sciences, and Advanced Computing begins today.',
    hasCta: true,
  },
];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Individual refs for each stage container
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
        setIsVideoLoaded(true);
      }
    };

    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (!isVideoLoaded || !containerRef.current || !pinRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const duration = video.duration || videoDuration || 5;

    // Freeze video: user scroll directly scrubs currentTime
    video.pause();
    video.currentTime = 0;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%', // Ample distance to scrub full video smoothly
          pin: pinRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video && isFinite(duration) && duration > 0) {
              const targetTime = Math.min(Math.max(self.progress * duration, 0), duration);
              video.currentTime = targetTime;
            }

            // Fade out scroll indicator immediately upon first scroll
            if (scrollIndicatorRef.current) {
              if (self.progress > 0.03) {
                gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.2, overwrite: 'auto' });
              } else {
                gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.2, overwrite: 'auto' });
              }
            }
          },
        },
      });

      // Initially: Stage 0 visible, all others completely hidden & pointer-events disabled
      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        if (index === 0) {
          gsap.set(el, { opacity: 1, y: 0, display: 'flex', pointerEvents: 'auto' });
        } else {
          gsap.set(el, { opacity: 0, y: 20, display: 'none', pointerEvents: 'none' });
        }
      });

      // Helper to animate stage exit cleanly BEFORE next stage enters (Zero Jumbling Guarantee)
      const animateStageTransition = (fromIdx: number, toIdx: number, startTime: number) => {
        const fromEl = stageRefs.current[fromIdx];
        const toEl = stageRefs.current[toIdx];
        if (!fromEl || !toEl) return;

        // Step 1: Cleanly fade out and hide previous text
        tl.to(
          fromEl,
          {
            opacity: 0,
            y: -16,
            duration: 0.04,
            ease: 'power2.in',
            onComplete: () => {
              fromEl.style.display = 'none';
              fromEl.style.pointerEvents = 'none';
            },
          },
          startTime
        );

        // Step 2: Display and smoothly fade in new text with slight delay to prevent overlapping
        tl.set(toEl, { display: 'flex', y: 16, opacity: 0 }, startTime + 0.05);
        tl.to(
          toEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.06,
            ease: 'power2.out',
            onStart: () => {
              toEl.style.display = 'flex';
              toEl.style.pointerEvents = 'auto';
            },
          },
          startTime + 0.06
        );
      };

      // Stage Transitions placed at distinct keyframe milestones across the timeline (0 to 1)
      animateStageTransition(0, 1, 0.18); // Stage 1 -> 2
      animateStageTransition(1, 2, 0.42); // Stage 2 -> 3
      animateStageTransition(2, 3, 0.66); // Stage 3 -> 4
      animateStageTransition(3, 4, 0.88); // Stage 4 -> 5
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isVideoLoaded, videoDuration]);

  return (
    <section id="cinematic-hero-container" ref={containerRef} className="relative w-full bg-[#05070C]">
      {/* Full-viewport pinned sequence */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Crisp Cinematic Background Video */}
        <div className="absolute inset-0 w-full h-full bg-[#05070C] -z-10 overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/videos/campus-tour.mp4"
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover object-[center_center] sm:object-[center_30%] filter brightness-[0.98] contrast-[1.03]"
          />

          {/* Gentle, localized gradient strictly in the lower-left text zone */}
          <div className="absolute bottom-0 left-0 w-full sm:w-[52%] h-[75%] bg-gradient-to-tr from-black/85 via-black/35 to-transparent pointer-events-none" />

          {/* Very soft top vignette for navbar legibility */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Minimal Luxury Loading State */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 z-40 bg-[#0E131F] flex flex-col items-center justify-center gap-3 text-center p-6 transition-opacity duration-500">
            <span className="text-[11px] font-bold tracking-[0.25em] text-stone-300 uppercase font-mono">
              EDUNEXA INSTITUTE
            </span>
            <h3 className="text-lg font-medium text-white font-display">
              Preparing Your Campus Experience
            </h3>
            <div className="w-28 h-0.5 bg-stone-800 rounded-full mx-auto overflow-hidden mt-1">
              <div className="w-full h-full bg-brand-500 animate-pulse" />
            </div>
          </div>
        )}

        {/* Spacer for Top Navbar */}
        <div className="h-20 sm:h-24 pointer-events-none" />

        {/* Positioned Lower-Left Editorial Text Box */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 flex items-end pointer-events-none">
          <div className="w-full max-w-lg lg:max-w-xl relative min-h-[220px] sm:min-h-[250px]">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[idx] = el;
                }}
                className={`absolute inset-0 flex flex-col justify-end space-y-3 pointer-events-auto ${
                  idx === 0 ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                {/* Eyebrow */}
                <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] font-mono ${stage.eyebrowColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${stage.dotColor}`} />
                  {stage.eyebrow}
                </div>

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.12] drop-shadow-md">
                  {stage.titleLine1}
                  <br />
                  <span className="text-stone-100">
                    {stage.titleLine2}
                  </span>
                </h1>

                {/* Concise Subtext */}
                <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-md font-normal drop-shadow">
                  {stage.description}
                </p>

                {/* Action CTAs */}
                {stage.hasCta && (
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-stone-900 hover:bg-stone-100 shadow-sm hover:scale-[1.02] active:scale-98 transition-all text-xs"
                    >
                      <span>Explore Programs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/admissions"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all text-xs"
                    >
                      <span>Apply for Admission</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Minimal Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4 flex items-center justify-between pointer-events-none transition-opacity duration-300"
        >
          <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
            <span>Scroll to explore campus journey</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-stone-300" />
          </div>

          <div className="hidden sm:block text-[10px] text-stone-400 font-medium uppercase tracking-wider font-mono">
            Campus Experience • 2026-27
          </div>
        </div>
      </div>
    </section>
  );
}

