import mongoose, { Schema, Document, Model } from 'mongoose';
import { CourseCategory, CourseLevel, DeliveryMode } from '@/types';

export interface ICourse extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  eligibility: string;
  mode: DeliveryMode;
  schedule?: string;
  certification?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  fee: number;
  discountedFee?: number;
  featured: boolean;
  active: boolean;
  thumbnail: string;
  highlights: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string;
  syllabus: Array<{
    term: string;
    title: string;
    weeks: string;
    topics: string[];
  }>;
  facultyIds: string[];
  upcomingBatchDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Course slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Competitive Exams', 'Engineering & IT', 'Medical Sciences', 'Management'],
      index: true,
    },
    level: {
      type: String,
      enum: ['Foundation', 'Intermediate', 'Advanced', 'Comprehensive'],
      default: 'Comprehensive',
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    eligibility: {
      type: String,
      default: 'Standard academic qualifications',
    },
    mode: {
      type: String,
      enum: ['Classroom Immersion', 'Hybrid (Classroom + Live)', '100% Live Interactive Stream', 'Self-Paced Mentored'],
      default: 'Hybrid (Classroom + Live)',
    },
    schedule: {
      type: String,
      default: 'Weekday & Weekend Cohorts Available',
    },
    certification: {
      type: String,
      default: 'EduNexa Certification of Academic Excellence',
    },
    badge: {
      type: String,
      default: 'Flagship Cohort',
    },
    rating: {
      type: Number,
      default: 4.95,
    },
    reviewsCount: {
      type: Number,
      default: 120,
    },
    enrolledCount: {
      type: Number,
      default: 350,
    },
    fee: {
      type: Number,
      required: [true, 'Fee is required'],
      min: [0, 'Fee cannot be negative'],
    },
    discountedFee: {
      type: Number,
      min: [0, 'Discounted fee cannot be negative'],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    thumbnail: {
      type: String,
      default: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    highlights: {
      type: [String],
      default: [],
    },
    learningOutcomes: {
      type: [String],
      default: [],
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: String,
      default: 'Competitive entrance aspirants',
    },
    syllabus: [
      {
        term: { type: String, required: true },
        title: { type: String, required: true },
        weeks: { type: String, required: true },
        topics: { type: [String], default: [] },
      },
    ],
    facultyIds: {
      type: [String],
      default: [],
    },
    upcomingBatchDate: {
      type: String,
      default: '2026-10-01',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret.__v;
        ret.id = ret._id.toString();
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret.__v;
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

export const CourseModel: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
