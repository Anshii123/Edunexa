import mongoose, { Schema, Document, Model } from 'mongoose';
import { NoticeCategory, NoticeAudience } from '@/types';

export interface INotice extends Document {
  title: string;
  category: NoticeCategory;
  content: string;
  publishDate: string;
  targetAudience: NoticeAudience;
  isPinned: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Academic', 'Exams', 'Events', 'General', 'Urgent'],
      default: 'General',
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Notice content is required'],
    },
    publishDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    targetAudience: {
      type: String,
      enum: ['All', 'Students', 'Faculty', 'Admissions'],
      default: 'All',
      index: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
      index: true,
    },
    author: {
      type: String,
      default: 'Academic Governance Board',
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

export const NoticeModel: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
