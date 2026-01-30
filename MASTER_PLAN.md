# Motion Graphics Studio - Master Plan

## Project Overview

A comprehensive motion graphics video generation system combining:
- **Remotion** (React-based programmatic video creation)
- **Anime.js v4** (advanced web animations)
- **AI-powered generation** (natural language to video)
- **ElevenLabs TTS** (professional narration)

Target aesthetic: **Kurzgesagt / After Effects explainer style** with smooth, beautiful animations.

---

## Available Resources

### Your Existing Assets
| Resource | Location | Status |
|----------|----------|--------|
| Remotion Project | `~/Desktop/beautiful-animation-remotion-work/qualia-video/` | Has working components (DNA, Nodes, Particles, etc.) |
| Anime.js v4 Docs | `~/Desktop/animejs-docs-v4/` | Complete documentation (15 files) |
| Kurzgesagt Generator | `~/Desktop/kurzgesagt/app/` | Electron app with TTS generation |
| Remotion Best Practices | `~/Desktop/kurzgesagt/.claude/skills/remotion-best-practices/` | Domain knowledge rules |

### ENV Keys Available
| Key | Purpose | Use Case |
|-----|---------|----------|
| `OPENROUTER_API_KEY` | AI models (Claude, GPT, etc.) | Script generation, scene planning |
| `OPENAI_API_KEY` | GPT-4/GPT-4o | Alternative AI backbone |
| `FAL_API_KEY` | Fal.ai image/video generation | Background generation, visual assets |
| `ELEVENLABS_API_KEY` | Text-to-speech | **Narration generation** |
| `REPLICATE_API_KEY` | AI models | Image generation, Stable Diffusion |
| `GOOGLE_API_KEY` | Google services | Search, Gemini models |
| `PRIME_INTELLECT_API_KEY` | AI compute | Heavy processing |
| `DAYTONA_API_KEY` | Cloud dev environments | Remote rendering |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONFIG UI (Web Interface)                     │
│  ┌─────────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Natural Language│  │ Video Length │  │ Narration Toggle  │  │
│  │ Prompt Input    │  │ 5s/10s/15s+  │  │ Yes/No            │  │
│  └────────┬────────┘  └──────┬───────┘  └─────────┬─────────┘  │
└───────────┼──────────────────┼────────────────────┼─────────────┘
            │                  │                    │
            ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AI ORCHESTRATOR (LLM)                        │
│  1. Parse natural language intent                                │
│  2. Generate scene breakdown with timing                         │
│  3. Create animation specifications                              │
│  4. Generate narration script (if enabled)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  ASSET GEN      │ │  NARRATION GEN  │ │  CODE GEN       │
│  (Fal.ai)       │ │  (ElevenLabs)   │ │  (Remotion TSX) │
│  - Backgrounds  │ │  - TTS audio    │ │  - Components   │
│  - Icons        │ │  - Timing sync  │ │  - Animations   │
│  - Visuals      │ │                 │ │  - Sequences    │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REMOTION RENDERER                             │
│  - Composes all elements                                         │
│  - Frame-perfect animation timing                                │
│  - Exports MP4/WebM                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation Setup

### 1.1 Project Initialization
```bash
# Initialize Remotion project with Skills
npx create-video@latest motion-graphics-studio --template blank
cd motion-graphics-studio
npx remotion skills add  # Add Remotion Skills for AI integration
```

### 1.2 Core Dependencies
```json
{
  "dependencies": {
    "remotion": "^4.0.407",
    "@remotion/cli": "^4.0.407",
    "@remotion/player": "^4.0.407",
    "@remotion/media-utils": "^4.0.407",
    "@remotion/captions": "^4.0.407",
    "animejs": "^4.0.0",
    "@fal-ai/client": "^1.8.3",
    "openai": "^4.0.0",
    "dotenv": "^17.0.0"
  }
}
```

### 1.3 Copy Existing Components
From your `qualia-video` project:
- `ParticleField.tsx` - Ambient particle effects
- `TextReveal.tsx` - Text animation component
- `Node.tsx` / `Connection.tsx` - Network visualizations
- `PhysarumNetwork.tsx` - Organic growth animations

---

## Phase 2: Animation Primitives Library

### 2.1 Kurzgesagt-Style Components

