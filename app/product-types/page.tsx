import { productTypes } from "../catalog-data";
import Link from "next/link";

function productThumbnail(slug: string) {
  return `/assets/product-thumbs/${slug}.png`;
}

function isCreamProduct(name: string) {
  return name.includes("크림");
}

export default function ProductTypesPage() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">Product Type</span>
        <h1>제품타입별</h1>
        <p>스킨케어, 메이크업, 헤어&바디 등 용도별로 제품을 찾아볼 수 있습니다.</p>
      </section>
      <section className="page-section">
        <nav className="product-category-list" aria-label="제품 타입 바로가기">
          {productTypes.map((type) => (
            <a href={`#${type.id}`} key={type.id}>
              {type.name}
            </a>
          ))}
        </nav>
        <div className="brand-product-sections">
          {productTypes.map((type) => (
            <section className="brand-product-section" id={type.id} key={type.id}>
              <div className="product-section-heading">
                <h2>{type.name}</h2>
                <p>{type.products.length}개 제품을 확인할 수 있습니다.</p>
              </div>
              <div className="shop-product-grid">
                {type.products.map((product) => (
                  <Link
                    className={`shop-product-card ${isCreamProduct(product.name) ? "is-cream-product" : "is-larger-product"}`}
                    href={`/products/${product.slug}`}
                    key={product.slug}
                  >
                    <div className="shop-product-image">
                      <img src={productThumbnail(product.slug)} alt={`${product.name} 제품 이미지`} />
                    </div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <nav className="brand-glass-bar" aria-label="제품 타입 바로가기">
        {productTypes.map((type) => (
          <a href={`#${type.id}`} key={type.id}>
            {type.name}
          </a>
        ))}
      </nav>
    </>
  );
}
