# Timer

Schedules and controls timed callbacks that can be used as an alternative to `setTimeout()` or `setInterval()`, keeping animations and callbacks synchronized.

## Creating Timers

Timers are created using the `createTimer()` method imported from the main `'animejs'` module:

```javascript
import { createTimer } from 'animejs';
const timer = createTimer(parameters);
```

**Subpath Import:**

```javascript
import { createTimer } from 'animejs/timer';
```

### Parameters

| Name | Accepts |
|------|---------|
| parameters (opt) | An Object of Timer playback settings and Timer callbacks |

### Returns

`Timer`

### Example

```javascript
import { createTimer, utils } from 'animejs';

const [ $time, $count ] = utils.$('.value');

createTimer({
  duration: 1000,
  loop: true,
  frameRate: 30,
  onUpdate: self => $time.innerHTML = self.currentTime,
  onLoop: self => $count.innerHTML = self._currentIteration
});
```

---

# Playback Settings

## delay

Defines the time in milliseconds before the timer starts.

**Accepts:** A `Number` equal to or greater than `0`

**Default:** `0`

```javascript
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  delay: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

---

## duration

Defines the duration in milliseconds of the timer. Setting `0` to a duration completes the timer instantly upon play.

**Accepts:** A `Number` equal to or greater than `0`

Duration values higher than `1e12` are clamped internally to `1e12` (approximately 32 years).

**Default:** `Infinity`

```javascript
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

## loop

Defines how many times a timer repeats.

**Accepts:**

| Value | Effect |
|-------|--------|
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

**Default:** `0`

```javascript
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.loop = true;
```

---

## loopDelay

Defines the delay in milliseconds between loops.

**Accepts:** A `Number` equal to or greater than `0`

**Default:** `0`

```javascript
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  loopDelay: 750,
  duration: 250,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = utils.clamp(self.iterationCurrentTime, 0, 250)
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

---

## alternate

Defines if the direction of the timer alternates on each iteration when the `loop` is set to `true` or superior to `1`.

**Accepts:** `Boolean`

**Default:** `false`

```javascript
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  alternate: true,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

---

## reversed

Sets the initial direction of the timer. The timer `currentTime` always progresses from `0` to `duration`. Only the `iterationTime` property is actually reversed.

**Accepts:** `Boolean`

- If set to `true` the timer's first iteration runs in reverse
- If set to `false` the timer's first iteration runs normally

**Default:** `false`

```javascript
import { createTimer, utils } from 'animejs';

const [ $iterationTime ] = utils.$('.iteration-time');
const [ $currentTime ] = utils.$('.current-time');

createTimer({
  duration: 10000,
  reversed: true,
  onUpdate: self => {
    $iterationTime.innerHTML = self.iterationCurrentTime;
    $currentTime.innerHTML = self.currentTime;
  }
});
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="iteration-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="current-time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

---

## autoplay

Defines the play mode of a timer.

> **Note:** The autoplay parameter has no effect when the timer is added to a timeline, and will be overridden to `false`.

**Accepts:** `Boolean` | `onScroll()`

- If `true`: timer plays automatically
- If `false`: timer requires manual play initiation
- If set to `onScroll()`: timer starts when scroll threshold conditions are satisfied

**Default:** `true`

```javascript
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');
const [ $playButton ] = utils.$('.play');

const timer = createTimer({
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="play">Play</button>
  </fieldset>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

---

## frameRate

Determines the frames per second (fps) at which a timer runs. This value can be modified later with `timer.fps = 30`.

**Accepts:** A `Number` greater than `0`. The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.

**Default:** `120`

```javascript
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  frameRate: 60,
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  timer.fps = value;
}

$range.addEventListener('input', updateFps);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">fps</span>
      <span class="fps value">60</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

---

## playbackRate

Defines a speed multiplier to speed up or slow down a timer playback (`1.0` is normal speed). This value can be modified later with `timer.speed = .5`.

**Accepts:** A `Number` greater than or equal to `0`. If set to `0` the timer won't play.

**Default:** `1`

```javascript
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  playbackRate: 2,
  onUpdate: self => $time.innerHTML = utils.round(self.currentTime, 0),
});

const updateSpeed = () => {
  const speed = utils.roundPad(+$range.value, 1);
  $speed.innerHTML = speed;
  utils.sync(() => timer.speed = speed);
}

