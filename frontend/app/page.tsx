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
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col gap-6 p-6">
          <CharacterSearch />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <CharacterInfoCard />
              <EquipmentPreviewCard />
              <WhatIfCard />
            </div>

            <div className="flex flex-col gap-6">
              <AIAnalysisCard />
              <AICoachCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
