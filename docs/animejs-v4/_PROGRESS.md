# Anime.js v4 Documentation Scrape - Progress

## Project Goal
Scrape the official anime.js v4 docs (https://animejs.com/documentation/) word-for-word into markdown files.

## Completed Files

### 01-getting-started.md (verified)
- Installation (NPM, CDN, Direct Download)
- Module Imports (main + subpaths + importmap)
- Using with Vanilla JS
- Using with React

### 02-timer.md (verified)
- Creating Timers
- Playback settings: delay, duration, loop, loopDelay, alternate, reversed, autoplay, frameRate, playbackRate
- Callbacks: onBegin, onComplete, onUpdate, onLoop, onPause, then()
- Methods: play(), reverse(), pause(), restart(), alternate(), resume(), complete(), reset(), cancel(), revert(), seek(), stretch()
- Properties table

### 03-animation.md (complete, ~1500 lines)
- Intro + WAAPI alternative
- Targets: CSS Selector, DOM Elements, JavaScript Objects, Array of targets
- Animatable properties: CSS Properties, CSS transforms, CSS Variables, JS Object properties, HTML Attributes, SVG Attributes
- Tween value types: Numerical, Unit conversion, Relative, Color, Color function, CSS variable, Function based
- Tween parameters: to, from, delay, duration, ease, composition, modifier
- Keyframes: Tween values, Tween parameters, Duration based, Percentage based
- Playback settings: (refs Timer) + playbackEase, persist (WAAPI)
- Callbacks: (refs Timer) + onBeforeUpdate, onRender
- Methods: (refs Timer) + refresh()
- Properties table with JS/WAAPI indicators

### 04-timeline.md (complete)
- Intro + createTimeline()
- Add timers (add() and sync())
- Add animations (add() and sync())
- Sync WAAPI animations
- Sync timelines
- Call functions
- Time position (absolute, addition, subtraction, multiplier, previous end/start, combined, label, stagger)
- Playback settings: defaults + refs Timer for shared settings
- Callbacks: refs Timer/Animation
- Methods: add(), set(), sync(), label(), remove(), init(), call(), refresh() + refs Timer for shared
- Properties table

### 05-animatable.md (complete, verified)
- Intro + createAnimatable()
- Settings: unit, duration, ease, modifier
- Methods: Getters, Setters, revert()
- Properties table

### 06-draggable.md (complete)
- Intro + createDraggable()
- Axes Parameters: x, y, snap, modifier, mapTo
- Settings: trigger, container, containerPadding, containerFriction, releaseContainerFriction, releaseMass, releaseStiffness, releaseDamping, velocityMultiplier, minVelocity, maxVelocity, releaseEase, dragSpeed, dragThreshold, scrollThreshold, scrollSpeed, cursor
- Callbacks: onGrab, onDrag, onUpdate, onRelease, onSnap, onSettle, onResize, onAfterResize
- Methods: disable(), enable(), setX(), setY(), animateInView(), scrollInView(), stop(), reset(), revert(), refresh()
- Properties table (55 properties)

### 07-layout.md (complete)
- Intro + createLayout()
- Usage: Specifying a root, CSS display property animation, Staggered layout animation, DOM order change animation, Enter layout animation, Exit layout animation, Swap parent animation, Modal dialog animation
- Settings: children, delay, duration, ease, properties
- States Parameters: enterFrom, leaveTo, swapAt
- Methods: record(), animate(), update(), revert()
- Layout id attribute
- Callbacks: onBegin, onUpdate, onComplete
- Properties table (15 properties)
- Common Gotchas: 5 common issues with workarounds

### 08-scope.md (complete)
- Intro + createScope()
- Add constructor function
- Register method function
- Parameters: root, defaults, mediaQueries
- Methods: add(), addOnce(), keepTime(), revert(), refresh()
- Properties table (9 properties)

### 09-events.md (complete)
- Intro + onScroll()
- ScrollObserver Settings: container, target, debug, axis, repeat
- ScrollObserver Thresholds: Numeric values, Positions shorthands, Relative position values, Min max
- ScrollObserver Synchronisation Modes: Method names, Playback progress, Smooth scroll, Eased scroll
- ScrollObserver Callbacks (summary)
- ScrollObserver Methods: link(), refresh(), revert()
- ScrollObserver Properties table (20 properties)

### 10-svg.md (complete)
- Intro + import methods
- morphTo() - SVG shape morphing
- createDrawable() - SVG line drawing
- createMotionPath() - Motion path animation

### 11-text.md (complete)
- Intro + import methods
- splitText() main function
- TextSplitter Settings: lines, words, chars, debug, includeSpaces, accessible
- Split Parameters: class, wrap, clone
- TextSplitter Methods: addEffect(), revert(), refresh()
- TextSplitter Properties table (11 properties)

### 12-utilities.md (complete)
- Intro + import methods
- stagger() - value types (numerical, range) + parameters (start, from, reversed, ease, grid, axis, modifier, use, total)
- $(), get(), set(), cleanInlineStyles(), remove(), sync()
- random(), createSeededRandom(), randomPick(), shuffle()
- round(), clamp(), snap(), wrap(), mapRange(), lerp(), damp()
- roundPad(), padStart(), padEnd(), degToRad(), radToDeg()
- Chain-able utility functions

### 13-easings.md (complete)
- Built-in eases (full table)
- Cubic Bézier easing
- Linear easing
- Steps easing
- Irregular easing
- Spring (perceived + physics parameters)

### 14-waapi.md (complete)
- Intro + import methods
- When to use WAAPI
- Hardware-accelerated animations
- Improvements to the Web Animation API
- API differences with native WAAPI
- waapi.convertEase()

### 15-engine.md (complete)
- Intro + import
- Engine Parameters: timeUnit, speed, fps, precision, pauseOnDocumentHidden
- Engine Methods: update(), pause(), resume()
- Engine Properties table (8 properties)
- Engine Defaults table (18 default properties)

## Project Status: COMPLETE

All 15 sections of the Anime.js v4 documentation have been scraped word-for-word into markdown files.

## Workflow Pattern
1. Fetch main section intro from animejs.com/documentation/[section]/
2. Fetch each subsection page individually
3. Extract verbatim: title, description, Accepts, Default, code examples (JS + HTML)
4. Compile into markdown with proper hierarchy
5. For shared content (Timer/Animation), reference the first doc to avoid duplication

## URL Patterns
- Main: `/documentation/[section]/`
- Subsections vary: `/documentation/[section]/[subsection]/[item]`
- Some use hyphens, some use camelCase - try both if 404

## Notes
- WebFetch sometimes summarizes - ask for VERBATIM extraction
- Animation-specific: playbackEase, persist, onBeforeUpdate, onRender, refresh()
- Timer and Animation share many playback settings, callbacks, methods
