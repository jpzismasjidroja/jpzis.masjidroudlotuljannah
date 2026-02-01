-- Add 'author' column to 'articles' table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS author text DEFAULT 'Administrator';

-- Comment on column
COMMENT ON COLUMN public.articles.author IS 'Name of the article author';
