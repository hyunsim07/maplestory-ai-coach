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
| 4 | Sidebar navigation links (list rendering) | ✅ Done |
| 5 | `CharacterSearch` (form UI, then state + events) | ✅ Done |
| 6 | `Card` component + empty 캐릭터 정보 / AI 분석 cards (props, children, conditional rendering) | ✅ Done |
| 7 | Remaining empty cards (장비, What-if, AI 코치) | ✅ Done |
| 8 | Basic Tailwind styling (pastel, rounded, shadows) | ⏭️ Next |
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
│   │   ├── Sidebar.tsx
│   │   ├── CharacterSearch.tsx  ← first Client Component
│   │   ├── Card.tsx             ← reusable card frame (title + children)
│   │   ├── CharacterInfoCard.tsx
│   │   ├── EquipmentPreviewCard.tsx
│   │   ├── WhatIfCard.tsx
│   │   ├── AIAnalysisCard.tsx
│   │   └── AICoachCard.tsx
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

### Layer 4 — Sidebar navigation links (list rendering)

**Built:** The sidebar shows 10 menu labels (대시보드 … 설정), generated from an array with `.map()`. Not clickable yet.

```tsx
const navItems: string[] = ["대시보드", "캐릭터 분석", ...];

{navItems.map((item) => (
  <li key={item}>{item}</li>
))}
```

**Learned:**
- **Array + type:** `const navItems: string[] = [...]` — like a Python list; `string[]` = "array of strings", so TypeScript rejects a number in it.
- Data that never changes lives **outside** the component function (not rebuilt on every render, easy to find).
- **`.map()`** turns each array item into JSX and returns a new array (like a Python list comprehension). React renders an array of JSX in order.
- **Arrow function:** `(item) => (...)` — a short function, like Python's `lambda`.
- **`key`** lets React tell list items apart when the list changes. Must be unique among siblings, goes on the outermost element inside `.map()`, and never appears in the HTML. Missing keys cause a console warning.
- **`<nav>` / `<ul>` / `<li>`**: navigation block / unordered list / list item. Tailwind removes the default bullets.
- Keeping labels in an array separates **data** from **layout** and makes translation (ko/en) easy later.
### Layer 5 — `CharacterSearch` component

