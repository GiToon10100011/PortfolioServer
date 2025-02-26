# 🎮 Nintendo Switch 콘솔 컨셉 포트폴리오 웹사이트

![포트폴리오 메인 이미지](https://jinu-sportfolioconsole.web.app/logo/main_logo.png)

## 📋 프로젝트 정보

- **개발 기간**: 2024.12 ~ 2025.01
- **개발자**: 전진우 (프론트엔드 개발자)
- **배포 주소**: [https://jinu-sportfolioconsole.web.app](https://jinu-sportfolioconsole.web.app)

## 🎯 프로젝트 소개

### 목적 및 용도

이 프로젝트는 닌텐도 스위치 콘솔을 모티브로 한 개인 포트폴리오 웹사이트입니다. 사용자에게 게임 콘솔과 유사한 인터랙티브한 경험을 제공하면서 개발자의 프로젝트와 기술 스택을 소개합니다. 특히 부트업 화면부터 프로젝트 상세 정보까지 게임 콘솔의 사용자 경험을 웹에서 구현하는 데 중점을 두었습니다.

### 기술 스택

#### 프론트엔드

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

#### 백엔드

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

#### 배포

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## ✨ 주요 기능

### 1. 부트업 화면

- 사용자 경험을 위한 애니메이션 부트업 화면 구현
- 반응형/데스크톱 환경에 따른 다른 부트업 로직
- 프로그레스 바를 통한 로딩 상태 표시

### 2. 프로젝트 슬라이더

- 프로젝트 간 직관적인 네비게이션
- 프로젝트 썸네일 및 상세 정보 표시
- 애니메이션 효과로 부드러운 전환

### 3. 프로젝트 상세 모달

- 각 프로젝트의 상세 정보 제공
- 기술 스택, 주요 기능, 개발 과정 설명
- 비디오 및 이미지 갤러리 통합

### 4. 방명록 시스템

- 연결 리스트 자료구조를 활용한 댓글 관리
- 프로젝트별 독립적인 댓글 시스템
- CRUD 기능 구현

```typescript
// serverPortfolio/src/comments.ts - 연결 리스트를 활용한 댓글 관리 시스템
// 각 프로젝트별로 독립적인 댓글 리스트를 관리합니다
class CommentLinkedList {
  projectLists: { [projectId: string]: Node | null } = {};
  projectCounts: { [projectId: string]: number } = {};
  constructor() {
    this.projectLists = {};
    this.projectCounts = {};
  }
  insertAt(projectId: string, index: number, data: IComment) {
    if (!this.projectLists[projectId]) {
      this.projectLists[projectId] = null;
      this.projectCounts[projectId] = 0;
    }
    // ... 연결 리스트 삽입 로직
  }
  // 기타 연결 리스트 메서드들
}
```

- 재귀 함수를 활용한 댓글 목록 렌더링

```typescript
// Portfolio/src/components/comments/CommentsList.tsx
const renderComments = (
  current: INode | null,
  depth: number = 0,
  isLastNode: boolean = true
): ReactNode => {
  // 로딩 상태 처리
  if (!current || isProjectLoading) {
    // 로딩 상태 및 빈 댓글 처리 로직
    // ...
  }

  if (!current) {
    return (
      <NoComments>
        {CommentIcons.noComments()}
        <p>
          No Comments...{" "}
          <span onClick={() => setIsModalOpen(true)}>Write One?</span>
        </p>
      </NoComments>
    );
  }

  // 현재 댓글 노드 렌더링
  const result = (
    <AnimatePresence>
      <CommentItem
        key={current.data.id}
        id={`comment-${current.data.id}`}
        variants={CommentItemVariants}
        custom={depth}
      >
        {/* 댓글 헤더 및 내용 UI */}
        {/* ... */}
        <CommentInfo>{current.data.content}</CommentInfo>
      </CommentItem>

      {/* 재귀적으로 다음 댓글 노드 렌더링 */}
      {current.next && renderComments(current.next, depth + 1, false)}
    </AnimatePresence>
  );

  // 마지막 노드 처리
  if (!current.next && isLastNode) {
    setIsProjectLoading(false);
  }

  return result;
};
```

### 5. 반응형 디자인

- 모바일, 태블릿, 데스크톱 환경 지원
- 디바이스별 최적화된 UI/UX 제공
- 화면 크기에 따른 동적 레이아웃 조정

### 6. AnimatedOutlet 컴포넌트

- 페이지 전환 시 부드러운 애니메이션 효과 제공

```typescript
// Portfolio/src/components/AnimatedOutlet.tsx
const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();
  const error = useRouteError();

  return (
    <AnimatePresence mode="wait">
      {isRouteErrorResponse(error) ? (
        <NotFound key="error" />
      ) : (
        element && React.cloneElement(element, { key: location.pathname })
      )}
    </AnimatePresence>
  );
};
```

## 📂 프로젝트 아키텍처

### 폴더 구조

```bash
Portfolio/
├── public/ # 정적 파일 (이미지, 비디오, SVG 등)
│ ├── images/ # 프로젝트 이미지
│ ├── media/ # 비디오 파일
│ ├── svgs/ # SVG 아이콘
│ └── logo/ # 로고 파일
├── src/
│ ├── components/ # 재사용 가능한 컴포넌트
│ ├── routes/ # 페이지 컴포넌트
│ ├── stores/ # Zustand 상태 관리
│ ├── styles/ # 전역 스타일 및 테마
│ ├── App.tsx # 메인 앱 컴포넌트
│ ├── Router.tsx # 라우터 설정
│ ├── Icons.tsx # SVG 아이콘 컴포넌트
│ ├── api.ts # API 호출 함수
│ └── index.tsx # 앱 진입점
└── package.json

ServerPortfolio/ # 백엔드 서버
├── src/
│ ├── comments.ts # 댓글 관리 로직
│ └── server.ts # Express 서버
└── package.json
```

### 주요 폴더 설명

| 폴더               | 설명                                                       |
| ------------------ | ---------------------------------------------------------- |
| `public/`          | 정적 리소스 파일들이 저장된 폴더                           |
| `src/components/`  | 재사용 가능한 UI 컴포넌트 (부트업 화면, 레이아웃, 모달 등) |
| `src/routes/`      | 페이지 단위 컴포넌트 (메인, 프로필, 댓글 등)               |
| `src/stores/`      | Zustand를 사용한 상태 관리 로직                            |
| `src/styles/`      | 전역 스타일 및 테마 설정                                   |
| `ServerPortfolio/` | 방명록 기능을 위한 Express 백엔드 서버                     |

## 🚀 프로젝트 설치 및 사용 방법

### 프론트엔드

**저장소 클론**

```bash
git clone https://github.com/GiToon10100011/Portfolio.git
```

**디렉토리 이동**

```bash
cd Portfolio
```

**의존성 설치**

```bash
npm install
```

**개발 서버 실행**

```bash
npm run dev
```

**빌드**

```bash
npm run build
```

**배포**

```bash
npm run deploy
```

### 백엔드

**디렉토리 이동**

```bash
cd ServerPortfolio
```

**의존성 설치**

```bash
npm install
```

**개발 서버 실행**

```bash
npm run dev
```

## 💡 배운 점

### 기술적 측면

- **연결 리스트 자료구조 활용**: 방명록 시스템에 연결 리스트를 구현하여 효율적인 데이터 관리 방법을 학습했습니다.
- **재귀적 렌더링 패턴**: 트리 구조의 데이터를 효율적으로 렌더링하는 재귀 함수
- **애니메이션 최적화**: Framer Motion을 활용한 복잡한 애니메이션 구현과 성능 최적화 기법을 익혔습니다.
- **상태 관리**: Zustand를 사용하여 전역 상태를 효율적으로 관리하는 방법을 배웠습니다.

### 디자인 측면

- **콘솔 UI/UX 구현**: 게임 콘솔의 사용자 경험을 웹에서 구현하는 방법을 연구했습니다.
- **반응형 디자인**: 다양한 디바이스에서 일관된 사용자 경험을 제공하기 위한 반응형 디자인 기법을 적용했습니다.

### 프로젝트 관리

- **모듈화 및 컴포넌트 설계**: 재사용 가능한 컴포넌트 설계와 모듈화를 통해 코드 유지보수성을 향상시켰습니다.
- **프론트엔드와 백엔드 통합**: 클라이언트와 서버 간의 효율적인 통신 방법을 구현했습니다.
- **배포 자동화**: Firebase와 AWS를 통한 배포 자동화 프로세스를 구축했습니다.
