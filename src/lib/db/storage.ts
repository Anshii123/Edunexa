import { Course, Faculty, AdmissionLead, Notice, EventItem, ResultStory, StudentProfile, StudyMaterial, InstituteMetrics } from '@/types';
import { SEED_COURSES, SEED_FACULTY, SEED_LEADS, SEED_NOTICES, SEED_EVENTS, SEED_RESULTS, SEED_STUDENTS, SEED_MATERIALS } from './seed';

// Pluggable repository layer with persistent in-memory fallback
class DataStore {
  private courses: Course[] = [...SEED_COURSES];
  private faculty: Faculty[] = [...SEED_FACULTY];
  private leads: AdmissionLead[] = [...SEED_LEADS];
  private notices: Notice[] = [...SEED_NOTICES];
  private events: EventItem[] = [...SEED_EVENTS];
  private results: ResultStory[] = [...SEED_RESULTS];
  private students: StudentProfile[] = [...SEED_STUDENTS];
  private materials: StudyMaterial[] = [...SEED_MATERIALS];
  private customMetrics: Partial<InstituteMetrics> = {};

  constructor() {
    this.reloadSeed();
  }

  reloadSeed() {
    this.courses = [...SEED_COURSES];
    this.faculty = [...SEED_FACULTY];
    this.leads = [...SEED_LEADS];
    this.notices = [...SEED_NOTICES];
    this.events = [...SEED_EVENTS];
    this.results = [...SEED_RESULTS];
    this.students = [...SEED_STUDENTS];
    this.materials = [...SEED_MATERIALS];
  }

