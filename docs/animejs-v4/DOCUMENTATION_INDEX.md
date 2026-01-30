# Anime.js v4 Documentation Index

A comprehensive guide to all documentation files in this archive, scraped from the official Anime.js v4 documentation at animejs.com.

---

## 01. Getting Started

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/01-getting-started.md`

Installation and setup guide for Anime.js v4. Covers NPM installation, CDN access, direct downloads, module imports (main entry, subpath imports, native ES modules), and integration examples for vanilla JavaScript and React applications.

### Subsections:
- Installation (NPM, CDN, Direct Download)
- Module Imports
- Subpath Imports
- Available Subpaths
- Native ES Modules (No Bundler)
- Using with Vanilla JS
- Using with React

**Related Files:** `15-engine.md` (engine defaults), `08-scope.md` (React integration)

---

## 02. Timer

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/02-timer.md`

The base scheduling primitive for Anime.js. Timers schedule and control timed callbacks as an alternative to `setTimeout()` or `setInterval()`, keeping animations synchronized. Provides the foundation that Animation and Timeline inherit from.

### Subsections:
- Creating Timers
- **Playback Settings:** delay, duration, loop, loopDelay, alternate, reversed, autoplay, frameRate, playbackRate
- **Callbacks:** onBegin, onComplete, onUpdate, onLoop, onPause, then()
- **Methods:** play(), reverse(), pause(), restart(), alternate(), resume(), complete(), reset(), cancel(), revert(), seek(), stretch()
- **Properties:** id, deltaTime, currentTime, iterationCurrentTime, progress, iterationProgress, currentIteration, speed, fps, paused, began, completed, reversed, backwards

**Related Files:** `03-animation.md`, `04-timeline.md` (both inherit Timer functionality)

---

## 03. Animation

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/03-animation.md`

The core animation API using the `animate()` method. Creates animations that modify property values of targeted elements with extensive configuration through parameters, callbacks, and control methods.

### Subsections:
- Creating Animations
- **Targets:** CSS Selector, DOM Elements, JavaScript Objects, Array of targets
- **Animatable Properties:** CSS Properties, CSS Transforms, CSS Variables, JavaScript Object properties, HTML Attributes, SVG Attributes
- **Tween Value Types:** Numerical value, Unit conversion, Relative value, Color value, Color function value, CSS variable, Function based value
- **Tween Parameters:** to, from, delay, duration, ease, composition, modifier
- **Keyframes:** Tween values keyframes, Tween parameters keyframes, Duration based keyframes, Percentage based keyframes
- **Playback Settings:** playbackEase, persist (WAAPI)
- **Callbacks:** onBeforeUpdate, onRender (plus inherited Timer callbacks)
- **Methods:** refresh() (plus inherited Timer methods)
- **Properties:** targets, duration (plus inherited Timer properties)

**Related Files:** `02-timer.md` (inherited functionality), `13-easings.md` (ease parameter), `12-utilities.md` (stagger, modifiers)

---

## 04. Timeline

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/04-timeline.md`

Synchronizes animations, timers, and callbacks together into coordinated sequences. Allows orchestrating complex animation sequences with precise time positioning.

### Subsections:
- Add Timers
- Add Animations
- Sync WAAPI Animations
- Sync Timelines
- Call Functions
- **Time Position:** Absolute, Addition, Subtraction, Multiplier, Previous positions, Labels, Stagger
- **Timeline Playback Settings:** defaults
- **Timeline Callbacks** (inherited from Timer/Animation)
- **Timeline Methods:** add(), set(), sync(), label(), remove(), init(), call(), refresh()
- **Timeline Properties:** labels (plus inherited properties)

**Related Files:** `02-timer.md`, `03-animation.md` (inherited functionality), `14-waapi.md` (WAAPI sync)

---

## 05. Animatable

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/05-animatable.md`

High-performance animation wrapper for frequently updated values using `createAnimatable()`. Ideal replacement for `animate()` in situations where values change frequently, such as cursor events or animation loops.

### Subsections:
- **Animatable Settings:** unit, duration, ease, modifier
- **Animatable Methods:** Getters, Setters, revert()
- **Animatable Properties:** targets, animations

**Related Files:** `03-animation.md` (standard animation), `12-utilities.md` (stagger with animatable)

---

## 06. Draggable

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/06-draggable.md`

Adds draggable capabilities to DOM elements using `createDraggable()`. Provides physics-based drag interactions with spring easing, container bounds, snapping, and velocity controls.