**5a Built:** Static search UI: `<h2>`, description, and a `<form>` with an `<input>` and a submit `<button>`. Submitting reloaded the page (the browser's default form behavior).

**5b Built:** Made it interactive. Typing is stored in state, submitting no longer reloads, and the nickname is logged to the browser console. As an exercise I added a `searchedName` state that shows `마지막 검색: ...` after submit.

```text
Type "DreamHero" → onChange (per keystroke) → setNickname → nickname = "DreamHero"
Press Enter      → onSubmit → handleSubmit(event)
                                ├─ event.preventDefault()   → no page reload
                                ├─ console.log(nickname)
                                └─ setSearchedName(nickname) → "마지막 검색: DreamHero"
```

**Learned:**
- **`<form>` / `<input>` / `<button type="submit">`**: Enter or clicking submits the form. `<input />` must be self-closed in JSX. `placeholder` = gray hint text.
- **Server vs Client Components:** Components are Server Components by default (browser receives HTML only, no interactivity). `"use client"` at the top of a file also ships its JavaScript to the browser so it can use state and events. Only mark the components that need it. Anything in a Client Component is visible to the user (never put secrets there).
- **`useState`:** `const [nickname, setNickname] = useState("");` gives a component memory that survives re-renders. Read with `nickname`; change only with `setNickname(...)`, which stores the value **and** tells React to re-render. Hooks (`use...`) only work in Client Components.
- **Controlled input:** `value={nickname}` + `onChange`. React state is the single source of truth, so React can also *write* to the box (e.g. `setNickname("")` clears it). Without `value`, React can only read.
- **Events / callbacks:** `onChange={(event) => ...}` hands React a function to call later; React creates the `event` object and passes it in (like tkinter's `bind`). The parameter name is my choice (`event`, `e`, ...). `event.target.value` = the input's text.
- **`onSubmit={handleSubmit}`** — pass the function, don't call it (`handleSubmit()` would run immediately during render).
- **`event.preventDefault()`** cancels the browser's default action (the page reload).
- **Types:** `React.SubmitEvent<HTMLFormElement>` for a form submit event. (`FormEvent` is deprecated in our React types.) `onChange`'s `event` type is inferred automatically.
- `console.log` output from a Client Component appears in the **browser** console (F12), not the VS Code terminal.

**Noticed for later:**
- `마지막 검색:` shows even before any search → needs **conditional rendering**.
- `searchedName` lives inside `CharacterSearch`, but the 캐릭터 정보 / AI 분석 cards will need it too → **lifting state up** (later).

### Layer 6 — `Card` component, props, children, conditional rendering

**Built:**
- `components/Card.tsx`: a generic card frame (`<section>`, `<h2>{title}</h2>`, `{children}`). Card styling now lives in **one place**.
- `components/CharacterInfoCard.tsx`: `<Card title="캐릭터 정보">` + empty-state message.
- I built `components/AIAnalysisCard.tsx` myself with the same pattern.
- Fixed the dangling `마지막 검색:` label with conditional rendering.

```text
page.tsx               CharacterInfoCard.tsx            Card.tsx
<CharacterInfoCard /> → <Card title="캐릭터 정보">   →   <section>
                          <p>empty message</p>            <h2>{title}</h2>
                        </Card>                           {children}
                                                        </section>
```

**Learned:**
- **Props** are a component's arguments. `<Card title="캐릭터 정보">` → React calls `Card({ title: "캐릭터 정보", children: ... })`. Unpack with `function Card({ title, children })`.
- **`children`** = whatever is written between `<Card>` and `</Card>`. The component decides where to place it with `{children}` (same pattern as `layout.tsx`).
- Normal props for simple values; `children` for chunks of UI.
- **Typing props:** `type CardProps = { title: string; children: React.ReactNode; }`. TypeScript then catches a missing `title`, a wrong type (`title={42}`), or a typo (`titel`) before running.
- **Generic vs specific components:** `Card` knows nothing about characters (reused everywhere); `CharacterInfoCard` holds the character-specific content (will grow).
- **Conditional rendering with `&&`:** `{searchedName && <p>...</p>}` — like Python's `and`. `""` is falsy → renders nothing; a non-empty string is truthy → renders the `<p>`. React re-evaluates it on every render, so I describe the UI for each state instead of manually showing/hiding.
- **Either-or with a ternary:** `{cond ? <A /> : <B />}` — like Python's `a if cond else b`. Cards will use this for "empty state vs data".
- **Gotcha:** `{0 && <p/>}` renders `0`. With numbers, write explicit conditions like `{level > 0 && ...}`.

### Layer 7 — Remaining empty cards

**Built (by me):** `EquipmentPreviewCard`, `WhatIfCard`, `AICoachCard`, each using `<Card>` with an empty-state message. `page.tsx` now has no raw `<section>` tags.

```tsx
<main>
  <CharacterSearch />
  <CharacterInfoCard />
  <EquipmentPreviewCard />
  <WhatIfCard />
  <AIAnalysisCard />
  <AICoachCard />
</main>
```

**Learned:**
- `page.tsx` now describes **what** is on the page; each component file handles **how**. It reads like the wireframe.
- Semantic heading outline: one `<h1>` (app name) and an `<h2>` per section.
- `CharacterSearch` intentionally does **not** use `Card`: it's a hero banner with its own look.

---

## Next Step

### Layer 8 — Basic Tailwind styling

Structure is done; now give it the cute, pastel, rounded MapleStory feel. Still no grid (that's Layer 9).

**Concepts:**
1. **Colors** — Tailwind's color palette (`bg-orange-50`, `text-amber-900`) and defining our own theme colors in `globals.css`
2. **Card look** — `rounded-2xl`, `shadow-md`, `bg-white`, borders
3. **Typography** — `text-xl`, `font-bold`, and a Korean-friendly font

**Files:**
```text
frontend/app/globals.css        ← remove starter dark mode, add our color theme
frontend/app/layout.tsx         ← font
frontend/components/Card.tsx    ← one edit restyles all five cards
frontend/components/Header.tsx, Sidebar.tsx, CharacterSearch.tsx
```

**Expected result:** A soft pastel page with white rounded cards, clear headings, and a styled search bar. Cards still stacked vertically.
