'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  GraduationCap, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function StudentProfilePage() {
  const { refreshUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/student/profile');
        const json = await res.json();
        if (json.success) {
          setProfile(json.data);
          setFormData({
            name: json.data.name || '',
            phone: json.data.phone || '',
            avatar: json.data.avatar || '',
          });
        }
      } catch (err) {
        console.error('Failed to load student profile', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setProfile((prev: any) => ({ ...prev, ...json.data }));
        setMessage({ type: 'success', text: 'Personal details updated successfully.' });
        await refreshUser();
      } else {
        setMessage({ type: 'error', text: json.error || 'Failed to update profile.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'A network error occurred while updating profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-stone-200 rounded-xl" />
        <div className="h-64 bg-stone-200 rounded-3xl" />
        <div className="h-48 bg-stone-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <User className="w-3.5 h-3.5 text-brand-800" />
          <span>Identity & Academic Credentials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Student Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Manage your personal contact details and view official institute enrollment data.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2.5 animate-fade-in ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Official Institute Credentials (Read-only) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-brand-900">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">
                Institutional Academic Credentials
              </h2>
              <p className="text-xs text-stone-500">Verified official record issued by EduNexa Academic Board</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 font-mono">
            Active Scholar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Permanent Student ID</span>
            <div className="text-base font-mono font-bold text-brand-900">
              {profile?.studentId || 'EDN-2026-0842'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Registered Batch Cohort</span>
            <div className="text-sm font-bold text-charcoal-900">
              {profile?.batch || 'STEM 2026-28 Batch Alpha'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Academic Department</span>
            <div className="text-sm font-bold text-charcoal-900">
              {profile?.department || 'School of Advanced STEM'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Primary Account Email</span>
            <div className="text-xs font-mono font-bold text-charcoal-900 truncate">
              {profile?.email}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Account Role</span>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
              {profile?.role}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="text-stone-500 font-mono">Member Since</span>
            <div className="text-xs font-mono text-stone-600">
              {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'August 2026'}
            </div>
          </div>
        </div>
      </div>

      {/* Editable Personal Details Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
        <div>
          <h2 className="text-base font-bold text-charcoal-900 font-display">Personal Contact Details</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Update your displayed scholar name, communication contact number, and avatar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-stone-50 border border-stone-200">
          <img
            src={formData.avatar || profile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'}
            alt={formData.name}
            className="w-16 h-16 rounded-2xl object-cover border border-stone-300 shrink-0"
          />
          <div className="w-full space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData((prev) => ({ ...prev, avatar: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Contact Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 234-5678"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white shadow-sm flex items-center gap-2 text-xs transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

