# CHAON Supabase 연결

현재 코드는 Supabase가 설정되지 않아도 기존 localStorage 방식으로 동작하고, Supabase 환경변수가 들어오면 자동으로 공유 백엔드로 전환됩니다.

## 1. Supabase 프로젝트 생성

Supabase에서 새 프로젝트를 만든 뒤 SQL Editor에서 `schema.sql` 전체를 한 번 실행합니다.

## 2. 익명 로그인 활성화

Supabase Dashboard → Authentication → Sign In / Providers에서 **Anonymous Sign-Ins**를 활성화합니다.

CHAON은 회원가입 화면을 먼저 요구하지 않고, 익명 사용자 ID를 만들어 기기별 사용자를 구분합니다.

## 3. 앱 환경변수

`.env.local`에 아래 두 값을 넣습니다.

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Supabase Dashboard → Project Settings → API에서 URL과 publishable/anon key를 확인할 수 있습니다.

## 4. 현재 공유되는 데이터

- 커뮤니티 게시글
- 게시글 좋아요 수
- 같이 놀 약속
- 프로필 닉네임 / 아바타 / 취향 태그
- 음악 추천곡
- 음악 투표 기록

게시글과 약속은 Realtime 구독을 사용하므로 다른 기기에서 새 데이터가 등록되면 화면 데이터도 갱신됩니다.

## 5. 아직 로컬에 남는 데이터

미션 완료, 일부 포인트 계산, 프로그램/행사 참여 기록 등은 아직 브라우저 상태를 사용합니다. 다음 단계에서 사용자 계정/포인트와 함께 서버 저장으로 옮길 수 있습니다.

## 주의

`VITE_SUPABASE_ANON_KEY`는 클라이언트에 포함되는 공개 키이며, 데이터 보호는 반드시 Supabase RLS 정책으로 합니다. `service_role` 키는 절대 앱 코드나 `.env`에 넣지 않습니다.
