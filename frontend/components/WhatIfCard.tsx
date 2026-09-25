import Image from "next/image";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";

export default function WhatIfCard() {
  return (
    <Card
      title="What-if 시뮬레이터"
      icon={<Image src="/images/icons/whatif.png" alt="" width={32} height={32} />}
      subtitle="예산과 목표를 설정하면 다양한 성장 시나리오를 시뮬레이션해볼 수 있어요."
    >
      <EmptyState
        icon={<Image src="/images/icons/simulation.png" alt="" width={72} height={72} />}
        message={"캐릭터를 검색하면\n시뮬레이터를 이용할 수 있어요."} />
    </Card>
  );
}
