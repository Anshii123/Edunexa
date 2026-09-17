import React from 'react';
import Link from 'next/link';
import { HOMEPAGE_DATA } from '@/lib/data/homepage';
import { MapPin, Phone, Mail, Clock, Building2, Send, MessageCircle } from 'lucide-react';

export function ContactPreviewSection() {
  const data = HOMEPAGE_DATA.contactPreview;

  return (
    <section className="py-20 lg:py-24 bg-[#F8F7F4] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols): Campus HQ Info */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
              {data.title}
            </h2>

            <p className="text-base text-charcoal-600 leading-relaxed max-w-xl font-sans">
              {data.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-card space-y-2 hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider font-mono">
                  <MapPin className="w-4 h-4 text-indigo-600" /> Main Quad
                </div>
                <div className="text-xs text-charcoal-600 leading-relaxed font-sans">
                  {data.address}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-card space-y-2 hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider font-mono">
                  <Clock className="w-4 h-4 text-emerald-600" /> Counseling Hours
                </div>
                <div className="text-xs text-charcoal-600 leading-relaxed font-sans">
                  {data.hours}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-card space-y-2 hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider font-mono">
                  <Phone className="w-4 h-4 text-indigo-600" /> Direct Helpline
                </div>
                <div className="text-xs text-navy-900 font-mono font-medium">
                  {data.phone}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-card space-y-2 hover:shadow-card-hover transition-all">
                <div className="flex items-center gap-2 text-violet-700 text-xs font-bold uppercase tracking-wider font-mono">
                  <Mail className="w-4 h-4 text-violet-600" /> Admissions Desk
                </div>
                <div className="text-xs text-navy-900 font-mono font-medium">
                  {data.email}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Quick Campus Visit / Action Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-black/[0.08] shadow-card space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-navy-900 font-display">Schedule an On-Campus Walkthrough</h3>
                <p className="text-xs text-charcoal-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Tour our 3D dissection suites, high-speed coding pods, and attend a live problem-solving lecture with faculty.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="https://wa.me/18005556392?text=Hello%20EduNexa%20Admissions%20Team%2C%20I%20would%20like%20to%20inquire%20about%20courses%2C%20fees%2C%20and%20campus%20tours."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs shadow-md flex items-center justify-center gap-2.5 transition-all uppercase tracking-wider group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  className="w-full py-3 px-4 rounded-xl font-semibold bg-stone-50 hover:bg-stone-100 text-navy-900 text-xs border border-black/[0.08] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Request Guided Campus Tour</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

