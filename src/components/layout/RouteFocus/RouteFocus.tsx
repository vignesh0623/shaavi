"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * After moving to another page from a header or footer link, focus goes to
 * the new page's content, as on a fresh page load. Otherwise it stays on the
 * link (the header and footer persist), and pressing a key to scroll would
 * show the link's focus ring.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!document.activeElement?.closest("header, footer")) return;
    const main = document.querySelector("main");
    if (!main) return;
    main.tabIndex = -1;
    main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
