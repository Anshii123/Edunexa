import React from 'react';
import { cn } from '@/lib/utils';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  variant = 'info',
  title,
  onClose,
  className,
  children,
  ...props
}: AlertProps) {
  const variants = {
    info: {
      wrapper: 'bg-brand-500/10 border-brand-500/30 text-brand-200',
      icon: <Info className="w-5 h-5 text-brand-400 shrink-0" />,
      titleColor: 'text-brand-300',
    },
    success: {
      wrapper: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      titleColor: 'text-emerald-300',
    },
    warning: {
      wrapper: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      titleColor: 'text-amber-300',
    },
    error: {
      wrapper: 'bg-danger-500/10 border-danger-500/30 text-danger-200',
      icon: <AlertCircle className="w-5 h-5 text-danger-400 shrink-0" />,
      titleColor: 'text-danger-300',
    },
  };

  const current = variants[variant];

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-xl border flex items-start gap-3 relative transition-all',
        current.wrapper,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{current.icon}</div>

      <div className="flex-grow space-y-1 text-xs leading-relaxed">
        {title && <h5 className={cn('font-semibold text-sm', current.titleColor)}>{title}</h5>}
        <div>{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors focus-ring"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
