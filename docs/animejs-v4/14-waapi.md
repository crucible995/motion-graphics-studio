# Web Animation API

Anime.js offers a even more lightweight alternative (3KB versus 10KB) to the `animate()` method that uses the Web Animation `Element.animate()` API under the hood.

```javascript
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

```javascript
import { waapi } from 'animejs/waapi';
```

```javascript
import { waapi, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

waapi.animate(chars, {
  translate: `0 -2rem`,
  delay: stagger(100),
  duration: 600,
  loop: true,
  alternate: true,
  ease: 'inOut(2)',
});
```

---

## When to Use WAAPI

The Web Animations API (WAAPI) offers advantages over JavaScript `requestAnimationFrame` (RAF) powered animations, but both have strengths and downsides depending on animation type and context.

### Prioritize waapi.animate() When:

- Animating during CPU/network load (see hardware-accelerated animations section)
- Initial page load time is critical and every KB counts (3KB gzip vs 10KB for the JavaScript version)
- Animating complex CSS values not correctly handled by the JavaScript version, like CSS transform matrices or CSS color functions

### Use animate() When:

- Animating a large amount of targets (> 500)
- Animating JS/canvas/WebGL/WebGPU
- Animating SVG, DOM attributes or CSS properties not handled by the Web Animation API
- Animating complex timelines and keyframes
- Need more control methods
- Need more advanced callback functions

---

## Hardware-Accelerated Animations

One of the biggest advantages of WAAPI over `requestAnimationFrame` powered animations is the ability to run animations off the main thread, leading to smoother animations when the CPU is busy while consuming less power, which can improve battery life.

### Hardware-Accelerated Properties

**All major browsers support:**
- opacity
- transform
- translate
- scale
- rotate

**Some browsers support:**
- clip-path
- filter

Note: Safari (desktop and mobile) currently won't trigger hardware acceleration if the animation is using a custom `'linear()'` easing.

```javascript
import { animate, waapi, createTimer, utils, cubicBezier } from 'animejs';

const [ $block ] = utils.$('.button');

const waapiAnim = waapi.animate('.waapi.square', {
  translate: 270,
  rotate: 180,
  alternate: true,
  loop: true,
  ease: 'cubic-bezier(0, 0, .58, 1)',
});

const jsAnim = animate('.js.square', {
  x: 270,
  rotate: 180,
  ease: cubicBezier(0, 0, .58, 1),
  alternate: true,
  loop: true,
});

const blockCPUTimer = createTimer({
  onUpdate: () => {
    const end = Date.now() + 100;
    while(Date.now() < end) {
      Math.random() * Math.random();
    }
  },
  autoplay: false
});

let isBusy = false;

const toggleCPU = () => {
  blockCPUTimer[isBusy ? 'pause' : 'play']();
  $block.innerText = (isBusy ? 'block' : 'free') + ' CPU';
  isBusy = !isBusy;
}

$block.addEventListener('click', toggleCPU);
```

```html
<div class="medium row">
  <div class="waapi square"></div>
  <span class="padded label">WAAPI</span>
</div>
<div class="medium row">
  <div class="js square"></div>
  <span class="padded label">JS</span>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Block CPU</button>
  </fieldset>
</div>
```

---

## Improvements to the Web Animation API

The `waapi.animate()` method adds lots of quality of life improvements and greatly improves the overall experience of using WAAPI.

- Sensible defaults
- Multi-targets animation
- Default units
- Function based values
- Individual transforms
- Individual property params
- Spring and custom easings

---

## API Differences with Native WAAPI

**Anime.js Syntax:**

```javascript
waapi.animate('.square', {
  x: 100, y: 50, opacity: .5,
  loop: 3, alternate: true, ease: 'out'
});
```

**Native WAAPI Syntax:**

```javascript
$square.animate({
  translate: '100px 50px', opacity: .5
}, {
  iterations: 4, direction: 'alternate', easing: 'ease-out'
});
```

Key differences:
- `iterations` → `loop`
- `direction` → `alternate`
- `easing` → `ease`
- `finished` → `then()`

---

## waapi.convertEase()

Converts any JavaScript easing functions into a compatible WAAPI linear easing.

**Returns:** A linear easing string compatible with Web Animation API.

```javascript
import { waapi, spring } from 'animejs';

const springEase = spring({ stiffness: 12 });

const linearEasing = waapi.convertEase(springEase.ease);
```

```javascript
import { waapi, spring } from 'animejs';

const springs = [
  spring({ stiffness: 100 }),
  spring({ stiffness: 150 }),
  spring({ stiffness: 200 })
]

document.querySelectorAll('#web-animation-api-waapi-convertease .demo .square').forEach(($el, i) => {
  $el.animate({
    translate: '17rem',
    rotate: '1turn',
  }, {
    easing: waapi.convertEase(springs[i].ease),
    delay: i * 250,
    duration: springs[i].duration,
    fill: 'forwards'
  });
});
```
