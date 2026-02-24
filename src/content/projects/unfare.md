---
title: "UnFare"
description: "Mistake fare finder that scrapes flight prices via Playwright browser automation, stores historical data in TimescaleDB, and uses Redis for task queuing and caching. Full-stack with FastAPI backend and Docker Compose deployment."
tech: ["Python", "FastAPI", "Playwright", "TimescaleDB", "Redis", "Docker"]
category: finance
github: "https://github.com/evanqhuang/UnFare"
featured: true
order: 5
---

Mistake fares — flights priced far below market rate due to airline pricing errors — disappear within hours of appearing. UnFare monitors flight prices continuously and surfaces anomalies by comparing current prices against a rolling historical baseline stored in TimescaleDB.

Playwright drives headless browsers to scrape price data from airline and OTA sites that resist conventional HTTP scraping. Redis backs the task queue that schedules scrape jobs and caches intermediate results to avoid redundant requests.

The FastAPI backend exposes endpoints for configuring search routes, querying alerts, and retrieving historical price series. The full stack is packaged in Docker Compose with separate services for the API, scraper workers, TimescaleDB, and Redis.
