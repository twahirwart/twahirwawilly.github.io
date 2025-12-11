"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./ThreeArtifact.module.css";

type Props = {
  className?: string;
  variant?: "hero" | "detail";
};

export function ThreeArtifact({ className, variant = "hero" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.1, variant === "hero" ? 5.4 : 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 3, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xff3355, 0.6);
    rim.position.set(-6, -2, 4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const knotGeo = new THREE.TorusKnotGeometry(1.05, 0.32, 180, 28);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.2,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);

    const edgeGeo = new THREE.EdgesGeometry(knotGeo, 40);
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#ff2d55"),
      transparent: true,
      opacity: 0.75,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);

    group.add(knot);
    group.add(edges);

    const dustCount = variant === "hero" ? 900 : 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i += 1) {
      const i3 = i * 3;
      const radius = THREE.MathUtils.randFloat(2.0, 7.5);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      dustPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPositions[i3 + 1] = radius * Math.cos(phi) * 0.65;
      dustPositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const clock = new THREE.Clock();

    let animationFrame = 0;
    let isVisible = true;

    const pointer = { x: 0, y: 0 };
    const targetRotation = { x: 0.08, y: -0.35 };

    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(width));
      const h = Math.max(1, Math.floor(height));

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    const onPointerMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((ev.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.x = x;
      pointer.y = y;
    };

    if (variant === "detail") {
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const renderFrame = () => {
      animationFrame = window.requestAnimationFrame(renderFrame);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        targetRotation.x = 0.12 + pointer.y * 0.18;
        targetRotation.y = -0.35 + pointer.x * 0.22;

        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotation.x, 0.06);
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotation.y, 0.06);

        knot.rotation.z = t * 0.18;
        edges.rotation.z = knot.rotation.z;

        dust.rotation.y = t * 0.04;
      }

      renderer.render(scene, camera);
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();

      if (variant === "detail") {
        canvas.removeEventListener("pointermove", onPointerMove);
      } else {
        window.removeEventListener("pointermove", onPointerMove);
      }

      document.removeEventListener("visibilitychange", onVisibilityChange);

      knotGeo.dispose();
      knotMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();

      renderer.dispose();
    };
  }, [reducedMotion, variant]);

  return (
    <div className={`${styles.wrap} ${className ?? ""}`.trim()}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
