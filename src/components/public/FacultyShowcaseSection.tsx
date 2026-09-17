import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/storage';
import { FacultyPortrait } from '@/components/media/FacultyPortrait';
import { Users, Mail, ArrowRight } from 'lucide-react';

export function FacultyShowcaseSection() {
  const faculty = db.getFaculty();

  return (
    <section className="py-20 lg:py-28 bg-[#F8F7F4] border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
              Learn Directly from Top 1% Master Educators
            </h2>

            <p className="text-base text-charcoal-600 leading-relaxed font-sans">
              Our faculty comprise former Olympiad medalists, MIT and Stanford researchers, practicing AI architects, and AIIMS medical specialists.
            </p>
          </div>

          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0 group"
          >
            <span>View All Faculty Profiles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-2xl p-6 border border-black/[0.08] shadow-card flex flex-col justify-between space-y-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <FacultyPortrait
                  src={prof.avatar}
                  name={prof.name}
                  rating={prof.rating}
                  size="md"
                />

                <div>
                  <h3 className="text-lg font-bold text-navy-900 font-display group-hover:text-indigo-600 transition-colors">
                    {prof.name}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-600 font-mono mt-0.5">
                    {prof.title}
                  </div>
                  <div className="text-[11px] text-charcoal-500 mt-1 font-medium">
                    {prof.qualifications}
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3">
                  {prof.bio}
                </p>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prof.specialization.slice(0, 2).map((spec, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-indigo-50/70 text-indigo-700 border border-indigo-100 font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-charcoal-500">
                <span>Mentored: <strong className="text-navy-900 font-semibold">{prof.studentsMentored.toLocaleString()}+</strong></span>
                <a
                  href={`mailto:${prof.email}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
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

