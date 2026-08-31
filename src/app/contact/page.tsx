import React from 'react';
import { ContactForm } from '@/components/public/ContactForm';
import { Mail, Phone, MapPin, Clock, Building2, ShieldCheck, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
            <Phone className="w-3.5 h-3.5 text-brand-800" />
            <span>Contact & Campus Desks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Connect with EduNexa Admissions Desk
          </h1>
          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Have questions regarding batches, syllabus, scholarships, or campus tours? Our counseling team is available Monday through Saturday.
          </p>
        </div>

        {/* Main Grid: Campus Info & Validated Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5 cols): Campus Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
              <h2 className="text-2xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                <Building2 className="w-5 h-5 text-brand-800" /> Campus Headquarters
              </h2>

              <div className="space-y-5 text-sm text-stone-600">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-display">Main Innovation & Academic Quad</strong>
                    <span className="text-xs text-stone-500">450 Innovation Parkway, Academic District, Tech Corridor</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-display">Toll-Free Helpline & WhatsApp</strong>
                    <span className="text-xs font-mono text-stone-500">+1 (800) 555-NEXA / (800) 555-6392</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-display">Admissions Office Email</strong>
                    <span className="text-xs font-mono text-stone-500">admissions@edunexa.edu</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal-900 block font-display">Counseling Office Hours</strong>
                    <span className="text-xs text-stone-500">Monday – Saturday: 8:00 AM – 8:00 PM EST</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Messaging CTA */}
              <div className="pt-4 border-t border-stone-100">
                <a
                  href="https://wa.me/18005556392?text=Hello%20EduNexa%20Admissions%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20and%20course%20enrollment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs shadow-md flex items-center justify-center gap-2.5 transition-all uppercase tracking-wider group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send to WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-xs text-stone-700">
              <div className="font-bold text-brand-900 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> On-Campus Walkthroughs
              </div>
              <p className="leading-relaxed">
                Guided campus tours of the 3D dissection suites, high-speed coding clusters, and lecture amphitheaters run daily at 11:00 AM and 4:00 PM.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): Direct Validated Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
              <div>
                <h3 className="text-xl font-bold text-charcoal-900 font-display">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Our academic relations officer will respond to your query within 24 hours.
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

