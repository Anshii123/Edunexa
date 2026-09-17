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
      <div className="space-y-8 animate-pulse max-w-5xl">
        <div className="h-28 rounded-2xl bg-stone-200/60" />
        <div className="h-44 rounded-2xl bg-stone-200/60" />
        <div className="h-64 rounded-2xl bg-stone-200/60" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-10">
      
      {/* 1. Header (Large Typography & Subtitle) */}
      <div className="space-y-2 border-b border-black/[0.06] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#64748B] mb-1">
            Skillora Governance & Operations Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] font-display tracking-tight">
            Academic Operations Center
          </h1>
          <p className="text-sm text-[#475569]">
            Manage student admissions, curricula updates, faculty directories, and campus notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Courses</span>
          </Link>
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#0F172A] font-semibold text-xs border border-black/[0.08] transition-all shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Leads ({leads.length})</span>
          </Link>
        </div>
      </div>

      {/* 2. Structured Operational Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Active Inquiries</span>
            <FileSpreadsheet className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            {leads.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% this month
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Enrolled Scholars</span>
            <Users className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            {metrics?.totalStudents || 3450}
          </div>
          <div className="text-[11px] text-[#64748B]">Across 4 cohorts</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Selection Rate</span>
            <GraduationCap className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            {metrics?.selectionRatePercent || 98.4}%
          </div>
          <div className="text-[11px] text-[#64748B]">Entrance benchmark</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Scholarship Fund</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            {metrics?.scholarshipsGranted || '$1.4M+'}
          </div>
          <div className="text-[11px] text-amber-800 font-medium">NSTHE annual remission</div>
        </div>
      </div>

      {/* 3. Quick Navigation Hub */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <Link
          href="/admin/courses"
          className="p-4 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] shadow-xs text-left transition-all group"
        >
          <BookOpen className="w-4 h-4 text-[#2563EB] mb-2 group-hover:scale-105 transition-transform" />
          <div className="text-xs font-bold text-[#0F172A]">Courses & Curricula</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Author & update tracks</div>
        </Link>

        <Link
          href="/admin/faculty"
          className="p-4 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] shadow-xs text-left transition-all group"
        >
          <GraduationCap className="w-4 h-4 text-emerald-600 mb-2 group-hover:scale-105 transition-transform" />
          <div className="text-xs font-bold text-[#0F172A]">Faculty Directory</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Manage mentor profiles</div>
        </Link>

        <Link
          href="/admin/events"
          className="p-4 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] shadow-xs text-left transition-all group"
        >
          <Calendar className="w-4 h-4 text-purple-600 mb-2 group-hover:scale-105 transition-transform" />
          <div className="text-xs font-bold text-[#0F172A]">Masterclasses</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Timetables & seats</div>
        </Link>

        <Link
          href="/admin/media"
          className="p-4 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] shadow-xs text-left transition-all group"
        >
          <ImageIcon className="w-4 h-4 text-[#2563EB] mb-2 group-hover:scale-105 transition-transform" />
          <div className="text-xs font-bold text-[#0F172A]">Media Library</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Photo & video assets</div>
        </Link>
      </div>

      {/* 4. Split Section: Admission Inquiries Table & Notice Broadcast Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Admission Inquiries */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] font-display flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#2563EB]" />
                Recent Admission Inquiries
              </h2>
              <p className="text-xs text-[#64748B]">Applicant callback and counseling requests</p>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#334155]">
                <thead className="bg-[#F8F7F4] text-[#64748B] uppercase tracking-wider font-semibold border-b border-black/[0.06] text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Target Course</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {filteredLeads.slice(0, 5).map((lead) => (
                    <tr key={lead.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono text-[#2563EB] font-bold block">
                          {lead.referenceId || 'SKL-ADM-0000'}
                        </span>
                        <div className="font-bold text-[#0F172A]">{lead.name}</div>
                        <div className="text-[11px] text-[#64748B]">{lead.phone} • {lead.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#0F172A] line-clamp-1">{lead.targetCourseTitle}</div>
                        <div className="text-[10px] text-[#64748B]">{lead.preferredMode} • {lead.city}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            lead.status === 'New'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : lead.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : lead.status === 'Counselling Scheduled'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
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
                          className="px-2 py-1 rounded-lg bg-white border border-black/[0.1] text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB]"
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
          <div className="bg-white rounded-2xl p-5 border border-black/[0.08] shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] font-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2563EB]" />
              Broadcast Notice
            </h2>

            {publishSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notice published live across student portal!</span>
              </div>
            )}

            <form onSubmit={handlePublishNotice} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#0F172A] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NSTHE Scholarship Result Date"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#0F172A] mb-1">
                  Category
                </label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-[#0F172A] text-xs focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exams">Exams & Tests</option>
                  <option value="Urgent">Urgent Circular</option>
                  <option value="General">General Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#0F172A] mb-1">
                  Content *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Official circular text..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
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
