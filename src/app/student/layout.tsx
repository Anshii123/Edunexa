'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const STUDENT_NAV_ITEMS = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/student/materials', label: 'Study Materials', icon: FileText },
  { href: '/student/notices', label: 'Notices & Circulars', icon: Bell },
  { href: '/student/profile', label: 'Student Profile', icon: User },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-charcoal-900 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900"
            aria-label="Open student navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-charcoal-900 font-display block">Student Portal</span>
            <span className="text-[10px] text-stone-500 font-mono">
              {user?.profile?.studentId || 'EDN-2026-0842'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
            Active Scholar
          </span>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs animate-fade-in"
        />
      )}

      {/* Sidebar (Desktop Persistent & Mobile Slide-over) */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 z-50 lg:z-30 h-screen lg:h-[calc(100vh-5rem)] w-72 bg-white border-r border-stone-200 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Sidebar Top: Institute / Portal Title & Close Button for Mobile */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-900 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-charcoal-900 font-display">Student Portal</h2>
                <p className="text-[10px] text-stone-500 font-mono tracking-wide">EDUNEXA ACADEMY</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Profile Card Snippet */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
            <img
              src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'Student'}
              className="w-11 h-11 rounded-xl object-cover border border-stone-200 shrink-0"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-charcoal-900 truncate font-display">
                {user?.name || 'Aarav Mehta'}
              </h3>
              <p className="text-[10px] text-emerald-800 font-medium truncate">
                {user?.profile?.batch || 'STEM 2026-28 Alpha'}
              </p>
              <span className="text-[9px] font-mono text-stone-500 block truncate">
                {user?.profile?.studentId || 'EDN-2026-0842'}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {STUDENT_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-stone-100 text-brand-950 font-bold border border-stone-200 shadow-xs'
                      : 'text-stone-600 hover:text-charcoal-900 hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-900' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-900" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-4 border-t border-stone-200 space-y-2">
          {user?.role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Switch to Admin Suite</span>
            </Link>
          )}

          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-[#FBF9F5]">
        {children}
      </main>
    </div>
  );
}

