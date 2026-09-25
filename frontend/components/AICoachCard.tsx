"use client";

import { useState } from "react";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";

export default function AICoachCard() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    console.log("AI 코치에게 보낼 메시지:", message);
    setMessage("");
  }

  return (
    <Card
      title="AI 코치 채팅"
      icon="💬"
      subtitle="메이플 관련 질문을 하면 AI가 게임 데이터를 기반으로 답변해드려요."
    >
      <EmptyState icon="🗨️" message={"캐릭터를 검색하면\nAI와 채팅할 수 있어요."} />

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="질문을 입력하세요... (예: 무기 잠재 어떻게 바꿔야 할까요?)"
          className="min-w-0 flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm outline-none focus:border-maple-blue"
        />
        <button
          type="submit"
          aria-label="보내기"
          disabled={!message.trim()}
          className="rounded-xl bg-maple-blue px-5 text-white shadow-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ➤
        </button>
      </form>
    </Card>
  );
}
