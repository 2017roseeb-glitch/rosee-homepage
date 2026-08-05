const companyEmail = "roseeb2017@naver.com";
const testEmail = "delivered@resend.dev";

type ContactPayload = {
  category?: string;
  company?: string;
  content?: string;
  email?: string;
  name?: string;
  phone?: string;
  position?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const requiredFields = ["name", "email", "phone", "content"] as const;
  const missing = requiredFields.filter((field) => !payload[field]);

  if (missing.length > 0) {
    return Response.json(
      { message: "필수 입력 항목을 확인해 주세요." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TEST_MODE === "true" ? testEmail : companyEmail;

  if (!apiKey) {
    return Response.json(
      {
        message:
          "문의 폼은 준비되었습니다. 실제 발송을 위해 메일 발송 서비스 설정이 필요합니다.",
      },
      { status: 503 },
    );
  }

  const emailBody = [
    `담당자 성함: ${payload.name}`,
    `회사명: ${payload.company || "-"}`,
    `직함: ${payload.position || "-"}`,
    `이메일: ${payload.email}`,
    `연락처: ${payload.phone}`,
    `상담항목: ${payload.category || "-"}`,
    "",
    "상담내용",
    payload.content,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from: "ROSEE Website <onboarding@resend.dev>",
      reply_to: payload.email,
      subject: `[로제화장품 문의] ${payload.category || "문의"} - ${payload.name}`,
      text: emailBody,
      to: toEmail,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return Response.json(
      { message: "메일 발송 중 문제가 발생했습니다. 설정을 확인해 주세요." },
      { status: 502 },
    );
  }

  return Response.json({
    message: "메시지를 보내주셔서 감사합니다. 발송이 완료되었습니다.",
  });
}
