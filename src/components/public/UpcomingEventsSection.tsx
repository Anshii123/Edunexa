import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export function UpcomingEventsSection() {
  const events = db.getEvents();

  return (
    <section className="py-20 lg:py-28 bg-[#F4F1EA] border-y border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <Calendar className="w-3.5 h-3.5 text-brand-800" />
              <span>Campus Masterclasses</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
              Upcoming Seminars & Problem-Solving Workshops
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              Experience live interactive masterclasses with our senior subject leads, tour the campus, and attend diagnostic strategy sessions.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors shrink-0 group"
          >
            <span>View Complete Event Schedule</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all group"
            >
              <div>
                <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={ev.thumbnail}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-stone-900/90 text-white font-bold text-xs shadow-sm">
                    {ev.type}
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-semibold text-emerald-300 bg-black/60 px-2.5 py-0.5 rounded backdrop-blur-sm">
                    ● {ev.seatsLeft} Seats Available
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1 text-stone-800">
                      <Calendar className="w-3.5 h-3.5 text-brand-800" /> {ev.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" /> {ev.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" /> {ev.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal-900 font-display group-hover:text-brand-900 transition-colors">
                    {ev.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {ev.subtitle}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs text-stone-500 font-semibold font-mono">Featured Mentors: </span>
                    <span className="text-xs text-stone-800 font-medium">{ev.speakers.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                <span className="text-xs text-stone-500">Mode: <strong className="text-charcoal-900">{ev.mode}</strong></span>
                <Link
                  href="/admissions"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-900 hover:bg-brand-800 text-white shadow-sm transition-colors"
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

