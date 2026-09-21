# 프론트엔드 개발자 포트폴리오

체감 성능과 유지보수 구조를 함께 개선하는 프론트엔드 개발자의 포트폴리오입니다.
콘텐츠는 코드(`src/data/portfolio`)로 관리하고, 빌드 시 정적 페이지로 생성합니다.

> **라이브**: <https://text-indent9999px.vercel.app>
> **Storybook**: <https://text-indent9999px-storybook.vercel.app>

**마지막 업데이트**: 2026.09.22

## 공개 설정

공개 범위는 `src/data/portfolio/site.ts`의 `SITE`에서 한 번에 정합니다. **현재는 둘 다 꺼져 있습니다.**

| 설정                  | 현재  | 꺼져 있을 때의 동작                                                                          |
| --------------------- | ----- | -------------------------------------------------------------------------------------------- |
| `SITE.indexable`      | false | 모든 페이지에 `noindex`, `robots.txt` 전체 차단, sitemap 비움. 링크를 아는 사람만 접근합니다. |
| `SITE.resumeDownload` | false | 이력서 버튼을 감추고 `/api/resume`을 404로 막습니다(파일을 읽지도 않습니다).                  |

- 이력서 파일은 `private-files/resume.pdf`이며 `.gitignore`로 저장소에서 제외합니다. **이 저장소는 공개(public)이므로 이력서를 커밋하지 않습니다.**
- 이력서를 공개하려면 파일을 저장소 밖에서 배포 환경에 제공하는 방법을 먼저 정한 뒤 `resumeDownload`를 켭니다.
- 사이트 화면과 메타데이터에는 실명을 표시하지 않습니다. (연락처 이메일만 노출)

## 기술 스택

| 구분       | 사용 기술                                                                       |
| ---------- | ------------------------------------------------------------------------------- |
| 프레임워크 | Next.js 16 (App Router, 정적 생성), React (experimental, ViewTransition)        |
| 언어       | TypeScript 5                                                                    |
| 스타일     | Tailwind CSS 4, SCSS Modules, CSS 변수 기반 디자인 토큰                         |
| 폰트       | Quicksand(라틴) + Noto Sans KR(한글), 둘 다 가변 폰트                           |
| UI         | `src/components/ui` 자체 컴포넌트 시스템 (Button, Card, Pill, Tab, Toggle …)    |
| 문서화     | Storybook 10                                                                    |
| 기타       | Shiki(코드 하이라이트), FontAwesome                                             |

## 페이지 구성

| 경로                          | 내용                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `/`                           | 한 페이지 랜딩: Hero → Scale → Work → Experience → Skills → About → Contact            |
| `/projects/[id]`              | 프로젝트 케이스 스터디 (배경 · 구현 · 문제와 해결 · 화면/시연 · 핵심 코드)             |
| `/profile` `/projects` `/contact` | 예전 주소. 홈의 해당 섹션으로 리다이렉트                                           |
| `/api/resume`                 | 이력서 다운로드. `SITE.resumeDownload`가 꺼져 있으면 404                               |
| `/api/code/[filename]`        | 케이스 스터디의 "핵심 코드" 섹션용(허용 목록의 파일만). 현재 노출 프로젝트는 사용 안 함 |

## 콘텐츠 수정

모든 텍스트는 `src/data/portfolio/` 아래 타입이 지정된 TS 파일에 있습니다. 파일만 고치면 페이지에 반영됩니다.

| 파일               | 내용                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `site.ts`          | 연락처, 메타데이터, 공개 설정, 히어로 문구, 규모 수치(`METRICS`), 일하는 방식                 |
| `experience.ts`    | 회사별 경력. 에이전시는 프로젝트(`engagements`)와 참여 사이트 링크, 자체 서비스는 성과 목록    |
| `skills.ts`        | 기술 스택과 활용 방식                                                                         |
| `projects/*.ts`    | 프로젝트 케이스 스터디 데이터                                                                 |
| `projects/index.ts`| 화면에 노출할 프로젝트와 순서(`PROJECTS`)                                                     |

- 현재 노출 프로젝트는 **자산 분석 시뮬레이터**와 **가계부** 2개입니다. 나머지 4개(공통 UI 시스템, View Transition, 다크모드·접근성, 배달 To-Do)는 데이터 파일만 남겨 두었고, `PROJECTS` 배열에 추가하면 다시 보입니다.
- 프로젝트 이미지는 `public/assets/projects/<프로젝트>/`에 둡니다. 가계부 화면은 실기기 캡처를 목업으로 가공한 `app-01~08-*.png`와 카드용 `cover.png`를 씁니다.
- 각 프로젝트의 `stats`, `period`, `links`, `code`는 선택 항목이며 있을 때만 화면에 나옵니다.

## 폴더 구조

