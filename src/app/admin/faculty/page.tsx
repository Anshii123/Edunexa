'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Star
} from 'lucide-react';
import { Faculty } from '@/types';

export default function AdminFacultyPage() {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    department: 'Department of Advanced Physics & STEM',
    qualifications: 'Ph.D. in Physics, MIT',
    experienceYears: '14',
    specialization: 'Quantum Mechanics, Olympiad Problem Formulation',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: '',
  });

  const loadFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faculty');
      const json = await res.json();
      if (json.success) setFacultyList(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const openCreateModal = () => {
    setEditingFaculty(null);
    setFormData({
      name: '',
      title: 'Senior Faculty & Olympiad Mentor',
      department: 'Department of Advanced Physics & STEM',
      qualifications: 'Ph.D. in Physics, MIT',
      experienceYears: '10',
      specialization: 'Quantum Mechanics, Classical Mechanics',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Dedicated subject specialist training students for national competitive entrance honors.',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (f: Faculty) => {
    setEditingFaculty(f);
    setFormData({
      name: f.name,
      title: f.title,
      department: f.department,
      qualifications: f.qualifications,
      experienceYears: String(f.experienceYears),
      specialization: f.specialization.join(', '),
      email: f.email,
      avatar: f.avatar,
      bio: f.bio,
    });
    setIsModalOpen(true);
  };

  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const payload = {
      ...formData,
      experienceYears: Number(formData.experienceYears),
      specialization: formData.specialization.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      const url = '/api/admin/faculty';
      const method = editingFaculty ? 'PUT' : 'POST';
      const body = editingFaculty ? { id: editingFaculty.id, ...payload } : payload;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: json.message });
        setIsModalOpen(false);
        await loadFaculty();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save faculty.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Network error saving faculty.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/faculty?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Faculty member removed successfully.' });
        setDeletingId(null);
        await loadFaculty();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to delete.' });
      }
    } catch (e) {
      setFeedback({ type: 'error', message: 'Error deleting faculty member.' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFaculty = facultyList.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-brand-800" /> Faculty Governance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Faculty Mentors & Department Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage subject deans, academic credentials, department assignments, and contact records.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
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

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
          />
        </div>
      </div>

      {/* Faculty Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-4">
              <img
                src={f.avatar}
                alt={f.name}
                className="w-16 h-16 rounded-2xl object-cover border border-stone-300 shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {f.rating} ({f.studentsMentored}+ scholars)
                </div>
                <h3 className="text-base font-bold text-charcoal-900 font-display truncate">{f.name}</h3>
                <p className="text-xs text-brand-900 font-medium truncate">{f.title}</p>
                <div className="text-[11px] text-stone-500">{f.department}</div>
              </div>
            </div>

            <p className="text-xs text-stone-600 line-clamp-2">{f.bio}</p>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-mono truncate">{f.email}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(f)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                  title="Edit Details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeletingId(f.id)}
                  className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                  title="Remove Faculty"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
              <h3 className="text-lg font-bold text-charcoal-900 font-display">Remove Faculty Member</h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to delete this faculty record from the institute roster?
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
                onClick={() => handleDeleteFaculty(deletingId)}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Removal</span>
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
                {editingFaculty ? 'Edit Faculty Record' : 'Add Faculty Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name & Honorific *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Designation Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dean of Advanced Physics"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics & STEM"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    placeholder="Ph.D. in Physics, MIT"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="faculty@edunexa.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Specializations (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Mechanics, Quantum Theory, Olympiad Preparation"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Bio / Pedagogy Philosophy
                </label>
                <textarea
                  rows={3}
                  placeholder="Short pedagogical philosophy..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                  <span>{editingFaculty ? 'Save Changes' : 'Add to Faculty'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

