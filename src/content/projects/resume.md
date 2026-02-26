---
title: "Resume Generator"
description: "Editing a resume in a word processor means fighting formatting on every change and duplicating content for different roles. This system stores resume content as structured data and generates perfectly formatted PDFs on demand, with a web UI for drag-and-drop customization, role-specific presets, and AI-powered job matching to highlight the most relevant experience."
tech: ["Go", "React", "LaTeX", "YAML", "OpenRouter", "DnD Kit"]
category: web
github: "https://github.com/evanqhuang/resume"
featured: false
order: 15
---

The content of a resume — work history, projects, skills — barely changes, but the formatting breaks on every edit and tailoring for a specific role means duplicating the whole document. This system separates content from presentation: resume entries live in a YAML master file, a LaTeX template handles typography and layout, and a Go backend generates a PDF on demand.

All experience and project entries are stored once in YAML and never duplicated. The Go backend embeds the LaTeX template at compile time so the binary has zero runtime file dependencies. The PDF pipeline runs XeLaTeX twice per generation (required for correct cross-references), with a fallback chain covering 8 known installation paths across macOS and Linux TeX distributions.

A React UI with drag-and-drop lets you reorder sections and entries, toggle items in or out, and see changes reflected in a generated PDF. Ordering changes are stored as deltas — only deviations from the default order are persisted — so the data file stays minimal. Presets save named snapshots of a full ordering and selection state for quickly switching between role-targeted versions. The job matching feature sends resume content to a language model via OpenRouter and returns relevance scores per entry, surfacing which experience to lead with for a given job description. Long-running analyses are modeled as async jobs with a cleanup interval so the server doesn't accumulate stale state.
