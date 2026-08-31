import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { FacultyPortrait } from '@/components/media/FacultyPortrait';
import { Users, Mail, ArrowRight } from 'lucide-react';

export function FacultyShowcaseSection() {
  const faculty = db.getFaculty();

  return (
    <section className="py-20 lg:py-28 bg-[#F4F1EA] border-y border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
              <Users className="w-3.5 h-3.5 text-brand-800" />
              <span>Academic Mentors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
              Learn Directly from Top 1% Master Educators
            </h2>

            <p className="text-base text-stone-600 leading-relaxed">
              Our faculty comprise former Olympiad medalists, MIT and Stanford researchers, practicing AI architects, and AIIMS medical specialists.
            </p>
          </div>

          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors shrink-0 group"
          >
            <span>View All Faculty Profiles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4 hover:shadow-card-hover transition-all group"
            >
              <div className="space-y-4">
                <FacultyPortrait
                  src={prof.avatar}
                  name={prof.name}
                  rating={prof.rating}
                  size="md"
                />

                <div>
                  <h3 className="text-lg font-bold text-charcoal-900 font-display group-hover:text-brand-900 transition-colors">
                    {prof.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-800 font-mono">
                    {prof.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 font-medium">
                    {prof.qualifications}
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {prof.bio}
                </p>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {prof.specialization.slice(0, 2).map((spec, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Mentored: <strong className="text-charcoal-900">{prof.studentsMentored.toLocaleString()}+</strong></span>
                <a
                  href={`mailto:${prof.email}`}
                  className="text-brand-900 hover:text-brand-700 font-semibold flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

