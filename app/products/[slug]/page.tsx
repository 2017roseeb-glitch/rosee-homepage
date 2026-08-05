import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../catalog-data";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const brandHomepageLinks: Record<string, string> = {
  "sibjangsaeng": "http://sibjangsaeng.kr/",
  "eco-aloe": "https://ecoaloe.co.kr/",
};

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

  return (
    <>
      <section className="product-detail-page">
        <div className="product-detail-image">
          <img src={product.image} alt={`${product.name} 제품 이미지`} />
        </div>
        <div className="product-detail-info">
          <span>{product.brandName}</span>
          <h1>{product.name}</h1>
          <strong>{product.price === "문의" ? "소비자가 문의" : product.price}</strong>
          <p>{product.summary}</p>
          <p>{product.description}</p>

          <div className="detail-lines">
            <details open>
              <summary>제품정보</summary>
              <p>브랜드: {product.brandName}</p>
              <p>제품타입: {product.typeName}</p>
            </details>
            <details>
              <summary>구매 및 문의</summary>
              <p>정확한 소비자가와 구매 가능 여부는 공식몰 또는 문의 페이지를 통해 확인할 수 있습니다.</p>
            </details>
          </div>

          <div className="product-detail-actions">
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
