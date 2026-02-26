---
title: "Brickspect"
description: "A platform that automates commercial real estate due diligence — searching listings, analyzing properties, and comparing pricing across multiple data sources through a natural-language chat interface. Built across four services in three languages, coordinated by a shared protocol layer, and deployed on GCP with Terraform."
tech: ["Go", "Python", "TypeScript", "Next.js", "FastAPI", "GCP", "Cloud Run", "Terraform", "MCP", "Firebase", "Docker"]
category: ai
featured: true
order: 3
---

Commercial real estate due diligence means pulling data from multiple listing platforms, cross-referencing recent comps, checking zoning, and estimating cap rates — work that typically takes hours of manual research per property. Brickspect automates that workflow through a set of coordinated services that a natural-language chat interface can query.

The architecture has four components: a Go MCP server that acts as the central coordinator, a Python scraper that pulls listings from commercial platforms, a Go geocoding service for address normalization and mapping, and a Next.js dashboard with an AI chat interface. When a user asks a natural-language question about a property, the dashboard routes it through the MCP server, which orchestrates calls across the scraper, geocoding service, and analysis pipelines before returning a structured answer. The MCP server was implemented from scratch in Go — JSON-RPC message framing, capability negotiation, tool registration — rather than using a prebuilt SDK, which made it straightforward to support both local development (stdio transport) and production (HTTP/SSE) with the same business logic.

The Python scraper uses `cloudscraper` to work around Cloudflare-protected listing sites, with rate limiting and retry logic to avoid getting blocked. The MCP server auto-detects its environment: on Cloud Run it fetches GCP identity tokens from the metadata server for authenticated inter-service calls; locally it skips auth entirely with no configuration change needed. All infrastructure — Cloud Run deployments, Cloud Functions, Firestore, IAM bindings — is defined in Terraform.