$range.addEventListener('input', updateSpeed);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">speed</span>
      <span class="speed value">2.0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=10 value=2 step=.1 class="range" />
  </fieldset>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.playbackRate = .75;
```

---

# Callbacks

## onBegin

Executes a function when a timer starts.

**Accepts:** A `Function` whose first argument is the timer itself

**Default:** `noop`

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  delay: 2000,
  duration: 2000,
  onBegin: self => $status.innerHTML = 'true'
});

const logTimer = createTimer({
  duration: 4000,
  onUpdate: self => $time.innerHTML = timer.currentTime
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">began</span>
      <span class="status value">false</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

---

## onComplete

Executes a function when all the iterations of a timer have finished playing.

**Accepts:** A `Function` whose first argument is the timer itself

**Default:** `noop`

```javascript
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onComplete: self => $status.innerHTML = 'true',
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">completed</span>
      <span class="status value">false</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

## onUpdate

Executes a function on every frames of a running timer at the specified frameRate.

**Accepts:** A `Function` whose first argument is the timer itself

**Default:** `noop`

```javascript
import { createTimer, utils } from 'animejs';

const [ $updates ] = utils.$('.updates');
const [ $time ] = utils.$('.time');

let updates = 0;

createTimer({
  onUpdate: self => {
    $updates.innerHTML = ++updates;
    $time.innerHTML = self.currentTime;
  }
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">updates</span>
      <span class="updates value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.onUpdate = self => console.log(self.id);
```

---

## onLoop

Executes a function every time a timer iteration completes.

**Accepts:** A `Function` whose first argument is the timer itself

**Default:** `noop`

```javascript
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  onLoop: self => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

---

## onPause

Executes a function when a running timer is paused.

**Accepts:** A `Function` whose first argument is the timer itself

**Default:** `noop`

```javascript
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton ] = utils.$('.button');
const [ $paused ] = utils.$('.paused');
const [ $time ] = utils.$('.time');

let paused = 0;

const timer = createTimer({
  onPause: () => $paused.innerHTML = ++paused,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();
const resumeTimer = () => timer.resume();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">paused</span>
      <span class="value paused">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">elapsed time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Resume</button>
    <button class="button">Pause</button>
  </fieldset>
</div>
```

**Global Default:**

```javascript
import { engine } from 'animejs';
engine.defaults.onPause = self => console.log(self.id);
```

---

## then()

Returns a `Promise` that resolves and execute a callback when the timer completes.

### Parameters

| Name | Type |
|------|------|
| callback | A `Function` whose first argument is the timer itself |

### Returns

`Promise`

```javascript
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime,
})
.then(() => $status.innerHTML = 'fulfilled');
```

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">promise status</span>
      <span class="status value">pending</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

### Usage Patterns

**Inline:**

```javascript
createTimer({duration: 500}).then(callback);
```

**Async/await:**

```javascript
async function waitForTimerToComplete() {
  return createTimer({ duration: 250 })
}

const asyncTimer = await waitForTimerToComplete();
```

---

# Methods

## play()

Forces the timer to play forward.

**Returns:** The timer itself. Can be chained with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

## reverse()

Forces the timer to play backward.

**Returns:** The timer itself. Can be chained with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const reverseTimer = () => timer.reverse();

$reverseButton.addEventListener('click', reverseTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

## pause()

Pauses a running timer.

**Returns:** The timer itself, allowing chaining with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();

$pauseButton.addEventListener('click', pauseTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

## restart()

Resets all properties and set the `currentTime` of a timer to `0`.

If `autoplay` is enabled, the timer automatically plays after resetting.

**Returns:** The timer itself—can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const restartTimer = () => timer.restart();

$restartButton.addEventListener('click', restartTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

## alternate()

Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

Only the `iterationTime` is actually played in reverse since the `currentTime` always starts at `0` and ends at `duration`.

**Returns:** The timer itself. Can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $alternateButton ] = utils.$('.button');
const [ $iterationTime ] = utils.$('.iteration-time');

const timer = createTimer({
  duration: 10000,
  loop: true,
  onUpdate: self => {
    $iterationTime.innerHTML = self.iterationCurrentTime;
  }
});

const alternateTimer = () => timer.alternate();

$alternateButton.addEventListener('click', alternateTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="iteration-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

## resume()

Resumes the playback of a paused timer in its current direction.

**Returns:** The timer itself. Can be chained with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton, $alternateButton ] = utils.$('.button');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
  loop: true,
});

const resumeTimer = () => timer.resume();
const pauseTimer = () => timer.pause();
const alternateTimer = () => timer.alternate();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
$alternateButton.addEventListener('click', alternateTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Resume</button>
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

## complete()

Completes a timer instantly.

**Returns:** The timer itself. Can be chained with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 100000,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const completeTimer = () => timer.complete();

$completeButton.addEventListener('click', completeTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

## reset()

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| softReset=false (opt) | Boolean | If `true`, only reset the internal values without causing a visual render |

**Returns:** The timer itself. Can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');
const [ $reset ] = utils.$('.button');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const resetTimer = () => {
  timer.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Reset</button>
  </fieldset>
</div>
```

