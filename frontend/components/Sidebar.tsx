import Image from "next/image";
import Mushroom from "@/components/Mushroom";

type NavItem = {
  iconSrc: string;
  label: string;
};

const navItems: NavItem[] = [
  { iconSrc: "/images/icons/dashboard.png", label: "대시보드" },
  { iconSrc: "/images/icons/character.png", label: "캐릭터 분석" },
  { iconSrc: "/images/icons/ai.png", label: "AI 성장 분석" },
  { iconSrc: "/images/icons/whatif.png", label: "What-if 시뮬레이터" },
  { iconSrc: "/images/icons/equipment.png", label: "장비 분석" },
  { iconSrc: "/images/icons/union.png", label: "유니온 분석" },
  { iconSrc: "/images/icons/hexa.png", label: "HEXA 분석" },
  { iconSrc: "/images/icons/boss.png", label: "보스 가이드" },
  { iconSrc: "/images/icons/knowledge.png", label: "지식 베이스" },
  { iconSrc: "/images/icons/settings.png", label: "설정" },
];

const activeLabel = "대시보드";

const upcomingUpdates: string[] = ["길드 분석", "주간 리포트", "이벤트 추천"];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-5 p-6 pr-0 md:flex">
      <nav className="rounded-3xl bg-white p-3 shadow-md">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 ${
                item.label === activeLabel
                  ? "bg-blue-50 font-bold text-maple-blue"
                  : "hover:bg-maple-cream"
              }`}
            >
              <Image src={item.iconSrc} alt="" width={28} height={28} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-end gap-2 px-1">
        <Mushroom size={64} className="shrink-0 drop-shadow-md" />
        <p className="rounded-2xl rounded-bl-none bg-white px-3 py-2 text-xs leading-relaxed shadow-sm">
          더 똑똑한
          <br />
          메이플 라이프를
          <br />
          함께해요!
        </p>
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-md">
        <p className="text-sm font-bold text-green-700">업데이트 예정</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-gray-600">
          {upcomingUpdates.map((update) => (
            <li key={update} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-green-500" />
              <span>{update}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
