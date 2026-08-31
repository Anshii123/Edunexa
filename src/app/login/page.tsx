'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';
  const unauthorizedParam = searchParams.get('error');

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    unauthorizedParam === 'unauthorized_admin'
      ? 'Access restricted: Administrator credentials are required to view that portal.'
      : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login({ email: email.trim(), password });

      if (res.success && res.user) {
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (res.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/student/dashboard');
        }
        router.refresh();
      } else {
        setError(res.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-brand-900 flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-charcoal-900 font-display">
            Edu<span className="text-brand-900">Nexa</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display tracking-tight">
          Welcome to EduNexa Portal
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Sign in to access your student lectures, test analytics, or admin governance suite.
        </p>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 font-mono">
          <span className="flex items-center gap-1.5 text-brand-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Instant Demo Accounts:
          </span>
          <span className="text-[10px] text-stone-500">1-Click Fill</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('student@edunexa.edu', 'Student@1234')}
            className="px-3 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 text-left transition-all group shadow-sm"
          >
            <div className="text-[11px] font-bold text-emerald-800 font-mono">Student Account</div>
            <div className="text-[10px] text-stone-500 truncate font-mono">student@edunexa.edu</div>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin@edunexa.edu', 'Admin@1234')}
            className="px-3 py-2 rounded-xl bg-white border border-stone-200 hover:border-amber-600 text-left transition-all group shadow-sm"
          >
            <div className="text-[11px] font-bold text-amber-800 font-mono">Admin Account</div>
            <div className="text-[10px] text-stone-500 truncate font-mono">admin@edunexa.edu</div>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@edunexa.edu"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Password
            </label>
            <Link
              href="/admissions"
              className="text-[11px] text-brand-900 hover:text-brand-700 font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your account password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-stone-300 text-charcoal-900 text-xs placeholder-stone-400 focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-stone-400 hover:text-stone-700 absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl font-bold bg-brand-900 hover:bg-brand-800 disabled:opacity-60 text-white shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to EduNexa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Footer Registration Link */}
      <div className="pt-4 border-t border-stone-200/80 text-center text-xs text-stone-500">
        <span>Don't have an EduNexa account yet? </span>
        <Link href="/register" className="font-bold text-brand-900 hover:text-brand-700 underline ml-1">
          Create Student Profile
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FBF9F5] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-12 border border-stone-200/90 shadow-card relative overflow-hidden">
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 py-2">
          <Suspense fallback={<div className="p-8 text-center text-stone-400">Loading Portal...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Right Feature Spotlight Area (5 cols) */}
        <div className="lg:col-span-5 hidden lg:block p-8 rounded-2xl bg-[#F4F1EA] border border-stone-200/90 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-800 font-mono">
              EduNexa Unified Identity
            </span>
            <h3 className="text-xl font-bold text-charcoal-900 font-display tracking-tight">
              Enterprise Academic Security & Analytics
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your EduNexa account grants synchronized access across smart amphitheaters, 24/7 LMS archives, live test rankings, and faculty doubt desks.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>PBKDF2 Salted Cryptographic Authentication</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strict Role-Based Admin & Student Boundaries</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Encrypted HTTP-Only Session Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

