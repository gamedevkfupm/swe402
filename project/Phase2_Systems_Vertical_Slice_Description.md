# Phase 2 — Systems Vertical Slice (Advanced Mechanics Checkpoint)

Deliver **one end-to-end playable graybox vertical slice** where core systems are implemented, connected, and testable.

Your submission should answer:
1) **What** is currently playable from start → end (core flow, win/fail logic, challenge loop)?
2) **How** stable and defensible is the implementation (evidence, tests/playtests, fixes, next actions)?

For the full project descrioption, refer to the following link: https://github.com/gamedevkfupm/swe402/blob/main/project/project_description.md

## What to submit
### One checkpoint document (Markdown)
Create: `docs/phase2/checkpoint.md`


Your checkpoint must include:
- **Playable slice summary:** start/end boundaries currently implemented, core loop status, win/fail behavior, known limitations
- **Systems implementation status:** controls/interactions, physics/collision, AI/combat/challenge logic, game-state flow
- **UI + audio first pass:** base HUD/prompts/feedback and initial SFX/music integration
- **Playtest report:** test setup, findings, priority issues, and concrete planned fixes
- **Production update:** GitHub Project board progress, completed tasks, carry-over tasks, and Phase 3 readiness bullets

Your checkpoint should show clearly how are you going to apply the following competencies:


- **Core gameplay systems engineering**: player controls, interaction model, fail/win states, and game-state flow.
- **Physics and collision systems**: deterministic interactions, hit detection, and reliable response logic.
- **AI behavior design**: enemy or boss behavior using state-driven logic (for example, finite state machines or behavior trees).
- **Real-time graphics pipeline**: materials, lighting, rendering settings, and scene readability.
- **Technical art and polish**: animation, VFX, camera design, and post-processing.
- **Audio systems design**: SFX, music integration, mixing, and spatial/3D audio where relevant.
- **UI/UX feedback**: HUD, prompts, combat/system feedback, and usability-driven flow.
- **Performance optimization and debugging**: profiling evidence, bottleneck analysis, and stability fixes.
- **Production and collaboration practices**: GitHub workflow, documentation, issue tracking, milestone planning, and iterative delivery.


---

## Rubrics


| **Criteria (Points)**                                          | **Strong**                                                                                                                                                                                                                                                                                                                                                                       | **Good**                                                                                                                           | **Weak**                                                                                              | **Missing**                                                                 |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Playable End-to-End Flow & Mechanics Readiness (30)**        | Graybox vertical slice is fully playable from clear start trigger to end condition; core loop works consistently; win/fail states are implemented and repeatable; player progression through the scene is coherent and testable without instructor intervention.                                                                                                              | End-to-end flow mostly playable; minor blockers or hand-waving steps; core loop works but has intermittent gaps.                 | Slice is partially playable only; important flow segments missing; win/fail behavior inconsistent.   | No meaningful end-to-end playable slice.                                    |
| **Systems Integration & Technical Coverage (25)**              | Core gameplay systems, physics/collision, AI/challenge logic, base UI feedback, and first-pass audio are implemented with clear integration across systems; system boundaries and dependencies are understood; implementation is technically defensible for current phase scope.                                                                                                | Most core systems implemented and connected; integration works but has shallow handling in some areas.                            | Several core systems are stubbed or disconnected; integration is weak or largely unverified.         | Minimal implementation across required systems.                             |
| **Playtesting, Debugging & Iteration Quality (20)**            | Structured playtest evidence included (what was tested, by whom, outcomes); issues triaged by severity/priority; fixes applied or scheduled with clear rationale; debugging and stability efforts are visible and grounded in observed behavior.                                                                                                                              | Playtesting is present with useful findings; issue tracking exists but prioritization/fix planning is somewhat shallow.          | Limited ad-hoc testing; findings are vague; weak evidence of debugging or actionable iteration.      | No playtest or debugging evidence.                                          |
| **Production Discipline & Repository Workflow (15)**           | GitHub workflow is active and professional: issues, PRs, milestone/task status, and ownership are clearly maintained; progress aligns with Phase 2 targets; blockers and carry-over to Phase 3 are explicitly managed.                                                                                                                                                            | Workflow artifacts exist (issues/board/PRs) with reasonable updates; ownership or sequencing clarity is moderate.               | Inconsistent workflow usage; weak task ownership; unclear mapping between work done and next steps.  | No meaningful production tracking or collaboration evidence.                |
| **Technical Communication & Professionalism (10)**             | Submission is clear, concise, and well-structured; terminology is used correctly; evidence (screenshots/clips/logs where relevant) supports claims; document reads like a professional checkpoint report.                                                                                                                                                                            | Mostly clear and organized with minor clarity or structure issues.                                                                 | Writing is hard to follow; structure is inconsistent; evidence does not strongly support claims.     | Incomplete or poorly communicated submission.                               |

