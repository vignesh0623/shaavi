import { useMemo, useSyncExternalStore } from "react";

/*
 * The URL's query string as shared state, for client components on static
 * pages. Unlike `useSearchParams`, reading it doesn't take the component out
 * of the prerendered HTML: while prerendering and hydrating it is empty, and
 * the real query string follows straight after hydration.
 */

/** Fired by `replaceUrlSearchParams`; history updates don't fire events of their own. */
const CHANGE_EVENT = "urlsearchparamschange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

const getSearch = () => window.location.search;
const getServerSearch = () => "";

/** The current query parameters; re-renders whenever they change. */
export function useUrlSearchParams() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Sets query parameters in place, without a new history entry, so filters
 * survive a reload and coming back to the page. Empty values are removed.
 */
export function replaceUrlSearchParams(updates: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [name, value] of Object.entries(updates)) {
    if (value) url.searchParams.set(name, value);
    else url.searchParams.delete(name);
  }
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
