# Animation

The `animate()` method creates animations that modify property values of targeted elements, offering extensive configuration through parameters, callbacks, and control methods.

## Creating Animations

```javascript
import { animate } from 'animejs';
const animation = animate(targets, parameters);
```

**Subpath Import:**

```javascript
import { animate } from 'animejs/animation';
```

### Parameters

| Name | Accepts |
|------|---------|
| targets | Targets |
| parameters | Object containing animatable properties, tween parameters, playback settings, and animation callbacks |

### Returns

`JSAnimation`

### WAAPI Alternative

A lightweight 3KB version exists, powered by the Web Animation API:

```javascript
import { waapi } from 'animejs';
const animation = waapi.animate(targets, parameters);
```

This variant returns a `WAAPIAnimation` object and provides reduced features but covers essential functionality.

---

# Targets

Targets are the elements to which property value changes are applied and are defined in the first argument of the `animate()` function.

```javascript
animate(
  '.square',  // ← Targets go here
  {
    translateX: 100,
    scale: 2,
    opacity: .5,
    duration: 400,
    delay: 250,
    ease: 'out(3)',
    loop: 3,
    alternate: true,
    autoplay: false,
    onBegin: () => {},
    onLoop: () => {},
    onUpdate: () => {},
  }
);
```

---

## CSS Selector

Targets one or multiple DOM Elements using a CSS selector.

**Accepts:** Any `String` accepted by `document.querySelectorAll()`

*Since 1.0.0*

```javascript
import { animate } from 'animejs';

animate('.square', { x: '17rem' });
animate('#css-selector-id', { rotate: '1turn' });
animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div id="css-selector-id" class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## DOM Elements

Targets one or multiple DOM Elements.

**Accepts:**

- `HTMLElement`
- `SVGElement`
- `SVGGeometryElement`
- `NodeList`

```javascript
import { animate } from 'animejs';

const $demo = document.querySelector('#selector-demo');
const $squares = $demo.querySelectorAll('.square');

animate($demo, { scale: .75 });
animate($squares, { x: '23rem' });
```

```html
<div id="selector-demo">
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
</div>
```

---

## JavaScript Objects

Targets one or multiple JavaScript `Object`.

**Accepts:**

- `Object`
- Instance of `Class`

```javascript
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate(vector2D, {
  x: 100,
  y: 150,
  modifier: utils.round(0),
  onUpdate: () => $log.textContent = JSON.stringify(vector2D),
});
```

```html
<pre class="row large centered">
  <code>{"x":0,"y":0}</code>
</pre>
```

---

## Array of targets

Targets multiple valid Targets simultaneously by grouping them inside an Array. Any types of targets can be grouped together.

**Accepts:** An Array of Targets

```javascript
import { animate, utils } from 'animejs';

const [ $log ] = utils.$('code');

const vector2D = { x: 0, y: 0 };

animate([vector2D, '.square'], {
  x: '17rem',
  modifier: utils.roundPad(2).padStart(5, '0'),
  onRender: () => $log.textContent = JSON.stringify(vector2D),
});
```

```html
<pre class="row large centered">
  <code>{"x":"0"}</code>
</pre>
<div class="row medium">
  <div class="square"></div>
</div>
```

---

# Animatable properties

Animatable properties define which aspects of target elements can be modified through animations. These properties are defined in the parameters `Object` of the `animate()` function.

```javascript
animate('.square', {
  translateX: 100,  // ← Animatable properties
  scale: 2,
  opacity: .5,
  duration: 400,    // ← Playback settings
  delay: 250
});
```

---

## CSS Properties

Any CSS numerical and color properties can be animated. Properties containing a dash in their name, like `background-color`, must be converted to camel case (`backgroundColor`), or written as a `String` (`'background-color'`).

> Prioritize opacity and CSS transforms for smoother animations, as many CSS properties can trigger layout shifts or repainting.

**Accepts:**

- CSS numerical properties
- CSS color properties
- Camel case format (e.g., `backgroundColor`)
- String format (e.g., `'background-color'`)

```javascript
import { animate } from 'animejs';

