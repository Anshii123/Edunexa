'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Edit3, 
  Trash2, 
  Pin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X,
  Search
} from 'lucide-react';
import { Notice } from '@/types';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'General' as Notice['category'],
    content: '',
    targetAudience: 'All' as Notice['targetAudience'],
    isPinned: false,
    author: 'Dean of Academic Governance',
  });

  const loadNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notices');
      const json = await res.json();
      if (json.success) setNotices(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      category: 'General',
      content: '',
      targetAudience: 'All',
      isPinned: false,
      author: 'Dean of Academic Governance',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (n: Notice) => {
    setEditingNotice(n);
    setFormData({
      title: n.title,
      category: n.category,
      content: n.content,
      targetAudience: n.targetAudience,
      isPinned: Boolean(n.isPinned),
      author: n.author,
    });
    setIsModalOpen(true);
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = '/api/admin/notices';
      const method = editingNotice ? 'PUT' : 'POST';
      const body = editingNotice ? { id: editingNotice.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: json.message });
        setIsModalOpen(false);
        await loadNotices();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save notice.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'A network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Notice deleted successfully.' });
        setDeletingId(null);
        await loadNotices();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to delete.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Error deleting notice.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePin = async (n: Notice) => {
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: n.id, isPinned: !n.isPinned }),
      });
      if (res.ok) {
        setNotices((prev) =>
          prev.map((item) => (item.id === n.id ? { ...item, isPinned: !n.isPinned } : item))
        );
        setFeedback({
          type: 'success',
          message: `Notice ${!n.isPinned ? 'pinned to top' : 'unpinned'} successfully.`,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <Bell className="w-3.5 h-3.5 text-amber-700" /> Institutional Broadcasts
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Notice & Circular Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Publish examination schedules, academic board decrees, and campus holiday circulars.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
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

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className={`bg-white rounded-3xl p-6 border shadow-card transition-all space-y-3.5 ${
              n.isPinned
                ? 'border-amber-300 bg-amber-50/40'
                : 'border-stone-200/90'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePin(n)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 transition-colors font-mono ${
                    n.isPinned
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-stone-100 text-stone-600 border-stone-200 hover:text-stone-900'
                  }`}
                >
                  <Pin className="w-3 h-3 text-amber-700" />
                  <span>{n.isPinned ? 'Pinned Circular' : 'Click to Pin'}</span>
                </button>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200 font-mono">
                  {n.category}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">Audience: {n.targetAudience}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono mr-2">{n.publishDate}</span>
                <button
                  onClick={() => openEditModal(n)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                  title="Edit Notice"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeletingId(n.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                  title="Delete Notice"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-charcoal-900 font-display">{n.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{n.content}</p>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Author: <strong className="text-charcoal-900">{n.author}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">Delete Circular</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to delete this official circular from all feeds?
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
                onClick={() => handleDeleteNotice(deletingId)}
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">
                {editingNotice ? 'Edit Circular Notice' : 'Broadcast New Circular'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fall Semester Final Mock Test Schedule"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Exams">Exams & Tests</option>
                    <option value="Events">Campus Events</option>
                    <option value="Urgent">Urgent Circular</option>
                    <option value="General">General Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  >
                    <option value="All">All Audiences</option>
                    <option value="Students">Enrolled Students Only</option>
                    <option value="Faculty">Faculty Only</option>
                    <option value="Admissions">Prospective Admissions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Circular Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed guidelines, room numbers, reporting times..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-900 border-stone-300"
                />
                <label htmlFor="pinCheck" className="text-xs text-stone-700 font-semibold cursor-pointer">
                  Pin to Top of Public & Student Feeds
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingNotice ? 'Update Notice' : 'Publish Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

