-- CHAON production-ready shared data schema
-- Run once in the Supabase SQL Editor. Safe to run again.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default '익명의 차오름러',
  avatar text not null default '🐤',
  profile_tags text[] not null default '{}',
  points integer not null default 240,
  badges text[] not null default '{}',
  done_missions text[] not null default '{}',
  joined_programs text[] not null default '{}',
  joined_events text[] not null default '{}',
  visits integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists badges text[] not null default '{}';
alter table public.profiles add column if not exists done_missions text[] not null default '{}';
alter table public.profiles add column if not exists joined_programs text[] not null default '{}';
alter table public.profiles add column if not exists joined_events text[] not null default '{}';

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
create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.meetups (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date text not null,
  time text not null,
  place text not null,
  max_people integer not null default 4 check (max_people between 2 and 20),
  joined_people integer not null default 1 check (joined_people >= 0),
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
alter table public.post_likes enable row level security;
alter table public.meetups enable row level security;
alter table public.meetup_members enable row level security;
alter table public.music_votes enable row level security;
alter table public.music_recommendations enable row level security;

do $$ begin create policy "profiles readable" on public.profiles for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "profiles own insert" on public.profiles for insert to authenticated with check (auth.uid() = id); exception when duplicate_object then null; end $$;
do $$ begin create policy "profiles own update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id); exception when duplicate_object then null; end $$;
do $$ begin create policy "posts readable" on public.posts for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "posts own insert" on public.posts for insert to authenticated with check (auth.uid() = author_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "posts own update" on public.posts for update to authenticated using (auth.uid() = author_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "posts own delete" on public.posts for delete to authenticated using (auth.uid() = author_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "post likes readable" on public.post_likes for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "post likes own insert" on public.post_likes for insert to authenticated with check (auth.uid() = user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "post likes own delete" on public.post_likes for delete to authenticated using (auth.uid() = user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "meetups readable" on public.meetups for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "meetups own insert" on public.meetups for insert to authenticated with check (auth.uid() = creator_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "meetups own update" on public.meetups for update to authenticated using (auth.uid() = creator_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "meetups own delete" on public.meetups for delete to authenticated using (auth.uid() = creator_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "members readable" on public.meetup_members for select to authenticated using (true); exception when duplicate_object then null; end $$;
-- Joining must go through join_meetup() so capacity is checked under a row lock.
drop policy if exists "members own insert" on public.meetup_members;
do $$ begin create policy "members own delete" on public.meetup_members for delete to authenticated using (auth.uid() = user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "music votes readable" on public.music_votes for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "music votes own insert" on public.music_votes for insert to authenticated with check (auth.uid() = user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "music recommendations readable" on public.music_recommendations for select to authenticated using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "music recommendations own insert" on public.music_recommendations for insert to authenticated with check (auth.uid() = user_id); exception when duplicate_object then null; end $$;

create or replace function public.sync_meetup_member_count()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.meetups
  set joined_people = (select count(*) from public.meetup_members where meetup_id = coalesce(new.meetup_id, old.meetup_id))
  where id = coalesce(new.meetup_id, old.meetup_id);
  return coalesce(new, old);
end $$;
drop trigger if exists meetup_member_count_trigger on public.meetup_members;
create trigger meetup_member_count_trigger after insert or delete on public.meetup_members for each row execute function public.sync_meetup_member_count();

create or replace function public.add_creator_as_member()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.meetup_members(meetup_id, user_id) values (new.id, new.creator_id) on conflict do nothing;
  return new;
end $$;
drop trigger if exists meetup_creator_member_trigger on public.meetups;
create trigger meetup_creator_member_trigger after insert on public.meetups for each row execute function public.add_creator_as_member();

create or replace function public.join_meetup(p_meetup_id uuid)
returns boolean language plpgsql security definer set search_path = public as $$
declare target public.meetups; inserted_count integer;
begin
  if auth.uid() is null then return false; end if;
  select * into target from public.meetups where id = p_meetup_id for update;
  if target.id is null or target.joined_people >= target.max_people then return false; end if;
  insert into public.meetup_members(meetup_id, user_id) values (p_meetup_id, auth.uid()) on conflict do nothing;
  get diagnostics inserted_count = row_count;
  return inserted_count = 1;
end $$;
grant execute on function public.join_meetup(uuid) to authenticated;

-- Repair counts for any meetups created before this schema was applied.
update public.meetups m set joined_people = (select count(*) from public.meetup_members mm where mm.meetup_id = m.id);

do $$ begin alter publication supabase_realtime add table public.posts; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.post_likes; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.meetups; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.meetup_members; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.music_votes; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.music_recommendations; exception when duplicate_object then null; end $$;
