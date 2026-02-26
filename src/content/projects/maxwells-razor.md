---
title: "Maxwell's Razor"
description: "A 90% 3D-printed toolchanger for FDM printers that achieves sub-millimeter repeatability with no sensors, no solenoids, and no electronics on the dock. The coupling geometry constrains tool position through contact alone — nine neodymium magnets provide clamping force. Designed for the Hypercube EVO with full Klipper macro automation."
tech: ["CAD", "3D Printing", "Mechanical Design", "Klipper", "STEP"]
category: embedded
github: "https://github.com/evanqhuang/maxwells-razor"
featured: true
order: 2
image: "/images/projects/maxwells-razor.png"
---

Most 3D printer toolchangers solve the repeatability problem with sensors: a position switch or Hall effect sensor confirms the tool is seated before the print continues. This works, but it adds firmware dependencies, failure modes, and electronics on every dock. Maxwell's Razor takes the opposite approach — the coupling geometry makes incorrect seating geometrically impossible rather than electronically detected.

The design uses Maxwell kinematic coupling: three contact pairs constrain all six degrees of freedom using exactly six contact points, giving sub-millimeter repeatability through geometric determinism alone. Nine neodymium magnets provide the clamping force that seats the tool, and release requires only the carriage to follow a defined trajectory. No servos, no solenoids, no firmware on the dock itself. Two hardware versions exist: a metal version using steel balls and precision-ground dowels for maximum rigidity, and a v1 version where the contact geometry is fully 3D-printed — a harder design problem, since printed surfaces must achieve the dimensional accuracy that ground metal provides inherently.

Klipper macros automate the full tool change sequence: parking the active head, executing the docking trajectory, picking up the new tool, and recalibrating probe offsets. Sensorless homing via TMC stallGuard eliminates physical endstop switches. The project is licensed under CERN-OHL-W-2.0, the strongly reciprocal open hardware license, so others can adapt the design freely.
