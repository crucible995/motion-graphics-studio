// Kurzgesagt Animation Generator
// Uses OpenRouter with Claude Opus 4.5 to generate Anime.js v4 animations

// Verify Anime.js is loaded
console.log('Anime.js check:', {
  anime: typeof anime,
  animeObj: typeof window.anime,
  createTimeline: typeof anime?.createTimeline,
  stagger: typeof anime?.stagger
});

if (typeof anime === 'undefined') {
  console.error('Anime.js not loaded! Check the CDN script.');
}

const OPENROUTER_API_KEY = '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';
const MODEL = 'anthropic/claude-opus-4.5';
const TEMPERATURE = 0.7;

// Kurzgesagt-inspired color palette for animations
const KURZGESAGT_COLORS = {
  backgrounds: ['#0f0f23', '#1a1a2e', '#16213e', '#1e3a5f'],
  primary: ['#4fc3f7', '#29b6f6', '#03a9f4', '#039be5'],
  accent: ['#ff9f43', '#ff6b9d', '#a55eea', '#26de81', '#fed330'],
  warm: ['#ff6b6b', '#ee5a24', '#f39c12', '#e74c3c'],
  cool: ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe'],
  bio: ['#00b894', '#55efc4', '#81ecec', '#00cec9'],
  neutral: ['#dfe6e9', '#b2bec3', '#636e72', '#2d3436']
};

