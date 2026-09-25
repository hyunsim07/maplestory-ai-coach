import Image from "next/image";
import Mushroom from "@/components/Mushroom";

type HeaderLink = {
  label: string;
  iconSrc: string;
};

const headerLinks: HeaderLink[] = [
  { label: "홈", iconSrc: "/images/icons/dashboard.png" },
  { label: "가이드", iconSrc: "/images/icons/knowledge.png" },
  { label: "자주 묻는 질문", iconSrc: "/images/icons/question.png" },
];

const activeLink = "홈";

const languages: string[] = ["한국어", "EN"];
const activeLanguage = "한국어";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-6 pt-5 pb-1">
      <h1 className="flex h-16 items-center gap-3 rounded-3xl bg-white/85 px-5 text-xl leading-tight font-extrabold shadow-md ring-1 ring-white backdrop-blur">
        <Image src="/images/icons/logo.png" alt="" width={40} height={40} />
        <span>
          <span className="block text-maple-orange">MapleStory</span>
          <span className="block text-maple-ink">AI Coach</span>
        </span>
      </h1>

      <div className="flex h-16 items-center gap-2 rounded-3xl bg-white/85 px-2.5 shadow-md ring-1 ring-white backdrop-blur">
        <nav className="hidden items-center gap-1 md:flex">
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                link.label === activeLink
                  ? "bg-maple-blue text-white shadow-sm"
                  : "text-gray-600 hover:bg-blue-50 hover:text-maple-blue"
              }`}
            >
              <Image src={link.iconSrc} alt="" width={22} height={22} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <span className="mx-1 hidden h-7 w-px bg-gray-200 md:block" />

        <div className="flex rounded-2xl bg-gray-100 p-1 text-xs font-bold">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className={`rounded-xl px-3 py-1.5 transition-colors ${
                language === activeLanguage
                  ? "bg-white text-maple-ink shadow-sm"
                  : "text-gray-400 hover:text-maple-ink"
              }`}
            >
              {language}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="내 계정"
          className="flex items-center gap-1 rounded-2xl py-1 pr-2 pl-1 transition-colors hover:bg-orange-50"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 ring-2 ring-orange-200">
            <Mushroom size={30} />
          </span>
          <span className="text-xs text-gray-400">▾</span>
        </button>
      </div>
    </header>
  );
}
