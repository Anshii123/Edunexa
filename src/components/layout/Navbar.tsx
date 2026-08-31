'use client';

import React, { useState, useEffect } from 'react';
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

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/results', label: 'Results' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('cinematic-hero-container');
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // The navbar remains in dark hero mode (PURE WHITE TEXT) until the hero video animation section completely ends (bottom reaches navbar height ~80px)
        setIsPastHero(heroRect.bottom <= 80);
      } else {
        // On inner public pages without a video hero, default to light nav with black text
        setIsPastHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const portalLink = user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  const isLightNav = isPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightNav
          ? 'bg-[#FBF9F5]/96 backdrop-blur-md border-b border-stone-300/80 shadow-sm py-0'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-transparent py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isLightNav
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-brand-800 text-white shadow-md shadow-brand-900/30'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-black tracking-tight font-display transition-colors ${
                    isLightNav ? 'text-charcoal-950' : 'text-white'
                  }`}
                >
                  Edu<span className={isLightNav ? 'text-brand-900' : 'text-blue-400'}>Nexa</span>
                </span>
                <span
                  className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded transition-colors ${
                    isLightNav
                      ? 'bg-stone-200/90 text-charcoal-950 border border-stone-300'
                      : 'bg-white/20 text-white border border-white/20'
                  }`}
                >
                  Institute
                </span>
              </div>
              <p
                className={`text-[10px] tracking-widest uppercase font-bold transition-colors ${
                  isLightNav ? 'text-stone-700' : 'text-stone-200'
                }`}
              >
                Academy of Excellence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with Sleek Animated Underline Hover */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-extrabold transition-all duration-200 group ${
                    isLightNav
                      ? isActive
                        ? 'text-brand-900 font-black'
                        : 'text-charcoal-950 hover:text-brand-900'
                      : isActive
                      ? 'text-white font-black'
                      : 'text-stone-100 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Animated Underline Hover Indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300 ${
                      isLightNav
                        ? isActive
                          ? 'w-4/5 bg-brand-900 shadow-xs'
                          : 'w-0 group-hover:w-3/4 bg-charcoal-950'
                        : isActive
                        ? 'w-4/5 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 shadow-xs'
                        : 'w-0 group-hover:w-3/4 bg-white/90'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Auth Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={portalLink}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isLightNav
                      ? 'bg-stone-100 hover:bg-stone-200 text-charcoal-950 border border-stone-300'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {user.role === 'admin' ? (
                    <ShieldCheck className={`w-3.5 h-3.5 ${isLightNav ? 'text-amber-700' : 'text-amber-400'}`} />
                  ) : (
                    <GraduationCap className={`w-3.5 h-3.5 ${isLightNav ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  )}
                  <span className="truncate max-w-[110px]">{user.name.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className={`p-2 rounded-xl transition-all ${
                    isLightNav
                      ? 'text-stone-500 hover:text-rose-700 hover:bg-rose-50'
                      : 'text-stone-400 hover:text-rose-400 hover:bg-rose-950/40'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`text-xs font-extrabold px-3 py-2 transition-colors flex items-center gap-1.5 ${
                  isLightNav
                    ? 'text-charcoal-950 hover:text-brand-900'
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            <Link
              href="/admissions"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black shadow-md transition-all duration-300 group hover:scale-[1.03] active:scale-98 ${
                isLightNav
                  ? 'bg-charcoal-950 hover:bg-brand-900 text-white border border-charcoal-900'
                  : 'bg-white hover:bg-stone-100 text-charcoal-950 border border-white/40 shadow-black/30'
              }`}
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isLightNav ? 'text-charcoal-950 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? 'text-white bg-white/15 font-bold border-l-4 border-blue-400 pl-3'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2 mt-2">
            {user ? (
              <div className="space-y-2">
                <Link
                  href={portalLink}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name} ({user.role.toUpperCase()})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 rounded-xl bg-rose-950/50 text-rose-300 border border-rose-800/40 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-semibold bg-white/10 text-white border border-white/20 text-xs"
              >
                Sign In to Portal
              </Link>
            )}

            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full font-black bg-brand-900 hover:bg-brand-800 text-white shadow-md text-xs uppercase tracking-wider mt-1 transition-all"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

