'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Save, 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  X
} from 'lucide-react';
import { InstituteMetrics } from '@/types';

export default function AdminHomepagePage() {
  const [metrics, setMetrics] = useState<InstituteMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    totalStudents: '3450',
    selectionRatePercent: '98.4',
    scholarshipsGranted: '$1.4M+',
    alumniPlaced: '2800',
    averageRating: '4.92',
  });

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage');
      const json = await res.json();
      if (json.success) {
        setMetrics(json.data);
        setFormData({
          totalStudents: String(json.data.totalStudents || 3450),
          selectionRatePercent: String(json.data.selectionRatePercent || 98.4),
          scholarshipsGranted: json.data.scholarshipsGranted || '$1.4M+',
          alumniPlaced: String(json.data.alumniPlaced || 2800),
          averageRating: String(json.data.averageRating || 4.92),
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const handleSaveMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      totalStudents: Number(formData.totalStudents),
      selectionRatePercent: Number(formData.selectionRatePercent),
      scholarshipsGranted: formData.scholarshipsGranted,
      alumniPlaced: Number(formData.alumniPlaced),
      averageRating: Number(formData.averageRating),
    };

    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Homepage impact metrics updated successfully.' });
        setMetrics(json.data);
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to update metrics.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error updating metrics.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-stone-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-800" />
        <span className="text-xs font-mono uppercase tracking-widest text-stone-500">Loading Homepage Settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
          <Home className="w-3.5 h-3.5 text-brand-800" /> Public Portal Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Homepage Impact Metrics CMS
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Modify the live stats and institutional benchmarks displayed across the public homepage and admissions hero.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-2 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Live Preview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-1">
          <span className="text-[11px] text-stone-500 font-mono">Total Scholars</span>
          <div className="text-2xl font-black text-charcoal-900 font-display">{formData.totalStudents}+</div>
          <span className="text-[10px] text-stone-400 font-mono">Live on Homepage</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-1">
          <span className="text-[11px] text-stone-500 font-mono">Selection Rate</span>
          <div className="text-2xl font-black text-emerald-800 font-display">{formData.selectionRatePercent}%</div>
          <span className="text-[10px] text-emerald-700 font-mono">Entrance Benchmark</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-1">
          <span className="text-[11px] text-stone-500 font-mono">Scholarship Fund</span>
          <div className="text-2xl font-black text-amber-800 font-display">{formData.scholarshipsGranted}</div>
          <span className="text-[10px] text-stone-400 font-mono">NSTHE Disbursed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-card space-y-1">
          <span className="text-[11px] text-stone-500 font-mono">Alumni Placed</span>
          <div className="text-2xl font-black text-brand-900 font-display">{formData.alumniPlaced}+</div>
          <span className="text-[10px] text-stone-400 font-mono">MIT, AIIMS, FAANG</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSaveMetrics} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
        <div>
          <h2 className="text-base font-bold text-charcoal-900 font-display">Update Statistical Metrics</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Changes saved here update immediately on public pages without redeploying.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Total Enrolled Scholars Count
            </label>
            <input
              type="number"
              required
              value={formData.totalStudents}
              onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Selection Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={formData.selectionRatePercent}
              onChange={(e) => setFormData({ ...formData, selectionRatePercent: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Scholarships Granted ($)
            </label>
            <input
              type="text"
              required
              value={formData.scholarshipsGranted}
              onChange={(e) => setFormData({ ...formData, scholarshipsGranted: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Alumni Placed
            </label>
            <input
              type="number"
              required
              value={formData.alumniPlaced}
              onChange={(e) => setFormData({ ...formData, alumniPlaced: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Average Scholar Rating
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.averageRating}
              onChange={(e) => setFormData({ ...formData, averageRating: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving Metrics...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Homepage Metrics</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
