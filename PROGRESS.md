# Progress Log

A running record of what we've built, what I learned, and what's next.
Update this at the end of every layer.

---

## Current Status

**Milestone 1: Frontend visual skeleton** ✅ Complete

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
| 8 | Basic Tailwind styling (pastel, rounded, shadows) | ✅ Done |
| 9 | Responsive 2-column grid + sidebar hidden on phones | ✅ Done |

Milestone 1 rules: **no** Nexon API, FastAPI, database, LLM, LangGraph, or RAG.

**Milestone 1.5: Match the reference (empty state)** — chosen over going straight to the backend, because the reference screenshot *is* an empty state (all values `-`), so it can be built without data. Same rules as Milestone 1 (no API, no backend).

| Layer | Topic | Key concepts | Status |
|---|---|---|---|
| 1.5-1 | 캐릭터 정보: portrait placeholder, name/level row, 4 stat badges | `.map()` over objects, nested flex | ✅ Done |
| 1.5-2 | 캐릭터 정보: 6 tabs (기본 정보, 스탯, 장비, 유니온, 헥사, 보스 이력) | `useState` for the active tab, conditional classes | ✅ Done |
| 1.5-3 | 캐릭터 정보: 2-column info table (월드, 직업, HP, MP…) with `-` values | Grid, `<dl>`/`<dt>`/`<dd>` | ✅ Done |
| 1.5-4 | 주요 장비 미리보기: 9 colorful `+` slots, "전체 장비 보기" link | Generating repeated items, grid columns | ✅ Done |
| 1.5-5 | AI 성장 분석 + What-if: dashed empty-state boxes, "제공 예정 기능" list | A reusable `EmptyState` component, optional props | ✅ Done |
| 1.5-6 | AI 코치: subtitle, empty-state box, message input + send button | Controlled input again, Client Component | ✅ Done |
| 1.5-7 | Header nav pills + avatar; sidebar "업데이트 예정" box | Reusing patterns | ✅ Done |
| 1.5-8 | Art pass: background scenery, mascots, illustrated icons | `public/` folder, `next/image`, background images | ⏭️ Next (needs image files) |

**Milestone 2: Search a character, see real data** (in progress) — still no LLM, database, LangGraph, or RAG. Data source: KMS via Nexon Open API.

| Layer | Topic | Key concepts | Status |
|---|---|---|---|
| 2-1 | FastAPI setup + `GET /health` | venv, endpoint, decorator, JSON, `/docs` | ✅ Done |
| 2-2 | `GET /character/{name}` returning mock data | Path parameters, Pydantic models | ✅ Done |
| 2-3 | Share the searched nickname across the page | Lifting state up | ⏭️ Next |
| 2-4 | Frontend calls the backend with `fetch()` | `async`/`await`, loading & error states, CORS | ⬜ |
| 2-5 | Nexon API key stored safely | Environment variables, `.env`, secrets stay on the backend | ⬜ |
| 2-6 | Backend calls Nexon: nickname → `ocid` → basic info | External API calls, `httpx`, async Python | ⬜ |
| 2-7 | Handle failures | Not found, rate limits, Nexon down; HTTP status codes; friendly errors | ⬜ |
| 2-8 | Show real data in the cards | Replace `-` with real values; remote character image | ⬜ |
| 2-9 | First automated tests | pytest for backend endpoints | ⬜ |

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
│   │   ├── layout.tsx ← shell around every page (<html>, <body>, metadata, font)
│   │   ├── page.tsx   ← the "/" page
│   │   └── globals.css← loads Tailwind + our maple-* theme colors
│   ├── components/    ← reusable UI pieces (not routes)
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── CharacterSearch.tsx  ← first Client Component
│   │   ├── Card.tsx             ← reusable card frame (icon, title, optional subtitle + action, children)
│   │   ├── EmptyState.tsx       ← dashed "캐릭터를 검색하면…" box
│   │   ├── CharacterInfoCard.tsx
│   │   ├── CharacterTabs.tsx    ← client: active tab state
│   │   ├── EquipmentPreviewCard.tsx
│   │   ├── WhatIfCard.tsx
│   │   ├── AIAnalysisCard.tsx
│   │   └── AICoachCard.tsx
│   ├── public/        ← static files (images)
│   ├── tsconfig.json  ← TypeScript settings (defines the @/ alias)
│   └── package.json   ← dependencies + scripts (npm run dev)
└── backend/           ← FastAPI (Python 3.13)
    ├── .venv/         ← virtual environment (not committed; like node_modules)
    ├── .gitignore     ← ignores .venv, __pycache__, .env
    ├── main.py        ← the FastAPI app and its endpoints
    └── requirements.txt ← exact package versions (pip freeze)
