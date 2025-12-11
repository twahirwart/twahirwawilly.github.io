# UNESCO Museum — Stolen Objects (Clone)

A Next.js recreation of the UNESCO Museum **Stolen Objects** browsing experience, built with:

- **Next.js** (App Router)
- **GSAP** (UI + scroll-based motion)
- **Three.js** (lightweight 3D visualization)

This project ships with a small sample dataset (no external API required).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- `/` — landing / editorial intro
- `/objects` — searchable, filterable catalog
- `/objects/[id]` — object detail + Three.js visualization

## Notes

- Animations respect `prefers-reduced-motion`.
- The Three.js renderer caps device pixel ratio for performance.
