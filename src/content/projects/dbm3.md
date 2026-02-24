---
title: "DBM3"
description: "Diffusion Barrier Matrix decompression modeling framework implementing Hempleman's slab diffusion physics as an alternative to the Buhlmann ZH-L16C model. Models 3 tissue compartments using Fick's Second Law via finite differences."
tech: ["TypeScript", "Python", "Cloudflare Workers", "Numerical Methods"]
category: research
github: "https://github.com/evanqhuang/dbm3"
featured: false
order: 8
image: "/images/projects/dbm3.png"
---

Most recreational dive computers use the Buhlmann ZH-L16C perfusion model, which treats inert gas uptake as a series of independent exponential compartments. Hempleman's slab diffusion model takes a different physical view: tissue is modeled as a finite slab through which gas diffuses according to Fick's Second Law, giving a more accurate picture of how saturation gradients develop within tissue.

DBM3 implements the slab diffusion equations across three tissue compartments using finite difference integration. The numerical solver is written in TypeScript and runs on Cloudflare Workers, making it accessible as a low-latency API. A Python reference implementation validates the numerical output against published Hempleman tables.

The project exists to make the DBM physics accessible for research and comparison against Buhlmann predictions, particularly in the context of evaluating decompression conservatism for technical diving profiles.
