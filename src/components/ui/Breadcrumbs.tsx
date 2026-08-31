import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className={cn('flex items-center gap-2 text-xs text-slate-400', className)}>
      {showHome && (
        <Link
          href="/"
          className="hover:text-slate-200 transition-colors flex items-center gap-1 focus-ring rounded"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Home</span>
        </Link>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {(showHome || index > 0) && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-slate-200 transition-colors focus-ring rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn('font-medium', isLast ? 'text-slate-100' : 'text-slate-400')}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
