import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 focus-ring select-none tracking-tight';

    const variants = {
      primary:
        'bg-[#4338CA] hover:bg-[#3730A3] active:bg-[#312E81] text-white shadow-sm border border-indigo-700/20 hover:shadow-indigo-500/25',
      secondary:
        'bg-white hover:bg-stone-50 active:bg-stone-100 text-[#111827] border border-black/[0.08] shadow-subtle',
      outline:
        'bg-transparent hover:bg-black/[0.03] text-[#111827] border border-black/[0.12] hover:border-black/[0.2]',
      ghost:
        'bg-transparent hover:bg-black/[0.04] text-[#4B5563] hover:text-[#111827]',
      gold:
        'bg-[#D97706] hover:bg-[#B45309] active:bg-[#92400E] text-white shadow-sm border border-amber-600/30',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
      subtle:
        'bg-[#F1F0FA] hover:bg-indigo-100/80 text-[#4338CA] border border-indigo-200/60',
    };

    const sizes = {
      xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
      sm: 'px-3.5 py-2 text-xs gap-2 rounded-xl',
      md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
      lg: 'px-6 py-3.5 text-base gap-2.5 rounded-xl font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