```

## How to Start the App

```powershell
# Frontend (terminal 1)
cd frontend
npm run dev                      # → http://localhost:3000

# Backend (terminal 2)
cd backend
.\.venv\Scripts\Activate.ps1     # prompt should show (.venv)
uvicorn main:app --reload        # → http://localhost:8000  (docs: /docs)

# Stop a server: Ctrl+C   |   leave the venv: deactivate (or close the terminal)
```

First-time backend setup on a new machine:

```powershell
cd backend
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
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
| Font | Noto Sans KR via `next/font/google` | Clean, round, readable Korean font close to the reference; self-hosted by Next.js |
| Icons | Emoji for now | Zero setup; later switch to image assets (MapleStory-style) or an icon library (a decision to make together) |
| Theme colors | `maple-cream`, `maple-orange`, `maple-blue`, `maple-ink` in `@theme` | One place to tune the palette; names describe their role |
| Game data source (Milestone 2) | Korean MapleStory (KMS) via Nexon Open API | Most complete official API (character, stats, equipment, Union, HEXA); matches the Korean UI and terms. GMS has no comparable official API. Confirm endpoints and rate limits when getting the API key |
| Python version (Milestone 2) | Install a current Python (3.12/3.13) alongside 3.9 | 3.9 is end-of-life (Oct 2025); current FastAPI may not support it |

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

### Layer 8 — Tailwind styling

**8a Built:** Replaced the starter theme and dark mode in `globals.css` with our own pastel colors; restyled `Card` (one edit → all five cards became white, rounded, shadowed); removed the scaffolding border from `<main>`.

**8b/8c Built:** Noto Sans KR font; white header with an orange 🍁 logo and a pill language badge; sidebar panel with emoji icons, a highlighted active item, and hover; search hero banner with a golden border, rounded input with a blue focus border, and a blue button with hover. As an exercise I added an `icon` prop to `Card` and passed an icon from every card.

**Learned:**
- **`@theme` custom colors:** `--color-maple-orange: #ff9a3c;` automatically creates `bg-maple-orange`, `text-maple-orange`, `border-maple-orange`, ... One place to change the palette. Tailwind only outputs CSS for classes actually used.
- Theme colors are also CSS variables: `background-color: var(--color-maple-cream);` in plain CSS. Text color set on `body` is inherited by everything.
- **Reading long `className`s:** sort classes into families — shape (`rounded-*`), color (`bg-*`, `text-*`, `border-*`), spacing (`p-*`, `px-*`, `py-*`, `m-*`, `mt-*`, `mb-*`, `gap-*`), text (`text-sm…2xl`, `font-medium/bold/extrabold`), depth (`shadow-sm…xl`), layout (`flex`, `items-center`), state (`hover:`, `focus:`).
- **Padding vs margin:** padding = space inside the element's edge; margin = space outside, pushing neighbors away.
- **States:** `hover:bg-blue-600`, `focus:border-maple-blue` — any class can be prefixed. If removing the default focus outline (`outline-none`), always provide a visible replacement focus style.
- Tailwind palette shades: `50` (palest) → `950` (darkest), e.g. `bg-amber-50`, `border-amber-300`, `text-gray-500`.
- **Array of objects:** `type NavItem = { icon: string; label: string }`, `const navItems: NavItem[] = [{ icon: "🏠", label: "대시보드" }, ...]`. Read fields with `item.label` (like a Python dict). `key={item.label}`.
- **Conditional classes:** template string + ternary: `` className={`base classes ${isActive ? "active classes" : "hover:..."}`} ``. Use `===` for equality (not `==`).
- **`next/font/google`** downloads the font at build time and serves it from our app (no request to Google). Its `className` on `<html>` applies it everywhere.
- **Emoji** are text characters (Win + `.` opens the picker). They look different per OS and can't be recolored.
- **`<h2>` is a block element:** anything placed before it ends up on its own line and doesn't get its styles. Put the icon *inside* the heading.
- **JSX whitespace:** `{icon} {title}` on one line keeps the space; line breaks are not kept as spaces. `flex gap-2` gives precise spacing. React inserts `<!-- -->` between adjacent text values (invisible).
- Changing a component's required props makes TypeScript flag every place that uses it — a safe way to update all call sites.

