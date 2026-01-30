# Easings

A collection of easing functions and a physics-based spring generator.

---

## Built-in Eases

Both the js and waapi `animate()` functions include a collection of built-in easing functions that can be specified by name directly in the `ease` parameter.

| Type | Parameters | Variants |
|------|-----------|----------|
| Linear | — | `'linear'` |
| Power | power = `1.675` | `'in'`, `'out'`, `'inOut'`, `'outIn'` |
| Quad | — | `'inQuad'`, `'outQuad'`, `'inOutQuad'`, `'outInQuad'` |
| Cubic | — | `'inCubic'`, `'outCubic'`, `'inOutCubic'`, `'outInCubic'` |
| Quart | — | `'inQuart'`, `'outQuart'`, `'inOutQuart'`, `'outInQuart'` |
| Quint | — | `'inQuint'`, `'outQuint'`, `'inOutQuint'`, `'outInQuint'` |
| Sine | — | `'inSine'`, `'outSine'`, `'inOutSine'`, `'outInSine'` |
| Exponential | — | `'inExpo'`, `'outExpo'`, `'inOutExpo'`, `'outInExpo'` |
| Circular | — | `'inCirc'`, `'outCirc'`, `'inOutCirc'`, `'outInCirc'` |
| Bounce | — | `'inBounce'`, `'outBounce'`, `'inOutBounce'`, `'outInBounce'` |
| Back | overshoot = `1.70158` | `'inBack'`, `'outBack'`, `'inOutBack'`, `'outInBack'` |
| Elastic | amplitude = `1`, period = `.3` | `'inElastic'`, `'outElastic'`, `'inOutElastic'`, `'outInElastic'` |

Usage examples:

```javascript
animate(target, { x: 100, ease: 'outQuad' });
animate(target, { x: 100, ease: 'outExpo' });
animate(target, { x: 100, ease: 'outElastic(.8, 1.2)' });
```

```javascript
import { animate, waapi } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut(3)',
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOutExpo',
});
```

---

## Cubic Bézier Easing

A cubic bezier easing defines the pace of an animation using a Bézier curve.

| Parameter | Type | Details |
|-----------|------|---------|
| x1 | Number | X coordinate of the first control point. Must be between 0 and 1. |
| y1 | Number | Y coordinate of the first control point. Can be any value (negative creates anticipation, >1 creates overshoot). |
| x2 | Number | X coordinate of the second control point. Must be between 0 and 1. |
| y2 | Number | Y coordinate of the second control point. Can be any value (negative creates anticipation, >1 creates overshoot). |

For JavaScript:

```javascript
import { animate, cubicBezier } from 'animejs';

animate(target, { x: 100, ease: cubicBezier(0, 0, 0.58, 1) });
```

For WAAPI:

```javascript
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'cubic-bezier(0, 0, 0.58, 1)' });

// Or

waapi.animate(target, { x: 100, ease: 'cubicBezier(0, 0, 0.58, 1)' });
```

```javascript
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.5, 0, 0.9, 0.3)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.1, 0.7, 0.5, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'cubicBezier(0.7, 0.1, 0.5, 0.9)'
});
```

---

## Linear Easing

A linear easing defines the pace of an animation using linear interpolation between specified points.

| Name | Type | Info |
|------|------|------|
| number | `Number` | Represents the output value at a point during the animation. At least two values must be specified. |
| percentage (opt) | `String` | Optional timing position as a string: `'value percentage'`. Indicates when the value is reached during the animation. |

For JavaScript animate():

```javascript
import { animate, linear } from 'animejs';

animate(target, { x: 100, ease: linear(0, '0.5 50%', '0.3 75%', 1) });
```

For WAAPI animate():

```javascript
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'linear(0, 0.5 50%, 0.3 75%, 1)' });
```

```javascript
import { animate, waapi, linear } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, 0, 0.5, 0.5, 1, 1)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, '1 25%', 0, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: 'linear(1, 0 25%, 1, 0)'
});
```

---

## Steps Easing

A steps easing creates a stepped animation that jumps between values at discrete intervals.

| Name | Type | Info |
|------|------|------|
| steps | `Number` | Represents the number of equal steps to divide the animation into. Must be a positive integer. |
| fromStart (opt) | `Boolean` | When `true`, the change happens at the start of each step. When `false`, the change happens at the end of each step (default: `false`). |

For JavaScript:

```javascript
import { animate, steps } from 'animejs';

animate(target, { x: 100, ease: steps(5) });
// Or with fromStart
animate(target, { x: 100, ease: steps(5, true) });
```

For WAAPI:

```javascript
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'steps(5)' });
// Or with jump-start
waapi.animate(target, { x: 100, ease: 'steps(5, start)' });
```

```javascript
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4, true)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'steps(8, end)'
});
```

---

## Irregular Easing

An irregular easing defines the pace of an animation using linear interpolation between randomized points.

| Name | Type | Info |
|------|------|------|
| steps | `Number` | Represents the number of random steps to generate. Must be a positive integer. |
| randomness (opt) | `Number` | Controls the amplitude of random variations. Higher values create more dramatic jumps between steps (default: `1`). |

```javascript
import { animate, irregular } from 'animejs';

animate(target, { x: 100, ease: irregular(10, 1.5) });
```

```javascript
import { animate, waapi, irregular } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, .5)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 2)
});
```

---

## Spring

A spring curve generator that returns an easing function with its corresponding duration to create physics-based animations.

The `spring()` method can be passed directly to the `ease` parameter of the `animate()` method.

### Perceived Parameters

| Name | Type | Info |
|------|------|------|
| bounce | `Number` | Controls the "bounciness" of the animation. Range: `-1` to `1`. Default: `0.5`. |
| duration | `Number` | The perceived duration in milliseconds, when the animation _feels_ complete visually. Range: `10` to `10000`. Default: `628`. |

### Physics Parameters

| Name | Type | Info |
|------|------|------|
| mass | `Number` | Mass of the object attached to the spring. Range: `1` to `10000`. Default: `1`. |
| stiffness | `Number` | Spring stiffness coefficient. Range: `0` to `10000`. Default: `100`. |
| damping | `Number` | Damping coefficient that opposes motion. Range: `0` to `10000`. Default: `10`. |
| velocity | `Number` | Initial velocity of the animation. Range: `-10000` to `10000`. Default: `0`. |

### Spring onComplete Callback Parameter

| Name | Type | Info |
|------|------|------|
| onComplete | `Function` | Callback triggered when spring reaches perceived duration. |

```javascript
import { animate, spring, utils } from 'animejs';

const [ $square1, $square2, $square3 ] = utils.$('.square');

utils.set('.square', { color: 'var(--hex-red-1)' })

animate($square1, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square1, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .15,
    duration: 500,
    onComplete: () => utils.set($square1, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square2, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square2, { color: 'var(--hex-green-1)' }),
  ease: spring({
    bounce: .3,
    duration: 500,
    onComplete: () => utils.set($square2, { color: 'var(--hex-yellow-1)' }),
  })
});

animate($square3, {
  x: '17rem',
  rotate: 360,
  onComplete: () => utils.set($square3, { color: 'var(--hex-green-1)' }),
  ease: spring({
    stiffness: 90,
    damping: 14,
    onComplete: () => utils.set($square3, { color: 'var(--hex-yellow-1)' }),
  })
});
```
