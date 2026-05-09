"use client"

import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const CATEGORIES: Category[] = ['All', 'Fiction', 'Non-Fiction', 'Tech', 'Philosophy', 'Poetry', 'Memoir']

interface FilterChipsProps {
  active: Category
  onChange: (cat: Category) => void
  counts: Record<string, number>
}

export function FilterChips({ active, onChange, counts }: FilterChipsProps) {
  return (
    <div
      role="toolbar"
      aria-label="Filter books by category"
      className="flex gap-2 flex-wrap"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all',
            'border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            active === cat
              ? 'bg-spine text-primary-foreground border-spine shadow-sm'
              : 'bg-paper text-ink-light border-border hover:border-spine/40 hover:bg-secondary'
          )}
        >
          {cat}
          {counts[cat] !== undefined && (
            <span
              className={cn(
                'text-[10px] font-semibold rounded-full px-1.5 py-0.5 min-w-[1.2rem] text-center leading-none',
                active === cat
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {counts[cat]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
