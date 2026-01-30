# Engine

Drives and synchronises all Animation, Timer, and Timeline instances.

```javascript
import { engine } from 'animejs';
```

---

## Engine Parameters

### timeUnit

Configures the unit of time to use for time-related values like `duration` and `delay`. The currently defined default duration is automatically adjusted to the newly specified time unit.

| Property | Value |
|----------|-------|
| **Accepts** | `'s'` to use seconds<br>`'ms'` to use milliseconds |
| **Default** | `'ms'` |

```javascript
import { engine, animate, createTimer, utils } from 'animejs';

const [ $timeS ] = utils.$('.time-s');
const [ $timeMs ] = utils.$('.time-ms');
const [ $ms, $s ] = utils.$('.toggle');

const secondsTimer = createTimer({
  duration: 1,
  loop: true,
  onUpdate: self => $timeS.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const millisecondsTimer = createTimer({
  duration: 1000,
  loop: true,
  onUpdate: self => $timeMs.innerHTML = utils.roundPad(self.iterationCurrentTime, 2)
});

const toggleSetting = () => {
  const isUsingSeconds = engine.timeUnit === 's';
  engine.timeUnit = isUsingSeconds ? 'ms' : 's';
  $ms.disabled = isUsingSeconds;
  $s.disabled = !isUsingSeconds;
}

$ms.addEventListener('click', toggleSetting);
$s.addEventListener('click', toggleSetting);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1</span>
      <span class="time-s value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">duration: 1000</span>
      <span class="time-ms value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle" disabled>milliseconds</button>
    <button class="button toggle">seconds</button>
  </fieldset>
</div>
```

### speed

Controls the global playback rate of all animations managed by the engine. Values greater than `1` speed up animations, while values between `0` and `1` slow them down.

| Property | Value |
|----------|-------|
| **Accepts** | A `Number` greater than or equal to `0` |
| **Default** | `1` |

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });
}

function onInput() {
  utils.sync(() => engine.speed = this.value);
}

$range.addEventListener('input', onInput);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0.1 max=2 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

### fps

Controls the global frame rate at which animations are updated and rendered. Adjusting the frame rate can help optimize performance on lower-end devices or when running many complex animations simultaneously. However, it may affect the perceived smoothness of animations.

| Property | Value |
|----------|-------|
| **Accepts** | A `Number` greater than `0` |
| **Default** | `120` |

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });
}

function onInput() {
  engine.fps = this.value;
}

$range.addEventListener('input', onInput);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=240 value=60 step=1 class="range" />
  </fieldset>
</div>
```

### precision

Defines how many decimal places to round string values to during an animation. The more decimals you add, the more precise the animations will be. Setting `0` will essentially remove all decimals during an animation. Only string values of CSS properties, SVG and DOM Attributes are rounded (e.g., `'120.725px'`, `'1.523'` ) and the rounding is only applied during the animation, the first and last frames of the animation use the full value.

| Property | Value |
|----------|-------|
| **Accepts** | A `Number` greater than or equal to `0` to define the number of decimal places<br>A `Number` lower than `0` to skip the rounding process |
| **Default** | `4` |

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });
}

function onInput() {
  engine.precision = this.value;
}

$range.addEventListener('input', onInput);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=4 step=1 class="range" />
  </fieldset>
</div>
```

### pauseOnDocumentHidden

Controls whether the engine pauses animations when the browser tab is hidden. When `true`, animations pause automatically when the tab loses focus. When `false`, animations will adjust their `currentTime` to catch up how long they have been idle in the background, making it looks like they never paused.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `true` |

```javascript
import { engine, utils, createTimer } from 'animejs';

const [ $globalTime ] = utils.$('.global-time');
const [ $engineTime ] = utils.$('.engine-time');
const [ $toggle ] = utils.$('.toggle');

const startTime = Date.now();

const globalTimer = setInterval(() => {
  $globalTime.innerHTML = Date.now() - startTime;
}, 16);

const engineTimer = createTimer({
  onUpdate: self => $engineTime.innerHTML = self.currentTime
});

const toggleSetting = () => {
  const isPauseWhenHidden = engine.pauseOnDocumentHidden;
  if (isPauseWhenHidden) {
    engine.pauseOnDocumentHidden = false;
    $toggle.innerHTML = '○ Disabled (Switch tab to see the effect)';
  } else {
    engine.pauseOnDocumentHidden = true;
    $toggle.innerHTML = '● Enabled (Switch tab to see the effect)';
  }
}

$toggle.addEventListener('click', toggleSetting);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">global time</span>
      <span class="global-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">engine time</span>
      <span class="engine-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button toggle">● Enabled (Switch tab to see the effect)</button>
  </fieldset>
</div>
```

