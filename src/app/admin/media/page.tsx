'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X
} from 'lucide-react';
import { MediaAsset, MediaCategory } from '@/lib/media/types';

const CATEGORIES = ['All', 'campus', 'classrooms', 'students', 'faculty', 'courses', 'events', 'successStories', 'gallery'];

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaAsset[]>([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    alt: '',
    category: 'campus' as MediaCategory,
    url: '',
    caption: '',
    aspectRatio: '16/9' as const,
  });

  const loadMedia = async () => {
    setLoading(true);
    try {
      const query = selectedCat !== 'All' ? `?category=${selectedCat}` : '';
      const res = await fetch(`/api/admin/media${query}`);
      const json = await res.json();
      if (json.success) setMediaItems(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [selectedCat]);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRegisterMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Media asset uploaded/registered successfully.' });
        setIsModalOpen(false);
        setFormData({
          title: '',
          alt: '',
          category: 'campus',
          url: '',
          caption: '',
          aspectRatio: '16/9',
        });
        await loadMedia();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to register image.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Media asset deleted successfully.' });
        setDeletingId(null);
        await loadMedia();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to delete.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Error deleting media asset.' });
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
            <ImageIcon className="w-3.5 h-3.5 text-brand-800" /> Media Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Media Library & Asset Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage high-resolution photography across campus, classrooms, faculty portraits, and events.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
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

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-white border border-stone-200/90 shadow-card">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              selectedCat === cat
                ? 'bg-brand-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-800 mb-2" />
            <span>Loading media library...</span>
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-stone-400">
            No media assets found in this category.
          </div>
        ) : (
          mediaItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-video bg-stone-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[10px] font-mono text-brand-900 border border-stone-200 uppercase font-semibold">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-charcoal-900 truncate font-display">{item.title}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1">{item.alt}</p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[11px] font-semibold text-stone-700 border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-800">URL Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">Delete Media Asset</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove this media record from the registry?
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
                onClick={() => handleDeleteMedia(deletingId)}
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

      {/* Upload / Register Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">
                Register Media Asset
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Innovation Quad Amphitheater"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  >
                    <option value="campus">Campus</option>
                    <option value="classrooms">Classrooms</option>
                    <option value="students">Students</option>
                    <option value="faculty">Faculty</option>
                    <option value="courses">Courses</option>
                    <option value="events">Events</option>
                    <option value="successStories">Success Stories</option>
                    <option value="gallery">Gallery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  >
                    <option value="16/9">16:9 Landscape</option>
                    <option value="4/3">4:3 Standard</option>
                    <option value="1/1">1:1 Square</option>
                    <option value="3/4">3:4 Portrait</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  placeholder="Descriptive image text for screen readers..."
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                />
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
                  <span>Register Asset</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

