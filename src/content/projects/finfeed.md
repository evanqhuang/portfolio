---
title: "FinFeed"
description: "Self-hosted fish tank livestream using Raspberry Pi with OpenCV for HLS video capture, Express/TypeScript server for segment delivery, and an hls.js browser player with a fish-tank-themed UI."
tech: ["Python", "OpenCV", "FFmpeg", "TypeScript", "Express", "Raspberry Pi", "HLS"]
category: web
github: "https://github.com/evanqhuang/finfeed"
featured: false
order: 14
---

FinFeed streams a live fish tank feed from a Raspberry Pi camera to any browser. A Python daemon on the Pi captures frames via OpenCV, encodes HLS segments with FFmpeg, and writes them to local storage. An Express server written in TypeScript serves the `.m3u8` playlist and `.ts` segments over HTTP.

The browser client uses hls.js for adaptive playback with a custom fish-tank-themed UI — ambient color grading, subtle bubble animations, and a minimal control overlay. The Pi daemon handles camera reconnection and segment cleanup automatically, keeping the stream running unattended.
