import { Button, Logo } from "@/components/ui";
import { mainNav } from "@/config/navigation";
import { routes } from "@/config/routes";
import { NavMenu } from "./NavMenu";
import styles from "./Header.module.css";

/** Translucent top bar that sits over the page's first section. */
export function Header() {
  return (
    // Its own layer while pages change, which doesn't animate (globals.css).
    // Set here, as CSS Modules would rename it.
    <header className={styles.header} style={{ viewTransitionName: "site-header" }}>
      <div className={styles.inner}>
        <Logo />
        <NavMenu links={mainNav} />
        <Button href={routes.contact} variant="primary" size="sm">
          Contact Us
        </Button>
      </div>
    </header>
  );
}
