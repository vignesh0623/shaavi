/**
 * How a block arrives as it comes into view, set with `data-reveal`: the
 * side it slides in from, `zoom` (rises while growing to full size) or
 * `fade`. Blocks that come into view together arrive one after another, top
 * to bottom and left to right, so a new page builds up layer by layer.
 * Inside a `data-reveal-group` (a row of cards that scrolls sideways), they
 * all arrive once any of them comes into view. RevealObserver plays them;
 * globals.css styles them.
 */
export type Reveal = "top" | "bottom" | "left" | "right" | "zoom" | "fade";
