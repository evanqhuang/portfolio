---
title: "SeedingAlpha"
description: "Quantitative research platform studying media piracy economics using 61.5 million torrent records spanning 19 years. DuckDB star schema for OLAP analytics, FastText classifier bootstrapped via weak supervision from ~1k labels to 50k+, and cross-correlation analysis against entertainment sector equities."
tech: ["Python", "DuckDB", "FastText", "Data Analysis"]
category: finance
github: "https://github.com/evanqhuang/SeedingAlpha"
featured: false
order: 10
---

SeedingAlpha treats public torrent metadata as alternative data for studying the economics of media piracy — the same category of signal (demand proxies from unconventional sources) that quantitative funds use with satellite imagery or credit card transaction data.

The dataset is substantial: 61.5 million torrents, 710 million files, 19 years of history (2004-2023), representing 123 TB of content. A DuckDB ETL pipeline loads this into a dimensional star schema (`DIM_CONTENT` + `FACT_TORRENT_ACTIVITY`) designed for analytical queries — DuckDB's columnar engine makes this tractable on a single machine against Parquet files, no server required.

Content classification uses FastText with a weak supervision bootstrapping pipeline. Starting from roughly 1,000 hand-labeled examples, regex-based labeling rules (`S\d{1,2}E\d{1,2}` → TV, platform keywords → game, year+quality patterns → movie) expand coverage to 50k+ training samples with a priority hierarchy that resolves ambiguity. A title normalizer handles the idiosyncrasies of torrent naming conventions — episode patterns, quality tags, codec identifiers, release groups — with a tested 90% accuracy rate.

The financial integration joins torrent activity metrics with stock data for entertainment companies (DIS, NFLX, WBD, PARA, EA) to run cross-correlation and lead/lag analysis, with SPY as a market control factor.
