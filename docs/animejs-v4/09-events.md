# Events

A collection of event listener utility methods to trigger and control animations.

## onScroll

Triggers and synchronises Timer, Animation and Timeline instances on scroll.

```javascript
import { animate, createTimer, createTimeline , utils, onScroll } from 'animejs';

const [ container ] = utils.$('.scroll-container');
const debug = true;

// Animation

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  autoplay: onScroll({ container, debug })
});

// Timer

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer.parentNode,
    container,
    debug
  })
});

// Timeline

const circles = utils.$('.circle');

createTimeline({
  alternate: true,
  loop: true,
  autoplay: onScroll({
    target: circles[0],
    container,
    debug
  })
})
.add(circles[2], { x: '9rem' })
.add(circles[1], { x: '9rem' })
.add(circles[0], { x: '9rem' });
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </div>
</div>
```

| Name | Accepts |
|------|---------|
| parameters | An `Object` of ScrollObserver settings, ScrollObserver thresholds, ScrollObserver sync modes and ScrollObserver callbacks |

**Returns:** `ScrollObserver`

---

## ScrollObserver Settings

### container

Specifies the container `HTMLElement` to which the scroll event is applied.

| Property | Value |
|----------|-------|
| **Accepts** | CSS Selector<br>DOM Element |
| **Default** | `null` |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container'
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

### target

Specifies which `HTMLElement` triggers the scroll event.

| Property | Value |
|----------|-------|
| **Accepts** | CSS Selector<br>DOM Element |
| **Default** | If defined on an animation, the first targeted `HTMLElement` of the animation.<br>`null` if defined outside of an animation |

```javascript
import { createTimer, utils, onScroll } from 'animejs';

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer,
    container: '.scroll-container',
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
  </div>
</div>
```

### debug

Displays markers to better visualise the `enter` and `leave` thresholds values. Each ScrollObserver instances has a dedicated color. The left side of the ruler represents the container threshold, and the right side the target threshold values.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `false` |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    debug: true,
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

### axis

Specifies the scroll direction of the ScrollObserver container `HTMLElement`.

| Property | Value |
|----------|-------|
| **Accepts** | `'x'`<br>`'y'` |
| **Default** | `'y'` |

```javascript
import { animate, utils, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    axis: 'x',
  })
});
```

```html
<div class="scroll-container scroll-x">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll right →</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

### repeat

Specifies if the scroll synchronisation should repeat after the linked object completes. If the repeat property is set to `false`, the scrollContainer instance will be reverted.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `true` |

```javascript
import { createTimer, onScroll, utils } from 'animejs';

const [ $repeat ] = utils.$('.repeat .value');
const [ $noRepeat ] = utils.$('.no-repeat .value');

let repeatUpdates = 0;
let noRepeatUpdates = 0;

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $repeat.innerHTML = repeatUpdates++,
    repeat: true,
    debug: true,
  })
});

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.no-repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $noRepeat.innerHTML = noRepeatUpdates++,
    repeat: false,
    debug: true,
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="repeat large log row">
          <span class="label">repeat upddates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="no-repeat large log row">
          <span class="label">no repeat updates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

---

## ScrollObserver Thresholds

Determines the points at which actions are triggered based on the scrolling position of a target element within a container.

### Numeric values

Defines an offset from the top of the target and container by passing a numeric values. If no unit is defined, the values is interpreted as pixels.

| Type | Example | Description |
|------|---------|-------------|
| Number | `100` | 100px from the top of the target or container |
| Unit | `'1rem'` | 1rem from the top of the target or container |
| Percentage | `'10%'` | 10% of the target or container height, from the top of the target or container |

**Default Unit:** `px`

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: '80% 20%',
    leave: '50 -25',
    debug: true
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section"></div>
  </div>
</div>
```

### Positions shorthands

Defines the position of the target and container by passing the position name.

| Value | Returns |
|-------|---------|
| `'top'` | The top y value |
| `'bottom'` | The bottom y value |
| `'left'` | The left x value |
| `'right'` | The right x value |
| `'center'` | The center x or y value |
| `'start'` | Equivalent to `'top'` and `'left'` depending of the axis |
| `'end'` | Equivalent to `'bottom'` and `'right'` depending of the axis |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'center top',
    leave: 'center bottom',
    debug: true
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

### Relative position values

Defines position values relative to the target and container top coordinate using a Relative value syntax.

| Prefix | Effect | Example |
|--------|--------|---------|
| `'+='` | Add | `'+=45'` |
| `'-='` | Subtracts | `'-=50%'` |
| `'*='` | Multiply | `'*=.5'` |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'center+=1em top-=100%',
    leave: 'center-=1em bottom+=100%',
    debug: true
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

### Min max

Defines a threshold in the minimum or maximum scrollable space available. This is particularly useful in cases where some of the targeted elements initial position are either too small or too big to triggers `enter` and `leave` conditions.

| Value | Description |
|-------|-------------|
| `'min'` | The minimum value possible to meet the enter or leave condition |
| `'max'` | The maximum value possible to meet the enter or leave condition |

```javascript
import { animate, onScroll, utils } from 'animejs';

