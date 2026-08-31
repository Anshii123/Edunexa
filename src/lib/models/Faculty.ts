import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaculty extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Designation title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      index: true,
    },
    qualifications: {
      type: String,
      default: 'Distinguished Scholar',
    },
    experienceYears: {
      type: Number,
      default: 5,
      min: [0, 'Experience cannot be negative'],
    },
    specialization: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    studentsMentored: {
      type: Number,
      default: 500,
    },
    email: {
      type: String,
      required: [true, 'Faculty email is required'],
      lowercase: true,
      trim: true,
      index: true,
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

export const FacultyModel: Model<IFaculty> =
  mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
