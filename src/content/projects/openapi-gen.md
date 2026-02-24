---
title: "openapi-gen"
description: "Go library that uses oapi-codegen programmatically to generate clean, minimal API client code from OpenAPI 3.0 specifications. No CLI dependency, no complex boilerplate."
tech: ["Go", "OpenAPI 3.0", "Code Generation"]
category: devtools
github: "https://github.com/evanqhuang/openapi-gen"
featured: false
order: 11
---

oapi-codegen is the standard Go tool for generating type-safe API clients from OpenAPI specs, but it's designed to be invoked as a CLI. Embedding it in a code generation pipeline means shelling out, managing a binary dependency, and parsing text output — none of which fits cleanly in a Go build system.

openapi-gen wraps oapi-codegen's internal packages as a library, exposing a simple API that accepts a spec and returns generated Go source. The output is minimal by default: no unnecessary files, no regeneration markers, just the types and client methods you need.

This makes it straightforward to integrate spec-driven client generation into go generate workflows or custom tooling without any external CLI dependency.
