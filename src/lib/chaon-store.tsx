import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { missions } from "@/data/chaon";
import { seedPosts, type Post } from "@/data/community";

export type Meetup = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  maxPeople: number;
  joinedPeople: number;
  creator: string;
  avatar: string;
};

export type MusicRecommendation = {
  id: string;
  title: string;
  artist: string;
  date: string;
  recommender: string;
};

type State = {
  nickname: string;
  avatar: string;
  profileTags: string[];
  points: number;
  badges: string[];
  doneMissions: string[];
  joinedPrograms: string[];
  joinedEvents: string[];
  visits: number;
  posts: Post[];
  meetups: Meetup[];
  musicVotes: Record<string, string>;
  musicRecommendations: MusicRecommendation[];
};

const KEY = "chaon.state.v3";

const initial: State = {
  nickname: "",
  avatar: "🐤",
  profileTags: ["친구랑 노는 걸 좋아해"],
  points: 240,
  badges: ["첫 방문", "게임왕", "친구왕"],
  doneMissions: [],
  joinedPrograms: [],
  joinedEvents: [],
  visits: 4,
  posts: seedPosts,
  meetups: [],
  musicVotes: {},
  musicRecommendations: [],
};

type Ctx = State & {
  ready: boolean;
  setProfile: (nickname: string, avatar: string) => void;
  setProfileTags: (tags: string[]) => void;
  completeMission: (id: string) => { point: number; badge?: string | undefined } | null;
  toggleProgram: (id: string) => boolean;
  toggleEvent: (id: string) => boolean;
  addPost: (text: string, place: string, image?: string) => void;
  toggleLike: (id: string) => void;
  addMeetup: (input: Omit<Meetup, "id" | "creator" | "avatar" | "joinedPeople">) => void;
  toggleMeetup: (id: string) => boolean;
  voteMusic: (date: string, songId: string) => boolean;
  addMusicRecommendation: (title: string, artist: string, date: string) => void;
};

const ChaonContext = createContext<Ctx | null>(null);

export function ChaonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...(JSON.parse(raw) as Partial<State>) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const setProfile = useCallback((nickname: string, avatar: string) => setState((s) => ({ ...s, nickname, avatar })), []);
  const setProfileTags = useCallback((tags: string[]) => setState((s) => ({ ...s, profileTags: tags.slice(0, 5) })), []);

  const completeMission = useCallback((id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return null;
    let applied = false;
    setState((s) => {
      if (s.doneMissions.includes(id)) return s;
      applied = true;
      return { ...s, doneMissions: [...s.doneMissions, id], points: s.points + mission.point, badges: mission.badge && !s.badges.includes(mission.badge) ? [...s.badges, mission.badge] : s.badges };
    });
    return applied ? { point: mission.point, badge: mission.badge } : null;
  }, []);

  const toggleProgram = useCallback((id: string) => {
    let joined = false;
    setState((s) => { joined = !s.joinedPrograms.includes(id); return { ...s, joinedPrograms: joined ? [...s.joinedPrograms, id] : s.joinedPrograms.filter((p) => p !== id) }; });
    return joined;
  }, []);

  const toggleEvent = useCallback((id: string) => {
    let joined = false;
    setState((s) => { joined = !s.joinedEvents.includes(id); return { ...s, joinedEvents: joined ? [...s.joinedEvents, id] : s.joinedEvents.filter((e) => e !== id) }; });
    return joined;
  }, []);

  const addPost = useCallback((text: string, place: string, image?: string) => {
    setState((s) => ({ ...s, points: s.points + 5, posts: [{ id: `u${Date.now()}`, nickname: s.nickname || "익명의 차오름러", avatar: s.avatar, place, time: "방금", text, likes: 0, comments: 0, ...(image ? { image } : {}) }, ...s.posts] }));
  }, []);

  const toggleLike = useCallback((id: string) => setState((s) => ({ ...s, posts: s.posts.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p) })), []);

  const addMeetup = useCallback((input: Omit<Meetup, "id" | "creator" | "avatar" | "joinedPeople">) => setState((s) => ({ ...s, meetups: [{ ...input, id: `meetup-${Date.now()}`, creator: s.nickname || "익명의 차오름러", avatar: s.avatar, joinedPeople: 1 }, ...s.meetups] })), []);

  const toggleMeetup = useCallback((id: string) => {
    let joined = false;
    setState((s) => ({ ...s, meetups: s.meetups.map((m) => { if (m.id !== id || m.joinedPeople >= m.maxPeople) return m; joined = true; return { ...m, joinedPeople: m.joinedPeople + 1 }; }) }));
    return joined;
  }, []);

  const voteMusic = useCallback((date: string, songId: string) => {
    let voted = false;
    setState((s) => {
      if (s.musicVotes[date]) return s;
      voted = true;
      return { ...s, musicVotes: { ...s.musicVotes, [date]: songId }, points: s.points + 1 };
    });
    return voted;
  }, []);

  const addMusicRecommendation = useCallback((title: string, artist: string, date: string) => {
    setState((s) => ({ ...s, musicRecommendations: [{ id: `song-${Date.now()}`, title, artist, date, recommender: s.nickname || "익명의 차오름러" }, ...s.musicRecommendations].slice(0, 30) }));
  }, []);

  const value = useMemo<Ctx>(() => ({ ...state, ready, setProfile, setProfileTags, completeMission, toggleProgram, toggleEvent, addPost, toggleLike, addMeetup, toggleMeetup, voteMusic, addMusicRecommendation }), [state, ready, setProfile, setProfileTags, completeMission, toggleProgram, toggleEvent, addPost, toggleLike, addMeetup, toggleMeetup, voteMusic, addMusicRecommendation]);
  return <ChaonContext.Provider value={value}>{children}</ChaonContext.Provider>;
}

export function useChaon() {
  const ctx = useContext(ChaonContext);
  if (!ctx) throw new Error("useChaon must be used inside ChaonProvider");
  return ctx;
}
