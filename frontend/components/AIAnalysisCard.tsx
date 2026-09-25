import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import Mushroom from "@/components/Mushroom";

const upcomingFeatures: string[] = [
  "현재 캐릭터 상태 분석",
  "보스 컨텐츠(하드 루시드 등) 목표에 맞는 성장 우선순위",
  "장비/스탯/유니온/헥사 등 종합 분석",
  "예산 대비 효율적인 성장 방향 제시",
];

export default function AIAnalysisCard() {
  return (
    <Card title="AI 성장 분석" icon="💡">
      <EmptyState icon={<Mushroom size={72} />} message={"캐릭터를 검색하면\nAI가 성장 방향을 분석해드립니다."} />

      <div className="mt-4 flex gap-4 rounded-2xl bg-violet-50 p-5">
        <span className="text-2xl">✨</span>
        <div>
          <p className="font-bold">제공 예정 기능</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-gray-600">
            {upcomingFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
