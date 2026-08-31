import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@/lib/auth/types';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  salt?: string;
  role: UserRole;
  phone?: string;
  status: 'active' | 'suspended' | 'pending';
  profile: {
    avatar?: string;
    batch?: string;
    studentId?: string;
    targetExam?: string;
    bio?: string;
    attendanceRate?: number;
    overallScore?: number;
    badges?: string[];
    enrolledCourses?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false, // Prevents accidental exposure in queries
    },
    salt: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
      default: 'student',
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'pending'],
      default: 'active',
    },
    profile: {
      avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      },
      batch: {
        type: String,
        default: 'Elite Scholars Batch 2026-27',
      },
      studentId: {
        type: String,
        trim: true,
      },
      targetExam: {
        type: String,
        default: 'National Olympiad & Advanced Entrance',
      },
      bio: {
        type: String,
        default: '',
      },
      attendanceRate: {
        type: Number,
        default: 95.0,
      },
      overallScore: {
        type: Number,
        default: 90.0,
      },
      badges: {
        type: [String],
        default: ['Top 1% Diagnostic', 'Merit Scholar'],
      },
      enrolledCourses: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret.passwordHash;
        delete ret.__v;
        ret.id = ret._id.toString();
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret.passwordHash;
        delete ret.__v;
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
