import { 
  SEED_COURSES, 
  SEED_FACULTY, 
  SEED_NOTICES, 
  SEED_EVENTS 
} from './seed';

export async function seedDatabaseIfEmpty() {
  try {
    const { CourseModel, FacultyModel, NoticeModel, EventModel, UserModel } = await import('@/lib/models');
    
    const courseCount = await CourseModel.countDocuments();
    if (courseCount === 0) {
      await CourseModel.insertMany(SEED_COURSES.map((c) => ({ ...c, _id: undefined })));
      console.log('🌱 Seeded initial Courses into MongoDB Atlas.');
    }

    const facultyCount = await FacultyModel.countDocuments();
    if (facultyCount === 0) {
      await FacultyModel.insertMany(SEED_FACULTY.map((f) => ({ ...f, _id: undefined })));
      console.log('🌱 Seeded initial Faculty into MongoDB Atlas.');
    }

    const noticeCount = await NoticeModel.countDocuments();
    if (noticeCount === 0) {
      await NoticeModel.insertMany(SEED_NOTICES.map((n) => ({ ...n, _id: undefined })));
      console.log('🌱 Seeded initial Notices into MongoDB Atlas.');
    }

    const eventCount = await EventModel.countDocuments();
    if (eventCount === 0) {
      await EventModel.insertMany(SEED_EVENTS.map((e) => ({ ...e, _id: undefined })));
      console.log('🌱 Seeded initial Events into MongoDB Atlas.');
    }

    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const { hashPassword } = await import('@/lib/auth/security');
      const adminSec = hashPassword('Admin@1234');
      const studentSec = hashPassword('Student@1234');

      await UserModel.create([
        {
          name: 'Dean Arthur Sterling',
          email: 'admin@edunexa.edu',
          passwordHash: adminSec.hash,
          salt: adminSec.salt,
          role: 'admin',
          status: 'active',
          profile: {
            department: 'Academic Governance & Dean of Physics',
            phone: '+1 (800) 555-6392',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          },
        },
        {
          name: 'Aarav Mehta',
          email: 'student@edunexa.edu',
          passwordHash: studentSec.hash,
          salt: studentSec.salt,
          role: 'student',
          status: 'active',
          profile: {
            studentId: 'EDN-2026-0842',
            batch: 'STEM 2026-28 Batch Alpha',
            phone: '+1 (555) 234-5678',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
          },
        },
      ]);
      console.log('🌱 Seeded default Admin and Student into MongoDB Atlas.');
    }
  } catch (err) {
    console.warn('Database auto-seed notice:', err);
  }
}
