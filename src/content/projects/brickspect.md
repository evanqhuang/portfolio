---
title: "Brickspect"
description: "Commercial real estate due diligence platform built on the Model Context Protocol. A Go MCP server (implementing the 2024-11-05 spec from scratch) orchestrates property search and analysis across a Python scraper, Next.js dashboard with AI chat, and a Go geocoding function — all deployed on GCP Cloud Run with Terraform."
tech: ["Go", "Python", "TypeScript", "Next.js", "FastAPI", "GCP", "Cloud Run", "Terraform", "MCP", "Firebase", "Docker"]
category: ai
featured: true
order: 3
---

Brickspect automates CRE due diligence through a set of coordinated services connected by the Model Context Protocol. The Go MCP server implements the 2024-11-05 protocol specification from scratch — JSON-RPC 2.0 message framing, capability negotiation, tool schema registration, and content response formatting — rather than using a prebuilt SDK. It supports dual transports: stdio for local Claude Desktop integration and HTTP/SSE for production deployment, with the same business logic behind both.

The MCP server auto-detects its runtime environment. When running on Cloud Run (detected by checking for `.run.app` in the URL), it fetches GCP identity tokens from the metadata server for authenticated inter-service calls. In local development, it falls back to no-auth. No configuration change required — the environment determines the auth strategy.

A Python FastAPI service scrapes commercial listing platforms using `cloudscraper` to bypass Cloudflare challenges, with rate limiting, retry logic, and structured logging. The Next.js dashboard provides an AI chat interface where natural-language property questions are routed through the MCP server, which orchestrates calls across the scraper, geocoding function, and analysis pipelines. All infrastructure — Cloud Run deployments, Cloud Functions, Firestore, IAM bindings — is defined in Terraform.
