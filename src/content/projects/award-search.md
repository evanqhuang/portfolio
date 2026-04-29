---
title: "Award Seat Search"
description: "A multi-loyalty-program award-seat scanner with reverse-engineered providers for LifeMiles, United, Singapore Airlines, Virgin Atlantic, and JAL. Each airline runs a different anti-bot stack — pure OAuth2, Playwright with session priming, CDP-over-vanilla-Chrome, zendriver with live TLS fingerprint inheritance, and an Amadeus DDS session encoded in a URL matrix parameter — all behind one provider interface."
tech: ["Python", "Playwright", "Pydantic", "Cloud Run", "Cloudflare Access"]
category: research
featured: false
order: 18
---

Airline loyalty programs share no common API surface. The solution is a `BaseAuth` + `BaseClient` interface in `core/interfaces.py` and a single `GenericScanner.scan_range` that fans out across cabins and dates, catches `AuthExpiredError`, re-acquires credentials, and retries once. All five providers normalize into a shared `SearchResult` model.

The five airlines require five different approaches. LifeMiles uses standard OAuth2 with password + refresh-token flow — pure HTTP, no browser. Singapore Airlines requires a 3-step session prime that sets a `VSSESSION` cookie server-side; when that sequence fails, a Playwright fallback attaches a response listener and waits for the specific `getCalendarSearch.form` round-trip for the right origin/destination/cabin before declaring the session warm. Virgin Atlantic's Akamai stack detects headless Playwright, so the scraper opens a real Chrome instance with `--remote-debugging-port` via `subprocess.Popen` and connects over CDP — multi-date GraphQL scans run inside `page.evaluate()` so Akamai sees same-origin fetches, not bot traffic. United routes the SSE-nested-flights POST through `browser_fetch()` inside the live SPA to inherit the session's TLS fingerprint and active Akamai sensors. JAL runs Amadeus DDS over WebLogic with the session embedded as a URL matrix parameter (`;JAL_SESSION_ID=...`) and an `ENC` cookie that must be regenerated per search after warming Akamai sensors on two different subdomains.

Only LifeMiles runs on a schedule in production, because it's the only provider that doesn't require an interactive browser session. A Cloud Run Job scans a grid of origin/destination pairs over a 365-day window and writes per-pair results as gzipped JSONL to GCS. It only writes a `_SUCCESS` marker when at least one pair succeeded — so a stale credential or network failure kills the run silently without overwriting last week's valid data on the read side. Cloudflare Access fronts the read UI; the application has no auth code.
