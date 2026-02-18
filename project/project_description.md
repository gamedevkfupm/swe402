# SWE402 Team Project: Vertical Slice Development

## Project Purpose
This project is a **vertical slice capstone**. Each team will build **one production-quality playable scene** (not a full game) and push it to a professional level of depth by the end of the semester.

The objective is to benchmark against a scene from a target game and achieve comparable complexity in:
- gameplay systems
- visual fidelity
- audio implementation
- technical quality
- production workflow

## Scope
Each team selects one scene with clear boundaries, such as a boss encounter, mission segment, or complete level loop.  

## Required Competencies
All teams must demonstrate the following competencies in the slice:
- **Core gameplay systems engineering**: player controls, interaction model, fail/win states, and game-state flow.
- **Physics and collision systems**: deterministic interactions, hit detection, and reliable response logic.
- **AI behavior design**: enemy or boss behavior using state-driven logic (for example, finite state machines or behavior trees).
- **Real-time graphics pipeline**: materials, lighting, rendering settings, and scene readability.
- **Technical art and polish**: animation, VFX, camera design, and post-processing.
- **Audio systems design**: SFX, music integration, mixing, and spatial/3D audio where relevant.
- **UI/UX feedback**: HUD, prompts, combat/system feedback, and usability-driven flow.
- **Performance optimization and debugging**: profiling evidence, bottleneck analysis, and stability fixes.
- **Production and collaboration practices**: GitHub workflow, documentation, issue tracking, milestone planning, and iterative delivery.

## Phases and Milestones
This project runs in four phases aligned to the course schedule.

### Phase 1: Proposal and Pre-Production (Week 7)
Deliverables (tentative):
- Scene Proposal (2-3 pages): scene goal, core loop, success/failure conditions, and intended player experience.
- Reference Breakdown: selected benchmark scene and decomposition of mechanics, visuals, audio, and interaction complexity.
- Technical Plan: systems architecture, toolchain choices, risk list, and scope boundaries.
- Production Plan: milestone backlog in GitHub Projects with task ownership.
- Repo Setup: initialized repository, branching policy, PR template, and contribution rules.

### Phase 2: Systems Vertical Slice (Week 11, Advanced Mechanics Checkpoint)
Deliverables (tentative):
- Playable graybox/blockout from start to end.
- Core mechanics implemented and testable.
- AI/combat/challenge logic working in-scene.
- Base UI and first-pass audio feedback.
- Playtest report with findings and planned fixes.

### Phase 3: Visual-Audio Production and Optimization (Week 11, Advanced Graphics Checkpoint)
Deliverables (tentative):
- Art pass with lighting, materials/shaders, VFX, animation, and camera polish.
- Audio pass with balanced mix and event-driven sound design.
- Performance report with profiling screenshots/metrics and optimizations applied.
- Bug triage log and stability improvements.

### Phase 4: Final Build and Presentation (Week 15)
Deliverables (tentative):
- Final playable build (release candidate).
- Technical documentation and final repository cleanup.
- Final presentation with live demo.
- Short fallback video demo in case of runtime issues.
- Team postmortem (what worked, what failed, what would be next).

## Submission Format and DevOps Guidelines
All submissions must be done through GitHub plus the course submission channel.

Repository requirements:
- One GitHub repository per team.
- Clear `README.md` with setup, controls, build steps, and team roles.
- Mandatory folders: `/docs`, `/builds`, `/media` (or equivalent documented structure).
- Milestone tags for each phase (`v0.1-proposal`, `v0.2-mechanics`, `v0.3-graphics`, `v1.0-final`).

Workflow requirements:
- Use feature branches; do not commit directly to `main`.
- Use pull requests for merges with at least one teammate review.
- Track work using GitHub Issues/Project board with status updates.
- Use meaningful commit messages and link commits/PRs to issues.

Per-phase submission package:
- GitHub URL + milestone tag
- Playable build artifact
- Required documents for that phase
- Demo media (video/screenshots when requested)

## Quality Bar
The project is successful when the team delivers a stable, polished, and technically defensible vertical slice that demonstrates course-level competencies in engineering, design, and production practice.
