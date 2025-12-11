"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { StolenObject } from "@/lib/objects";
import { getGsap } from "@/lib/gsap";
import { ThreeArtifact } from "@/components/ThreeArtifact";
import styles from "./ObjectDetail.module.css";

export function ObjectDetail({ object }: { object: StolenObject }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".js-detail-reveal",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.wrap}>
      <Link href="/objects" className={`${styles.back} js-detail-reveal`}>
        <span aria-hidden>←</span> Back to browser
      </Link>

      <div className={styles.grid}>
        <div>
          <h1 className={`${styles.title} js-detail-reveal`}>{object.title}</h1>

          <div className={`${styles.meta} js-detail-reveal`}>
            <span className={styles.pill}>{object.objectType}</span>
            <span className={styles.pill}>{object.origin}</span>
            <span className={styles.pill}>{object.period}</span>
            <span className={styles.pill}>{object.caseReference}</span>
          </div>

          <div className={`${styles.section} js-detail-reveal`}>
            <div className={styles.label}>Description</div>
            <div className={styles.value}>{object.description}</div>
          </div>

          <div className={`${styles.section} js-detail-reveal`}>
            <div className={styles.label}>Context</div>
            <div className={styles.value}>
              This record is presented for demonstration purposes. The layout
              follows an editorial catalog style while animations remain subtle
              for readability.
            </div>
          </div>
        </div>

        <aside className={`${styles.side} js-detail-reveal`}>
          <div className={`${styles.panel} ${styles.canvasPanel}`}>
            <ThreeArtifact variant="detail" />
          </div>

          <div className={`${styles.panel} ${styles.imagePanel}`}>
            <Image
              src={object.image}
              alt={object.title}
              fill
              sizes="(max-width: 980px) 92vw, 38vw"
            />
          </div>

          <div className={styles.panel}>
            <div className={styles.kv}>
              <div className={styles.kvRow}>
                <div className={styles.kvKey}>Date</div>
                <div className={styles.kvVal}>{object.date}</div>
              </div>
              <div className={styles.kvRow}>
                <div className={styles.kvKey}>Material</div>
                <div className={styles.kvVal}>{object.material}</div>
              </div>
              <div className={styles.kvRow}>
                <div className={styles.kvKey}>Dimensions</div>
                <div className={styles.kvVal}>{object.dimensions}</div>
              </div>
              <div className={styles.kvRow}>
                <div className={styles.kvKey}>Last seen</div>
                <div className={styles.kvVal}>{object.lastKnownLocation}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
