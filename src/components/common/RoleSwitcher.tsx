'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, GraduationCap, Globe, Palette } from 'lucide-react';

export function RoleSwitcher() {
  const pathname = usePathname();

  // Hide completely on public pages and homepage so it does not interfere with the cinematic experience
  if (pathname === '/' || !pathname?.startsWith('/design-system')) {
    return null;
  }

  const isStudent = pathname?.startsWith('/student');
  const isAdmin = pathname?.startsWith('/admin');
  const isDesign = pathname?.startsWith('/design-system');
  const isPublic = !isStudent && !isAdmin && !isDesign;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center bg-slate-900/90 border border-slate-700/80 backdrop-blur-md rounded-full shadow-2xl p-1.5 gap-1 text-xs">
      <div className="px-2.5 py-1 text-slate-400 font-semibold border-r border-slate-700/70 hidden sm:block">
        Dev View:
      </div>
      <Link
        href="/"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          isPublic
            ? 'bg-indigo-600 text-white font-medium shadow-md'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>Public</span>
      </Link>
      <Link
        href="/student/dashboard"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          isStudent
            ? 'bg-emerald-600 text-white font-medium shadow-md'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        <span>Student</span>
      </Link>
      <Link
        href="/admin/dashboard"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          isAdmin
            ? 'bg-amber-600 text-white font-medium shadow-md'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Admin</span>
      </Link>
      <Link
        href="/design-system"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
          isDesign
            ? 'bg-purple-600 text-white font-medium shadow-md'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
      >
        <Palette className="w-3.5 h-3.5" />
        <span>Design System</span>
      </Link>
    </div>
  );
}
