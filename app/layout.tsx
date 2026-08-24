import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR } from "next/font/google";
import { brandLines, productTypes } from "./catalog-data";
import LanguageSelector from "./language-selector";
import { ProperNounText } from "./proper-noun-text";
import ScrollTopButton from "./scroll-top-button";
import SiteNav from "./site-nav";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "로제화장품 | ROSEE Cosmetics",
  description: "로제화장품 공식 회사 홈페이지",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

const menus = [
  {
    label: "회사소개",
    href: "/about",
    items: [
      ["CEO 인사말", "/about/ceo"],
      ["회사소개", "/about"],
      ["연혁", "/about/history"],
      ["매장안내", "/about/stores"],
      ["위치안내", "/about/location"],
    ],
  },
  {
    label: "브랜드별 전제품",
    href: "/products",
    items: brandLines.map((brand) => [brand.name, `/products#${brand.id}`]),
  },
  {
    label: "제품타입별",
    href: "/product-types",
    items: productTypes.map((type) => [type.name, `/product-types#${type.id}`]),
  },
  {
    label: "공지사항",
    href: "/notice",
  },
  {
    label: "문의",
    href: "/contact",
  },
  {
    label: "채용안내",
    href: "/recruit",
    items: [
      ["채용안내", "/recruit"],
      ["인재상", "/recruit#talent"],
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.variable}>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="로제화장품 홈">
            <img src="/assets/company/rosee-wordmark.png" alt="ROSEE" />
          </Link>
          <SiteNav menus={menus} />
          <div className="header-actions">
            <a
              aria-label="로제화장품 공식 인스타그램"
              className="instagram-link"
              href="https://www.instagram.com/rosee_cosmetic/"
              target="_blank"
              rel="noreferrer"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" />
              </svg>
            </a>
            <a
              className="shop-link notranslate"
              href="https://roseeshop.com/"
              target="_blank"
              rel="noreferrer"
              translate="no"
            >
              공식몰
            </a>
            <LanguageSelector />
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div>
            <strong>
              <ProperNounText>로제화장품(주)</ProperNounText>
            </strong>
            <p>경기도 포천시 소흘읍 죽엽산로 385-89</p>
            <p>© Copyright (c) 2026 ROSEE Cosmetics All rights reserved.</p>
          </div>
          <div>
            <p>고객센터 080-800-1578</p>
            <p>운영시간 09:30-11:45 / 13:00-16:00</p>
          </div>
        </footer>
        <ScrollTopButton />
      </body>
    </html>
  );
}
