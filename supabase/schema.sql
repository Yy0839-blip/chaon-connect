-- CHAON shared data schema
-- Run this once in the Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default '익명의 차오름러',
  avatar text not null default '🐤',
  profile_tags text[] not null default '{}',
  points integer not null default 240,
  visits integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,
  avatar text not null,
  place text not null default '',
  text text not null,
  image text,
  likes integer not null default 0,
  comments integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.meetups (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date text not null,
  time text not null,
  place text not null,
  max_people integer not null default 4,
  joined_people integer not null default 1,
  creator text not null,
  avatar text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.meetup_members (
  meetup_id uuid not null references public.meetups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (meetup_id, user_id)
);

create table if not exists public.music_votes (
  user_id uuid not null references auth.users(id) on delete cascade,
  vote_date date not null,
  song_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, vote_date)
);

create table if not exists public.music_recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  artist text not null,
  recommender text not null,
  vote_date date not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.meetups enable row level security;
alter table public.meetup_members enable row level security;
alter table public.music_votes enable row level security;
alter table public.music_recommendations enable row level security;

create policy "profiles readable" on public.profiles for select to authenticated using (true);
create policy "profiles own insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles own update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "posts readable" on public.posts for select to authenticated using (true);
create policy "posts own insert" on public.posts for insert to authenticated with check (auth.uid() = author_id);
create policy "posts own update" on public.posts for update to authenticated using (auth.uid() = author_id);
create policy "posts own delete" on public.posts for delete to authenticated using (auth.uid() = author_id);

create policy "meetups readable" on public.meetups for select to authenticated using (true);
create policy "meetups own insert" on public.meetups for insert to authenticated with check (auth.uid() = creator_id);
create policy "meetups own update" on public.meetups for update to authenticated using (auth.uid() = creator_id);
create policy "meetups own delete" on public.meetups for delete to authenticated using (auth.uid() = creator_id);

create policy "members readable" on public.meetup_members for select to authenticated using (true);
create policy "members own insert" on public.meetup_members for insert to authenticated with check (auth.uid() = user_id);
create policy "members own delete" on public.meetup_members for delete to authenticated using (auth.uid() = user_id);

create policy "music votes readable" on public.music_votes for select to authenticated using (true);
create policy "music votes own insert" on public.music_votes for insert to authenticated with check (auth.uid() = user_id);

create policy "music recommendations readable" on public.music_recommendations for select to authenticated using (true);
create policy "music recommendations own insert" on public.music_recommendations for insert to authenticated with check (auth.uid() = user_id);

-- Realtime: enable for collaborative screens.
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.meetups;
alter publication supabase_realtime add table public.meetup_members;
alter publication supabase_realtime add table public.music_recommendations;
