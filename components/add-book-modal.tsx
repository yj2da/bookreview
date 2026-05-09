"use client"

import { useState, useEffect } from 'react'
import { BookEntry, Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Heart, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const CATEGORIES: Exclude<Category, 'All'>[] = [
  'Fiction', 'Non-Fiction', 'Tech', 'Philosophy', 'Poetry', 'Memoir'
]

const COVER_COLORS = [
  '#8BAF8B', '#A0785A', '#C4956A', '#7C9E8A',
  '#D4A57A', '#9B8EA0', '#7A9BB0', '#B89A7A',
]

interface AddBookModalProps {
  open: boolean
  onClose: () => void
  onAdd: (entry: Omit<BookEntry, 'id' | 'created_at'>) => void
  onUpdate?: (id: string, entry: Partial<Omit<BookEntry, 'id' | 'created_at'>>) => void
  initialData?: BookEntry | null
}

function InteractiveStarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < (hovered || value)
        return (
          <button
            key={i}
            type="button"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label={`Rate ${i + 1} out of 5`}
            onClick={() => onChange(i + 1)}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(0)}
          >
            <Heart
              className="size-5 transition-all"
              fill={filled ? '#C4956A' : 'none'}
              stroke={filled ? '#C4956A' : '#c8b89a'}
              strokeWidth={1.5}
            />
          </button>
        )
      })}
    </div>
  )
}

export function AddBookModal({ open, onClose, onAdd, onUpdate, initialData }: AddBookModalProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(3)
  const [memo, setMemo] = useState('')
  const [category, setCategory] = useState<Exclude<Category, 'All'>>('Fiction')
  const [coverColor, setCoverColor] = useState(COVER_COLORS[0])

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setAuthor(initialData.author)
      setRating(initialData.rating)
      setMemo(initialData.memo)
      setCategory(initialData.category as Exclude<Category, 'All'>)
      setCoverColor(initialData.cover_color)
    } else if (open) {
      setTitle('')
      setAuthor('')
      setRating(3)
      setMemo('')
      setCategory('Fiction')
      setCoverColor(COVER_COLORS[0])
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return

    const entryData = {
      title: title.trim(),
      author: author.trim(),
      rating,
      memo: memo.trim(),
      category,
      cover_color: coverColor,
    }

    if (initialData && onUpdate) {
      onUpdate(initialData.id, entryData)
    } else {
      onAdd(entryData)
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md bg-paper border-border shadow-xl rounded-2xl p-0 overflow-hidden"
        aria-describedby="add-book-description"
      >
        {/* Top accent */}
        <div className="h-1.5 w-full" style={{ backgroundColor: coverColor }} />

        <div className="px-6 pb-6 pt-4">
          <DialogHeader className="mb-5">
            <DialogTitle
              className="text-2xl text-ink"
              style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.6rem' }}
            >
              {initialData ? 'Edit Reading Note' : 'New Reading Note'}
            </DialogTitle>
            <DialogDescription
              id="add-book-description"
              className="text-sm text-muted-foreground font-sans"
            >
              {initialData ? 'Update your reading notes.' : 'Add a book you have read to your journal.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Book Title *
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                placeholder="What did you read?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* Author */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Author *
              </label>
              <input
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                placeholder="Who wrote it?"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'text-xs px-3 py-1 rounded-full border font-sans transition-all',
                      category === cat
                        ? 'bg-spine text-primary-foreground border-spine'
                        : 'bg-secondary text-ink-light border-border hover:border-spine/50'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Card Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {COVER_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setCoverColor(color)}
                    className={cn(
                      'size-6 rounded-full border-2 transition-all',
                      coverColor === color ? 'scale-125 border-ink' : 'border-transparent'
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Rating
              </label>
              <InteractiveStarRating value={rating} onChange={setRating} />
            </div>

            {/* Memo */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-sans">
                Your Note
              </label>
              <textarea
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none h-24"
                placeholder="What stayed with you?"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="font-sans text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="font-sans text-primary-foreground"
                style={{ backgroundColor: coverColor, borderColor: coverColor }}
              >
                {initialData ? 'Update Journal' : 'Add to Journal'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
