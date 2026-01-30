# Text

A collection of utility functions to help with text animations.

```javascript
import { text } from 'animejs';

text.splitText();
```

```javascript
import { splitText } from 'animejs';
```

```javascript
import { splitText } from 'animejs/text';
```

---

## splitText()

A lightweight, responsive and accessible text utility function to split, clone and wrap lines, words and characters of an HTML Element.

| Name | Accepts |
|------|---------|
| target | A valid CSS selector `String` \| `HTMLElement` |
| parameters (opt) | An `Object` of TextSplitter settings |

**Returns:** `TextSplitter`

```javascript
import { createTimeline, stagger, utils, splitText } from 'animejs';

const { words, chars } = splitText('p', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
}, stagger(125))
.add(chars, {
  y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();
```

```html
<div class="large centered grid square-grid">
  <p class="text-xl">
    All-in-one text splitter<br>
    テキストスプリッター
  </p>
</div>
```

```css
#text-split .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
  line-height: 1.35;
}
```

---

## TextSplitter Settings

### lines

Defines if and how the lines should be split. Split line elements are accessed via an array returned by the `lines` property of a `TextSplit` instance.

By default, each line receives a span wrapper with `display: block` styling and a `data-line` attribute:

```html
<span style="display: block;" data-line="0">This is the first line</span>
<span style="display: block;" data-line="1">This is the second line</span>
<span style="display: block;" data-line="2">This is the third line</span>
```

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean`<br>`Object` of Split parameters<br>HTML template `String` |
| **Default** | `false` |

```javascript
import { animate, splitText, stagger } from 'animejs';

splitText('p', {
  lines: { wrap: 'clip' },
})
.addEffect(({ lines }) => animate(lines, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(200),
  loop: true,
  loopDelay: 500,
}));
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by lines.<br>線で分割します。</p>
</div>
<div class="small row"></div>
```

### words

Defines if and how the words should be split. Split word elements are accessed via an array returned by the `words` property of a `TextSplit` instance.

By default, each word receives a span wrapper with `display: inline-block` styling and `data-line` and `data-word` attributes:

```html
<span style="display: inline-block;" data-line="0" data-word="0">Split</span>
<span style="display: inline-block;" data-line="0" data-word="1">by</span>
<span style="display: inline-block;" data-line="0" data-word="2">words</span>
```

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean`<br>`Object` of Split parameters<br>HTML template `String` |
| **Default** | `true` |

```javascript
import { animate, splitText, stagger } from 'animejs';

const { words } = splitText('p', {
  words: { wrap: 'clip' },
})

animate(words, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
});
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="small row"></div>
```

### chars

Defines if and how the chars should be split. Split characters elements are accessed via an array returned by the `chars` property of a `TextSplit` instance.

By default, each character wraps in a span with inline-block display and data attributes:

```html
<span style="display: inline-block;" data-line="0" data-word="0" data-char="0">H</span>
```

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean`<br>`Object` of Split parameters<br>HTML template `String` |
| **Default** | `false` |

```javascript
import { animate, splitText, stagger } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: 'clip' },
});

animate(chars, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
});
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="small row"></div>
```

### debug

Toggles debug CSS styles on the split elements to better visualize the wrapper elements. Lines are outlined in green, words in red, characters in blue.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `false` |

```javascript
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let debug = false;
let split;

const toggleDebug = () => {
  if (split) split.revert();
  debug = !debug;
  split = splitText($p, {
    lines: true,
    chars: true,
    words: true,
    debug: debug,
  });
}

toggleDebug();

$button.addEventListener('click', toggleDebug);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle debug</button>
  </fieldset>
</div>
```

### includeSpaces

Defines whether whitespace should be included in the split elements.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `false` |

```javascript
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let includeSpaces = true;
let split;

const toggleSpaces = () => {
  if (split) split.revert();
  includeSpaces = !includeSpaces;
  split = splitText($p, {
    debug: true,
    includeSpaces: includeSpaces,
  });
}

toggleSpaces();

