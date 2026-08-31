import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/storage';
import { EduImage } from '@/components/ui/EduImage';
import { FacultyPortrait } from '@/components/media/FacultyPortrait';
import { CourseCard } from '@/components/public/CourseCard';
import { LeadForm } from '@/components/public/LeadForm';
import { formatCurrency } from '@/lib/utils';
import {
  BookOpen,
  Clock,
  Calendar,
  Star,
  Users,
  Award,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileText,
  Layers,
  GraduationCap,
  ArrowRight,
  Mail,
} from 'lucide-react';

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = db.getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Program Not Found | EduNexa',
      description: 'The requested educational program could not be located in our academic directory.',
    };
  }

  return {
    title: `${course.title} | EduNexa Academic Institute`,
    description: course.shortDescription || course.subtitle,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnail],
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = db.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const assignedFaculty = db.getFacultyByIds(course.facultyIds);
  const relatedCourses = db
    .getCourses()
    .filter((c) => c.id !== course.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-charcoal-900 transition-colors font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/courses" className="hover:text-charcoal-900 transition-colors font-medium">
            Courses & Programs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-charcoal-900 font-semibold truncate max-w-xs sm:max-w-md">
            {course.title}
          </span>
        </nav>

        {/* Hero Header Card */}
        <div className="bg-[#F4F1EA] rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-card space-y-6 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-800 text-xs font-semibold">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-3 py-1 rounded-md bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                {course.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-md bg-stone-200/80 text-stone-700 text-xs font-medium">
              {course.level} Level
            </span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 font-display leading-[1.14] tracking-tight">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              {course.subtitle}
            </p>
          </div>

          {/* Key Metric Chips */}
          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs sm:text-sm text-stone-700 border-t border-stone-200/80">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{course.rating}</span>
              <span className="text-stone-500 font-normal">({course.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-800" />
              <span><strong className="text-charcoal-900">{course.enrolledCount.toLocaleString()}</strong> Scholars Enrolled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-800" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Next Batch: <strong className="text-charcoal-900">{course.upcomingBatchDate}</strong></span>
            </div>
          </div>
        </div>

        {/* 2-Column Main Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (8 cols): Deep Course Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-card bg-white">
              <EduImage
                src={course.thumbnail}
                alt={course.title}
                aspectRatio="16/9"
                priority
              />
            </div>

            {/* 1. Course Overview & Full Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                <BookOpen className="w-5 h-5 text-brand-800" /> Program Overview
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                {course.fullDescription || course.shortDescription}
              </p>
            </div>

            {/* 2. Key Program Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-4">
              <h3 className="text-lg font-bold text-charcoal-900 font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" /> What Distinguishes This Cohort
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {course.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                  <Award className="w-5 h-5 text-brand-800" /> Key Learning Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-card space-y-2"
                    >
                      <span className="text-xs font-mono font-bold text-brand-800">
                        Outcome 0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Curriculum & Syllabus Breakdown */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                    <Layers className="w-5 h-5 text-brand-800" /> Structured Curriculum Roadmap
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Multi-volume syllabus deconstructed into structured milestone modules.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-700 bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                  {course.syllabus.length} Core Modules
                </span>
              </div>

              <div className="space-y-4">
                {course.syllabus.map((module, idx) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card space-y-4 hover:shadow-card-hover transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-stone-100 text-brand-900 font-mono font-bold text-xs flex items-center justify-center border border-stone-200">
                          0{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-charcoal-900 font-display">
                          {module.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                        <span>{module.duration}</span>
                        <span>•</span>
                        <span>{module.lessonsCount} Master Lectures</span>
                      </div>
                    </div>

                    {/* Topic Bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {module.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2 text-xs text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-800 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Eligibility & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card space-y-3">
                <h4 className="text-base font-bold text-charcoal-900 font-display flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Eligibility Criteria
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {course.eligibility || 'Open to ambitious high-school and undergraduate scholars with prerequisite STEM foundations.'}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card space-y-3">
                <h4 className="text-base font-bold text-charcoal-900 font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" /> Schedule & Delivery Mode
                </h4>
                <div className="space-y-1 text-xs sm:text-sm text-stone-600">
                  <p><strong>Mode:</strong> {course.mode}</p>
                  <p><strong>Timing:</strong> {course.schedule || 'Flexible live weekday evenings and weekend simulations.'}</p>
                </div>
              </div>
            </div>

            {/* 6. Faculty Instructors */}
            {assignedFaculty.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-charcoal-900 font-display flex items-center gap-2 tracking-tight">
                  <GraduationCap className="w-5 h-5 text-brand-800" /> Faculty Deans & Lead Instructors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {assignedFaculty.map((prof) => (
                    <div
                      key={prof.id}
                      className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-card flex items-start gap-4"
                    >
                      <FacultyPortrait
                        src={prof.avatar}
                        name={prof.name}
                        rating={prof.rating}
                        size="md"
                      />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-charcoal-900 font-display">{prof.name}</h4>
                        <div className="text-xs font-semibold text-brand-800 font-mono">{prof.title}</div>
                        <div className="text-[11px] text-stone-500">{prof.qualifications}</div>
                        <div className="pt-2 text-xs text-stone-500">
                          <a
                            href={`mailto:${prof.email}`}
                            className="text-brand-900 hover:text-brand-700 font-semibold inline-flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" /> Contact Dean
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Enrollment & Enquiry Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Fee & Enrollment Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-card space-y-6">
                <div>
                  <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider font-mono">
                    Total Program Tuition
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display">
                      {course.discountedFee ? formatCurrency(course.discountedFee) : formatCurrency(course.fee)}
                    </span>
                    {course.discountedFee && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatCurrency(course.fee)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1 font-semibold">
                    ✓ Up to 100% scholarship fee waiver available via NSTHE assessment
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <Link
                    href={`/admissions?course=${encodeURIComponent(course.title)}`}
                    className="w-full py-3.5 px-4 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 text-white text-xs shadow-sm flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="w-full py-3 px-4 rounded-xl font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs flex items-center justify-center transition-colors border border-stone-200"
                  >
                    Take Scholarship Test (NSTHE)
                  </Link>
                </div>

                {/* What's Included */}
                <div className="space-y-2.5 pt-3 border-t border-stone-100 text-xs text-stone-600">
                  <div className="font-bold text-charcoal-900 uppercase text-[11px] tracking-wider mb-2 font-mono">
                    Included with Enrollment:
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complete 40-volume physical kit shipped to address</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>24/7 access to LMS recordings and video solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Daily 1-on-1 twilight doubt resolution desks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Weekly proctored all-India mock test series</span>
                  </div>
                </div>
              </div>

              {/* Quick Course Enquiry Card */}
              <div className="bg-[#F4F1EA] rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-card space-y-4">
                <div>
                  <h4 className="text-base font-bold text-charcoal-900 font-display">
                    Course Enquiry & Counseling
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Have questions regarding batch schedules or fees? Request a counselor callback.
                  </p>
                </div>
                <LeadForm defaultCourse={course.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Programs Section */}
        {relatedCourses.length > 0 && (
          <div className="pt-16 border-t border-stone-200/80 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-charcoal-900 font-display tracking-tight">
                  Explore Other Flagship Programs
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Discover complementary coaching tracks and competitive entrance preparations.
                </p>
              </div>
              <Link
                href="/courses"
                className="text-xs font-bold text-brand-900 hover:text-brand-700 flex items-center gap-1 group"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCourses.map((rc) => (
                <CourseCard key={rc.id} course={rc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

