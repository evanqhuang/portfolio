---
title: "Brickspect"
description: "AI-powered commercial real estate due diligence platform. Multi-service architecture with a Go MCP protocol server orchestrating property search and analysis, Python FastAPI scraper for listing data, Next.js dashboard with AI chat interface, Go geocoding Cloud Function, and shared Terraform infrastructure on GCP."
tech: ["Go", "Python", "TypeScript", "Next.js", "FastAPI", "GCP", "Terraform", "MCP", "Firebase", "Docker"]
category: ai
featured: true
order: 3
---

Brickspect automates CRE due diligence through a set of coordinated services. A Go server implements the Model Context Protocol (MCP), exposing property search, analysis, and comparison as tool calls that AI assistants can invoke directly. A Python FastAPI service scrapes commercial listing platforms and normalizes the data into a unified schema.

The Next.js dashboard provides an AI chat interface where users can ask natural-language questions about properties — the chat backend routes queries through the MCP server, which orchestrates calls across the scraper, geocoding function, and analysis pipelines. A lightweight Go Cloud Function on GCP handles geocoding and address normalization.

All infrastructure is managed with Terraform — GCP project configuration, Cloud Run deployments, Cloud Functions, Firestore databases, and IAM bindings are defined as code and deployed through CI.
