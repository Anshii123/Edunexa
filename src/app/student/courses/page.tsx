'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  User, 
  Layers, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/student/courses');
        const json = await res.json();
        if (json.success) {
          setCourses(json.data);
        } else {
          setError(json.error || 'Failed to load courses');
        }
      } catch (err: any) {
        setError(err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
        <div className="h-10 w-48 bg-stone-200 rounded-xl" />
        <div className="h-64 bg-stone-200 rounded-3xl" />
        <div className="h-64 bg-stone-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5 text-brand-800" />
            <span>Enrolled Academics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            My Academic Programs
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Track syllabus progress, weekly lecture schedules, and cohort milestones.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-charcoal-900 text-xs font-semibold border border-stone-200 transition-colors shadow-xs shrink-0"
        >
          <span>Explore More Programs</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {courses.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-stone-200 text-center space-y-4 shadow-card">
          <BookOpen className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="text-lg font-bold text-charcoal-900 font-display">No Enrolled Courses Found</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            You are not enrolled in any programs yet. Browse our flagship courses or contact admissions.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-xs shadow-sm"
          >
            <span>Browse Course Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-brand-900 text-[11px] font-bold border border-stone-200">
                      {course.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active Enrollment
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Level: {course.level}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal-900 font-display tracking-tight">
                    {course.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                    {course.fullDescription || course.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center min-w-[140px] shrink-0">
                  <div className="text-[11px] text-stone-500 font-mono">Progress</div>
                  <div className="text-2xl font-black text-emerald-800 font-display">
                    {course.progressPercent}%
                  </div>
                  <div className="text-[10px] text-stone-500 font-medium font-mono">
                    {course.completedLessons} / {course.totalLessons} Lessons
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-900 rounded-full transition-all duration-500"
                    style={{ width: `${course.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Batch Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="text-stone-500 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-brand-800" /> Next Live Lecture
                  </div>
                  <div className="font-bold text-charcoal-900">{course.nextLiveSession}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="text-stone-500 flex items-center gap-1.5 font-mono">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> Lead Faculty Dean
                  </div>
                  <div className="font-bold text-charcoal-900">{course.assignedInstructor}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="text-stone-500 flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-brand-800" /> Delivery Mode
                  </div>
                  <div className="font-bold text-charcoal-900">{course.mode}</div>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5 text-brand-800" /> Curriculum Roadmap
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.syllabus.map((mod: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-bold text-charcoal-900">
                          <span className="truncate">{mod.title}</span>
                          <span className="text-[10px] text-stone-500 font-mono shrink-0 ml-2">
                            {mod.lessonsCount} Lessons
                          </span>
                        </div>
                        <ul className="text-[11px] text-stone-600 space-y-1 list-disc list-inside">
                          {mod.topics.slice(0, 2).map((t: string, ti: number) => (
                            <li key={ti} className="truncate">{t}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <Link
                  href={`/courses/${course.slug}`}
                  className="text-xs text-brand-900 hover:text-brand-700 font-semibold"
                >
                  View Public Course Overview →
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    href="/student/materials"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>Access Course Materials</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

