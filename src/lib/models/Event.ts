import mongoose, { Schema, Document, Model } from 'mongoose';
import { EventType, DeliveryMode } from '@/types';

export interface IEvent extends Document {
  title: string;
  subtitle?: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  mode: 'In-Person' | 'Online Live';
  speakers: string[];
  registrationUrl?: string;
  seatsLeft: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['Masterclass', 'Workshop', 'Open House', 'Scholarship Test', 'Webinar'],
      default: 'Masterclass',
      index: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      index: true,
    },
    time: {
      type: String,
      default: '10:00 AM – 1:00 PM EST',
    },
    location: {
      type: String,
      default: 'Main Innovation Amphitheater',
    },
    mode: {
      type: String,
      enum: ['In-Person', 'Online Live'],
      default: 'In-Person',
    },
    speakers: {
      type: [String],
      default: ['EduNexa Senior Faculty'],
    },
    registrationUrl: {
      type: String,
      default: '/admissions',
    },
    seatsLeft: {
      type: Number,
      default: 50,
      min: [0, 'Seats cannot be negative'],
    },
    thumbnail: {
      type: String,
      default: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
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

export const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
