---
title: "Maxwell's Razor"
description: "Modular, 90% 3D-printed toolchanger for 3D printers based on Maxwell kinematic coupling. Fully mechanical docking system using neodymium magnets, designed for the Hypercube EVO. CERN-OHL-W-2.0 licensed."
tech: ["CAD", "3D Printing", "Mechanical Design", "STEP"]
category: embedded
github: "https://github.com/evanqhuang/maxwells-razor"
featured: true
order: 2
---

Maxwell's Razor applies the principle of Maxwell kinematic coupling to the toolchanger problem. A kinematic coupling constrains all six degrees of freedom using exactly six contact points, giving repeatable, deterministic positioning without any active alignment mechanism.

The docking system is entirely mechanical — neodymium magnets provide the clamping force that seats the tool against the coupling balls, and releasing requires only the carriage to move in a defined trajectory. No servos, no solenoids, no firmware complexity on the dock itself.

Designed specifically for the Hypercube EVO printer platform and released under CERN-OHL-W-2.0 so others can adapt it freely. Around 90% of the structural parts are printable, keeping the BOM tight.
