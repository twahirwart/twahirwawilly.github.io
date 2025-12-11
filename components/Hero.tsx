"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGsap } from "@/lib/gsap";
import { ThreeArtifact } from "@/components/ThreeArtifact";
import styles from "./Hero.module.css";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".js-hero-kicker",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 }
      )
        .fromTo(
          ".js-hero-title",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.25"
        )
        .fromTo(
          ".js-hero-subtitle",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          "-=0.25"
        )
        .fromTo(
          ".js-hero-cta",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          "-=0.25"
        )
        .fromTo(
          ".js-hero-canvas",
          { scale: 0.98, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7 },
          "-=0.35"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero}>
      <div className={styles.inner}>
        <div>
          <div className={`${styles.kicker} js-hero-kicker`}>
            <span className={styles.kickerDot} aria-hidden />
            UNESCO Museum / Stolen Objects
          </div>

          <h1 className={`${styles.title} js-hero-title`}>
            Stolen objects,
            <br />
            public record.
          </h1>

          <p className={`${styles.subtitle} js-hero-subtitle`}>
            Explore a curated set of stolen cultural objects. Browse by type and
            origin, open a record, and inspect a 3D visualization built with
            Three.js.
          </p>

          <div className={styles.ctas}>
            <Link href="/objects" className={`${styles.primary} js-hero-cta`}>
              Browse records
            </Link>
            <a href="#about" className={`${styles.secondary} js-hero-cta`}>
              Learn more
            </a>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Interaction</div>
              <div className={styles.metaValue}>GSAP + ScrollTrigger</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>3D</div>
              <div className={styles.metaValue}>Three.js canvas</div>
            </div>
            <div className={styles.metaCard}>
              <div className={styles.metaLabel}>Dataset</div>
              <div className={styles.metaValue}>Sample stolen objects</div>
            </div>
          </div>
        </div>

        <div className={`${styles.canvasWrap} js-hero-canvas`} aria-hidden>
          <ThreeArtifact variant="hero" />
        </div>
      </div>
    </section>
  );
}
