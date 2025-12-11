"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./SiteHeader.module.css";
import { getGsap } from "@/lib/gsap";

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { gsap } = getGsap();

    gsap.fromTo(
      ".js-header-reveal",
      { y: -10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      }
    );
  }, []);

  useEffect(() => {
    if (!renderMenu) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const { gsap } = getGsap();

    if (open) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.18 });
      gsap.fromTo(
        panel,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      return;
    }

    gsap.to(panel, {
      x: 30,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => setRenderMenu(false),
    });
  }, [open, renderMenu]);

  const isActive = (href: string) => pathname === href;

  const openMenu = () => {
    setRenderMenu(true);
    setOpen(true);
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.brand} js-header-reveal`}>
          <span className={styles.brandTop}>UNESCO Museum</span>
          <span className={styles.brandBottom}>Stolen Objects</span>
        </Link>

        <nav className={`${styles.nav} js-header-reveal`} aria-label="Primary">
          <Link
            href="/objects"
            className={`${styles.navLink} ${isActive("/objects") ? styles.navLinkActive : ""}`}
          >
            Browse
          </Link>
          <Link href="/#about" className={styles.navLink}>
            About
          </Link>
          <Link href="/#method" className={styles.navLink}>
            Method
          </Link>
        </nav>

        <div className={`${styles.actions} js-header-reveal`}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeMenu() : openMenu())}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {renderMenu ? (
        <div
          ref={overlayRef}
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={closeMenu}
        >
          <div
            ref={panelRef}
            className={styles.mobilePanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={styles.brand}>
                <span className={styles.brandTop}>UNESCO Museum</span>
                <span className={styles.brandBottom}>Stolen Objects</span>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <CloseIcon />
              </button>
            </div>

            <nav className={styles.mobileNav} aria-label="Mobile">
              <Link href="/objects" onClick={closeMenu}>
                Browse
              </Link>
              <Link href="/#about" onClick={closeMenu}>
                About
              </Link>
              <Link href="/#method" onClick={closeMenu}>
                Method
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
