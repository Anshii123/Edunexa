'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileSpreadsheet, 
  Bell, 
  Calendar, 
  Image as ImageIcon, 
  TrendingUp, 
  Plus, 
  Search, 
  CheckCircle, 
  Loader2
} from 'lucide-react';
import { AdmissionLead, InstituteMetrics } from '@/types';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<InstituteMetrics | null>(null);
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Quick notice publisher state
  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: 'General' });
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, lRes] = await Promise.all([
          fetch('/api/admin/homepage'),
          fetch('/api/admin/admissions'),
        ]);

        const mJson = await mRes.json();
        const lJson = await lRes.json();

        if (mJson.success) setMetrics(mJson.data);
        if (lJson.success) setLeads(lJson.data);
      } catch (e) {
        console.error('Failed to load admin overview data', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: AdmissionLead['status']) => {
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (e) {
      console.error('Failed to update lead', e);
    }
  };

  const handlePublishNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });
      const data = await res.json();
      if (data.success) {
        setPublishSuccess(true);
        setNewNotice({ title: '', content: '', category: 'General' });
        setTimeout(() => setPublishSuccess(false), 3500);
      }
    } catch (e) {
      console.error('Failed to publish notice', e);
    } finally {
      setPublishing(false);
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.targetCourseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse max-w-6xl mx-auto">
        <div className="h-36 rounded-3xl bg-stone-200" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-stone-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-brand-900 text-[11px] font-bold uppercase tracking-wider border border-stone-200 flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-800" />
              Administrative Governance Center
            </span>
            <span className="text-xs font-mono text-stone-500">Authenticated: Dean Arthur Sterling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Real-time control across admissions, course curricula, faculty directory, campus circulars, and system metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Courses</span>
          </Link>
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-brand-800" />
            <span>View All Leads ({leads.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Admission Inquiries</span>
            <FileSpreadsheet className="w-4 h-4 text-brand-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display">
            {leads.length} Active
          </div>
          <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-mono font-medium">
            <TrendingUp className="w-3 h-3 text-emerald-700" /> +18% weekly growth
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Enrolled Scholars</span>
            <Users className="w-4 h-4 text-brand-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">
            {metrics?.totalStudents || 3450}
          </div>
          <div className="text-[11px] text-stone-500">Across 4 Flagship Cohorts</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Selection Rate</span>
            <GraduationCap className="w-4 h-4 text-brand-800" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-display">
            {metrics?.selectionRatePercent || 98.4}%
          </div>
          <div className="text-[11px] text-stone-500 font-mono">National Entrance Benchmark</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Scholarships Granted</span>
            <GraduationCap className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-display">
            {metrics?.scholarshipsGranted || '$1.4M+'}
          </div>
          <div className="text-[11px] text-stone-500 font-mono">Annual NSTHE Remission Fund</div>
        </div>
      </div>

      {/* Quick Access Submodules Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/admin/courses"
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-brand-800 shadow-card text-left transition-all group"
        >
          <BookOpen className="w-5 h-5 text-brand-800 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-charcoal-900 font-display">Courses & Syllabus</div>
          <div className="text-[10px] text-stone-500 mt-0.5">Publish & edit programs</div>
        </Link>

        <Link
          href="/admin/faculty"
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-brand-800 shadow-card text-left transition-all group"
        >
          <GraduationCap className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-charcoal-900 font-display">Faculty Mentors</div>
          <div className="text-[10px] text-stone-500 mt-0.5">Add & update professors</div>
        </Link>

        <Link
          href="/admin/events"
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-brand-800 shadow-card text-left transition-all group"
        >
          <Calendar className="w-5 h-5 text-purple-700 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-charcoal-900 font-display">Masterclass Events</div>
          <div className="text-[10px] text-stone-500 mt-0.5">Manage schedules & seats</div>
        </Link>

        <Link
          href="/admin/media"
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-brand-800 shadow-card text-left transition-all group"
        >
          <ImageIcon className="w-5 h-5 text-indigo-700 mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-charcoal-900 font-display">Media Registry</div>
          <div className="text-[10px] text-stone-500 mt-0.5">Manage 8 photo categories</div>
        </Link>
      </div>

      {/* Main Grid: CRM Leads Table & Notice Publisher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Recent Admission Inquiries Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-charcoal-900 font-display flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-brand-800" />
                Recent Admission Inquiries
              </h2>
              <p className="text-xs text-stone-500">Applications and callback inquiries</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs text-charcoal-900 placeholder-stone-400 focus:outline-none focus:border-brand-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200 font-mono">
                  <tr>
                    <th className="py-3 px-4">Ref & Applicant</th>
                    <th className="py-3 px-4">Program</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono text-brand-900 font-bold block">
                          {lead.referenceId || 'EDN-ADM-0000'}
                        </span>
                        <div className="font-bold text-charcoal-900">{lead.name}</div>
                        <div className="text-[11px] text-stone-500">{lead.phone} • {lead.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-charcoal-900 line-clamp-1">{lead.targetCourseTitle}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{lead.preferredMode} • {lead.city}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            lead.status === 'New'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : lead.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : lead.status === 'Counselling Scheduled'
                              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                        >
                          <option value="New">Set New</option>
                          <option value="Contacted">Set Contacted</option>
                          <option value="Counselling Scheduled">Set Scheduled</option>
                          <option value="Enrolled">Set Enrolled</option>
                          <option value="Closed">Set Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Notice Broadcast */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-4">
            <h3 className="text-base font-bold text-charcoal-900 font-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-800" />
              Broadcast Notice
            </h3>

            {publishSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notice broadcasted live across public & student portals!</span>
              </div>
            )}

            <form onSubmit={handlePublishNotice} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NSTHE Scholarship Result Date"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exams">Exams & Tests</option>
                  <option value="Urgent">Urgent Circular</option>
                  <option value="General">General Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Content *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Official circular text..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
                />
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="w-full py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  <span>Publish Notice Live</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

