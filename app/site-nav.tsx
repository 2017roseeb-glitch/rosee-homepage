"use client";

import Link from "next/link";
import { useState } from "react";
import { ProperNounText } from "./proper-noun-text";

type Menu = {
  href: string;
  items?: string[][];
  label: string;
};

export default function SiteNav({ menus }: { menus: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeDropdown() {
    setIsOpen(false);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  return (
    <nav className={isOpen ? "site-nav is-open" : "site-nav"} aria-label="주요 메뉴">
      <button
        aria-controls="site-nav-list"
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        className="menu-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="site-nav-list" id="site-nav-list">
        {menus.map((menu) => (
          <div className="nav-item" key={menu.label}>
            <Link href={menu.href} onClick={closeDropdown}>
              {menu.label}
            </Link>
            {menu.items ? (
              <div className="nav-dropdown">
                <strong>{menu.label}</strong>
                <ul>
                  {menu.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} onClick={closeDropdown}>
                        <ProperNounText>{label}</ProperNounText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </nav>
  );
}
