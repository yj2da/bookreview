import { BookOpen } from 'lucide-react'

interface JournalHeaderProps {
  totalBooks: number
}

export function JournalHeader({ totalBooks }: JournalHeaderProps) {
  return (
    <header className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="size-9 rounded-full bg-spine flex items-center justify-center shadow-sm" aria-hidden="true">
          <BookOpen className="size-4 text-primary-foreground" strokeWidth={1.8} />
        </div>
        <h1
          className="text-4xl text-ink leading-none"
          style={{ fontFamily: 'var(--font-handwriting)', fontSize: '2.5rem' }}
        >
          My Reading Journal
        </h1>
      </div>
      <p
        className="text-sm text-muted-foreground font-sans ml-12"
      >
        {totalBooks === 0
          ? 'Start your reading adventure'
          : `${totalBooks} book${totalBooks !== 1 ? 's' : ''} remembered`}
      </p>
      {/* Decorative ruled line */}
      <div className="mt-3 ml-12 h-px bg-gradient-to-r from-border via-border to-transparent" />
    </header>
  )
}