  // --- COURSES CRUD ---
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.courses.find(
      c => c.slug === slug || c.id === slug || c.slug.toLowerCase() === slug.toLowerCase()
    );
  }

  getCoursesByCategory(category: string): Course[] {
    if (!category || category === 'All') return this.courses;
    return this.courses.filter(c => c.category === category);
  }

  getFeaturedCourses(): Course[] {
    return this.courses.filter(c => c.featured && c.active);
  }

  addCourse(course: Omit<Course, 'id'>): Course {
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`,
    };
    this.courses.unshift(newCourse);
    return newCourse;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.courses[idx] = { ...this.courses[idx], ...updates };
    return this.courses[idx];
  }

  deleteCourse(id: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter(c => c.id !== id);
    return this.courses.length < initialLen;
  }

  // --- FACULTY CRUD ---
  getFaculty(): Faculty[] {
    return this.faculty;
  }

  getFacultyById(id: string): Faculty | undefined {
    return this.faculty.find(f => f.id === id);
  }

  getFacultyByIds(ids: string[]): Faculty[] {
    return this.faculty.filter(f => ids.includes(f.id));
  }

  addFaculty(facultyData: Omit<Faculty, 'id'>): Faculty {
    const newFac: Faculty = {
      ...facultyData,
      id: `fac-${Date.now()}`,
    };
    this.faculty.push(newFac);
    return newFac;
  }

  updateFaculty(id: string, updates: Partial<Faculty>): Faculty | null {
    const idx = this.faculty.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.faculty[idx] = { ...this.faculty[idx], ...updates };
    return this.faculty[idx];
  }

  deleteFaculty(id: string): boolean {
    const initialLen = this.faculty.length;
    this.faculty = this.faculty.filter(f => f.id !== id);
    return this.faculty.length < initialLen;
  }

  // --- ADMISSIONS & LEADS CRUD ---
  getLeads(): AdmissionLead[] {
    return this.leads;
  }

  getLeadById(id: string): AdmissionLead | undefined {
    return this.leads.find(l => l.id === id || l.referenceId === id);
  }

  findRecentLead(email: string, phone: string, courseTitle?: string): AdmissionLead | undefined {
    const cutoff = Date.now() - 5 * 60 * 1000;
    return this.leads.find(l => {
      const leadTime = new Date(l.createdAt).getTime();
      if (leadTime < cutoff) return false;
      const sameEmail = l.email.toLowerCase() === email.toLowerCase();
      const samePhone = l.phone.replace(/\D/g, '') === phone.replace(/\D/g, '');
      const sameCourse = !courseTitle || l.targetCourseTitle.toLowerCase() === courseTitle.toLowerCase();
      return (sameEmail || samePhone) && sameCourse;
    });
  }

  addLead(leadData: Omit<AdmissionLead, 'id' | 'createdAt' | 'status' | 'referenceId'> & { referenceId?: string }): AdmissionLead {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = leadData.inquiryType === 'Contact Message' ? 'CNT' : 'ADM';
    const referenceId = leadData.referenceId || `EDN-${prefix}-${randomCode}`;

    const newLead: AdmissionLead = {
      ...leadData,
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      referenceId,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  updateLeadStatus(id: string, status: AdmissionLead['status']): AdmissionLead | null {
    const lead = this.leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      return { ...lead };
    }
    return null;
  }

  deleteLead(id: string): boolean {
    const initialLen = this.leads.length;
    this.leads = this.leads.filter(l => l.id !== id);
    return this.leads.length < initialLen;
  }

  // --- NOTICES CRUD ---
  getNotices(): Notice[] {
    return this.notices;
  }

  getNoticeById(id: string): Notice | undefined {
    return this.notices.find(n => n.id === id);
  }

  addNotice(noticeData: Omit<Notice, 'id' | 'publishDate'>): Notice {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0],
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }

  updateNotice(id: string, updates: Partial<Notice>): Notice | null {
    const idx = this.notices.findIndex(n => n.id === id);
    if (idx === -1) return null;
    this.notices[idx] = { ...this.notices[idx], ...updates };
    return this.notices[idx];
  }

  deleteNotice(id: string): boolean {
    const initialLen = this.notices.length;
    this.notices = this.notices.filter(n => n.id !== id);
    return this.notices.length < initialLen;
  }

  // --- EVENTS CRUD ---
  getEvents(): EventItem[] {
    return this.events;
  }

  getEventById(id: string): EventItem | undefined {
    return this.events.find(e => e.id === id);
  }

  addEvent(eventData: Omit<EventItem, 'id'>): EventItem {
    const newEvent: EventItem = {
      ...eventData,
      id: `ev-${Date.now()}`,
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<EventItem>): EventItem | null {
    const idx = this.events.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.events[idx] = { ...this.events[idx], ...updates };
    return this.events[idx];
  }

  deleteEvent(id: string): boolean {
    const initialLen = this.events.length;
    this.events = this.events.filter(e => e.id !== id);
    return this.events.length < initialLen;
  }

  // --- STUDENTS CRUD ---
  getStudents(): StudentProfile[] {
    return this.students;
  }

  getDemoStudent(): StudentProfile {
    return this.students[0];
  }

  addStudent(studentData: Omit<StudentProfile, 'id' | 'createdAt'>): StudentProfile {
    const newStudent: StudentProfile = {
      ...studentData,
      id: `stu-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.students.unshift(newStudent);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<StudentProfile>): StudentProfile | null {
    const idx = this.students.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.students[idx] = { ...this.students[idx], ...updates };
    return this.students[idx];
  }

  getStudentMaterials(courseIds?: string[]): StudyMaterial[] {
    if (!courseIds || courseIds.length === 0) return this.materials;
    return this.materials.filter(m => courseIds.includes(m.courseId));
  }

  // --- RESULTS & METRICS ---
  getResults(): ResultStory[] {
    return this.results;
  }

  getMetrics(): InstituteMetrics {
    return {
      totalStudents: 3450,
      activeCourses: this.courses.length,
      expertFaculty: this.faculty.length,
      selectionRatePercent: 98.4,
      scholarshipsGranted: '$1.4M+',
      alumniPlaced: 2800,
      averageRating: 4.92,
      newLeadsToday: this.leads.length,
      ...this.customMetrics,
    };
  }

  updateMetrics(metrics: Partial<InstituteMetrics>) {
    this.customMetrics = { ...this.customMetrics, ...metrics };
  }
}

// Global instance
export const db = new DataStore();
