import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { routes } from "@/config/routes";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import { Icon } from "../Icon/Icon";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  placeholder?: string;
  id?: string;
  /** Page the form submits `?q=` to: All Tests, which filters by it. */
  action?: string;
  /**
   * Live search (on All Tests): the field shows `query` and reports every
   * change instead of submitting.
   */
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Replaces the submit to `action` (live search only cancels it). */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /** More attributes for the field, e.g. the home page's combobox state. */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  "data-reveal"?: Reveal;
};

/** Test search field. Submits `?q=` with the query. */
export function SearchBar({
  placeholder = "Search for tests, packages or profiles",
  id = "site-search",
  action = routes.tests,
  query,
  onQueryChange,
  onSubmit,
  inputProps,
  className,
  "data-reveal": reveal,
}: SearchBarProps) {
  const liveField = onQueryChange
    ? {
        value: query ?? "",
        onChange: (event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value),
      }
    : {};

  return (
    <form
      role="search"
      action={action}
      onSubmit={onSubmit ?? (onQueryChange ? (event) => event.preventDefault() : undefined)}
      className={cx(styles.search, className)}
      data-reveal={reveal}
    >
      <div className={styles.field}>
        <label htmlFor={id} className="visually-hidden">
          {placeholder}
        </label>
        <input
          id={id}
          name="q"
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          className={styles.input}
          {...liveField}
          {...inputProps}
        />
      </div>
      <button type="submit" aria-label="Search" className={styles.submit}>
        <Icon name="search" />
      </button>
    </form>
  );
}
