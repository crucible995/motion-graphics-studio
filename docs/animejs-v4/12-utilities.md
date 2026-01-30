# Utilities

A collection of utility functions for common animation tasks that can also serve as modifier functions.

```javascript
import { utils } from 'animejs';

utils.stagger();
utils.$();
utils.get();
utils.set();
// Other functions
```

```javascript
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs';
```

```javascript
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs/utils';
```

---

## stagger()

Creates sequential effects by distributing values progressively across multiple targets.

| Name | Accepts |
|------|---------|
| value | Stagger value |
| parameters (opt) | Stagger parameters |

**Returns:** Function based value

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  scale: stagger([1, .1]),
  delay: stagger(100),
});
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

### Stagger Value Types

#### Numerical value

Represents by how much each staggered value is incremented by.

| Property | Value |
|----------|-------|
| **Accepts** | `Number`<br>`String` containing at least one `Number` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  // Increase translateX by 5.75rem for each elements
  x: stagger('5.75rem'),
  // Increase delay by 100ms for each elements
  delay: stagger(100)
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 0rem      delay: 0ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 5.75rem   delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 11.5rem   delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17.25rem  delay: 300ms</div>
</div>
```

#### Range value

Distributes values evenly between two numerical values.

| Property | Value |
|----------|-------|
| **Accepts** | `[Number\|String, Number\|String]` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem']),
  delay: stagger([0, 500]),
});
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

### Stagger Parameters

#### start

Defines the starting value of the stagger.

| Property | Value |
|----------|-------|
| **Accepts** | `Number` \| Timeline time position (Only when used as a timeline position argument) |
| **Default** | `0` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: stagger('1rem', { start: 14 }), // adds 14 to the staggered value
  delay: stagger(100, { start: 500 }), // adds 500 to the staggered value
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 14rem, delay: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 15rem, delay: 600ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 16rem, delay: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17rem, delay: 700ms</div>
</div>
```

#### from

Defines the starting position of the stagger effect.

| Value | Description |
|-------|-------------|
| `Number` | The starting index of the effect |
| `'first'` | Equivalent to index `0` |
| `'center'` | Starts the effect from the center |
| `'last'` | Starts the effect from the last element |
| `'random'` | Randomises the order of the staggered values |

| Property | Value |
|----------|-------|
| **Default** | `0` |

```javascript
import { createTimeline, stagger } from 'animejs';

const tl = createTimeline({
  loop: true,
  defaults: { duration: 500 },
  delay: 500,
  loopDelay: 500
})
.add('.row:nth-child(1) .square:nth-child(8)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(1) .square', {
  scale: 0,
  delay: stagger(25, { from: 7 }),
}, '<')
.add('.row:nth-child(2) .square:first-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(2) .square', {
  scale: 0,
  delay: stagger(25, { from: 'first' }),
}, '<')
.add('.row:nth-child(3) .square:nth-child(6)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(3) .square', {
  scale: 0,
  delay: stagger(25, { from: 'center' }),
}, '<')
.add('.row:nth-child(4) .square:last-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(4) .square', {
  scale: 0,
  delay: stagger(25, { from: 'last' }),
}, '<')
.set('.row .square', { color: 'currentColor' })
.add('.row .square', {
  scale: 1,
  delay: stagger(25, { from: 'random' }),
})
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

#### reversed

Defines if the stagger should operate in reverse.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `false` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  translateX: '17rem',
  delay: stagger(100, { reversed: true }),
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 300ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 0ms</div>
</div>
```

#### ease

Defines an easing applied to the staggered values distribution.

| Property | Value |
|----------|-------|
| **Accepts** | ease |
| **Default** | `'linear'` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem'], { ease: 'inOut(3)' }),
  delay: stagger(100, { ease: 'inOut(3)' }),
});
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

#### grid

Distributes values on a 2d `Array`.

| Property | Value |
|----------|-------|
| **Accepts** | `[<Number>, <Number>]` |
| **Default** | `null` |

