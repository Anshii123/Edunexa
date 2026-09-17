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
  AlertCircle,
  CheckCircle2,
  Sparkles
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
      <div className="space-y-8 animate-pulse max-w-5xl">
        <div className="h-28 rounded-2xl bg-stone-200/60" />
        <div className="h-44 rounded-2xl bg-stone-200/60" />
        <div className="h-64 rounded-2xl bg-stone-200/60" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-10 rounded-3xl bg-white border border-black/[0.08] text-center space-y-4 shadow-xs max-w-md mx-auto mt-12">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-lg font-bold text-[#0F172A]">Unable to Load Student Workspace</h2>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto">{error || 'Please re-authenticate your session.'}</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold shadow-xs"
        >
          <span>Sign In Again</span>
        </Link>
      </div>
    );
  }

  const { profile, enrolledCourses, recentMaterials, recentNotices, upcomingEvents } = data;
  const activeCourse = enrolledCourses[0];

  return (
    <div className="space-y-12 max-w-5xl">
      
      {/* 1. Header & Greeting (Large Typography + Whitespace) */}
      <div className="space-y-2 border-b border-black/[0.06] pb-6">
        <div className="text-xs font-medium text-[#64748B]">
          {profile.batch} • Scholar ID: <span className="font-mono text-[#0F172A]">{profile.studentId}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] font-display tracking-tight">
          Good morning, {profile.name}
        </h1>
        <p className="text-sm text-[#475569]">
          Here is your personalized academic schedule and prioritized study modules for today.
        </p>
      </div>

      {/* 2. Priority Action Panel: "What should I learn or do next?" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Recommended Next Step
            </span>
          </div>
          <span className="text-xs text-[#64748B]">
            Estimated Focus Time: 45 Mins
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
            {activeCourse ? activeCourse.title : 'Calculus Masterclass: Unseen Proof Problems'}
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed max-w-2xl">
            Pick up from Module 4: Multivariable optimization and Lagrange multipliers. Faculty mentor Dr. Arthur Sterling's twilight review notes have been uploaded to your desk.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href={activeCourse ? `/courses/${activeCourse.slug}` : '/student/courses'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs shadow-xs transition-all"
          >
            <span>Continue Module 4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/student/materials"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-[#F8F7F4] hover:bg-stone-200/70 text-[#0F172A] border border-black/[0.08] text-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Problem Bank PDF</span>
          </Link>
        </div>
      </div>

      {/* 3. Horizontal Progress & Academic Overview (Subtle Panel) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-7 rounded-2xl bg-[#F8F7F4] border border-black/[0.06]">
        <div className="space-y-1">
          <div className="text-xs text-[#64748B]">Diagnostic Mastery</div>
          <div className="text-2xl font-bold text-[#0F172A] font-display">{profile.overallScore}%</div>
          <div className="text-[11px] text-emerald-700 font-medium">Top 1% of cohort</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#64748B]">Lecture Attendance</div>
          <div className="text-2xl font-bold text-[#0F172A] font-display">{profile.attendanceRate}%</div>
          <div className="text-[11px] text-[#64748B]">Regular status</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#64748B]">Syllabus Modules</div>
          <div className="text-2xl font-bold text-[#0F172A] font-display">{profile.modulesCompleted} / {profile.totalModules}</div>
          <div className="text-[11px] text-[#64748B]">68% completed</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#64748B]">Enrolled Cohorts</div>
          <div className="text-2xl font-bold text-[#0F172A] font-display">{profile.enrolledCoursesCount}</div>
          <div className="text-[11px] text-[#2563EB] font-medium">Active tracks</div>
        </div>
      </div>

      {/* 4. Enrolled Courses (Horizontal Rows instead of repetitive cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0F172A] font-display">
            Active Programs & Syllabus Progress
          </h2>
          <Link href="/student/courses" className="text-xs text-[#2563EB] font-medium hover:underline">
            View all courses →
          </Link>
        </div>

        <div className="divide-y divide-black/[0.06] bg-white rounded-2xl border border-black/[0.08] shadow-xs">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="font-semibold text-[#0F172A]">{course.category}</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-display">
                  <Link href={`/courses/${course.slug}`} className="hover:text-[#2563EB] transition-colors">
                    {course.title}
                  </Link>
                </h3>
              </div>

              <div className="flex items-center gap-6 sm:shrink-0">
                <div className="w-32 hidden sm:block space-y-1">
                  <div className="flex justify-between text-[10px] text-[#64748B]">
                    <span>Syllabus</span>
                    <span className="font-semibold text-[#0F172A]">68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full w-[68%]" />
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F8F7F4] hover:bg-stone-200/60 text-xs font-semibold text-[#0F172A] border border-black/[0.06] transition-colors"
                >
                  Open Syllabus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Split Section: Digital Study Files & Scheduled Masterclasses */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (7): Study Materials */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0F172A] font-display">
              Recent Study Files
            </h2>
            <Link href="/student/materials" className="text-xs text-[#2563EB] font-medium hover:underline">
              All files ({recentMaterials.length}) →
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white rounded-xl p-4 border border-black/[0.06] shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                    {mat.type === 'Lecture Video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#0F172A]">{mat.title}</h3>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-2 mt-0.5">
                      <span>{mat.type}</span>
                      <span>•</span>
                      <span>{mat.fileSize || mat.duration}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Opening resource: ${mat.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#F8F7F4] hover:bg-stone-200/60 text-xs font-semibold text-[#0F172A] border border-black/[0.06] flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Access</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col (5): Upcoming Events & Circulars */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#0F172A] font-display">
              Upcoming Masterclasses
            </h2>
            <div className="space-y-3">
              {upcomingEvents.map((ev) => (
                <div key={ev.id} className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-[#2563EB]">
                    {ev.date} • {ev.time}
                  </div>
                  <h3 className="text-xs font-bold text-[#0F172A]">{ev.title}</h3>
                  <p className="text-[11px] text-[#64748B]">{ev.location}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0F172A] font-display">
                Campus Circulars
              </h2>
              <Link href="/student/notices" className="text-xs text-[#2563EB] hover:underline">
                Notices →
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentNotices.slice(0, 2).map((not) => (
                <div key={not.id} className="p-3.5 rounded-xl bg-[#F8F7F4] border border-black/[0.06] space-y-1">
                  <div className="text-[10px] text-[#64748B] flex justify-between">
                    <span>{not.category}</span>
                    <span>{not.publishDate}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-[#0F172A]">{not.title}</h3>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
