---
title: "Home Server"
description: "Proxmox VE hypervisor managing purpose-built Linux VMs with GPU passthrough for ML inference and training. OpenZFS with RAIDZ2 for two-disk fault tolerance and snapshot-based backups. Runs fine-tuned LLMs (Qwen, Mistral), diffusion models (SDXL with LoRA adapters), and self-hosted services via Docker Compose and Ansible."
tech: ["Proxmox", "Linux", "Docker", "OpenZFS", "Ansible", "SDXL", "Qwen", "Mistral"]
category: infra
featured: false
order: 12
---

The home server runs Proxmox VE as a bare-metal hypervisor, managing a fleet of Linux VMs purpose-built for different workloads. GPU passthrough enables dedicated instances for ML inference and training — currently running fine-tuned Qwen and Mistral models for text generation and Stable Diffusion XL with custom LoRA adapters for image generation.

Storage is backed by OpenZFS with RAIDZ2 for two-disk fault tolerance, automatic scrubs, and snapshot-based backups. Self-hosted services run in Docker Compose stacks across VMs — media servers, monitoring, DNS, and development environments — all managed through Proxmox's API and Ansible playbooks for reproducible provisioning.
