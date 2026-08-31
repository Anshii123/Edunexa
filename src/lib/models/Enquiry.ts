import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  referenceId: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'Pending' | 'Responded' | 'Resolved';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
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
      trim: true,
    },
    subject: {
      type: String,
      default: 'General Campus Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Responded', 'Resolved'],
      default: 'Pending',
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

export const EnquiryModel: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
