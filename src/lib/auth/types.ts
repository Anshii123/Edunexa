export type UserRole = 'student' | 'admin';
export type AccountStatus = 'active' | 'pending' | 'suspended';

export interface UserProfile {
  studentId?: string;
  batch?: string;
  phone?: string;
  department?: string;
  avatar?: string;
  enrolledCourses?: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  status: AccountStatus;
  profile: UserProfile;
  createdAt: string;
  lastLoginAt?: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  profile: UserProfile;
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  exp: number;
}
