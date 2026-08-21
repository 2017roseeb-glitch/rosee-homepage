"use client";

import { useRouter } from "next/navigation";

const lastListPathKey = "rosee:last-product-list-path";

export function BackToProductsButton() {
  const router = useRouter();

  function handleClick() {
    const storedListPath = window.sessionStorage.getItem(lastListPathKey);

    if (storedListPath && window.history.length > 1) {
      window.history.back();
      return;
    }

    router.push(storedListPath || "/products");
  }

  return (
    <button className="button dark" type="button" onClick={handleClick}>
      목록
    </button>
  );
}
