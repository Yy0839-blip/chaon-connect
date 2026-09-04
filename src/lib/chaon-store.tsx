import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { missions, seedPosts, type Post } from "@/data/chaon";

type State = {
  nickname: string;
  avatar: string;
  points: number;
  badges: string[];
  doneMissions: string[];
  joinedPrograms: string[];
  visits: number;
  posts: Post[];
};

const KEY = "chaon.state.v1";

const initial: State = {
  nickname: "",
  avatar: "🐤",
  points: 240,
  badges: ["첫 방문", "게임왕", "친구왕"],
  doneMissions: [],
  joinedPrograms: ["p3"],
  visits: 4,
  posts: seedPosts,
};

type Ctx = State & {
  ready: boolean;
  setProfile: (nickname: string, avatar: string) => void;
  completeMission: (id: string) => { point: number; badge?: string | undefined } | null;
  toggleProgram: (id: string) => boolean;
  addPost: (text: string, place: string) => void;
  toggleLike: (id: string) => void;
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

  const setProfile = useCallback((nickname: string, avatar: string) => {
    setState((s) => ({ ...s, nickname, avatar }));
  }, []);

  const completeMission = useCallback((id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return null;
    let applied = false;
    setState((s) => {
      if (s.doneMissions.includes(id)) return s;
      applied = true;
      return {
        ...s,
        doneMissions: [...s.doneMissions, id],
        points: s.points + mission.point,
        badges: mission.badge && !s.badges.includes(mission.badge) ? [...s.badges, mission.badge] : s.badges,
      };
    });
    return applied ? { point: mission.point, badge: mission.badge } : null;
  }, []);

  const toggleProgram = useCallback((id: string) => {
    let joined = false;
    setState((s) => {
      joined = !s.joinedPrograms.includes(id);
      return {
        ...s,
        joinedPrograms: joined ? [...s.joinedPrograms, id] : s.joinedPrograms.filter((p) => p !== id),
      };
    });
    return joined;
  }, []);

  const addPost = useCallback((text: string, place: string) => {
    setState((s) => ({
      ...s,
      points: s.points + 5,
      posts: [
        {
          id: `u${Date.now()}`,
          nickname: s.nickname || "익명의 차오름러",
          avatar: s.avatar,
          place,
          time: "방금",
          text,
          likes: 0,
          comments: 0,
        },
        ...s.posts,
      ],
    }));
  }, []);

  const toggleLike = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      posts: s.posts.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
      ),
    }));
  }, []);

  const value = useMemo<Ctx>(
    () => ({ ...state, ready, setProfile, completeMission, toggleProgram, addPost, toggleLike }),
    [state, ready, setProfile, completeMission, toggleProgram, addPost, toggleLike],
  );

  return <ChaonContext.Provider value={value}>{children}</ChaonContext.Provider>;
}

export function useChaon() {
  const ctx = useContext(ChaonContext);
  if (!ctx) throw new Error("useChaon must be used inside ChaonProvider");
  return ctx;
}