```javascript
import { animate, stagger, utils } from 'animejs';

const $squares = utils.$('.square');

function animateGrid() {
  animate($squares, {
    scale: [
      { to: [0, 1.25] },
      { to: 0 }
    ],
    boxShadow: [
      { to: '0 0 1rem 0 currentColor' },
      { to: '0 0 0rem 0 currentColor' }
    ],
    delay: stagger(100, {
      grid: [11, 4],
      from: utils.random(0, 11 * 4)
    }),
    onComplete: animateGrid
  });
}

animateGrid();
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

#### axis

Defines the direction of a staggered grid effect by restricting which axis of the grid can update.

| Value | Effect |
|-------|--------|
| `'x'` | Restrict the direction to the x axis |
| `'y'` | Restrict the direction to the y axis |

```javascript
import { animate, stagger, utils } from 'animejs';

const grid = [11, 4];
const $squares = utils.$('.square');

function animateGrid() {
  const from = utils.random(0, 11 * 4);
  animate($squares, {
    translateX: [
      { to: stagger('-.75rem', { grid, from, axis: 'x' }) },
      { to: 0, ease: 'inOutQuad', },
    ],
    translateY: [
      { to: stagger('-.75rem', { grid, from, axis: 'y' }) },
      { to: 0, ease: 'inOutQuad' },
    ],
    opacity: [
      { to: .5 },
      { to: 1 }
    ],
    delay: stagger(85, { grid, from }),
    onComplete: animateGrid
  });
}

animateGrid();
```

#### modifier

Defines a function that modify the returned staggered value.

| Property | Value |
|----------|-------|
| **Accepts** | A `Function` with the parameter `value` (the current animated numerical value) |
| **Must Returns** | `Number` \| `String` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  boxShadow: [
    { to: stagger([1, .25], {
        modifier: v => `0 0 ${v * 30}px ${v * 20}px currentColor`,
        from: 'center'
      })
    },
    { to: 0 },
  ],
  delay: stagger(100, { from: 'center' }),
  loop: true
});
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

#### use

Defines a custom staggering order instead of using the natural targets order by using an attribute or property of the targets. The properties or attributes must contain a suite of number, starting at `0`.

A custom `total` parameter value must be defined if the highest custom index is lower than the actual total length of staggered targets when also using the `from`, `reversed` or `ease` parameters.

| Property | Value |
|----------|-------|
| **Accepts** | `String` of a valid property or attribute name |
| **Default** | `null` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index' }),
});
```

```html
<div class="small row">
  <div class="square" data-index="2"></div>
  <div class="padded label">data-index="2"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="3"></div>
  <div class="padded label">data-index="3"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

#### total

Defines a custom staggering length instead of using the actual total length of the staggered targets. This is useful if the max value of the custom order defined using the `use` parameter is lower than the actual number of staggered targets when using the `from`, `reversed` or `ease` parameters.

| Property | Value |
|----------|-------|
| **Accepts** | `Number` |
| **Default** | `null` |

```javascript
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index', total: 2, reversed: true }),
});
```

```html
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

---

## $()

Converts the provided targets parameter into an `Array` of elements, serving as an alternative to `document.querySelectorAll()`.

When employed within a Scope, it references the Scope's `root` element rather than `document`.

| Name | Accepts |
|------|---------|
| targets | CSS selector \| DOM Elements |

**Returns:** An `Array` of `HTMLElement` or `SVGElement` or `SVGGeometryElement`

```javascript
import { utils, createScope } from 'animejs';

// Targets all the '.square' elements
utils.$('.square').forEach($square => {
  utils.set($square, { scale: .5 });
});

createScope({ root: '.row:nth-child(2)' }).add(() => {
  // Limits the selection to '.row:nth-child(2) .square'
  utils.$('.square').forEach($square => {
    utils.set($square, { rotate: 45 });
  });
});
```

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

## get()

Returns the current value of a target's property, with optional unit conversion or removal.

