export type Space = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  can: string[];
  cta: string;
  open: boolean;
  tone: "primary" | "lime" | "sky" | "navy";
};

export const spaces: Space[] = [
  {
    id: "dance",
    name: "댄스실",
    emoji: "🕺",
    tagline: "대형 거울 앞에서 마음껏",
    can: ["춤 연습", "안무 촬영", "친구들과 댄스 챌린지"],
    cta: "댄스실 가보기",
    open: true,
    tone: "primary",
  },
  {
    id: "beam",
    name: "빔프로젝터",
    emoji: "📽️",
    tagline: "큰 화면으로 다 같이",
    can: ["영화 보기", "유튜브 같이 보기", "게임 화면 띄우기"],
    cta: "뭐 볼까?",
    open: true,
    tone: "sky",
  },
  {
    id: "board",
    name: "보드게임",
    emoji: "🎲",
    tagline: "인기 게임 12종 대기 중",
    can: ["친구들과 한 판", "추천 게임 고르기", "토너먼트 열기"],
    cta: "게임 고르기",
    open: true,
    tone: "lime",
  },
  {
    id: "loft",
    name: "복층 공간",
    emoji: "📚",
    tagline: "1층은 수다, 2층은 쉼",
    can: ["책 읽기", "누워서 쉬기", "친구랑 이야기"],
    cta: "공간 구경하기",
    open: true,
    tone: "navy",
  },
];

export type Recommendation = {
  id: string;
  title: string;
  sub: string;
  emoji: string;
  spaceId: string;
  tone: "primary" | "lime" | "sky";
};

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    title: "오늘은 댄스실 어때?",
    sub: "거울 앞에서 안무 한 곡 완성하기",
    emoji: "🕺",
    spaceId: "dance",
    tone: "primary",
  },
  {
    id: "r2",
    title: "친구랑 보드게임 한 판?",
    sub: "요즘 제일 많이 하는 게임 골라줄게",
    emoji: "🎲",
    spaceId: "board",
    tone: "lime",
  },
  {
    id: "r3",
    title: "빔프로젝터로 영화 볼 사람?",
    sub: "복층에 앉아서 크게 보기",
    emoji: "🎬",
    spaceId: "beam",
    tone: "sky",
  },
];

export type Program = {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  target: string;
  capacity: number;
  joined: number;
  emoji: string;
  status: "모집중" | "마감임박" | "마감";
};

export const programs: Program[] = [
  {
    id: "p1",
    title: "차오름 댄스 챌린지",
    desc: "친구들과 팀을 만들어 춤춰보자! 영상은 연말 파티에서 상영돼.",
    date: "9월 12일 (토)",
    time: "15:00 - 17:00",
    target: "중학생 누구나",
    capacity: 20,
    joined: 14,
    emoji: "🕺",
    status: "모집중",
  },
  {
    id: "p2",
    title: "보드게임 데이",
    desc: "복층 2층 통째로 보드게임장. 혼자 와도 팀 짜줌.",
    date: "9월 9일 (수)",
    time: "16:00 - 18:30",
    target: "중1~중3",
    capacity: 24,
    joined: 22,
    emoji: "🎲",
    status: "마감임박",
  },
  {
    id: "p3",
    title: "금요 영화 상영회",
    desc: "빔프로젝터로 다 같이 영화 한 편. 투표로 작품 결정!",
    date: "9월 11일 (금)",
    time: "17:00 - 19:00",
    target: "중학생 누구나",
    capacity: 30,
    joined: 11,
    emoji: "🎬",
    status: "모집중",
  },
  {
    id: "p4",
    title: "자유 창작 워크숍",
    desc: "그림, 영상, 굿즈 뭐든 만들어보는 시간. 재료는 차오름이 준비.",
    date: "9월 19일 (토)",
    time: "14:00 - 16:00",
    target: "중1~중2 우선",
    capacity: 16,
    joined: 6,
    emoji: "🎨",
    status: "모집중",
  },
  {
    id: "p5",
    title: "연말 공모전 사전 설명회",
    desc: "2026 CHAON 공모전 준비하는 법 알려줄게.",
    date: "9월 26일 (토)",
    time: "15:00 - 16:00",
    target: "참가 희망자",
    capacity: 40,
    joined: 40,
    emoji: "🏆",
    status: "마감",
  },
];

export type Mission = {
  id: string;
  title: string;
  hint: string;
  point: number;
  emoji: string;
  badge?: string;
  daily: boolean;
};

