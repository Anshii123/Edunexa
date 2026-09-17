import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export function UpcomingEventsSection() {
  const events = db.getEvents();

  return (
    <section className="py-20 lg:py-28 bg-[#F1F0FA] border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
              Upcoming Seminars & Problem-Solving Workshops
            </h2>

            <p className="text-base text-charcoal-600 leading-relaxed font-sans">
              Experience live interactive masterclasses with our senior subject leads, tour the campus, and attend diagnostic strategy sessions.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0 group"
          >
            <span>View Complete Event Schedule</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-card flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="relative h-56 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={ev.thumbnail}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-900/90 text-white font-medium text-xs backdrop-blur-md shadow-sm border border-white/10">
                    {ev.type}
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-emerald-300 bg-navy-950/70 border border-emerald-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    ● {ev.seatsLeft} Seats Available
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500 font-medium">
                    <span className="flex items-center gap-1 text-navy-900 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {ev.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-charcoal-400" /> {ev.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-charcoal-400" /> {ev.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 font-display group-hover:text-indigo-600 transition-colors">
                    {ev.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                    {ev.subtitle}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs text-charcoal-500 font-semibold font-mono">Featured Mentors: </span>
                    <span className="text-xs text-navy-900 font-medium">{ev.speakers.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-black/[0.06] mt-4 flex items-center justify-between">
                <span className="text-xs text-charcoal-500">Mode: <strong className="text-navy-900 font-semibold">{ev.mode}</strong></span>
                <Link
                  href="/admissions"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                >
                  Reserve Seat Free
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

