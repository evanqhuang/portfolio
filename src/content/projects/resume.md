---
title: "Resume Generator"
description: "Code-driven resume system using YAML source files with configurable presets and section ordering. Generates PDF output via LaTeX compilation with a web frontend for preview."
tech: ["YAML", "LaTeX", "Python", "CLI"]
category: web
github: "https://github.com/evanqhuang/resume"
featured: false
order: 15
---

Maintaining a resume in Word or Google Docs means fighting formatting whenever content changes. This system stores resume content in YAML — structured, diffable, and separate from presentation — and renders it to a PDF via a LaTeX template.

Presets define which sections appear and in what order, making it easy to produce a software-focused version versus an engineering-focused version from the same source file without duplicating content. The CLI accepts a preset name and outputs a compiled PDF.

A web frontend provides a live preview during editing so the LaTeX compilation feedback loop is short. The source YAML is the canonical record; everything else is generated.
