'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  Bell, 
  Award, 
  TrendingUp, 
  Clock, 
  Download, 
  PlayCircle,
  Calendar,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Course, Notice, EventItem, StudyMaterial } from '@/types';

interface DashboardData {
  profile: {
    name: string;
    studentId: string;
    batch: string;
    attendanceRate: number;
    overallScore: number;
    modulesCompleted: number;
    totalModules: number;
    badges: string[];
    enrolledCoursesCount: number;
  };
  enrolledCourses: Course[];
  recentMaterials: StudyMaterial[];
  recentNotices: Notice[];
  upcomingEvents: EventItem[];
}

export default function StudentDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch('/api/student/dashboard');
        if (!res.ok) {
          throw new Error('Failed to load student dashboard');
        }
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.error || 'Failed to fetch dashboard data');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-36 rounded-3xl bg-stone-200" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-stone-200" />
          ))}
        </div>
        <div className="h-64 rounded-3xl bg-stone-200" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center space-y-4 shadow-card">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <h3 className="text-lg font-bold text-charcoal-900">Unable to Load Student Dashboard</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">{error || 'Please re-authenticate your session.'}</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold"
        >
          <span>Sign In to Refresh</span>
        </Link>
      </div>
    );
  }

  const { profile, enrolledCourses, recentMaterials, recentNotices, upcomingEvents } = data;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
              Active Scholar
            </span>
            <span className="text-xs font-mono text-stone-500">ID: {profile.studentId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Registered Cohort: <strong className="text-charcoal-900">{profile.batch}</strong>
          </p>
        </div>

        {/* Quick Link Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/student/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Courses</span>
          </Link>
          <Link
            href="/student/materials"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs border border-stone-200 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Study Kit</span>
          </Link>
        </div>
      </div>

      {/* Progress & Academic Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono">
            <span>Overall Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-display">
            {profile.overallScore}%
          </div>
          <p className="text-[10px] text-stone-500 font-medium">Ranked in Top 1% of Batch</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono">
            <span>Attendance Rate</span>
            <Clock className="w-4 h-4 text-brand-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
            {profile.attendanceRate}%
          </div>
          <p className="text-[10px] text-emerald-800 font-medium">96 / 100 Lectures Attended</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono">
            <span>Curriculum Modules</span>
            <BookOpen className="w-4 h-4 text-brand-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
            {profile.modulesCompleted} / {profile.totalModules}
          </div>
          <p className="text-[10px] text-stone-500">67% Syllabus Mastered</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-mono">
            <span>Enrolled Programs</span>
            <Award className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-display">
            {profile.enrolledCoursesCount} Active
          </div>
          <p className="text-[10px] text-stone-500">Olympiad & Entrance Track</p>
        </div>
      </div>

      {/* Badges Bar */}
      <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-white border border-stone-200 shadow-card">
        <span className="text-xs font-semibold text-stone-600 flex items-center gap-1.5 mr-2 font-mono">
          <Award className="w-4 h-4 text-amber-700" /> Academic Distinctions:
        </span>
        {profile.badges.map((b, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-1"
          >
            <span>🏆</span>
            <span>{b}</span>
          </span>
        ))}
      </div>

      {/* Main Grid: Enrolled Courses & Study Materials vs Notices & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (8): Courses & Materials */}
        <div className="lg:col-span-8 space-y-8">
          {/* Enrolled Courses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                <BookOpen className="w-5 h-5 text-brand-800" /> Enrolled Academic Courses
              </h2>
              <Link
                href="/student/courses"
                className="text-xs text-brand-900 hover:text-brand-700 font-semibold flex items-center gap-1"
              >
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-stone-200 text-center text-xs text-stone-500 shadow-card">
                You are not currently enrolled in any active cohorts.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-semibold text-brand-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          {course.category}
                        </span>
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          In Progress
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-charcoal-900 font-display line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {course.shortDescription || course.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                        <span>Curriculum Progress</span>
                        <span className="text-charcoal-900 font-bold">68%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-brand-900 rounded-full w-[68%]" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-800" /> Mon, Wed, Fri (4:30 PM)
                        </span>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="text-brand-900 hover:text-brand-700 font-semibold"
                        >
                          Syllabus →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Study Materials */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                <FileText className="w-5 h-5 text-brand-800" /> Digital Study Materials
              </h2>
              <Link
                href="/student/materials"
                className="text-xs text-brand-900 hover:text-brand-700 font-semibold flex items-center gap-1"
              >
                <span>Browse All Files ({recentMaterials.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="bg-white rounded-xl p-4 border border-stone-200/90 shadow-card flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-brand-900 shrink-0">
                      {mat.type === 'Lecture Video' ? (
                        <PlayCircle className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 font-display">{mat.title}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 font-mono">
                        <span className="text-brand-900 font-medium">{mat.type}</span>
                        <span>•</span>
                        <span>{mat.fileSize || mat.duration}</span>
                        <span>•</span>
                        <span>Uploaded {mat.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Opening resource: ${mat.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-charcoal-900 border border-stone-200 flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Access</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (4): Notices & Upcoming Events */}
        <div className="lg:col-span-4 space-y-6">
          {/* Institutional Circulars Feed */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-charcoal-900 font-display flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-700" />
                Institute Circulars
              </h3>
              <Link
                href="/student/notices"
                className="text-[11px] text-brand-900 hover:text-brand-700 font-semibold"
              >
                All →
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotices.map((not) => (
                <div
                  key={not.id}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-semibold">
                      {not.category}
                    </span>
                    <span className="text-stone-500">{not.publishDate}</span>
                  </div>
                  <h4 className="text-xs font-bold text-charcoal-900 leading-snug">{not.title}</h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {not.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Masterclasses & Mock Exams */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-3.5">
            <h3 className="text-base font-bold text-charcoal-900 font-display flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              Scheduled Masterclasses
            </h3>

            <div className="space-y-3">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                >
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    {ev.date} • {ev.time}
                  </div>
                  <h4 className="text-xs font-bold text-charcoal-900">{ev.title}</h4>
                  <p className="text-[11px] text-stone-500">{ev.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

