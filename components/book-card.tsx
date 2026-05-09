"use client"

import { BookEntry } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Heart } from 'lucide-react'

interface BookCardProps {
  book: BookEntry
  onClick: (book: BookEntry) => void
}

const CARD_ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]', 'rotate-0']

function getRotation(id: string) {
  // Handle numeric IDs or UUIDs
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  const idx = Math.abs(hash) % CARD_ROTATIONS.length
  return CARD_ROTATIONS[idx]
}

export function BookCard({ book, onClick }: BookCardProps) {
  const rotation = getRotation(book.id)
  const date = format(new Date(book.created_at), 'MMM d, yyyy')

  return (
    <button
      onClick={() => onClick(book)}
      className={cn(
        'group relative w-full text-left transition-all duration-300',
        'hover:-translate-y-2 hover:rotate-0',
        rotation,
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      )}
      aria-label={`Open ${book.title} by ${book.author}`}
    >
      {/* Tape effect top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 rounded-sm opacity-70 z-10"
        style={{ backgroundColor: `${book.cover_color}55` }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div
        className={cn(
          'relative bg-paper rounded-lg overflow-hidden',
          'shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]',
          'group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.13),0_2px_6px_rgba(0,0,0,0.08)]',
          'transition-shadow duration-300 paper-texture'
        )}
      >
        {/* Color accent stripe */}
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: book.cover_color }}
          aria-hidden="true"
        />

        <div className="p-5 flex flex-col gap-3">
          {/* Category chip */}
          <span
            className="self-start text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{
              color: book.cover_color,
              borderColor: `${book.cover_color}55`,
              backgroundColor: `${book.cover_color}18`,
            }}
          >
            {book.category}
          </span>

          {/* Title */}
          <h3
            className="font-handwriting text-xl leading-tight text-ink"
            style={{ fontFamily: 'var(--font-handwriting)' }}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="font-serif text-xs text-ink-light italic" style={{ fontFamily: 'var(--font-serif)' }}>
            — {book.author}
          </p>

          {/* Memo */}
          <p className="font-sans text-[13px] text-ink-light leading-relaxed line-clamp-3">
            {book.memo}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <span className="font-sans text-[11px] text-muted-foreground">{date}</span>
            <StarRating rating={book.rating} />
          </div>
        </div>
      </div>
    </button>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Heart
          key={i}
          className="size-3.5"
          fill={i < rating ? '#C4956A' : 'none'}
          stroke={i < rating ? '#C4956A' : '#c8b89a'}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
