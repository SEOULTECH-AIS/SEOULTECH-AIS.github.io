<h1 align="center">AIS Lab Homepage</h1>

![Header Logo](public/assets/images/Logo1.png)

AIS (Autonomous Intelligent Systems) Lab 홈페이지 프로젝트.

## 1. 프로젝트 개요

React 기반 연구실 홈페이지. 

Google Antigravity(https://antigravity.google/) 및 Google AI Studio(https://aistudio.google.com/) 를 활용하여 제작.

데이터와 UI 로직을 분리하여 유지보수성을 높였으며, 
TypeScript를 도입하여 타입 안정성 확보.

## 2. 기술 스택

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React

## 3. 폴더 구조 및 아키텍처

프로젝트는 유지보수의 용이성을 위해 다음과 같이 구조화.

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트 (Navbar, Footer 등)
├── data/           # 페이지에 표시되는 정적 데이터 파일 (JSON 형태의 TS 파일)
├── pages/          # 라우트별 페이지 컴포넌트
├── services/       # 데이터 로직 처리 (예: PeopleService)
├── types/          # 데이터 인터페이스 정의 (TypeScript 타입)
├── App.tsx         # 메인 라우팅 설정
└── main.tsx        # 진입점
```

### 주요 변경 사항 (Refactoring)

- **데이터 분리**: 모든 콘텐츠 데이터는 컴포넌트 내부에 하드코딩되지 않고 `src/data/` 폴더 내의 `.ts` 파일로 분리됨.
- **타입 정의**: `src/types/` 폴더에 데이터 구조에 대한 인터페이스가 정의.
- **페이지 구조**:
  - `Courses`, `Projects`, `Publications` 등 주요 페이지는 상단 탭(Tab) 네비게이션 구조로 통일.
  - `Publications`는 연도별 그룹화 및 카테고리 필터링(Int./Dom. Journal/Conference) 기능 포함.

## 4. 유지보수 및 데이터 수정 가이드

다음 작업자는 UI 코드를 건드리지 않고 `src/data/` 폴더의 파일만 수정하여 콘텐츠를 업데이트할 수 있다.

### 4.1 구성원 (People) 수정
- 파일: `src/data/people.ts`
- `professor`, `members`, `alumni` 배열에 객체를 원칙에 맞춰 추가/수정. (이미지 경로는 `public/` 폴더 기준 혹은 URL)

### 4.2 논문 (Publications) 수정
- 파일: `src/data/publications.ts`
- 구조:
  ```typescript
  {
    id: 'unique-id',
    title: '논문 제목',
    venue: '학회/저널명',
    year: 2024,
    category: 'international-conference', // 'international-journal', 'domestic-journal', 'domestic-conference' 중 택 1
    author: '저자 목록',
    doi: '10.xxxx/...' // 선택 사항 (DOI만 입력, URL 아님)
  }
  ```

### 4.3 프로젝트 (Projects) 수정
- 파일: `src/data/projects.ts`
- `category` 필드: `'ongoing'`, `'completed-gov'`, `'completed-industry'` 중 선택.

### 4.4 수업 (Courses) 수정
- 파일: `src/data/courses.ts`
- `category` 필드: `'undergraduate'`, `'graduate'`, `'capstone'` 중 선택.

## 5. 설치 및 실행

### 필수 요건
- Node.js (v18 이상 권장)

### 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 6. 기타 참고사항

- **이미지**: 로컬 이미지는 `public/images/` 디렉토리에 위치시키고 참조하는 것을 권장함. 현재 일부는 외부 링크나 레거시 경로를 사용 중일 수 있음.
- **아이콘**: `lucide-react` 라이브러리를 사용 중. 새로운 아이콘 필요 시 https://lucide.dev/icons 참고.

- **웹 효과 설명** https://boisterous-malasada-221258.netlify.app/ 참고.

![Footer Logo](public/assets/images/AIS_logo.png)
