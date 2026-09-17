'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause, ChevronDown } from 'lucide-react';

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Continuous smooth video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const configurePlayback = () => {
      video.playbackRate = 0.85;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    video.playbackRate = 0.85;
    if (video.readyState >= 1) {
      configurePlayback();
    } else {
      video.addEventListener('loadedmetadata', configurePlayback);
      video.addEventListener('canplay', configurePlayback);
    }

    return () => {
      video.removeEventListener('loadedmetadata', configurePlayback);
      video.removeEventListener('canplay', configurePlayback);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 bg-[#0B1020]">
      
      {/* 1. 100% Width Edge-to-Edge Video Running at Top of Webpage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          src="/assets/videos/campus-tour.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.05]"
        />

        {/* Soft, balanced cinematic overlay ensuring text readability without obscuring the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Spacing below top navigation */}
      <div className="h-6 sm:h-10 pointer-events-none" />

      {/* 2. Text Content Above the Video */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 my-auto">
        <div className="w-full max-w-3xl space-y-6">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.2] sm:leading-[1.18] drop-shadow-md max-w-2xl">
            Where Ambitious Minds Excel.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal max-w-lg drop-shadow">
            Elite faculty, conceptual depth, and 1-on-1 mentorship to prepare you for premier academic and career milestones.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm sm:text-base group"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm sm:text-base"
            >
              <span>Apply for Admission</span>
            </Link>
          </div>

          {/* Proof Metrics */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-300 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-white font-semibold">18+ Years Pedagogy</span>
            </div>
            <span className="text-stone-500">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-white font-semibold">Top 1% Faculty</span>
            </div>
            <span className="text-stone-500">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-white font-semibold">98.4% Selection Rate</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar: Campus Information & Controls matching user screenshot */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
          <span className="font-semibold text-white">Live Campus Walkthrough:</span>
          <span className="text-stone-300">Smart Amphitheaters, 3D Simulation Suites & Twilight Study Pods</span>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="text-xs text-stone-300 font-medium">
            Campus Innovation Quad • 450 Innovation Parkway
          </span>

          {/* Play/Pause Control */}
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 border border-white/20"
            aria-label={isPlaying ? 'Pause campus video' : 'Play campus video'}
            title={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>
      </div>

    </section>
  );
}
