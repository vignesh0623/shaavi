"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import { Icon } from "../Icon/Icon";
import styles from "./BackLink.module.css";

type BackLinkProps = {
  /** Where to go when the previous page isn't one of this site's (a page
      opened from a search engine or a shared link). */
  href: string;
  className?: string;
  "data-reveal"?: Reveal;
};

/**
 * Round back arrow at the top of a page (All Tests, a test's page). Like the
 * browser's Back button, it returns to the previous page (its scroll position
 * and filters too) when that page is on this site; otherwise it opens `href`.
 */
export function BackLink({ href, className, "data-reveal": reveal }: BackLinkProps) {
  const router = useRouter();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // A new tab or window (modifier keys, middle click) still gets `href`.
    const plainClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (!plainClick || !cameFromThisSite()) return;
    event.preventDefault();
    router.back();
  };

  return (
    <Link
      href={href}
      aria-label="Back"
      onClick={onClick}
      className={cx(styles.link, className)}
      data-reveal={reveal}
    >
      <Icon name="arrowLeft" />
    </Link>
  );
}

/** Whether the previous entry in the tab's history is one of this site's pages. */
function cameFromThisSite() {
  // The Navigation API lists only this site's entries; without it, any
  // earlier entry in the tab counts.
  const { navigation } = window as Window & { navigation?: { canGoBack: boolean } };
  return navigation ? navigation.canGoBack : window.history.length > 1;
}
