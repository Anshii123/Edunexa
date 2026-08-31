import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-[#0E131F] text-stone-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                Edu<span className="text-blue-400">Nexa</span>
              </span>
            </Link>
            <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
              Premier academic institute dedicated to competitive entrance mastery, advanced STEM foundations, clinical medical sciences, and senior technology leadership.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ISO 9001:2025 Certified
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300 text-xs font-medium">
                ★ 4.9/5 Institute Rating
              </div>
            </div>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-mono">Academic Tracks</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">STEM & Olympiad Pathway</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">Software & Applied AI</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">Pre-Med Clinical Biology</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">Executive Business Analytics</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition-colors">Scholarship Test (NSTHE)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-mono">Institute</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Our Academy</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white transition-colors">Faculty Directory</Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white transition-colors">Hall of Fame & Results</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Events & Masterclasses</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Campus Tour & Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Admissions */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 font-mono">Campus Desk</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">450 Innovation Parkway, Academic District, Tech Corridor</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-stone-300 font-mono text-xs">+1 (800) 555-NEXA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-stone-300 font-mono text-xs">admissions@edunexa.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-stone-300 text-xs">Mon – Sat: 8:00 AM – 8:00 PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 EduNexa Academy & Educational Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-stone-300 transition-colors">Privacy & Governance</Link>
            <Link href="/admissions" className="hover:text-stone-300 transition-colors">Terms of Admission</Link>
            <Link href="/student/dashboard" className="text-stone-300 hover:text-white transition-colors">Student Portal</Link>
            <Link href="/admin/dashboard" className="text-amber-400/90 hover:text-amber-300 transition-colors">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