| Component | Description | Animation Style |
|-----------|-------------|-----------------|
| `SmoothReveal` | Elements fade/scale in | Spring with damping: 200 |
| `IconPop` | Icons appear with bounce | Spring with damping: 8 |
| `LineDrawSVG` | SVG path drawing animation | Anime.js `createDrawable()` |
| `MorphTransition` | Shape morphing between states | Anime.js `morphTo()` |
| `TextTypewriter` | Character-by-character reveal | Frame-based string slice |
| `FloatingElement` | Subtle hover animation | Sine wave interpolation |
| `ZoomPan` | Ken Burns effect on images | Scale + translate interpolation |
| `GlowPulse` | Pulsing glow effect | Opacity + shadow animation |

### 2.2 Scene Templates

```tsx
// Example: Concept Introduction Scene
const ConceptIntroScene = ({
  title,
  subtitle,
  icon,
  narrationAudio
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance at 0.5s
  const titleSpring = spring({
    frame: frame - 0.5 * fps,
    fps,
    config: { damping: 200 }
  });

  // Icon pop at 1s
  const iconSpring = spring({
    frame: frame - 1 * fps,
    fps,
    config: { damping: 8 }
  });

  return (
    <AbsoluteFill style={{ background: '#1a1a2e' }}>
      <ParticleField />
      <Icon style={{ scale: iconSpring }} src={icon} />
      <Title style={{ opacity: titleSpring }}>{title}</Title>
      {narrationAudio && <Audio src={narrationAudio} />}
    </AbsoluteFill>
  );
};
```

---

## Phase 3: AI Orchestration Pipeline

### 3.1 Natural Language Parser

```typescript
interface VideoRequest {
  prompt: string;           // "Explain how neural networks learn"
  duration: 5 | 10 | 15 | 30 | 60;  // seconds
  narration: boolean;
  style: 'kurzgesagt' | 'minimal' | 'technical';
  topic: 'software' | 'ml' | 'biology' | 'physics' | 'general';
}

interface SceneBreakdown {
  scenes: Scene[];
  totalDuration: number;
  narrationScript?: string;
}

interface Scene {
  id: string;
  startTime: number;
  duration: number;
  type: 'intro' | 'concept' | 'diagram' | 'transition' | 'outro';
  elements: SceneElement[];
  narrationText?: string;
}
```

### 3.2 LLM Scene Generator Prompt

```
You are a motion graphics director creating Kurzgesagt-style explainer videos.

Given a topic and duration, generate a scene breakdown with:
1. Scene timing (in seconds)
2. Visual elements needed
3. Animation specifications
4. Narration script (if enabled)

Style guidelines:
- Use simple, geometric shapes
- Smooth spring animations
- Dark backgrounds with vibrant accent colors
- Icons should "pop" in with slight bounce
- Text reveals character by character
- Transitions use morphing or zoom effects
```

### 3.3 Code Generation Pipeline

```typescript
async function generateVideo(request: VideoRequest) {
  // 1. Generate scene breakdown
  const scenes = await generateSceneBreakdown(request);

  // 2. Generate narration audio (if enabled)
  if (request.narration) {
    const narrationAudio = await generateNarration(scenes);
  }

  // 3. Generate visual assets
  const assets = await generateAssets(scenes);

  // 4. Generate Remotion code
  const code = await generateRemotionCode(scenes, assets);

  // 5. Render video
  const video = await renderVideo(code);

  return video;
}
```

---

## Phase 4: Config UI

### 4.1 Interface Components

```tsx
// Web interface for video generation
const ConfigPage = () => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(10);
  const [narration, setNarration] = useState(true);

  return (
    <div className="config-page">
      <h1>Motion Graphics Studio</h1>

      <TextArea
        label="What would you like to explain?"
        value={prompt}
        onChange={setPrompt}
        placeholder="Explain how photosynthesis converts sunlight to energy..."
      />

      <Select
        label="Video Length"
        value={duration}
        options={[
          { value: 5, label: '5 seconds (Quick concept)' },
          { value: 10, label: '10 seconds (Brief explanation)' },
          { value: 15, label: '15 seconds (Standard)' },
          { value: 30, label: '30 seconds (Detailed)' },
          { value: 60, label: '60 seconds (Comprehensive)' }
        ]}
        onChange={setDuration}
      />

      <Toggle
        label="Include Narration"
        value={narration}
        onChange={setNarration}
      />

      <Button onClick={generateVideo}>
        Generate Video
      </Button>
    </div>
  );
};
```

---

## Phase 5: Test Generations Plan

### 5.1 Test Matrix

