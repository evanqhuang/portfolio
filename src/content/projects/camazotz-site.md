---
title: "Camazotz Diving"
description: "E-commerce site for a cave diving gear company I started — every product is designed from scratch in CAD and 3D-printed in ASA plastic. Customers configure colors on an interactive 3D model of the product before checkout. Built on Cloudflare Workers with Stripe for payments and Terraform-managed infrastructure."
tech: ["Astro", "Tailwind CSS", "Cloudflare Workers", "D1", "Stripe", "WebGL", "Terraform", "CAD"]
category: web
github: "https://github.com/evanqhuang/camazotz-site"
url: "https://camazotzdiving.com"
featured: true
order: 4
image: "/images/projects/camazotz-site.png"
---

Camazotz Diving is a company I started to design and sell custom equipment for underwater cave exploration. Every product — primary reels, safety spools, line markers — is designed from scratch in CAD and 3D-printed in ASA. The site needed to support a product that comes in multiple color configurations, so the shopping experience needed to show customers exactly what they were buying before they ordered.

The product page features a 3D model viewer where customers select colors and see the changes applied to the actual model in real time — not a flat swatch preview, but the material properties of the GLTF model updating live. Each color configuration gets encoded as a compact string that travels through the entire checkout flow: into Stripe session metadata, through the webhook, and into the order record — so fulfillment always knows exactly which configuration was ordered. The server validates configurations against a strict schema with duplicate part detection before accepting an order.

The infrastructure runs entirely on Cloudflare: Astro 5 in SSR mode on Workers, D1 (SQLite at the edge) for orders and inventory, and Stripe for payment processing. No origin server, no cold starts. The Stripe webhook handler had a subtle constraint — Workers run in V8 isolates without Node.js APIs, so webhook signature verification requires the async variant of the verification call. Terraform manages the full stack: Workers, D1 bindings, DNS, and KV namespaces.