| Name | Accepts | Description |
|------|---------|-------------|
| target | Targets | The targeted element |
| property | `String` | A valid property name of the target |
| unit (opt) | `String` \| `Boolean` | Strip the unit if set to `false` or convert the unit if a valid unit `String` is passed |

**Returns:**
- `String`: When target is HTMLElement or SVGElement and unit parameter isn't `false` or set to valid unit string
- `Number`: When target is HTMLElement or SVGElement and unit parameter is `false`

```javascript
import { animate, utils } from 'animejs';

const [ $raw, $rem, $num ] = utils.$('.value');
const [ $sq1, $sq2, $sq3 ] = utils.$('.square');

const getValues = () => {
  // Return the raw parsed value (string with px)
  $raw.textContent = utils.get($sq1, 'x');
  // Return the converted value with unit (string with rem)
  $rem.textContent = utils.get($sq2, 'x', 'rem');
  // Return the raw value with its unit removed (number)
  $num.textContent = utils.get($sq3, 'x', false);
}

animate('.square', {
  x: 270,
  loop: true,
  alternate: true,
  onUpdate: getValues
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="raw value"></span></div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="rem value"></span></div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label"><span class="num value"></span></div>
</div>
```

---

## set()

Immediately sets one or multiple properties values to one or multiple targets.

| Name | Accepts | Description |
|------|---------|-------------|
| targets | Targets | The targeted element(s) |
| properties | `Object` | An object of valid properties and values of the target |

**Returns:** Animation

Note: `utils.set()` is useful for setting complex values, but for repeatedly updating the same properties on the same targets, using an Animatable is recommended for better performances.

Note: `utils.set()` won't work if you try to set an attribute on a DOM or SVG element not already defined on the element.

```javascript
import { utils, stagger } from 'animejs';

const [ $set, $revert ] = utils.$('button');
const squares = utils.$('.square');
const colors = ['red', 'orange', 'yellow'];

let setter;

const setStyles = () => {
  setter = utils.set(squares, {
    borderRadius: '50%',
    y: () => utils.random(-1, 1) + 'rem',
    scale: stagger(.1, { start: .25, ease: 'out' }),
    color: () => `var(--hex-${utils.randomPick(colors)})`
  });
  $set.setAttribute('disabled', 'true');
  $revert.removeAttribute('disabled');
}

const revertStyles = () => {
  setter.revert();
  $set.removeAttribute('disabled');
  $revert.setAttribute('disabled', 'true');
}

$set.addEventListener('click', setStyles);
$revert.addEventListener('click', revertStyles);
```

```html
<div class="large justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Set styles</button>
    <button disabled>Revert styles</button>
  </fieldset>
</div>
```

---

## cleanInlineStyles()

Removes all CSS inline styles added by the specified instance. Can be used as a Animation or Timeline `onComplete()` callback.

| Name | Accepts |
|------|---------|
| instance | Animation \| Timeline |

**Returns:** The passed Animation or Timeline instance.

```javascript
import { animate, utils } from 'animejs';

utils.set('.square', { scale: .75 });

animate('.keep-styles', {
  x: '23rem',
  borderRadius: '50%',
});

animate('.clean-styles', {
  x: '23rem',
  borderRadius: '50%',
  // This removes the translateX and borderRadius inline styles
  // But keeps the scale previously added outside of this animation
  onComplete: utils.cleanInlineStyles
});
```

```html
<div class="medium row">
  <div class="square keep-styles"></div>
  <div class="padded label">Keep styles (default)</div>
</div>
<div class="medium row">
  <div class="square clean-styles"></div>
  <div class="padded label">Clean translateX and borderRadius</div>
</div>
```

---

## remove()

Removes one or multiple targets from all active animations, a specific instance or a specific property, cancelling any Animation or Timeline referencing these targets if needed.

| Name | Accepts |
|------|---------|
| targets | Targets |
| instance (opt) | Animation \| Timeline |
| propertyName (opt) | Animatable Properties name `String` |

**Returns:** An `Array` of the removed targeted elements

