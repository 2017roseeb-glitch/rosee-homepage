export default function LocationPage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Location</span>
        <h1>위치안내</h1>
        <p>로제화장품 본사와 고객센터 정보를 확인할 수 있습니다.</p>
      </section>
      <section className="page-section">
        <div className="contact-grid">
          <article className="info-panel">
            <h3>본사 주소</h3>
            <p>경기도 포천시 소흘읍 죽엽산로 385-89 로제화장품</p>
            <p>방문 전 고객센터로 문의해주시면 더 정확한 안내를 받을 수 있습니다.</p>
          </article>
          <article className="info-panel">
            <h3>고객센터</h3>
            <p>080-800-1578</p>
            <p>09:30-11:45 / 13:00-16:00</p>
            <p>토요일, 일요일, 공휴일 휴무</p>
          </article>
        </div>
      </section>
    </>
  );
}
