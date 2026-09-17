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
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EduImage } from '@/components/ui/EduImage';

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
    <div className="w-full max-w-md space-y-7">
      {/* Brand Header */}
      <div className="space-y-2">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-1 group">
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shadow-xs group-hover:bg-[#2563EB] transition-colors">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-[#0F172A] font-display">
            SKILLORA<span className="text-[#2563EB]">.</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display tracking-tight">
          Welcome to Skillora
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          Sign in to access your student lectures, test analytics, or educator workspace.
        </p>
      </div>

      {/* Demo Credentials Quick Fill */}
      <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-black/[0.06] space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
          <span className="flex items-center gap-1.5 text-[#2563EB]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Accounts:
          </span>
          <span className="text-[11px] text-[#64748B]">1-Click Autofill</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('student@edunexa.edu', 'Student@1234')}
            className="px-3 py-2 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] text-left transition-all group shadow-xs"
          >
            <div className="text-[11px] font-bold text-emerald-800">Student Account</div>
            <div className="text-[10px] text-[#64748B] truncate font-mono">student@edunexa.edu</div>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin@edunexa.edu', 'Admin@1234')}
            className="px-3 py-2 rounded-xl bg-white border border-black/[0.08] hover:border-[#2563EB] text-left transition-all group shadow-xs"
          >
            <div className="text-[11px] font-bold text-[#2563EB]">Teacher / Admin</div>
            <div className="text-[10px] text-[#64748B] truncate font-mono">admin@edunexa.edu</div>
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
          <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@edunexa.edu"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.1] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-[#0F172A]">
              Password
            </label>
            <Link
              href="/admissions"
              className="text-[11px] text-[#2563EB] hover:underline font-medium transition-colors"
            >
              Need help?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your account password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-black/[0.1] text-[#0F172A] text-xs placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-[#94A3B8] hover:text-[#0F172A] absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white shadow-sm flex items-center justify-center gap-2 text-xs transition-all mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In to Skillora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Footer Registration Link */}
      <div className="pt-4 border-t border-black/[0.06] text-center text-xs text-[#64748B]">
        <span>Don't have a Skillora profile yet? </span>
        <Link href="/register" className="font-semibold text-[#2563EB] hover:underline ml-1">
          Create Student Profile
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center p-4 sm:p-8 pt-28 pb-16 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-12 border border-black/[0.08] shadow-sm relative overflow-hidden">
        
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 py-2">
          <Suspense fallback={<div className="p-8 text-center text-[#64748B]">Loading Portal...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Right Feature Area (5 cols) in Light Warm Palette */}
        <div className="lg:col-span-5 hidden lg:block p-8 rounded-2xl bg-[#F8F7F4] border border-black/[0.06] space-y-6">
          <div className="rounded-xl overflow-hidden border border-black/[0.08] shadow-xs">
            <EduImage
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
              alt="Quiet library study booth at Skillora"
              aspectRatio="4/3"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#0F172A] font-display">
              Skillora Unified Identity
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Your account grants synchronized access to lecture streams, 1-on-1 twilight doubt desks, verified problem sets, and diagnostic rank analytics.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-[#334155] border-t border-black/[0.06]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Salted cryptographic authentication</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strict role-based privacy boundaries</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>24/7 access to archived study notes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
