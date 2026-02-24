---
title: "pyright-hand"
description: "MCP server exposing Pyright type-checking as a tool for AI coding agents. Supports stdio, SSE, and streamable HTTP transports with full-project analysis and .gitignore-aware file discovery. Dockerized for easy deployment."
tech: ["Python", "MCP", "Pyright", "Docker"]
category: devtools
github: "https://github.com/evanqhuang/pyright-hand"
featured: false
order: 9
---

AI coding agents that edit Python files have no reliable way to verify type correctness after a change without running a full CI pipeline. pyright-hand bridges that gap by wrapping Pyright's analysis engine in an MCP server, giving agents a structured tool call that returns type errors for a file or a whole project.

The server supports all three MCP transports — stdio for local agent integrations, SSE for browser-based clients, and streamable HTTP for production deployments. File discovery respects .gitignore rules so the tool accurately reflects what the project considers source.

A Docker image makes it straightforward to drop into any development environment without requiring a local Python or Node installation.
