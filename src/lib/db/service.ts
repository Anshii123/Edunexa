import mongoose from 'mongoose';
import { connectToDatabase, isDbConnected } from './mongodb';
import { 
  UserModel, 
  CourseModel, 
  FacultyModel, 
  AdmissionModel, 
  EnquiryModel, 
  NoticeModel, 
  EventModel, 
  MediaModel 
} from '@/lib/models';
import { db as inMemoryDb } from './storage';
import { Course, Faculty, AdmissionLead, Notice, EventItem } from '@/types';
import { MediaAsset, MediaCategory } from '@/lib/media/types';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class EduNexaDatabaseService {
  private static instance: EduNexaDatabaseService;

  public static getInstance(): EduNexaDatabaseService {
    if (!EduNexaDatabaseService.instance) {
      EduNexaDatabaseService.instance = new EduNexaDatabaseService();
    }
    return EduNexaDatabaseService.instance;
  }

  // ==========================================
  // COURSES CRUD
  // ==========================================
  public async getCourses(params?: {
    category?: string;
    level?: string;
    search?: string;
    activeOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<Course>> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 50));
    const skip = (page - 1) * limit;

    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const query: any = {};
        if (params?.activeOnly) query.active = true;
        if (params?.category && params.category !== 'All') query.category = params.category;
        if (params?.level && params.level !== 'All') query.level = params.level;
        if (params?.search && params.search.trim()) {
          query.$or = [
            { title: { $regex: params.search.trim(), $options: 'i' } },
            { shortDescription: { $regex: params.search.trim(), $options: 'i' } },
          ];
        }

        const total = await CourseModel.countDocuments(query);
        const docs = await CourseModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean();

        const data = docs.map((d: any) => ({
          ...d,
          id: d._id.toString(),
          _id: d._id.toString(),
        })) as unknown as Course[];

        return {
          data,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
          },
        };
      } catch (err) {
        console.warn('MongoDB query fallback for courses:', err);
      }
    }

    // Fallback in-memory if DB disconnected
    let courses = inMemoryDb.getCourses();
    if (params?.activeOnly) courses = courses.filter((c) => c.active);
    if (params?.category && params.category !== 'All') courses = courses.filter((c) => c.category === params.category);
    if (params?.level && params.level !== 'All') courses = courses.filter((c) => c.level === params.level);
    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.shortDescription || c.description || '').toLowerCase().includes(q)
      );
    }

    const total = courses.length;
    const paginated = courses.slice(skip, skip + limit);
    return {
      data: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  public async getCourseBySlug(slug: string): Promise<Course | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const query = mongoose.Types.ObjectId.isValid(slug) 
          ? { $or: [{ _id: slug }, { slug: slug.toLowerCase() }] }
          : { slug: slug.toLowerCase() };
          
        const doc = await CourseModel.findOne(query).lean();
        if (doc) return { ...doc, id: (doc as any)._id.toString(), _id: (doc as any)._id.toString() } as unknown as Course;
      } catch (err) {
        console.warn('MongoDB fallback for slug lookup:', err);
      }
    }
    return inMemoryDb.getCourseBySlug(slug) || null;
  }

  public async createCourse(data: Partial<Course>): Promise<Course> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const payload = { ...data };
        delete (payload as any).id;
        delete (payload as any)._id;

        const created = await CourseModel.create(payload);
        const json = created.toJSON();
        return { ...json, id: created._id.toString(), _id: created._id.toString() } as unknown as Course;
      } catch (err) {
        console.warn('MongoDB course create notice:', err);
      }
    }
    return inMemoryDb.addCourse(data as any);
  }

  public async updateCourse(id: string, data: Partial<Course>): Promise<Course | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const updateData = { ...data };
        delete (updateData as any).id;
        delete (updateData as any)._id;

        let updatedDoc = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedDoc = await CourseModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).lean();
        } else {
          updatedDoc = await CourseModel.findOneAndUpdate({ slug: id }, { $set: updateData }, { new: true, runValidators: true }).lean();
        }

        if (updatedDoc) {
          return { ...updatedDoc, id: (updatedDoc as any)._id.toString(), _id: (updatedDoc as any)._id.toString() } as unknown as Course;
        }
      } catch (err) {
        console.warn('MongoDB course update notice:', err);
      }
    }
    return inMemoryDb.updateCourse(id, data);
  }

  public async deleteCourse(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        let deleted = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          deleted = await CourseModel.findByIdAndDelete(id);
        } else {
          deleted = await CourseModel.findOneAndDelete({ slug: id });
        }
        return Boolean(deleted);
      } catch (err) {
        console.warn('MongoDB course delete notice:', err);
      }
    }
    return inMemoryDb.deleteCourse(id);
  }

  // ==========================================
  // FACULTY CRUD
  // ==========================================
  public async getFaculty(): Promise<Faculty[]> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const docs = await FacultyModel.find().sort({ createdAt: -1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString(), _id: d._id.toString() })) as unknown as Faculty[];
      } catch (err) {
        console.warn('MongoDB faculty fetch fallback:', err);
      }
    }
    return inMemoryDb.getFaculty();
  }

  public async createFaculty(data: Partial<Faculty>): Promise<Faculty> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const payload = { ...data };
        delete (payload as any).id;
        delete (payload as any)._id;
        const created = await FacultyModel.create(payload);
        const json = created.toJSON();
        return { ...json, id: created._id.toString(), _id: created._id.toString() } as unknown as Faculty;
      } catch (err) {
        console.warn('MongoDB faculty create notice:', err);
      }
    }
    return inMemoryDb.addFaculty(data as any);
  }

  public async updateFaculty(id: string, data: Partial<Faculty>): Promise<Faculty | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const updateData = { ...data };
        delete (updateData as any).id;
        delete (updateData as any)._id;

        if (mongoose.Types.ObjectId.isValid(id)) {
          const updatedDoc = await FacultyModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
          if (updatedDoc) {
            return { ...updatedDoc, id: (updatedDoc as any)._id.toString(), _id: (updatedDoc as any)._id.toString() } as unknown as Faculty;
          }
        }
      } catch (err) {
        console.warn('MongoDB faculty update notice:', err);
      }
    }
    return inMemoryDb.updateFaculty(id, data);
  }

  public async deleteFaculty(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await FacultyModel.findByIdAndDelete(id);
          return Boolean(res);
        }
      } catch (err) {
        console.warn('MongoDB faculty delete notice:', err);
      }
    }
    return inMemoryDb.deleteFaculty(id);
  }

  // ==========================================
  // ADMISSIONS CRUD
  // ==========================================
  public async getAdmissions(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<AdmissionLead>> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 50));
    const skip = (page - 1) * limit;

    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const query: any = {};
        if (params?.status && params.status !== 'All') query.status = params.status;
        if (params?.search && params.search.trim()) {
          query.$or = [
            { name: { $regex: params.search.trim(), $options: 'i' } },
            { email: { $regex: params.search.trim(), $options: 'i' } },
            { phone: { $regex: params.search.trim(), $options: 'i' } },
            { referenceId: { $regex: params.search.trim(), $options: 'i' } },
            { targetCourseTitle: { $regex: params.search.trim(), $options: 'i' } },
          ];
        }

        const total = await AdmissionModel.countDocuments(query);
        const docs = await AdmissionModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        const data = docs.map((d: any) => ({ ...d, id: d._id.toString(), _id: d._id.toString() })) as unknown as AdmissionLead[];
        return {
          data,
          pagination: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
        };
      } catch (err) {
        console.warn('MongoDB admissions query fallback:', err);
      }
    }

    let leads = inMemoryDb.getLeads();
    if (params?.status && params.status !== 'All') leads = leads.filter((l) => l.status === params.status);
    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.targetCourseTitle.toLowerCase().includes(q) ||
          (l.referenceId && l.referenceId.toLowerCase().includes(q))
      );
    }

    const total = leads.length;
    const paginated = leads.slice(skip, skip + limit);
    return {
      data: paginated,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
    };
  }

  public async createAdmission(data: Partial<AdmissionLead>): Promise<AdmissionLead> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        const prefix = data.inquiryType === 'Contact Message' ? 'CNT' : 'ADM';
        const referenceId = data.referenceId || `EDN-${prefix}-${randomCode}`;

        const payload = {
          ...data,
          referenceId,
          status: data.status || 'New',
        };
        delete (payload as any).id;
        delete (payload as any)._id;

        const created = await AdmissionModel.create(payload);
        const json = created.toJSON();
        return { ...json, id: created._id.toString(), _id: created._id.toString() } as unknown as AdmissionLead;
      } catch (err) {
        console.warn('MongoDB admission create notice:', err);
      }
    }
    return inMemoryDb.addLead(data as any);
  }

  public async updateAdmissionStatus(id: string, status: AdmissionLead['status']): Promise<AdmissionLead | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        let updatedDoc = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedDoc = await AdmissionModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();
        } else {
          updatedDoc = await AdmissionModel.findOneAndUpdate({ referenceId: id }, { $set: { status } }, { new: true }).lean();
        }

        if (updatedDoc) {
          return { ...updatedDoc, id: (updatedDoc as any)._id.toString(), _id: (updatedDoc as any)._id.toString() } as unknown as AdmissionLead;
        }
      } catch (err) {
        console.warn('MongoDB admission status update notice:', err);
      }
    }
    return inMemoryDb.updateLeadStatus(id, status);
  }

  public async deleteAdmission(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        let deleted = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          deleted = await AdmissionModel.findByIdAndDelete(id);
        } else {
          deleted = await AdmissionModel.findOneAndDelete({ referenceId: id });
        }
        return Boolean(deleted);
      } catch (err) {
        console.warn('MongoDB admission delete notice:', err);
      }
    }
    return inMemoryDb.deleteLead(id);
  }

  // ==========================================
  // ENQUIRIES CRUD
  // ==========================================
  public async createEnquiry(data: { name: string; email: string; phone?: string; subject?: string; message: string }) {
    const referenceId = `EDN-CNT-${Math.floor(100000 + Math.random() * 900000)}`;
    const payload = { ...data, referenceId, status: 'Pending' as const };

    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const created = await EnquiryModel.create(payload);
        return { ...created.toJSON(), id: created._id.toString() };
      } catch (err) {
        console.warn('MongoDB enquiry create notice:', err);
      }
    }
    return payload;
  }

  public async getEnquiries(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 50));
    const skip = (page - 1) * limit;

    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const query: any = {};
        if (params?.status && params.status !== 'All') query.status = params.status;
        if (params?.search && params.search.trim()) {
          query.$or = [
            { name: { $regex: params.search.trim(), $options: 'i' } },
            { email: { $regex: params.search.trim(), $options: 'i' } },
            { referenceId: { $regex: params.search.trim(), $options: 'i' } },
          ];
        }

        const total = await EnquiryModel.countDocuments(query);
        const docs = await EnquiryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        const data = docs.map((d: any) => ({ ...d, id: d._id.toString() }));
        return { data, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 } };
      } catch (err) {
        console.warn('MongoDB enquiries query fallback:', err);
      }
    }

    return { data: [], pagination: { total: 0, page, limit, totalPages: 1 } };
  }

  // ==========================================
  // NOTICES CRUD
  // ==========================================
  public async getNotices(): Promise<Notice[]> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const docs = await NoticeModel.find().sort({ pinned: -1, createdAt: -1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString(), _id: d._id.toString() })) as unknown as Notice[];
      } catch (err) {
        console.warn('MongoDB notices fetch fallback:', err);
      }
    }
    return inMemoryDb.getNotices();
  }

  public async createNotice(data: Partial<Notice>): Promise<Notice> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const payload = { ...data };
        delete (payload as any).id;
        delete (payload as any)._id;

        const created = await NoticeModel.create(payload);
        const json = created.toJSON();
        return { ...json, id: created._id.toString(), _id: created._id.toString() } as unknown as Notice;
      } catch (err) {
        console.warn('MongoDB notice create notice:', err);
      }
    }
    return inMemoryDb.addNotice(data as any);
  }

  public async updateNotice(id: string, data: Partial<Notice>): Promise<Notice | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const updateData = { ...data };
        delete (updateData as any).id;
        delete (updateData as any)._id;

        if (mongoose.Types.ObjectId.isValid(id)) {
          const updatedDoc = await NoticeModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
          if (updatedDoc) {
            return { ...updatedDoc, id: (updatedDoc as any)._id.toString(), _id: (updatedDoc as any)._id.toString() } as unknown as Notice;
          }
        }
      } catch (err) {
        console.warn('MongoDB notice update notice:', err);
      }
    }
    return inMemoryDb.updateNotice(id, data);
  }

  public async deleteNotice(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await NoticeModel.findByIdAndDelete(id);
          return Boolean(res);
        }
      } catch (err) {
        console.warn('MongoDB notice delete notice:', err);
      }
    }
    return inMemoryDb.deleteNotice(id);
  }

  // ==========================================
  // EVENTS CRUD
  // ==========================================
  public async getEvents(): Promise<EventItem[]> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const docs = await EventModel.find().sort({ date: 1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString(), _id: d._id.toString() })) as unknown as EventItem[];
      } catch (err) {
        console.warn('MongoDB events fetch fallback:', err);
      }
    }
    return inMemoryDb.getEvents();
  }

  public async createEvent(data: Partial<EventItem>): Promise<EventItem> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const payload = { ...data };
        delete (payload as any).id;
        delete (payload as any)._id;

        const created = await EventModel.create(payload);
        const json = created.toJSON();
        return { ...json, id: created._id.toString(), _id: created._id.toString() } as unknown as EventItem;
      } catch (err) {
        console.warn('MongoDB event create notice:', err);
      }
    }
    return inMemoryDb.addEvent(data as any);
  }

  public async updateEvent(id: string, data: Partial<EventItem>): Promise<EventItem | null> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const updateData = { ...data };
        delete (updateData as any).id;
        delete (updateData as any)._id;

        if (mongoose.Types.ObjectId.isValid(id)) {
          const updatedDoc = await EventModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
          if (updatedDoc) {
            return { ...updatedDoc, id: (updatedDoc as any)._id.toString(), _id: (updatedDoc as any)._id.toString() } as unknown as EventItem;
          }
        }
      } catch (err) {
        console.warn('MongoDB event update notice:', err);
      }
    }
    return inMemoryDb.updateEvent(id, data);
  }

  public async deleteEvent(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await EventModel.findByIdAndDelete(id);
          return Boolean(res);
        }
      } catch (err) {
        console.warn('MongoDB event delete notice:', err);
      }
    }
    return inMemoryDb.deleteEvent(id);
  }

  // ==========================================
  // MEDIA CRUD
  // ==========================================
  public async getMedia(params?: { category?: MediaCategory; page?: number; limit?: number }) {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const query: any = {};
        if (params?.category && (params.category as any) !== 'All') query.category = params.category;
        const docs = await MediaModel.find(query).sort({ createdAt: -1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString(), _id: d._id.toString() })) as MediaAsset[];
      } catch (err) {
        console.warn('MongoDB media fetch fallback:', err);
      }
    }
    return [];
  }

  public async createMedia(data: Partial<MediaAsset>): Promise<MediaAsset> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        const payload = { ...data };
        delete (payload as any).id;
        delete (payload as any)._id;

        const created = await MediaModel.create(payload);
        return { ...created.toJSON(), id: created._id.toString(), _id: created._id.toString() } as unknown as MediaAsset;
      } catch (err) {
        console.warn('MongoDB media create notice:', err);
      }
    }
    return {
      id: `media-${Date.now()}`,
      title: data.title || '',
      alt: data.alt || '',
      category: data.category || 'campus',
      url: data.url || '',
      aspectRatio: data.aspectRatio || '16/9',
    };
  }

  public async deleteMedia(id: string): Promise<boolean> {
    const conn = await connectToDatabase();
    if (conn && isDbConnected()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await MediaModel.findByIdAndDelete(id);
          return Boolean(res);
        }
      } catch (err) {
        console.warn('MongoDB media delete notice:', err);
      }
    }
    return true;
  }
}

export const dbService = EduNexaDatabaseService.getInstance();
