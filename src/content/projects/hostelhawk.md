---
title: "HostelHawk"
description: "A hostel-search app that tracks live inventory into a time-series price database and surfaces price-trend indicators across cities. The cities table doubles as the scrape work queue, and the front-end runs a MapLibre globe with a runtime-recolored basemap."
tech: ["Rust", "axum", "SvelteKit", "MapLibre", "Postgres", "TimescaleDB", "PgBouncer", "Terraform", "Cloudflare Tunnel"]
category: web
url: "https://hostelhawk.com"
featured: true
order: 4.5
image: "/images/projects/hostelhawk.png"
---

The scheduler ticks every 60 seconds and calls `list_due_cities` to find any city where `next_scrape_at` is null or past. In-flight work is tracked in an `Arc<Mutex<HashSet<i64>>>` backed by a tokio `Semaphore` — no Redis, no external queue. Scrapes are spread across the interval by a deterministic per-city jitter: `(city_id * 7919) % (interval_hours * 720)` seconds of offset. The same formula is reproduced in pure SQL in the backfill migration so the initial seed and the runtime agree to the second.

The inventory API returns only rooms available for a specific query date and stay length, so per-property bed counts have to be reconstructed across the full fan-out of date × stay-length combinations. The upsert uses `GREATEST(COALESCE(dorm_bed_count, 0), $2)` — a partial scrape can only increase the observed maximum, never decrease it. Price history lives in a TimescaleDB hypertable (7-day chunks, compressed after 14 days), with a continuous aggregate that pre-materializes daily statistics so the property page never scans raw history. PgBouncer runs in transaction mode, which requires setting `.statement_cache_capacity(0)` on the sqlx pool; omitting it produces "prepared statement already exists" errors under the pooler. The continuous-aggregate migration carries `-- +goose NO TRANSACTION` because Timescale's CAGG creation can't run inside a transaction.

The map feature-detects WebGL2 and enables MapLibre's globe projection only if the context is available, falling back to Mercator silently. MapTiler's `streets-v2` style can't be recolored via CSS custom properties at the WebGL layer, so the front-end walks `map.getStyle().layers` at runtime and rewrites fill and line colors in JavaScript. Two custom symbol layers use zoom-interpolated opacity ramps to fade continent labels out as country labels fade in. Globe auto-spin cancels on `mousedown`, `touchstart`, or `wheel`.
