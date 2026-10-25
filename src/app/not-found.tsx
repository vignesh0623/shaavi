import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
// From its own module rather than the index file: in development, Next
// preloads this page's styles on every page, and the index would pull in
// every shared section's styles too.
import { NoticeSection } from "@/components/sections/shared/NoticeSection/NoticeSection";

/** 404 page, inside the root layout's header and footer. */
export default function NotFound() {
  return (
    <PageTransition>
      <main>
        <NoticeSection
          eyebrow="Error 404"
          title="Page Not Found"
          description="Sorry, we couldn't find the page you're looking for. It may have moved or no longer exists."
        />
      </main>
    </PageTransition>
  );
}
