---
title: "Flights Reference API"
description: "A Rust HTTP API over a unified flights reference database — 3.3M flights, 38k routes, 8.5k airports — built by merging OpenFlights and the historical FlightDB schedule archive into a single Postgres schema. Deployed to Oracle Cloud Free Tier with no public inbound IP: all ingress runs through a Cloudflare Tunnel."
tech: ["Rust", "axum", "sqlx", "Postgres", "Terraform", "Oracle Cloud", "Cloudflare Tunnel"]
category: infra
github: "https://github.com/evanqhuang/flights-api"
featured: false
order: 19
---

Two public datasets cover overlapping airports with conflicting identifiers. OpenFlights has 8,578 airport records with IATA and ICAO codes; FlightDB has its own airport table, different coverage, and 3.4M historical flights. The importer unifies them into one `airports` table with a `source` discriminator — `openflights`, `flightdb`, or `merged` — via a 3-tier match precedence: IATA → ICAO → FlightDB's 3-char code reused as IATA. Where a FlightDB record matches an existing row, it fills only the null columns and sets `source = 'merged'`; otherwise it inserts as `source = 'flightdb'`. OpenFlights' `airports.dat` has a handful of small airports that reuse IATA or ICAO codes. Those produce Postgres `23505` unique-constraint violations on insert; the importer catches them, nulls both codes, and retries — a second violation drops the record.

Bulk load requires `COPY`, which `sqlx` doesn't expose — so there are two separate database pools. The read path uses a `sqlx::PgPool`; the importer uses a `deadpool-postgres` pool whose clients have access to `tokio_postgres::Client::copy_in`. FlightDB is a SQLite file, and its cursors are synchronous. The bulk flight importer runs the SQLite cursor inside `tokio::task::spawn_blocking` and feeds rows into the async `BinaryCopyInWriter` over an `mpsc::channel(1000)`. The `route_aggregates` table (38k rows) is pre-aggregated upstream; the store layer self-joins it for one-stop connections, which is cheap against 38k rows and would not be cheap against the 3.7M-row `legs` table.

The VM has zero inbound firewall rules. Cloudflare Tunnel handles both SSH and HTTP ingress with two rules — SSH first, HTTP second, final 404 — and operators SSH via `cloudflared access` gated on Zero Trust Access policy. Cloudflare Tunnel is the choice over nginx + Let's Encrypt because Oracle's free-tier instances have residential IPs whose routing can be unreliable; there's no stable origin IP to defend. The cloud-init bootstrap is deliberately minimal — a longer version reliably poisoned cloud-init parsing on OL9.7 aarch64 in us-chicago-1, so everything past the initial boot moved to a post-SSH script.
