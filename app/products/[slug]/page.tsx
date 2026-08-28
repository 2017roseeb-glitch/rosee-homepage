import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../catalog-data";
import { formatPrice, isWonPrice } from "../../price-format";
import { ProperNounText } from "../../proper-noun-text";
import { BackToProductsButton } from "./back-to-products-button";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

  const brandPageHref =
    product.brandId === "eco-aloe"
      ? "https://ecoaloe.co.kr/"
      : product.brandId === "sibjangsaeng"
        ? "https://sibjangsaeng.kr/"
        : null;
  const detailCopy = createProductDetailCopy(product.description, product.summary);
  const colorOptions = "colorOptions" in product ? product.colorOptions : null;

  return (
    <>
      <section className="product-detail-page">
        <div className="product-detail-image">
          <img src={product.image} alt={`${product.name} 제품 이미지`} />
        </div>
        <div className="product-detail-info">
          <span>
            <ProperNounText>{product.brandName}</ProperNounText>
          </span>
          <h1 style={{ "--title-length": product.name.length } as CSSProperties}>
            <ProperNounText>{product.name}</ProperNounText>
          </h1>
          <p>
            <ProperNounText>{product.summary}</ProperNounText>
          </p>
          {detailCopy.paragraphs.map((paragraph, index) => (
            <p key={`${product.slug}-description-${index}`}>
              <ProperNounText>{paragraph}</ProperNounText>
            </p>
          ))}

          <div className="detail-lines">
            <div className="detail-line-panel">
              <h2>제품정보</h2>
              {detailCopy.metaLine ? (
                <p>
                  <ProperNounText>{detailCopy.metaLine}</ProperNounText>
                </p>
              ) : null}
              <p>
                가격:{" "}
                <span className="notranslate" translate="no">
                  {formatPrice(product.price)}
                </span>
                {isWonPrice(product.price) ? (
                  <span className="detail-line-price-note">소비자 가격은 원화(KRW) 기준입니다.</span>
                ) : null}
              </p>
              <p>
                브랜드: <ProperNounText>{product.brandName}</ProperNounText>
              </p>
              <p>제품타입: {product.typeName}</p>
              {colorOptions ? (
                <div className="product-color-options">
                  <h3>타입별 색상</h3>
                  <p className="product-color-options-title">&lt;{colorOptions.title}&gt;</p>
                  <ul>
                    {colorOptions.items.map((item) => (
                      <li key={item.code}>
                        <span
                          aria-hidden="true"
                          className="product-color-swatch"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>
                          <strong>{item.code}</strong> {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
            {brandPageHref ? (
              <a className="button outline" href={brandPageHref} target="_blank" rel="noreferrer">
                브랜드페이지 이동
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
