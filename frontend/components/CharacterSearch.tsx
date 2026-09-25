"use client";

import { useState } from "react";
import Image from "next/image";
import Mushroom from "@/components/Mushroom";

export default function CharacterSearch() {
  const [nickname, setNickname] = useState("");
  const [searchedName, setSearchedName] = useState("")

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("검색할 닉네임:", nickname);
    setSearchedName(nickname)
  }

  return (
    <section className="relative rounded-3xl border-4 border-amber-700/60 bg-amber-50 p-6 shadow-lg sm:p-8">
      <Mushroom size={64} className="absolute -right-5 -bottom-7 drop-shadow-md" />

      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Image src="/images/icons/logo.png" alt="" width={32} height={32} />
            <span>캐릭터를 검색해보세요!</span>
          </h2>
          <p className="mt-1 text-gray-500">
            메이플스토리 캐릭터 데이터를 기반으로 AI가 맞춤 성장 방향을 제안해드려요.
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-2xl rounded-bl-none bg-white px-4 py-2 text-sm shadow-sm xl:flex">
          <Image src="/images/icons/ai.png" alt="" width={28} height={28} />
          <p>
            지금 바로
            <br />내 캐릭터를 분석해보세요!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="캐릭터 닉네임을 입력하세요. (예: DreamHero)"
          className="min-w-0 flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none focus:border-maple-blue"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-maple-blue px-8 py-3 font-bold text-white shadow-md hover:bg-blue-600"
        >
          <Image src="/images/icons/search.png" alt="" width={24} height={24} />
          <span>분석하기</span>
        </button>
      </form>
      {searchedName && (
        <p className="mt-3 text-sm text-gray-500">마지막 검색: {searchedName}</p>
      )}
    </section>
  );
}
