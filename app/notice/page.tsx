const notices = [
  ["로제화장품 공지사항", "회사 소식과 제품 안내를 이곳에서 확인할 수 있습니다."],
  ["제품 및 구매 안내", "공식몰 제품 입고, 구매 안내, 고객센터 운영 정보를 순차적으로 등록할 수 있습니다."],
  ["정품 및 고객 안내", "정품 인증, 이용 안내, 고객 공지 등을 게시하는 공간입니다."],
];

export default function NoticePage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Notice</span>
        <h1>공지사항</h1>
        <p>로제화장품의 주요 안내와 새 소식을 전하는 공간입니다.</p>
      </section>
      <section className="page-section">
        <div className="notice-list">
          {notices.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
