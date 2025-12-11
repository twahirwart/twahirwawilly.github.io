import Link from "next/link";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import styles from "./HomeSections.module.css";

export function HomeSections() {
  return (
    <div className={styles.sections}>
      <section id="about" className={styles.section}>
        <RevealOnScroll>
          <h2 className={styles.sectionTitle}>A record designed for browsing</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          <div>
            <p className={styles.sectionText}>
              The original UNESCO experience uses a restrained editorial layout
              with a strong motion system. This clone keeps the same intent:
              fast browsing, rich details, and a lightweight 3D layer.
            </p>

            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Search + filter</div>
                <div className={styles.cardBody}>
                  Find records by title, type, or origin.
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Scroll reveals</div>
                <div className={styles.cardBody}>
                  GSAP animates content as it enters the viewport.
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardTitle}>3D artifact</div>
                <div className={styles.cardBody}>
                  A small Three.js scene provides depth without heavy assets.
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section id="method" className={styles.section}>
        <RevealOnScroll>
          <h2 className={styles.sectionTitle}>Motion that stays smooth</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          <div>
            <p className={styles.sectionText}>
              Animations are tuned for readability first: reduced motion is
              respected, Three.js limits pixel ratio, and scroll triggers only
              run once.
            </p>
            <p className={styles.sectionText} style={{ marginTop: 12 }}>
              Ready to explore? Visit the browser and open any record.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link href="/objects" className="button">
                Open the browser
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
