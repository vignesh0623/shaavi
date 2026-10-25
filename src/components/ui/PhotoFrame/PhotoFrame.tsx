import Image, { type ImageProps } from "next/image";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./PhotoFrame.module.css";

type PhotoFrameProps = Omit<ComponentProps<"div">, "children"> & {
  src: string;
  alt: string;
  /** Its widths across screen sizes, as for next/image, to pick the image size. */
  sizes: string;
  /** "eager" for a photo that can be on screen when the page opens. */
  loading?: ImageProps["loading"];
};

/**
 * Rounded photo with the design's 30% brand-blue wash.
 * Size and corner radius come from `className`; other attributes go on the frame.
 */
export function PhotoFrame({ src, alt, sizes, loading, className, ...rest }: PhotoFrameProps) {
  return (
    <div className={cx(styles.frame, className)} {...rest}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        className={styles.image}
      />
    </div>
  );
}
