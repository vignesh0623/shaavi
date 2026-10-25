import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so that moving to another one shows: Next runs every
 * navigation as a React transition, which plays this `<ViewTransition>`'s
 * enter on the new page (the old one is simply replaced, and the header
 * stays put). The animation is in globals.css. Browsers without view
 * transitions swap the pages as before.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="none" default="none">
      {children}
    </ViewTransition>
  );
}
