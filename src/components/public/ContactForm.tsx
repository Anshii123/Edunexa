'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw, ShieldCheck } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admissions & Batch Inquiries',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [referenceId, setReferenceId] = useState<string>('');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message with at least 5 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setReferenceId(data.data?.referenceId || `EDN-CNT-${Math.floor(1000 + Math.random() * 9000)}`);
      setServerMessage(data.message || 'Your message has been sent to our academic desk.');
    } catch (err: any) {
      setStatus('error');
      setServerMessage(err.message || 'Unable to deliver message. Please check your network and retry.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Admissions & Batch Inquiries',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setServerMessage('');
    setReferenceId('');
  };

  if (status === 'success') {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-md border border-emerald-200 inline-block">
            REF: {referenceId}
          </span>
          <h4 className="text-xl font-bold text-charcoal-900 font-display">
            Message Sent Successfully
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            {serverMessage} Our academic counseling team will respond to your email within 24 hours.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-900 hover:text-brand-700 transition-colors pt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>{serverMessage}</div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Your Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Maya Lin"
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
            placeholder="e.g. maya.lin@example.com"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 234-5678"
            disabled={status === 'submitting'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Inquiry Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800 transition-colors"
          >
            <option value="Admissions & Batch Inquiries" className="bg-white text-stone-900">
              Admissions & Batch Inquiries
            </option>
            <option value="Scholarship Test (NSTHE)" className="bg-white text-stone-900">
              Scholarship Test (NSTHE)
            </option>
            <option value="On-Campus Tour Request" className="bg-white text-stone-900">
              On-Campus Tour Request
            </option>
            <option value="Hostel & Residential Accommodation" className="bg-white text-stone-900">
              Hostel & Residential Accommodation
            </option>
            <option value="Corporate & Academic Partnerships" className="bg-white text-stone-900">
              Corporate & Academic Partnerships
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-700 mb-1">
          Your Message <span className="text-rose-600">*</span>
        </label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your question or request here..."
          disabled={status === 'submitting'}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none transition-colors ${
            errors.message
              ? 'border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-600'
              : 'border-stone-300 focus:border-brand-800 focus:ring-1 focus:ring-brand-800'
          }`}
        />
        {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-4 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Send Direct Message</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>Your inquiries are sent directly to the Campus Admissions Desk.</span>
      </p>
    </form>
  );
}

