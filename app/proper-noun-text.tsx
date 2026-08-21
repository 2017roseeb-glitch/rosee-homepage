import type { ReactNode } from "react";

const properNouns = [
  { korean: "로제화장품(주)", latin: "ROSEE Cosmetics Co., Ltd." },
  { korean: "로제화장품", latin: "ROSEE Cosmetics" },
  { korean: "로제 드 엔젤", latin: "Rose de Angel" },
  { korean: "로제 블라썸", latin: "ROSEE Blossom" },
  { korean: "로제블라썸", latin: "ROSEE Blossom" },
  { korean: "로제 포맨", latin: "ROSEE For Men" },
  { korean: "에코 라임 민트", latin: "Eco Lime Mint" },
  { korean: "에코 라임민트", latin: "Eco Lime Mint" },
  { korean: "에코 알로에", latin: "Eco Aloe" },
  { korean: "에코알로에", latin: "Eco Aloe" },
  { korean: "에코 로즈", latin: "Eco Rose" },
  { korean: "에코", latin: "Eco" },
  { korean: "오퍼스 옴므", latin: "Opus Homme" },
  { korean: "시세리아", latin: "Cytherea" },
  { korean: "볼드 프레쉬", latin: "Bold Fresh" },
  { korean: "그리너퓨어", latin: "Greener Pure" },
  { korean: "헤베 가드너리", latin: "Hebe Gardenery" },
  { korean: "십장생", latin: "Sibjangsaeng" },
  { korean: "천지향", latin: "Cheonjihyang" },
  { korean: "천심", latin: "Cheonshim" },
  { korean: "용비", latin: "Yongbi" },
  { korean: "비단모", latin: "Bidanmo" },
  { korean: "아름다운 선", latin: "Areumdaun Sun" },
  { korean: "예결", latin: "Yegyeol" },
  { korean: "천삼진", latin: "Cheonsamjin" },
  { korean: "금안 진", latin: "Geumanjin" },
  { korean: "금안진", latin: "Geumanjin" },
  { korean: "금안", latin: "Geuman" },
  { korean: "마자린", latin: "Mazarin" },
  { korean: "마린콜라겐", latin: "Marine Collagen" },
  { korean: "오퍼스", latin: "Opus" },
  { korean: "루비어스", latin: "Rubious" },
  { korean: "셀액티브", latin: "Cell Active" },
  { korean: "이브닥터", latin: "Eve Doctor" },
  { korean: "흑마늘", latin: "Black Garlic" },
  { korean: "로제", latin: "ROSEE" },
].sort((a, b) => b.korean.length - a.korean.length);

const properNounByKorean = new Map(properNouns.map((term) => [term.korean, term.latin]));
const properNounPattern = new RegExp(
  `(${properNouns.map((term) => term.korean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g",
);

export function replaceProperNounsWithLatin(text: string) {
  return text.replace(properNounPattern, (matched) => properNounByKorean.get(matched) ?? matched);
}

export function splitLeadingProperNouns(text: string) {
  const koreanParts: string[] = [];
  const latinParts: string[] = [];
  let remaining = text.trim();

  while (remaining) {
    const matchedTerm = properNouns.find((term) => remaining.startsWith(term.korean));

    if (!matchedTerm) {
      break;
    }

    koreanParts.push(matchedTerm.korean);
    latinParts.push(matchedTerm.latin);
    remaining = remaining.slice(matchedTerm.korean.length).trimStart();
  }

  return {
    koreanLead: koreanParts.join(" "),
    latinLead: latinParts.join(" "),
    remainder: remaining.trim(),
  };
}

export function renderProperNounText(text: string, keyPrefix = "proper-noun"): ReactNode {
  return text.split(properNounPattern).map((part, index) => {
    const latin = properNounByKorean.get(part);

    if (!latin) {
      return part;
    }

    return (
      <span className="proper-noun notranslate" key={`${keyPrefix}-${part}-${index}`} translate="no">
        <span className="proper-noun-ko">{part}</span>
        <span className="proper-noun-latin">{latin}</span>
      </span>
    );
  });
}

export function ProperNounText({ children }: { children: string }) {
  return <>{renderProperNounText(children)}</>;
}
