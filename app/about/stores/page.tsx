"use client";

import { useMemo, useState } from "react";

const regions = ["전체", "서울", "경기", "인천", "충북", "충남", "대전", "전북", "광주", "전남", "강원", "경북", "대구", "경남", "울산", "부산", "제주"];

const stores = [
  { region: "충북", name: "진", address: "충북 청주시 청원구 내덕동 656-22", phone: "043-252-9776", note: "" },
  { region: "충북", name: "수", address: "충북 청주시 상당구 쇠내로 124", phone: "043-221-0155", note: "" },
  { region: "충북", name: "아기자기", address: "충북 청주시 서원구 창신로 30", phone: "010-4416-3654", note: "" },
  { region: "충북", name: "자넬", address: "충북 청주시 흥덕구 풍산로33번길 43 2층", phone: "043-233-2247", note: "" },
  { region: "충북", name: "중앙상사", address: "충북 청주시 흥덕구 가경동 130-1 지하1층", phone: "010-2431-0765", note: "" },
  { region: "서울", name: "로제 서울점", address: "서울 중구 명동길 12", phone: "02-000-1578", note: "예시" },
  { region: "경기", name: "로제 포천점", address: "경기 포천시 소흘읍 죽엽산로 385-89", phone: "031-576-1578", note: "본사" },
  { region: "부산", name: "로제 부산점", address: "부산 부산진구 중앙대로 680", phone: "051-000-1578", note: "예시" },
  { region: "제주", name: "로제 제주점", address: "제주 제주시 중앙로 1", phone: "064-000-1578", note: "예시" },
];

export default function StoresPage() {
  const [activeRegion, setActiveRegion] = useState("전체");
  const [query, setQuery] = useState("");

  const filteredStores = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return stores.filter((store) => {
      const matchesRegion = activeRegion === "전체" || store.region === activeRegion;
      const searchable = `${store.region} ${store.name} ${store.address} ${store.phone}`.toLowerCase();
      return matchesRegion && (!keyword || searchable.includes(keyword));
    });
  }, [activeRegion, query]);

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
                  onClick={() => setActiveRegion("전체")}
                  type="button"
                >
                  전체 보기
                </button>
              </div>
              <div className="store-filter-row">
                <strong>지점명/주소</strong>
                <label className="store-search-input">
                  <input
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="지점명 또는 주소를 입력하세요."
                    value={query}
                  />
                  <span>⌕</span>
                </label>
              </div>
            </div>
          </div>

          <div className="korea-map" aria-label="지역 지도">
            {regions.filter((region) => region !== "전체").map((region) => (
              <button
                className={activeRegion === region ? "is-active" : ""}
                key={region}
                onClick={() => setActiveRegion(region)}
                style={mapPositions[region as keyof typeof mapPositions]}
                type="button"
              >
                {region}
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
              {filteredStores.map((store) => (
                <tr key={`${store.region}-${store.name}-${store.phone}`}>
                  <td>{store.region}</td>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{store.phone}</td>
                  <td>{store.note}</td>
                </tr>
              ))}
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan={5}>검색 결과가 없습니다.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

const mapPositions = {
  강원: { left: "57%", top: "18%" },
  경기: { left: "36%", top: "27%" },
  경남: { left: "53%", top: "66%" },
  경북: { left: "65%", top: "47%" },
  광주: { left: "32%", top: "67%" },
  대구: { left: "62%", top: "56%" },
  대전: { left: "42%", top: "43%" },
  부산: { left: "74%", top: "64%" },
  서울: { left: "34%", top: "20%" },
  세종: { left: "39%", top: "39%" },
  울산: { left: "79%", top: "58%" },
  인천: { left: "25%", top: "18%" },
  전남: { left: "30%", top: "78%" },
  전북: { left: "35%", top: "57%" },
  제주: { left: "29%", top: "94%" },
  충남: { left: "22%", top: "41%" },
  충북: { left: "48%", top: "36%" },
};
