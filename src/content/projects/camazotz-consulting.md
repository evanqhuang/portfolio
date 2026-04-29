---
title: "Camazotz Consulting"
description: "An AI-automation consulting site whose hero demo is a real LLM call, not a video. The site is statically exported from Next.js to Cloudflare Pages; the document-summarization playground runs as a Cloudflare Pages Function calling Workers AI directly, with per-IP daily rate limiting backed by Workers KV."
tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Cloudflare Pages", "Cloudflare Workers AI", "Cloudflare KV", "Resend", "Terraform"]
category: web
github: "https://github.com/evanqhuang/camazotz-consulting"
url: "https://camazotz.io"
featured: false
order: 20
image: "/images/projects/camazotz-consulting.png"
---

The site is statically exported (`output: 'export'`) and deployed to Cloudflare Pages, with no `app/api/` directory — all server logic lives in `functions/api/*.ts` running on Cloudflare's edge runtime. The local development command is `next build && wrangler pages dev out`: the same static artifact that deploys to production runs locally under wrangler. The AI demo handler and contact form are the only server-side code, both Pages Functions.

The document-summarization playground calls Workers AI with `@cf/qwen/qwen3-30b-a3b-fp8`. `response_format: { type: "json_object" }` constrains the output shape at the model level; a one-shot exemplar in the system prompt pins the JSON structure; and `\n\n/no_think` on both user turns suppresses Qwen3's chain-of-thought tokens, cutting latency without affecting the answer. The handler reads from both `result.choices[0].message.content` (OpenAI-compatible) and `result.response` (older Workers AI shape), then uses `indexOf('{')` / `lastIndexOf('}')` to extract JSON from any prose wrapper before parsing, since model outputs can vary in framing across versions. Rate limiting uses Workers KV with a key of `ip:${ip}:${today}` and a 25-hour TTL — preview deployments share the same namespace on purpose, so a preview branch can't be used as a bypass route.

The front-end shows three progress stages while the call runs. The stages are scheduled with `setTimeout` at 800ms and 1600ms *before* the fetch resolves, and `clearTimeout` fires when the response lands — so on a sub-2-second response, all three steps still advance visually. It's perceived-latency theater, but the underlying work is real.