animate('.square', {
  left: 'calc(7.75rem * 2)',
  borderRadius: 64,
  'background-color': '#F9F640',
  filter: 'blur(5px)',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## CSS transforms

The CSS `transform` property can be animated by specifying individual properties directly in the parameter object with both JS and WAAPI `animate()` versions.

| Name | Shorthand | Default Value | Default Unit |
|------|-----------|---------------|--------------|
| translateX | x | '0px' | 'px' |
| translateY | y | '0px' | 'px' |
| translateZ | z | '0px' | 'px' |
| rotate | — | '0deg' | 'deg' |
| rotateX | — | '0deg' | 'deg' |
| rotateY | — | '0deg' | 'deg' |
| rotateZ | — | '0deg' | 'deg' |
| scale | — | '1' | — |
| scaleX | — | '1' | — |
| scaleY | — | '1' | — |
| scaleZ | — | '1' | — |
| skew | — | '0deg' | 'deg' |
| skewX | — | '0deg' | 'deg' |
| skewY | — | '0deg' | 'deg' |
| perspective | — | '0px' | 'px' |

```javascript
import { animate, waapi } from 'animejs';

animate('.square', {
  x: '15rem',
  scale: 1.25,
  skew: -45,
  rotate: '1turn',
});

waapi.animate('.square', {
  transform: 'translateX(15rem) scale(1.25) skew(-45deg) rotate(1turn)',
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">JS / WAAPI</span>
</div>
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">WAAPI</span>
</div>
```

---

## CSS Variables

CSS variables with numerical or color values can be animated by directly passing the variable name as a string to the animation parameters.

This approach also enables animation of properties on pseudo-elements like `::after` and `::before`.

> **WAAPI Note:** When using the `waapi.animate()` method, you must use `CSS.registerProperty(propertyDefinition)`, otherwise it defaults to no animations.

```javascript
import { animate, utils } from 'animejs';

// Assign CSS variables to animated elements
utils.set('.square', {
  '--radius': '4px',
  '--x': '0rem',
  '--pseudo-el-after-scale': '1',
  borderRadius: () => 'var(--radius)',
  translateX: () => 'var(--x)',
});

// Animate the CSS variable values
animate('.square', {
  '--radius': '20px',
  '--x': '16.5rem',
  '--pseudo-el-after-scale': '1.55'
});
```

```html
<div class="medium row">
  <div class="css-variables square"></div>
</div>
```

```css
.demo .css-variables.square:after {
  position: absolute;
  opacity: .5;
  top: 0;
  left: 0;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: inherit;
  transform: scale(var(--pseudo-el-after-scale));
}
```

---

## JavaScript Object properties

Numerical and color JavaScript `Object` properties can be passed directly to the animation parameters.

**Accepts:** Numerical properties, color properties, and unit-based string values on JavaScript objects.

```javascript
import { animate, utils } from 'animejs';

const myObject = {
  number: 1337,
  unit: '42%',
}

const [ $log ] = utils.$('code');

animate(myObject, {
  number: 50,
  unit: '100%',
  modifier: utils.round(0),
  onRender: function() {
    $log.innerHTML = JSON.stringify(myObject);
  }
});
```

```html
<pre class="row large centered">
  <code>{"number":1337,"unit":"42%"}</code>
</pre>
```

---

## HTML Attributes

Numerical and color HTML attributes can be passed directly to the animation parameters.

**Accepts:** Numerical and color HTML attributes (e.g., `value` attribute on input elements)

```javascript
import { animate, utils } from 'animejs';

animate('input', {
  value: 1000,
  alternate: true,
  loop: true,
  modifier: utils.round(0),
});
```

```html
<pre class="row large centered">
  <input type="range" value="0" min="0" max="1000" />
  <input type="text" value="0" size="5"/>
</pre>
```

---

## SVG Attributes

Numerical and color SVG attributes can be animated by passing them directly to the animation parameters.

> Use the built-in SVG utility methods for more convenient SVG animations.

```javascript
import { animate } from 'animejs';

animate(['feTurbulence', 'feDisplacementMap'], {
  baseFrequency: .05,
  scale: 15,
  alternate: true,
  loop: true
});

animate('polygon', {
  points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
  alternate: true,
  loop: true
});
```

```html
<div class="large centered row">
  <svg width="128" height="128" viewBox="0 0 128 128">
    <filter id="displacementFilter">
      <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <polygon points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96" fill="currentColor"/>
  </svg>
</div>
```

---

# Tween value types

Tween value types specify the start and end values that define the animation of animatable properties.

---

## Numerical value

Specifies the numerical value of the animated property by passing either a `Number` or a `String` containing at least one `Number`.

**Accepts:**

- `Number`
- `String`

> The JS `animate()` method can inherit previously defined units. For example, after setting `width: '50%'`, a subsequent `width: 75` will inherit the percentage unit, becoming `'75%'`.

> The WAAPI `animate()` method automatically defaults to `'px'` only for specific properties including transform-related properties (x, y, z, perspective) and layout properties (top, right, bottom, left, width, height, margin, padding, borderWidth, borderRadius, fontSize).

```javascript
import { waapi } from 'animejs';

waapi.animate('.square', {
  x: 240, //  -> 240px
  width: 75, // -> 75px
  rotate: '.75turn',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## Unit conversion value

Converts and animates to a value with a different unit than the default or currently used one.

> Unit conversions may yield unexpected results with the JS `animate()` method depending on unit type and properties. For more predictable outcomes, define the unit via `utils.set()` first, then animate to the current unit, or use the WAAPI `animate()` method instead.

**Accepts:** `String`

```javascript
import { animate, utils } from 'animejs';

animate('.square', {
  width: '25%', // from '48px' to '25%',
  x: '15rem', // from '0px' to '15rem',
  rotate: '.75turn', // from `0deg` to '.75turn',
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## Relative value

Adds, subtracts or multiplies the current target value by a specified amount.

**Accepts:**

| Prefix | Effect | Examples |
|--------|--------|----------|
| `'+='` | Add | `'+=45'` \| `'+=45px'` |
| `'-='` | Subtracts | `'-=45'` \| `'-=45deg'` |
| `'*='` | Multiply | `'*=.5'` |

```javascript
import { animate, utils } from 'animejs';

const [ $clock ] = utils.$('.clock');
const [ $add ] = utils.$('.add');
const [ $sub ] = utils.$('.sub');
const [ $mul ] = utils.$('.mul');

const add = () => animate($clock, { rotate: '+=90' });
const sub = () => animate($clock, { rotate: '-=90' });
const mul = () => animate($clock, { rotate: '*=.5' });

$add.addEventListener('click', add);
$sub.addEventListener('click', sub);
$mul.addEventListener('click', mul);
```

```html
<div class="large centered row">
  <div class="clock"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button add">+ 90°</button>
    <button class="button sub">- 90°</button>
    <button class="button mul">× .5</button>
  </fieldset>
</div>
```

---

## Color value

Color values in several formats can be parsed and used as values for animatable color properties.

**Accepts:**

| Format | Syntax |
|--------|--------|
| HEX | `'#F44'` \| `'#FF4444'` |
| HEXA | `'#F443'` \| `'#FF444433'` |
| RGB | `'rgb(255, 168, 40)'` |
| RGBA | `'rgba(255, 168, 40, .2)'` |
| HSL | `'hsl(255, 168, 40)'` |
| HSLA | `'hsla(255, 168, 40, .2)'` |
| String name (WAAPI) | `'red'` \| `'aqua'` |

```javascript
import { animate } from 'animejs';

animate('.hex',  {
  background: '#FF4B4B',
});

animate('.rgb',  {
  background: 'rgb(255, 168, 40)',
});

animate('.hsl',  {
  background: 'hsl(44, 100%, 59%)',
});

animate('.hexa', {
  background: '#FF4B4B33',
});

animate('.rgba', {
  background: 'rgba(255, 168, 40, .2)',
});

animate('.hsla', {
  background: 'hsla(44, 100%, 59%, .2)',
});
```

```html
<div class="large justified row">
  <div class="circle hex"></div>
  <div class="circle rgb"></div>
  <div class="circle hsl"></div>
  <div class="circle hexa"></div>
  <div class="circle rgba"></div>
  <div class="circle hsla"></div>
</div>
```

---

## Color function value

The CSS `color()` function can be animated with the WAAPI `animate()` method.

**Accepts:** Any valid CSS color space syntax is supported

```javascript
import { waapi } from 'animejs';

waapi.animate('.circle',  {
  backgroundColor: 'color(display-p3 1.0 0.267 0.267 / 1.0)',
});
```

```html
<div class="large justified row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

---

## CSS variable

CSS variables can be used as animation values by simply passing the variable name with the `'var(--my-value)'` syntax.

> The JS animate() version requires computing the variable to animate its value. If the variable updates separately, call `.refresh()` to reflect the new value.

**Accepts:** CSS variable `String` using standard CSS custom properties syntax

```javascript
import { waapi, animate, stagger } from 'animejs';

waapi.animate('.square',  {
  rotate: 'var(--rotation)',
  borderColor: ['var(--hex-orange-1)', 'var(--hex-red-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
});

animate('.square',  {
  scale: 'var(--scale)',
  background: ['var(--hex-red-1)', 'var(--hex-orange-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

```css
.square {
  --rotation: 90deg;
  --scale: 1.5;
  border: 10px solid currentColor;
}
```

---

## Function based value

Sets different values for each target of a multi-target animation by using a `Function` as the value. Function-based values can be recalculated without creating a new animation using the `animation.refresh()` method.

**Function Parameters:**

| Name | Description |
|------|-------------|
| target | The current animated target element |
| index | The index of current targeted element |
| length | The total number of animated targets of the animation |

**Must Return:** Tween value or Tween parameters

```javascript
import { animate, utils } from 'animejs';

animate('.square', {
  x: $el => /** @type {HTMLElement} */($el).getAttribute('data-x'),
  y: (_, i) => 50 + (-50 * i),
  scale: (_, i, l) => (l - i) * .75,
  rotate: () => utils.random(-360, 360),
  borderRadius: () => `+=${utils.random(0, 8)}`,
  duration: () => utils.random(1200, 1800),
  delay: () => utils.random(0, 400),
  ease: 'outElastic(1, .5)',
});
```

```html
<div class="medium row">
  <div class="square" data-x="170"></div>
</div>
<div class="medium row">
  <div class="square" data-x="80"></div>
</div>
<div class="medium row">
  <div class="square" data-x="270"></div>
</div>
```

---

# Tween parameters

Tween parameters allow you to configure values, timings, and behaviors of animated properties.

Tween parameters function at the **property level**, controlling how individual animated values behave. They can be set globally across all properties or locally for specific ones.

All animatable properties inherit the global parameters, which can be overridden locally for a specific tween.

---

## to

Animates _to_ a specified value from the current target value. Must be defined inside a local tween parameter `Object`.

**Accepts:**

- Any valid Tween value types
- An `Array` of two Tween value keyframes (`[fromValue, toValue]`)

```javascript
import { animate } from 'animejs';

animate('.square', {
  x: {
    to: '16rem', // From 0px to 16rem
    ease: 'outCubic',
  },
  rotate: {
    to: '.75turn', // From 0turn to .75turn
    ease: 'inOutQuad'
  },
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## from

Animates _from_ a specified value to the current target value. Must be defined inside a local tween parameter `Object`.

**Required:** Only if no `to` property is defined

**Accepts:** Any valid Tween value types

**Default:** The current target value is used if only a `to` property is defined

```javascript
import { animate } from 'animejs';

animate('.square', {
  opacity: { from: .5 }, // Animate from .5 opacity to 1 opacity
  translateX: { from: '16rem' }, // From 16rem to 0rem
  rotate: {
    from: '-.75turn', // From -.75turn to 0turn
    ease: 'inOutQuad',
  },
});
```

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

## delay

Defines the delay in milliseconds at the beginning of all animated properties, or locally to a specific property.

**Accepts:**

- A `Number` equal to or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`

**Default:** The animation delay value (default `0`)

```javascript
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

```javascript
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    delay: 1000, // Local delay applied only to rotate property
  },
  delay: 500,  // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## duration

Specifies the duration in milliseconds for all animated properties or for a specific property within an animation.

**Accepts:**

- A `Number` equal to or greater than `0`
- A Function based value that returns a `Number` equal to or greater than `0`

> Values exceeding `1e12` or equal to `Infinity` are internally clamped to `1e12` (approximately 32 years).

**Default:** `1000`

```javascript
import { engine } from 'animejs';
engine.defaults.duration = 500;
```

```javascript
import { animate } from 'animejs';

const animation = animate('.square', {
  x: '17rem',
  rotate: {
    to: 360,
    duration: 1500, // Local duration only applied to rotate property
  },
  duration: 3000,  // Global duration applied to all properties
  loop: true,
  alternate: true
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## ease

Defines the easing function for all animated properties or a specific property. Easing functions control the rate of change of a property value over time, determining the animation's speed at different points during playback.

**Accepts:**

- An easing `Function`
- A built-in ease `String`
- A Function based value that returns an easing `Function` or built-in ease `String`

**Default:** `'out(2)'`

```javascript
import { engine } from 'animejs';
engine.defaults.ease = 'outElastic(1, .5)';
```

```javascript
import { animate, waapi, eases, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inQuad',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: eases.outQuad,
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: {
    to: 360,
    ease: 'out(6)',
  },
  ease: spring({ stiffness: 70 }),
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: 'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: eases.outQuad</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">x: spring()<br>rotate: 'inQuad'</div>
</div>
```

---

## composition

Defines how animations behave when another animation on the same target with the same property plays simultaneously. The composition mode can be defined globally for all animation properties or locally for a specific property.

**Accepts:**

| Mode | Description |
|------|-------------|
| `'replace'` | Replace and cancel the running animation. |
| `'none'` | Do not replace the running animation. This means the previous animation will continue running if its duration is longer than the new animation. |
| `'blend'` | Creates an additive animation and blends its values with the running animation. |
| `0` | Shorthand for `'replace'` |
| `1` | Shorthand for `'none'` |
| `2` | Shorthand for `'blend'` |

**Default:** `'replace'` if the animation targets count is below 1000; otherwise, the default composition is set to `'none'` on the JS version if no composition mode is defined.

```javascript
import { animate, utils } from 'animejs';

const squares = utils.$('.square');
const [ $none, $replace, $blend ] = squares;

squares.forEach($square => {
  const mode = $square.classList[1];
  animate($square, {
    scale: [.5, 1],
    alternate: true,
    loop: true,
    duration: 750,
    composition: mode,
  });
});
```

```html
<div class="large spaced-evenly row">
  <div class="col">
    <span class="label centered">none</span>
    <div class="square none"></div>
  </div>
  <div class="col">
    <span class="label centered">replace</span>
    <div class="square replace"></div>
  </div>
  <div class="col">
    <span class="label centered">blend</span>
    <div class="square blend"></div>
  </div>
</div>
```

---

## modifier

A `Function` that modifies or alters the behavior of the animated numerical value. Modifiers can be set globally for all animation properties or locally for a specific property.

**Accepts:** A `Function` with the following parameters:

| Name | Description |
|------|-------------|
| `value` | The current animated numerical value |

**Must Return:** `Number`

**Default:** `null`

```javascript
import { animate, utils } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  modifier: utils.round(0),
  duration: 4000,
});

animate('.row:nth-child(2) .square', {
  x: '85rem',
  modifier: v => v % 17,
  duration: 4000,
});

animate('.row:nth-child(3) .square', {
  x: '17rem',
  y: {
    to: '70rem',
    modifier: v => Math.cos(v) / 2,
  },
  duration: 4000,
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">utils.round(0)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => v % 17</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => Math.cos(v) / 2</div>
</div>
```

---

# Keyframes

Keyframes enable you to create a sequence of animations on the same animatable property.

## Property-Level Keyframes

Apply directly to individual properties using arrays. You can pass either tween values (e.g., `x: [0, 100, 200]`) or tween parameters (e.g., `x: [{to: 100}, {to: 200}]`). The animation progresses through each value sequentially over the specified duration.

## Animation-Level Keyframes

Defined within the animation configuration, these enable animating multiple properties per keyframe stage. Two formats exist:

- **Duration-based**: An array of objects where each represents a keyframe state, progressing equally across the animation duration.
- **Percentage-based**: An object with keys representing timeline positions (`'0%'`, `'50%'`, `'100%'`) mapped to property values, giving precise control over timing within the animation.

---

## Tween values keyframes

Sequences multiple Tween value specific to an Animatable property using an Array. The duration between each keyframe equals the total animation duration divided by the number of transitions between each keyframes.

**Accepts:** An Array of valid Tween values

```javascript
import { animate } from 'animejs';

animate('.square', {
  translateX: ['0rem', 0, 17, 17, 0, 0],
  translateY: ['0rem', -2.5, -2.5, 2.5, 2.5, 0],
  scale: [1, 1, .5, .5, 1, 1],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut',
  playbackEase: 'ouIn(5)',
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Tween parameters keyframes

Sequences multiple Tween parameters specific to an Animatable property. This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

**Accepts:** An `Array` of Tween parameters

```javascript
import { animate } from 'animejs';

animate('.square', {
  x: [
    { to: '17rem', duration: 700, delay: 400 },
    { to: 0, duration: 700, delay: 800 },
  ],
  y: [
    { to: '-2.5rem', ease: 'out', duration: 400 },
    { to: '2.5rem', duration: 800, delay: 700 },
    { to: 0, ease: 'in', duration: 400, delay: 700 },
  ],
  scale: [
    { to: .5, duration: 700, delay: 400 },
    { to: 1, duration: 700, delay: 800 },
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut',
  playbackEase: 'ouIn(5)',
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Duration based keyframes

Sequences multiple Animatable property one after another. This syntax provides fine control over animations by enabling access to `ease`, `delay`, `duration`, and `modifier` parameters for each individual keyframe. The default duration of a keyframe equals the total animation duration divided by the total number of keyframes.

**Accepts:** An `Array` of `Object` containing one Animatable property and Tween parameters

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', ease: 'out', duration: 400 },
    { x: '17rem', scale: .5, duration: 800 },
    { y: '2.5rem' },
    { x: 0, scale: 1, duration: 800 },
    { y: 0, ease: 'in', duration: 400 }
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut',
  playbackEase: 'ouIn(5)',
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## Percentage based keyframes

Sequences multiple Animatable properties with positions defined from a percentage of the animation total duration.

**Accepts:** An `Object` where:

- `keys` are `String` representing the percentages
- `values` are an `Object` containing at least one Animatable property and an optional `ease` parameter

The opening keyframe establishes the initial value for the animation.

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: {
    '0%'  : { x: '0rem', y: '0rem', ease: 'out' },
    '13%' : { x: '0rem', y: '-2.5rem', },
    '37%' : { x: '17rem', y: '-2.5rem', scale: .5 },
    '63%' : { x: '17rem', y: '2.5rem', scale: .5 },
    '87%' : { x: '0rem', y: '2.5rem', scale: 1 },
    '100%': { y: '0rem', ease: 'in' }
  },
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut',
  playbackEase: 'ouIn(5)',
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

# Playback settings

Animation playback settings control the overall timeline behavior of the animation.

The following settings are shared with Timer and work identically:

- **delay** - Time in ms before animation starts (default: `0`)
- **duration** - Animation duration in ms (default: `1000`)
- **loop** - Number of times animation repeats (default: `0`)
- **loopDelay** - Delay in ms between loops (default: `0`)
- **alternate** - Alternate direction on each loop (default: `false`)
- **reversed** - Start animation in reverse (default: `false`)
- **autoplay** - Play automatically (default: `true`)
- **frameRate** - Frames per second (default: `120`)
- **playbackRate** - Speed multiplier (default: `1`)

See the Timer documentation for detailed descriptions of these shared settings.

---

## playbackEase

Applies an easing function to the entire playback of the animation. Unlike the tween `ease` parameter applied between keyframes, `playbackEase` is applied globally across all keyframes.

**Accepts:** Easing function (same as `ease` parameter)

**Default:** `null`

```javascript
import { engine } from 'animejs';
engine.defaults.playbackEase = 'inOut';
```

```javascript
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', duration: 400 },
    { x: '17rem', rotate: 180, scale: .5 },
    { y: '2.5rem' },
    { x: 0, rotate: 360, scale: 1 },
    { y: 0, duration: 400 }
  ],
  duration: 4000,
  playbackEase: 'inOut(3)',
  loop: true,
});
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

## persist (WAAPI)

By default, WAAPI animations are automatically canceled and released from memory when they complete. The `persist` parameter keeps the animation active when it completes, enabling the use of methods on completed WAAPI animations.

**Accepts:** `Boolean`

**Default:** `false`

> For scroll-controlled WAAPI animations, `persist` is automatically set to `true`.

```javascript
import { waapi, utils } from 'animejs';

const [ $button ] = utils.$('.button');

const animationA = waapi.animate('.square-a', {
  x: '17rem',
  persist: false, // default
});

const animationB = waapi.animate('.square-b', {
  x: '17rem',
  persist: true,
});

const alaternateAnimations = () => {
  animationA.alternate().resume();
  animationB.alternate().resume();
};

$button.addEventListener('click', alaternateAnimations);
```

```html
<div class="medium row">
  <div class="square square-a"></div>
  <div class="padded label">persist: false</div>
</div>
<div class="medium row">
  <div class="square square-b"></div>
  <div class="padded label">persist: true</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

# Callbacks

Animation callbacks are shared with Timer. The following callbacks work identically:

- **onBegin** - Executes when animation starts
- **onComplete** - Executes when all iterations finish
- **onUpdate** - Executes on every frame
- **onLoop** - Executes when an iteration completes
- **onPause** - Executes when animation is paused
- **then()** - Returns a Promise that resolves on completion

See the Timer documentation for detailed descriptions of these shared callbacks.

Animation has two additional callbacks:

---

## onBeforeUpdate

Executes a function before updating the tween values, on every frames of a running animation at the specified `frameRate`.

**Accepts:** A `Function` whose first argument is the animation itself

**Default:** `noop`

```javascript
import { engine } from 'animejs';
engine.defaults.onBeforeUpdate = self => console.log(self.id);
```

```javascript
import { animate, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let mult = 1;
let updates = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  modifier: v => mult * v,
  loop: true,
  alternate: true,
  onBeforeUpdate: self => {
    $value.textContent = ++updates;
    mult = 1 - self.iterationProgress;
  }
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

## onRender

Executes a function every time an animation renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames.

**Accepts:** A `Function` whose first argument is the animation itself

**Default:** `noop`

```javascript
import { engine } from 'animejs';
engine.defaults.onRender = self => console.log(self.id);
```

```javascript
import { animate, utils } from 'animejs';

const [ $rendersLog ] = utils.$('.value');

let renders = 0;

const animation = animate('.circle', {
  x: '16rem',
  loopDelay: 1500,
  loop: true,
  alternate: true,
  onRender: self => $rendersLog.textContent = ++renders
});
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

---

# Methods

Animation methods are shared with Timer. The following methods work identically:

- **play()** - Forces animation to play forward
- **reverse()** - Forces animation to play backward
- **pause()** - Pauses a running animation
- **restart()** - Resets and plays from beginning
- **alternate()** - Toggles playback direction
- **resume()** - Resumes paused animation
- **complete()** - Completes animation instantly
- **reset()** - Resets to initial state
- **cancel()** - Removes from engine loop
- **revert()** - Cancels and reverts linked scroll observers
- **seek(time)** - Seeks to specific time
- **stretch(duration)** - Changes total duration

See the Timer documentation for detailed descriptions of these shared methods.

Animation has one additional method:

---

## refresh()

Re-computes animated properties values defined with a Function based value by updating the from values to the current target values, and the to values to the newly computed values.

> Only animatable property values are recalculated; duration and delay cannot be refreshed.

**Returns:** The animation itself, allowing it to be chained with other animation methods.

```javascript
import { animate, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const animation = animate('.square', {
  x: () => utils.random(0, 17) + 'rem',
  y: () => utils.random(-1, 1) + 'rem',
  rotate: () => utils.random(-360, 360, 1),
  scale: () => utils.random(.1, 1.5, 2),
  duration: 750,
  loop: true,
  onLoop: self => self.refresh()
});

const refreshAnimation = () => animation.refresh().restart();

$refreshButton.addEventListener('click', refreshAnimation);
```

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

---

# Properties

The following properties are available on Animation instances:

| Property | Type | Description |
|----------|------|-------------|
| **id** | String \| Number | Gets and sets the ID of the animation (JS only) |
| **targets** | Array | Gets the current animation targets |
| **currentTime** | Number | Gets and sets the global current time in ms of the animation |
| **iterationCurrentTime** | Number | Gets and sets the current iteration time in ms (JS only) |
| **deltaTime** | Number | Gets the time in ms elapsed between the current and previous frame (JS only) |
| **progress** | Number | Gets and sets the overall progress of the animation from 0 to 1 |
| **iterationProgress** | Number | Gets and sets the progress of the current iteration from 0 to 1 (JS only) |
| **currentIteration** | Number | Gets and sets the current iteration count (JS only) |
| **duration** | Number | Gets the total duration in ms of the animation |
| **speed** | Number | Gets and sets the speed multiplier of the animation |
| **fps** | Number | Gets and sets the fps of the animation (JS only) |
| **paused** | Boolean | Gets and sets whether the animation is paused |
| **began** | Boolean | Gets and sets whether the animation has started (JS only) |
| **completed** | Boolean | Gets and sets whether the animation has completed |
| **reversed** | Boolean | Gets and sets whether the animation is reversed (JS only) |
| **backwards** | Boolean | Gets whether the animation is currently playing backwards (JS only) |