const SYSTEM_PROMPT = `You are a master animator inspired by Kurzgesagt – In a Nutshell, the beloved YouTube channel known for stunning educational animations. Your mission is to create beautiful, educational animations using Anime.js v4 that explain complex concepts through elegant visual storytelling.

## Your Animation Philosophy (The Kurzgesagt Way)

1. **Visual Clarity**: Every element serves a purpose. Use geometric shapes (circles, rounded rectangles) to represent concepts. Cells are circles, neurons are circles with dendrites, planets are spheres, data flows through tubes.

2. **Color Language**: Use a vibrant but harmonious palette:
   - Blues (#4fc3f7, #29b6f6) for calm, informational elements
   - Oranges (#ff9f43) and Pinks (#ff6b9d) for important highlights
   - Greens (#26de81, #00b894) for biological/growth concepts
   - Purples (#a55eea) for mysterious/complex ideas
   - Yellows (#fed330) for energy, light, positive outcomes

3. **Smooth Choreography**: Animations flow like a dance. Elements enter gracefully, move with purpose, and exit smoothly. Use staggered delays for groups. Ease functions matter - 'outExpo' for satisfying snaps, 'inOutQuad' for smooth transitions, 'outElastic' for playful bounces.

4. **Layered Storytelling**: Build complexity gradually. Start simple, add elements, show relationships, then reveal the bigger picture.

5. **Scale & Perspective**: Use scaling to show importance or zoom effects. Small things grow to show significance.

## Technical Requirements

Generate a complete, self-contained animation object with this EXACT structure:

\`\`\`javascript
{
  "title": "Short descriptive title",
  "narration": "A brief 1-3 sentence educational explanation of what's being shown",
  "setup": "// JavaScript code to create DOM elements on the stage",
  "animation": "// Anime.js v4 timeline code using createTimeline()",
  "cleanup": "// Code to remove elements when done"
}
\`\`\`

## Animation Code Guidelines

1. **Setup Phase**: Create all DOM elements programmatically
   - Use \`stage\` variable (already available) as the container
   - Create elements with \`document.createElement()\`
   - Add classes: 'element', 'circle', 'label' as needed
   - Position absolutely with transform or left/top
   - Apply inline styles for colors, sizes

2. **Animation Phase**: Use Anime.js v4 createTimeline()
   - Import is already available: \`anime.createTimeline()\`, \`anime.stagger()\`, etc.
   - Build sequences that tell a story
   - Use timeline's \`.add()\` method for sequencing
   - Leverage stagger for group animations
   - Match duration to requested time (~X seconds means roughly X seconds total)

3. **Element Naming**: Use descriptive class names like:
   - .cell, .nucleus, .membrane for biology
   - .neuron, .synapse, .signal for neural topics
   - .planet, .star, .orbit for space
   - .data, .node, .connection for tech topics

## Example Animation Structure

For "immune system" at ~15 seconds:

\`\`\`javascript
{
  "title": "The Immune Response",
  "narration": "When pathogens invade, your immune system launches a coordinated defense. White blood cells detect, attack, and remember invaders for future protection.",
  "setup": \`
    // Create pathogen (virus)
    const virus = document.createElement('div');
    virus.className = 'element circle virus';
    virus.style.cssText = 'width: 30px; height: 30px; background: #e74c3c; left: -50px; top: 50%;';
    stage.appendChild(virus);

    // Create white blood cells
    for (let i = 0; i < 5; i++) {
      const cell = document.createElement('div');
      cell.className = 'element circle white-cell';
      cell.style.cssText = \\\`width: 40px; height: 40px; background: #4fc3f7; left: \\\${70 + i * 15}%; top: \\\${30 + (i % 3) * 20}%; opacity: 0;\\\`;
      stage.appendChild(cell);
    }
  \`,
  "animation": \`
    const tl = anime.createTimeline({
      defaults: { duration: 800, ease: 'outExpo' }
    });

    // Virus enters
    tl.add('.virus', { left: '20%', duration: 1500, ease: 'linear' }, 0);

    // White cells appear
    tl.add('.white-cell', {
      opacity: 1,
      scale: [0, 1],
      delay: anime.stagger(200)
    }, 1000);

    // Cells converge on virus
    tl.add('.white-cell', {
      left: '20%',
      top: '50%',
      delay: anime.stagger(150),
      ease: 'inOutQuad'
    }, 3000);

    // Attack animation
    tl.add('.virus', {
      scale: [1, 1.5, 0],
      opacity: [1, 1, 0],
      duration: 1500,
      ease: 'outExpo'
    }, 5000);

    return tl;
  \`,
  "cleanup": \`
    stage.querySelectorAll('.virus, .white-cell').forEach(el => el.remove());
  \`
}
\`\`\`

## Important Rules

1. ALWAYS return valid JSON with the exact structure shown
2. Setup code must be executable JavaScript that creates elements
3. Animation code must return an Anime.js timeline
4. Match animation duration to the requested time
5. If sequences are specified, create that many distinct visual phases
6. Use the stage variable directly - it's already defined
7. All Anime.js functions are available via the \`anime\` global object
8. Keep narration educational and engaging, like Kurzgesagt's voiceover style
9. Think about visual metaphors - how can you represent abstract concepts visually?
10. CRITICAL: Use \`ease\` NOT \`easing\` for the easing parameter - this is Anime.js v4 syntax!
11. When targeting DOM elements in animations, use CSS selectors (strings like '.classname') OR pass the actual DOM element variable - both work

You are creating art that educates. Make it beautiful, make it clear, make it memorable.`;

// DOM Elements
const topicInput = document.getElementById('topic');
const durationInput = document.getElementById('duration');
const durationValue = document.getElementById('duration-value');
const sequencesSelect = document.getElementById('sequences');
const generateBtn = document.getElementById('generate-btn');
const btnText = generateBtn.querySelector('.btn-text');
const btnLoading = generateBtn.querySelector('.btn-loading');
const status = document.getElementById('status');
const stage = document.getElementById('stage');
const narration = document.getElementById('narration');
const playBtn = document.getElementById('play-btn');
const restartBtn = document.getElementById('restart-btn');
const saveBtn = document.getElementById('save-btn');
const vaultList = document.getElementById('vault-list');
const vaultCount = document.getElementById('vault-count');
const codeBtn = document.getElementById('code-btn');
const codeModal = document.getElementById('code-modal');
const closeModal = document.getElementById('close-modal');
const codeSetup = document.getElementById('code-setup');
const codeAnimation = document.getElementById('code-animation');

// State
let currentAnimation = null;
let currentTimeline = null;
let vault = [];
let isPlaying = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadVault();
  setupEventListeners();
});

