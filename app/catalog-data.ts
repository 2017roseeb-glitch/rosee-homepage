import { products } from "./product-data";

export { products };

const brandDefinitions = [
  {
    id: "sibjangsaeng",
    name: "십장생",
    image: "/assets/sibjangsaeng-banner.jpg",
    summary: "천지향, 천심, 예결, 금안, 아름다운 선으로 이어지는 로제의 대표 한방 스킨케어 라인입니다.",
  },
  {
    id: "eco-aloe",
    name: "에코알로에",
    image: "/assets/eco-aloe-banner.jpg",
    summary: "헤어, 바디, 클렌징 제품을 중심으로 매일 사용하기 좋은 데일리 케어 라인입니다.",
  },
  {
    id: "majarin",
    name: "마자린",
    image: "/assets/majarin-brand.png",
    summary: "캐비어, 마린 콜라겐, 수분 케어를 중심으로 한 기능성 스킨케어 라인입니다.",
  },
  {
    id: "opus",
    name: "오퍼스",
    image: "/assets/opus-brand.png",
    summary: "로맨틱 루비어스와 옴므 라인을 중심으로 한 스킨케어 브랜드입니다.",
  },
  {
    id: "blossom",
    name: "로제블라썸",
    image: "/assets/blossom-brand.jpg",
    summary: "쿠션, 투웨이케익, 메이크업베이스, 스킨커버로 구성된 메이크업 라인입니다.",
  },
  {
    id: "celactive",
    name: "셀액티브",
    image: "/assets/eco-aloe-main.jpg",
    summary: "포인트 메이크업과 베이스 메이크업을 보완하는 실용적인 메이크업 제품군입니다.",
  },
  {
    id: "eve-doctor",
    name: "이브닥터",
    image: "/assets/evedoctor-brand.jpg",
    summary: "탈모 증상 완화 샴푸, 헤어 토닉, 클렌징 제품을 포함한 헤어&클렌징 케어 라인입니다.",
  },
  {
    id: "cyserea",
    name: "시세리아",
    image: "/assets/sibjangsaeng-banner.jpg",
    summary: "핸드크림과 향수로 구성된 향기 중심의 퍼스널 케어 라인입니다.",
  },
  {
    id: "misc-items",
    name: "기타품목",
    image: "/assets/sibjangsaeng-banner.jpg",
    summary: "로제 포맨, 로제 핑크, 환희 UV 등 카탈로그에 함께 소개된 기타 제품군입니다.",
  },
];

export const brandLines = brandDefinitions.map((brand) => ({
  ...brand,
  products: products.filter((product) => product.brandId === brand.id),
}));

const productTypeDefinitions = [
  { id: "korean-skincare", name: "한방 스킨케어" },
  { id: "toner-lotion", name: "토너&로션" },
  { id: "cream-essence", name: "크림&에센스&앰플" },
  { id: "makeup", name: "메이크업" },
  { id: "sun-mask", name: "마스크/마사지/SUN" },
  { id: "men", name: "남성제품" },
  { id: "cleansing", name: "클렌징" },
  { id: "hair-body", name: "헤어&바디" },
  { id: "fragrance", name: "향수&기타" },
];

export const productTypes = productTypeDefinitions.map((type) => ({
  ...type,
  products: products.filter((product) => product.typeId === type.id),
}));
