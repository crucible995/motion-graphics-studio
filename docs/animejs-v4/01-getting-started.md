# Getting Started

## Installation

Anime.js is a JavaScript animation engine available through multiple distribution channels.

### NPM Installation

The library can be installed via the `animejs` package:

```bash
npm install animejs
```

**ES Modules Import:**

```javascript
import { animate } from 'animejs';
```

**CommonJS Require:**

```javascript
const { animate } = require('animejs');
```

### CDN Access

**ES Modules CDN:**

```javascript
import { animate } from 'https://esm.sh/animejs';
```

or

```javascript
import { animate } from 'https://cdn.jsdelivr.net/npm/animejs/+esm';
```

**UMD Global Object:**

```html
<script src="https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js"></script>
```

### Direct Download

Download the library directly from the GitHub repository:

| File | Description |
|------|-------------|
| `dist/modules/index.js` | ES Modules entry point |
| `dist/modules/index.cjs` | CommonJS entry point |
| `dist/bundles/anime.esm.js` | Bundled ES Module |
| `dist/bundles/anime.esm.min.js` | Bundled ES Module (minified) |
| `dist/bundles/anime.umd.js` | UMD Bundle |
| `dist/bundles/anime.umd.min.js` | UMD Bundle (minified) |

---

## Module Imports

Anime.js employs a modules-first API with robust tree-shaking capabilities, positioning itself among lightweight JavaScript animation libraries. Modules can be imported from either the main `'animejs'` entry point or granular subpaths using bundlers like Vite/esbuild, or natively via importmap.

Every Anime.js module can be directly imported from the main module `'animejs'`:

```javascript
import { animate, splitText, stagger, random } from 'animejs';

const split = splitText('p');

animate(split.words, {
  opacity: () => random(0, 1, 2),
  delay: stagger(50),
});
```

### Subpath Imports

For environments without tree-shaking, Anime.js enables loading only required functionality:

```javascript
import { animate } from 'animejs/animation';
import { splitText } from 'animejs/text';
import { stagger, random } from 'animejs/utils';
```

### Available Subpaths

| Module | Import Path |
|--------|-------------|
| Animation | `'animejs/animation'` |
| Timer | `'animejs/timer'` |
| Timeline | `'animejs/timeline'` |
| Animatable | `'animejs/animatable'` |
| Draggable | `'animejs/draggable'` |
| Scope | `'animejs/scope'` |
| Engine | `'animejs/engine'` |
| Events | `'animejs/events'` |
| Easings | `'animejs/easings'` |
| Utils | `'animejs/utils'` |
| SVG | `'animejs/svg'` |
| Text | `'animejs/text'` |
| WAAPI | `'animejs/waapi'` |

### Native ES Modules (No Bundler)

Using `importmap` in HTML, you can load modules natively without a build step:

```html
<script type="importmap">
{
  "imports": {
    "animejs": "/node_modules/animejs/dist/modules/index.js",
    "animejs/animation": "/node_modules/animejs/dist/modules/animation/index.js",
    "animejs/timer": "/node_modules/animejs/dist/modules/timer/index.js",
    "animejs/timeline": "/node_modules/animejs/dist/modules/timeline/index.js",
    "animejs/animatable": "/node_modules/animejs/dist/modules/animatable/index.js",
    "animejs/draggable": "/node_modules/animejs/dist/modules/draggable/index.js",
    "animejs/scope": "/node_modules/animejs/dist/modules/scope/index.js",
    "animejs/engine": "/node_modules/animejs/dist/modules/engine/index.js",
    "animejs/events": "/node_modules/animejs/dist/modules/events/index.js",
    "animejs/easings": "/node_modules/animejs/dist/modules/easings/index.js",
    "animejs/utils": "/node_modules/animejs/dist/modules/utils/index.js",
    "animejs/svg": "/node_modules/animejs/dist/modules/svg/index.js",
    "animejs/text": "/node_modules/animejs/dist/modules/text/index.js",
    "animejs/waapi": "/node_modules/animejs/dist/modules/waapi/index.js"
  }
}
</script>

<script type="module">
  import { animate } from 'animejs/animation';
  import { splitText } from 'animejs/text';
  import { stagger, random } from 'animejs/utils';

  const split = splitText('p');

  animate(split.words, {
    opacity: () => random(0, 1, 2),
    delay: stagger(50),
  });
</script>
```

This approach ensures only the code required for the specified functionality is loaded.

---

## Using with Vanilla JS

Anime.js integrates seamlessly into vanilla JavaScript projects.

### Example

```javascript
import { animate, utils, createDraggable, spring } from 'animejs';

const [ $logo ] = utils.$('.logo.js');
const [ $button ] = utils.$('button');
let rotations = 0;

// Created a bounce animation loop
animate('.logo.js', {
  scale: [
    { to: 1.25, ease: 'inOut(3)', duration: 200 },
    { to: 1, ease: spring({ bounce: .7 }) }
  ],
  loop: true,
  loopDelay: 250,
});

// Make the logo draggable around its center
createDraggable('.logo.js', {
  container: [0, 0, 0, 0],
  releaseEase: spring({ bounce: .7 })
});

// Animate logo rotation on click
const rotateLogo = () => {
  rotations++;
  $button.innerText = `rotations: ${rotations}`;
  animate($logo, {
    rotate: rotations * 360,
    ease: 'out(4)',
    duration: 1500,
  });
}

$button.addEventListener('click', rotateLogo);
```

---

## Using with React

Anime.js can be used with React by combining React's `useEffect()` and Anime.js `createScope()` methods.

### Implementation Pattern

```javascript
import { animate, createScope, spring, createDraggable } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const root = useRef(null);
  const scope = useRef(null);
  const [ rotations, setRotations ] = useState(0);

  useEffect(() => {

    scope.current = createScope({ root }).add( self => {

      // Every anime.js instance declared here is now scoped to <div ref={root}>

      // Created a bounce animation loop
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      // Make the logo draggable around its center
      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: .7 })
      });

      // Register function methods to be used outside the useEffect
      self.add('rotateLogo', (i) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });

    });

    // Properly cleanup all anime.js instances declared inside the scope
    return () => scope.current.revert()

  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const newRotations = prev + 1;
      // Animate logo rotation on click using the method declared inside the scope
      scope.current.methods.rotateLogo(newRotations);
      return newRotations;
    });
  };

  return (
    <div ref={root}>
      <div className="large centered row">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="medium row">
        <fieldset className="controls">
        <button onClick={handleClick}>rotations: {rotations}</button>
        </fieldset>
      </div>
    </div>
  )
}

export default App;
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Scope Management** | `createScope()` creates an isolated animation context tied to a specific DOM element |
| **Root Reference** | Use React refs for DOM element references |
| **Method Registration** | `self.add()` registers custom methods callable outside the scope via `scope.current.methods` |
| **Cleanup** | Call `scope.current.revert()` in the useEffect cleanup function |

Properly cleanup all anime.js instances declared inside the scope by returning the revert function from `useEffect()`.
