type HeaderLink = {
  icon: string;
  label: string;
};

const headerLinks: HeaderLink[] = [
  { icon: "🏠", label: "홈" },
  { icon: "📖", label: "가이드" },
  { icon: "❓", label: "자주 묻는 질문" },
];

const activeLink = "홈";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4">
      <h1 className="flex items-center gap-2 text-2xl leading-tight font-extrabold">
        <span className="text-4xl">🍁</span>
        <span>
          <span className="block text-maple-orange">MapleStory</span>
          <span className="block text-maple-ink">AI Coach</span>
        </span>
      </h1>

      <div className="flex items-center gap-2">
        <nav className="hidden gap-1 rounded-2xl bg-white/80 p-1 shadow-sm backdrop-blur md:flex">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm ${
                link.label === activeLink
                  ? "bg-blue-50 font-bold text-maple-blue"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-medium shadow-sm backdrop-blur hover:bg-white"
        >
          한국어 / EN
        </button>

        <button
          type="button"
          aria-label="내 계정"
          className="flex items-center gap-1 rounded-2xl bg-white/80 py-1.5 pr-3 pl-1.5 shadow-sm backdrop-blur hover:bg-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-lg">
            🍄
          </span>
          <span className="text-xs text-gray-500">▾</span>
        </button>
      </div>
    </header>
  );
}
