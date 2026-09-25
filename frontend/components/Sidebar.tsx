const navItems: string[] = [
  "대시보드",
  "캐릭터 분석",
  "AI 성장 분석",
  "What-if 시뮬레이터",
  "장비 분석",
  "유니온 분석",
  "HEXA 분석",
  "보스 가이드",
  "지식 베이스",
  "설정",
];

export default function Sidebar() {
  return (
    <aside className="w-56 border p-4">
      <nav>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
