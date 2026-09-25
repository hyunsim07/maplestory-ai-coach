import Card from "@/components/Card";

// Full class names (not built from pieces) so Tailwind can find them when scanning.
const slotColors: string[] = [
  "border-pink-200 bg-pink-50",
  "border-amber-200 bg-amber-50",
  "border-orange-200 bg-orange-50",
  "border-violet-200 bg-violet-50",
  "border-rose-200 bg-rose-50",
  "border-yellow-200 bg-yellow-50",
  "border-indigo-200 bg-indigo-50",
  "border-fuchsia-200 bg-fuchsia-50",
  "border-red-200 bg-red-50",
];

export default function EquipmentPreviewCard() {
  return (
    <Card
      title="주요 장비 미리보기"
      icon="🗡️"
      action={
        <button
          type="button"
          className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-maple-blue hover:bg-blue-100"
        >
          전체 장비 보기 →
        </button>
      }
    >
      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-9">
        {slotColors.map((color, index) => (
          <li
            key={index}
            aria-label="빈 장비 슬롯"
            className={`flex aspect-square items-center justify-center rounded-xl border-2 text-xl text-gray-400 ${color}`}
          >
            +
          </li>
        ))}
      </ul>
    </Card>
  );
}
