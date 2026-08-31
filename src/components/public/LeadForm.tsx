'use client';

import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';

const COURSE_OPTIONS = [
  'Advanced STEM & Competitive Olympiad Pathway',
  'Full-Stack Software Engineering & Applied AI',
  'Pre-Med Clinical Excellence & Biology Foundation',
  'Executive Leadership & Business Analytics',
  'National Scholarship & Talent Hunt (NSTHE 2026)',
  'General Admissions Counseling',
];

const EDUCATION_LEVELS = [
  'High School (Grade 10/11/12)',
  'Undergraduate Degree Student',
  'Graduate / Working Professional',
  'Parent Inquiring for Ward',
];

interface LeadFormProps {
  defaultCourse?: string;
  formType?: 'Admission Application' | 'Course Enquiry' | 'Scholarship Test';
  onSuccess?: (referenceId: string) => void;
  className?: string;
}

export function LeadForm({
  defaultCourse = '',
  formType = 'Admission Application',
  onSuccess,
  className = '',
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetCourseTitle: defaultCourse || COURSE_OPTIONS[0],
    currentEducation: EDUCATION_LEVELS[0],
    city: '',
    preferredMode: 'Hybrid' as 'Classroom' | 'Online' | 'Hybrid',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<{ referenceId: string; name: string } | null>(null);

  // Client-side validation
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^[\d\s+\-()]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number (minimum 7 digits).';
    }

    if (!formData.targetCourseTitle) {
      errs.targetCourseTitle = 'Please select a program.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error upon editing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType: formType,
          targetCourseId: 'course-selected',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setStatus('success');
      const refId = data.data?.referenceId || `EDN-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        referenceId: refId,
        name: data.data?.name || formData.name,
      });
      setServerMessage(data.message || 'Your application has been registered successfully.');

      if (onSuccess) {
        onSuccess(refId);
      }
    } catch (err: any) {
      setStatus('error');
      setServerMessage(err.message || 'Unable to submit your application. Please check your network and retry.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      targetCourseTitle: defaultCourse || COURSE_OPTIONS[0],
      currentEducation: EDUCATION_LEVELS[0],
      city: '',
      preferredMode: 'Hybrid',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setServerMessage('');
    setSubmittedData(null);
  };

  // SUCCESS STATE VIEW
  if (status === 'success' && submittedData) {
    return (
      <div className={`p-6 sm:p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-5 ${className}`}>
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-md border border-emerald-200 inline-block">
            REF: {submittedData.referenceId}
          </span>
          <h4 className="text-xl font-bold text-charcoal-900 font-display">
            Application Registered Successfully
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            Thank you, <strong className="text-charcoal-900">{submittedData.name}</strong>. {serverMessage}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 text-left space-y-2 text-xs">
          <div className="font-bold text-stone-700 uppercase text-[10px] tracking-wider font-mono">
            Next Steps in Your Admission Process:
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-4 h-4 rounded-full bg-brand-100 text-brand-900 font-mono text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Admissions Dean review within 24 business hours</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-4 h-4 rounded-full bg-brand-100 text-brand-900 font-mono text-[10px] flex items-center justify-center font-bold">2</span>
            <span>Diagnostic assessment slot confirmation link sent via Email/SMS</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors pt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  // ACTIVE FORM VIEW
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Error Alert Banner */}
      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>{serverMessage}</div>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alexander Vance"
            disabled={status === 'submitting'}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none transition-colors ${
              errors.name
                ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                : 'border-stone-300 focus:border-brand-800 focus:ring-1 focus:ring-brand-800'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. alexander@example.com"
            disabled={status === 'submitting'}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none transition-colors ${
              errors.email
                ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                : 'border-stone-300 focus:border-brand-800 focus:ring-1 focus:ring-brand-800'
            }`}
          />
          {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2: Phone & Target Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Phone Number <span className="text-rose-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 234-5678"
            disabled={status === 'submitting'}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none transition-colors ${
              errors.phone
                ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
                : 'border-stone-300 focus:border-brand-800 focus:ring-1 focus:ring-brand-800'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Selected Program <span className="text-rose-600">*</span>
          </label>
          <select
            name="targetCourseTitle"
            value={formData.targetCourseTitle}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800 transition-colors"
          >
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c} className="bg-white text-stone-900">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Current Education & Preferred Learning Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Current Education Level
          </label>
          <select
            name="currentEducation"
            value={formData.currentEducation}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800 transition-colors"
          >
            {EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-white text-stone-900">
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Preferred Learning Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Hybrid', 'Classroom', 'Online'] as const).map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setFormData((prev) => ({ ...prev, preferredMode: mode }))}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                  formData.preferredMode === mode
                    ? 'bg-brand-900 text-white border-brand-900 shadow-sm'
                    : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message / Questions */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">
          Questions or Scholarship Inquiries (Optional)
        </label>
        <textarea
          rows={3}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mention any specific goals, target rank aspirations, or hostel requirements..."
          disabled={status === 'submitting'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800 transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-4 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed text-white shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Processing Application...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Submit Application / Enquiry</span>
          </>
        )}
      </button>

      {/* Privacy assurance */}
      <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>Your data is strictly confidential under EduNexa Admissions Policy.</span>
      </p>
    </form>
  );
}

