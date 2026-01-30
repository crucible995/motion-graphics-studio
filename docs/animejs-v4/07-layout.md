# Layout NEW

Automatically animates between two HTML layout states, allowing you to easily animate properties that are normally impossible or hard to animate like CSS display, flex direction, grid settings, and DOM order.

```javascript
import { createLayout, utils, stagger } from 'animejs';

const layout = createLayout('.layout-container');

let i = 0;

function animateLayout() {
  return layout.update(({ root }) => {
    root.dataset.grid = (++i % 4) + 1;
  }, {
    duration: 1000,
    delay: stagger(150),
    onComplete: () => animateLayout()
  });
}

const layoutAnimation = animateLayout();
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout" data-grid="1">
    <div class="item">Item A</div>
    <div class="item">Item B</div>
    <div class="item">Item C</div>
    <div class="item">Item D</div>
  </div>
</div>
```

| Name | Accepts |
|------|---------|
| root | CSS selector \| DOM element |
| parameters (opt) | Object of Layout settings & Layout states parameters |

**Returns:** `AutoLayout`

---

## Layout Usage

### Specifying a root

The root is the only mandatory parameter needed to create a layout. It defines the root element measured by the layout, and limits all children queries to descendants of that element.

By default all children of a layout are animated, and elements outside the root can be targeted by manually defining layout id data attributes.

| Property | Value |
|----------|-------|
| **Accepts** | CSS selector or DOM element |
| **Default** | Required |

```javascript
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB);

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">A 1</div>
    <div class="item col">A 2</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">B 1</div>
    <div class="item col">B 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate A</button>
    <button class="button">Animate B</button>
  </fieldset>
</div>
```

### CSS display property animation

An `AutoLayout` can automatically animate between CSS display properties, like `flex`, `grid` or `none`. It's also possible to define custom entering and leaving states for children elements that get hidden with `display: none` or `visibility: hidden`.

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const items = utils.$('.item');

const displayClasses = [
  'flex-row',
  'grid-1',
  'flex-col',
  'none',
  'grid-2',
  'flex-row-reverse',
];

const layout = createLayout('.layout-container', {
  // Custom animation state for elements leaving the layout with display: none
  leaveTo: {
    transform: 'scale(0)',
    delay: stagger(75),
  },
});

let index = 0;

