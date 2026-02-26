---
title: "LAMA Trading"
description: "A crypto trading system that combines three independent analysis models — momentum, order flow anomalies, and on-chain liquidity — into a single signal, with built-in risk management that shifts to more conservative behavior when markets become volatile. Validated by backtesting across 100+ assets over 10 years of historical data."
tech: ["Python", "LSTM", "ARIMA", "MLX", "TimescaleDB", "Binance API", "Docker", "Grafana"]
category: finance
github: "https://github.com/evanqhuang/pacha-lama"
featured: true
order: 7
---

LAMA (Liquidity-Anomaly-Momentum-Analysis) fuses three independent models into a composite trading signal. The momentum model analyzes price trend direction and strength. The anomaly model watches order book microstructure for unusual activity — large orders appearing or disappearing, bid-ask imbalances — that often precedes price moves. The liquidity model pulls on-chain data — pool depths, swap volumes, token holder concentration — to gauge how easily the asset can actually be traded. Each model generates a signal independently; a combiner layer decides how to weight them given current market conditions.

The risk management behavior changes based on what the market is doing. In normal conditions, models are combined by weighted average, favoring whichever has been performing best recently. When a regime detector classifies conditions as high volatility or crisis, the system shifts to consensus voting — a trade only executes if multiple models agree — and reduces all position sizes. In calm markets, a single very-confident model can be trusted; in chaotic markets, that same confidence is more likely to be a false signal.

Backtesting used walk-forward optimization: train on one year of data, evaluate on the next month, advance the window and repeat. This prevents look-ahead bias — the failure mode where a backtest looks great historically because the model was implicitly trained on the data it was tested on, but falls apart in live trading. The test covered 100+ assets across 10 years with realistic cost modeling (0.1% commission, 0.05% slippage per trade). MLX GPU variants of the signal generator and optimizer use Apple Silicon's unified memory for parallel hyperparameter search. The data pipeline connects to five sources: Binance, CoinGecko, TheGraph for DeFi subgraphs, Alchemy for on-chain data, and a local TimescaleDB instance for historical tick storage.
