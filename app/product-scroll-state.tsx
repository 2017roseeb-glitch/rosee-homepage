"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

const lastListPathKey = "rosee:last-product-list-path";
const scrollKeyPrefix = "rosee:product-list-scroll:";

function currentListPath() {
  return `${window.location.pathname}${window.location.search}`;
}

function scrollKey(path: string) {
  return `${scrollKeyPrefix}${path}`;
}

export function ProductScrollRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const key = scrollKey(currentListPath());
    const storedY = Number(window.sessionStorage.getItem(key));

    if (!Number.isFinite(storedY) || storedY <= 0) {
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";

    const restore = () => window.scrollTo(0, storedY);
    restore();
    requestAnimationFrame(restore);
    window.setTimeout(restore, 80);
    window.setTimeout(() => {
      restore();
      root.style.scrollBehavior = previousScrollBehavior;
    }, 220);
  }, [pathname]);

  return null;
}

type ProductListLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
};

export function ProductListLink({ children, className, href }: ProductListLinkProps) {
  function rememberScroll() {
    const path = currentListPath();
    window.sessionStorage.setItem(lastListPathKey, path);
    window.sessionStorage.setItem(scrollKey(path), String(window.scrollY));
  }

  return (
    <Link className={className} href={href} onClick={rememberScroll}>
      {children}
    </Link>
  );
}
