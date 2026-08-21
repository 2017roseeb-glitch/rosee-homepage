"use client";

import Link from "next/link";
import { ProperNounText } from "./proper-noun-text";

type Menu = {
  href: string;
  items?: string[][];
  label: string;
};

export default function SiteNav({ menus }: { menus: Menu[] }) {
  function closeDropdown() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  return (
    <nav className="site-nav" aria-label="주요 메뉴">
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
    </nav>
  );
}
