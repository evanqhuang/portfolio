---
title: "Cloudflare DDNS"
description: "Dockerized dynamic DNS daemon that keeps Cloudflare A records in sync with a residential IP. Detects Cloudflare Warp VPN connections (by checking the public IP against cached CF CIDR ranges) to prevent update loops. Multi-service IP detection fallback, webhook alerts, and Docker Autoheal for zero-operator recovery."
tech: ["Shell", "Docker", "Cloudflare API", "Alpine Linux"]
category: infra
github: "https://github.com/evanqhuang/cloudflare-ddns"
featured: false
order: 13
---

Home servers on residential connections have dynamic IPs that change without warning. This daemon polls the public IP on a configurable interval and updates the Cloudflare DNS A record when it changes — but the implementation handles several failure modes that simpler DDNS tools miss.

The standout feature is Cloudflare Warp detection. If the host is connected through Warp, the detected "public" IP is actually a Cloudflare egress IP — updating DNS to point there would break everything. The daemon fetches and caches the official Cloudflare IP range list (refreshed every 24 hours via atomic `mv` swap), then checks the current IP against those CIDR ranges using `ipcalc` before deciding whether to update.

IP detection uses a 4-service fallback chain (ipify, icanhazip, checkip.amazonaws.com, ifconfig.me), with each result validated against an IPv4 regex plus per-octet range checking. The Cloudflare API is only called when the IP actually changes (compared against a persistent state file), avoiding unnecessary API calls and DNS TTL resets. Webhook notifications fire on IP changes and errors.

The container runs on Alpine (~12MB image), executes as a non-root user with minimal privileges, and uses `set -euo pipefail` for strict Bash error handling. Docker Autoheal monitors the health check (stale if no successful cycle in 10 minutes) and restarts the container automatically.