---

## cancel()

Pauses the timer, removes it from the engine's main loop, and frees up memory.

**Returns:** The timer itself; can be chained with other timer methods.

*Since 4.0.0*

```javascript
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $cancelButton ] = utils.$('.cancel');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const playTimer = () => timer.play();
const cancelTimer = () => timer.cancel();

$playButton.addEventListener('click', playTimer);
$cancelButton.addEventListener('click', cancelTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button play">Play</button>
    <button class="button cancel">Cancel</button>
  </fieldset>
</div>
```

---

## revert()

Cancels the timer, and reverts the linked `onScroll()` instance if necessary.

Use this method to completely stop and destroy a timer along with its attached ScrollObserver.

**Returns:** The timer itself, which can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const revertTimer = () => {
  timer.revert();
  $time.innerHTML = timer.currentTime
}

$revertButton.addEventListener('click', revertTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

---

## seek()

Updates the `currentTime` of the timer and advances it to a specific time.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| time | Number | The new `currentTime` in ms of the timer |
| muteCallbacks=false (opt) | Boolean | If `true`, prevent the callbacks from being fired |

**Returns:** The timer itself. Can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');
const [ $time ] = utils.$('.time');

const updateButtonLabel = timer => {
  $playPauseButton.textContent = timer.paused ? 'Play' : 'Pause';
}

const timer = createTimer({
  duration: 2000,
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    $time.innerHTML = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
});

const seekTimer = () => timer.seek(+$range.value);

const playPauseTimer = () => {
  if (timer.paused) {
    timer.play();
  } else {
    timer.pause();
    updateButtonLabel(timer);
  }
}

$range.addEventListener('input', seekTimer);
$playPauseButton.addEventListener('click', playPauseTimer);
```

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

---

## stretch()

Changes the total duration of a timer to fit a specific time. The total duration is equal to the duration of an iteration multiplied with the total number of iterations.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| duration | `Number` | The new total duration in ms of the timer |

**Returns:** The timer itself. Can be chained with other timer methods.

```javascript
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $duration ] = utils.$('.duration');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const stretchTimer = () => {
  timer.stretch(+$range.value);
  $duration.innerHTML = timer.duration;
  timer.restart();
}

$range.addEventListener('input', stretchTimer);
```

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration</span>
      <span class="duration value">2000</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>

<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=4000 value=2000 step=100 class="range" />
  </fieldset>
</div>
```

---

# Properties

The following properties are available on Timer instances returned by `createTimer()`:

| Property | Type | Description |
|----------|------|-------------|
| **id** | String \| Number | Gets and sets the ID of the timer |
| **deltaTime** | Number | Gets the time in ms elapsed between the current and previous frame |
| **currentTime** | Number | Gets and sets the global current time in ms of the timer |
| **iterationCurrentTime** | Number | Gets and sets the current iteration time in ms |
| **progress** | Number | Gets and sets the overall progress of the timer from `0` to `1` |
| **iterationProgress** | Number | Gets and sets the progress of the current iteration from `0` to `1` |
| **currentIteration** | Number | Gets and sets the current iteration count |
| **speed** | Number | Gets and sets the playbackRate multiplier of the timer |
| **fps** | Number | Gets and sets the frameRate of the timer |
| **paused** | Boolean | Gets and sets whether the timer is paused |
| **began** | Boolean | Gets and sets whether the timer has started |
| **completed** | Boolean | Gets and sets whether the timer has completed |
| **reversed** | Boolean | Gets and sets whether the timer is reversed |
| **backwards** | Boolean | Gets whether the timer is currently playing backwards |
