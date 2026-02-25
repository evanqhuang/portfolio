---
title: "Resume Generator"
description: "Full-stack resume system with a Go backend (Cobra CLI + Chi HTTP server), React frontend with drag-and-drop section reordering, and XeLaTeX PDF compilation. LaTeX templates are compiled into the binary via go:embed. Includes AI-powered job matching through OpenRouter and a preset system for role-specific variants."
tech: ["Go", "React", "LaTeX", "YAML", "OpenRouter", "DnD Kit"]
category: web
github: "https://github.com/evanqhuang/resume"
featured: false
order: 15
---

Maintaining a resume in a word processor means fighting formatting on every edit and duplicating content for different role targets. This system stores resume content in a YAML master file and renders it through a LaTeX template, with a web UI for interactive customization.

The Go backend embeds the LaTeX template at compile time via `//go:embed` — the binary ships with zero runtime file dependencies. The PDF pipeline runs XeLaTeX twice per generation (required for proper cross-references), with a fallback chain checking 8 known installation paths across macOS and Linux TeX distributions. LaTeX special characters (12 total, including `→` → `$\rightarrow$`) are escaped correctly.

The web frontend uses React with `@dnd-kit` for drag-and-drop section and entry reordering. Ordering state is stored as deltas — only deviations from defaults are persisted in `order.yaml`, keeping the file minimal. An AI job matching feature sends resume content to OpenRouter and returns per-item relevance scores; long-running analysis is modeled as async jobs with a mutex-protected registry and 10-minute TTL cleanup. Presets save named snapshots of the full ordering and selection state for quickly switching between role-targeted versions.
