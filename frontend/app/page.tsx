import Image from "next/image";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CharacterSearch from "@/components/CharacterSearch";
import CharacterInfoCard from "@/components/CharacterInfoCard";
import AIAnalysisCard from "@/components/AIAnalysisCard";
import EquipmentPreviewCard from "@/components/EquipmentPreviewCard";
import WhatIfCard from "@/components/WhatIfCard";
import AICoachCard from "@/components/AICoachCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/background2.png"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
        />
      </div>

      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col gap-6 p-6">
          <CharacterSearch />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CharacterInfoCard />
            <AIAnalysisCard />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="grid grid-rows-[auto_1fr] gap-6">
              <EquipmentPreviewCard />
              <WhatIfCard />
            </div>
            <AICoachCard />
          </div>
        </main>
      </div>
    </div>
  );
}
