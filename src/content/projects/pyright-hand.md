---
title: "pyright-hand"
description: "AI coding tools can write Python fluently but have no built-in way to verify type correctness after making changes. This MCP server wraps Python's Pyright type checker so agents can check their own edits, see errors, and iterate — closing the feedback loop without waiting for a full CI run. Published on Docker Hub for drop-in use."
tech: ["Python", "MCP", "FastMCP", "Pyright", "Pydantic", "Docker"]
category: devtools
github: "https://github.com/evanqhuang/pyright-hand"
featured: false
order: 9
---

AI coding agents that edit Python files have no reliable way to verify type correctness after a change without waiting for a full CI run. pyright-hand fixes this by exposing Pyright as an MCP tool call — the agent writes code, checks types, sees errors, and iterates in a tight loop without ever leaving its context window.

There's a cross-runtime problem running Pyright inside Docker: it's a Node tool invoked from a Python process, and the shell environment doesn't always make that straightforward. The server uses a resolution chain — checking the system PATH, then invoking it explicitly via Node, then falling back to npx — so it works reliably across different container setups. Pyright also exits with a non-zero code on warnings (not just errors), which would normally cause a subprocess call to misread success as failure; the runner always attempts to parse the JSON output before checking the return code.

Large codebases can produce hundreds of diagnostics, which would overflow an AI agent's context window. Results are paginated at 50 per page by default. File discovery respects `.gitignore` using the same matching logic as Git itself, so the agent only sees errors in files that are part of the project. Progress is reported asynchronously so the calling agent gets status updates during long analyses. The whole thing ships as a Docker image with a simple volume mount pattern — point it at any Python codebase and it's ready.
