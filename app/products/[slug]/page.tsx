import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../catalog-data";
import { BackToProductsButton } from "./back-to-products-button";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const brandHomepageLinks: Record<string, string> = {
  "sibjangsaeng": "https://www.sibjangsaeng.kr/",
  "eco-aloe": "https://www.ecoaloe.co.kr/",
};

type ProductDetailCopy = {
  paragraphs: string[];
  metaLine: string | null;
};

const pricePattern = /^\d{1,3}(?:,\d{3})*원$/;

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function removeLeadingSummary(description: string, summary: string) {
  const normalizedSummary = normalizeText(summary);
  const normalizedDescription = normalizeText(description);

  if (!normalizedSummary || !normalizedDescription.startsWith(normalizedSummary) || !description.startsWith(summary)) {
    return description.trim();
  }

  return description.slice(summary.length).replace(/^[\s.。]+/, "").trim();
}

function createProductDetailCopy(description: string, summary: string): ProductDetailCopy {
  let body = description.replace(/\r\n/g, "\n").trim();
  let lineName = "";
  const lineMatch = body.match(/\n\s*라인:\s*([^\n]+)\s*$/);

  if (lineMatch && lineMatch.index !== undefined) {
    lineName = lineMatch[1].trim();
    body = body.slice(0, lineMatch.index).trim();
  }

  let metaLine: string | null = null;
  const capacityBlockMatch = body.match(/\n\s*용량 및 구성:\s*([^\n]+)(?:\n\s*소비자가:\s*([^\n]+))?\s*$/);

  if (capacityBlockMatch && capacityBlockMatch.index !== undefined) {
    const capacityParts = capacityBlockMatch[1].split("ㅣ").map((part) => part.trim()).filter(Boolean);
    const capacity = capacityParts.shift();
    const extras = capacityParts.filter((part) => !pricePattern.test(part));

    if (capacity) {
      metaLine = [`용량 및 구성: ${capacity}`, ...extras, lineName].filter(Boolean).join(" ㅣ ");
    }

    body = body.slice(0, capacityBlockMatch.index).trim();
  } else {
    const configMatch = body.match(/(?:구성은|구성:)\s*([^이며.]+)(?:이며)?\s*소비자가 기준가는\s*[^.]+입니다\.?$/);
    const sentenceCapacityMatch = body.match(/(?:\s|^)용량은\s*([^이며.]+)\s*이며\s*소비자가 기준가는\s*[^.]+입니다\.?$/);
    const matchedMeta = configMatch ?? sentenceCapacityMatch;

    if (matchedMeta && matchedMeta.index !== undefined) {
      metaLine = [`용량 및 구성: ${matchedMeta[1].trim()}`, lineName].filter(Boolean).join(" ㅣ ");
      body = body.slice(0, matchedMeta.index).trim();
    } else {
      body = body.replace(/\s*소비자가 기준가는\s*[^.]+입니다\.?$/g, "").trim();
    }
  }

  body = removeLeadingSummary(body, summary);

  return {
    paragraphs: body.split(/\n{2,}/).map((paragraph) => paragraph.replace(/\n/g, " ").trim()).filter(Boolean),
    metaLine,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const brandHomepageUrl = brandHomepageLinks[product.brandId];
  const detailCopy = createProductDetailCopy(product.description, product.summary);

  return (
    <>
      <section className="product-detail-page">
        <div className="product-detail-image">
          <img src={product.image} alt={`${product.name} 제품 이미지`} />
        </div>
        <div className="product-detail-info">
          <span>{product.brandName}</span>
          <h1 style={{ "--title-length": product.name.length } as CSSProperties}>{product.name}</h1>
          <strong>{product.price}</strong>
          <p>{product.summary}</p>
          {detailCopy.paragraphs.map((paragraph, index) => (
            <p key={`${product.slug}-description-${index}`}>{paragraph}</p>
          ))}
          {detailCopy.metaLine ? <p className="product-detail-meta">{detailCopy.metaLine}</p> : null}

          <div className="detail-lines">
            <div className="detail-line-panel">
              <h2>제품정보</h2>
              <p>브랜드: {product.brandName}</p>
              <p>제품타입: {product.typeName}</p>
            </div>
          </div>

          <div className="product-detail-actions">
            <BackToProductsButton />
            <Link className="button primary" href="/contact">
              제품 문의하기
            </Link>
            <a className="button outline" href="https://roseeshop.com/" target="_blank" rel="noreferrer">
              공식몰 이동
            </a>
            {brandHomepageUrl ? (
              <a className="button outline" href={brandHomepageUrl} target="_blank" rel="noreferrer">
                브랜드홈페이지 이동
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
