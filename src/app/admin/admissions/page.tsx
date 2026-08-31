'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X
} from 'lucide-react';
import { AdmissionLead } from '@/types';

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'Counselling Scheduled', 'Enrolled', 'Closed'];

export default function AdminAdmissionsPage() {
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (statusFilter !== 'All') queryParams.set('status', statusFilter);
      if (search.trim()) queryParams.set('q', search.trim());

      const res = await fetch(`/api/admin/admissions?${queryParams.toString()}`);
      const json = await res.json();
      if (json.success) setLeads(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [statusFilter, search]);

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
        setFeedback({ type: 'success', message: `Lead status updated to ${newStatus}` });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Failed to update status.' });
    }
  };

  const handleDeleteLead = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/admissions?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Lead deleted successfully.' });
        setDeletingId(null);
        await loadLeads();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to delete.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Error deleting lead.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-brand-800" /> Admission CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Admission Inquiries & Application Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Review prospective student inquiries, update counseling statuses, and manage enrollment conversions.
          </p>
        </div>

        <div className="text-xs text-stone-600 font-mono bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
          Total Leads: <strong className="text-charcoal-900">{leads.length}</strong>
        </div>
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

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, target course, or reference ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200 font-mono">
              <tr>
                <th className="py-3.5 px-4">Ref & Applicant</th>
                <th className="py-3.5 px-4">Target Course & Mode</th>
                <th className="py-3.5 px-4">Inquiry / Message</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Update</th>
                <th className="py-3.5 px-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-800 mb-2" />
                    <span>Loading admissions CRM...</span>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    No admission applications or inquiries found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono text-brand-900 font-bold block">
                        {lead.referenceId || 'EDN-ADM-0000'}
                      </span>
                      <div className="font-bold text-charcoal-900 text-sm">{lead.name}</div>
                      <div className="flex items-center gap-2 text-stone-500 text-[11px] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-brand-800" /> {lead.email}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-700" /> {lead.phone}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-charcoal-900 line-clamp-1">{lead.targetCourseTitle}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{lead.preferredMode} • {lead.city}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-[11px] text-stone-600 line-clamp-2">
                        {lead.message || 'No additional message provided.'}
                      </p>
                      <span className="text-[10px] text-stone-400 font-mono block mt-0.5">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                          lead.status === 'New'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : lead.status === 'Counselling Scheduled'
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                            : lead.status === 'Enrolled'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                      >
                        <option value="New">Set New</option>
                        <option value="Contacted">Set Contacted</option>
                        <option value="Counselling Scheduled">Set Scheduled</option>
                        <option value="Enrolled">Set Enrolled</option>
                        <option value="Closed">Set Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setDeletingId(lead.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">Delete Admission Lead</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove this prospective student application from the CRM?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteLead(deletingId)}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

