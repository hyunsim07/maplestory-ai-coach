"use client";

import { useState } from "react";
import Image from "next/image";
import EmptyState from "@/components/EmptyState";

type Tab = {
  label: string;
  iconSrc: string;
};

const tabs: Tab[] = [
  { label: "기본 정보", iconSrc: "/images/icons/slime.png" },
  { label: "스탯", iconSrc: "/images/icons/whatif.png" },
  { label: "장비", iconSrc: "/images/icons/equipment.png" },
  { label: "유니온", iconSrc: "/images/icons/union.png" },
  { label: "헥사", iconSrc: "/images/icons/hexa.png" },
  { label: "보스 이력", iconSrc: "/images/icons/boss.png" },
];

const basicInfoColumns: string[][] = [
  ["월드", "직업", "레벨", "길드"],
  ["HP", "MP", "공격력", "보스 데미지"],
];

export default function CharacterTabs() {
  const [activeTab, setActiveTab] = useState("기본 정보");
  const activeIconSrc = tabs.find((tab) => tab.label === activeTab)?.iconSrc;

  return (
    <div className="mt-6">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={tab.label === activeTab}
            onClick={() => setActiveTab(tab.label)}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm ${
              tab.label === activeTab
                ? "border-maple-blue font-bold text-maple-blue"
                : "border-transparent text-gray-500 hover:text-maple-ink"
            }`}
          >
            <Image src={tab.iconSrc} alt="" width={20} height={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "기본 정보" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {basicInfoColumns.map((column) => (
              <dl key={column[0]} className="rounded-2xl bg-gray-50 px-4 py-1">
                {column.map((label) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-gray-100 py-2.5 text-sm last:border-b-0"
                  >
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-medium">-</dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              activeIconSrc && <Image src={activeIconSrc} alt="" width={56} height={56} />
            }
            message={`캐릭터를 검색하면\n${activeTab} 정보가 표시됩니다.`}
          />
        )}
      </div>
    </div>
  );
}
