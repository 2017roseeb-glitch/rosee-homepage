import AboutScrollReveal from "./scroll-reveal";

const companyFacts = [
  ["회사명", "로제화장품(주)"],
  ["설립일", "1991년 3월"],
  ["대표", "조종현"],
  ["제품군", "기초, 클렌징, 색조, 헤어, 바디 등 총 250품목"],
  ["유통망", "전문점, 대형마트, 홈쇼핑, 온라인, 면세점 등"],
  ["수출국", "중국, 미국, 러시아, 태국, 베트남, 싱가폴 등"],
  ["본사", "경기도 포천시 소흘읍 죽엽산로 385-89"],
];

const brandReel = [
  { name: "십장생", image: "/assets/products/sibjangsaeng-cheonjihyang.png" },
  { name: "오퍼스", image: "/assets/products/opus-essence.png" },
  { name: "마자린", image: "/assets/company/majarin-collagen-softener-card.png", className: "is-majarin" },
  { name: "에코알로에", image: "/assets/company/eco-aloe-shampoo-card.jpg", className: "is-eco-aloe" },
  { name: "로제블라썸", image: "/assets/products/rosee-blossom-foundation21-23.png" },
  { name: "이브닥터", image: "/assets/company/eve-doctor-shampoo-card2.png", className: "is-eve-doctor" },
];

const values = [
  ["창의", "Creative", "새로운 제품과 유통 흐름을 빠르게 읽고 브랜드의 가능성을 넓힙니다."],
  ["협력", "Partnership", "고객, 대리점, 제조 파트너와 함께 오래가는 관계를 만듭니다."],
  ["성실", "Sincerity", "믿음과 신뢰를 바탕으로 제품과 서비스를 꾸준히 개선합니다."],
];

const strategies = [
  {
    label: "A",
    title: ["영업전략구조개편을 통한", "사업 안정성 강화"],
    items: ["영업환경 변화에 따른 능동적 변화", "고비용 저효율 구조 개선", "마케팅력 강화를 통한 블루오션 영역 창출"],
  },
  {
    label: "B",
    title: ["사업경쟁력", "강화"],
    items: ["혁신적인 신제품 개발 능력 강화", "원가경쟁력 강화", "시장 다변화에 따른 비교우위 상품 개발", "전사적 리스크 관리체계 구축"],
  },
  {
    label: "C",
    title: ["경영관리 시스템의", "혁신"],
    items: ["지식경영 기반 구축", "인적자원의 극대화", "수익성 중심의 관리 체계 강화"],
  },
];

const domestic = [
  "전국 40여개 대리점, 대형 마트 등 2,000여 전문점 유통",
  "전국 40개 대형 할인마트",
  "온라인, 홈쇼핑, 숙박, 면세점 등 약 20개처",
];

const global = [
  "중국, 일본 등 아시아 지역 수출 및 중국 위해지사 설립",
  "미국 동·서부 지역 방판시장 및 한인타운 / 차이나타운 진출",
  "태국, 말레이시아, 베트남 등 동남아시아 진출",
  "사우디, 카타르 등 중동 지역 할랄화장품 공략",
  "멕시코, 브라질 등 중남미 지역 공략",
];

const partners = [
  { name: "COSMOCOS", image: "/assets/company/cosmocos.png" },
  { name: "COSMECCA", image: "/assets/company/cosmecca.png" },
  { name: "COSMAX", image: "/assets/company/cosmax.png" },
  { name: "KOLMAR 한국콜마", image: "/assets/company/kolmar.png" },
];

