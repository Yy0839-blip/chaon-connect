export type Song = {
  id: string;
  title: string;
  artist: string;
  mood: string;
};

export const dailySongs: Song[] = [
  { id: "song-1", title: "Dynamite", artist: "방탄소년단", mood: "신나게" },
  { id: "song-2", title: "Super Shy", artist: "NewJeans", mood: "가볍게" },
  { id: "song-3", title: "Magnetic", artist: "ILLIT", mood: "통통 튀게" },
  { id: "song-4", title: "한 페이지가 될 수 있게", artist: "DAY6", mood: "청춘 느낌" },
];
