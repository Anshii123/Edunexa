'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  LogOut,
  User,
  LogIn
} from 'lucide-react';

const MAIN_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/results', label: 'Results' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portalLink = user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  const portalLabel = user?.role === 'admin' ? 'Teacher / Admin' : 'Student Portal';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shadow-sm group-hover:bg-[#2563EB] transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0F172A] font-display">
                SKILLORA<span className="text-[#2563EB]">.</span>
              </span>
              <span className="text-[10px] tracking-wider text-[#64748B] uppercase font-medium -mt-1">
                Institute & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-[14px] font-medium transition-all rounded-lg ${
                    isActive
                      ? 'text-[#2563EB] font-semibold bg-blue-50/70'
                      : 'text-[#334155] hover:text-[#0F172A] hover:bg-black/[0.03]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions & Portal States */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href={portalLink}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 text-[#0F172A] border border-black/[0.08] shadow-sm transition-all"
                >
                  {user.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>{portalLabel}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-2 rounded-xl text-[#64748B] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold px-3.5 py-2 text-[#334155] hover:text-[#0F172A] hover:bg-black/[0.03] transition-colors rounded-lg flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0F172A] hover:bg-black/[0.04] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFBF9] border-b border-black/[0.08] px-5 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          <div className="space-y-1">
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#2563EB] bg-blue-50 font-semibold'
                    : 'text-[#334155] hover:text-[#0F172A] hover:bg-black/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-black/[0.06] space-y-2">
            {user ? (
              <div className="space-y-2">
                <Link
                  href={portalLink}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-white text-[#0F172A] border border-black/[0.08] font-medium text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <User className="w-4 h-4 text-[#2563EB]" />
                  <span>{portalLabel} ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 font-medium text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-medium bg-white text-[#0F172A] border border-black/[0.08] text-xs shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-semibold bg-[#2563EB] text-white text-xs shadow-sm"
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
