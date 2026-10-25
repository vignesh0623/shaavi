"use client";

import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import type { Reveal } from "@/lib/reveal";
import { replaceUrlSearchParams, useUrlSearchParams } from "@/lib/urlState";

type CatalogSearchProps = {
  placeholder: string;
  className?: string;
  "data-reveal"?: Reveal;
};

/**
 * The listing's search field. The query lives in the URL (`?q=`), where the
 * grid reads it, so the cards filter as you type and the home page's search
 * lands on All Tests already filtered.
 */
export function CatalogSearch({ placeholder, className, "data-reveal": reveal }: CatalogSearchProps) {
  const params = useUrlSearchParams();

  return (
    <SearchBar
      placeholder={placeholder}
      query={params.get("q") ?? ""}
      onQueryChange={(query) => replaceUrlSearchParams({ q: query })}
      className={className}
      data-reveal={reveal}
    />
  );
}