---

## Engine Methods

### update()

Manually ticks the engine when `engine.useDefaultMainLoop` is set to false. This proves useful when integrating Anime.js into projects with existing animation loops, such as Three.js or game engines.

**Returns:** Engine

```javascript
import { engine, createTimeline, utils } from 'animejs';

// Prevents Anime.js from using its own loop
engine.useDefaultMainLoop = false;

const [ $container ] = utils.$('.container');
const color = utils.get($container, 'color');
const { width, height } = $container.getBoundingClientRect();

// Three.js setup, note that the global THREE object is defined globally
const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 20);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color, wireframe: true });

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);
camera.position.z = 5;

function createAnimatedCube() {
  const cube = new THREE.Mesh(geometry, material);
  const x = utils.random(-10, 10, 2);
  const y = utils.random(-5, 5, 2);
  const z = [-10, 7];
  const r = () => utils.random(-Math.PI * 2, Math.PI * 2, 3);
  const duration = 4000;
  createTimeline({
    delay: utils.random(0, duration),
    defaults: { loop: true, duration, ease: 'inSine', },
  })
  .add(cube.position, { x, y, z }, 0)
  .add(cube.rotation, { x: r, y: r, z: r }, 0)
  .init();
  scene.add(cube);
}

for (let i = 0; i < 40; i++) {
  createAnimatedCube();
}

function render() {
  engine.update(); // Manually update Anime.js engine
  renderer.render(scene, camera); // Render Three.js scene
}

// Calls the builtin Three.js animation loop
renderer.setAnimationLoop(render);
```

```html
<div class="container large grid square-grid"></div>
```

### pause()

Pauses the engine's main loop, pausing all active Timer, Animation, and Timeline instances. Use engine.resume() to restart the animations from where they paused.

**Returns:** Engine

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $add, $pause ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
  });
}

let timeout = 3;
let interval;

function pauseEngine() {
  engine.pause();
  $pause.setAttribute('disabled', 'true');
  $pause.innerHTML = `Resume in ${timeout--} seconds`;
  interval = setInterval(() => {
    if (timeout <= 0) {
      clearInterval(interval);
      engine.resume();
      $pause.removeAttribute('disabled');
      $pause.innerHTML = 'Pause for 3 seconds';
      timeout = 3;
    } else {
      $pause.innerHTML = `Resume in ${timeout--} seconds`;
    }
  }, 1000);
}

$add.addEventListener('click', addAnimation);
$pause.addEventListener('click', pauseEngine);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add animation</button>
    <button>Pause for 3 seconds</button>
  </fieldset>
</div>
```

### resume()

Resumes the engine after being either paused with a call to `engine.pause()`.

**Returns:** Engine

```javascript
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $pause, $resume ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
    delay: utils.random(0, 1000)
  });
}

for (let i = 0; i < 150; i++) addAnimation();

const resumeEngine = () => engine.resume();
const pauseEngine = () => engine.pause();

$pause.addEventListener('click', pauseEngine);
$resume.addEventListener('click', resumeEngine);
```

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Pause</button>
    <button>Resume</button>
  </fieldset>
</div>
```

---

## Engine Properties

| Name | Description |
|------|-------------|
| timeUnit | Gets and sets the unit of time to use for time-related values like `duration` and `delay` (`'ms' \| 's'`) |
| currentTime | Gets the current time of the engine (`Number`) |
| deltaTime | Gets the time elapsed since the last frame (`Number`) |
| precision | Gets and sets how many decimal places to round string values to during an animation (`Number`) |
| speed | Gets or sets the global playback rate for all animations (`Number`) |
| fps | Gets or sets the global frame rate for all animations (`Number`) |
| useDefaultMainLoop | Gets or sets whether the engine uses its default main loop (`Boolean`) |
| pauseOnDocumentHidden | Gets or sets whether the engine pauses when the tab is hidden (`Boolean`) |

---

## Engine Defaults

Defines the global defaults properties used by all Timer, Animation and Timeline instances.

```javascript
import { engine } from 'animejs';

engine.defaults.duration = 500;
```

| Property | Accepts |
|----------|---------|
| playbackEase | Easing name `String` \| Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` \| `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` \| `Function` |
| delay | `Number` \| `Function` |
| composition | Composition types `String` \| `Function` |
| ease | Easing name `String` \| Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |
| onPause | Callback `Function` |