### Layer 9 — Responsive 2-column grid

**Built:** Search banner full-width on top, then a grid with two column wrappers (left: 캐릭터 정보, 장비, What-if; right: AI 성장 분석, AI 코치). As an exercise I hid the sidebar on phones with `hidden md:block`.

**Learned:**
- **Grid vs Flex:** flex = one direction (a line of items); grid = columns *and* rows (page layouts). `grid-cols-2` = two equal columns (`repeat(2, minmax(0, 1fr))`).
- **Column wrappers:** one `<div>` per column so each side stacks independently (grid rows would otherwise force neighboring cards to equal heights).
- **Responsive breakpoints are mobile first:** unprefixed class = smallest screens; `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px add overrides for wider screens. `lg:` compiles to `@media (min-width: 64rem)`. Ask "what do I want on the smallest screen?" → that's the unprefixed class (`hidden md:block`, not `block md:hidden`).
- **When a Tailwind class does nothing:** (1) check spelling — `className` is just a string, so typos like `hiddden` give no error; (2) stale CSS — hard refresh, then restart `npm run dev`. The project lives in OneDrive, which can interfere with file watching.
- **Tailwind CSS IntelliSense** VS Code extension: autocomplete + hover preview for classes.

**Milestone 1 complete.** ✅

---

## Milestone 1.5 Log — Match the reference (empty state)

I asked Claude to build this milestone for me: CSS/Tailwind detail isn't where I want to spend learning time, and I'd already learned the core React concepts. Claude explains only the *new* React/TypeScript ideas.

**Built (Layers 1.5-1 to 1.5-7):**
- Sky-to-cream background gradient (`maple-sky` theme color).
- `Card`: new optional `subtitle` and `action` props.
- `EmptyState`: reusable dashed box with an icon and a multi-line message.
- 캐릭터 정보: portrait placeholder, name/level row, 4 stat badges, and `CharacterTabs` (6 tabs, 기본 정보 shows a 2-column info table; other tabs show an empty state).
- 주요 장비 미리보기: 9 pastel `+` slots and a "전체 장비 보기 →" button.
- What-if / AI 성장 분석 / AI 코치: subtitles, empty states, "제공 예정 기능" list, and a working chat input (clears on send, send button disabled when empty).
- Header: two-line logo, nav pills (홈 · 가이드 · 자주 묻는 질문), language button, avatar button. Sidebar: mascot speech bubble and "업데이트 예정" box. Search banner: speech bubble and decorations.
- Dashboard changed from two independent columns to **two rows** so heights match: row 1 = 캐릭터 정보 | AI 성장 분석, row 2 = (장비 + What-if) | AI 코치. Grid rows stretch items to the tallest one; `Card` wraps children in `flex flex-1 flex-col` and `EmptyState` has `flex-1`, so the dashed boxes grow into the extra space. `grid-rows-[auto_1fr]` (Tailwind arbitrary value) gives 장비 its natural height and What-if the rest.
- Checked with real browser screenshots at desktop and narrow widths.

**New concepts to know:**
- **Optional props:** `subtitle?: string` — the `?` means "may be omitted". Inside the component it's `string | undefined`, so render it conditionally: `{subtitle && <p>{subtitle}</p>}`.
- **JSX as a normal prop:** `action?: React.ReactNode` lets a parent pass a whole element (the "전체 장비 보기" button) into a specific slot of `Card`. `children` is just the default slot; you can have named slots too.
- **Keep Client Components small:** only `CharacterTabs` needs `"use client"` (it has state). `CharacterInfoCard` stays a Server Component and simply renders `<CharacterTabs />` inside it.
- **Tabs = state + conditional rendering:** `const [activeTab, setActiveTab] = useState("기본 정보")`; each tab button calls `setActiveTab(tab.label)` on click; the panel uses a ternary on `activeTab`. `onClick={() => setActiveTab(tab.label)}` wraps the call in an arrow function so it runs *on click*, not during render.
- **Accessibility for tabs:** `role="tablist"`, `role="tab"`, `aria-selected={...}` tell screen readers these buttons are tabs and which is active.
- **Nested arrays:** `string[][]` = an array of arrays (two columns of labels), rendered with a `.map()` inside a `.map()`.
- **`.find()`, `?.`, `??`:** `tabs.find(t => t.label === activeTab)?.icon ?? "📋"` — find the first matching item; `?.` safely reads `.icon` even if nothing was found (`undefined`); `??` supplies a fallback when the left side is `undefined`/`null`.
- **`disabled={!message.trim()}`:** the send button is disabled while the input is empty or only spaces. `.trim()` removes surrounding whitespace; `!` means "not".
- **Early `return` in a handler:** `if (!message.trim()) return;` stops the function before sending an empty message.
- **Dynamic Tailwind classes must be complete strings:** `"border-pink-200 bg-pink-50"` works; building `` `bg-${color}-50` `` does **not**, because Tailwind scans source text for full class names.
- **Index as key:** `key={index}` is acceptable only for static lists that never reorder (the 9 slots). Prefer a real unique value otherwise.
- **Line breaks in text:** `"첫 줄\n둘째 줄"` + `whitespace-pre-line` renders the `\n` as a line break.
- **Semantic list for label/value pairs:** `<dl>` (description list) with `<dt>` (term, e.g. 월드) and `<dd>` (value, e.g. `-`).
- **Positioning:** `relative` on the banner + `absolute -top-5 -left-4` on the 🌸 places decorations relative to the banner's corner. `aria-hidden="true"` hides purely decorative emoji from screen readers.

### Layer 1.5-8 — Art pass (in progress)

**Built:** Full-page MapleStory background (`public/images/background2.png`, a softer replacement for the first `background.png`) and a pixel-art sword icon for 주요 장비 미리보기 (`public/images/equipment.png`). The logo got a frosted-white pill so it stays readable over the busy background.

**Learned:**
- **`public/` folder:** a file at `frontend/public/images/x.png` is served at the URL `/images/x.png` (no `public` in the path).
- **`next/image` `<Image>`:** automatically resizes and converts to WebP (our 2.2 MB PNG became ~175 KB at 1920px). `fill` + `sizes="100vw"` + `object-cover` makes it cover its parent; the parent is `fixed inset-0 -z-10` (pinned to the screen, behind everything). `alt=""` marks it as decorative.
- In Next.js 16, `priority` is **deprecated** → use `loading="eager"` (or `preload`) for important above-the-fold images.
- **Widening a prop type:** `icon: React.ReactNode` (was `string`) accepts both emoji strings and `<Image>` elements, so existing cards didn't need changes.
- **Pixel art:** `unoptimized` skips resizing (tiny file; resizing would blur it) and `[image-rendering:pixelated]` keeps edges crisp when scaled.
- `bg-white/80` = white at 80% opacity; `backdrop-blur` blurs what's behind it (frosted glass).

**Mushroom mascot + header redesign:**
- `mushroom.png` had a lot of empty transparent space around it, so a trimmed copy `mushroom-trimmed.png` (693×619) is used; the original is untouched.
- New `components/Mushroom.tsx` wraps `<Image>` with a `size` prop and keeps the aspect ratio (`height = size × 619/693`). Used in 5 places: header avatar, 캐릭터 정보 icon, search banner corner, sidebar speech bubble, AI 성장 분석 empty state. One component = change the image once, it updates everywhere.
- `EmptyState`'s `icon` widened to `React.ReactNode` (same trick as `Card`).
- Sidebar icons: cut the 10 icons out of the `sidebaricons.png` sheet into `public/images/icons/*.png` (each trimmed, centered on a square, resized to 128×128, ~20–30 KB). `NavItem.icon` (emoji) became `NavItem.iconSrc` (a file path), rendered with `<Image width={28} height={28} />`.
- 캐릭터 정보 stat badges: 4 icons cut from `charactericons.png` → `icons/stat-power.png`, `stat-union.png`, `stat-hexa.png`, `stat-popularity.png`.
- `CharacterTabs` reuses sidebar icons (스탯 → `whatif.png`, 장비 → `equipment.png`, 유니온 → `union.png`, 헥사 → `hexa.png`, 보스 이력 → `boss.png`) and 기본 정보 → `slime.png`. Every tab now has an image, so `iconSrc` is required again (the temporary emoji-fallback helper was removed).
- Header logo 🍁 → `icons/logo.png`; nav 홈 → `dashboard.png`, 가이드 → `knowledge.png`, 자주 묻는 질문 → `question.png` (the temporary emoji fallback was removed once every link had an image).
- Lightbulb 💡 → sidebar `ai.png` in the AI 성장 분석 card title and the search banner's "지금 바로" bubble.
- AI 코치 채팅: card title and empty-state icons → `icons/chat.png` (256px); send button ➤ → `icons/chatsend.png` (paper airplane).
- Removed the 🌸 decoration from the search banner's top-left corner. ✨ on "제공 예정 기능" stays by choice.
- What-if empty state 📈 → `icons/simulation.png`; search banner title 🍁 → `icons/logo.png`; 분석하기 button 🔍 → `icons/search.png`.
- 캐릭터 정보 portrait placeholder 👤 → `icons/character-placeholder.png`; What-if card icon → `whatif.png` (its empty-state 📈 stays until a new icon arrives).
- New source images (`logo.png`, `character.png`, `slime.png`, 1254×1254) were trimmed and resized to 256/256/128px copies in `icons/`.
- Header: the right side is now one frosted bar the same height as the logo (`h-16`): nav links with a solid blue active pill, a divider, a 한국어 | EN segmented toggle (from an array + active value, same pattern as the sidebar), and the mushroom avatar.

**Milestone 1.5 complete.** ✅ (Art pass done: background, mushroom mascot, and illustrated icons everywhere except ✨ on 제공 예정 기능, kept by choice.)

---

## Milestone 2 Log — Search a character, see real data

Back to full teaching mode: explain → small piece → run → explain → I try something.

### Layer 2-1 — FastAPI setup + `GET /health`

**Built:** Installed Python 3.13 (alongside 3.9). Created `backend/` with a virtual environment, installed FastAPI + Uvicorn, recorded versions in `requirements.txt`, and wrote `main.py` with `GET /health`. As exercises I renamed the function to `check_server` and added `GET /hello`.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def check_server():
    return {"status": "ok"}
```

**Learned:**
- **Why a backend:** the API key must stay secret. Anything in frontend code is visible in the browser, so the backend is a middleman that holds the key and talks to Nexon (and later the LLM).
- **`py` launcher:** `py --list` shows installed Pythons; `py -3.13` picks a version.
- **Virtual environment (`.venv`)**: a private package folder for one project (like `node_modules`). It doesn't contain Python itself — `pyvenv.cfg` points to the real Python 3.13 (`home = ...Python313`); only `Lib/site-packages` is private. Never committed.
- **Activation** puts `.venv\Scripts` at the front of **PATH**, so `python`/`pip` mean the project's copies. Without activation, `python` = global 3.9. Always check for `(.venv)` before `pip install`.
- PowerShell: run scripts with `.\` (`.\.venv\Scripts\Activate.ps1`); without it, `.venv\...` is parsed as `Module\Command`.
- **FastAPI vs Uvicorn:** FastAPI = the framework I write endpoints with; Uvicorn = the server that listens on port 8000 and passes requests to the app. `uvicorn main:app --reload` = load `app` from `main.py`, auto-restart on save.
- **Endpoint** = HTTP method + path → function. `GET` = read data. Returning a dict → FastAPI sends JSON with status **200**; unknown paths → **404** `{"detail": "Not Found"}`.
- **Decorator:** `@app.get("/health")` above a function = `func = app.get("/health")(func)`. `app.get(path)` returns a "register" function (a **closure** remembering the path) that adds a row `GET /health → func` to the app's routing table and returns the function unchanged. Non-decorator equivalent: `app.add_api_route("/health", func, methods=["GET"])`.
- The **URL comes from the decorator string**, not the function name. The name is just a label (shown as the title in `/docs`).
- `/docs` = automatic interactive API documentation.
- `pip freeze` records exact versions; `pip install -r requirements.txt` recreates the environment. ⚠️ In Windows PowerShell 5.1, `>` writes **UTF-16** (GitHub shows it as binary). Use `pip freeze | Out-File -Encoding utf8 requirements.txt` instead (or `>` in Git Bash).

### Layer 2-2 — `GET /character/{name}` with mock data

**Built:** A `Character` Pydantic model and `GET /character/{name}`, which returns fake character data using the name from the URL. Also fixed `requirements.txt`, which PowerShell had saved as UTF-16.

```python
class Character(BaseModel):
    name: str
    level: int
    job: str
    world: str
    guild: str | None = None

@app.get("/character/{name}")
def get_character(name: str) -> Character:
    return Character(name=name, level=285, job="아크메이지(불,독)", world="스카니아", guild="메이플코치")
```

**Learned:**
- **Path parameters:** `{name}` in the path is matched by name to the function parameter (`/character/DreamHero` → `name="DreamHero"`). One route covers every nickname. Type hints are enforced: a wrong type → automatic **422** error.
- **Pydantic `BaseModel`** = Python's version of a TypeScript `type`. `str | None = None` ≈ `guild?: string` (optional, defaults to nothing).
- **Difference from TypeScript:** TS types vanish at runtime; Pydantic **validates at runtime** (`level="abc"` → error). Important for data from Nexon.
- **`-> Character` (response model):** FastAPI validates, converts to JSON, and documents the exact response shape in `/docs`. This is the **contract** the frontend will rely on.
- **Mock first:** build the whole data flow with fake data, then swap in Nexon later without changing the shape.
- Pydantic came installed with FastAPI (FastAPI is built on it).

---

## Next Step

### Layer 2-3 — Share the searched nickname across the page (lifting state up)

Right now `searchedName` lives inside `CharacterSearch`, but `CharacterInfoCard` also needs it. Components can't read each other's state — so we move the state **up** to their common parent (`page.tsx`) and pass it **down** as props.

**Concepts:**
1. **Lifting state up** — state lives in the closest common parent
2. **Passing functions as props** — the child calls `onSearch(nickname)` to tell the parent
3. Why `page.tsx` then needs `"use client"` (or a small client wrapper component)

**Expected result:** Searching a nickname makes the 캐릭터 정보 card show that nickname instead of `-`. Still no backend call (that's Layer 2-4).