export const missions: Mission[] = [
  {
    id: "m1",
    title: "친구와 함께 차오름 방문하기",
    hint: "둘 다 앱에서 완료 누르면 인정!",
    point: 10,
    emoji: "🤝",
    badge: "친구왕",
    daily: true,
  },
  {
    id: "m2",
    title: "보드게임 한 판 하기",
    hint: "어떤 게임이든 OK",
    point: 10,
    emoji: "🎲",
    badge: "게임왕",
    daily: true,
  },
  {
    id: "m3",
    title: "댄스실에서 춤추기",
    hint: "30초만 춰도 인정",
    point: 10,
    emoji: "🕺",
    badge: "댄서",
    daily: true,
  },
  {
    id: "m4",
    title: "책 10페이지 읽기",
    hint: "복층 2층이 제일 조용해",
    point: 5,
    emoji: "📖",
    badge: "독서왕",
    daily: true,
  },
  { id: "m5", title: "차오름에서 사진 찍기", hint: "커뮤니티에 올려도 좋아", point: 5, emoji: "📸", daily: true },
  {
    id: "m6",
    title: "차오름 첫 방문하기",
    hint: "대야동 주민센터 2층",
    point: 20,
    emoji: "🚪",
    badge: "첫 방문",
    daily: false,
  },
  {
    id: "m7",
    title: "프로그램에 친구와 함께 참여하기",
    hint: "프로그램 탭에서 신청",
    point: 20,
    emoji: "🎉",
    badge: "이벤트 참가자",
    daily: false,
  },
  { id: "m8", title: "새로운 친구와 인사하기", hint: "용기 내기 +1", point: 10, emoji: "👋", daily: false },
];

export const allBadges = [
  { id: "첫 방문", emoji: "🚪", desc: "차오름에 처음 왔어요" },
  { id: "댄서", emoji: "🕺", desc: "댄스실 미션 완료" },
  { id: "게임왕", emoji: "🎲", desc: "보드게임 미션 완료" },
  { id: "독서왕", emoji: "📖", desc: "복층에서 책 읽기" },
  { id: "친구왕", emoji: "🤝", desc: "친구와 함께 방문" },
  { id: "이벤트 참가자", emoji: "🎉", desc: "프로그램 참여" },
  { id: "차온 개근러", emoji: "🔥", desc: "한 달 4회 이상 방문" },
];

export type Post = {
  id: string;
  nickname: string;
  avatar: string;
  place: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  liked?: boolean;
};

export const seedPosts: Post[] = [
  {
    id: "c1",
    nickname: "달려라감자",
    avatar: "🥔",
    place: "보드게임",
    time: "12분 전",
    text: "오늘 친구들이랑 보드게임함 🎲 마지막에 역전당해서 개억울",
    likes: 24,
    comments: 5,
  },
  {
    id: "c2",
    nickname: "춤추는곰",
    avatar: "🐻",
    place: "댄스실",
    time: "1시간 전",
    text: "댄스실에서 안무 연습했어. 거울 크니까 진짜 잘 보임",
    likes: 41,
    comments: 8,
  },
  {
    id: "c3",
    nickname: "복층지박령",
    avatar: "👻",
    place: "복층 공간",
    time: "3시간 전",
    text: "복층에서 책 읽는 중… 여기 자리 진짜 편함",
    likes: 12,
    comments: 2,
  },
  {
    id: "c4",
    nickname: "영화광민",
    avatar: "🍿",
    place: "빔프로젝터",
    time: "어제",
    text: "금요일 영화 상영회 같이 갈 사람? 팝콘 내가 가져감",
    likes: 33,
    comments: 11,
  },
];

export const yearEnd = {
  title: "2026 CHAON YEAR-END",
  slogan: "우리들의 연말을 만들어보자.",
  period: "2026.12.05 ~ 12.20",
  items: [
    { id: "contest", name: "공모전", emoji: "🏆", to: "/events/contest", desc: "우리 동네를 우리가 만든다" },
    { id: "market", name: "플리마켓", emoji: "🛍️", to: "/events/market", desc: "내 물건으로 부스 열기" },
    { id: "party", name: "연말파티", emoji: "🎊", to: "/events/party", desc: "1년 활동 다 모아서 한 판" },
  ],
};

export const contestCategories = [
  { id: "video", name: "영상", emoji: "🎬" },
  { id: "photo", name: "사진", emoji: "📸" },
  { id: "draw", name: "그림", emoji: "🖌️" },
  { id: "design", name: "디자인", emoji: "✏️" },
  { id: "dance", name: "댄스", emoji: "🕺" },
  { id: "idea", name: "아이디어", emoji: "💡" },
];
