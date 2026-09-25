"use client";

import { useState } from "react";

export default function CharacterSearch() {
  const [nickname, setNickname] = useState("");
  const [searchedName, setSearchedName] = useState("")

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("검색할 닉네임:", nickname);
    setSearchedName(nickname)
  }

  return (
    <section className="rounded-3xl border-4 border-amber-300 bg-amber-50 p-8 shadow-md">
      <h2 className="text-2xl font-bold">🍁 캐릭터를 검색해보세요!</h2>
      <p className="mt-1 text-gray-500">
        메이플스토리 캐릭터 데이터를 기반으로 AI가 맞춤 성장 방향을 제안해드려요.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
        <input
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="캐릭터 닉네임을 입력하세요. (예: DreamHero)"
          className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none focus:border-maple-blue"
        />
        <button
          type="submit"
          className="rounded-xl bg-maple-blue px-6 py-3 font-bold text-white shadow-md hover:bg-blue-600"
        >
          🔍 분석하기
        </button>
      </form>
      {searchedName && (
        <p className="mt-3 text-sm text-gray-500">마지막 검색: {searchedName}</p>
      )}
    </section>
  );
}
