'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileSpreadsheet, 
  Bell, 
  Calendar, 
  Image as ImageIcon, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';

const ADMIN_NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/courses', label: 'Courses & Programs', icon: BookOpen },
  { href: '/admin/faculty', label: 'Faculty Mentors', icon: GraduationCap },
  { href: '/admin/admissions', label: 'Admission Leads', icon: FileSpreadsheet },
  { href: '/admin/notices', label: 'Campus Notices', icon: Bell },
  { href: '/admin/events', label: 'Events & Masterclasses', icon: Calendar },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/homepage', label: 'Homepage & Metrics', icon: Globe },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-charcoal-900 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-stone-200 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900"
            aria-label="Open administration menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-charcoal-900 font-display block">Admin Governance Suite</span>
            <span className="text-[10px] text-brand-900 font-mono">
              {user?.name || 'Dean Arthur Sterling'}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-brand-900 text-[10px] font-bold border border-stone-200 font-mono">
          Admin Access
        </span>
      </header>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs animate-fade-in"
        />
      )}

      {/* Desktop Persistent / Mobile Slide-over Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 z-50 lg:z-30 h-screen lg:h-[calc(100vh-5rem)] w-72 bg-white border-r border-stone-200 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out shadow-xs ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-5 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-900 flex items-center justify-center shadow-xs border border-brand-800">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-charcoal-900 font-display">EduNexa Admin</h2>
                <p className="text-[10px] text-stone-500 font-mono tracking-wide">GOVERNANCE SUITE</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin User Mini Card */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3">
            <img
              src={user?.profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'Administrator'}
              className="w-10 h-10 rounded-xl object-cover border border-stone-300 shrink-0"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-charcoal-900 truncate font-display">
                {user?.name || 'Dean Arthur Sterling'}
              </h3>
              <p className="text-[10px] text-brand-900 font-medium truncate">
                Dean of Academic Governance
              </p>
              <span className="text-[9px] font-mono text-stone-500 block truncate">
                {user?.email || 'admin@edunexa.edu'}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 space-y-2 shrink-0">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold text-brand-900 bg-stone-100 border border-stone-200 hover:bg-stone-200/80 transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-brand-800" />
            <span>Switch to Student View</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
            <span>Sign Out of Admin Suite</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}

