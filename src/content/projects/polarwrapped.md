---
title: "Polarwrapped"
description: "A Spotify Wrapped-style travel recap web app for Polarsteps data. Features 13 animated slides showing travel statistics, interactive maps, and photos with Framer Motion animations. Mobile-first design with PNG export and code splitting."
tech: ["TypeScript", "React 19", "Vite", "Framer Motion", "Mapbox"]
category: web
github: "https://github.com/evanqhuang/polarwrapped"
featured: true
order: 6
---

Polarsteps records GPS traces and photos as you travel but offers no way to share a concise, visual summary of a trip. Polarwrapped takes a Polarsteps export and produces a 13-slide animated recap — the same format Spotify Wrapped popularized — covering distance, countries, days, step counts, and photo highlights.

Each slide is independently animated with Framer Motion, with entrance and exit transitions tuned to feel snappy on mobile. Interactive maps render the actual GPS trace using Mapbox GL. Users can export any slide as a PNG for sharing.

Vite's code splitting keeps the initial bundle small by loading slide assets lazily. The app is fully client-side — no server, no data leaves the browser after the initial file parse.
