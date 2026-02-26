---
title: "Cloudflare DDNS"
description: "Home servers on residential internet connections have IP addresses that change without warning, silently breaking domain names. This daemon keeps Cloudflare DNS updated automatically — and specifically handles the case where a VPN connection would cause it to write the wrong IP, which simpler DDNS tools get wrong."
tech: ["Shell", "Docker", "Cloudflare API", "Alpine Linux"]
category: infra
github: "https://github.com/evanqhuang/cloudflare-ddns"
featured: false
order: 13
---

Home servers on residential internet connections get a different public IP every time the router reconnects. Domain names that pointed to the old IP silently break — and you only find out when something stops working. This daemon polls the current public IP on a regular interval and updates the Cloudflare DNS record whenever it changes.

The tricky edge case is VPN detection. If Cloudflare Warp is active on the host, the IP the daemon detects as "public" is actually a Cloudflare egress address — writing that to DNS would point the domain at Cloudflare's network rather than the home server. The daemon fetches and caches the official Cloudflare IP range list, refreshed every 24 hours, and checks the detected IP against those ranges before deciding whether to update. If the IP is a known Cloudflare address, the update is skipped.

IP detection itself uses a four-service fallback chain so a single external service going down doesn't cause false IP readings. Each result is validated before use, and the Cloudflare API is only called when the IP actually changes — avoiding unnecessary API calls and unnecessary DNS TTL resets that would slow down propagation. Webhook notifications fire on IP changes and errors so failures don't go unnoticed.

The container runs on Alpine for a small image footprint, executes as a non-root user, and runs with `set -euo pipefail` so any unhandled failure kills the script immediately. Docker Autoheal monitors a health check that goes stale if no successful cycle completes within 10 minutes, and automatically restarts the container if it gets stuck.
