import React from 'react';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'p-10 rounded-2xl border border-slate-800 bg-slate-900/50 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto',
        className
      )}
      {...props}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-brand-400 flex items-center justify-center shadow-inner">
        {icon || <Inbox className="w-7 h-7 stroke-[1.75]" />}
      </div>

      <div className="space-y-1.5">
        <h4 className="type-h4 text-white font-display">{title}</h4>
        {description && <p className="type-body-sm text-slate-400 max-w-sm">{description}</p>}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
