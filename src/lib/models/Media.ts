import mongoose, { Schema, Document, Model } from 'mongoose';
import { MediaCategory, AspectRatioType } from '@/lib/media/types';

export interface IMedia extends Document {
  title: string;
  alt: string;
  category: MediaCategory;
  url: string;
  caption?: string;
  aspectRatio?: AspectRatioType;
  width?: number;
  height?: number;
  format?: string;
  tags?: string[];
  isUploaded?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    title: {
      type: String,
      required: [true, 'Media title is required'],
      trim: true,
    },
    alt: {
      type: String,
      required: [true, 'Alt text is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['campus', 'classrooms', 'students', 'faculty', 'courses', 'events', 'successStories', 'gallery'],
      index: true,
    },
    url: {
      type: String,
      required: [true, 'Media URL is required'],
      trim: true,
    },
    caption: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: String,
      enum: ['16/9', '4/3', '1/1', '16/10', '3/4', '21/9', 'auto'],
      default: '16/9',
    },
    width: {
      type: Number,
      default: 1200,
    },
    height: {
      type: Number,
      default: 800,
    },
    format: {
      type: String,
      default: 'jpg',
    },
    tags: {
      type: [String],
      default: [],
    },
    isUploaded: {
      type: Boolean,
      default: false,
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

export const MediaModel: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
