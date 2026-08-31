import crypto from 'crypto';
import { SessionPayload } from './types';

const SESSION_SECRET = process.env.AUTH_SECRET || 'edunexa_production_secret_key_2026_secure_hash';
export const SESSION_COOKIE_NAME = 'edunexa_session_token';
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 Days

/**
 * Hashes a plaintext password using PBKDF2 with a cryptographically secure random salt.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

/**
 * Verifies a plaintext password against a stored PBKDF2 hash and salt using constant-time comparison.
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const hashToVerify = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');
    
    const storedBuffer = Buffer.from(storedHash, 'hex');
    const verifyBuffer = Buffer.from(hashToVerify, 'hex');

    if (storedBuffer.length !== verifyBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(storedBuffer, verifyBuffer);
  } catch (error) {
    return false;
  }
}

/**
 * Signs and encodes a session payload into a tamper-proof session token.
 */
export function createSessionToken(payload: Omit<SessionPayload, 'exp'>): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const fullPayload: SessionPayload = { ...payload, exp };

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a session token signature and expiration.
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encodedPayload)
      .digest('base64url');

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length) {
      return null;
    }

    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const payloadString = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const payload: SessionPayload = JSON.parse(payloadString);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch (error) {
    return null;
  }
}
