-- Supabase Database Setup for Reading Journal

-- 1. Create the 'books' table
CREATE TABLE IF NOT EXISTS books (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  memo text,
  category text,
  cover_color text, -- Stores Tailwind classes or Hex codes
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- 3. Create a Policy for Public Access (For development)
-- NOTE: In a production environment, you should restrict this to authenticated users.
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'books' AND policyname = 'Allow public access'
    ) THEN
        CREATE POLICY "Allow public access" ON books
        FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- 4. Create a function to handle 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Create a trigger to auto-update 'updated_at'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_books_updated_at') THEN
        CREATE TRIGGER update_books_updated_at
        BEFORE UPDATE ON books
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
