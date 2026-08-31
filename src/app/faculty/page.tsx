import React from 'react';
import { db } from '@/lib/db/storage';
import { Users, Star, Mail } from 'lucide-react';
import { FacultyPortrait } from '@/components/media/FacultyPortrait';

export default function FacultyPage() {
  const faculty = db.getFaculty();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16 bg-[#FBF9F5]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Users className="w-3.5 h-3.5 text-brand-800" />
          <span>Distinguished Educators & Researchers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Learn Directly from World-Class Mentors
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Our senior faculty comprise renowned Olympiad trainers, former MIT & Stanford researchers, AI architects, and medical specialists.
        </p>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faculty.map((prof) => (
          <div key={prof.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col sm:flex-row gap-6 items-start hover:shadow-card-hover transition-all">
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
                  <h3 className="text-xl font-bold text-charcoal-900 font-display">{prof.name}</h3>
                  <p className="text-xs text-brand-800 font-semibold font-mono">{prof.title}</p>
                </div>
              </div>

              <div className="text-xs text-stone-500 font-medium">
                🎓 {prof.qualifications}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {prof.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {prof.specialization.map((spec, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Mentored: <strong className="text-charcoal-900">{prof.studentsMentored.toLocaleString()}+ Students</strong></span>
                <a href={`mailto:${prof.email}`} className="text-brand-900 hover:text-brand-700 font-semibold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> Contact Desk
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

