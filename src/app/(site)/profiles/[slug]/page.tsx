import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition/PageTransition";
import { RelatedSections, TestDetail } from "@/components/sections/tests";
import { getProfile, getRelated, profiles } from "@/content/tests";
import styles from "./page.module.css";

// Every profile is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return profiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/profiles/[slug]">): Promise<Metadata> {
  const profile = getProfile((await params).slug);
  return profile ? { title: profile.name, description: profile.description } : {};
}

export default async function ProfilePage({ params }: PageProps<"/profiles/[slug]">) {
  const profile = getProfile((await params).slug);
  if (!profile) notFound();
  const related = getRelated(profile);

  return (
    <PageTransition>
      <main className={styles.page}>
        <TestDetail kind="profiles" entry={profile} />
        <RelatedSections
          lead="profiles"
          tests={related.tests}
          profiles={related.profiles}
          pageImage={profile.image}
          className={styles.related}
        />
      </main>
    </PageTransition>
  );
}
