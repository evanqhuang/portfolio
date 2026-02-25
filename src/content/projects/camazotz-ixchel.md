---
title: "Ixchel"
description: "Firmware for a handheld underwater cave survey device on the RP2350, housed in a custom 3D-designed enclosure. Dual-core bare-metal architecture — core 0 renders a live 3D stick map while core 1 runs a 100Hz navigation loop with IMU/encoder/pressure sensor fusion. Three independent I2C buses, hardware spinlock synchronization, and SRAM-resident hot paths for deterministic timing."
tech: ["C", "C++", "RP2350", "FreeRTOS", "SPI", "PIO", "Embedded", "CAD", "3D Printing"]
category: embedded
github: "https://github.com/evanqhuang/camazotz-ixchel"
featured: true
order: 1
image: "/images/projects/camazotz-ixchel.png"
---

Ixchel replaces paper slates for underwater cave survey by capturing passage geometry directly in machine-readable form during the dive. The device is housed in a custom enclosure I designed and 3D-printed for underwater use. The RP2350's two Cortex-M33 cores map onto the system's two real-time demands: core 0 maintains a continuous render loop drawing a 3D stick map on a Waveshare AMOLED display, while core 1 runs the 100Hz navigation loop responsible for sensor fusion and dead reckoning.

The sensor stack spans three independent I2C buses — hardware I2C0 for the AS5600 magnetic rotary encoder (line reel distance), hardware I2C1 for the MS5837-30BA pressure/depth sensor, and a PIO-emulated I2C bus to isolate the BNO085 IMU. The pressure sensor uses a non-blocking state machine (`Idle → WaitingD1 → WaitingD2`) so the nav loop never stalls on I2C reads.

Cross-core communication uses the RP2350's hardware spinlocks with a compact 40-byte transfer struct (size verified by `static_assert`). The entire navigation tick — quaternion math, sensor conflict resolution, position integration — runs from SRAM via `__not_in_flash_func()` to eliminate XIP cache miss latency. Position accumulates in double precision to prevent float drift over long cave passages, while rotation math uses single-precision floats for FPU throughput.

The firmware handles three distinct sensor conflict cases: encoder motion with a stationary IMU (encoder malfunction), IMU-informed velocity decay during encoder recovery, and stuck wheel detection when the IMU reports linear motion but the encoder reads zero. A tiered IMU failsafe degrades through quaternion extrapolation via angular velocity integration, orientation hold, and full hardware reset. The build uses `-O2` over `-O3` per embedded safety guidelines, and CMake patches an upstream BNO08x driver bug at build time via `file(READ/WRITE)`.
