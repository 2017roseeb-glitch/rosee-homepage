import { replaceProperNounsWithLatin, splitLeadingProperNouns } from "./proper-noun-text";

type DisplayName = {
  koreanLead: string;
  latinLead: string;
  productPart: string;
};

const productNameOverrides: Record<string, DisplayName> = {
  "십장생 천심수": {
    koreanLead: "십장생 천심수",
    latinLead: "Sibjangsaeng Cheonshim",
    productPart: "Skin",
  },
  "십장생 천심액": {
    koreanLead: "십장생 천심액",
    latinLead: "Sibjangsaeng Cheonshim",
    productPart: "Lotion",
  },
  "십장생 금안수": {
    koreanLead: "십장생 금안수",
    latinLead: "Sibjangsaeng Geuman",
    productPart: "Skin",
  },
  "십장생 금안액": {
    koreanLead: "십장생 금안액",
    latinLead: "Sibjangsaeng Geuman",
    productPart: "Lotion",
  },
  "십장생 금안 진 에센스": {
    koreanLead: "십장생 금안진",
    latinLead: "Sibjangsaeng Geumanjin",
    productPart: "Essence",
  },
  "십장생 금안 진 크림": {
    koreanLead: "십장생 금안진",
    latinLead: "Sibjangsaeng Geumanjin",
    productPart: "Cream",
  },
  "십장생 금안 진 아이크림": {
    koreanLead: "십장생 금안진",
    latinLead: "Sibjangsaeng Geumanjin",
    productPart: "Eye Cream",
  },
  "십장생 천삼진 초보양 스틱 앰플": {
    koreanLead: "십장생 천삼진",
    latinLead: "Sibjangsaeng Cheonsamjin",
    productPart: "Choboyang Stick Ampoule",
  },
  "십장생 천삼진 초보양 앰플": {
    koreanLead: "십장생 천삼진",
    latinLead: "Sibjangsaeng Cheonsamjin",
    productPart: "Choboyang Ampoule",
  },
  "시세리아 로제 드 엔젤": {
    koreanLead: "시세리아 로제 드 엔젤",
    latinLead: "Cytherea Rose de Angel",
    productPart: "Perfume",
  },
  "시세리아 볼드 프레쉬": {
    koreanLead: "시세리아 볼드 프레쉬",
    latinLead: "Cytherea Bold Fresh",
    productPart: "Perfume",
  },
  "시세리아 그리너퓨어": {
    koreanLead: "시세리아 그리너퓨어",
    latinLead: "Cytherea Greener Pure",
    productPart: "Perfume",
  },
  "시세리아 헤베 가드너리": {
    koreanLead: "시세리아 헤베 가드너리",
    latinLead: "Cytherea Hebe Gardenery",
    productPart: "Perfume",
  },
};

