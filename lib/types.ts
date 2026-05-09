// Maps directly to Supabase schema:
// CREATE TABLE books (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   title text NOT NULL,
//   author text NOT NULL,
//   rating integer CHECK (rating >= 1 AND rating <= 5),
//   memo text,
//   category text,
//   cover_color text,
//   created_at timestamptz DEFAULT now()
// );

export type Category = 'All' | 'Fiction' | 'Non-Fiction' | 'Tech' | 'Philosophy' | 'Poetry' | 'Memoir'

export interface BookEntry {
  id: string
  title: string
  author: string
  rating: number      // 1–5
  memo: string
  category: Category
  cover_color: string // tailwind bg class for the card accent
  created_at: string  // ISO date string
}
