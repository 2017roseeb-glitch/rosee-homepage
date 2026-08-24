"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ProperNounText } from "./proper-noun-text";

const brandSlides = [
  {
    name: "십장생",
    href: "/products#sibjangsaeng",
    image: "/assets/sibjangsaeng-model-banner.jpg",
    mobileFocus: "72% center",
    summary: "전통의 깊이를 담은 로제의 대표 한방 스킨케어",
  },
  {
    name: "에코알로에",
    href: "/products#eco-aloe",
    image: "/assets/eco-aloe-homepage.jpg",
    mobileFocus: "70% center",
    summary: "매일 쓰기 좋은 헤어·바디 데일리 케어",
  },
  {
    name: "마자린",
    href: "/products#majarin",
    image: "/assets/majarin-homepage.jpg",
    mobileFocus: "68% center",
    summary: "수분과 탄력을 위한 콜라겐 스킨케어 라인",
  },
  {
    name: "블라썸",
    href: "/products#blossom",
    image: "/assets/blossom-homepage.jpg",
    mobileFocus: "72% center",
    summary: "화사한 피부 표현을 위한 로제 메이크업 라인",
  },
  {
    name: "오퍼스",
    href: "/products#opus",
    image: "/assets/opus-homepage.jpg",
    mobileFocus: "70% center",
    summary: "부드러운 감성과 실용성을 담은 스킨케어 라인",
  },
  {
    name: "이브닥터",
    href: "/products#eve-doctor",
    image: "/assets/evedoctor-homepage.jpg",
    mobileFocus: "70% center",
    summary: "두피와 모발을 위한 기능성 헤어 케어",
  },
];

export default function Home() {
  const [activeBrand, setActiveBrand] = useState(0);
  const lastMouseMoveAt = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = () => {
      lastMouseMoveAt.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);

    const slideTimer = window.setInterval(() => {
      const hasBeenIdle = Date.now() - lastMouseMoveAt.current >= 5000;

      if (hasBeenIdle) {
        setActiveBrand((currentBrand) => (currentBrand + 1) % brandSlides.length);
        lastMouseMoveAt.current = Date.now();
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.clearInterval(slideTimer);
    };
  }, []);

  return (
    <>
      <section className="brand-hero" aria-label="로제화장품 브랜드 슬라이드">
        <div className="brand-hero-bg" aria-hidden="true">
          {brandSlides.map((brand, index) => (
            <img
              className={index === activeBrand ? "is-active" : ""}
              src={brand.image}
              alt=""
              key={brand.name}
              style={{ "--mobile-focus": brand.mobileFocus } as CSSProperties}
            />
          ))}
        </div>
        <div className="brand-hero-panel">
          <span className="eyebrow">ROSEE BRAND LINE</span>
          <div className="brand-selector">
            {brandSlides.map((brand, index) => (
              <button
                className={index === activeBrand ? "is-active" : ""}
                key={brand.name}
                onClick={() => setActiveBrand(index)}
                onFocus={() => setActiveBrand(index)}
                onMouseEnter={() => setActiveBrand(index)}
                type="button"
              >
                <ProperNounText>{brand.name}</ProperNounText>
              </button>
            ))}
          </div>
        </div>
        <div className="brand-hero-copy">
          <span className="eyebrow">ROSEE COSMETICS</span>
          <h1>
            <ProperNounText>{brandSlides[activeBrand].name}</ProperNounText>
          </h1>
          <p>
            <ProperNounText>{brandSlides[activeBrand].summary}</ProperNounText>
          </p>
          <div className="hero-actions">
            <Link className="button primary" href={brandSlides[activeBrand].href}>
              제품 바로가기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
