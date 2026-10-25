import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
// First, so every component's styles come after the global ones (CSS loads
// in import order).
import "./globals.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { RevealObserver } from "@/components/layout/RevealObserver/RevealObserver";
import { RouteFocus } from "@/components/layout/RouteFocus/RouteFocus";
import { site } from "@/config/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Reliable & High-Quality Clinical Services`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

/**
 * Root layout: document shell, fonts, global styles, and the header and
 * footer every page shares. The 404 page (not-found.tsx) renders inside it,
 * so it reuses the header's and footer's styles instead of bundling its own
 * copy of them.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
        <RouteFocus />
        <RevealObserver />
      </body>
    </html>
  );
}
