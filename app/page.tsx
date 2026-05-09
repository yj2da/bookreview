"use client"

import { useState, useMemo, useEffect } from 'react'
import { BookEntry, Category } from '@/lib/types'
import { JournalHeader } from '@/components/journal-header'
import { FilterChips } from '@/components/filter-chips'
import { MasonryGrid } from '@/components/masonry-grid'
import { AddBookModal } from '@/components/add-book-modal'
import { BookDetailModal } from '@/components/book-detail-modal'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

export default function Page() {
  const [books, setBooks] = useState<BookEntry[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null)
  const [editingBook, setEditingBook] = useState<BookEntry | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBooks = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching books:', error)
      toast.error('Could not load your journal.')
    } else {
      setBooks(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return books
    return books.filter((b) => b.category === activeCategory)
  }, [books, activeCategory])

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: books.length }
    books.forEach((b) => {
      c[b.category] = (c[b.category] ?? 0) + 1
    })
    return c
  }, [books])

  const handleAdd = async (entry: Omit<BookEntry, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('books')
      .insert([entry])
      .select()
    
    if (error) {
      console.error('Error adding book:', error)
      toast.error('Failed to add book entry.')
    } else {
      toast.success('Added to your journal!')
      fetchBooks()
    }
  }

  const handleUpdate = async (id: string, entry: Partial<Omit<BookEntry, 'id' | 'created_at'>>) => {
    const { error } = await supabase
      .from('books')
      .update(entry)
      .eq('id', id)
    
    if (error) {
      console.error('Error updating book:', error)
      toast.error('Failed to update entry.')
    } else {
      toast.success('Entry updated.')
      fetchBooks()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting book:', error)
      toast.error('Could not delete the entry.')
    } else {
      toast.success('Entry removed.')
      setBooks((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Subtle grid paper background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.86 0.03 65 / 0.35) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.86 0.03 65 / 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <JournalHeader totalBooks={books.length} />

        {/* Filters */}
        <div className="mb-8">
          <FilterChips
            active={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
          />
        </div>

        {/* Masonry book grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="size-8 text-muted-foreground" />
          </div>
        ) : (
          <MasonryGrid books={filtered} onCardClick={setSelectedBook} />
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setAddOpen(true)}
        className={cn(
          'fixed bottom-8 right-8 z-20',
          'size-14 rounded-full shadow-lg',
          'flex items-center justify-center',
          'bg-spine text-primary-foreground',
          'hover:scale-110 active:scale-95 transition-transform duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
        )}
        aria-label="Add a new book entry"
      >
        <Plus className="size-6" strokeWidth={2.5} />
      </button>

      {/* Modals */}
      <AddBookModal
        open={addOpen || !!editingBook}
        onClose={() => {
          setAddOpen(false)
          setEditingBook(null)
        }}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        initialData={editingBook}
      />

      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onDelete={handleDelete}
        onEdit={(book) => {
          setEditingBook(book)
          setSelectedBook(null)
        }}
      />
    </main>
  )
}