```javascript
import { animate, utils } from 'animejs';

let updates = 0;

const [ $removeFirstButton ] = utils.$('.remove-1');
const [ $removeSecondButton ] = utils.$('.remove-2');
const [ $updates ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  rotate: 360,
  alternate: true,
  loop: true,
  onUpdate: () => {
    $updates.textContent = updates++;
  }
});

$removeFirstButton.onclick = () => {
  utils.remove('.row:nth-child(1) .square');
}

$removeSecondButton.onclick = () => {
  utils.remove('.row:nth-child(2) .square', animation, 'x');
}
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<pre class="large log row">
  <span class="label">updates</span>
  <span class="value">--</span>
</pre>
<div class="medium row">
  <fieldset class="controls">
    <button class="button remove-1">Remove all first</button>
    <button class="button remove-2">Remove x second</button>
  </fieldset>
</div>
```

---

## sync()

Execute a callback function in sync with the engine loop.

| Name | Accepts |
|------|---------|
| callback | `Function` |

**Returns:** `Timer`

```javascript
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

## random()

Returns a random `Number` within a specified range, with an optional third parameter determining the number of decimal places.

| Name | Accepts |
|------|---------|
| min | `Number` |
| max | `Number` |
| decimalLength=0 (opt) | `Number` |

**Returns:** `Number`

```javascript
import { utils } from 'animejs';

utils.set('.square', {
  x: () => utils.random(2, 18, 2) + 'rem',
  rotate: () => utils.random(0, 180),
  scale: () => utils.random(.25, 1.5, 3),
});
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

## createSeededRandom()

Returns a pre-seeded pseudo-random function that always return the same suite of `Number` within a specified range, with an optional third parameter determining the number of decimal places.

| Name | Accepts |
|------|---------|
| seed=0 (opt) | `Number` |
| seededMin=0 (opt) | `Number` |
| seededMax=1 (opt) | `Number` |
| seededDecimalLength=0 (opt) | `Number` |

**Returns:** A pre-seeded `random()` function

```javascript
import { utils } from 'animejs';

const seededRandom = utils.createSeededRandom(12345);

utils.set('.square', {
  x: () => seededRandom(2, 18, 2) + 'rem',
  rotate: () => seededRandom(0, 180),
  scale: () => seededRandom(.25, 1.5, 3),
});
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

## randomPick()

Returns a random element from a collection.

| Name | Accepts |
|------|---------|
| collection | `Array` \| `NodeList` \| `String` |

**Returns:** A random element from the collection

```javascript
import { utils } from 'animejs';

utils.set('.letter', {
  x: () => utils.randomPick([5, 9, 13, 17]) + 'rem',
  scale: () => utils.randomPick([1, 1.25, 1.5, 1.75]),
  color: () => `var(--hex-${utils.randomPick(['red', 'orange', 'yellow'])}-1)`,
  innerHTML: () => utils.randomPick('ABCD'),
});
```

```html
<div class="small row">
  <div class="letter">A</div>
</div>
<div class="small row">
  <div class="letter">B</div>
</div>
<div class="small row">
  <div class="letter">C</div>
</div>
<div class="small row">
  <div class="letter">D</div>
</div>
```

---

## shuffle()

Mutates an array by randomizing the order of its elements.

| Name | Accepts |
|------|---------|
| array | `Array` |

**Returns:** The mutated `Array`

```javascript
import { utils, animate, stagger } from 'animejs';

const [ $shuffle ] = utils.$('button');
const squares = utils.$('.square');
const x = stagger('3.2rem');

// Initial squares x position
utils.set(squares, { x });

const shuffle = () => animate(utils.shuffle(squares), { x });

$shuffle.addEventListener('click', shuffle);
```

```html
<div class="large row">
  <div class="square">A</div>
  <div class="square">B</div>
  <div class="square">C</div>
  <div class="square">D</div>
  <div class="square">E</div>
  <div class="square">F</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Shuffle</button>
  </fieldset>
