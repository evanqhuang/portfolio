---
title: "Home Server"
description: "A home server built to run local AI models, self-hosted services, and redundant storage — all managed as code. Hosts fine-tuned language models and image generation locally, eliminating dependence on cloud APIs and keeping all data on-premises. Provisioned and maintained through Ansible and Proxmox's API rather than manual configuration."
tech: ["Proxmox", "Linux", "Docker", "OpenZFS", "Ansible", "SDXL", "Qwen", "Mistral"]
category: infra
featured: false
order: 12
---

Running models locally is cheaper and more private than hitting cloud APIs, but it needs enough hardware to be worthwhile and enough discipline to stay maintainable. The server runs Proxmox VE as a bare-metal hypervisor, with separate Linux VMs for different workload categories. GPU passthrough gives the inference VM direct access to the GPU without sharing it through a hypervisor layer — currently running fine-tuned Qwen and Mistral models for text generation and Stable Diffusion XL with custom LoRA adapters for image synthesis.

Storage uses OpenZFS with RAIDZ2, which tolerates two simultaneous disk failures, with automatic integrity scrubs and snapshot-based backups. Self-hosted services — media servers, monitoring, DNS, and development environments — run in Docker Compose stacks distributed across VMs. The entire configuration is managed through Ansible playbooks and Proxmox's API so any VM can be reprovisioned from scratch without manual steps.
