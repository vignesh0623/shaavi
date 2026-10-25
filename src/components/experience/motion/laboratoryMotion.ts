import { gsap, query, revealOnce, SETTLE, type Cleanup, type MotionContext } from "./shared";

/*
 * About, Our Laboratory: the photo fades in as its image settles from a
 * slight zoom and the quote follows line by line; the copy beside it fades
 * up. While the two sit side by side the photo also drifts a little slower
 * than the page, exactly in its design position when the section is centred
 * on screen.
 */
export function setupLaboratoryMotion({ root, reduce, desktop }: MotionContext): Cleanup {
  const section = query(root, "laboratory");
  if (!section) return;
  const media = query(section, "laboratory-media");
  const image = media?.querySelector("img");
  const quote = query(section, "laboratory-quote");
  const content = query(section, "laboratory-content");
  // Stacked, the photo would drift into the copy below it.
  const drift = desktop && !reduce;

  if (media) {
    revealOnce(media, (timeline) => {
      if (reduce) {
        timeline.from(media, { opacity: 0, duration: 0.6, ...SETTLE });
        return;
      }
      // The drift owns the photo's position (and its transform), so with it
      // on the reveal only fades the photo in and leaves its transform alone.
      timeline.from(
        media,
        drift
          ? { opacity: 0, duration: 1, clearProps: "opacity" }
          : { opacity: 0, y: 36, duration: 1, ...SETTLE },
      );
      if (image) timeline.from(image, { scale: 1.12, duration: 1.4, ease: "power2.out", ...SETTLE }, 0);
      if (quote) {
        timeline.from(quote.children, { opacity: 0, y: 18, duration: 0.9, stagger: 0.12, ...SETTLE }, 0.3);
      }
    });
  }

  if (content) {
    revealOnce(content, (timeline) =>
      timeline.from(
        content.children,
        reduce
          ? { opacity: 0, duration: 0.6, ...SETTLE }
          : { opacity: 0, y: 28, duration: 1, stagger: 0.1, ...SETTLE },
      ),
    );
  }

  if (media && drift) {
    gsap.fromTo(
      media,
      { y: 30 },
      {
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
      },
    );
  }
}
