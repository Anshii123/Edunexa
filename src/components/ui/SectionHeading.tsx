import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  eyebrowVariant?: 'default' | 'brand' | 'gold' | 'emerald' | 'rose' | 'slate' | 'outline';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'split';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowVariant = 'brand',
  title,
  description,
  align = 'center',
  action,
  className,
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12', className)}>
        <div className="max-w-2xl space-y-3">
          {eyebrow && (
            <Badge variant={eyebrowVariant} size="md">
              {eyebrow}
            </Badge>
          )}
          <h2 className="type-h2 text-white font-display">{title}</h2>
          {description && <p className="type-body">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'space-y-3 mb-12',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <Badge variant={eyebrowVariant} size="md">
          {eyebrow}
        </Badge>
      )}
      <h2 className="type-h2 text-white font-display">{title}</h2>
      {description && <p className="type-body">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
