import { brandLines } from "../catalog-data";
import Link from "next/link";

function productThumbnail(slug: string) {
  return `/assets/product-thumbs/${slug}.png`;
}

function isCreamProduct(name: string) {
  return name.includes("크림");
}

const menProductSection = {
  id: "men-products",
  name: "남성제품",
  summary: "오퍼스 옴므와 로제 포맨을 중심으로 구성한 남성 스킨케어 제품군입니다.",
  products: brandLines.flatMap((brand) => brand.products.filter((product) => product.typeId === "men")),
};

const productSections = brandLines
  .map((brand) => ({
    ...brand,
    products: brand.products.filter((product) => product.typeId !== "men"),
  }))
  .filter((brand) => brand.products.length > 0)
  .flatMap((brand) => {
    if (brand.id === "opus" && menProductSection.products.length > 0) {
      return [brand, menProductSection];
    }

    return [brand];
  });

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">All Products</span>
        <h1>브랜드별 전제품</h1>
        <p>2026 카탈로그에 소개된 제품을 브랜드별로 확인할 수 있습니다.</p>
      </section>
      <section className="page-section">
        <nav className="product-category-list" aria-label="브랜드별 제품 바로가기">
          {productSections.map((brand) => (
            <a href={`#${brand.id}`} key={brand.id}>
              {brand.name}
            </a>
          ))}
        </nav>
        <div className="brand-product-sections">
          {productSections.map((brand) => (
            <section className="brand-product-section" id={brand.id} key={brand.id}>
              <div className="product-section-heading">
                <h2>{brand.name}</h2>
                <p>{brand.summary}</p>
              </div>
              <div className="shop-product-grid">
                {brand.products.map((product) => (
                  <Link
                    className={`shop-product-card ${isCreamProduct(product.name) ? "is-cream-product" : "is-larger-product"}`}
                    href={`/products/${product.slug}`}
                    key={product.slug}
                  >
                    <div className="shop-product-image">
                      <img src={productThumbnail(product.slug)} alt={`${product.name} 제품 이미지`} />
                    </div>
                    <strong>{product.name}</strong>
                    <span>{product.price === "문의" ? "소비자가 문의" : product.price}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <nav className="brand-glass-bar" aria-label="브랜드 바로가기">
        {productSections.map((brand) => (
          <a href={`#${brand.id}`} key={brand.id}>
            {brand.name}
          </a>
        ))}
      </nav>
    </>
  );
}
