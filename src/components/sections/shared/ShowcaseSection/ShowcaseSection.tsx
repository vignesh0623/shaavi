import { Children, type ReactNode } from "react";
import { Button, SectionHeader } from "@/components/ui";
import { cx } from "@/lib/cx";
import styles from "./ShowcaseSection.module.css";

type ShowcaseSectionProps = {
  id: string;
  /** Use "\n" to break the title onto a second line. */
  title: string;
  description?: string;
  action?: { label: string; href: string };
  /** `tinted` gives the section the light-blue background. */
  tone?: "plain" | "tinted";
  /**
   * Cards take the tallest one's height (profile cards, so their buttons
   * line up when a name wraps). Otherwise they're centred, as designed.
   */
  equalHeights?: boolean;
  /** One card per item; each is wrapped in a list item. */
  children: ReactNode;
  className?: string;
};

/** Section header + a row of up to five cards (profiles, tests). */
export function ShowcaseSection({
  id,
  title,
  description,
  action,
  tone = "plain",
  equalHeights,
  children,
  className,
}: ShowcaseSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx(styles.section, styles[tone], className)}
    >
      <div className={styles.inner}>
        <SectionHeader
          title={title}
          titleId={titleId}
          description={description}
          action={
            action && (
              <Button href={action.href} variant="dark" size="md" icon="arrow">
                {action.label}
              </Button>
            )
          }
        />
        {/* Cards that reveal (the home page's animate themselves) arrive
            together, so those past the edge of a row that scrolls
            sideways are in place when swiped to. */}
        <ul
          className={cx(styles.cards, equalHeights && styles.equalHeights)}
          data-motion="cards"
          data-reveal-group
        >
          {Children.map(children, (card) => (
            <li>{card}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