### Subsections:
- **Draggable Axes Parameters:** x, y, snap, modifier, mapTo
- **Draggable Settings:** trigger, container, containerPadding, containerFriction, releaseContainerFriction, releaseMass, releaseStiffness, releaseDamping, velocityMultiplier, minVelocity, maxVelocity, releaseEase, dragSpeed, dragThreshold, scrollThreshold, scrollSpeed, cursor
- **Draggable Callbacks:** onGrab, onDrag, onUpdate, onRelease, onSnap, onSettle, onResize, onAfterResize
- **Draggable Methods:** disable(), enable(), setX(), setY(), animateInView(), scrollInView(), stop(), reset(), revert(), refresh()
- **Draggable Properties:** snapX, snapY, scrollSpeed, dragSpeed, velocity, x, y, progressX, progressY, grabbed, dragged, etc.

**Related Files:** `13-easings.md` (spring easing), `12-utilities.md` (modifier functions)

---

## 07. Layout (NEW)

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/07-layout.md`

Automatically animates between HTML layout states using `createLayout()`. Enables animation of properties normally impossible to animate like CSS display, flex direction, grid settings, and DOM order.

### Subsections:
- **Layout Usage:** Specifying a root, CSS display property animation, Staggered layout animation, DOM order change animation, Enter layout animation, Exit layout animation, Swap parent animation, Modal dialog animation
- **Layout Settings:** children, delay, duration, ease, properties
- **Layout States Parameters:** enterFrom, leaveTo, swapAt
- **Layout Methods:** record(), animate(), update(), revert()
- **Layout id attribute**
- **Layout Callbacks**
- **Layout Properties**
- **Common Gotchas**

**Related Files:** `04-timeline.md` (returns Timeline), `12-utilities.md` (stagger)

---

## 08. Scope

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/08-scope.md`

Creates isolated animation contexts using `createScope()`. Animations declared inside a Scope can react to media queries, use custom root elements, share default parameters, and be reverted in batch.

### Subsections:
- Add constructor function
- Register method function
- **Scope Parameters:** root, defaults, mediaQueries
- **Scope Methods:** add(), addOnce(), keepTime(), revert(), refresh()
- **Scope Properties:** data, defaults, root, constructors, revertConstructors, revertibles, methods, matches, mediaQueryLists

**Related Files:** `01-getting-started.md` (React integration), `15-engine.md` (defaults)

---

## 09. Events

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/09-events.md`

Event listener utility methods to trigger and control animations, primarily featuring `onScroll()` for scroll-triggered animations.

### Subsections:
- **onScroll** - ScrollObserver creation
- **ScrollObserver Settings:** container, target, debug, axis, repeat
- **ScrollObserver Thresholds:** Numeric values, Position shorthands, Relative position values, Min max
- **ScrollObserver Synchronisation Modes:** Method names, Playback progress, Smooth scroll, Eased scroll
- **ScrollObserver Callbacks:** onEnter, onEnterForward, onEnterBackward, onLeave, onLeaveForward, onLeaveBackward, onUpdate, onSyncComplete, onResize
- **ScrollObserver Methods:** link(), refresh(), revert()
- **ScrollObserver Properties:** id, container, target, linked, repeat, horizontal, enter, leave, sync, velocity, backward, scroll, progress, completed, began, isInView, offset, distance

**Related Files:** `02-timer.md`, `03-animation.md`, `04-timeline.md` (linkable objects)

---

## 10. SVG

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/10-svg.md`

Collection of utility functions to help with SVG morphing, line drawing, and motion path animations.

### Subsections:
- **morphTo()** - Shape morphing between SVG paths/polygons/polylines
- **createDrawable()** - Line drawing animation with `draw` property
- **createMotionPath()** - Animate elements along SVG paths

**Related Files:** `03-animation.md` (animating SVG attributes), `12-utilities.md`

---

## 11. Text

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/11-text.md`

Collection of utility functions to help with text animations, featuring `splitText()` for splitting text into animatable elements.

### Subsections:
- **splitText()** - Text splitting utility
- **TextSplitter Settings:** lines, words, chars, debug, includeSpaces, accessible
- **Split Parameters:** class, wrap, clone
- **TextSplitter Methods:** addEffect(), revert(), refresh()
- **TextSplitter Properties:** $target, html, debug, includeSpaces, accessible, lines, words, chars, lineTemplate, wordTemplate, charTemplate

**Related Files:** `03-animation.md` (animating split text), `12-utilities.md` (stagger)

---

## 12. Utilities

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/12-utilities.md`

Collection of utility functions for common animation tasks that can also serve as modifier functions.

### Subsections:
- **stagger()** - Sequential effects across multiple targets
  - Stagger Value Types: Numerical value, Range value
  - Stagger Parameters: start, from, reversed, ease, grid, axis, modifier, use, total
