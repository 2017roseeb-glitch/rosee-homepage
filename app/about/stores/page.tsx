"use client";

import { useState } from "react";
import { stores } from "./store-data";

const regions = ["전체", "서울", "경기", "인천", "충북", "충남", "세종", "대전", "전북", "광주", "전남", "강원", "경북", "대구", "경남", "울산", "부산", "제주"];

const mapRegions = [
  ["강원", "gangwon"],
  ["경기", "gyeonggi"],
  ["서울", "seoul"],
  ["인천", "incheon"],
  ["충북", "chungbuk"],
  ["충남", "chungnam"],
  ["세종", "sejong"],
  ["대전", "daejeon"],
  ["경북", "gyeongbuk"],
  ["대구", "daegu"],
  ["전북", "jeonbuk"],
  ["광주", "gwangju"],
  ["전남", "jeonnam"],
  ["경남", "gyeongnam"],
  ["울산", "ulsan"],
  ["부산", "busan"],
  ["제주", "jeju"],
] as const;

const storesPerPage = 15;
const paginationRange = 5;

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= paginationRange * 2 + 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const startPage = Math.max(2, currentPage - paginationRange);
  const endPage = Math.min(totalPages - 1, currentPage + paginationRange);
  const pages: Array<number | "start-ellipsis" | "end-ellipsis"> = [1];

  if (startPage > 2) {
    pages.push("start-ellipsis");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (endPage < totalPages - 1) {
    pages.push("end-ellipsis");
  }

  pages.push(totalPages);

  return pages;
};

export default function StoresPage() {
  const [activeRegion, setActiveRegion] = useState("전체");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredStores = stores.filter((store) => {
    const matchesRegion =
      activeRegion === "전체" ||
      store.region === activeRegion ||
      store.region.includes(activeRegion) ||
      activeRegion.includes(store.region);
    const searchable = `${store.region} ${store.name} ${store.address} ${store.phone}`.toLowerCase();

    return matchesRegion && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  const totalPages = Math.max(1, Math.ceil(filteredStores.length / storesPerPage));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginationItems = getPaginationItems(visiblePage, totalPages);
  const pagedStores = filteredStores.slice(
    (visiblePage - 1) * storesPerPage,
    visiblePage * storesPerPage,
  );

  const selectRegion = (region: string) => {
    setActiveRegion(region);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Offline Store</span>
        <h1>매장안내</h1>
        <p>지역 또는 지점 검색을 통해 가까운 매장을 확인할 수 있습니다.</p>
      </section>
      <section className="page-section store-page">
        <div className="store-finder">
          <div className="store-search-panel">
            <h2>오프라인매장</h2>
            <p>지역 또는 지점검색을 통해 가까운 매장을 검색하실 수 있습니다.</p>
            <div className="store-search-box">
              <div className="store-filter-row">
                <strong>지역선택</strong>
                <button
                  className={activeRegion === "전체" ? "is-active" : ""}
                  data-region="전체"
                  onClick={() => selectRegion("전체")}
                  type="button"
                >
                  전체 보기
                </button>
              </div>
              <div className="store-filter-row">
                <strong>지점명/주소</strong>
                <label className="store-search-input">
                  <input
                    data-store-search
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="지점명 또는 주소를 입력하세요."
                    value={query}
                  />
                  <span>⌕</span>
                </label>
              </div>
            </div>
          </div>

          <div className="korea-map" aria-label="지역 지도">
            <img
              alt=""
              aria-hidden="true"
              className="korea-map-image"
              src="/assets/korea-store-map.png"
            />
            {mapRegions.map(([region, mapClass]) => (
              <button
                aria-label={`${region} 지역 매장 보기`}
                aria-pressed={activeRegion === region}
                className={`map-region ${mapClass} ${activeRegion === region ? "is-active" : ""}`}
                data-region={region}
                key={region}
                onClick={() => selectRegion(region)}
                type="button"
              >
                <span>{region}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="store-table-wrap">
          <table className="store-table">
            <thead>
              <tr>
                <th>지역</th>
                <th>이름</th>
                <th>주소</th>
                <th>전화번호</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {pagedStores.map((store) => (
                <tr
                  data-region={store.region}
                  data-search={`${store.region} ${store.name} ${store.address} ${store.phone}`}
                  data-store-row
                  key={`${store.region}-${store.name}-${store.phone}`}
                >
                  <td>{store.region}</td>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{store.phone}</td>
                  <td>{store.note}</td>
                </tr>
              ))}
              {filteredStores.length === 0 && (
                <tr>
                  <td colSpan={5}>검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
          {filteredStores.length > storesPerPage && (
            <div className="store-pagination" aria-label="매장 목록 페이지 이동">
              <button
                aria-label="첫 페이지로 이동"
                disabled={visiblePage === 1}
                onClick={() => setCurrentPage(1)}
                type="button"
              >
                &lt;&lt;
              </button>
              <button
                aria-label="이전 페이지로 이동"
                disabled={visiblePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                type="button"
              >
                &lt;
              </button>
              {paginationItems.map((item) =>
                typeof item === "number" ? (
                  <button
                    aria-current={item === visiblePage ? "page" : undefined}
                    className={item === visiblePage ? "is-active" : ""}
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ) : (
                  <span className="store-pagination-ellipsis" key={item}>
                    ...
                  </span>
                ),
              )}
              <button
                aria-label="다음 페이지로 이동"
                disabled={visiblePage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                type="button"
              >
                &gt;
              </button>
              <button
                aria-label="마지막 페이지로 이동"
                disabled={visiblePage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                type="button"
              >
                &gt;&gt;
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
