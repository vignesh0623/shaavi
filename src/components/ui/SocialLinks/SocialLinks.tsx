import type { SocialLink } from "@/config/site";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./SocialLinks.module.css";

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul className={cx(styles.list, className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} aria-label={link.label} className={styles.link}>
            <Icon name={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
