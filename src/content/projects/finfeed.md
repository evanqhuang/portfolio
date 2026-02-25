---
title: "FinFeed"
description: "Live fish tank stream from a Raspberry Pi to any browser. OpenCV captures raw frames and pipes them directly to FFmpeg's stdin for HLS encoding. Segments are pushed to the server via authenticated HTTP PUT — the same pattern used by professional streaming encoders — with hls.js handling playback and full error recovery."
tech: ["Python", "OpenCV", "FFmpeg", "TypeScript", "Express", "Raspberry Pi", "HLS"]
category: web
github: "https://github.com/evanqhuang/finfeed"
featured: false
order: 14
---

FinFeed streams a live fish tank feed from a Raspberry Pi camera to any browser over HLS. The video pipeline is tighter than most hobby streaming setups: OpenCV captures raw BGR24 frames from the camera and writes them directly to FFmpeg's stdin as raw bytes, bypassing any intermediate encoding step for maximum throughput from sensor to encoder.

The interesting architectural choice is how segments reach the server. Rather than writing to a shared filesystem (which would require the Pi and server to share a mount), FFmpeg pushes each `.ts` segment and `.m3u8` manifest to the Express server via authenticated HTTP PUT requests — the same delivery pattern used by professional streaming encoders like OBS pushing to Wowza. The Express server accepts uploads on an auth-protected route (Basic Auth), serves the HLS files publicly with correct MIME types, and runs a cleanup interval that deletes segments older than 5 minutes to prevent unbounded disk growth.

The browser client uses hls.js with a full error recovery strategy: network errors trigger `startLoad()` retries, media errors trigger `recoverMediaError()` codec resets, and fatal errors destroy and reinitialize the player. Native HLS (Safari) falls back to direct `video.src` assignment. The UI has a fish tank aesthetic with randomized CSS bubble animations.
