import Link from "next/link";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.title}>UNESCO Museum — Stolen Objects</div>
          <p className={styles.note}>
            This is a faithful recreation exercise built with Next.js, GSAP, and
            Three.js. Content is sample data for demonstration.
          </p>
        </div>
        <div className={styles.links}>
          <Link href="/objects">Browse</Link>
          <Link href="/#about">About</Link>
          <a
            href="https://museum.unesco.org/stolen-objects"
            target="_blank"
            rel="noreferrer"
          >
            Original site
          </a>
        </div>
      </div>
    </footer>
  );
}
