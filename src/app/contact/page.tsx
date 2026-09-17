import React from 'react';
import { ContactForm } from '@/components/public/ContactForm';
import { Mail, Phone, MapPin, Clock, Building2, ShieldCheck, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FBFBF9] pt-28 pb-20 font-sans text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] font-display tracking-tight leading-[1.25]">
            Connect with Skillora Academic Counselors
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
            Have questions regarding upcoming batches, course syllabi, scholarship assessments, or on-campus walkthroughs? Our admissions team is available Monday through Saturday.
          </p>
        </div>

        {/* Main Grid: Campus Info & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (5 cols): Campus Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A] font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#2563EB]" /> Campus Headquarters
              </h2>

              <div className="space-y-5 text-sm text-[#475569]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-medium">Main Academic Quad</strong>
                    <span className="text-xs text-[#64748B]">450 Innovation Parkway, Academic District, Tech Corridor</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-medium">Helpline & WhatsApp</strong>
                    <span className="text-xs font-mono text-[#64748B]">+1 (800) 555-SKILL / (800) 555-7545</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-medium">Admissions Desk</strong>
                    <span className="text-xs font-mono text-[#64748B]">admissions@skillora.edu</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-medium">Counseling Desk Hours</strong>
                    <span className="text-xs text-[#64748B]">Monday – Saturday: 8:00 AM – 8:00 PM EST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Action */}
              <div className="pt-4 border-t border-black/[0.06]">
                <a
                  href="https://wa.me/18005557545?text=Hello%20Skillora%20Admissions%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20and%20course%20enrollment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Guided Tour Note */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5 text-xs text-[#334155]">
              <div className="font-semibold text-[#2563EB] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Daily Campus Walkthroughs
              </div>
              <p className="leading-relaxed text-[#475569]">
                Guided campus tours of the 3D dissection suites, high-speed coding clusters, and lecture amphitheaters run daily at 11:00 AM and 4:00 PM.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): Direct Validated Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] font-display">
                  Send a Direct Inquiry
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Our academic counseling officer will respond with cohort details within 24 hours.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
