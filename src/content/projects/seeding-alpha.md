---
title: "SeedingAlpha"
description: "Research platform integrating torrent metadata analysis with financial and longitudinal data to study media piracy economics. Uses DuckDB for analytics and FastText for content classification."
tech: ["Python", "DuckDB", "FastText", "Data Analysis"]
category: finance
github: "https://github.com/evanqhuang/SeedingAlpha"
featured: false
order: 10
---

SeedingAlpha treats public torrent metadata as a dataset for studying the economics of media piracy: how piracy rates correlate with windowing strategies, pricing changes, regional availability, and box office or streaming performance.

DuckDB handles the analytical queries over large torrent index snapshots without requiring a server — it runs in-process against Parquet files, making the entire analysis portable. FastText classifies torrent titles into content categories (film, TV, software, games) with high throughput on noisy, abbreviated text.

The platform joins torrent data with financial datasets covering studio revenues, streaming subscriber counts, and pricing events to produce longitudinal studies of how industry decisions influence consumer behavior in gray markets.
