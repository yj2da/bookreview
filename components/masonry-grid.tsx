"use client"

import Masonry from 'react-masonry-css'
import { BookEntry } from '@/lib/types'
import { BookCard } from './book-card'

const breakpointCols = {
  default: 3,
  1024: 2,
  640: 1,
}

interface MasonryGridProps {
  books: BookEntry[]
  onCardClick: (book: BookEntry) => void
}

export function MasonryGrid({ books, onCardClick }: MasonryGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="text-6xl opacity-40 select-none"
          style={{ fontFamily: 'var(--font-handwriting)' }}
          aria-hidden="true"
        >
          📖
        </div>
        <p
          className="text-xl text-muted-foreground"
          style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.4rem' }}
        >
          No books here yet...
        </p>
        <p className="text-sm text-muted-foreground font-sans">
          Add your first reading note with the + button below.
        </p>
      </div>
    )
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="flex gap-5 w-full"
      columnClassName="flex flex-col gap-8"
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={onCardClick} />
      ))}
    </Masonry>
  )
}