| Test | Duration | Narration | Topic | Description |
|------|----------|-----------|-------|-------------|
| T1 | 5s | No | Software | "What is a function?" - Simple concept intro |
| T2 | 5s | Yes | ML | "Neural network neuron" - Single concept with voice |
| T3 | 10s | No | Biology | "DNA replication" - Process animation |
| T4 | 10s | Yes | Software | "API request flow" - Diagram with explanation |
| T5 | 15s | No | Physics | "Wave interference" - Visual demonstration |
| T6 | 15s | Yes | ML | "Gradient descent" - Mathematical concept |

### 5.2 Test 1: 5-Second Function Concept (No Narration)

**Storyboard:**
```
0.0s - 0.5s: Dark background, particles fade in
0.5s - 1.5s: "FUNCTION" text types in with glow
1.5s - 3.0s: Box icon pops in, arrows animate showing input→output
3.0s - 4.0s: f(x) → y equation fades in
4.0s - 5.0s: All elements scale down and fade
```

### 5.3 Test 2: 5-Second Neural Network Neuron (With Narration)

**Script:** "A neuron receives inputs, weighs them, and fires an output."

**Storyboard:**
```
0.0s - 1.0s: Circle (neuron) appears with spring bounce
1.0s - 2.5s: Input arrows animate in from left
2.5s - 4.0s: Glow pulse on neuron, output arrow shoots right
4.0s - 5.0s: Fade to next concept hint
```

### 5.4 Test 3: 10-Second DNA Replication (No Narration)

**Storyboard:**
```
0.0s - 2.0s: DNA helix appears, rotating slowly
2.0s - 4.0s: Helix unzips animation (SVG morph)
4.0s - 7.0s: New nucleotides float in and attach
7.0s - 9.0s: Two complete helices form
9.0s - 10.0s: Zoom out, title "REPLICATION" appears
```

---

## Phase 6: Remotion Skills Integration

### 6.1 Check for Updates

```bash
# Check current Remotion version in your projects
cd ~/Desktop/beautiful-animation-remotion-work/qualia-video
npm list remotion

# Update to latest
npm update remotion @remotion/cli @remotion/player

# Add Skills if not present
npx remotion skills add
```

### 6.2 Skills Available
Based on search results, Remotion Skills include:
- **Parameters skill** - Dynamic video parameters
- **Map skill** - Geographic visualizations
- **Transparent videos** - Alpha channel support
- **AI integration** - Claude Code video prompting

---

## Anime.js v4 Integration Notes

From your documentation (`~/Desktop/animejs-docs-v4/`):

### Key Features to Use
| Feature | Use Case | Import |
|---------|----------|--------|
| `createTimeline()` | Sequencing complex animations | `animejs/timeline` |
| `morphTo()` | SVG shape transitions | `animejs/svg` |
| `createDrawable()` | Line drawing effects | `animejs/svg` |
| `splitText()` | Character-by-character text | `animejs/text` |
| `stagger()` | Sequential element animations | `animejs/utils` |
| `spring()` | Physics-based easing | `animejs/easings` |

### Integration Pattern

```tsx
// Anime.js within Remotion component
import { animate, createTimeline, stagger } from 'animejs';
import { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const AnimeJSScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const containerRef = useRef(null);

  // Convert frame to time for anime.js
  const currentTime = (frame / fps) * 1000; // ms

  useEffect(() => {
    const tl = createTimeline({
      autoplay: false,
      defaults: { duration: 500 }
    });

    tl.add('.element', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100)
    });

    // Seek to current frame time
    tl.seek(currentTime);
  }, [currentTime]);

  return <div ref={containerRef}>...</div>;
};
```

---

## Implementation Order

1. **Setup project structure** - Create folder, copy env, init Remotion
2. **Port animation primitives** - Copy and adapt existing components
3. **Build scene templates** - Create reusable Kurzgesagt-style scenes
4. **Integrate ElevenLabs** - TTS generation pipeline
5. **Build AI orchestrator** - LLM scene breakdown generator
6. **Create config UI** - Web interface for generation
7. **Test generations** - Run the 6 test cases
8. **Iterate and refine** - Improve based on results

---

## Recommendation: Remotion Status

**Your existing `beautiful-animation-remotion-work` project is solid.** It has:
- Remotion 4.0.x (latest major version)
- Working components (Particles, Nodes, DNA, etc.)
- Fal.ai integration for asset generation

**Action:** No need to delete. Instead, this new project (`motion-graphics-studio`) will:
1. Use your existing components as a starting point
2. Add the AI orchestration layer on top
3. Build the config UI for natural language generation

---

## Next Steps

1. Run: `npx remotion skills add` in this project to get AI integration
2. Copy animation components from qualia-video
3. Set up ElevenLabs TTS pipeline
4. Build first test generation (5s function concept)

Ready to proceed?
