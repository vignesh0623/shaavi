import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { RelatedSections, TestDetail } from "@/components/sections/tests";
import { getRelated, getTest, tests } from "@/content/tests";
import styles from "./page.module.css";

// Every test is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return tests.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/tests/[slug]">): Promise<Metadata> {
  const test = getTest((await params).slug);
  return test ? { title: test.name, description: test.description } : {};
}

export default async function TestPage({ params }: PageProps<"/tests/[slug]">) {
  const test = getTest((await params).slug);
  if (!test) notFound();
  const related = getRelated(test);

  return (
    <PageTransition>
      <main className={styles.page}>
        <TestDetail kind="tests" entry={test} />
        <RelatedSections
          lead="tests"
          tests={related.tests}
          profiles={related.profiles}
          pageImage={test.image}
          className={styles.related}
        />
      </main>
    </PageTransition>
  );
}
