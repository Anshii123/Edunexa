import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({
  variant = 'rounded',
  className,
  ...props
}: SkeletonProps) {
  const variants = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-slate-800/70 border border-slate-750/40',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4', className)}>
      <Skeleton className="h-44 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden', className)}>
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
      <div className="divide-y divide-slate-800/80 p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="pt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-grow">
              <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
              <div className="space-y-1.5 flex-grow max-w-sm">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-md shrink-0" />
            <Skeleton className="h-8 w-24 rounded-lg shrink-0 hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
