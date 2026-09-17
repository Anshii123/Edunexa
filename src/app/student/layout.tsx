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
  GraduationCap
} from 'lucide-react';

const STUDENT_NAV_ITEMS = [
  { href: '/student/dashboard', label: 'Workspace Overview', icon: LayoutDashboard },
  { href: '/student/courses', label: 'Enrolled Courses', icon: BookOpen },
  { href: '/student/materials', label: 'Study Notes & Repositories', icon: FileText },
  { href: '/student/notices', label: 'Campus Circulars', icon: Bell },
  { href: '/student/profile', label: 'Academic Profile', icon: User },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#0F172A] flex flex-col lg:flex-row pt-20">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.06] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-[#F8F7F4] border border-black/[0.08] text-[#334155]"
            aria-label="Open student workspace navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-[#0F172A] font-display block">Student Workspace</span>
            <span className="text-[10px] text-[#64748B]">
              {user?.profile?.studentId || 'SKL-2026-0842'}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-semibold border border-blue-100">
          Enrolled Scholar
        </span>
      </header>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-fade-in"
        />
      )}

      {/* Sidebar (Desktop Persistent & Mobile Slide-over) */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 z-50 lg:z-30 h-screen lg:h-[calc(100vh-5rem)] w-72 bg-white border-r border-black/[0.06] flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Sidebar Top: Logo & Title */}
          <div className="flex items-center justify-between pt-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2563EB] transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0F172A] font-display tracking-tight">Student Workspace</h2>
                <p className="text-[10px] text-[#64748B] font-medium tracking-wide uppercase">SKILLORA ACADEMY</p>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Profile Card Snippet */}
          <div className="p-3.5 rounded-2xl bg-[#F8F7F4] border border-black/[0.06] flex items-center gap-3">
            <img
              src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'Student'}
              className="w-10 h-10 rounded-xl object-cover border border-black/[0.08] shrink-0"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-[#0F172A] truncate">
                {user?.name || 'Aarav Mehta'}
              </h3>
              <p className="text-[11px] text-[#2563EB] font-medium truncate">
                {user?.profile?.batch || 'STEM Olympiad Alpha 2026'}
              </p>
              <span className="text-[10px] text-[#64748B] block truncate font-mono">
                {user?.profile?.studentId || 'SKL-2026-0842'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {STUDENT_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#2563EB] font-semibold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8F7F4]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-[#94A3B8]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Sign Out */}
        <div className="pt-4 border-t border-black/[0.06]">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
