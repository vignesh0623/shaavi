import Image from "next/image";
import { Pill } from "@/components/ui";
import { images } from "@/constants/images";
import { aboutHero } from "@/content/about";
import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-title" data-motion="hero">
      <Image
        src={images.about.heroGlow}
        alt=""
        width={2696}
        height={1886}
        loading="eager"
        className={styles.glow}
        data-motion="hero-glow"
      />
      <Image
        src={images.about.heroDoctor}
        alt=""
        width={348}
        height={378}
        loading="eager"
        className={styles.doctor}
        data-motion="hero-portrait"
        data-reveal="right"
      />

      <div className={styles.content} data-motion="hero-content">
        <Pill icon="flask" data-reveal="top">
          {aboutHero.eyebrow}
        </Pill>
        <h1 id="about-hero-title" className={styles.title} data-reveal="left">
          {aboutHero.title}
        </h1>
        <p className={styles.subtitle} data-reveal="right">
          {aboutHero.subtitle}
        </p>
      </div>

      {/* Only fades: the 3D scene measures where it sits. */}
      <p className={styles.intro} data-motion="hero-content" data-reveal="fade">
        <strong>Shaavi Healthcare</strong> is an independent clinical diagnostic laboratory
        based in Hayes, London, established with a clear purpose: to provide{" "}
        <strong>reliable, accurate and accessible diagnostic services</strong> while
        maintaining high standards of quality and patient care.
      </p>

      <div className={styles.decor} aria-hidden data-motion="hero-decor">
        <Image
          src={images.decor.cellSphere}
          alt=""
          width={108}
          height={108}
          loading="eager"
          className={styles.cellSphere}
        />
        <Image
          src={images.decor.cellDivision}
          alt=""
          width={120}
          height={120}
          loading="eager"
          className={styles.cellDivision}
        />
      </div>

      <Image
        src={images.about.heroScientist}
        alt=""
        width={491}
        height={331}
        loading="eager"
        className={styles.scientist}
        data-motion="hero-portrait"
        data-reveal="left"
      />
    </section>
  );
}
