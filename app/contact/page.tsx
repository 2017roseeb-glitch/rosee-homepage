"use client";

import { useState } from "react";

const companyEmail = "roseeb2017@naver.com";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(companyEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main>
      <section className="page-section contact-page">
        <div className="email-contact-panel">
          <span className="eyebrow">Email Contact</span>
          <h2>이메일 문의</h2>
          <span aria-hidden="true" className="email-contact-divider" />
          <p>제품 구매, B2B, 입점 및 기타 문의는 아래 이메일로 보내주세요.</p>
          <span className="email-contact-address">
            {companyEmail}
          </span>
          <button className="button primary email-copy-button" onClick={copyEmail} type="button">
            이메일 주소 복사
          </button>
          {copied ? <p className="email-copy-message">이메일 주소가 복사되었습니다.</p> : null}
          <p className="email-contact-note">
            메일 작성 시 성함, 연락처, 회사명, 문의 내용을 함께 기재해 주세요.
          </p>
        </div>
      </section>
    </main>
  );
}
