"use client"

import { BookEntry } from '@/lib/types'
import { format } from 'date-fns'
import { Heart, Trash2, X, Edit2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface BookDetailModalProps {
  book: BookEntry | null
  onClose: () => void
  onDelete: (id: string) => void
  onEdit: (book: BookEntry) => void
}

export function BookDetailModal({ book, onClose, onDelete, onEdit }: BookDetailModalProps) {
  if (!book) return null
  const date = format(new Date(book.created_at), 'MMMM d, yyyy')

  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md bg-paper border-border shadow-xl rounded-2xl p-0 overflow-hidden"
        aria-describedby="book-detail-description"
      >
        {/* Top accent */}
        <div className="h-2 w-full" style={{ backgroundColor: book.cover_color }} />

        <div className="px-7 pb-7 pt-5">
          <DialogHeader className="mb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                {/* Category */}
                <span
                  className="inline-block text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-3"
                  style={{
                    color: book.cover_color,
                    borderColor: `${book.cover_color}55`,
                    backgroundColor: `${book.cover_color}18`,
                  }}
                >
                  {book.category}
                </span>

                <DialogTitle
                  className="text-3xl text-ink leading-tight text-balance"
                  style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2rem' }}
                >
                  {book.title}
                </DialogTitle>

                <p
                  className="mt-1 text-sm text-muted-foreground italic"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  by {book.author}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className="size-5"
                fill={i < book.rating ? '#C4956A' : 'none'}
                stroke={i < book.rating ? '#C4956A' : '#c8b89a'}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ))}
            <span
              className="ml-1 text-sm text-muted-foreground font-sans"
              id="book-detail-description"
            >
              {book.rating} / 5
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-5" />

          {/* Memo */}
          {book.memo && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 font-sans">
                Reading Note
              </p>
              <blockquote
                className="text-base text-ink leading-relaxed relative pl-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <span
                  className="absolute left-0 top-0 text-3xl leading-none"
                  style={{ color: `${book.cover_color}80` }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                {book.memo}
              </blockquote>
            </div>
          )}

          {/* Date */}
          <p className="text-xs text-muted-foreground font-sans mb-6">
            Finished reading on {date}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-ink gap-1.5 font-sans"
                onClick={() => {
                  onEdit(book)
                  onClose()
                }}
              >
                <Edit2 className="size-4" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive gap-1.5 font-sans"
                onClick={() => {
                  onDelete(book.id)
                  onClose()
                }}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="font-sans"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