</div>
```

---

## round()

Rounds a `Number` to a specified number of decimal places or creates a rounding `Function` with a pre-defined _decimalLength_ parameter.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` |
| decimalLength | `Number` |

**Returns:** A `Number` if a value is provided, otherwise a chain-able utility `Function` to round numbers with the designated decimal length.

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
});

animate('.rounded', {
  rotate: '1turn',
  modifier: utils.round(1), // Used as a function
  duration: 3000,
  loop: true,
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock rounded"></div>
    <div class="label">rounded (.1)</div>
  </div>
</div>
```

---

## clamp()

Restricts a `Number` between the specified _min_ and _max_ values or creates a clamping `Function` with pre-defined _min_ and _max_ parameters.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |

**Returns:** A `Number` if a value is provided, otherwise a chain-able utility `Function` to clamp numbers between the specified _min_ and _max_ values.

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.clamped', {
  rotate: '1turn',
  modifier: utils.clamp(.25, .75),
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock clamped"></div>
    <div class="label">clamped [.25,.75]</div>
  </div>
</div>
```

---

## snap()

Rounds a `Number` to the nearest specified _increment_ or creates a snapping `Function` with a pre-defined _increment_ parameter. If an `Array` is provided as the increment, it selects the closest value from the array.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` |
| increment | `Number` \| `Array<Number>` |

**Returns:** A `Number` if a value is provided, otherwise a chain-able utility `Function` to snap numbers to the nearest _increment_ or array value.

```javascript
const snapTo10 = utils.snap(10);
snapTo10(94);  // 90
snapTo10(-17); // -20

const snapToArray = utils.snap([0, 50, 100]);
snapToArray(30);  // 50
snapToArray(75);  // 100
snapToArray(-10); // 0

const clampAndSnap = utils.clamp(0, 100).snap(30);
clampAndSnap(72.7523); // 60
clampAndSnap(120.2514); // 90
```

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.snapped', {
  rotate: '1turn',
  modifier: utils.snap(.25),
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock snapped"></div>
    <div class="label">snapped (.25)</div>
  </div>
</div>
```

---

## wrap()

Wraps a `Number` between a range defined with _min_ and _max_ values or creates a wrapping `Function` with pre-defined _min_ and _max_ parameters.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |

**Returns:** A `Number` if a value is provided, otherwise a chain-able utility `Function` to wrap numbers between the specified _min_ and _max_ values.

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.wrapped', {
  rotate: '1turn',
  modifier: utils.wrap(-.25, .25), // Used as a modifier
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock wrapped"></div>
    <div class="label">wrapped [-.25,.25]</div>
  </div>
</div>
```

---

## mapRange()

Maps a `Number` from one range to another or creates a mapping `Function` with pre-defined ranges parameters.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` |
| fromLow | `Number` |
| fromHigh | `Number` |
| toLow | `Number` |
| toHigh | `Number` |

**Returns:** A `Number` if a value is provided, otherwise a chain-able utility `Function` to map numbers from one range to another.

```javascript
const mapFrom0and100to0and200 = utils.mapRange(0, 100, 0, 200);
mapFrom0and100to0and200(45);  // 90
mapFrom0and100to0and200(120); // 240
mapFrom0and100to0and200(-15); // -30

const normalizeAndClamp = utils.mapRange(-100, 100, 0, 1).clamp(0, 1);
normalizeAndClamp(50);  // 0.75
normalizeAndClamp(120); // 1
```

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '12turn',
  duration: 12000,
  loop: true,
  ease: 'inOut',
});

