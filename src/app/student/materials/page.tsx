'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  PlayCircle, 
  CheckCircle2
} from 'lucide-react';
import { StudyMaterial } from '@/types';

const TYPE_FILTERS = ['All', 'PDF Notes', 'Lecture Video', 'Assignment Sheet', 'Practice Test'];

export default function StudentMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadMaterials() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedType !== 'All') queryParams.set('type', selectedType);
        if (searchQuery.trim()) queryParams.set('q', searchQuery.trim());

        const res = await fetch(`/api/student/materials?${queryParams.toString()}`);
        const json = await res.json();
        if (json.success) {
          setMaterials(json.data);
        }
      } catch (err) {
        console.error('Failed to load materials', err);
      } finally {
        setLoading(false);
      }
    }
    loadMaterials();
  }, [selectedType, searchQuery]);

  const handleDownload = (mat: StudyMaterial) => {
    setDownloadSuccess(`Opened resource: "${mat.title}"`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <FileText className="w-3.5 h-3.5 text-brand-800" />
          <span>Digital Library & Study Kit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Study Materials & Resources
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Access high-resolution lecture notes, Olympiad problem archives, assignment sheets, and video masterclasses.
        </p>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem banks, lecture slides, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800"
            />
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-stone-100">
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List / Grid */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-stone-200" />
          ))}
        </div>
      ) : materials.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-stone-200 text-center space-y-3 shadow-card">
          <FileText className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-charcoal-900 font-display">No Materials Found</h3>
          <p className="text-xs text-stone-500">
            No study materials matched your search query or filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 hover:border-brand-800 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-brand-900 shrink-0 group-hover:scale-105 transition-transform">
                  {mat.type === 'Lecture Video' ? (
                    <PlayCircle className="w-6 h-6 text-brand-800" />
                  ) : (
                    <FileText className="w-6 h-6 text-brand-800" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-brand-900 text-[10px] font-semibold border border-stone-200 font-mono">
                      {mat.type}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {mat.courseTitle}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-charcoal-900 font-display leading-snug">
                    {mat.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                    <span>Size: {mat.fileSize || mat.duration}</span>
                    <span>•</span>
                    <span>Uploaded: {mat.uploadDate}</span>
                    <span>•</span>
                    <span>{mat.downloadsCount} scholar downloads</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <button
                  onClick={() => handleDownload(mat)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

