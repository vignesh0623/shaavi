"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActiveLink, type NavLink } from "@/config/navigation";
import { cx } from "@/lib/cx";
import styles from "./Header.module.css";

/**
 * Primary navigation; highlights the link for the current page.
 * Below 1024px the links move into a toggleable panel.
 */
export function NavMenu({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The header stays mounted across pages, so close the panel on any
  // navigation, the browser's Back and Forward included.
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setOpen(false);
  }

  // Close the panel on Escape (moving focus from a link in it, about to be
  // hidden, back to the button) or on a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (navRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
      setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav ref={navRef} aria-label="Main" className={styles.nav}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="main-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className={cx(styles.toggle, open && styles.toggleOpen)}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul id="main-menu" className={cx(styles.menu, open && styles.menuOpen)}>
        {links.map(({ label, href }) => {
          const active = isActiveLink(href, pathname);
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx(styles.link, active && styles.active, "text-trim", "tap-area")}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
