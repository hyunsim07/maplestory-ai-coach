# Progress Log

A running record of what we've built, what I learned, and what's next.
Update this at the end of every layer.

---

## Current Status

**Milestone 1: Frontend visual skeleton** (in progress)

| Layer | Topic | Status |
|---|---|---|
| 0 | Install Node.js | ✅ Done |
| 1 | Empty Next.js app | ✅ Done |
| 2 | Basic page structure | ✅ Done |
| 3 | `Header` + `Sidebar` components (own files, import/export) | ✅ Done |
| 4 | Sidebar navigation links (list rendering) | ⏭️ Next |
| 5 | `CharacterSearch` (state + events) | ⬜ |
| 6 | `Card` component + empty 캐릭터 정보 card | ⬜ |
| 7 | Remaining empty cards (장비, What-if, AI 분석, AI 코치) | ⬜ |
| 8 | Basic Tailwind styling (pastel, rounded, shadows) | ⬜ |
| 9 | Responsive 2-column grid | ⬜ |

Milestone 1 rules: **no** Nexon API, FastAPI, database, LLM, LangGraph, or RAG.

---

## Project Structure

```text
maplestory-ai-coach/
├── CLAUDE.md          ← teaching rules for the AI assistant
├── PROGRESS.md        ← this file
├── references/
│   └── frontend.png   ← visual target for the UI
├── frontend/          ← Next.js app
│   ├── app/
│   │   ├── layout.tsx ← shell around every page (<html>, <body>, metadata)
│   │   ├── page.tsx   ← the "/" page
│   │   └── globals.css← loads Tailwind
│   ├── components/    ← reusable UI pieces (not routes)
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── public/        ← static files (images)
│   ├── tsconfig.json  ← TypeScript settings (defines the @/ alias)
│   └── package.json   ← dependencies + scripts (npm run dev)
└── backend/           ← FastAPI (later milestone, not created yet)
```

---

## Decisions Made

| Decision | Choice | Why |
|---|---|---|
| Repo layout | `frontend/` + `backend/` | Keep Next.js and FastAPI separate and clean |
| Next.js options | TypeScript, Tailwind, ESLint, `app/` router, no `src/`, `@/*` alias | Planned stack; fewest folders to think about |
| Artwork | MapleStory-style art (and Nexon assets) allowed | Matches the reference's cute RPG feel; comes in the polish phase |
| UI language | Korean first, translation-friendly structure | i18n (`ko.json` / `en.json`) comes later |
| Line endings | Skipped `.gitattributes` for now | LF/CRLF warnings are harmless; add it when Docker/other machines arrive |
| Equipment preview | Added as a 6th placeholder section | It takes a real slot in the final grid layout |

---

## Layer Log

### Layer 0 — Install Node.js

**Built:** Installed Node.js v24.19.0 (LTS) and npm 11.17.0.

**Learned:**
- Node.js runs JavaScript outside the browser (like `python` for `.py` files).
- npm installs packages (like `pip`); `package.json` lists them (like `requirements.txt`).
- After installing a program, terminals must be reopened to find it.

### Layer 1 — Empty Next.js app

**Built:** Generated the app with `create-next-app`, replaced the starter page with our own title, and updated `layout.tsx` (title, description, `lang="ko"`).

**Learned:**
- A **React component** is a function that returns UI. Names start with a capital letter.
- **JSX** is HTML-like syntax inside TypeScript. A component returns one outer element.
- **`export default`** is how Next.js finds the page in `app/page.tsx`.
- **`layout.tsx`** wraps every page; Next.js passes the page in as `{children}`.
- `{ }` inside JSX switches back to JavaScript.
- `metadata` becomes the `<title>` and `<meta>` tags.
- **Hot reload:** saving a file updates the browser automatically. If it stops, hard refresh with Ctrl+Shift+R.
- **Git:** `node_modules/` is excluded by `.gitignore` because it can be re-downloaded with `npm install`. LF/CRLF warnings are harmless.

**Commit:** `b4c3e12 chore: scaffold Next.js frontend with Typescript and Tailwind`

### Layer 2 — Basic page structure

**Built:** Header, sidebar, and a main area with six placeholder sections:
캐릭터 검색 · 캐릭터 정보 · 주요 장비 미리보기 · What-if 시뮬레이터 · AI 성장 분석 · AI 코치 채팅

```text
div (flex-col)
├── header
└── div (flex row)
    ├── aside (w-56)
    └── main (flex-1, flex-col) → 6 sections
```

**Learned:**
- **Semantic tags:** `<header>`, `<aside>`, `<main>`, `<section>` describe *meaning*; `<div>` is only for layout. They look the same but help screen readers, search engines, and readability.
- A `<section>` should eventually have an `<h2>` heading.
- **Tailwind spacing scale:** number × 4px (`p-4` = 16px, `p-10` = 40px). Same scale for `m-`, `gap-`, `w-`, `h-`.
- `border`, `p-4` (padding inside), `gap-4` (space between children), `w-56`, `min-h-screen`.
- **Flexbox:** `flex` = row, `flex-col` = column, `flex-1` = take the leftover space.
- The vertical stack is intentional: it's the mobile layout. The 2-column grid comes in Layer 9.

**Noticed for later:** `className="border p-4"` is repeated six times. A reusable `Card` component will fix this in Layer 6.

**Commit:** `59edd0e completed Layer 3` (this commit contains the Layer 2 work)

### Layer 3 — `Header` and `Sidebar` components

**Built:** Moved the header into `components/Header.tsx` (added a static `한국어 / EN` label on the right). Then I built `components/Sidebar.tsx` myself following the same pattern.

```text
page.tsx (Home)
├── <Header />    ← components/Header.tsx
└── div (row)
    ├── <Sidebar />  ← components/Sidebar.tsx
    └── main → 6 sections
```

**Learned:**
- **One component, one file.** `components/` holds reusable UI; `app/` holds routes (pages).
- **`export default` + `import`** connect files: `import Header from "@/components/Header";` (like Python's `from ... import ...`).
- **`<Header />`** tells React to call `Header()` and insert what it returns. Capital letter = my component; lowercase = HTML tag (`<Header />` ≠ `<header>`). `/>` = self-closing tag.
- **`@/` vs `../`:**
  - `..` is a *direction* ("go up from this file"), so the right path depends on where the importing file sits.
  - `@/` is a *nickname* defined in `tsconfig.json` (`"@/*": ["./*"]`). `./` is relative to `tsconfig.json`, which lives in `frontend/`, so `@/` always = `frontend/`, from any file.
  - `frontend/` is its own world for Next.js; it doesn't know about the repo root or `backend/`.
- **Flex alignment:** `justify-between` pushes children to opposite ends; `items-center` centers them vertically. In a row, `justify-` = horizontal, `items-` = vertical.

---

## Next Step

### Layer 4 — Sidebar navigation links (list rendering)

Fill the sidebar with the navigation items from the reference (대시보드, 캐릭터 분석, AI 성장 분석, What-if 시뮬레이터, 장비 분석, 유니온 분석, HEXA 분석, ...).

**Concepts:**
1. Storing data in an **array** (and TypeScript's array type)
2. **List rendering** with `.map()` — turning an array of data into JSX
3. The **`key`** prop, and semantic `<nav>` / `<ul>` / `<li>`

**Files:**
```text
frontend/components/Sidebar.tsx   ← changes
```

**Expected result:** The sidebar shows a vertical list of navigation labels, generated from an array. Not clickable yet.