utils.$('.square').forEach($square => {
  animate($square, {
    x: '15rem',
    rotate: '1turn',
    duration: 2000,
    alternate: true,
    ease: 'inOutQuad',
    autoplay: onScroll({
      container: '.scroll-container',
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      debug: true
    })
  });
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

---

## ScrollObserver Synchronisation Modes

Determines the behaviour of the animation and how it is synchronised relative to the scroll progress or by meeting certain thresholds.

### Method names

Defines a list of method names of the linked `Object` to be called when specific callbacks are triggered.

| Property | Value |
|----------|-------|
| **Accepts** | A `String` containing a list of Animation methods, Timer methods or Timeline methods names separated by an empty space |

**Callbacks definition order:**
- `'enter'` – Triggers a method when the enter threshold is crossed or element re-enters the viewport.
- `'enter leave'` – Triggers methods for both enter and leave threshold crossings.
- `'enterForward leaveForward enterBackward leaveBackward'` – Triggers methods for directional threshold crossings (forward and backward scrolling).

**Default:** `'play pause'`

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'resume pause reverse reset',
    debug: true
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section"></div>
  </div>
</div>
```

### Playback progress

Perfectly synchronises the playback progress of the linked object to the scroll position by passing a value of either `true` or `1`.

| Property | Value |
|----------|-------|
| **Accepts** | `1`<br>`true` |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: true,
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

### Smooth scroll

Smoothly animate the playback progress of the linked object to the scroll position by passing a value between `0` and `1`. The closer the value gets to `0`, the longer the animation takes to catch up with the current scroll position.

| Property | Value |
|----------|-------|
| **Accepts** | A `Number` greater than or equal to `0` and lower to or equal `1` |

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .25,
    debug: true,
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

### Eased scroll

Applies an easing function to the synchronised playback progress of the linked object relative to the scroll position.

| Property | Value |
|----------|-------|
| **Accepts** | `ease` |

```javascript
import { animate, stagger, onScroll } from 'animejs';

animate('.square', {
  x: '12rem',
  rotate: '1turn',
  ease: 'linear',
  delay: stagger(100, { from: 'last' }),
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'inOutCirc',
    debug: true,
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## ScrollObserver Callbacks

Triggers functions at specific points during scroll. `ScrollObserver` callbacks functions are defined directly in the `onScroll()` parameters object.

Available callbacks:
- `onEnter` - Triggered when the element enters the viewport
- `onEnterForward` - Triggered when entering while scrolling forward
- `onEnterBackward` - Triggered when entering while scrolling backward
- `onLeave` - Triggered when the element leaves the viewport
- `onLeaveForward` - Triggered when leaving while scrolling forward
- `onLeaveBackward` - Triggered when leaving while scrolling backward
- `onUpdate` - Triggered on every scroll update
- `onSyncComplete` - Triggered when sync animation completes
- `onResize` - Triggered on container resize

---

## ScrollObserver Methods

### link()

Connects an Animation, Timer or Timeline to a ScrollObserver instance. This is equivalent to defining an onScroll() instance on the autoplay parameter. Only one object can be linked at a time, every call to link() overrides the previously linked object.

| Name | Accepts |
|------|---------|
| animation | Animation \| Timer \| Timeline |

**Returns:** The `ScrollObserver` itself

```javascript
import { animate, onScroll } from 'animejs';

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
});

const scrollObserver = onScroll({
  container: '.scroll-container',
  enter: 'bottom-=50 top',
  leave: 'top+=60 bottom',
  sync: true,
  debug: true,
});

scrollObserver.link(animation);
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

### refresh()

Updates the bounding values, and re-compute the Function based value of a ScrollObserver instance.

The method handles refreshing these parameters when set as function-based values:
- `repeat`
- `axis`
- `enter`
- `leave`

Note: No need to call `.refresh()` when the container size changes, this is already handled internally.

**Returns:** The `ScrollObserver` itself

```javascript
import { animate, onScroll, utils } from 'animejs';

const scrollSettings = {
  enter: 20,
  leave: 60,
}

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: () => `bottom-=${scrollSettings.enter} top`,
    leave: () => `top+=${scrollSettings.leave} bottom`,
    sync: .5,
    debug: true,
  })
});

animate(scrollSettings, {
  enter: 90,
  leave: 100,
  loop: true,
  alternate: true,
  modifier: utils.round(0),
  onUpdate: () => animation._autoplay.refresh()
});
```

### revert()

Disables the ScrollObserver, removes all `EventListener` and removes the debug `HTMLElement` if necessary.

**Returns:** The `ScrollObserver` itself

```javascript
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 1,
    debug: true,
    onSyncComplete: self => self.revert()
  })
});
```

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

## ScrollObserver Properties

Properties available on the `ScrollObserver` instance returned by an `onScroll()` function.

| Name | Description |
|------|-------------|
| id | Gets the unique identifier for the ScrollObserver instance (`Number`) |
| container | Gets the scroll container associated with this observer (`ScrollContainer`) |
| target | Gets the target element being observed (`HTMLElement`) |
| linked | Gets the linked object (`Animation` \| `Timer` \| `Timeline`) |
| repeat | Gets whether the observer should repeat (`Boolean`) |
| horizontal | Gets whether the scroll direction is horizontal (`Boolean`) |
| enter | Gets the enter threshold (`String` \| `Number`) |
| leave | Gets and sets the leave threshold (`String` \| `Number`) |
| sync | Gets whether synchronisation is enabled (`Boolean`) |
| velocity | Gets the current scroll velocity (`Number`) |
| backward | Gets whether the scroll direction is backward (`Boolean`) |
| scroll | Gets the current scroll position (`Number`) |
| progress | Gets the current progress of the observed element (0 to 1) (`Number`) |
| completed | Gets whether the observation has completed (`Boolean`) |
| began | Gets whether the observation has begun (`Boolean`) |
| isInView | Gets whether the observed element is currently in view (`Boolean`) |
| offset | Gets the offset of the observed element (`Number`) |
| offsetStart | Gets the start offset of the observed element (`Number`) |
| offsetEnd | Gets the end offset of the observed element (`Number`) |
| distance | Gets the scroll distance for the observed element (`Number`) |
