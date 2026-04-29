---
title: "RapidAPI Platform"
description: "A monorepo of eight APIs published to the RapidAPI marketplace, deployed as Google Cloud Functions Gen 2 behind a unified gateway. Each API reverse-engineers a different upstream — fashion-resale platforms, federal procurement systems, AI leaderboards, hostel inventory — through a consistent Go service contract managed by a single Terraform module. Built around a scaffolding workflow that takes a HAR capture or schema sketch and produces the full Cloud Function + Terraform + OpenAPI + integration-test scaffold."
tech: ["Go", "Terraform", "Google Cloud Functions", "Cloud Run", "Firestore", "Playwright", "OpenAPI"]
category: infra
url: "https://rapidapi.com/user/evanqhuang"
featured: true
order: 17
---

Every API deploys through one Terraform module (`modules/api-function/`) that wires Cloud Function → GCS source zip → IAM → Secret Manager, parameterized by a single entry in `terraform.tfvars`. Source archives embed their MD5 in the GCS object name, so an unchanged binary produces the same key and skips the update. A `time_sleep` of 60 seconds sits between the service-account role binding and the Cloud Function's dependency on it: IAM grants are eventually consistent, and omitting the wait means the first cold-start call can 403 itself on its own secret.

The multi-source aggregator APIs fan out across goroutines and differ in their partial-failure policy. The fashion-resale aggregator returns a 200 with a per-platform error array if any source is unavailable; the AI-rankings aggregator keeps stale data for any source that goes down and refreshes it in the background, gated by a `sync.Once` on first load and a `refreshing` flag to prevent concurrent goroutines from hammering the upstream. Cross-leaderboard model identity is a harder problem than it looks — Arena names models `gpt-4-2024-08-06`, Artificial Analysis names them `gpt-4` — so a slug normalizer in `matcher.go` strips date suffixes and resolves other naming divergences before merging.

Federal contracts needed a different topology entirely. SAM.gov imposes daily per-subsystem quotas, so the API doesn't scrape at request time. A Cloud Run Job runs on two Cloud Scheduler triggers — incremental every 6 hours, full weekly — and writes pre-aggregated documents to Firestore, which the Cloud Function reads. Per-subsystem call budgets prevent any one category from draining the daily quota; when a budget is exhausted the scraper marks the run as "data truncated" rather than failing, so every document in Firestore is complete to some level, just not necessarily current.