function setupEventListeners() {
  durationInput.addEventListener('input', () => {
    durationValue.textContent = `~${durationInput.value}s`;
  });

  generateBtn.addEventListener('click', generateAnimation);
  playBtn.addEventListener('click', togglePlayPause);
  restartBtn.addEventListener('click', restartAnimation);
  saveBtn.addEventListener('click', saveToVault);
  codeBtn.addEventListener('click', showCode);
  closeModal.addEventListener('click', hideCode);
  codeModal.addEventListener('click', (e) => {
    if (e.target === codeModal) hideCode();
  });

  topicInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateAnimation();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideCode();
    if (e.key === ' ' && currentTimeline && document.activeElement !== topicInput) {
      e.preventDefault();
      togglePlayPause();
    }
  });
}

function setStatus(message, type = 'info') {
  status.textContent = message;
  status.className = `status ${type}`;
}

function setLoading(isLoading) {
  generateBtn.disabled = isLoading;
  btnText.style.display = isLoading ? 'none' : 'inline';
  btnLoading.style.display = isLoading ? 'inline' : 'none';
}

async function generateAnimation() {
  const topic = topicInput.value.trim();
  if (!topic) {
    setStatus('Please enter a topic', 'error');
    return;
  }

  const duration = durationInput.value;
  const sequences = sequencesSelect.value;

  setLoading(true);
  setStatus('Generating animation...', 'info');
  clearStage();

  const userPrompt = buildUserPrompt(topic, duration, sequences);

  try {
    const response = await callOpenRouter(userPrompt);
    const animationData = parseResponse(response);

    if (animationData) {
      currentAnimation = {
        ...animationData,
        topic,
        duration,
        sequences,
        timestamp: Date.now()
      };

      await executeAnimation(animationData);
      setStatus('Animation generated!', 'success');
      enableControls();
    } else {
      setStatus('Failed to parse animation response', 'error');
    }
  } catch (error) {
    console.error('Generation error:', error);
    setStatus(`Error: ${error.message}`, 'error');
  } finally {
    setLoading(false);
  }
}

function buildUserPrompt(topic, duration, sequences) {
  let prompt = `Create a Kurzgesagt-style educational animation about: "${topic}"

Duration: ~${duration} seconds (the total timeline should be roughly ${duration * 1000}ms)`;

  if (sequences !== 'dynamic') {
    prompt += `\n\nStructure the animation into exactly ${sequences} distinct visual sequences/phases, each building on the previous to tell the story.`;
  } else {
    prompt += `\n\nUse as many sequences as feels natural to explain the concept effectively.`;
  }

  prompt += `\n\nRemember:
- Create visually striking, educational content
- Use the Kurzgesagt color palette
- Build complexity gradually
- Make it memorable and beautiful
- Return ONLY valid JSON, no markdown code blocks`;

  return prompt;
}

