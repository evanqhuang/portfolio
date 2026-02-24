---
title: "Camazotz Diving"
description: "E-commerce site for custom 3D-printed cave diving gear. Built with Astro 5 and deployed on Cloudflare Workers with D1 database. Features Stripe checkout, 3D product model viewer, blog with MDX, and Terraform-managed infrastructure."
tech: ["Astro", "Tailwind CSS", "Cloudflare Workers", "D1", "Stripe", "Terraform"]
category: web
github: "https://github.com/evanqhuang/camazotz-site"
url: "https://camazotzdiving.com"
featured: false
order: 8
---

Camazotz Diving sells custom 3D-printed equipment designed for underwater cave survey and exploration. The site needed to handle product browsing, 3D model preview, checkout, and a blog — all with zero cold starts and global edge latency.

Astro 5 handles static generation for product pages and blog posts written in MDX. Cloudflare Workers serve the dynamic routes (cart, checkout sessions, order status) with D1 as the SQLite-compatible edge database for order and inventory state. Stripe handles payment processing with webhook-driven order confirmation.

The 3D model viewer lets customers inspect each product from any angle before purchasing, built with a lightweight WebGL renderer rather than a heavy framework dependency. Terraform manages the Cloudflare infrastructure — Workers, D1 bindings, DNS, and KV namespaces — so the entire deployment is reproducible from code.
