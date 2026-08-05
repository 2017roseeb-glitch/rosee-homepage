"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const brandSlides = [
  {
    name: "십장생",
    image: "/assets/sibjangsaeng-model-banner.jpg",
    summary: "전통의 깊이를 담은 로제의 대표 한방 스킨케어",
  },
  {
    name: "에코알로에",
    image: "/assets/eco-aloe-homepage.jpg",
    summary: "매일 쓰기 좋은 헤어·바디 데일리 케어",
  },
  {
    name: "마자린",
    image: "/assets/majarin-homepage.jpg",
    summary: "수분과 탄력을 위한 콜라겐 스킨케어 라인",
  },
  {
    name: "블라썸",
    image: "/assets/blossom-homepage.jpg",
    summary: "화사한 피부 표현을 위한 로제 메이크업 라인",
  },
  {
    name: "오퍼스",
    image: "/assets/opus-homepage.jpg",
    summary: "부드러운 감성과 실용성을 담은 스킨케어 라인",
  },
  {
    name: "이브닥터",
    image: "/assets/evedoctor-homepage.jpg",
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
                onFocus={() => setActiveBrand(index)}
                onMouseEnter={() => setActiveBrand(index)}
                type="button"
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
        <div className="brand-hero-copy">
          <span className="eyebrow">ROSEE COSMETICS</span>
          <h1>{brandSlides[activeBrand].name}</h1>
          <p>{brandSlides[activeBrand].summary}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/brands">
              브랜드 보기
            </Link>
            <a className="button secondary" href="https://roseeshop.com/" target="_blank" rel="noreferrer">
              공식몰 이동
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
