import { Poppins } from "next/font/google";
import { type ReactNode, useId } from "react";
import { DetailsTable } from "@/components/ui";
import type {
  LegalBlock,
  LegalDocument as LegalDocumentContent,
  LegalText,
} from "@/content/legal";
import { cx } from "@/lib/cx";
import type { Reveal } from "@/lib/reveal";
import styles from "./LegalDocument.module.css";

// Only the summary note uses italics, so the italic face is loaded here
// rather than for the whole site.
const poppinsItalic = Poppins({ subsets: ["latin"], weight: "400", style: "italic" });

type LegalDocumentProps = {
  content: LegalDocumentContent;
  className?: string;
};

/** Words joined by non-breaking spaces (\u00a0), e.g. "legal,\u00a0regulatory\u00a0and". */
const JOINED_WORDS = /\S*(?:\u00a0\S*)+/g;

/**
 * The design joins many words with non-breaking spaces, which decide where
 * its lines wrap. Each joined group is kept on one line by CSS instead, so
 * phones can still wrap groups that are wider than the screen.
 */
function keepJoined(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let end = 0;
  for (const match of text.matchAll(JOINED_WORDS)) {
    parts.push(text.slice(end, match.index));
    parts.push(
      <span key={match.index} className={styles.joined}>
        {match[0].replaceAll("\u00a0", " ")}
      </span>,
    );
    end = match.index + match[0].length;
  }
  parts.push(text.slice(end));
  return parts;
}

function Text({
  text,
  className,
  "data-reveal": reveal,
}: {
  text: LegalText;
  className?: string;
  "data-reveal"?: Reveal;
}) {
  return (
    <p className={cx(styles.text, className)} data-reveal={reveal}>
      {typeof text === "string"
        ? keepJoined(text)
        : text.map((run, index) =>
            typeof run === "string" ? (
              keepJoined(run)
            ) : (
              <span key={index} className={styles[run.weight]}>
                {keepJoined(run.text)}
              </span>
            ),
          )}
    </p>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string" || Array.isArray(block)) return <Text text={block} />;

  if ("list" in block) {
    return (
      // `role` keeps the list announced as one once its bullets are restyled.
      <ul role="list" className={cx(styles.list, block.relaxed && styles.relaxed)}>
        {block.list.map((item) => (
          <li key={item}>{keepJoined(item)}</li>
        ))}
      </ul>
    );
  }

  if ("subheading" in block) {
    return (
      <div className={styles.topic}>
        <h3 className={styles.subheading}>{block.subheading}</h3>
        <Text text={block.text} className={styles.relaxed} />
      </div>
    );
  }

  return (
    <Text
      text={block.text}
      className={cx(block.relaxed && styles.relaxed, block.semibold && styles.semibold)}
    />
  );
}

/** Body of a legal page: optional key details, numbered sections and closing notes. */
export function LegalDocument({ content, className }: LegalDocumentProps) {
  const { summary, preamble, sections, record, closing } = content;
  const summaryId = useId();

  return (
    <article className={cx(styles.document, className)}>
      {summary && (
        <div className={styles.summary} data-reveal="bottom">
          <h2 id={summaryId} className={styles.summaryTitle}>
            {summary.title}
          </h2>
          <DetailsTable rows={summary.rows} labelledBy={summaryId} />
          <p className={cx(styles.summaryNote, poppinsItalic.className)}>{summary.note}</p>
        </div>
      )}

      {preamble && <Text text={preamble} data-reveal="bottom" />}

      {sections.map((section) => (
        <section key={section.title} className={styles.section} data-reveal="bottom">
          <h2 className={styles.heading}>{section.title}</h2>
          {section.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </section>
      ))}

      {record && <DetailsTable rows={record} size="lg" data-reveal="bottom" />}

      {closing && (
        <p className={styles.closing} data-reveal="bottom">
          {closing}
        </p>
      )}
    </article>
  );
}
