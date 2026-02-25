---
title: "DBM3"
description: "An alternative decompression model implementing Hempleman's slab diffusion physics — Fick's Second Law solved via finite differences across 3 tissue compartments with 20 spatial slices each. Includes a full Buhlmann ZH-L16C reference implementation for cross-validation, calibration against published tables, and batch comparison across ~7,800 dive profiles."
tech: ["TypeScript", "Python", "NumPy", "Cloudflare Workers", "Numerical Methods"]
category: research
github: "https://github.com/evanqhuang/dbm3"
featured: false
order: 8
image: "/images/projects/dbm3.png"
---

Most dive computers use the Buhlmann ZH-L16C model, which treats inert gas uptake as 16 independent exponential compartments — a simplification that assumes instant uniform mixing within each tissue type. Hempleman's slab diffusion model takes a different physical approach: tissue is a finite slab through which gas diffuses according to Fick's Second Law, producing spatial saturation gradients that the exponential model cannot represent. A fully saturated slab off-gasses slower than a partially saturated one — a real physical phenomenon that perfusion models miss entirely.

DBM3 solves the diffusion equations across three tissue compartments (spine D=0.002, muscle D=0.0005, joints D=0.0001), each discretized into 20 spatial slices. The boundary conditions are physically motivated: slice 0 (blood interface) uses permeability-limited flux, and the tissue core uses a no-flux reflecting boundary. The explicit Euler update is fully vectorized with NumPy. Numerical stability is enforced at initialization — the Courant number is verified to be well within the stable regime.

A complete Buhlmann ZH-L16C engine (all 16 compartments, Schreiner equation for continuous gas loading, gradient factor support) serves as the reference implementation, with a compiled C binary as a third cross-validation source. A calibration procedure iterates over reference depths, runs the slab model to the Buhlmann NDL at each depth, measures excess dissolved gas, and uses the median as each compartment's critical volume threshold — ensuring the two models' risk=1.0 boundaries align so divergences are physically interpretable. The batch comparator evaluates both models across ~7,800 profiles (5-70m depth × 1-120 min) using parallel processing.
