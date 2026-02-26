---
title: "FinFeed"
description: "Streams a live fish tank camera from a Raspberry Pi to any browser with no cloud streaming service in between. The camera feeds directly into a video encoder, which pushes segments to a server over HTTP — the same delivery pattern used by professional encoders — and hls.js handles playback and error recovery on the browser side."
tech: ["Python", "OpenCV", "FFmpeg", "TypeScript", "Express", "Raspberry Pi", "HLS"]
category: web
github: "https://github.com/evanqhuang/finfeed"
featured: false
order: 14
---

FinFeed streams a live fish tank feed from a Raspberry Pi to any browser using HLS — the same adaptive streaming protocol used by most video platforms. The pipeline: camera captures raw frames, OpenCV passes them directly to FFmpeg's stdin as raw bytes, FFmpeg encodes them into short video segments, and those segments get delivered to the browser.

The non-obvious decision is how the segments travel from the Pi to the server. One natural approach would be writing them to a shared filesystem that both machines can read — but that requires a network mount and tight coupling between the two. Instead, FFmpeg pushes each segment and manifest file to the Express server via authenticated HTTP PUT requests, which is the same delivery pattern used by professional streaming encoders when pushing to streaming platforms. The server accepts those uploads on a protected route, serves the HLS files publicly with the correct MIME types, and runs a cleanup interval to delete segments older than 5 minutes so disk usage stays bounded.

Browser playback uses hls.js with a layered error recovery strategy: transient network errors trigger load retries, media decode errors trigger codec resets, and unrecoverable errors tear down and reinitialize the player entirely. Safari, which supports HLS natively, skips hls.js and plays directly. The UI has a fish tank aesthetic with randomized CSS bubble animations rising up the page.
