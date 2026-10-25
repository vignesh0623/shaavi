import { AccordionItem } from "@/components/ui";
import type { FaqBlock, FaqItem } from "@/content/faq";
import { cx } from "@/lib/cx";
import styles from "./FaqList.module.css";

type FaqListProps = {
  items: FaqItem[];
  className?: string;
};

function AnswerBlock({ block }: { block: FaqBlock }) {
  if (typeof block === "string") return <p className={styles.block}>{block}</p>;

  return (
    <p className={styles.block}>
      {block.map((segment, index) => {
        const tone = segment.tone && styles[segment.tone];
        if (segment.href) {
          return (
            <a key={index} href={segment.href} className={cx(tone, styles.link)}>
              {segment.text}
            </a>
          );
        }
        return tone ? (
          <span key={index} className={tone}>
            {segment.text}
          </span>
        ) : (
          segment.text
        );
      })}
    </p>
  );
}

/** Numbered questions; only the first starts open. */
export function FaqList({ items, className }: FaqListProps) {
  return (
    <ol className={cx(styles.list, className)}>
      {items.map((item, index) => (
        <li key={index} data-reveal="bottom">
          <AccordionItem
            defaultOpen={index === 0}
            title={
              <span className={cx(styles.question, "text-trim")}>
                <span className={styles.number}>{index + 1}.</span> {item.question}
              </span>
            }
          >
            <div className={styles.answer}>
              {item.answer.map((block, blockIndex) => (
                <AnswerBlock key={blockIndex} block={block} />
              ))}
            </div>
          </AccordionItem>
        </li>
      ))}
    </ol>
  );
}
