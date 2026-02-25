---
title: "Polarwrapped"
description: "A Spotify Wrapped-style animated travel recap for Polarsteps data. Parses trip exports via a custom SDK (Polarsteps has no public API), renders 12+ slides with Framer Motion animations, interactive Mapbox GPS traces, and a dual render tree — separate export components optimized for PNG output."
tech: ["TypeScript", "React 19", "Vite", "Framer Motion", "Mapbox", "Zustand", "Terraform"]
category: web
github: "https://github.com/evanqhuang/polarwrapped"
featured: true
order: 6
---

Polarsteps records GPS traces and photos as you travel but offers no way to share a visual summary. Polarwrapped takes a Polarsteps export and produces an animated slide-by-slide recap — distance, countries, cities, step counts, photos — in the format Spotify Wrapped popularized.

Since Polarsteps has no official public API, a custom SDK (`driver.ts`) handles data extraction from the export format, normalizing trip metadata, GPS traces, timestamps, photo URLs, and location data into the shape the slide components expect. Each of the 12+ slides has independent Framer Motion animations with `AnimatePresence mode="wait"` ensuring clean mount/unmount transitions. Slide progression is deliberately restricted — users can navigate backward freely but can't skip ahead, creating the narrative arc of the Wrapped experience. Swipe gestures are detected from raw touch events (50px threshold) without a gesture library.

The export system maintains a parallel render tree: separate `Export*` components (ExportDistance, ExportCountries, ExportTimeline, etc.) are designed for PNG capture with fixed dimensions and font sizes optimized for image output rather than screen interaction. Mapbox GL renders the actual GPS traces as interactive maps. The app is fully client-side — no server, no data leaves the browser. Cloudflare infrastructure (DNS, Pages, security rules) is managed across three Terraform modules.
