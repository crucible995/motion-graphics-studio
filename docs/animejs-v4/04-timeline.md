# Timeline

Synchronises animations, timers, and callbacks together.

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline({ defaults: { duration: 750 } });

tl.label('start')
  .add('.square', { x: '15rem' }, 500)
  .add('.circle', { x: '15rem' }, 'start')
  .add('.triangle', { x: '15rem', rotate: '1turn' }, '<-=500');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

| Name | Accepts |
|------|---------|
| parameters (opt) | An `Object` of Timeline playback settings and Timeline callbacks |

**Returns:** `Timeline` - A `Timeline` instance exposes methods used to add animations, timers, callbacks and labels to it.

---

## Add Timers

Timers can be added to a timeline using the `add()` method or the `sync()` method.

### Timer Creation

The `add()` method creates and adds a timer directly to the timeline:

```javascript
timeline.add(parameters, position);
```

| Name | Accepts |
|------|---------|
| parameters | An `Object` of Timer playback settings and Timer callbacks |
| position (opt) | Time position |

### Timer Synchronisation

The `sync()` method synchronises an existing timer with the timeline:

```javascript
timeline.sync(timer, position);
```

| Name | Accepts |
|------|---------|
| timer | Timer |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, createTimer, utils } from 'animejs';

const [ $timer01, $timer02, $timer03 ] = utils.$('.timer');

const timer1 = createTimer({
  duration: 1500,
  onUpdate: self => $timer01.innerHTML = self.currentTime,
});

