export type SpaceDetail = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  photo: string;
  photoAlt: string;
  highlights: string[];
  tips: string[];
  sourceLabel: string;
  sourceUrl: string;
};

export const spaceDetails: Record<string, SpaceDetail> = {
  dance: {
    id: "dance",
    title: "댄스실",
    eyebrow: "MOVE · K-POP · CHALLENGE",
    description: "큰 거울을 보면서 안무를 맞추거나, 친구들이랑 짧은 챌린지 영상을 연습하기 좋은 공간이에요.",
    photo: "https://image.kkday.com/v2/image/get/h_650%2Cc_fit/s1.kkday.com/product_546837/20251125073444_mOums/png",
    photoAlt: "거울이 있는 한국의 댄스 연습실",
    highlights: ["전신 거울을 보며 안무 연습", "친구들과 K-POP 챌린지", "짧은 영상 촬영 아이디어"],
    tips: ["실내에서 움직이기 편한 옷을 추천해요.", "친구가 있다면 한 명은 촬영 담당으로 정해보세요."],
    sourceLabel: "관련 실제 댄스 스튜디오 사진",
    sourceUrl: "https://www.kkday.com/en/product/546837",
  },
  board: {
    id: "board",
    title: "보드게임",
    eyebrow: "PLAY · FRIENDS · GAME",
    description: "친구랑 바로 시작할 수 있는 가벼운 놀이부터 승부욕을 자극하는 게임까지, 인원에 맞춰 골라보세요.",
    photo: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=85",
    photoAlt: "친구들이 함께 보드게임을 하는 모습",
    highlights: ["2~6명 정도로 같이 놀기", "게임 규칙을 몰라도 함께 배우기", "팀전으로 약속 만들기"],
    tips: ["처음 만난 친구라면 10~20분짜리 게임부터 추천해요.", "게임을 정했다면 같이 놀기 약속을 바로 만들어보세요."],
    sourceLabel: "관련 실제 보드게임 사진",
    sourceUrl: "https://unsplash.com/s/photos/board-games",
  },
  beam: {
    id: "beam",
    title: "빔프로젝터",
    eyebrow: "WATCH · MUSIC · TOGETHER",
    description: "큰 화면으로 영화나 유튜브를 같이 보고, 친구들과 보고 싶은 콘텐츠를 정해서 시간을 보내는 공간이에요.",
    photo: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85",
    photoAlt: "영화를 함께 볼 수 있는 상영 공간",
    highlights: ["영화·영상 같이 보기", "보고 싶은 콘텐츠 투표", "친구들과 함께 쉬기"],
    tips: ["보고 싶은 콘텐츠를 미리 2~3개 골라보세요.", "상영할 콘텐츠는 차오름 이용 규칙에 맞는지 확인해요."],
    sourceLabel: "관련 실제 상영 공간 사진",
    sourceUrl: "https://unsplash.com/s/photos/projector-room",
  },
  loft: {
    id: "loft",
    title: "복층 공간",
    eyebrow: "CHILL · TALK · REST",
    description: "친구와 편하게 이야기하거나 잠깐 쉬고 싶을 때 찾기 좋은 아늑한 분위기의 공간이에요.",
    photo: "https://hokkaidolikers.com/uploads/2025/10/650_34897-1194-38c1d93425bc28ab8e18b685b050e562-3900x2600-1.jpg",
    photoAlt: "친구들이 책을 보며 쉬는 아늑한 라운지",
    highlights: ["친구와 편하게 이야기", "책이나 휴대폰으로 쉬기", "조용히 혼자 쉬기"],
    tips: ["친구들과 대화할 때는 다른 이용자를 배려해 주세요.", "여유롭게 쉬고 싶다면 약속 장소로 먼저 정해보세요."],
    sourceLabel: "관련 실제 라운지 사진",
    sourceUrl: "https://hokkaidolikers.com/archives/91502",
  },
};