const productNameTerms = [
  ["EWG그린 저자극 약산성 클렌징 버블폼", "EWG Green Mild Acidic Cleansing Bubble Foam"],
  ["EWG그린 저자극 약산성 클렌징 워터", "EWG Green Mild Acidic Cleansing Water"],
  ["헤어로스 케어 샴푸", "Hair Loss Care Shampoo"],
  ["헤어로스케어 토닉", "Hair Loss Care Tonic"],
  ["위드 캐비어 모이스춰 폼 클렌징", "With Caviar Moisture Foam Cleansing"],
  ["위드 캐비어 모이스춰 스킨 소프너", "With Caviar Moisture Skin Softener"],
  ["위드 캐비어 모이스춰 에멀전", "With Caviar Moisture Emulsion"],
  ["위드 캐비어 모이스춰 아이크림", "With Caviar Moisture Eye Cream"],
  ["위드 캐비어 모이스춰 에센스", "With Caviar Moisture Essence"],
  ["위드 캐비어 모이스춰 크림", "With Caviar Moisture Cream"],
  ["위드 캐비어 모이스춰 5종 세트", "With Caviar Moisture 5-Set"],
  ["마린콜라겐 플러스 2종세트", "Marine Collagen Plus 2-Set"],
  ["마린콜라겐 플러스 3종세트", "Marine Collagen Plus 3-Set"],
  ["마린콜라겐 플러스 에멀전", "Marine Collagen Plus Emulsion"],
  ["마린콜라겐 플러스 에센스", "Marine Collagen Plus Essence"],
  ["마린콜라겐 플러스 스킨", "Marine Collagen Plus Skin Softener"],
  ["마린콜라겐 플러스 크림", "Marine Collagen Plus Cream"],
  ["스네일 수분크림", "Snail Moisture Cream"],
  ["콜라겐 비비spf30pa+", "Collagen BB SPF30 PA+"],
  ["초보양 스틱 앰플", "Choboyang Stick Ampoule"],
  ["초보양 앰플", "Choboyang Ampoule"],
  ["수분광채 에센스", "Moisture Glow Essence"],
  ["수분광채 크림", "Moisture Glow Cream"],
  ["메이크업베이스", "Make-Up Base"],
  ["투웨이케익", "Two-Way Cake"],
  ["스킨커버", "Skin Cover"],
  ["파운데이션", "Foundation"],
  ["비비크림", "BB Cream"],
  ["모이스처 클렌징폼", "Moisture Cleansing Foam"],
  ["헤어 칼라크림 새치용", "Hair Color Cream For Gray Hair"],
  ["헤어칼라 크림 멋내기용", "Hair Color Cream Fashion Color"],
  ["초강력 헤어미스트", "Extra Strong Hair Mist"],
  ["헤어 코팅 에센스", "Hair Coating Essence"],
  ["헤어 컬링 에센스", "Hair Curling Essence"],
  ["헤어 멀티에센스", "Hair Multi Essence"],
  ["헤어 트리트먼트", "Hair Treatment"],
  ["헤어 컨디셔너", "Hair Conditioner"],
  ["아르간 헤어오일", "Argan Hair Oil"],
  ["헤어 스프레이", "Hair Spray"],
  ["헤어샴푸", "Hair Shampoo"],
  ["헤어젤", "Hair Gel"],
  ["바디 2종세트", "Body 2-Set"],
  ["바디 클렌저", "Body Cleanser"],
  ["바디 에센스", "Body Essence"],
  ["클렌징 버블폼", "Cleansing Bubble Foam"],
  ["클렌징 워터", "Cleansing Water"],
  ["클렌징 젤 폼", "Cleansing Gel Foam"],
  ["클렌징 크림", "Cleansing Cream"],
  ["폼클렌징", "Foam Cleansing"],
  ["폼 클렌징", "Foam Cleansing"],
  ["마사지 크림", "Massage Cream"],
  ["필링겔", "Peeling Gel"],
  ["필링젤", "Peeling Gel"],
  ["선블럭", "Sun Block"],
  ["선크림", "Sun Cream"],
  ["썬크림", "Sun Cream"],
  ["자양 에센스", "Nourishing Essence"],
  ["자양크림", "Nourishing Cream"],
  ["아이크림", "Eye Cream"],
  ["진 에센스", "Jin Essence"],
  ["2종 세트", "2-Set"],
  ["2종세트", "2-Set"],
  ["3종 세트", "3-Set"],
  ["3종세트", "3-Set"],
  ["올인원 스킨에센스", "All-In-One Skin Essence"],
  ["스킨에센스", "Skin Essence"],
  ["스킨 소프너", "Skin Softener"],
  ["에멀전", "Emulsion"],
  ["에센스", "Essence"],
  ["컨디셔너", "Conditioner"],
  ["샴푸", "Shampoo"],
  ["수액", "Skin Toner"],
  ["유액", "Emulsion"],
  ["진액", "Essence"],
  ["크림", "Cream"],
  ["스킨", "Skin Softener"],
  ["토닉", "Tonic"],
  ["멀티밤", "Multi Balm"],
  ["마스카라", "Mascara"],
  ["아이라이너", "Eyeliner"],
  ["쿠션", "Cushion"],
  ["핸드크림", "Hand Cream"],
  ["향수", "Perfume"],
  ["리뉴얼", "Renewal"],
  ["플러스", "Plus"],
  ["로맨틱", "Romantic"],
  ["포맨", "For Men"],
  ["옴므", "Homme"],
  ["알로에", "Aloe"],
  ["아르간", "Argan"],
  ["진생 리바이탈", "Ginseng Revital"],
  ["핑크", "Pink"],
  ["환희", "Hwanhee"],
  ["제떼", "Jette"],
].sort(([a], [b]) => b.length - a.length);

function normalizeEnglishName(value: string) {
  return value
    .replace(/(\d+),(\d+)호/g, "No.$1/$2")
    .replace(/(\d+)호/g, "No.$1")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/([A-Za-z])No\./g, "$1 No.")
    .replace(/spf\s*(\d+)/gi, "SPF$1")
    .replace(/pa\s*(\+*)/gi, "PA$1")
    .replace(/\s+/g, " ")
    .replace(/\s+([),/+])/g, "$1")
    .replace(/([(/+])\s+/g, "$1")
    .trim();
}

function translateProductPart(value: string) {
  let translated = replaceProperNounsWithLatin(value);

  productNameTerms.forEach(([korean, english]) => {
    translated = translated.replaceAll(korean, english);
  });

  return normalizeEnglishName(translated);
}

function createDisplayName(name: string) {
  const override = productNameOverrides[name];

  if (override) {
    return override;
  }

  const { koreanLead, latinLead, remainder } = splitLeadingProperNouns(name);
  const productPart = translateProductPart(remainder);
  const fallbackName = translateProductPart(name);

  return {
    koreanLead,
    latinLead: latinLead || fallbackName,
    productPart: productPart && productPart !== remainder ? productPart : remainder,
  };
}

export function ProductCardName({ name }: { name: string }) {
  const displayName = createDisplayName(name);

  return (
    <span className="product-card-name">
      <span className="product-card-name-ko">{name}</span>
      <span className="product-card-name-translated notranslate" translate="no">
        {displayName.koreanLead ? <span className="product-card-name-korean-lead">{displayName.koreanLead}</span> : null}
        <span className="product-card-name-latin">
          {displayName.latinLead ? <span className="product-card-name-latin-lead">{displayName.latinLead}</span> : null}
          {displayName.productPart ? <span className="product-card-name-product">{displayName.productPart}</span> : null}
        </span>
      </span>
    </span>
  );
}
