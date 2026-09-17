import React from 'react';
import { db } from '@/lib/db/storage';
import { Users, Star, Mail } from 'lucide-react';
import { FacultyPortrait } from '@/components/media/FacultyPortrait';

export default function FacultyPage() {
  const faculty = db.getFaculty();

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-16 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 font-display tracking-tight">
            Learn Directly from World-Class Mentors
          </h1>
          <p className="text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto font-sans">
            Our senior faculty comprise renowned Olympiad trainers, former MIT & Stanford researchers, AI architects, and medical specialists.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faculty.map((prof) => (
            <div key={prof.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.08] shadow-card flex flex-col sm:flex-row gap-6 items-start hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <FacultyPortrait
                src={prof.avatar}
                name={prof.name}
                rating={prof.rating}
                size="lg"
                className="shrink-0"
              />
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-display">{prof.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold font-mono mt-0.5">{prof.title}</p>
                  </div>
                </div>

                <div className="text-xs text-charcoal-500 font-medium">
                  🎓 {prof.qualifications}
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                  {prof.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prof.specialization.map((spec, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-50/70 text-indigo-700 border border-indigo-100 font-medium">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-charcoal-500">
                  <span>Mentored: <strong className="text-navy-900 font-semibold">{prof.studentsMentored.toLocaleString()}+ Students</strong></span>
                  <a href={`mailto:${prof.email}`} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Contact Desk
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

