import Image from "next/image";
import Card from "@/components/Card";
import CharacterTabs from "@/components/CharacterTabs";
import Mushroom from "@/components/Mushroom";

type StatBadge = {
  iconSrc: string;
  label: string;
};

const statBadges: StatBadge[] = [
  { iconSrc: "/images/icons/stat-power.png", label: "전투력" },
  { iconSrc: "/images/icons/stat-union.png", label: "유니온" },
  { iconSrc: "/images/icons/stat-hexa.png", label: "헥사 레벨" },
  { iconSrc: "/images/icons/stat-popularity.png", label: "인기도" },
];

export default function CharacterInfoCard() {
  return (
    <Card title="캐릭터 정보" icon={<Mushroom size={32} />}>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex h-44 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-center sm:w-44">
          <Image src="/images/icons/character-placeholder.png" alt="" width={72} height={72} />
          <p className="text-sm text-gray-500">
            캐릭터를 검색하면
            <br />
            정보가 표시됩니다.
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4">
          <div>
            <p className="text-2xl font-bold">-</p>
            <p className="mt-1 text-sm text-gray-500">Lv. - &nbsp;|&nbsp; - &nbsp;|&nbsp; -</p>
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statBadges.map((badge) => (
              <li
                key={badge.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-gray-100 py-3 shadow-sm"
              >
                <Image src={badge.iconSrc} alt="" width={30} height={30} />
                <span className="text-xs text-gray-500">{badge.label}</span>
                <span className="font-bold">-</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CharacterTabs />
    </Card>
  );
}
