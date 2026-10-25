import { cx } from "@/lib/cx";
import styles from "./PriceTag.module.css";

type PriceTagProps = {
  price: string;
  originalPrice?: string;
  /** Colour of the struck-through price; the two card types differ. */
  strikeTone?: "light" | "placeholder";
  className?: string;
};

export function PriceTag({
  price,
  originalPrice,
  strikeTone = "light",
  className,
}: PriceTagProps) {
  return (
    <div className={cx(styles.price, className)}>
      <span className={cx(styles.current, "text-trim")}>{price}</span>
      {originalPrice && (
        <s className={cx(styles.original, styles[strikeTone], "text-trim")}>
          <span className="visually-hidden">Was </span>
          {originalPrice}
        </s>
      )}
    </div>
  );
}
