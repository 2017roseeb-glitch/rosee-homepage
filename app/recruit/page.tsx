const values = [
  {
    number: "01",
    title: "성실인",
    english: "Sincerity",
    text: "믿음과 신뢰를 통한 기업의 미래가치 창조",
  },
  {
    number: "02",
    title: "신뢰인",
    english: "Trust",
    text: "책임과 믿음으로 유연한 업무추진을 통한 신뢰성",
  },
  {
    number: "03",
    title: "창조인",
    english: "Creative",
    text: "낡은 것에 얽매이지 않고 새롭고 혁신적인 것에 대한 도전과 열망",
  },
  {
    number: "04",
    title: "전문인",
    english: "Specialty",
    text: "본인 역량의 집중화를 통한 타인보다 뛰어난 업무 수행능력 배양",
  },
];

const tasks = [
  {
    title: "해외마케팅",
    text: "브랜드의 국내 잠재고객을 벗어나 상품 또는 서비스를 마케팅하여, 국제 무역의 형태로 브랜드를 해외 지역으로 확장함으로써 브랜드 인지도를 높이고 전 세계 잠재고객을 개발하며 비즈니스를 성장.",
  },
  {
    title: "상품기획",
    text: "기존의 상품을 기본으로 하여 여러 공급채널로부터 다양한 상품을 소싱해 패키지 등 다양한 상품을 구성.",
  },
  {
    title: "물류관리",
    text: "고객의 요구에 부합하는 재화의 이동 및 물류서비스 제공에 따른 흐름을 최적화하기 위하여 물류운영계획 수립, 물류거점 운영계획, 보관하역관리, 물류효율성 관리, 물류정보시스템 활용, 물류고객관리.",
  },
  {
    title: "영업관리",
    text: "기획력, 협상력, 마케팅 능력 등 다양한 역량을 발휘하여 회사의 매출추이와 현금 흐름을 파악하고, 고객의견 청취와 대응을 위해 제품의 장단점 및 시장의 동향파악.",
  },
];

const process = [
  {
    title: "서류전형",
    detail: "이력서 제출",
    text: "이력서 양식에 지원동기를 포함한 최소 100자 이상 자기소개서를 작성해주시길 바랍니다. 직군에 따라 포트폴리오가 필요할 수 있습니다.",
  },
  {
    title: "1차 서류합격",
    detail: "서류 검토",
    text: "지원 직무와 경력, 역량, 회사와의 적합성을 종합적으로 검토합니다.",
  },
  {
    title: "2차 임원면접",
    detail: "면접 진행",
    text: "직무 이해도, 협업 태도, 성장 가능성을 중심으로 면접을 진행합니다.",
  },
];

export default function RecruitPage() {
  return (
    <>
      <section className="page-hero recruit-hero">
        <span className="eyebrow">Recruit</span>
        <h1>채용안내</h1>
        <p>로제화장품의 가장 큰 자산은 사람입니다.</p>
      </section>

      <section className="page-section recruit-page">
        <section className="recruit-statement">
          <div>
            <span>ROSEE People</span>
            <h2>함께 성장하는 사람을 기다립니다</h2>
            <p>
              믿음과 신뢰를 바탕으로 고객에게 오래 사랑받는 제품을 만들고,
              새로운 시장과 제품을 함께 만들어갈 인재를 기다립니다.
            </p>
          </div>
        </section>

        <section className="recruit-section" id="talent">
          <div className="line-title">
            <h2>핵심가치</h2>
          </div>
          <div className="value-list">
            {values.map((value) => (
              <article key={value.number}>
                <span>{value.number}.</span>
                <h3>
                  {value.title}
                  <small>{value.english}</small>
                </h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recruit-section">
          <div className="line-title">
            <h2>주요업무</h2>
          </div>
          <div className="task-list">
            {tasks.map((task) => (
              <article key={task.title}>
                <h3>{task.title}</h3>
                <p>{task.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recruit-section" id="system">
          <div className="line-title reverse">
            <h2>채용절차</h2>
          </div>
          <div className="process-list">
            {process.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <strong>{step.detail}</strong>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