export default function AboutPage() {
  return (
    <main className="about-company-page about-cinematic-page">
      <AboutScrollReveal />

      <section className="about-cinema-hero scroll-scene">
        <img className="about-cinema-symbol" src="/assets/company/rosee-symbol.png" alt="" />
        <div className="about-cinema-copy scroll-reveal">
          <img src="/assets/company/rosee-wordmark.png" alt="ROSEE" />
          <span>ROSEE COSMETIC</span>
          <h1>
            믿음과 신뢰를 통한
            <br />
            기업의 미래가치 창조
          </h1>
          <p>
            로제는 프랑스어로 이슬을 뜻하며, 이슬처럼 맑고 깨끗한 피부를 선사하고 싶은 마음을 담은 브랜드입니다.
          </p>
        </div>
        <div className="about-cinema-stats scroll-reveal">
          <article>
            <strong>1991</strong>
            <span>설립</span>
          </article>
          <article>
            <strong>250+</strong>
            <span>제품 품목</span>
          </article>
          <article>
            <strong>40+</strong>
            <span>국내 대리점</span>
          </article>
          <article>
            <strong>Global</strong>
            <span>수출 네트워크</span>
          </article>
        </div>
      </section>

      <section className="about-reel-section scroll-scene">
        <div className="about-reel-copy scroll-reveal">
          <span>BRAND FLOW</span>
          <h2>
            1991년부터 이어온
            <br />
            로제의 브랜드 경험
          </h2>
          <p>
            십장생, 오퍼스, 마자린, 에코알로에 등 오랜 시간 고객과 함께한 브랜드를 기반으로 스킨케어부터 헤어&바디,
            색조까지 제품 영역을 넓혀가고 있습니다.
          </p>
        </div>
        <div className="about-product-reel scroll-reveal" aria-label="로제화장품 브랜드 제품 흐름">
          <div className="about-reel-track">
            {[...brandReel, ...brandReel].map((product, index) => (
              <article className={product.className} key={`${product.name}-${index}`}>
                <div className="about-reel-product">
                  <img src={product.image} alt="" />
                </div>
                <strong>{product.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-fact-stage">
        <div className="about-fact-heading scroll-reveal">
          <span>COMPANY</span>
          <h2>ROSEE COSMETIC Co., Ltd</h2>
        </div>
        <div className="about-fact-layout">
          <div className="about-fact-word scroll-scene">
            <img src="/assets/company/rosee-wordmark.png" alt="ROSEE" />
            <p>
              1991년부터 십장생, 오퍼스, 마자린 등의 브랜드로 고객과 함께하며 제품 만족을 통한 신뢰를 이어가고
              있습니다.
            </p>
          </div>
          <div className="about-fact-card scroll-reveal">
            <dl>
              {companyFacts.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="about-value-scene">
        <div className="about-scene-title scroll-reveal">
          <span>attitude</span>
          <h2>일하는 방식</h2>
        </div>
        <div className="about-value-cards scroll-reveal">
          {values.map(([title, english, description]) => (
            <article key={title}>
              <span>{english}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-strategy-cinema scroll-scene">
        <div className="about-strategy-inner">
          <h2 className="scroll-reveal">business strategy</h2>
          <div className="about-strategy-grid scroll-reveal">
            {strategies.map((strategy) => (
              <article key={strategy.label}>
                <strong>{strategy.label}</strong>
                <h3>
                  {strategy.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <ul>
                  {strategy.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-market-cinema domestic-cinema scroll-scene">
        <div className="about-market-text scroll-reveal">
          <span>DOMESTIC</span>
          <h2>전국 유통망을 기반으로 고객 접점을 넓힙니다</h2>
          <ul className="about-dot-list">
            {domestic.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="about-map-stage korea-distribution-map scroll-reveal" aria-label="국내 유통망">
          <img src="/assets/company/korea-map.png" alt="" />
          <span className="region seoul">
            서울·경기 지점
            <br />
            17개처
          </span>
          <span className="region gangwon">
            강원 지점
            <br />
            3개처
          </span>
          <span className="region daejeon">
            대전·광주 지점
            <br />
            10개처
          </span>
          <span className="region busan">
            부산·대구 지점
            <br />
            10개처
          </span>
        </div>
      </section>

      <section className="about-market-cinema global-cinema scroll-scene">
        <div className="about-map-stage world-distribution-map scroll-reveal" aria-label="해외 진출 지역">
          <img src="/assets/company/global-map.png" alt="" />
          <span className="zone russia">
            러시아
            <br />
            APEXS
          </span>
          <span className="zone china">
            중국
            <br />
            광저우·상해·위해
          </span>
          <span className="zone japan">일본</span>
          <span className="zone asia">베트남 / 태국 / 대만</span>
          <span className="zone usa">
            미국
            <br />
            SENSIA / J&amp;C
          </span>
          <span className="zone md">말레이시아, 싱가폴 MD</span>
        </div>
        <div className="about-market-text scroll-reveal">
          <span>GLOBAL</span>
          <h2>아시아를 넘어 미주와 중동 시장까지 확장합니다</h2>
          <ul className="about-dot-list">
            {global.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-partner-cinema">
        <div className="about-scene-title scroll-reveal">
          <span>PARTNER</span>
          <h2>믿을수 있는 대한민국 대표 ODM 회사에서 제조, 생산 합니다</h2>
        </div>
        <div className="partner-logo-row scroll-reveal">
          {partners.map((partner) => (
            <img key={partner.name} src={partner.image} alt={partner.name} />
          ))}
        </div>
      </section>
    </main>
  );
}