$button.addEventListener('click', toggleSpaces);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>Include spaces or not.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle spaces</button>
  </fieldset>
</div>
```

### accessible

Creates an accessible cloned element that preserves the structure of the original split element.

| Property | Value |
|----------|-------|
| **Accepts** | `Boolean` |
| **Default** | `true` |

```javascript
import { createTimeline, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const split = splitText('p', { debug: true });
const $accessible = split.$target.firstChild;

$accessible.style.cssText = `
  opacity: 0;
  position: absolute;
  color: var(--hex-green-1);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  outline: currentColor dotted 1px;
`;

const showAccessibleClone = createTimeline({
  defaults: { ease: 'inOutQuad' },
})
.add($accessible, {
  opacity: 1,
  z: '-2rem',
}, 0)
.add('p', {
  rotateX: 0,
  rotateY: 60
}, 0)
.add(split.words, {
  z: '6rem',
  opacity: .75,
  outlineColor: { from: '#FFF0' },
  duration: 750,
  delay: stagger(40, { from: 'random' })
}, 0)
.init();

const toggleAccessibleClone = () => {
  showAccessibleClone.alternate().resume();
}

$button.addEventListener('click', toggleAccessibleClone);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle accessible</button>
  </fieldset>
</div>
```

```css
.docs-demo.is-active #text-splittext-textsplitter-settings-accessible .docs-demo-template {
  opacity: 0;
}

#text-splittext-textsplitter-settings-accessible .large.row {
  perspective: 600px;
}

#text-splittext-textsplitter-settings-accessible .text-xl {
  transform-style: preserve-3d;
}
```

---

## Split Parameters

### class

Specifies a custom CSS class applied to all split elements.

| Property | Value |
|----------|-------|
| **Accepts** | `String`<br>`null` |
| **Default** | `null` |

```javascript
import { animate, stagger, splitText } from 'animejs';

splitText('p', {
  chars: { class: 'split-char' },
});

animate('.split-char', {
  y: ['0rem', '-1rem', '0rem'],
  loop: true,
  delay: stagger(100)
});
```

```html
<div class="large centered row">
  <p class="text-xl">Custom CSS class.</p>
</div>
<div class="small row"></div>
```

```css
.split-char {
  color: var(--hex-current-1);
  background-color: var(--hex-current-3);
  outline: 1px solid var(--hex-current-2);
  border-radius: .25rem;
}
```

Output structure:

```html
<span class="my-custom-class" style="display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```

### wrap

Adds an extra wrapper element with the specified CSS `overflow` property to all split elements.

| Property | Value |
|----------|-------|
| **Accepts** | `'hidden'` \| `'clip'` \| `'visible'` \| `'scroll'` \| `'auto'`<br>`Boolean` (`true` is equivalent to `'clip'`)<br>`null` |
| **Default** | `null` |

```javascript
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: true },
});

animate(chars, {
  y: ['75%', '0%'],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
  alternate: true,
});
```

```html
<div class="large centered row">
  <p class="text-xl">Split and wrap text.</p>
</div>
<div class="small row"></div>
```

Output structure:

```html
<span style="overflow: clip; display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```

### clone

Clones the split elements in the specified direction by wrapping the lines, words, or characters within an HTML structure and setting the `top` and `left` CSS properties accordingly.

| Property | Value |
|----------|-------|
| **Accepts** | `'left'` \| `'top'` \| `'right'` \| `'bottom'` \| `'center'`<br>`Boolean` (`true` is equivalent to `'center'`)<br>`null` |
| **Default** | `null` |

Output structure:

```html
<span style="position: relative; display: inline-block;">
  <span style="display: inline-block;">word</span>
  <span style="position: absolute; top: 100%; left: 0px; white-space: nowrap; display: inline-block;">word</span>
</span>
```

```javascript
import { createTimeline, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: {
    wrap: 'clip',
    clone: 'bottom'
  },
});

createTimeline()
.add(chars, {
  y: '-100%',
  loop: true,
  loopDelay: 350,
  duration: 750,
  ease: 'inOut(2)',
}, stagger(150, { from: 'center' }));
```

