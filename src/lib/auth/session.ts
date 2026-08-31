import { cookies } from 'next/headers';
import { userStore } from './userStore';
import { verifySessionToken, SESSION_COOKIE_NAME } from './security';
import { AuthUser, SessionUser } from './types';

/**
 * Retrieves the currently authenticated user from Next.js server context cookies.
 */
export async function getServerSession(): Promise<{
  user: AuthUser | null;
  sessionUser: SessionUser | null;
}> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!tokenCookie || !tokenCookie.value) {
      return { user: null, sessionUser: null };
    }

    const payload = verifySessionToken(tokenCookie.value);
    if (!payload) {
      return { user: null, sessionUser: null };
    }

    const user = await userStore.findUserByIdAsync(payload.userId);
    if (!user || user.status !== 'active') {
      return { user: null, sessionUser: null };
    }

    const sessionUser = userStore.toSessionUser(user);
    return { user, sessionUser };
  } catch (error) {
    return { user: null, sessionUser: null };
  }
}
