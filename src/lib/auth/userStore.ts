import { AuthUser, SessionUser, UserRole } from './types';
import { hashPassword } from './security';
import { connectToDatabase, isDbConnected } from '@/lib/db/mongodb';
import { UserModel } from '@/lib/models/User';

// Generate default salted hashes for pre-seeded users
const adminSec = hashPassword('Admin@1234');
const studentSec = hashPassword('Student@1234');

const SEED_AUTH_USERS: AuthUser[] = [
  {
    id: 'user-admin-1',
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
    createdAt: '2026-01-01T00:00:00Z',
    lastLoginAt: '2026-08-30T14:30:00Z',
  },
  {
    id: 'user-student-1',
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
      enrolledCourses: ['course-1'],
    },
    createdAt: '2026-08-01T10:00:00Z',
    lastLoginAt: '2026-08-31T09:15:00Z',
  },
];

class UserStore {
  private users: AuthUser[] = [...SEED_AUTH_USERS];

  async findUserByEmailAsync(email: string): Promise<AuthUser | undefined> {
    const trimmedEmail = email.toLowerCase().trim();
    try {
      const conn = await connectToDatabase();
      if (conn && isDbConnected()) {
        const userDoc = await UserModel.findOne({ email: trimmedEmail }).select('+passwordHash +salt').lean();
        if (userDoc) {
          return {
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            passwordHash: userDoc.passwordHash,
            salt: userDoc.salt,
            role: userDoc.role,
            status: userDoc.status,
            profile: userDoc.profile,
            createdAt: userDoc.createdAt ? new Date(userDoc.createdAt).toISOString() : new Date().toISOString(),
            lastLoginAt: userDoc.updatedAt ? new Date(userDoc.updatedAt).toISOString() : new Date().toISOString(),
          } as AuthUser;
        }
      }
    } catch (err) {
      console.warn('MongoDB query notice for findUserByEmailAsync:', err);
    }
    return this.findUserByEmail(trimmedEmail);
  }

  findUserByEmail(email: string): AuthUser | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  }

  async findUserByIdAsync(id: string): Promise<AuthUser | undefined> {
    try {
      const conn = await connectToDatabase();
      if (conn && isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
        const userDoc = await UserModel.findById(id).select('+passwordHash +salt').lean();
        if (userDoc) {
          return {
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            passwordHash: userDoc.passwordHash,
            salt: userDoc.salt,
            role: userDoc.role,
            status: userDoc.status,
            profile: userDoc.profile,
            createdAt: userDoc.createdAt ? new Date(userDoc.createdAt).toISOString() : new Date().toISOString(),
            lastLoginAt: userDoc.updatedAt ? new Date(userDoc.updatedAt).toISOString() : new Date().toISOString(),
          } as AuthUser;
        }
      }
    } catch (err) {
      console.warn('MongoDB query notice for findUserByIdAsync:', err);
    }
    return this.findUserById(id);
  }

  findUserById(id: string): AuthUser | undefined {
    return this.users.find((u) => u.id === id);
  }

  async createUserAsync(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    profile?: Partial<AuthUser['profile']>;
  }): Promise<AuthUser> {
    const existing = await this.findUserByEmailAsync(data.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const { hash, salt } = hashPassword(data.password);
    const role: UserRole = data.role || 'student';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const studentId = role === 'student' ? `EDN-2026-${randomCode}` : undefined;

    const userProfile = {
      studentId,
      batch: role === 'student' ? 'Admissions 2026-27 Cohort' : undefined,
      phone: data.profile?.phone || '',
      department: data.profile?.department || '',
      avatar: data.profile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      enrolledCourses: data.profile?.enrolledCourses || [],
    };

    try {
      const conn = await connectToDatabase();
      if (conn && isDbConnected()) {
        const userDoc = await UserModel.create({
          name: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          passwordHash: hash,
          salt: salt,
          role: role,
          status: 'active',
          profile: userProfile,
        });

        const createdUser: AuthUser = {
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
          passwordHash: hash,
          salt: salt,
          role: userDoc.role,
          status: userDoc.status,
          profile: userDoc.profile,
          createdAt: userDoc.createdAt.toISOString(),
          lastLoginAt: userDoc.updatedAt.toISOString(),
        };

        this.users.push(createdUser);
        return createdUser;
      }
    } catch (err) {
      console.warn('MongoDB Atlas user creation notice:', err);
    }

    return this.createUser(data);
  }

  createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    profile?: Partial<AuthUser['profile']>;
  }): AuthUser {
    const existing = this.findUserByEmail(data.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const { hash, salt } = hashPassword(data.password);
    const role: UserRole = data.role || 'student';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const studentId = role === 'student' ? `EDN-2026-${randomCode}` : undefined;

    const newUser: AuthUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      passwordHash: hash,
      salt: salt,
      role: role,
      status: 'active',
      profile: {
        studentId,
        batch: role === 'student' ? 'Admissions 2026-27 Cohort' : undefined,
        phone: data.profile?.phone || '',
        department: data.profile?.department || '',
        avatar: data.profile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        enrolledCourses: data.profile?.enrolledCourses || [],
      },
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  updateLastLogin(userId: string): void {
    const user = this.findUserById(userId);
    if (user) {
      user.lastLoginAt = new Date().toISOString();
    }
  }

  getAllUsers(): AuthUser[] {
    return this.users;
  }

  toSessionUser(user: AuthUser): SessionUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      profile: user.profile,
    };
  }
}

// Global instance for Next.js hot-reloading preservation
const globalForUsers = global as unknown as { edunexaUserStore?: UserStore };
export const userStore = globalForUsers.edunexaUserStore || new UserStore();
if (process.env.NODE_ENV !== 'production') globalForUsers.edunexaUserStore = userStore;
