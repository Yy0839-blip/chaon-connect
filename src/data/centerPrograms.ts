export type CenterProgram = {
  id: string;
  title: string;
  desc: string;
  target: string;
  emoji: string;
  status: "모집중" | "마감임박" | "마감";
};

// 차오름 공식 운영진이 확정한 일정만 여기에 연결합니다.
// 임의의 날짜·모집인원은 표시하지 않습니다.
export const centerPrograms: CenterProgram[] = [];
