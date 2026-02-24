---
title: "LAMA Trading"
description: "Crypto trading system implementing Liquidity-Anomaly-Momentum-Analysis. Combines on-chain liquidity analysis (40%), ARIMA momentum detection (30%), and LSTM anomaly detection (30%). Includes bias-free walk-forward backtesting across 230+ trading pairs."
tech: ["Python", "LSTM", "ARIMA", "TimescaleDB", "Binance API", "Docker", "Grafana"]
category: finance
github: "https://github.com/evanqhuang/pacha-lama"
featured: true
order: 7
---

LAMA stands for Liquidity-Anomaly-Momentum-Analysis. The signal is a weighted composite: on-chain liquidity depth analysis contributes 40%, ARIMA-based momentum detection contributes 30%, and an LSTM anomaly detector trained on order book microstructure contributes the remaining 30%.

The backtesting framework is built around walk-forward optimization rather than a single in-sample fit, which eliminates the look-ahead bias that makes most backtest results unreproducible in live trading. Coverage spans 230+ pairs on Binance.

TimescaleDB stores tick-level market data with automatic partitioning by time. Grafana dashboards expose live signal state and backtest performance metrics. The full system runs in Docker Compose for reproducible deployment across environments.
