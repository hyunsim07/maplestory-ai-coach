export default function CharacterSearch() {
  return (
    <section className="border p-4">
      <h2>캐릭터를 검색해보세요!</h2>
      <p>메이플스토리 캐릭터 데이터를 기반으로 AI가 맞춤 성장 방향을 제안해드려요.</p>

      <form className="flex gap-2">
        <input
          type="text"
          placeholder="캐릭터 닉네임을 입력하세요. (예: DreamHero)"
          className="flex-1 border p-2"
        />
        <button type="submit" className="border p-2">
          분석하기
        </button>
      </form>
    </section>
  );
}
