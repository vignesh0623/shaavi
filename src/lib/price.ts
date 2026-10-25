const pounds = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

/** Formats a price in pounds the way the design shows it: 45 → "£45.00". */
export function formatPrice(amount: number) {
  return pounds.format(amount);
}
