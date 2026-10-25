import Image from "next/image";
import { BackLink, Button, CheckList, InfoCard, PhotoFrame } from "@/components/ui";
import { routes } from "@/config/routes";
import type { IconName } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  categoryLabels,
  DEFAULT_REPORT_DELIVERY,
  profileContents,
  testCount,
  type LabProfile,
  type LabTest,
} from "@/content/tests";
import { cx } from "@/lib/cx";
import { formatPrice } from "@/lib/price";
import { IncludedTests } from "../IncludedTests/IncludedTests";
import { SampleJourney } from "../SampleJourney/SampleJourney";
import styles from "./TestDetail.module.css";

type TestDetailProps = { className?: string } & (
  | { kind: "tests"; entry: LabTest }
  | { kind: "profiles"; entry: LabProfile }
);

/**
 * Top of a test's or profile's page: photo and lists on the left; name,
 * price, description, key details and the sample journey on the right. A
 * profile also lists the tests it includes under its description, and takes
 * the profile frame's spacing.
 */
export function TestDetail({ className, ...props }: TestDetailProps) {
  const { entry } = props;
  const isProfile = props.kind === "profiles";
  const reportDelivery = entry.reportDelivery ?? DEFAULT_REPORT_DELIVERY;
  const specimen = entry.specimen ?? (entry.sample ? "blood" : undefined);
  // The design's six key details; those it doesn't have are left out.
  const facts: { icon: IconName; label: string; value?: string }[] = [
    { icon: "clock", label: "Report delivery", value: reportDelivery },
    { icon: "drop", label: "Sample", value: entry.sample },
    { icon: "listCheck", label: "Preparation", value: entry.preparation },
    { icon: "flaskConical", label: "Category", value: categoryLabels[entry.categories[0]] },
    { icon: "testTubeUpright", label: "Storage condition", value: entry.storage },
    { icon: "testTubeSmall", label: "Unit Volume", value: entry.volume },
  ];

  return (
    <section
      className={cx(styles.detail, isProfile && styles.profile, className)}
      aria-labelledby="test-title"
    >
      <Image
        src={images.decor.detailGlow}
        alt=""
        width={1330}
        height={1146}
        loading="eager"
        className={styles.glow}
      />
      <div className={styles.inner}>
        <BackLink
          href={isProfile ? routes.profiles : routes.tests}
          className={styles.back}
          data-reveal="left"
        />
        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.lead}>
              <div className={styles.intro}>
                <div className={styles.header}>
                  <div className={styles.heading} data-reveal="right">
                    <h1 id="test-title" className={styles.title}>
                      {entry.name}
                    </h1>
                    <p className={styles.price}>
                      {formatPrice(entry.price)}
                      {entry.originalPrice && (
                        <s className={styles.originalPrice}>
                          <span className="visually-hidden">Was </span>
                          {formatPrice(entry.originalPrice)}
                        </s>
                      )}
                    </p>
                  </div>
                  <Button
                    href={routes.contact}
                    variant="dark"
                    size="md"
                    icon="arrow"
                    data-reveal="right"
                  >
                    Contact Us
                  </Button>
                </div>
                <p className={styles.description} data-reveal="bottom">
                  {entry.description}
                </p>
              </div>
              {props.kind === "profiles" && (
                <IncludedTests
                  count={testCount(props.entry)}
                  items={profileContents(props.entry)}
                />
              )}
            </div>

            <dl className={styles.facts}>
              {facts.map(
                ({ icon, label, value }) =>
                  value && (
                    <InfoCard
                      key={label}
                      icon={icon}
                      label={label}
                      value={value}
                      data-reveal="bottom"
                    />
                  ),
              )}
            </dl>

            <div className={styles.journey}>
              <SampleJourney
                title="Simple Sample Journey"
                steps={[
                  "Book your appointment",
                  specimen ? `Provide a ${specimen} sample` : "Provide your sample",
                  `Receive results in ${reportDelivery}`,
                ]}
                className={styles.journeyCard}
                data-reveal="left"
              />
              {/* In view on load (often the largest image there). Phones crop
                  it to a 180px strip, which draws it 361px wide. */}
              <PhotoFrame
                src={images.tests.sampleJourney}
                alt="Laboratory scientist handling sample tubes"
                sizes="(max-width: 400px) 361px, (max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1199px) calc(100vw - 527px), 571px"
                loading="eager"
                className={styles.journeyPhoto}
                data-reveal="right"
              />
            </div>

          </div>

          <div className={styles.side}>
            <div className={styles.media} data-reveal="left">
              <div className={styles.mediaFrame}>
                <Image
                  src={entry.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 325px"
                  loading="eager"
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.lists}>
              <CheckList
                title={entry.measures.title}
                items={entry.measures.items}
                data-reveal="left"
              />
              <CheckList
                title="Who it's good for"
                items={entry.goodFor}
                size="md"
                data-reveal="left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
