"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ObjectCard } from "@/components/ObjectCard";
import { getGsap } from "@/lib/gsap";
import { objectTypes, origins, stolenObjects } from "@/lib/objects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./ObjectsExplorer.module.css";

export function ObjectsExplorer() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return stolenObjects.filter((o) => {
      if (type && o.objectType !== type) return false;
      if (origin && o.origin !== origin) return false;

      if (!q) return true;

      const haystack = [
        o.title,
        o.objectType,
        o.origin,
        o.period,
        o.caseReference,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [origin, query, type]);

  useEffect(() => {
    if (reducedMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".js-object-card");

      gsap.set(cards, { y: 12, opacity: 0 });

      const triggers = ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batchTargets) => {
          gsap.to(batchTargets, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.06,
            overwrite: true,
          });
        },
        once: true,
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, root);

    return () => ctx.revert();
  }, [filtered.length, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Browse stolen objects</h1>
          <p className={styles.subtitle}>
            Search, filter, and open an object record. Each card reveals on
            scroll via GSAP ScrollTrigger.
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, type, origin, reference…"
          aria-label="Search objects"
        />

        <select
          className={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by type"
        >
          <option value="">All types</option>
          {objectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          aria-label="Filter by origin"
        >
          <option value="">All origins</option>
          {origins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.stats}>
        Showing {filtered.length} of {stolenObjects.length} records
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No objects match your query.</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((o) => (
            <div key={o.id} className="js-object-card">
              <ObjectCard object={o} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