animate('.mapped', {
  rotate: '12turn',
  modifier: utils.mapRange(0, 12, 0, 1), // Used as a modifier
  duration: 12000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock mapped"></div>
    <div class="label">mapped [0,12] [0,1]</div>
  </div>
</div>
```

---

## lerp()

Interpolates a value between two numbers based on a given progress or creates an interpolation Function with pre-defined start and end parameters.

| Name | Accepts |
|------|---------|
| start | `Number` |
| end | `Number` |
| progress (opt) | `Number` (`[0 - 1]`) |

**Returns:** A `Number` if a progress value is provided, otherwise a chain-able utility `Function` to interpolate between the specified start and end values.

```javascript
const interpolateBetween0and100 = utils.lerp(0, 100);
interpolateBetween0and100(0.5);  // 50
interpolateBetween0and100(0.75); // 75
interpolateBetween0and100(0.25); // 25

const interpolateAndRound = utils.lerp(0, 100).round(2);
interpolateAndRound(0.677523); // 67.75
interpolateAndRound(1.202514); // 100
```

```javascript
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.interpolated', {
  rotate: '1turn',
  modifier: utils.lerp(0, 12), // Interpolates 0 to 12 by passing the rotate progress value 0 to 1
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock interpolated"></div>
    <div class="label">interpolated [0,12]</div>
  </div>
</div>
```

---

## damp()

A frame rate independent version of `utils.lerp()` to perform a linear interpolation between two values. The closer the amount is to `1`, the closer the result is to the end value.

| Name | Accepts |
|------|---------|
| start | `Number` |
| end | `Number` |
| deltaTime | `Number` (ms) |
| amount | `Number [0-1]` |

**Returns:** `Number`

```javascript
utils.damp(0, 100, 8, 0); // 0
utils.damp(0, 100, 8, 0.5); // 50
utils.damp(0, 100, 8, 1); // 100
```

```javascript
import { animate, createTimer, utils } from 'animejs';

const [ $input ] = utils.$('.input');
const [ $lerped ] = utils.$('.lerped');
const [ $lerped15fps ] = utils.$('.lerped-15');

animate($input, {
  rotate: '1000turn',
  modifier: utils.snap(.25),
  duration: 4000000,
  loop: true,
  ease: 'linear',
});

const dampedLoop = createTimer({
  frameRate: 15,
  onUpdate: clock => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped15fps, 'rotate', false);
    utils.set($lerped15fps, {
      rotate: utils.damp(lerpedRotate, sourceRotate, clock.deltaTime, .075) + 'turn'
    });
  }
});

const lerpedLoop = createTimer({
  frameRate: 15,
  onUpdate: () => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped, 'rotate', false);
    utils.set($lerped, {
      rotate: utils.lerp(lerpedRotate, sourceRotate, .075) + 'turn'
    });
  }
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock input"></div>
    <div class="label">input</div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
    <div class="label">damped 15fps</div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
    <div class="label">lerped 15fps</div>
  </div>
</div>
```

---

## roundPad()

Rounds a value to a specified decimal length, pads with zeros if needed, and returns the result as a string, or creates a rounding and padding `Function` with a pre-defined _decimalLength_ parameter.

| Name | Accepts |
|------|---------|
| value (opt) | `Number` / `String` |
| decimalLength | `Number` |

**Returns:** A `String` if a value is provided, otherwise a chain-able utility `Function` to round and pad numbers to the specified decimal length.

```javascript
const roundPadTo2Decimals = utils.roundPad(2);
roundPadTo2Decimals(90.12345);  // '90.12'
roundPadTo2Decimals(120);       // '120.00'
roundPadTo2Decimals(15.9);      // '15.90'

const snapAndRoundPad = utils.snap(50).roundPad(2);
snapAndRoundPad(123.456); // '100.00'
snapAndRoundPad(175.789); // '200.00'
```

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: '8.1',
  modifier: utils.roundPad(3),
  duration: 10000,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0.000</span>
  </pre>
</div>
```

---

## padStart()

Pads a `Number` from the start with a string until the result reaches a given length or creates a padding `Function` with pre-defined _totalLength_ and _padString_ parameters.

| Name | Accepts |
|------|---------|
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

**Returns:** A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the start.

