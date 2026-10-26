<!--
====================================================================
📌 [GitHub About 설정 가이드]
- Description: Next.js & Supabase 기반의 모던 독서 기록 및 도서 리뷰 웹 플랫폼
- Website: https://bookreview-eight.vercel.app
- Topics: nextjs, typescript, supabase, tailwindcss, shadcn-ui, book-review, web-app, vercel
====================================================================
-->

# 📚 BookReview: Modern Book Log & Review Platform

<p align="center">
  <img src="https://img.shields.io/badge/Vercel-Live%20Demo-black?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Backend%20%2F%20DB-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

> **읽은 책을 체계적으로 아카이빙하고, 평점과 깊이 있는 감상평을 기록하고 공유할 수 있는 풀스택 모던 독서 기록 웹 플랫폼**  
> Supabase 실시간 데이터베이스와 Next.js App Router 아키텍처를 기반으로 구축되었습니다.

🔗 **라이브 데모:** [bookreview-eight.vercel.app](https://bookreview-eight.vercel.app)

---

## 📌 Key Highlights

- **도서 검색 및 서지 정보 관리**: 도서 제목, 저자, 출판사 정보 연동 및 맞춤형 도서 등록.
- **별점 및 리뷰 아카이빙**: 감명 깊은 문장(Quote), 별점 평가, 독서 메모를 한눈에 볼 수 있는 타임라인 뷰 제공.
- **Supabase 인증 및 실시간 DB**: 사용자별 세션 분리, 실시간 데이터 동기화 및 RLS(Row Level Security) 적용.
- **모던 인터페이스**: Tailwind CSS 및 shadcn/ui 기반의 깔끔하고 직관적인 카드형 UI.

---

## 🛠 Tech Stack

| 구분 | 기술 스택 |
| :--- | :--- |
| **Frontend** | Next.js (App Router), React, TypeScript |
| **Backend & Database** | Supabase (PostgreSQL, Auth, RLS) |
| **Styling & UI** | Tailwind CSS, Radix UI (shadcn/ui), Lucide Icons |
| **Deployment** | Vercel (`bookreview-eight.vercel.app`) |

---

## 🚀 Getting Started

### 1. Repository Clone
```bash
git clone https://github.com/yj2da/bookreview.git
cd bookreview
```

### 2. 의존성 설치
```bash
pnpm install # 또는 npm install
```

### 3. 환경변수 설정 (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 로컬 개발 서버 실행
```bash
pnpm dev
# 브라우저에서 http://localhost:3000 접속
```

---

## 👩‍💻 Author
* **오예진 (Oh Yejin)** - Full-Stack & Product Specialist  
* Email: [yejin.6642@gmail.com](mailto:yejin.6642@gmail.com) | GitHub: [@yj2da](https://github.com/yj2da)
