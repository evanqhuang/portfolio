---
title: "Camazotz Diving"
description: "E-commerce site for custom 3D-printed cave diving gear, running entirely at the edge on Cloudflare Workers with D1 for order persistence. Features real-time PBR material manipulation on 3D product models, Stripe checkout with edge-native webhook verification, and Terraform-managed infrastructure."
tech: ["Astro", "Tailwind CSS", "Cloudflare Workers", "D1", "Stripe", "WebGL", "Terraform"]
category: web
github: "https://github.com/evanqhuang/camazotz-site"
url: "https://camazotzdiving.com"
featured: true
order: 4
image: "/images/projects/camazotz-site.png"
---

Camazotz Diving sells custom 3D-printed equipment for underwater cave exploration. The site runs entirely on Cloudflare's edge network — Astro 5 in SSR mode on Workers, D1 (SQLite at the edge) for orders and inventory, and Stripe for payment processing. No origin server, no cold starts.

The 3D product viewer goes beyond displaying static models. It calls the `model-viewer` PBR material API directly — `setBaseColorFactor()` and `setEmissiveFactor()` — to update the GLTF model's metallic roughness properties in real time as customers select color options. Roughness is explicitly set to 0.9 to prevent unrealistic mirror reflections on color swaps. Each customer's color configuration is encoded as a compact string (`color:2,trim:0`) that flows through the cart, into Stripe session metadata, through the webhook, and into the D1 order_items table — validated server-side against a regex with duplicate part detection.

Stripe webhook verification uses `constructEventAsync` (the async variant required in Workers V8 isolates, since the sync version depends on Node.js crypto APIs). The webhook handler reads color configuration from two sources — per-line-item metadata is primary, with a session-level `cart_json` fallback for backward compatibility with older orders. Stripe's 500-character metadata limit is guarded with explicit truncation and warning logs. Terraform manages the full Cloudflare stack: Workers, D1 bindings, DNS, and KV namespaces.