- **$()** - DOM element selector
- **get()** - Get property values with optional unit conversion
- **set()** - Set multiple property values immediately
- **cleanInlineStyles()** - Remove CSS inline styles
- **remove()** - Remove targets from animations
- **sync()** - Execute callback in sync with engine loop
- **random()** - Random number generation
- **createSeededRandom()** - Seeded pseudo-random function
- **randomPick()** - Pick random element from collection
- **shuffle()** - Randomize array order
- **round()** - Round to decimal places
- **clamp()** - Restrict number to range
- **snap()** - Snap to increment or array values
- **wrap()** - Wrap number between range
- **mapRange()** - Map number from one range to another
- **lerp()** - Linear interpolation
- **damp()** - Frame-rate independent lerp
- **roundPad()** - Round and pad with zeros
- **padStart()** / **padEnd()** - Pad numbers to length
- **degToRad()** / **radToDeg()** - Angle conversion
- **Chain-able Utility Functions**

**Related Files:** All other files (utilities are used throughout)

---

## 13. Easings

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/13-easings.md`

Collection of easing functions and a physics-based spring generator.

### Subsections:
- **Built-in Eases:** linear, Power, Quad, Cubic, Quart, Quint, Sine, Exponential, Circular, Bounce, Back, Elastic
- **Cubic Bezier Easing** - Custom Bezier curves
- **Linear Easing** - Piecewise linear interpolation
- **Steps Easing** - Stepped/discrete animations
- **Irregular Easing** - Randomized interpolation
- **Spring** - Physics-based spring generator
  - Perceived Parameters: bounce, duration
  - Physics Parameters: mass, stiffness, damping, velocity
  - onComplete callback

**Related Files:** `03-animation.md` (ease parameter), `06-draggable.md` (releaseEase)

---

## 14. WAAPI (Web Animation API)

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/14-waapi.md`

Lightweight 3KB alternative to `animate()` using the Web Animation API under the hood.

### Subsections:
- When to Use WAAPI
- Hardware-Accelerated Animations
- Hardware-Accelerated Properties
- Improvements to the Web Animation API
- API Differences with Native WAAPI
- **waapi.convertEase()** - Convert JS easing to WAAPI linear easing

**Related Files:** `03-animation.md` (JS version comparison), `04-timeline.md` (sync WAAPI animations)

---

## 15. Engine

**File Path:** `/Users/johnoliver/Desktop/animejs-docs-v4/15-engine.md`

Drives and synchronizes all Animation, Timer, and Timeline instances. Global configuration and control.

### Subsections:
- **Engine Parameters:** timeUnit, speed, fps, precision, pauseOnDocumentHidden
- **Engine Methods:** update(), pause(), resume()
- **Engine Properties:** timeUnit, currentTime, deltaTime, precision, speed, fps, useDefaultMainLoop, pauseOnDocumentHidden
- **Engine Defaults:** playbackEase, playbackRate, frameRate, loop, reversed, alternate, autoplay, duration, delay, composition, ease, loopDelay, modifier, callbacks (onBegin, onUpdate, onRender, onLoop, onComplete, onPause)

**Related Files:** All files (engine affects all animations)

---

## Quick Reference

| # | Section | Primary Function | File |
|---|---------|-----------------|------|
| 01 | Getting Started | Installation & Setup | `01-getting-started.md` |
| 02 | Timer | `createTimer()` | `02-timer.md` |
| 03 | Animation | `animate()` | `03-animation.md` |
| 04 | Timeline | `createTimeline()` | `04-timeline.md` |
| 05 | Animatable | `createAnimatable()` | `05-animatable.md` |
| 06 | Draggable | `createDraggable()` | `06-draggable.md` |
| 07 | Layout | `createLayout()` | `07-layout.md` |
| 08 | Scope | `createScope()` | `08-scope.md` |
| 09 | Events | `onScroll()` | `09-events.md` |
| 10 | SVG | `svg.morphTo()`, `svg.createDrawable()`, `svg.createMotionPath()` | `10-svg.md` |
| 11 | Text | `splitText()` | `11-text.md` |
| 12 | Utilities | `stagger()`, `utils.$()`, etc. | `12-utilities.md` |
| 13 | Easings | `spring()`, `cubicBezier()`, etc. | `13-easings.md` |
| 14 | WAAPI | `waapi.animate()` | `14-waapi.md` |
| 15 | Engine | `engine` | `15-engine.md` |

---

## Architecture Overview

```
engine (global configuration & loop)
    │
    ├── Timer (base scheduling primitive)
    │       │
    │       ├── Animation (Timer + property tweening)
    │       │       │
    │       │       └── Timeline (orchestrates Animations/Timers)
    │       │
    │       └── Animatable (high-frequency Animation wrapper)
    │
    ├── Draggable (interactive drag with physics)
    │
    ├── Layout (DOM layout transition animations)
    │
    ├── Scope (isolated animation contexts)
    │
    └── ScrollObserver (scroll-triggered animations)
```

---

*Documentation archive sourced from animejs.com/documentation/*
