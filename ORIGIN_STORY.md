# Origin Story

The prompt that started this project. A single comprehensive query that spawned an entire motion graphics generation system.

---

## The Original Prompt

> **Date:** January 30, 2026

```
Yo, dog. Okay, so I have an idea. I want you to look at the re-motion skill online.
Maybe you can look at my desktop and see if I have the re-motion skill downloaded.
There might have been updates to it, so go check it online. Maybe re-download it if
we need to, or delete my local re-motion skill if needed. You can tell me what you
want to do. Essentially, I just want to make sure we have it. I also want you to
check out my anime JSV4 documentation on my desktop.

After you have done all of these searches and figuring out the plans, I want you to
make me a plan of action where I can create beautiful motion graphic things, like
videos adjacent to Adobe After Effects slash KURZ, like that explainer channel on
YouTube with the animations or other beautiful things. Essentially, a mixture of
Adobe After Effects vibes with the motion graphics vibes with some animation vibes
using anime JSV4.

I want you to make me a comprehensive plan for how we can go about doing this so
that my team can have a config page where we can enter in any natural language thing,
set the length, request narration or no narration, and then get a video generated
that's beautiful and have it planned out and then generated sequentially step-by-step
with as much code as needed for any step if possible.

Once you have done this, once you have made the plan for it, what I want you to do
is I want you to give me test generations of bits that are 5 seconds, 10 seconds,
15 seconds long, with some including narration, some not, of different sequences or
things that you think I might find interesting. For example, I'm going to be focusing
initially on software engineering, machine learning concepts, biology concepts, things
like that. So just by the way.

And also you can use, create a new folder on my desktop for this, make the markdown
file in there or the plan or something, copy my .env underscore vault thing to this
folder, rename it to .env, and then tell me which env keys we have to work with here.
Thank you.
```

---

## What Made This Prompt Effective

### 1. Clear Vision
- Referenced specific aesthetic targets (After Effects, Kurzgesagt)
- Described the end goal: "beautiful motion graphic things"

### 2. Context Awareness
- Pointed to existing resources on desktop (anime.js docs, env files)
- Asked to check for updates before building

### 3. Concrete Deliverables
- Config page with natural language input
- Variable video lengths (5s, 10s, 15s)
- Narration toggle option
- Test generations across multiple topics

### 4. Domain Specification
- Software engineering concepts
- Machine learning concepts
- Biology concepts

### 5. Practical Setup Instructions
- Create new folder
- Copy and rename env file
- Document available API keys

---

## What Got Built

From this single prompt:

| Component | Description |
|-----------|-------------|
| `MASTER_PLAN.md` | Comprehensive architecture document |
| 4 reusable components | ParticleField, TextReveal, IconPop, GlowBox |
| 6 example scenes | Covering software, ML, biology, physics |
| 6 rendered videos | 5s, 10s, and 15s test clips |
| Full Remotion setup | Ready for expansion |

### Test Videos Generated

| Video | Duration | Topic | Style |
|-------|----------|-------|-------|
| Function Concept | 5s | Software | Input → Process → Output flow |
| Neuron Concept | 5s | ML | Neural network visualization |
| DNA Replication | 10s | Biology | Helix unzipping animation |
| API Request Flow | 10s | Software | Client-server diagram |
| Wave Interference | 15s | Physics | Dual-source wave patterns |
| Gradient Descent | 15s | ML | Optimization visualization |

---

## Lessons

1. **Be specific about aesthetics** - Naming "Kurzgesagt" gave a clear visual target
2. **Point to existing resources** - Mentioning desktop files enabled leveraging existing work
3. **Request multiple examples** - Asking for 5s/10s/15s variants showed range
4. **Specify domains upfront** - "software, ML, biology" guided content choices
5. **Include setup instructions** - Env file handling made the project immediately usable

---

*This project exists because of one well-crafted prompt.*