const tl = createTimeline()
.sync(timer1)
.add({
  duration: 500,
  onUpdate: self => $timer02.innerHTML = self.currentTime,
})
.add({
  onUpdate: self => $timer03.innerHTML = self.currentTime,
  duration: 1000
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 01</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 02</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 03</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
</div>
```

---

## Add Animations

Animations can be added to a timeline using the `add()` method or the `sync()` method.

### Animation Creation

The `add()` method creates and adds an animation directly to the timeline:

```javascript
timeline.add(targets, parameters, position);
```

| Name | Accepts |
|------|---------|
| targets | Targets |
| parameters | Object of Animatable properties, Tween parameters, Playback settings, Animation callbacks |
| position (opt) | Time position |

### Animation Synchronisation

The `sync()` method synchronises an existing animation with the timeline:

```javascript
const animation = animate(target, { x: 100 });
timeline.sync(animation, position);
```

| Name | Accepts |
|------|---------|
| animation | Animation |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tl = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
  alternate: true,
  loop: 2,
})
.add('.square', {
  x: '15rem',
});
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## Sync WAAPI Animations

WAAPI animations can be synchronised to a timeline using the `sync()` method.

*Since 4.0.0*

```javascript
timeline.sync(animation, position);
```

| Name | Accepts |
|------|---------|
| synced | Animation \| Timer \| Timeline |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, waapi } from 'animejs';

const circle = waapi.animate('.circle', {
  x: '15rem',
});

const triangle = waapi.animate('.triangle', {
  x: '15rem',
  y: [0, '-1.5rem', 0],
  ease: 'out(4)',
  duration: 750,
});

const square = waapi.animate('.square', {
  x: '15rem',
  rotateZ: 360,
});

const tl = createTimeline()
.sync(circle, 0)
.sync(triangle, 350)
.sync(square, 250);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## Sync Timelines

Timelines can be synchronised to an other timeline using the `sync()` method.

```javascript
timelineA.sync(timelineB, position);
```

| Name | Accepts |
|------|---------|
| synced | Animation \| Timer \| Timeline |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## Call Functions

Functions are incorporated into a timeline using the `call()` method, enabling execution of custom callbacks at specific timeline positions.

```javascript
timeline.call(callback, position);
```

| Name | Accepts |
|------|---------|
| callback | `Function` |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

---

## Time Position

Specifies the time at which a timeline child is inserted into a timeline. If no position is defined, the child will be positioned at the end of the timeline.

| Type | Example | Description |
|------|---------|-------------|
| Absolute | `100` | Position the element at exactly 100ms in the timeline |
| Addition | `'+=100'` | Position the element 100ms after the last element |
| Subtraction | `'-=100'` | Position the element 100ms before the last element end |
| Multiplier | `'*=.5'` | Position the element at half of the total element duration |
| Previous end position | `'<'` | Position the element at the end position of the previous element |
| Previous start position | `'<<'` | Position the element at the start position of the previous element |
| Combined | `'<<+=250'` | Position the element 250ms after the beginning position of the previous element |
| Label | `'My Label'` | Position the element at the `'My Label'` element |
| Stagger | `stagger(10)` | Stagger the elements position by `10` |

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('start', 0)
.add('.square', {
  x: '15rem',
  duration: 500,
}, 500)
.add('.circle', {
  x: '15rem',
  duration: 500,
}, 'start')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, '<-=250');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

## Timeline Playback Settings

Specify the timings and behaviours of a timeline. Timeline playback settings are defined directly in the `createTimeline()` parameters `Object`.

```javascript
createTimeline({
  defaults: {
    ease: 'out(3)',
    duration: 500,
  },
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

### defaults

Defines defaults parameters for the timeline children.

| Property | Value |
|----------|-------|
| **Accepts** | An `Object` of Tween parameters (except `from` and `to`), Playback settings and Callbacks |

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    ease: 'inOutExpo',
    duration: 500,
    loop: 2,
    reversed: true,
    alternate: true,
  }
})
.add('.square', { x: '15rem' })
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' });
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

### Other Playback Settings

Timeline shares the following playback settings with Timer (see Timer documentation for details):

- `delay`
- `loop`
- `loopDelay`
- `alternate`
- `reversed`
- `autoplay`
- `frameRate`
- `playbackRate`
- `playbackEase`

---

## Timeline Callbacks

Execute functions at specific points during a timeline playback. Timeline callbacks functions are defined directly in the `createTimeline()` parameters `Object`.

Timeline shares the following callbacks with Timer and Animation:

- `onBegin`
- `onComplete`
- `onBeforeUpdate`
- `onUpdate`
- `onRender`
- `onLoop`
- `onPause`
- `then()`

See Timer and Animation documentation for callback details.

---

## Timeline Methods

Methods available on the `Timeline` instance returned by a `createTimeline()` function, providing control over the timing, behaviour, and progression of a timeline.

### add()

Creates and adds animations and timers to a timeline. The type of element added to the timeline depends of the parameters passed to `add()`.

**Add Animation:**

```javascript
timeline.add(targets, parameters, position);
```

| Name | Accepts |
|------|---------|
| targets | Targets |
| parameters | Animatable properties & Tween parameters & Animation playback settings & Animation callbacks |
| position (opt) | Time position |

**Add Timer:**

```javascript
timeline.add(timerParameters, position);
```

| Name | Accepts |
|------|---------|
| timerParameters | Timer playback settings & Timer callbacks |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline()
// Add labels
.label('start timer 1', 0)
.label('animate circle', 1000)
.label('start timer 2', 2000)
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 1')
// Add Animation
.add('.circle', {
  duration: 2000,
  x: '16rem',
}, 'animate circle')
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 2');
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">value</span>
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

### set()

Instantly sets targets property values at a specific time of the timeline.

| Name | Accepts |
|------|---------|
| targets | Targets |
| parameters | Animatable properties |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.set('.circle', { x: '15rem' })
.set('.triangle', { x: '15rem' }, 500)
.set('.square', { x: '15rem' }, 1000);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

### sync()

Synchronises a JS animation, WAAPI Animation, timer, timeline or even a native WAAPI Animation to a timeline.

| Name | Accepts |
|------|---------|
| synced | JSAnimation \| Timer \| Timeline \| Anime.js WAAPIAnimation \| WAAPIAnimation |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

**Note:** Tween value composition is handled when the timeline is created, and won't affect the timeline's existing children when added.

```javascript
import { createTimeline, animate, waapi } from 'animejs';

const circleAnimation = waapi.animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

### label()

Associate specific time positions with label names for easy reference within the timeline. Once added to a timeline, a label can be used as a Time position.

```javascript
timeline.label(labelName, position);
```

| Name | Accepts |
|------|---------|
| labelName | `String` |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('circle', 0)
.label('square', 500)
.label('triangle', 1000)
.add('.square', {
  x: '17rem',
  duration: 500,
}, 'square')
.add('.circle', {
  x: '13rem',
  duration: 1000,
}, 'circle')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, 'triangle');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

### remove()

Removes animations, timers, timelines, targets or specific tween properties from the timeline.

The timeline will pauses automatically if all targets, animations, timers and timelines are removed.

**Remove animations, timers, or timelines:**

```javascript
timeline.remove([animation, timer, timeline]);
```

| Name | Accepts |
|------|---------|
| object | Animation \| Timer \| Timeline |
| position (opt) | Time position |

**Remove targets:**

```javascript
timeline.remove(targets);
```

| Name | Accepts |
|------|---------|
| targets | Targets |

**Remove specific target properties:**

```javascript
timeline.remove(targets, propertyName);
```

| Name | Accepts |
|------|---------|
| targets | Targets |
| propertyName | A valid Animatable properties `String` |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { animate, createTimeline, utils } from 'animejs';

const [ $removeA, $removeB, $removeC ] = utils.$('.button');

const animation = animate('.circle', { x: '15rem', scale: [1, .5, 1] });

const tl = createTimeline({ loop: true, alternate: true })
  .sync(animation)
  .add('.triangle', { x: '15rem', rotate: 360 }, 100)
  .add('.square', { x: '15rem' }, 200);

const removeAnimation = () => tl.remove(animation);
const removeTarget = () => tl.remove('.square');
const removeRotate = () => tl.remove('.triangle', 'rotate');

$removeA.addEventListener('click', removeAnimation);
$removeB.addEventListener('click', removeTarget);
$removeC.addEventListener('click', removeRotate);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove anim</button>
    <button class="button">Remove target</button>
    <button class="button">remove tween</button>
  </fieldset>
</div>
```

---

### init()

Initialises the initial values of all the elements of a timeline. Animations with specific initial values added to a timeline are not automatically set to their _from_ state like a normal call to `animate()` would, instead, they are initialised when the timeline playhead reaches the element in the timeline. This is where `.init()` comes in handy, it forces a render of all the children initial state and updates their values.

**Returns:** The timeline itself. Can be chained with other timeline methods.

*Since 4.0.0*

```javascript
import { createTimeline } from 'animejs';

const tl = createTimeline()
.add('.square',   { x: { from: '15rem' } })
.add('.triangle', { x: { from: '15rem' } }, 500)
.add('.circle',   { x: { from: '15rem' } }, 1000)
.init();
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

### call()

Calls the passed function callback at the specified time position.

| Name | Accepts |
|------|---------|
| callback | `Function` |
| position (opt) | Time position |

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, utils } from 'animejs';

const [ $functionA ] = utils.$('.function-A');
const [ $functionB ] = utils.$('.function-B');
const [ $functionC ] = utils.$('.function-C');

const tl = createTimeline()
.call(() => $functionA.innerHTML = 'A', 0)
.call(() => $functionB.innerHTML = 'B', 800)
.call(() => $functionC.innerHTML = 'C', 1200);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">function A</span>
      <span class="function-A value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function B</span>
      <span class="function-B value lcd">--</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">function C</span>
      <span class="function-C value lcd">--</span>
    </pre>
  </div>
</div>
```

---

### refresh()

Re-computes the timeline children animated values defined with a Function based value by updating their from values to their current target values, and their to values to their newly computed values. Only the animatable properties values are re-calculated, duration and delay cannot be refreshed.

**Returns:** The timeline itself. Can be chained with other timeline methods.

```javascript
import { createTimeline, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const tl = createTimeline({
  loop: true,
  onLoop: self => self.refresh()
})
.add('.circle',   { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.triangle', { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.square',   { x: () => utils.random(0, 15) + 'rem' }, 0);

const refreshTimeline = () => tl.refresh().restart();

$refreshButton.addEventListener('click', refreshTimeline);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

---

### Shared Methods

Timeline shares the following methods with Timer (see Timer documentation for details):

- `play()`
- `reset()`
- `reverse()`
- `pause()`
- `restart()`
- `alternate()`
- `resume()`
- `complete()`
- `cancel()`
- `revert()`
- `seek()`
- `stretch()`

---

## Timeline Properties

Properties available on the `Timeline` instance returned by a `createTimeline()` function.

| Name | Description |
|------|-------------|
| id | Gets and sets the ID of the timeline (`String` \| `Number`) |
| labels | Gets and sets the map of time position labels of the timeline (`Object`) |
| currentTime | Gets and sets the global current time in ms of the timeline (`Number`) |
| iterationCurrentTime | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the timeline from `0` to `1` (`Number`) |
| iterationProgress | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the timeline (`Number`) |
| speed | Gets and sets the speed multiplier of the timeline (`Number`) |
| fps | Gets and sets the fps of the timeline (`Number`) |
| paused | Gets and sets whether the timeline is paused (`Boolean`) |
| began | Gets and sets whether the timeline has started (`Boolean`) |
| completed | Gets and sets whether the timeline has completed (`Boolean`) |
| reversed | Gets and sets whether the timeline is reversed (`Boolean`) |
| backwards | Gets whether the timeline is currently playing backwards (`Boolean`) |

```javascript
const timeline = createTimeline(parameters);
timeline.labels
timeline.currentTime
timeline.duration
```
