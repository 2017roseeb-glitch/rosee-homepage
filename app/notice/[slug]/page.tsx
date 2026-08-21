import { notFound } from "next/navigation";
import { findNotice, notices } from "../data";

type NoticeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function generateStaticParams() {
  return notices.map((notice) => ({ slug: notice.slug }));
}

export async function generateMetadata({ params }: NoticeDetailPageProps) {
  const { slug } = await params;
  const notice = findNotice(slug);

  return {
    title: notice ? `${notice.title} | ROSEE` : "공지사항 | ROSEE",
  };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { slug } = await params;
  const notice = findNotice(slug);

  if (!notice) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Notice</span>
        <h1>공지사항</h1>
        <p>로제화장품의 주요 안내와 새 소식을 전하는 공간입니다.</p>
      </section>
      <section className="page-section">
        <div className="notice-list">
          <a className="notice-back-link" href={`${basePath}/notice/`}>
            목록으로 돌아가기
          </a>
          <article className="notice-detail notice-detail-page">
            <div className="notice-detail-head">
              <span className="notice-badge">공지</span>
              <div>
                <h2>{notice.title}</h2>
                <time>{notice.date}</time>
              </div>
            </div>
            {notice.renderContent(basePath)}
          </article>
        </div>
      </section>
    </>
  );
}
