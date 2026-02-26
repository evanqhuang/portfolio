---
title: "DBM3"
description: "Implements an alternative physics model for scuba decompression — calculating how long a diver can safely stay at depth before needing a slow ascent to avoid injury. The dominant industry model (Buhlmann ZH-L16C) treats gas absorption in tissue as simple exponential decay; this project models it as spatial diffusion and compares both across ~7,800 dive profiles."
tech: ["TypeScript", "Python", "NumPy", "Cloudflare Workers", "Numerical Methods"]
category: research
github: "https://github.com/evanqhuang/dbm3"
featured: false
order: 8
image: "/images/projects/dbm3.png"
---

Decompression sickness ("the bends") happens when inert gas dissolved in a diver's tissues comes out of solution too quickly during ascent — forming bubbles that cause injury or death. Every dive computer calculates a no-decompression limit (NDL): the maximum time at a given depth before the diver must ascend slowly to off-gas safely. The Buhlmann ZH-L16C model, used in virtually all commercial dive computers, approximates this by treating gas absorption across 16 independent tissue compartments as simple exponential curves — a mathematically convenient model that assumes gas mixes instantly and uniformly within each tissue.

Hempleman's slab model takes a different physical premise: tissue is a finite slab through which gas diffuses gradually, creating spatial gradients from the blood interface inward. A fully saturated slab off-gasses more slowly than a partially saturated one — a real physical phenomenon that exponential models cannot represent. DBM3 implements this model across three tissue compartments (spine, muscle, joints), each divided into 20 spatial slices to capture those gradients, and runs the Buhlmann model in parallel as a reference implementation.

The hardest part is making the two models comparable. Because they use different internal risk metrics, a calibration procedure runs the slab model against known safe dive profiles and tunes each compartment's threshold so both models declare the same boundary as "risk = 1.0." Only then do divergences above that boundary mean something physically interpretable. The batch comparator runs both engines across ~7,800 profiles spanning 5-70m depth and 1-120 minute durations, using parallel processing to quantify where the models agree and where they diverge most.
