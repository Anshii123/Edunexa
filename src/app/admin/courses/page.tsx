'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X
} from 'lucide-react';
import { Course } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Competitive Exams' as Course['category'],
    level: 'Comprehensive' as Course['level'],
    duration: '24 Months',
    fee: '3500',
    discountedFee: '2950',
    mode: 'Hybrid (Classroom + Live)' as Course['mode'],
    badge: 'Flagship Program',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    active: true,
  });

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses');
      const json = await res.json();
      if (json.success) setCourses(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      category: 'Competitive Exams',
      level: 'Comprehensive',
      duration: '24 Months',
      fee: '3500',
      discountedFee: '2950',
      mode: 'Hybrid (Classroom + Live)',
      badge: 'Flagship Program',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setFormData({
      title: c.title,
      category: c.category,
      level: c.level,
      duration: c.duration,
      fee: String(c.fee),
      discountedFee: c.discountedFee ? String(c.discountedFee) : '',
      mode: c.mode,
      badge: c.badge || '',
      description: c.shortDescription || c.description || '',
      thumbnail: c.thumbnail,
      active: c.active,
    });
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      ...formData,
      fee: Number(formData.fee),
      discountedFee: formData.discountedFee ? Number(formData.discountedFee) : undefined,
      shortDescription: formData.description,
      fullDescription: formData.description,
    };

    try {
      const url = '/api/admin/courses';
      const method = editingCourse ? 'PUT' : 'POST';
      const body = editingCourse ? { id: editingCourse.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: json.message });
        setIsModalOpen(false);
        await loadCourses();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save course.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'A network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Course deleted successfully.' });
        setDeletingId(null);
        await loadCourses();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to delete.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Network error deleting course.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (c: Course) => {
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...c, active: !c.active }),
      });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((item) => (item.id === c.id ? { ...item, active: !c.active } : item))
        );
        setFeedback({
          type: 'success',
          message: `Course ${!c.active ? 'published' : 'unpublished'} successfully.`,
        });
        await loadCourses();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.shortDescription || c.description || '').toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5 text-brand-800" /> Academic Curricula
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Course & Program Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Create, update syllabus details, adjust tuition fees, and publish or unpublish flagship cohorts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
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

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-mono">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs text-charcoal-900 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Competitive Exams">Competitive Exams</option>
            <option value="Engineering & IT">Engineering & IT</option>
            <option value="Medical Sciences">Medical Sciences</option>
            <option value="Management">Management</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200 font-mono">
              <tr>
                <th className="py-3.5 px-4">Program Title</th>
                <th className="py-3.5 px-4">Category & Level</th>
                <th className="py-3.5 px-4">Duration & Fee</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-charcoal-900 text-sm">{c.title}</div>
                    <div className="text-[11px] text-stone-400 font-mono">/courses/{c.slug}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-brand-900 text-[10px] font-semibold border border-stone-200 font-mono">
                      {c.category}
                    </span>
                    <div className="text-[11px] text-stone-500 mt-1">{c.level} Level</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-charcoal-900">
                      {c.discountedFee ? formatCurrency(c.discountedFee) : formatCurrency(c.fee)}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">{c.duration}</div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleTogglePublish(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 font-mono ${
                        c.active
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      {c.active ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-stone-400" />}
                      <span>{c.active ? 'Published' : 'Draft / Unlisted'}</span>
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="Edit Course"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingId(c.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
              <h3 className="text-lg font-bold text-charcoal-900 font-display">Confirm Course Deletion</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to permanently remove this course from the catalog? This cannot be undone.
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
                onClick={() => handleDeleteCourse(deletingId)}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-stone-200 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-charcoal-900 font-display">
                {editingCourse ? 'Edit Academic Program' : 'Create New Academic Program'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Program Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Quantum Mechanics & Olympiad Elite"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
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
                    <option value="Competitive Exams">Competitive Exams</option>
                    <option value="Engineering & IT">Engineering & IT</option>
                    <option value="Medical Sciences">Medical Sciences</option>
                    <option value="Management">Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Program Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Comprehensive">Comprehensive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 Months"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Fee ($) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="3500"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Discounted Fee ($)
                  </label>
                  <input
                    type="number"
                    placeholder="2950"
                    value={formData.discountedFee}
                    onChange={(e) => setFormData({ ...formData, discountedFee: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Short Description & Syllabus Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed course description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-900 border-stone-300"
                />
                <label htmlFor="activeCheck" className="text-xs text-stone-700 font-semibold cursor-pointer">
                  Publish to Public Website & Course Catalog
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
                  <span>{editingCourse ? 'Update Course' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

