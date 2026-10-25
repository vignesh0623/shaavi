import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Button.module.css";

type ButtonOwnProps = {
  children: ReactNode;
  /**
   * primary: blue · dark: near-black · soft: blue tint · outline: blue border ·
   * light: white · subtle: faint blue tint, grey label
   */
  variant?: "primary" | "dark" | "soft" | "outline" | "light" | "subtle";
  /** Figma "Button Small" (38px), "Button Medium" (42px), "Button Large" (60px). */
  size?: "sm" | "md" | "lg";
  /** Trailing chip holding an icon: white, or blue-tinted for `arrowSmall`. */
  icon?: "arrow" | "arrowSmall" | "download";
  fullWidth?: boolean;
  className?: string;
};

type LinkButtonProps = ButtonOwnProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonOwnProps>;

type NativeButtonProps = ButtonOwnProps &
  Omit<ComponentProps<"button">, keyof ButtonOwnProps> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const chipIcon = {
  arrow: "arrowOutward",
  arrowSmall: "arrowOutwardSmall",
  download: "download",
} as const;

/** Pill-shaped button. Renders a Next.js `Link` when `href` is set. */
export function Button({
  children,
  variant = "primary",
  size = "sm",
  icon,
  fullWidth,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      <span className={cx(styles.label, "text-trim")}>{children}</span>
      {icon && (
        <span className={cx(styles.chip, styles[icon])}>
          <Icon name={chipIcon[icon]} />
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<LinkButtonProps, keyof ButtonOwnProps>)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as Omit<NativeButtonProps, keyof ButtonOwnProps>)}
    >
      {content}
    </button>
  );
}
