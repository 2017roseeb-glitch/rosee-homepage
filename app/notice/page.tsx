import { notices } from "./data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function NoticePage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Notice</span>
        <h1>공지사항</h1>
        <p>로제화장품의 주요 안내와 새 소식을 전하는 공간입니다.</p>
      </section>
      <section className="page-section">
        <div className="notice-list" id="notice">
          <div className="notice-board" aria-label="공지사항 목록">
            <div className="notice-board-head">
              <span>구분</span>
              <span>공지제목</span>
              <span>날짜</span>
            </div>
            {notices.map((notice) => (
              <a className="notice-row" href={`${basePath}/notice/${notice.slug}/`} key={notice.slug}>
                <span className="notice-badge">공지</span>
                <strong>{notice.title}</strong>
                <time>{notice.date}</time>
              </a>
            ))}
          </div>
          <div className="notice-board-controls">
            <label className="notice-search">
              <span className="sr-only">공지사항 검색</span>
              <input type="search" placeholder="검색어를 입력해주세요." />
            </label>
            <button type="button">검색</button>
          </div>
          <div className="notice-pagination" aria-label="공지사항 페이지">
            <button type="button" aria-label="이전 페이지">
              ‹
            </button>
            <button type="button" className="is-active">
              1
            </button>
            <button type="button" aria-label="다음 페이지">
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
