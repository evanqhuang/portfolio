---
title: "Cloudflare DDNS"
description: "Dockerized dynamic DNS updater for Cloudflare. Monitors public IP changes and automatically updates DNS records. Alpine-based, runs as non-root, supports webhook notifications and Docker Autoheal."
tech: ["Shell", "Docker", "Cloudflare API", "Alpine Linux"]
category: infra
github: "https://github.com/evanqhuang/cloudflare-ddns"
featured: false
order: 13
---

Home servers and self-hosted infrastructure on residential ISP connections have dynamic public IPs that change without warning. Cloudflare DDNS solves this by polling the public IP on a configurable interval and calling the Cloudflare API to update the relevant DNS A record whenever a change is detected.

The container is built on Alpine Linux, keeping the image under 10MB. It runs as a non-root user with only the Cloudflare API token it needs — no host capabilities, no privileged mode. Docker Autoheal monitors the container's health check and restarts it automatically if a polling cycle fails.

Webhook notifications (compatible with most alerting platforms) fire on IP changes and on error conditions, so changes to the DNS record are observable without polling logs.
