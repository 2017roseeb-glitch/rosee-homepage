"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const companyEmail = "roseeb2017@naver.com";
const formSubmitEndpoint = `https://formsubmit.co/ajax/${companyEmail}`;
const consultationTypes = ["제품구입", "제품상담", "B2B", "입점/제휴", "기타문의"];

function getFormValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export default function ContactFormBackup() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("privacy") !== "on") {
      setStatus("error");
      setMessage("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    const inquiry = {
      category: getFormValue(formData, "category") || "기타문의",
      company: getFormValue(formData, "company") || "-",
      content: getFormValue(formData, "content"),
      email: getFormValue(formData, "email"),
      name: getFormValue(formData, "name"),
      phone: getFormValue(formData, "phone"),
      position: getFormValue(formData, "position") || "-",
    };

    const payload = {
      _captcha: "false",
      _honey: "",
      _replyto: inquiry.email,
      _subject: "[로제화장품 홈페이지] 새로운 상담문의가 접수되었습니다",
      _template: "table",
      email: inquiry.email,
      "개인정보 수집 및 이용": "동의함",
      "받는 메일": companyEmail,
      "상담내용": inquiry.content,
      "상담항목": inquiry.category,
      "성함(담당자)": inquiry.name,
      "연락처": inquiry.phone,
      "이메일 주소": inquiry.email,
      "부서명/직함": inquiry.position,
      "회사명": inquiry.company,
    };

    try {
      const response = await fetch(formSubmitEndpoint, {
        body: new URLSearchParams(payload),
        headers: {
          Accept: "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("contact-submit-failed");
      }

      setStatus("sent");
      setMessage("문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`전송 중 문제가 발생했습니다. ${companyEmail}으로 직접 문의해 주세요.`);
    }
  }

  return (
    <form className="web-contact-form" onSubmit={submitInquiry}>
      <div className="form-fields">
        <label>
          <span>담당자 성함</span>
          <input name="name" required />
        </label>
        <label>
          <span>회사명</span>
          <input name="company" />
        </label>
        <label>
          <span>부서명/직함</span>
          <input name="position" />
        </label>
        <label>
          <span>이메일</span>
          <input name="email" required type="email" />
        </label>
        <label>
          <span>연락처</span>
          <input name="phone" required />
        </label>
        <label>
          <span>상담항목</span>
          <select defaultValue="제품구입" name="category">
            {consultationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="wide-field">
          <span>상담내용</span>
          <textarea name="content" required />
        </label>
      </div>

      <div className="privacy-box">
        <strong>개인정보 수집 및 이용에 대한 안내</strong>
        <p>
          로제화장품은 문의 접수와 답변을 위해 담당자 성함, 회사명, 직함, 이메일, 연락처,
          상담내용을 수집합니다. 수집된 정보는 문의 처리 목적 외에는 사용하지 않으며 관련
          법령에 따라 안전하게 관리됩니다.
        </p>
        <p>수집 및 이용 목적: 문의 접수, 상담 답변, email 발송 등.</p>
        <p>보유 및 이용 기간: 문의 처리 완료 후 관련 법령에 따른 보관 기간까지.</p>
      </div>

      <label className="consent-line">
        <input name="privacy" required type="checkbox" />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>

      <button className="send-button" disabled={status === "sending"} type="submit">
        {status === "sending" ? "전송중" : "보내기"}
      </button>

      {message ? (
        <div className={status === "sent" ? "form-message success" : "form-message error"}>
          {message}
        </div>
      ) : null}
    </form>
  );
}
