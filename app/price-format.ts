const wonPricePattern = /^\d{1,3}(?:,\d{3})*원$/;

export function isWonPrice(price: string) {
  return wonPricePattern.test(price);
}

export function formatPrice(price: string) {
  return isWonPrice(price) ? `${price} (KRW)` : price;
}
