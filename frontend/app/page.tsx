export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border p-4">
        <h1>MapleStory AI Coach</h1>
      </header>

      <div className="flex flex-1">
        <aside className="w-56 border p-4">사이드바</aside>

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