```
src/
├─ app/                     라우트, robots · sitemap · OG 이미지, api/
├─ components/
│  ├─ ui/                   공통 UI 컴포넌트 시스템 (스토리 포함)
│  ├─ pages/Landing/        랜딩 섹션 (Hero, Impact(Scale), Work, Experience, Skills, About, Contact)
│  ├─ pages/CaseStudy/      프로젝트 케이스 스터디
│  ├─ pages/Error, layout/  에러 페이지와 그 레이아웃 (ErrorBoundary가 사용)
│  ├─ common/               SiteHeader, SiteFooter, Reveal(스크롤 등장), PageTransition
│  └─ providers/, errorBoundary/
├─ contexts/                Device · Navigation Context (ui/Button의 useRouter가 의존)
├─ data/portfolio/          콘텐츠 데이터 (위 표 참고)
├─ hooks/                   useScrollSpy, useSectionNavigation 등
├─ styles/                  colors-*, design-tokens, elevation, motion, view-transition
└─ utils/                   cn, themeDetector(다크모드 스토어·탭 간 동기화)
```

## 시작하기

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # 코드 뷰어용 파일을 public/code로 복사한 뒤 next build
npm run start
npm run lint             # eslint . (알려진 오류: ui/의 react-hooks 규칙 11건)
npm run stylelint
npm run storybook        # http://localhost:6006
```

Node.js 20 이상을 권장합니다. 자동 테스트는 없으며, 접근성·성능은 axe-core와 Lighthouse로 직접 측정합니다.

## 환경 변수

| 이름                   | 설명                                                |
| ---------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | 절대 URL(OG·sitemap 기준). 미설정 시 기본 배포 주소 |

외부 서비스에 의존하지 않습니다. 콘텐츠는 모두 `src/data/portfolio`에 있고 빌드 시 정적 페이지로 생성됩니다.

## 설계 메모

- **정적 생성**: 서버 HTML에 콘텐츠가 그대로 들어가 첫 화면이 빠르고 공유 미리보기에 유리합니다.

- **폰트**: 스택 순서가 `Quicksand → Apple SD Gothic Neo → Noto Sans KR`이라 Mac·iOS에서는 한글 웹폰트를 내려받지 않습니다. Windows·Android에서는 한글 웹폰트(약 300KB)가 로드되어 모바일 성능 점수에는 불리합니다.
- **모션**: `prefers-reduced-motion`을 존중합니다. 스크롤 등장(Reveal)은 JS가 없거나 이미 화면 안에 있는 요소에는 적용되지 않고, 인쇄 시에는 항상 보입니다.
- **접근성**: 스킵 링크, 시맨틱 랜드마크, 키보드 포커스 표시, `aria-current` 기반 현재 섹션 표시를 갖췄습니다. 2026.09.21 측정 기준 axe-core(WCAG 2.1 AA + best-practice) 위반 0건, Lighthouse 접근성·SEO·모범사례 100점, 성능은 데스크톱 98–99 / 모바일 72–78입니다.

## 정리 이력

- 2026.09.22: Firebase 콘텐츠 구조를 쓰던 시절의 코드(예전 페이지·메뉴·스타일 가이드·커스텀 커서, `src/server`, 재검증 API, 시드 스크립트, Storybook 기본 예제)와 `firebase-admin` 의존성을 삭제했습니다. git 이력에서 복구할 수 있습니다.

## 개발 가이드

### 컴포넌트 개발 (신규 UI 컴포넌트)

1. `src/components/ui/[ComponentName]/` 폴더를 만듭니다.
2. `*.types.ts`로 타입을 정의합니다.
3. `*.stories.tsx`로 Storybook 스토리를 작성합니다.
4. `index.ts`로 export합니다.

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.config.ts   # 선택
├── ComponentName.stories.tsx
└── index.ts
```

`*.utils.ts`, `*.handlers.ts`, `variants/` 같은 분리 패턴도 쓰이므로 같은 폴더의 기존 컴포넌트를 보고 맞춥니다.

### 커밋 메시지

```
<type>: <subject>

<body> (선택)

<footer> (선택)
```

| type       | 용도                         |
| ---------- | ---------------------------- |
| `feat`     | 새로운 기능                  |
| `fix`      | 버그 수정                    |
| `docs`     | 문서 수정                    |
| `style`    | 코드 포맷팅 (동작 변경 없음) |
| `refactor` | 리팩터링                     |
| `test`     | 테스트 추가·수정             |
| `chore`    | 빌드·보조 도구·잡무          |

커밋 시 pre-commit 훅이 이 문서의 "마지막 업데이트" 날짜를 갱신합니다.

### 브랜치

- `main`: 프로덕션 배포
- `develop`: 개발
- `feature/*`: 기능 개발
- `fix/*`: 버그 수정

### 코드 스타일

ESLint(JS/TS), Stylelint(CSS/SCSS), Prettier(`.prettierrc`)를 사용합니다.
