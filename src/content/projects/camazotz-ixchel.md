---
title: "Ixchel"
description: "Firmware for an RP2350-based handheld underwater cave mapping device. Dual-core architecture with real-time 3D stick map rendering on core 0 and a 100Hz navigation loop on core 1. Integrates IMU, magnetic rotary encoder, pressure sensor, and Waveshare AMOLED display."
tech: ["C", "C++", "RP2350", "FreeRTOS", "SPI", "Embedded"]
category: embedded
github: "https://github.com/evanqhuang/camazotz-ixchel"
featured: true
order: 1
---

Ixchel is the firmware powering a custom handheld device built for underwater cave survey. The RP2350's dual-core design maps cleanly onto the two real-time demands of the system: core 0 runs a continuous render loop that maintains and draws a 3D stick map of the survey passage, while core 1 runs the 100Hz navigation loop responsible for sensor fusion and state estimation.

Sensor integration spans an IMU for orientation, a magnetic rotary encoder for measuring line reel distance, a pressure sensor for depth, and a Waveshare AMOLED display driven over SPI. FreeRTOS coordinates inter-core communication and task scheduling, keeping latency predictable even during heavy render frames.

The device is designed to replace paper slates and reduce post-dive data entry by capturing the survey directly in machine-readable form during the dive.
