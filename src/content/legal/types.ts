/*
 * Shape shared by the legal pages: Terms and Conditions, Cookie Policy and
 * Privacy Policy. Text is copied verbatim from the Figma design: "\n" is a
 * line break and "\n\n" a blank line, leading spaces (as before " * " bullets)
 * are kept, and the design's non-breaking spaces ("\u00a0") are kept too,
 * because they decide where lines wrap.
 */

/** A run of heavier text inside a paragraph. */
export type LegalRun = { text: string; weight: "medium" | "semibold" | "bold" };

/** Paragraph text: plain, or plain text mixed with heavier runs. */
export type LegalText = string | (string | LegalRun)[];

/** One piece of a section, in reading order. */
export type LegalBlock =
  /** Paragraphs at the standard 21px line height. */
  | LegalText
  | {
      text: LegalText;
      /** 26px line height instead of 21px. */
      relaxed?: boolean;
      /** Sets the whole text in semibold. */
      semibold?: boolean;
    }
  /** Bulleted list. */
  | { list: string[]; relaxed?: boolean }
  /** Paragraph under a small heading of its own (26px line height). */
  | { subheading: string; text: string };

export type LegalSection = {
  /** Numbered heading, e.g. "1. Our Services". */
  title: string;
  body: LegalBlock[];
};

/** Label and value of one table row. */
export type LegalTableRow = [label: string, value: string];

export type LegalDocument = {
  /** Page heading: tag, title and the lines under it. */
  intro: { eyebrow: string; title: string; description: string };
  /** Key details above the sections: a heading, a table and a note. */
  summary?: { title: string; rows: LegalTableRow[]; note: string };
  /** Text before the first numbered section. */
  preamble?: LegalText;
  sections: LegalSection[];
  /** Details table after the last section. */
  record?: LegalTableRow[];
  /** Closing line, set darker than the body text. */
  closing?: string;
};
