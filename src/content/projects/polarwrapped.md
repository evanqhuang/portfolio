---
title: "Polarwrapped"
description: "Generates an animated, shareable year-in-travel recap from Polarsteps trip data — think Spotify Wrapped, but for your trips. Produces 12+ slides covering distance, countries, cities, and GPS traces with interactive maps, plus a parallel export system that renders the same slides as PNG images for sharing."
tech: ["TypeScript", "React 19", "Vite", "Framer Motion", "Mapbox", "Zustand", "Terraform"]
category: web
github: "https://github.com/evanqhuang/polarwrapped"
featured: true
order: 6
---

Polarsteps records your GPS traces and photos as you travel but offers no way to share a visual summary of a trip or year. Polarwrapped does this: upload a Polarsteps export and get an animated slide-by-slide recap — distance traveled, countries and cities visited, step counts, photo highlights, and GPS traces drawn on interactive maps — in the format Spotify Wrapped popularized.

Since Polarsteps has no official public API, a custom SDK handles data extraction from the export format, normalizing trip metadata, GPS traces, timestamps, photo URLs, and location data into the shape the slide components expect. Each of the 12+ slides has independent animations with clean mount and unmount transitions. Slide progression is deliberately restricted — users can navigate backward freely but can't skip ahead, so they see the slides in order. Swipe gestures are detected from raw touch events without a gesture library dependency.

The most interesting engineering constraint was the export system. Sharing a recap means getting it out of the browser as a static image, but the interactive screen components don't capture cleanly to PNG — fonts scale differently, map tiles may not be loaded, and layout is viewport-dependent. The solution is a parallel render tree: separate export components for each slide, designed with fixed dimensions and font sizes specifically for image capture, rendered offscreen and then captured. Mapbox GL renders the actual GPS traces as interactive maps in the screen version. The app is fully client-side — no server involved, no travel data leaves the browser.
