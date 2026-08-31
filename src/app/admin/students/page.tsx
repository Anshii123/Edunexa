'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Edit3
} from 'lucide-react';
import { StudentProfile } from '@/types';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [editForm, setEditForm] = useState({
    batch: '',
    attendanceRate: '96.5',
    overallScore: '92.4',
  });

  const loadStudents = async () => {
    setLoading(true);
    try {
      const q = search.trim() ? `?q=${search.trim()}` : '';
      const res = await fetch(`/api/admin/students${q}`);
      const json = await res.json();
      if (json.success) setStudents(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [search]);

  const openEditModal = (s: StudentProfile) => {
    setEditingStudent(s);
    setEditForm({
      batch: s.batch,
      attendanceRate: String(s.attendanceRate),
      overallScore: String(s.overallScore),
    });
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingStudent.id,
          batch: editForm.batch,
          attendanceRate: Number(editForm.attendanceRate),
          overallScore: Number(editForm.overallScore),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setFeedback({ type: 'success', message: 'Student academic record updated successfully.' });
        setEditingStudent(null);
        await loadStudents();
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to update record.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error occurred.' });
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
            <Users className="w-3.5 h-3.5 text-brand-800" /> Enrolled Scholars
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
            Student Roster & Academic Records
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Monitor attendance rates, Olympiad test scores, cohort allocations, and academic distinctions.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
          Enrolled Scholars: <strong className="text-charcoal-900">{students.length}</strong>
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

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students by name, student ID, cohort..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200 font-mono">
              <tr>
                <th className="py-3.5 px-4">Scholar Identity</th>
                <th className="py-3.5 px-4">Registered Cohort</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Overall Score</th>
                <th className="py-3.5 px-4">Academic Badges</th>
                <th className="py-3.5 px-4 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-800 mb-2" />
                    <span>Loading student records...</span>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    No student records found matching search.
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-300 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-charcoal-900 text-sm">{s.name}</div>
                          <span className="text-[11px] font-mono text-brand-900 font-bold">{s.studentId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-charcoal-900">{s.batch}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-emerald-800 font-mono">{s.attendanceRate}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-amber-900 font-mono">{s.overallScore}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {s.badges.slice(0, 2).map((b, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-stone-100 text-brand-900 text-[10px] font-semibold border border-stone-200 font-mono"
                          >
                            🏆 {b}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="Edit Student Record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-charcoal-900 font-display">
                Update Record: {editingStudent.name}
              </h3>
              <button onClick={() => setEditingStudent(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Batch Cohort Assignment
                </label>
                <input
                  type="text"
                  required
                  value={editForm.batch}
                  onChange={(e) => setEditForm({ ...editForm, batch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none focus:border-brand-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Attendance Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editForm.attendanceRate}
                    onChange={(e) => setEditForm({ ...editForm, attendanceRate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Overall Score (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editForm.overallScore}
                    onChange={(e) => setEditForm({ ...editForm, overallScore: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
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
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

