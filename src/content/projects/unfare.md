---
title: "UnFare"
description: "Detects airline mistake fares by combining Isolation Forest anomaly detection, DBSCAN clustering, and a 5-condition hybrid rule system with airline-specific baselines. Scrapes flight prices via a Playwright browser pool with proxy rotation and circuit breakers, backed by TimescaleDB for time-series price history."
tech: ["Python", "FastAPI", "Playwright", "TimescaleDB", "Redis", "Scikit-learn", "Docker"]
category: finance
github: "https://github.com/evanqhuang/UnFare"
featured: true
order: 5
---

Mistake fares — flights priced far below market rate due to airline pricing errors — disappear within hours. UnFare monitors prices continuously and surfaces anomalies through a layered detection system that goes well beyond simple threshold alerts.

The core detector is a hybrid architecture: an Isolation Forest trained on 9 engineered features per flight (price, route distance, price-per-mile, historical mean/std, z-score, seasonality index, stops, cabin class), a DBSCAN spatial clustering model that identifies per-route price distributions and flags outliers, and a 5-condition rule-based arbiter that fuses the ML outputs with domain-specific checks — z-score thresholds, historical comparison, route popularity weighting, timing pattern analysis, and confidence scoring. An `AirlineThresholdManager` maintains per-airline pricing distributions because what constitutes a mistake fare on Spirit is fundamentally different from Singapore Airlines. Feature importance is computed via perturbation (zero out each feature, measure contamination score delta) for debugging false positives.

Playwright drives a pool of headless browser contexts with proxy rotation to scrape airline and OTA sites that resist conventional HTTP requests. Route-level circuit breakers prevent hammering blocked endpoints. TimescaleDB stores tick-level price data with a composite primary key (`scraped_at, id`) — the partitioning column first, as required for hypertable compatibility. The schema has evolved through 12 Alembic migrations, tracking the project's growth from simple price storage to a full system with ICAO codes, distance-based pricing tables, per-airline thresholds, fare class support, and booking URLs.
