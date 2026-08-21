import type { ReactNode } from "react";

export type Notice = {
  slug: string;
  title: string;
  date: string;
  renderContent: (basePath: string) => ReactNode;
};

export const notices: Notice[] = [

  {
    slug: "product-inquiry",
    title: "제품문의 접수 안내",
    date: "2026-08-18",
    renderContent: () => (
      <>
        <div className="notice-highlight">
          <strong>제품 문의 및 업무 관련 상담은 담당 메일로 접수해 주세요.</strong>
          <p>수출, 제품 공급, 제휴 및 기타 업무 관련 문의사항은 아래 이메일로 보내주시면 확인 후 순차적으로 답변드리겠습니다.</p>
        </div>
        <ul className="notice-benefits">
          <li>
            <span>문의 대상</span>
            <strong>수출, 제품 공급, 제휴 및 업무 관련 문의</strong>
          </li>
          <li>
            <span>접수 메일</span>
            <strong>roseeb2017@naver.com</strong>
          </li>
          <li>
            <span>안내 사항</span>
            <strong>회사명, 담당자 성함, 연락처, 문의 내용을 함께 기재해 주세요.</strong>
          </li>
        </ul>
        <p className="notice-copy">
          보내주신 문의는 담당 부서에서 확인 후 답변드리겠습니다. 정확한 상담을 위해 문의하실 제품명이나 공급 희망 내용,
          수출 국가 등의 정보를 함께 적어주시면 보다 원활한 확인이 가능합니다.
        </p>
        <a className="notice-shop-link" href="mailto:roseeb2017@naver.com">
          메일 보내기
        </a>
      </>
    ),
  },
  {
    slug: "mileage",
    title: "공식몰 회원가입 마일리지 지급안내",
    date: "2026-08-18",
    renderContent: (basePath) => (
      <>
        <div className="notice-highlight">
          <strong>첫 회원가입 시 200,000 마일리지 지급</strong>
          <p>정보/이벤트 수신 동의까지 완료하면 최대 240,000 마일리지 혜택을 받을 수 있습니다.</p>
        </div>
        <ul className="notice-benefits">
          <li>
            <span>기본 혜택</span>
            <strong>첫 회원가입 시 200,000 마일리지 지급</strong>
          </li>
          <li>
            <span>추가 혜택 1</span>
            <strong>정보/이벤트 메일 수신 동의 시 20,000 마일리지 추가 지급</strong>
          </li>
          <li>
            <span>추가 혜택 2</span>
            <strong>정보/이벤트 SMS 수신 동의 시 20,000 마일리지 추가 지급</strong>
          </li>
        </ul>
        <p className="notice-copy">가입 시 이메일과 휴대폰번호 입력란 아래의 수신 동의 항목을 확인해 주세요.</p>
        <a className="notice-shop-link" href="https://roseeshop.com/" target="_blank" rel="noreferrer">
          공식몰 바로가기
        </a>
        <figure className="notice-example">
          <img src={`${basePath}/assets/notice/mileage-consent.png`} alt="정보/이벤트 메일 및 SMS 수신 동의 예시" />
          <figcaption>수신 동의 항목 예시</figcaption>
        </figure>
      </>
    ),
  },
  {
    slug: "customer-center-hours",
    title: "고객센터 운영시간안내",
    date: "2026-08-18",
    renderContent: (basePath) => (
      <>
        <div className="notice-highlight">
          <strong>고객센터 080-800-1578</strong>
          <p>상담 운영시간은 평일 09:30-11:45 / 13:00-16:00입니다.</p>
        </div>
        <ul className="notice-benefits">
          <li>
            <span>오전 상담</span>
            <strong>09:30-11:45</strong>
          </li>
          <li>
            <span>점심 및 정비 시간</span>
            <strong>11:45-13:00</strong>
          </li>
          <li>
            <span>오후 상담</span>
            <strong>13:00-16:00</strong>
          </li>
          <li>
            <span>휴무</span>
            <strong>토요일, 일요일, 공휴일</strong>
          </li>
        </ul>
        <p className="notice-copy">
          제품 문의, 구매 및 배송 관련 상담은 운영시간 내 고객센터로 문의해 주세요. 문의가 많을 경우 답변이 지연될 수 있으며,
          홈페이지 문의 페이지에서도 접수하실 수 있습니다.
        </p>
        <a className="notice-shop-link" href={`${basePath}/contact/`}>
          문의 페이지 바로가기
        </a>
      </>
    ),
  },
];

export function findNotice(slug: string) {
  return notices.find((notice) => notice.slug === slug);
}
