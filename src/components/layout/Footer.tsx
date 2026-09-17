import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#F8F7F4] text-[#475569] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-black/[0.06]">
          
          {/* Col 1 & 2 (5 cols): Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#0F172A] font-display">
                  SKILLORA<span className="text-[#2563EB]">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-medium -mt-1">
                  Institute of Advanced Pedagogy
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed max-w-sm">
              Empowering students, researchers, and professionals through conceptual rigor, master faculty mentorship, and active collaborative study.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-black/[0.08] text-[#334155] text-xs font-medium shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ISO 9001:2025 Accredited
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-black/[0.08] text-[#334155] text-xs font-medium shadow-xs">
                ★ 4.9/5 Scholar Satisfaction
              </div>
            </div>
          </div>

          {/* Col 3 (2 cols): Academic Tracks */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-display">Programs</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-[#2563EB] transition-colors">STEM & Olympiads</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#2563EB] transition-colors">Computer Science & AI</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#2563EB] transition-colors">Pre-Med Clinical Track</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#2563EB] transition-colors">Executive Data Systems</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-[#2563EB] transition-colors">Scholarship Assessment</Link>
              </li>
            </ul>
          </div>

          {/* Col 4 (2 cols): Academy Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-display">Institute</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#2563EB] transition-colors">About Skillora</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-[#2563EB] transition-colors">Faculty Directory</Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[#2563EB] transition-colors">Student Outcomes</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#2563EB] transition-colors">Masterclasses</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#2563EB] transition-colors">Campus Tour</Link>
              </li>
            </ul>
          </div>

          {/* Col 5 (3 cols): Campus Contact Desk */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-display">Campus Desk</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="text-[#475569]">450 Innovation Parkway, Academic District, Tech Corridor</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="text-[#0F172A] font-medium text-xs">+1 (800) 555-SKILL</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="text-[#0F172A] font-medium text-xs">admissions@skillora.edu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span className="text-[#64748B] text-xs">Mon – Sat: 8:00 AM – 8:00 PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & portal shortcuts */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 Skillora Educational Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#0F172A] transition-colors">Privacy & Governance</Link>
            <Link href="/admissions" className="hover:text-[#0F172A] transition-colors">Terms of Admission</Link>
            <Link href="/student/dashboard" className="text-[#2563EB] font-medium hover:underline">Student Portal</Link>
            <Link href="/admin/dashboard" className="text-[#0F172A] font-medium hover:underline">Teacher Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
