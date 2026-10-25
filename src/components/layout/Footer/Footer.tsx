import Link from "next/link";
import { Icon, Logo, SocialLinks } from "@/components/ui";
import { footerLinks, legalLinks } from "@/config/navigation";
import { site } from "@/config/site";
import { cx } from "@/lib/cx";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <div className={styles.brandInfo}>
              <Logo tone="inverse" />
              <p className={styles.text}>Shaavi Healthcare makes private blood testing</p>
              <ul className={styles.contacts}>
                <li>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className={cx(styles.contact, "tap-area")}>
                    <Icon name="phone" />
                    <span className={cx(styles.text, "text-trim")}>{site.contact.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className={cx(styles.contact, "tap-area")}>
                    <Icon name="mail" />
                    <span className={cx(styles.text, "text-trim")}>{site.contact.email}</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className={styles.powered}>
              <Icon name="sendscriptLogo" alt="SendScript" />
              <span className={cx(styles.poweredLabel, "text-trim")}>Powered</span>
              <Icon name="circleCheck" />
            </div> */}
          </div>

          <nav className={styles.quickLinks} aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className={styles.heading}>
              Quick Links
            </h2>
            <ul className={styles.links}>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={cx(styles.link, "tap-area")}>
                    <span className={styles.bullet} aria-hidden />
                    <span className={cx(styles.text, "text-trim")}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.reach}>
            <div className={styles.reachInfo}>
              <h2 className={styles.heading}>Reach Shaavi Health Care</h2>
              <div className={styles.location}>
                <address className={cx(styles.text, styles.address, "text-trim")}>
                  {site.contact.address.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={site.contact.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.directions}
                >
                  <span className={cx(styles.directionsLabel, "text-trim")}>
                    Get Directions
                  </span>
                  <Icon name="arrowOutward" />
                </a>
              </div>
            </div>
            <SocialLinks links={site.socials} />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Shaavi Healthcare. All rights reserved. Website by{" "}
            <strong className={styles.credit}>Daivtech</strong>
          </p>
          <ul className={styles.legal}>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={cx(styles.legalLink, "text-trim", "tap-area")}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