function animateLayout() {
  layout.update(({ root }) => {
    root.classList.remove(displayClasses[index]);
    index++;
    if (index > displayClasses.length - 1) index = 0;
    root.classList.add(displayClasses[index]);
    $button.innerText = displayClasses[index];
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container flex-row">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">flex-row</button>
  </fieldset>
</div>
```

### Staggered layout animation

The `AutoLayout` `delay` property accepts the `stagger()` utility method to easily create staggered animations of layout children changes.

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $root ] = utils.$('.layout-container');
const items = utils.$('.item');

const layout = createLayout($root, { ease: 'outExpo' });

function animateLayout() {
  layout.update(() => {
    $root.classList.toggle('row');
  }, {
    // Different stagger "from" param depending on the layout state
    delay: stagger(50, { from: $root.classList.contains('row') ? 'last' : 'first' })
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
    <div class="item col">Item D</div>
    <div class="item col">Item E</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Stagger animation</button>
  </fieldset>
</div>
```

### DOM order change animation

Automatically animates DOM order changes.

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  layout.update(({ root }) => {
    const items = [...root.querySelectorAll('.item')];
    utils.shuffle(items).forEach($el => root.appendChild($el))
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container row">
    <div class="item col">A</div>
    <div class="item col">B</div>
    <div class="item col">C</div>
    <div class="item col">D</div>
    <div class="item col">E</div>
    <div class="item col">F</div>
    <div class="item col">G</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Shuffle</button>
  </fieldset>
</div>
```

### Enter layout animation

Automatically animates elements entering the layout, and optionally specifies initial properties and timings using the `enterFrom` state parameters (default opacity: 0).

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

### Exit layout animation

Automatically animates elements leaving the layout, and optionally specifies their final properties and timings using the `leaveTo` state parameters (defaults to opacity: 0).

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350,
    ease: 'out(3)'
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden');
  }).then(() => {
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

### Swap parent animation

Automatically animates children elements being moved from one parent to another.

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    const $child = root.querySelector('.item');
    const $parent = $child.parentElement;
    const $nextParent = $parent.nextElementSibling || $parent.previousElementSibling;
    $parent.style.zIndex = '0';
    $nextParent.style.zIndex = '1';
    $nextParent.appendChild($child);
  })
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Swap parent</button>
  </fieldset>
</div>
```

```css
#layout-usage-swap-parent-animation .container-b {
  flex: 2;
}
```

### Modal dialog animation

Easily create seamless transitions between a clickable element and its expanded version inside a modal. You can even animate from elements outside of the specified root by using a combination of layout ids and specifying children.

```javascript
import { createLayout, utils } from 'animejs';

const buttons = utils.$('button');

// Create demo dialog and append it to the body
const $dialog = document.createElement('dialog');
$dialog.id = 'layout-dialog';
document.body.appendChild($dialog);

// Create the modal layout by setting the dialog as the root
// Since the elements are not yet part of the modal root, it's necessary to specify all animated children
// to tell the layout what to look for during an update
const modalLayout = createLayout($dialog, {
  children: ['.item', 'h2', 'h3', 'p'],
  properties: ['--overlay-alpha'],
});

const closeModal = (e) => {
  let $item;
  modalLayout.update(({ root }) => {
    $dialog.close();
    $item = buttons.find(item => item.classList.contains('is-open'));
    $item.classList.remove('is-open'); // Makes the clicked element visible again
    $item.focus(); // Focus to the closed element to preserve the keyboard navigation flow
  });
};

const openModal = e => {
  const $target = e.target;
  const $item = $target.closest('.item');
  const $clone = $item.cloneNode(true);
  $dialog.innerHTML = ''; // Make sure old clones are removed from the modal before adding a new one
  $dialog.appendChild($clone); // Append the clicked element clone to the modal
  modalLayout.update(() => {
    $dialog.showModal(); // Open the modal
    $item.classList.add('is-open'); // Hide the clicked element
  }, {
    duration: $item.dataset.duration // Custom duration depending of the button clicked
  });
}

buttons.forEach($button => $button.addEventListener('click', openModal));
$dialog.addEventListener('cancel', closeModal);
$dialog.addEventListener('click', closeModal);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <button data-layout-id="A" data-duration="500" class="button item col">
      <h2 data-layout-id="A-title">Item A</h2>
      <h3 data-layout-id="A-duration">(500ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="B" data-duration="1000" class="button item col">
      <h2 data-layout-id="B-title">Item B</h2>
      <h3 data-layout-id="B-duration">(1000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
    <button data-layout-id="C" data-duration="2000" class="button item col">
      <h2 data-layout-id="C-title">Item C</h2>
      <h3 data-layout-id="B-duration">(2000ms)</h3>
      <p>This p tag is hidden by default and only visible when appended inside the dialog element. Its position and opacity are automatically animated.</p>
    </button>
  </div>
</div>
```

```css
#layout-dialog {
  --overlay-alpha: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  max-width: 100%;
  max-height: 100%;
  border: none;
  background: transparent;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--hex-black-1), transparent var(--overlay-alpha));
}

#layout-dialog[open] {
  --overlay-alpha: 40%;
  pointer-events: auto;
}

#layout-dialog::backdrop {
  background: transparent;
}

#layout-dialog .item {
  position: relative;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  width: 22rem;
  height: 14.5rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--hex-green-6);
  font-size: 1rem;
  color: var(--hex-green-6);
  background-color: var(--hex-green-1);
}

#layout-dialog[open] .item {
  visibility: visible;
}

#layout-dialog .item h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  will-change: font-size;
  text-wrap: nowrap;
}

#layout-dialog .item h3 {
  position: absolute;
  top: 2.9rem;
  right: 2rem;
}

#layout-usage-animate-modal-dialog .item {
  cursor: pointer;
}

#layout-usage-animate-modal-dialog .item.is-open {
  visibility: hidden;
}

#layout-usage-animate-modal-dialog .item p {
  text-align: left;
  display: none;
}

#layout-dialog .item p {
  padding-top: 1rem;
  border-top: 1px solid currentColor;
}

#layout-dialog[open] .item p {
  display: block;
}
```

---

## Layout Settings

### children

Targets which elements of the root must have their position / dimensions and specified properties animated. Descendants of specified children are considered 'frozen', and only 'swap' state at 50% of their parent transition.

This setting is primarily used to avoid animating elements containing text that reflows during transitions, and to target child elements added during the animation phase using the layout id data-attribute.

| Property | Value |
|----------|-------|
| **Accepts** | CSS selector<br>DOM element<br>NodeList or `Array<DOMTargetSelector>` |
| **Default** | `'*'` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithoutFade = () => animateLayout({ opacity: 1 });
const animateWithFade = () => animateLayout({ opacity: 0 });

$buttonA.addEventListener('click', animateWithoutFade);
$buttonB.addEventListener('click', animateWithFade);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not targeted</p></div>
    <div class="item col"><p>So they simply swap between states</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate without fade</button>
    <button class="button">Animate with fade</button>
  </fieldset>
</div>
```

### delay

Defines the default delay in milliseconds of all animated layout animations. Compatible with the `stagger()` utility function.

| Property | Value |
|----------|-------|
| **Accepts** | `Number`<br>Function based value that returns a `Number` equal to or greater than `0` |
| **Default** | `0` |

```javascript
import { createLayout, utils, stagger } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  delay: 500 // Delays the transition by 500ms
});

function animateLayout(delay) {
  // You can override the layout delay in the update() method too
  layout.update(({ root }) => root.classList.toggle('row'), { delay });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(stagger(150));

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">500 ms delay</button>
    <button class="button">Staggered delay</button>
  </fieldset>
</div>
```

### duration

Defines the duration in milliseconds of all animated layout elements. Compatible with the `stagger()` utility function.

| Property | Value |
|----------|-------|
| **Accepts** | `Number` equal to or greater than `0`<br>Function based value that returns a `Number` equal to or greater than `0` |
| **Default** | `350` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB, { duration: 1000 });

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">default</div>
    <div class="item col">duration</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">1000ms</div>
    <div class="item col">duration</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate default</button>
    <button class="button">Animate 1000ms</button>
  </fieldset>
</div>
```

### ease

Sets the default easing curve or spring applied to every animation during a layout transition.

| Property | Value |
|----------|-------|
| **Accepts** | An easing `Function`<br>A built-in ease `String`<br>A Function based value that returns an easing `Function` or built-in ease `String` |
| **Default** | `'inOut(3.5)'` |

```javascript
import { createLayout, utils, spring } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  ease: 'outExpo'
});

function animateLayout(ease) {
  // You can override the layout default ease in the update() method parameters
  layout.update(({ root }) => root.classList.toggle('row'), { ease });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(spring());

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">'outExpo'</button>
    <button class="button">spring()</button>
  </fieldset>
</div>
```

### properties

Extends the list of CSS properties automatically measured and animated during layout transitions. Position and dimensions are always handled internally. Use this to add custom properties like CSS variables or properties not included in the defaults.

| Property | Value |
|----------|-------|
| **Accepts** | Array of CSS property name Strings (including CSS custom properties like `'--my-var'`) |
| **Default** | `['opacity', 'fontSize', 'color', 'backgroundColor', 'borderRadius', 'border', 'filter', 'clipPath']` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 800,
  properties: ['boxShadow']
});

function animateLayout() {
  layout.update(({ root }) => root.classList.toggle('row'));
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container grid-layout row">
    <div class="item col">animate</div>
    <div class="item col">box-shadow</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate</button>
  </fieldset>
</div>
```

---

## Layout States Parameters

### enterFrom

Defines the initial properties and transition timings applied to elements entering the layout. An element is considered entering if one of these conditions is met:

- The element becomes visible from `display: none`
- The element becomes visible from `visibility: hidden`
- The element has just been added to the layout (e.g. `$root.appendChild($el)`)

| Property | Value |
|----------|-------|
| **Accepts** | An `Object` parameters with the following properties:<br>- CSS property names: `Number\|String\|Function`<br>- `delay`: `Number\|Function`<br>- `duration`: `Number\|Function`<br>- `ease`: `String\|Function` |
| **Default** | `{ opacity: 0 }` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350,
    ease: 'out(3)'
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

### leaveTo

Defines the final properties and transition timings applied to elements leaving the layout. An element is considered leaving if one of these conditions is met:

- The element becomes hidden with `display: none`
- The element becomes hidden with `visibility: hidden`

Any valid CSS property can be set. State animations don't support CSS transform shorthands yet.

| Property | Value |
|----------|-------|
| **Accepts** | An `Object` parameters with the following properties:<br>- CSS property names: `Number\|String\|Function`<br>- `delay`: `Number\|Function`<br>- `duration`: `Number\|Function`<br>- `ease`: `String\|Function` |
| **Default** | `{ opacity: 0 }` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350,
    ease: 'out(3)'
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden');
  }).then(() => {
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

### swapAt

Defines the mid-transition properties applied to non-animated children of animated elements. The animation interpolates to these values at 50% progress, then back to the element's computed state.

Any valid CSS property can be set. State animations do not support CSS transform shorthands.

| Property | Value |
|----------|-------|
| **Accepts** | An `Object` with:<br>- CSS property names: `Number\|String\|Function`<br>- `delay`: `Number\|Function`<br>- `duration`: `Number\|Function`<br>- `ease`: `String\|Function` |
| **Default** | `{ opacity: 0, ease: 'inOut(1.75)' }` |

```javascript
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithFade = () => animateLayout({ opacity: 0, filter: 'blur(3px)' });
const animateWithoutFade = () => animateLayout({ opacity: 1 });

$buttonA.addEventListener('click', animateWithFade);
$buttonB.addEventListener('click', animateWithoutFade);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not animated</p></div>
    <div class="item col"><p>They only swap at 50% progress</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate with fade</button>
    <button class="button">Animate without fade</button>
  </fieldset>
</div>
```

---

## Layout Methods

### record()

Record a layout snapshot that will be used as the initial state of the next animation created with `animate()`.

**Returns:** `AutoLayout`

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate();
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

### animate()

Compares the last `record()` snapshot with the latest measurements and returns a `Timeline` that automatically animates every changed property between the two states.

Accepts an optional Object of animation parameters to override default layout timing and easing for this specific transition.

**Returns:** `Timeline`

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate({
    duration: 750,
    ease: 'out(4)',
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

### update()

One-call helper that runs `record()`, executes your DOM mutations, and calls `animate()` with optional overrides.

**Note:** This may not work in some frameworks. Use the manual `record()` / `.animate()` combo as an alternative.

| Name | Type | Description |
|------|------|-------------|
| callback | `Function` | A callback function to update the layout |
| parameters (opt) | `Object` | Animation parameters to override default layout timing and easing |

**Returns:** `Timeline`

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Triggers both layout.record() and layout.animate()
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
  }, {
    duration: 750,
    ease: 'out(4)',
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">update()</button>
  </fieldset>
</div>
```

### revert()

Completes all currently running layout animations, reverting the DOM to its actual current state.

**Returns:** `AutoLayout`

```javascript
import { createLayout, utils } from 'animejs';

const [ $animate, $revert ] = utils.$('.controls button');

const layout = createLayout('.layout-container', { duration: 5000, ease: 'out(3)' });

function animateLayout() {
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
    $revert.disabled = false;
  }).then(() => $revert.disabled = true);
}

function revertLayout() {
  layout.revert();
}

$animate.addEventListener('click', animateLayout);
$revert.addEventListener('click', revertLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">animate()</button>
    <button class="button" disabled>revert()</button>
  </fieldset>
</div>
```

---

## Layout id attribute

Layout ids can be manually defined using a `data-layout-id` attribute. When two elements share the same id, with one hidden and the other visible, the layout automatically animates between them. This enables animation between DOM elements in different locations without cloning or moving them.

```javascript
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $itemA1, $itemA2 ] = utils.$('.item');

// Manually set the same layout id to both items
$itemA1.dataset.layoutId = "item-A";
$itemA2.dataset.layoutId = "item-A";

// Hide item 2
$itemA2.classList.add('is-hidden');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    // Toggle the visibility and alternate between the two items
    $itemA1.classList.toggle('is-hidden');
    $itemA2.classList.toggle('is-hidden');
  });
}

$button.addEventListener('click', animateLayout);
```

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
    <div class="item col">Item A</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Toggle visibility</button>
  </fieldset>
</div>
```

---

## Layout Callbacks

Layout animations inherit all Timeline callbacks, allowing you to execute functions at specific points during playback like you would with a regular Timeline.

Available callbacks: `onBegin`, `onUpdate`, `onComplete`

The `.then()` method is available on the `Timeline` returned by `.update()` or `.animate()`.

```javascript
import { createLayout } from 'animejs';

createLayout(root, {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

---

## Layout Properties

Properties available on the `AutoLayout` instance returned by `createLayout()`.

| Name | Description |
|------|-------------|
| params | Configuration object passed to `createLayout()` |
| root | Resolved root element where measurements start (`HTMLElement`) |
| children | Selector(s) used to find tracked elements each time `.record()` runs |
| enterFromParams | Animation parameters for nodes entering the layout (`Object`) |
| leaveToParams | Animation parameters for nodes leaving the layout (`Object`) |
| swapAtParams | Animation parameters for nodes swapping during a layout transition |
| properties | Set of CSS property names interpolated whenever their values change |
| oldState | `LayoutSnapshot` objects containing previous measurements |
| newState | `LayoutSnapshot` objects containing latest measurements |
| timeline | Timeline instance returned by the last `.animate()` / `.update()` call |
| animating | Arrays of DOM nodes animated during latest `.animate()` call |
| swapping | Arrays of DOM nodes swapped during the latest `.animate()` call |
| entering | Arrays of DOM nodes entering during the latest `.animate()` call |
| leaving | Arrays of DOM nodes leaving during the latest `.animate()` call |
| id | Incremental identifier useful for debugging (`Number`) |

---

## Common Gotchas

### Some elements are fading out unexpectedly

When using a `children` selector, elements that are descendants of matched children (but not targets themselves) will only get their state updated at 50% of the transition progress. To avoid hard cut between the two states, these elements are fading to opacity 0 then back to 1 under these conditions:

- The element is not explicitly targeted by the `children` selector
- The element's size has changed
- Its parent is a target and the parent's size has also changed

**Workaround:** Either add the elements you want to keep visible to the `children` selectors array. Or change the `swapAt` parameter to `opacity: 1`.

### My text is jumping during a layout transition

Animating `fontSize` alongside `width` or `height` can cause text to reflow mid-animation, especially in Firefox. Even if the start and end states have identical line breaks, intermediate frames may have a width/font-size ratio that triggers wrapping.

**Workaround:** Use `white-space: nowrap` on the element if text wrapping isn't needed.

### My inline elements are not animated

Elements adjacent to text nodes are excluded from the animations. This prevents breaking text flow when elements like `<span>` or `<a>` are mixed with text content.

**Workaround:** Wrap text elements in span tags.

### Transform shorthands are not working

The `enterFrom`, `leaveTo`, and `swapAt` parameters do not support CSS transform shorthands like `scale`, `rotate`, `x`, `y` etc.

**Workaround:** Use the `transform` property with a full transform string.

### SVG elements are not animated

SVG elements and their descendants are excluded from layout animations. Only HTML elements are tracked and animated.
