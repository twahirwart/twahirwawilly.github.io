"use client";

import { type PropsWithChildren, useEffect, useRef } from "react";

import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = PropsWithChildren<{
  y?: number;
  delay?: number;
}>;

export function RevealOnScroll({ children, y = 18, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const { gsap, ScrollTrigger } = getGsap();

    const tween = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay,
        ease: "power3.out",
        paused: true,
      }
    );

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 84%",
      onEnter: () => tween.play(),
      once: true,
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [delay, reducedMotion, y]);

  return <div ref={ref}>{children}</div>;
}
