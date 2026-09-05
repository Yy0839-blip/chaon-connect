export type LocalEvent = {
  id: string;
  month: "9월" | "10월";
  title: string;
  date: string;
  time?: string;
  place: string;
  audience: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const localEvents: LocalEvent[] = [
  {
    id: "siheung-breaking-battle-2026",
    month: "9월",
    title: "2026 시흥 브레이킹 배틀",
    date: "2026.09.12",
    time: "13:00–21:00",
    place: "은계호수공원 야외무대",
    audience: "청소년·청년·지역주민",
    description: "키즈 배틀, 체험부스, 스트릿 문화와 쇼케이스가 함께 열리는 시흥 브레이킹 행사",
    sourceLabel: "시흥시 공식 안내 보도자료 기반",
    sourceUrl: "https://www.welfarehello.com/community/hometownNews/0a8d05d8-ec39-45d8-bd2a-1e08a96a3c4e",
  },
  {
    id: "daeya-lantern-festival-2026",
    month: "9월",
    title: "2026 다시 대야로 등불축제",
    date: "2026.09.11–09.12",
    time: "9/12 청소년 예술 무대 15:00–17:00",
    place: "대야삼2어린이공원 일원",
    audience: "대야동 주민·청소년·지역주민",
    description: "등불 터널·포토존·문화공연·주민 체험이 열리고, 9월 12일에는 청소년 예술 무대도 진행돼요.",
    sourceLabel: "시흥시·시흥시도시재생지원센터 행사 안내",
    sourceUrl: "https://www.korea.info/news/view.php?no=4922",
  },
  {
    id: "siheung-youth-center-september-craft",
    month: "9월",
    title: "한가위, 손끝에 담다",
    date: "2026.09.19",
    time: "10:30–12:00 / 14:00–15:30",
    place: "시흥시청소년수련관 1층 흥다방",
    audience: "9~16세 청소년",
    description: "기와등과 클레이 명절 다과상을 만들어보는 추석 맞이 청소년 프로그램",
    sourceLabel: "시흥시청소년수련관 공식 안내",
    sourceUrl: "https://www.shyouth.or.kr/shcs/board/read?boardManagementNo=40&boardNo=22744&menuLevel=2&menuNo=354",
  },
  {
    id: "siheung-youth-club-festival",
    month: "10월",
    title: "2026 시흥시청소년동아리축제",
    date: "2026.10.17",
    place: "시흥시청소년수련관",
    audience: "시흥시 청소년·청년·지역주민",
    description: "문화예술·사회문화·스포츠 등 다양한 동아리가 함께 만드는 청소년 축제",
    sourceLabel: "시흥시청소년수련관 공식 사업 안내",
    sourceUrl: "https://www.shyouth.or.kr/base/contents/view?contentsNo=489&menuLevel=2&menuNo=657",
  },
];

export const nearbyYouthFacilities = [
  {
    id: "siheung-youth-center",
    name: "시흥시청소년수련관",
    distanceLabel: "대야동",
    address: "경기도 시흥시 은행로 179",
    phone: "031-315-1890",
    description: "청소년 활동·동아리·교육·공간 이용을 지원하는 청소년 시설",
    sourceUrl: "https://www.shyouth.or.kr/shcs/main/view",
  },
  {
    id: "siheung-youth-counseling",
    name: "시흥시청소년상담복지센터 상담팀",
    distanceLabel: "대야동",
    address: "경기도 시흥시 은행로 179, 별관 1층",
    phone: "031-318-7100",
    description: "청소년 상담과 복지 지원을 받을 수 있는 공간",
    sourceUrl: "https://www.shyouth.or.kr/base/main/view",
  },
  {
    id: "siheung-youth-activity-center",
    name: "시흥시청소년활동진흥센터",
    distanceLabel: "신천동",
    address: "시흥시 신천로79번길 21 청소년꿈터 1층",
    phone: "031-404-7141",
    description: "청소년 활동과 소통 공간 정보를 확인할 수 있는 시설",
    sourceUrl: "https://www.shyouth.or.kr/base/main/view",
  },
];
