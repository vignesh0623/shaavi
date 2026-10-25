import Image from "next/image";
import { icons, type IconName } from "@/constants/icons";
import { cx } from "@/lib/cx";
import styles from "./Icon.module.css";

type IconProps = {
  name: IconName;
  /** Accessible label. Leave empty for decorative icons. */
  alt?: string;
  className?: string;
};

/** Renders an SVG icon from `public/icons` at its design size. */
export function Icon({ name, alt = "", className }: IconProps) {
  const { src, width, height } = icons[name];

  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(width)}
      height={Math.round(height)}
      aria-hidden={alt ? undefined : true}
      className={cx(styles.icon, className)}
      style={{ width, height }}
    />
  );
}
