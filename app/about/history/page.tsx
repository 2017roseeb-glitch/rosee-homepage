import AboutScrollReveal from "../scroll-reveal";

const history = [
  {
    period: "1990~",
    items: [
      "로제화장품(주) 법인 등기",
      "원미경 전속모델 계약",
      "청주 제 1공장 준공",
      "중국 및 홍콩 수출",
      "환희 브랜드 출시",
      "김혜수 전속모델 계약",
      "홍진희 전속모델 계약",
      "중국 강소 공장 준공",
      "미국 L.A.지사 설립 및 미주지역 수출 개시",
      "주름방지 레티놀 제품 공동개발 (국홍일 박사)",
      "최지우 전속모델 계약",
      "수출 100만불 달성",
      "신은경, 김선아, 유호정 전속모델 계약",
      "십장생 관련 화장료 조성물 특허 출원",
    ],
  },
  {
    period: "2000~",
    items: [
      "에슬리 허브 바이탈 스킨케어 7종 발매",
      "로제화장품 뷰티샵 1호점(청주) 오픈",
      "한국대학신문 '에슬리' 브랜드파워 1위 선정",
      "십장생 한국표준협회 주관 '신기술 으뜸상' 대상 수상",
      "윤정희 전속모델 계약",
      "제주 영업소 개설",
      "방판 '천심' 브랜드 출시",
      "호주, 이란, 대만 수출",
      "마트 전용 한방 브랜드 '산수현' 출시",
      "생균화장품 '바실루스' 출시",
      "소망화장품(주)와 합병",
      "전인화 전속모델 계약",
      "십장생 천지향 브랜드 출시",
      "KT&G와 합병",
    ],
  },
  {
    period: "2010~",
    items: [
      "로제화장품 법인 독립",
      "마자린 콜라겐 기초라인 출시 (모델 : 미스코리아 조하영)",
      "로제 에코 헤어칼라 크림 출시",
      "십장생 아름다운 선 립스틱 출시",
      "최정원 전속모델 계약",
      "2015년 12월 중국 로제 법인 설립",
      "오퍼스로맨틱 기초라인 출시",
      "십장생 예결 기초라인 출시",
      "중국 위생허가 19품목 취득",
      "오퍼스 로맨틱 클렌징 라인 출시",
      "중국 웨이하이 현지 투자법인 설립 (로제화장품 위해 유한공사)",
      "색조전문 브랜드 키치스 출시",
      "엘리쥬 오퍼스 색조라인 출시",
    ],
  },
  {
    period: "2020~",
    items: [
      "셀엑티브 울트라 기초라인 출시",
      "셀엑티브 울트라 기초라인 공영홈쇼핑 런칭",
      "이브닥터 헤어샴푸(탈모기능성) 런칭",
      "이브닥터 제때 클렌징 라인 런칭",
      "십장생 천심 브랜드 런칭",
      "로제블라썸 브랜드 색조라인 출시",
      "십장생 예결 산뜻한 텍스처 출시",
      "십장생 예결 고보습 텍스처 출시",
    ],
  },
];

export default function HistoryPage() {
  return (
    <main className="history-page">
      <AboutScrollReveal />
      <section className="history-hero scroll-reveal">
        <span className="eyebrow">History</span>
        <h1>연혁</h1>
        <p>1991년부터 이어온 로제화장품의 주요 순간들을 시대별로 정리했습니다.</p>
      </section>

      <section className="history-section">
        <div className="history-grid scroll-reveal">
          {history.map(({ period, items }) => (
            <article className="history-card" key={period}>
              <h2>{period}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
