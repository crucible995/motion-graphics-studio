# Kurzgesagt Animation Generator

AI-powered educational animation generator inspired by Kurzgesagt – In a Nutshell. Uses Claude Opus 4.5 via OpenRouter to generate beautiful, educational Anime.js v4 animations.

## Features

- **AI-Powered Generation**: Enter any topic and get a Kurzgesagt-style educational animation
- **Configurable Duration**: Animations from 5-45 seconds
- **Sequence Control**: Let AI decide structure or specify exact number of sequences
- **Vault System**: Save and browse your generated animations
- **Live Preview**: Watch animations play in real-time
- **Preloaded Examples**: Comes with sample animations for inspiration

## Quick Start

1. **Start the server:**
   ```bash
   cd generator
   python3 -m http.server 8080
   ```

2. **Open in browser:**
   ```
   http://localhost:8080
   ```

3. **Generate an animation:**
   - Enter a topic (e.g., "immune system", "black holes", "neural networks")
   - Adjust duration slider (5-45 seconds)
   - Choose sequence count or leave as "Dynamic"
   - Click "Generate Animation"

## Preloaded Examples

The vault comes preloaded with these animations:
- Neural Network Learning (~20s)
- DNA Replication (~15s)
- How Neurons Fire (~18s)
- Photosynthesis (~15s)

## How It Works

1. Your topic is sent to Claude Opus 4.5 with a detailed system prompt that embodies Kurzgesagt's animation philosophy
2. The AI generates:
   - Educational narration
   - DOM element setup code
   - Anime.js v4 timeline animation code
3. The code is executed in the browser to create the animation
4. You can save favorites to your vault

## Kurzgesagt Style Elements

The AI follows these principles:
- **Visual Clarity**: Geometric shapes representing concepts
- **Color Language**:
  - Blues (#4fc3f7) for informational elements
  - Oranges (#ff9f43) and Pinks (#ff6b9d) for highlights
  - Greens (#26de81) for biological/growth concepts
  - Purples (#a55eea) for mysterious ideas
- **Smooth Choreography**: Staggered animations, meaningful easings
- **Layered Storytelling**: Building complexity gradually

## Technical Details

- **Model**: Claude Opus 4.5 via OpenRouter
- **Temperature**: 0.7 for creative but consistent output
- **Animation Library**: Anime.js v4.2.0
- **Storage**: localStorage for vault persistence

## File Structure

```
generator/
├── index.html          # Main UI
├── styles.css          # Kurzgesagt-inspired styling
├── app.js              # Core application logic
├── vault/              # Saved animations
│   └── preload.json    # Preloaded examples
└── README.md           # This file
```

## Tips for Best Results

1. **Be Specific**: "How mitochondria produce ATP" works better than "cells"
2. **Think Visual**: Topics that have clear visual metaphors work best
3. **Iterate**: Save good animations and regenerate to explore variations
4. **Duration Matters**: Longer animations allow for more detailed storytelling

## Examples of Good Topics

**Biology:**
- Immune system response
- DNA replication
- How neurons fire
- Photosynthesis
- Cell division (mitosis)
- Protein folding

**Technology:**
- Neural network learning
- How encryption works
- Blockchain transactions
- Sorting algorithms
- Internet routing

**Space:**
- How stars form
- Black hole mechanics
- The expanding universe
- Asteroid impacts

**Physics:**
- Wave-particle duality
- Entropy and thermodynamics
- Quantum entanglement