```javascript
const padTo5WithZeros = utils.padStart(5, '0');
padTo5WithZeros('123');  // '00123'
padTo5WithZeros(78);     // '00078'
padTo5WithZeros('1234'); // '01234'

const roundAndPad = utils.round(2).padStart(5, '0');
roundAndPad(12.345);  // '12.35'
roundAndPad(7.8);     // '07.80'
```

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 10000,
  modifier: utils.round(0).padStart(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## padEnd()

Pads a `Number` from the end with a string until the result reaches a given length or creates a padding `Function` with pre-defined _totalLength_ and _padString_ parameters.

| Name | Accepts |
|------|---------|
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

**Returns:** A `String` if a value is provided, otherwise a chain-able utility `Function` to pad numbers from the end.

```javascript
const padTo5WithZeros = utils.padEnd(5, '0');
padTo5WithZeros('123');  // '12300'
padTo5WithZeros(78);     // '78000'
padTo5WithZeros('1234'); // '12340'

const roundAndPadEnd = utils.round(0).padEnd(5, '0');
roundAndPadEnd(123.456); // '12300'
roundAndPadEnd(7.8);     // '80000'
```

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1,
  modifier: utils.round(3).padEnd(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

## degToRad()

Converts degrees into radians.

| Name | Accepts |
|------|---------|
| degrees (opt) | `Number` |

**Returns:** A `Number` if degrees are provided, otherwise a chain-able utility `Function` to convert degrees to radians.

```javascript
const degToRad = utils.degToRad();
degToRad(360); // 6.283185307179586

const roundDegToRad = utils.degToRad().round(2);
roundDegToRad(180); // 3.14
roundDegToRad(90);  // 1.57
```

```javascript
import { animate, createAnimatable, utils } from 'animejs';

const radAnimatable = createAnimatable('.rad', {
  rotate: { unit: 'rad', duration: 0 },
});

const [ $deg ] = utils.$('.deg');

const degAnimation = animate($deg, {
  rotate: '360deg',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const degrees = utils.get($deg, 'rotate', false);
    radAnimatable.rotate(utils.degToRad(degrees));
  }
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
</div>
```

---

## radToDeg()

Converts radians into degrees.

| Name | Accepts |
|------|---------|
| radians (opt) | `Number` |

**Returns:** A `Number` if radians are provided, otherwise a chain-able utility `Function` to convert radians to degrees.

```javascript
const radToDeg = utils.radToDeg();
radToDeg(1.7453292519943295); // 100
radToDeg(Math.PI);            // 180

const roundRadToDeg = utils.radToDeg().round(2);
roundRadToDeg(Math.PI / 7);  // 25.71
```

```javascript
import { animate, createAnimatable, utils } from 'animejs';

const degAnimatable = createAnimatable('.deg', {
  rotate: { unit: 'deg', duration: 0 }
});

const [ $rad ] = utils.$('.rad');

const degAnimation = animate($rad, {
  rotate: (Math.PI * 2) + 'rad',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const radians = utils.get($rad, 'rotate', false);
    degAnimatable.rotate(utils.radToDeg(radians));
  }
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
</div>
```

---

## Chain-able Utility Functions

Chain-able utility functions allow for the creation of complex operations by combining multiple functions in a single expression.

```javascript
const clampRoundPad = utils.clamp(0, 100).round(2).padStart(6, '0');
clampRoundPad(125)   // '000100'
clampRoundPad(75.25) // '075.25'
```

```javascript
const chainableClamp = utils.clamp(0, 100); // Returns a chain-able function
const result = chainableClamp(150); // 100
```

```javascript
const normalizeAndRound = utils.mapRange(0, 255, 0, 1).round(1);
normalizeAndRound(128); // '0.5'
normalizeAndRound(64);  // '0.3'
```

```javascript
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1000,
  modifier: utils.wrap(0, 10).roundPad(3).padStart(6, '0'),
  duration: 100000,
  alternate: true,
  loop: true,
  ease: 'linear',
});
```

**Supported Chain-able Functions:**
- `round()`, `clamp()`, `snap()`, `wrap()`, `mapRange()`, `interpolate()`, `roundPad()`, `padStart()`, `padEnd()`, `degToRad()`, `radToDeg()`