async function callOpenRouter(userPrompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.href,
      'X-Title': 'Kurzgesagt Animation Generator'
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: TEMPERATURE,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseResponse(content) {
  try {
    // Try to extract JSON from the response
    let jsonStr = content;

    // Remove markdown code blocks if present
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    // Try to find JSON object
    const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      jsonStr = objectMatch[0];
    }

    const parsed = JSON.parse(jsonStr);

    // Validate required fields
    if (!parsed.title || !parsed.setup || !parsed.animation) {
      console.error('Missing required fields in response');
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Parse error:', error);
    console.log('Raw content:', content);
    return null;
  }
}

function clearStage() {
  if (currentTimeline) {
    currentTimeline.pause();
    currentTimeline = null;
  }
  stage.innerHTML = '';
  narration.classList.remove('active');
  narration.textContent = '';
}

async function executeAnimation(data) {
  // Clear and prepare stage
  clearStage();

  // Show narration
  if (data.narration) {
    narration.textContent = data.narration;
    narration.classList.add('active');
  }

  // Execute setup code
  try {
    const setupFn = new Function('stage', 'anime', data.setup);
    setupFn(stage, anime);
  } catch (error) {
    console.error('Setup error:', error);
    setStatus('Error in animation setup', 'error');
    return;
  }

  // Execute animation code
  try {
    const animFn = new Function('stage', 'anime', `
      ${data.animation}
    `);
    currentTimeline = animFn(stage, anime);

    if (currentTimeline && typeof currentTimeline.play === 'function') {
      currentTimeline.play();
    }
  } catch (error) {
    console.error('Animation error:', error);
    setStatus('Error in animation execution', 'error');
  }
}

function togglePlayPause() {
  if (!currentTimeline) return;

  if (isPlaying) {
    currentTimeline.pause();
    playBtn.textContent = 'Play';
    isPlaying = false;
  } else {
    currentTimeline.play();
    playBtn.textContent = 'Pause';
    isPlaying = true;
  }
}

function restartAnimation() {
  if (currentAnimation) {
    executeAnimation(currentAnimation);
    isPlaying = true;
    playBtn.textContent = 'Pause';
  }
}

function showCode() {
  if (!currentAnimation) return;
  codeSetup.textContent = currentAnimation.setup || 'No setup code';
  codeAnimation.textContent = currentAnimation.animation || 'No animation code';
  codeModal.style.display = 'flex';
}

function hideCode() {
  codeModal.style.display = 'none';
}

function enableControls() {
  playBtn.disabled = false;
  restartBtn.disabled = false;
  saveBtn.disabled = false;
  codeBtn.disabled = false;
  playBtn.textContent = 'Pause';
  isPlaying = true;
}

function disableControls() {
  playBtn.disabled = true;
  restartBtn.disabled = true;
  saveBtn.disabled = true;
  codeBtn.disabled = true;
}

// Vault Functions
async function loadVault() {
  try {
    const saved = localStorage.getItem('kurzgesagt-vault');
    if (saved) {
      vault = JSON.parse(saved);
    } else {
      // Try to load preloaded examples
      try {
        const response = await fetch('vault/preload.json');
        if (response.ok) {
          vault = await response.json();
          saveVault(); // Save to localStorage
          console.log('Loaded', vault.length, 'preloaded animations');
        }
      } catch (e) {
        console.log('No preloaded vault found');
        vault = [];
      }
    }
    renderVault();
  } catch (error) {
    console.error('Error loading vault:', error);
    vault = [];
  }
}

function saveVault() {
  try {
    localStorage.setItem('kurzgesagt-vault', JSON.stringify(vault));
  } catch (error) {
    console.error('Error saving vault:', error);
  }
}

function saveToVault() {
  if (!currentAnimation) return;

  const item = {
    id: Date.now(),
    ...currentAnimation
  };

  vault.unshift(item);
  saveVault();
  renderVault();
  setStatus('Saved to vault!', 'success');
}

function renderVault() {
  if (vault.length === 0) {
    vaultList.innerHTML = '<p class="vault-empty">No saved animations yet</p>';
    vaultCount.textContent = '0 animations';
    return;
  }

  vaultCount.textContent = `${vault.length} animation${vault.length !== 1 ? 's' : ''}`;

  vaultList.innerHTML = vault.map(item => `
    <div class="vault-item" data-id="${item.id}">
      <button class="vault-item-delete" data-id="${item.id}">&times;</button>
      <div class="vault-item-title">${item.title || item.topic}</div>
      <div class="vault-item-meta">
        ${item.topic} &bull; ~${item.duration}s &bull; ${new Date(item.timestamp).toLocaleDateString()}
      </div>
    </div>
  `).join('');

  // Add click handlers
  vaultList.querySelectorAll('.vault-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('vault-item-delete')) {
        deleteFromVault(parseInt(e.target.dataset.id));
      } else {
        loadFromVault(parseInt(el.dataset.id));
      }
    });
  });
}

function loadFromVault(id) {
  const item = vault.find(v => v.id === id);
  if (!item) return;

  // Update UI
  document.querySelectorAll('.vault-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });

  currentAnimation = item;
  executeAnimation(item);
  enableControls();
  setStatus(`Loaded: ${item.title || item.topic}`, 'success');
}

function deleteFromVault(id) {
  vault = vault.filter(v => v.id !== id);
  saveVault();
  renderVault();
  setStatus('Removed from vault', 'info');
}

// anime is available globally from the CDN script
