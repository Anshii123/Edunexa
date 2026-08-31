import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmission extends Document {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  targetCourseId: string;
  targetCourseTitle: string;
  city: string;
  preferredMode: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Counselling Scheduled' | 'Enrolled' | 'Closed';
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    targetCourseId: {
      type: String,
      required: [true, 'Target course ID is required'],
    },
    targetCourseTitle: {
      type: String,
      required: [true, 'Target course title is required'],
    },
    city: {
      type: String,
      default: 'Online / Remote',
    },
    preferredMode: {
      type: String,
      default: 'Hybrid (Classroom + Live)',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Counselling Scheduled', 'Enrolled', 'Closed'],
      default: 'New',
      index: true,
    },
    source: {
      type: String,
      default: 'website_admissions',
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

export const AdmissionModel: Model<IAdmission> =
  mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);
