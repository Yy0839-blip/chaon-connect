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
  image?: string;
};

export const seedPosts: Post[] = [
  { id: "c1", nickname: "달려라감자", avatar: "🥔", place: "보드게임", time: "12분 전", text: "오늘 친구들이랑 보드게임함. 마지막에 역전당해서 개억울", likes: 24, comments: 5 },
  { id: "c2", nickname: "춤추는곰", avatar: "🐻", place: "댄스실", time: "1시간 전", text: "댄스실에서 안무 연습했어. 거울 크니까 진짜 잘 보임", likes: 41, comments: 8 },
  { id: "c3", nickname: "복층지박령", avatar: "👻", place: "복층 공간", time: "3시간 전", text: "복층에서 책 읽는 중… 여기 자리 진짜 편함", likes: 12, comments: 2 },
  { id: "c4", nickname: "영화광민", avatar: "🍿", place: "빔프로젝터", time: "어제", text: "금요일 영화 상영회 같이 갈 사람? 팝콘 내가 가져감", likes: 33, comments: 11 },
];
