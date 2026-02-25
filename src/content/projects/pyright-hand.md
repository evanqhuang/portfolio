---
title: "pyright-hand"
description: "MCP server that gives AI coding agents a type-checking feedback loop by wrapping Pyright's analysis engine. Supports stdio, SSE, and streamable HTTP transports with paginated diagnostics, .gitignore-aware file discovery, and async progress reporting. Published on Docker Hub for drop-in use."
tech: ["Python", "MCP", "FastMCP", "Pyright", "Pydantic", "Docker"]
category: devtools
github: "https://github.com/evanqhuang/pyright-hand"
featured: false
order: 9
---

AI coding agents that edit Python files have no reliable way to verify type correctness after a change without waiting for a full CI run. pyright-hand closes that feedback loop by exposing Pyright as an MCP tool call — the agent writes code, checks types, sees errors, and iterates.

The server runs Pyright with `--outputjson` and handles a non-trivial cross-runtime problem: inside Docker, Pyright is installed globally via npm, but the Python process may not find it. A resolution chain tries `shutil.which("pyright")`, then wraps it as `node pyright_path` to bypass shell env issues, then falls back to `npx pyright`. Pyright's non-zero exit code on warnings (not just errors) is handled correctly — the runner always attempts JSON parse before checking the return code.

Diagnostics are paginated (default 50 per page) to prevent flooding an LLM's context window on large codebases. File discovery uses `pathspec` with `GitWildMatchPattern` to implement proper `.gitignore` semantics — the same matching behavior as Git itself. The server reports progress asynchronously via MCP context (`ctx.report_progress`) so the calling agent can display status during long analyses. Published to Docker Hub as a ready-to-use image with a volume mount pattern for the target codebase.
