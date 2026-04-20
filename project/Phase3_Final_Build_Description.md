# Phase 3 — Final Build & Presentation (Advanced Graphics Checkpoint)

Deliver the **final polished vertical slice** with completed art, audio, optimization, and a live demo.

Your submission should answer:
1) **What** is the final playable experience (visual/audio quality, polish, stability)?
2) **How** technically defensible is the final build (profiling evidence, optimizations, postmortem)?

For the full project descrioption, refer to the following link: https://github.com/gamedevkfupm/swe402/blob/main/project/project_description.md

## What to submit
### One final report document (Markdown)
Create: `docs/phase3/final_report.md`


Your final report must include:
- **Final build summary:** release-candidate build link, controls, and how to run it
- **Visual production pass:** lighting, materials/shaders, VFX, animation, camera, and post-processing decisions
- **Audio production pass:** balanced mix, event-driven SFX, music integration, and spatial/3D audio notes
- **Performance & optimization report:** profiling screenshots/metrics, bottlenecks identified, and fixes applied
- **Bug triage & stability log:** known issues, severity, and resolutions across the phase
- **Final presentation package:** demo plan, fallback video link, and final repository cleanup notes
- **Team postmortem:** what worked, what failed, and what would be next

Your final report should show clearly how are you going to apply the following competencies:


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
| **Final Build Quality & Playability (25)**                     | Release-candidate build runs end-to-end without intervention; controls, win/fail, and core loop are stable; build instructions are clear and reproducible; fallback demo video is included and matches the live build.                                                                                                                                                          | Build is mostly stable with minor issues; instructions work with small clarifications; fallback video is present but rough.       | Build runs only intermittently or requires manual workarounds; instructions unclear.                 | No working final build.                                                     |
| **Visual & Audio Production Pass (25)**                        | Lighting, materials/shaders, VFX, animation, camera, and post-processing decisions are intentional and technically grounded; audio mix is balanced with event-driven SFX, music, and spatial cues that strengthen scene readability and feel.                                                                                                                                  | Most visual/audio passes are present and reasonably integrated; some areas are shallow or inconsistent.                            | Visual or audio polish is partial, flat, or disconnected from gameplay feedback.                     | No meaningful visual or audio production pass.                              |
| **Performance Optimization & Stability (20)**                  | Profiling evidence (screenshots/metrics) is included; bottlenecks are identified and addressed with documented fixes; bug triage log is structured by severity; final build meets a stable target framerate on the declared hardware.                                                                                                                                          | Some profiling and optimization work shown; bug log present but uneven; stability mostly acceptable.                              | Optimization is ad-hoc or unverified; weak evidence of profiling or stability work.                  | No performance or stability evidence.                                       |
| **Production Discipline & Repository Cleanup (15)**            | GitHub repository is clean and professional: README, controls, build steps, and team roles are complete; issues/PRs/milestones reflect Phase 3 work; final tag/release is published; carry-over and known issues are documented honestly.                                                                                                                                       | Repository is mostly tidy with minor gaps in README or release tagging; workflow artifacts present.                               | Repository is disorganized; README incomplete; release tag missing or workflow inconsistent.         | No meaningful repository cleanup or release artifact.                       |
| **Presentation, Postmortem & Communication (15)**              | Live demo plan is clear and rehearsed; final report is concise, well-structured, and supported by evidence (screenshots/clips/logs); postmortem is honest and reflective with concrete lessons and next steps; terminology is used correctly throughout.                                                                                                                       | Demo and report are clear with minor gaps; postmortem is present but light on reflection.                                          | Demo plan is vague; report is hard to follow; postmortem is shallow or generic.                      | Incomplete or poorly communicated submission.                               |

