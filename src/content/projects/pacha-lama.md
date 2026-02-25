---
title: "LAMA Trading"
description: "Crypto trading system built on a three-model signal framework: ARIMA momentum (with ADF stationarity testing and Ljung-Box validation), Isolation Forest anomaly detection on order book microstructure, and on-chain liquidity scoring. Walk-forward backtesting across 100+ assets over 10 years with MLX GPU acceleration on Apple Silicon."
tech: ["Python", "LSTM", "ARIMA", "MLX", "TimescaleDB", "Binance API", "Docker", "Grafana"]
category: finance
github: "https://github.com/evanqhuang/pacha-lama"
featured: true
order: 7
---

LAMA (Liquidity-Anomaly-Momentum-Analysis) fuses three independent models into a composite trading signal. The momentum model fits ARIMA via `auto_arima` after verifying stationarity with an Augmented Dickey-Fuller test, validates residuals with the Ljung-Box test for remaining autocorrelation, and selects model order by AIC/BIC. A 30-second `ThreadPoolExecutor` timeout wraps the fitting step — ARIMA on noisy crypto data can run indefinitely, so the system falls back to ARIMA(1,1,1) if the optimizer stalls.

Four signal combination strategies (weighted average, dynamic weights, consensus voting, Bayesian fusion) are available, and the system tracks which method is performing best. A market regime detector classifies conditions as normal, high volatility, low liquidity, or crisis. In crisis mode, the combiner shifts from weighted average (which can be dominated by a single confident model) to consensus voting (requiring agreement from multiple models) and reduces all position sizes.

Backtesting uses walk-forward optimization with 1-year training windows, retraining every 30 days — eliminating the look-ahead bias that makes naive backtest results unreproducible live. Cost modeling applies 0.1% commission and 0.05% slippage per trade. Coverage spans 100+ assets with 10 years of historical data. MLX GPU variants of the signal generator, portfolio engine, and parameter optimizer leverage Apple Silicon's unified memory for parallel hyperparameter evaluation.

The data pipeline connects to five sources: Binance for exchange data, CoinGecko for market metrics, TheGraph for DeFi protocol subgraphs (liquidity pools, swap volumes), Alchemy for on-chain token data, and a local historical database. TimescaleDB stores tick-level data with automatic time-based partitioning.
