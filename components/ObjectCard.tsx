"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { StolenObject } from "@/lib/objects";
import { getGsap } from "@/lib/gsap";
import styles from "./ObjectCard.module.css";

export function ObjectCard({ object }: { object: StolenObject }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const onEnter = () => {
    const { gsap } = getGsap();
    if (!cardRef.current || !mediaRef.current) return;

    gsap.to(cardRef.current, {
      y: -4,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(mediaRef.current, {
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const { gsap } = getGsap();
    if (!cardRef.current || !mediaRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(mediaRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={`/objects/${object.id}`}
      className={styles.link}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <div ref={cardRef} className={styles.card}>
        <div ref={mediaRef} className={styles.media} aria-hidden>
          <Image
            src={object.image}
            alt={object.title}
            fill
            sizes="(max-width: 900px) 90vw, 33vw"
          />
        </div>

        <div>
          <div className={styles.title}>{object.title}</div>
          <div className={styles.meta}>
            <span className={styles.pill}>{object.objectType}</span>
            <span className={styles.pill}>{object.origin}</span>
            <span className={styles.pill}>{object.period}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
