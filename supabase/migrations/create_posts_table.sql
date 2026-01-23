-- posts 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  thumbnail TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time INTEGER NOT NULL DEFAULT 5,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  author_name TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts(slug);
CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts(status);
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS posts_published_date_idx ON public.posts(published_date DESC);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- published_at 자동 설정 트리거 함수
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status = 'draft') THEN
    NEW.published_at = NOW();
  ELSIF NEW.status = 'draft' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS set_posts_published_at ON public.posts;
CREATE TRIGGER set_posts_published_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- RLS 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Users can view own posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update own posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update all posts" ON public.posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete all posts" ON public.posts;

-- RLS 정책: 모든 사용자가 발행된 포스트 조회 가능
CREATE POLICY "Published posts are viewable by everyone"
  ON public.posts FOR SELECT
  USING (status = 'published');

-- RLS 정책: 인증된 사용자는 자신의 포스트 조회 가능
CREATE POLICY "Users can view own posts"
  ON public.posts FOR SELECT
  USING ((select auth.uid()) = author_id);

-- RLS 정책: admin만 모든 포스트 조회 가능
CREATE POLICY "Admins can view all posts"
  ON public.posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

-- RLS 정책: 인증된 사용자는 자신의 포스트 생성 가능
CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT
  WITH CHECK ((select auth.uid()) = author_id);

-- RLS 정책: 작성자는 자신의 포스트 수정 가능
CREATE POLICY "Users can update own posts"
  ON public.posts FOR UPDATE
  USING ((select auth.uid()) = author_id)
  WITH CHECK ((select auth.uid()) = author_id);

-- RLS 정책: admin은 모든 포스트 수정 가능
CREATE POLICY "Admins can update all posts"
  ON public.posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );

-- RLS 정책: 작성자는 자신의 포스트 삭제 가능
CREATE POLICY "Users can delete own posts"
  ON public.posts FOR DELETE
  USING ((select auth.uid()) = author_id);

-- RLS 정책: admin은 모든 포스트 삭제 가능
CREATE POLICY "Admins can delete all posts"
  ON public.posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = (select auth.uid()) AND role = 'admin'
    )
  );
