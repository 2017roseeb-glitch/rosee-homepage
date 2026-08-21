import { brandLines } from "../catalog-data";
import { formatPrice } from "../price-format";
import Link from "next/link";

function isBidanmoProduct(slug: string) {
  return slug.includes("bidanmo");
}

export default function BrandsPage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Brand Line</span>
        <h1>브랜드별</h1>
        <p>2026 카탈로그 기준으로 로제화장품의 브랜드 라인과 대표 제품을 정리했습니다.</p>
      </section>
      <section className="page-section">
        <div className="brand-product-sections">
          {brandLines.map((brand) => (
            <section className="brand-product-section" id={brand.id} key={brand.id}>
              <div className="product-section-heading">
                <h2>{brand.name}</h2>
                <p>{brand.summary}</p>
              </div>
              <div className="shop-product-grid">
                {brand.products.map((product) => (
                  <Link
                    className={`shop-product-card ${isBidanmoProduct(product.slug) ? "is-bidanmo-product" : ""}`}
                    href={`/products/${product.slug}`}
                    key={product.slug}
                  >
                    <div className="shop-product-image">
                      <img src={product.image} alt={`${product.name} 제품 이미지`} />
                    </div>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <nav className="brand-glass-bar" aria-label="브랜드 바로가기">
        {brandLines.map((brand) => (
          <a href={`#${brand.id}`} key={brand.id}>
            {brand.name}
          </a>
        ))}
      </nav>
    </>
  );
}
