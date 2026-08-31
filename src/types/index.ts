export type UserRole = 'guest' | 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface StudentProfile extends User {
  studentId: string;
  batch: string;
  phone: string;
  guardianName?: string;
  enrolledCourseIds: string[];
  attendanceRate: number;
  overallScore: number;
  badges: string[];
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  qualifications: string;
  experienceYears: number;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  studentsMentored: number;
  email: string;
}

export interface CourseModule {
  id?: string;
  term?: string;
  title: string;
  duration?: string;
  weeks?: string;
  lessonsCount?: number;
  topics: string[];
}

export type CourseCategory = 'Competitive Exams' | 'Engineering & IT' | 'Medical Sciences' | 'Management' | 'Foundations';
export type CourseLevel = 'Foundation' | 'Intermediate' | 'Advanced' | 'Comprehensive';
export type DeliveryMode = 'Hybrid (Classroom + Live)' | 'Classroom Intensive' | 'Live Interactive Online' | 'Classroom Immersion' | '100% Live Interactive Stream' | 'Self-Paced Mentored';

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  eligibility: string;
  mode: DeliveryMode;
  schedule: string;
  certification: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  fee: number;
  discountedFee?: number;
  featured: boolean;
  active: boolean;
  thumbnail: string;
  description?: string; // backwards compatibility alias for shortDescription
  highlights: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string;
  syllabus: CourseModule[];
  facultyIds: string[];
  upcomingBatchDate: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Counselling Scheduled' | 'Enrolled' | 'Closed';

export interface AdmissionLead {
  id: string;
  referenceId?: string;
  inquiryType?: 'Admission Application' | 'Course Enquiry' | 'Scholarship Test' | 'Contact Message';
  name: string;
  email: string;
  phone: string;
  targetCourseId: string;
  targetCourseTitle: string;
  currentEducation: string;
  city: string;
  preferredMode: 'Classroom' | 'Online' | 'Hybrid';
  message?: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string[];
}

export interface StudyMaterial {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  type: 'PDF Notes' | 'Lecture Video' | 'Assignment Sheet' | 'Practice Test';
  fileSize?: string;
  duration?: string;
  url: string;
  uploadDate: string;
  downloadsCount: number;
  isLocked?: boolean;
}

export type NoticeCategory = 'Academic' | 'Exams' | 'Events' | 'Urgent' | 'General';
export type NoticeAudience = 'All' | 'Students' | 'Faculty' | 'Admissions';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  targetAudience: NoticeAudience;
  publishDate: string;
  isPinned?: boolean;
  author: string;
}

export type EventType = 'Masterclass' | 'Workshop' | 'Open House' | 'Scholarship Test' | 'Webinar';

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  mode: 'In-Person' | 'Online Live';
  speakers: string[];
  registrationUrl: string;
  seatsLeft: number;
  thumbnail: string;
}

export interface ResultStory {
  id: string;
  studentName: string;
  examOrGoal: string;
  rankOrScore: string;
  year: string;
  courseTaken: string;
  quote: string;
  avatar: string;
  instituteAdmittedTo?: string;
}

export interface InstituteMetrics {
  totalStudents: number;
  activeCourses: number;
  expertFaculty: number;
  selectionRatePercent: number;
  scholarshipsGranted: string;
  alumniPlaced: number;
  averageRating: number;
  newLeadsToday: number;
}
