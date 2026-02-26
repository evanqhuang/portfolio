---
title: "SeedingAlpha"
description: "Applies the 'alternative data' approach used by quantitative hedge funds — satellite photos of parking lots, credit card transaction feeds — to 61.5 million torrent records spanning 19 years. Uses public piracy metadata as a demand proxy for the entertainment industry, then correlates activity against sector equities like Disney, Netflix, and EA."
tech: ["Python", "DuckDB", "FastText", "Data Analysis"]
category: finance
github: "https://github.com/evanqhuang/SeedingAlpha"
featured: false
order: 10
---

Quantitative funds have used satellite photos of parking lots to estimate retail foot traffic, and credit card transaction feeds to predict earnings before they're announced. Alternative data is any unconventional signal that reflects economic activity before it shows up in official reports. SeedingAlpha applies that same framing to public torrent metadata: 61.5 million torrents, 710 million files, and 19 years of history (2004-2023) representing 123 TB of content — a granular record of global entertainment demand going back to the early internet.

The dataset is loaded into a DuckDB star schema and queried against Parquet files, making it tractable on a single machine without standing up a data warehouse. The bigger challenge is classification: torrent names are informal and inconsistent — release group tags, quality strings, codec identifiers, and episode numbering conventions all mixed together. A FastText classifier is bootstrapped from roughly 1,000 hand-labeled examples using regex-based labeling rules to expand training coverage to 50k+ samples, with a priority hierarchy that resolves cases where multiple rules match. The title normalizer that feeds into it achieves tested 90% accuracy across movie, TV, game, and software categories.

The financial layer joins torrent activity metrics against stock prices for entertainment companies (DIS, NFLX, WBD, PARA, EA) to run cross-correlation and lead/lag analysis, using SPY as a market control. I wanted to find out whether piracy volume predicts or follows changes in these companies' valuations.
