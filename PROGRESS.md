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

**Milestone 2 (after 1.5): Search a character, see real data** — mock `Character` type → lifting state up → FastAPI (`/health`, `/character/{name}`) → `fetch()` with loading/error states → Nexon API key in `.env` → real character data. Still no LLM.

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
| Font | Noto Sans KR via `next/font/google` | Clean, round, readable Korean font close to the reference; self-hosted by Next.js |
| Icons | Emoji for now | Zero setup; later switch to image assets (MapleStory-style) or an icon library (a decision to make together) |
| Theme colors | `maple-cream`, `maple-orange`, `maple-blue`, `maple-ink` in `@theme` | One place to tune the palette; names describe their role |

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
- Header: the right side is now one frosted bar the same height as the logo (`h-16`): nav links with a solid blue active pill, a divider, a 한국어 | EN segmented toggle (from an array + active value, same pattern as the sidebar), and the mushroom avatar.

---

## Next Step

### Layer 1.5-8 — Art pass

Replace emoji stand-ins with real MapleStory-style images: sky/forest background, mushroom mascots (sidebar, search banner, AI card), and illustrated icons.

**What I need to do first:** collect image files (PNG with transparent background is best) and put them in `frontend/public/images/`.

**Concepts:** the `public/` folder (files served at `/images/...`), Next.js `<Image>` component (`next/image`), CSS background images.

**Then:** Milestone 2 — real character data (mock data → FastAPI → Nexon API).