```html
<div class="large centered row">
  <p class="text-xl">Split and clone text.</p>
</div>
<div class="small row"></div>
```

---

## TextSplitter Methods

### addEffect()

Preserves animations and callbacks state between splits when splitting by lines, and allows reverting all split animations at once using split.revert().

An effect's animation or callback automatically refreshes when splitText() is called and document.fonts.ready resolves, or when splitting by lines and the target element's width changes.

| Name | Accepts |
|------|---------|
| effect | A `Function` whose first argument is the `SplitText` itself and can return either an Animation, Timeline, Timer or an optional cleanup function that is called before every subsequent lines calculation. |

**Returns:** The `TextSplitter` itself

```javascript
import { animate, utils, stagger, splitText } from 'animejs';

const colors = [];

splitText('p', {
  lines: true,
})
.addEffect(({ lines }) => animate(lines, {
  y: ['50%', '-50%'],
  loop: true,
  alternate: true,
  delay: stagger(400),
  ease: 'inOutQuad',
}))
.addEffect(split => {
  split.words.forEach(($el, i) => {
    const color = colors[i];
    if (color) utils.set($el, { color });
    $el.addEventListener('pointerenter', () => {
      animate($el, {
        color: utils.randomPick(['#FF4B4B', '#FFCC2A', '#B7FF54', '#57F695']),
        duration: 250,
      })
    });
  });
  return () => {
    split.words.forEach((w, i) => colors[i] = utils.get(w, 'color'));
  }
});
```

```html
<div class="iframe-content resizable">
  <div class="medium centered row">
    <p class="text-l">Hover the words to animate their color, then resize the text.</p>
  </div>
</div>
```

### revert()

Reverts the split target html back to its original state, removing debug styles and reverting all animations added with `split.addEffect()` in the process.

**Returns:** `TextSplitter`

```javascript
import { animate, stagger, splitText, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  words: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['100%', '0%'],
  duration: 1250,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
  alternate: true,
}));

const revertSplit = () => {
  split.revert();
  $button.setAttribute('disabled', 'true');
}

$button.addEventListener('click', revertSplit);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Revert</button>
  </fieldset>
</div>
```

### refresh()

Manually splits the text again, taking into account any parameters changes.

**Returns:** `TextSplitter`

```javascript
import { animate, stagger, splitText, utils } from 'animejs';

const [ $add, $remove ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  lines: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['0%', '75%'],
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
  delay: stagger(150)
}));

const words = ['sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'tortor', 'lectus', 'aliquet'];

const addRandomWord = () => {
  split.html += ' ' + utils.randomPick(words);
  split.refresh();
}

const removeRandomWord = () => {
  const words = split.words.map(w => w.innerHTML);
  split.html = (words.splice(utils.random(0, words.length - 1), 1), words).join(' ');
  split.refresh();
}

$add.addEventListener('click', addRandomWord);
$remove.addEventListener('click', removeRandomWord);
```

```html
<div class="large centered row">
  <p class="text-xl">Lorem ipsum dolor</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add word</button>
    <button>Remove word</button>
  </fieldset>
</div>
```

---

## TextSplitter Properties

Properties available on the `TextSplitter` instance returned by a `splitText()` function.

| Name | Description |
|------|-------------|
| $target | Gets the split root element (`HTMLElement`) |
| html | Gets the html to split (`String`) |
| debug | Gets if the debug styles are visible or not (`Boolean`) |
| includeSpaces | Gets if the spaces should be wrapped within the text (`Boolean`) |
| accessible | Gets if the accessible clone element should be created (`Boolean`) |
| lines | Gets the lines elements (`Array<HTMLElement>`) |
| words | Gets the words elements (`Array<HTMLElement>`) |
| chars | Gets the chars elements (`Array<HTMLElement>`) |
| lineTemplate | The line html template (`String`) |
| wordTemplate | The word html template (`String`) |
| charTemplate | The char html template (`String`) |
