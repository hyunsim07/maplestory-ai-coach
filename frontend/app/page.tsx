import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex flex-1 flex-col gap-4 border p-4">
          <section className="border p-4">캐릭터 검색</section>
          <section className="border p-4">캐릭터 정보</section>
          <section className="border p-4">주요 장비 미리보기</section>
          <section className="border p-4">What-if 시뮬레이터</section>
          <section className="border p-4">AI 성장 분석</section>
          <section className="border p-4">AI 코치 채팅</section>
        </main>
      </div>
    </div>
  );
}
