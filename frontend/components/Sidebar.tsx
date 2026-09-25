type NavItem = {
  icon: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: "🏠", label: "대시보드" },
  { icon: "🧑", label: "캐릭터 분석" },
  { icon: "💡", label: "AI 성장 분석" },
  { icon: "📊", label: "What-if 시뮬레이터" },
  { icon: "⚔️", label: "장비 분석" },
  { icon: "⭐", label: "유니온 분석" },
  { icon: "🔮", label: "HEXA 분석" },
  { icon: "👹", label: "보스 가이드" },
  { icon: "📖", label: "지식 베이스" },
  { icon: "⚙️", label: "설정" },
];

const activeLabel = "대시보드";

export default function Sidebar() {
  return (
    <aside className="w-60 p-6 pr-0">
      <nav className="rounded-2xl bg-white p-3 shadow-md">
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
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
