---
title: "UnFare"
description: "Monitors flight prices and automatically detects mistake fares — flights priced far below market rate due to airline errors, which typically disappear within hours. Uses multiple independent detection methods with per-airline baselines, backed by a scraping system that handles sites blocking conventional HTTP requests."
tech: ["Python", "FastAPI", "Playwright", "TimescaleDB", "Redis", "Scikit-learn", "Docker"]
category: finance
github: "https://github.com/evanqhuang/UnFare"
featured: true
order: 5
---

Mistake fares — flights priced far below market rate due to airline pricing errors — disappear within hours of appearing. Simple threshold alerts don't work well here: a $200 transatlantic flight is obviously a mistake fare, but a $150 Spirit flight to Orlando might just be a Tuesday. UnFare monitors prices continuously and surfaces anomalies through a layered detection system built around that ambiguity.

The core detector uses three independent methods that must broadly agree before flagging a fare. A machine learning model trained on engineered features per flight (price, route distance, price-per-mile, historical mean and standard deviation, z-score, seasonality index, stops, cabin class) identifies statistical outliers. A clustering model groups fares by route and flags prices that fall outside the established distribution for that specific route. A rule-based arbiter fuses both outputs with domain-specific checks — historical comparison, route popularity weighting, timing patterns, and confidence scoring. The system maintains per-airline pricing baselines: what constitutes a mistake fare on a budget carrier looks completely different from a mistake fare on a full-service international airline. Feature importance is computed by perturbation — zeroing out each feature and measuring the change in anomaly score — which helps debug false positives without requiring model retraining.

Playwright drives a pool of headless browser contexts with proxy rotation to scrape airline and OTA sites that block conventional HTTP requests. Route-level circuit breakers prevent hammering blocked endpoints. TimescaleDB stores tick-level price history, and the schema has grown through 12 migrations as the system expanded from simple price storage to a full pipeline with per-airline thresholds, fare class support, and booking URLs.
