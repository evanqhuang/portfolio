---
title: "Ixchel"
description: "A complete underwater cave survey system I designed and built from scratch — custom hardware, bare-metal firmware, and a post-dive 3D analysis tool. The handheld device tracks a diver's position as they swim through a cave and renders a live map on a touchscreen display. Logged data loads into a web visualizer that reconstructs the cave in 3D."
tech: ["C", "C++", "RP2350", "FreeRTOS", "SPI", "PIO", "Embedded", "CAD", "3D Printing"]
category: embedded
github: "https://github.com/evanqhuang/camazotz-ixchel"
featured: true
order: 1
image: "/images/projects/camazotz-ixchel.png"
---

Cave divers currently survey passages by writing measurements on underwater slates — depth, compass heading, and line distance at each station — then manually drafting maps on the surface. The data can't be analyzed digitally, errors compound across stations, and nothing gives the diver situational awareness while they're underground. Ixchel was built to replace that workflow entirely.

The system has three layers. The hardware is a custom RP2350-based device I designed and 3D-printed for underwater use, combining a magnetic rotary encoder (line reel distance), a 9-DOF IMU (orientation), and a pressure sensor (depth) with an AMOLED touchscreen display — all in a sealed enclosure. The firmware runs on both Cortex-M33 cores simultaneously: one runs a 100Hz navigation loop doing dead reckoning and sensor fusion, the other renders a live 2D stick map on the display that builds as the diver moves through the passage. When the dive ends, logged data loads into a Three.js web visualizer (deployed at map.camazotzdiving.com) that reconstructs the cave in 3D, with timeline scrubbing, color-coded sensor health, and exportable 2D survey maps.

The hardest engineering problem was making the firmware fail gracefully rather than catastrophically. Sensors can fail mid-dive — a stuck encoder wheel, an IMU going unresponsive — and the system needs to keep navigating as accurately as possible while flagging the affected data so post-dive analysis reflects actual confidence. The firmware handles three distinct conflict cases: encoder motion with a stationary IMU, IMU-informed velocity decay during encoder recovery, and stuck wheel detection when the IMU reports movement but the encoder reads zero. A tiered IMU failsafe degrades through quaternion extrapolation, orientation hold, and full hardware reset rather than dropping to a hard fault. Cross-core communication uses hardware spinlocks with a fixed-size transfer struct; the navigation tick runs entirely from SRAM to eliminate flash cache latency on time-critical paths.
