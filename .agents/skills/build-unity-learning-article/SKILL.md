---
name: build-unity-learning-article
description: Build or extend consistent single-page HTML lecture references from Unity Learn tutorial links and instructor notes, using the SWE 402 pixel-art design system, light/dark themes, local screenshots, interactive quizzes, printable results, persistent progress, and responsive verification. Use when the user provides Unity Learn URLs or class notes and asks for Unity learning material, a Medium-like lecture article, a student study reference, a new semester lecture page, or additions to an existing Unity lecture.
---

# Build Unity Learning Article

Create one continuous, Medium-like study article for one lecture. Never turn the material into slides, a deck, or a sequence of presentation screens.

## Required resources

Read these files before editing:

- `references/content-workflow.md` for source and writing rules.
- `references/teaching-contract.md` for the instructor’s established teaching, formatting, and interaction requirements. Apply this to every new lecture and revision.
- `references/design-contract.md` for the fixed semester visual system.
- `references/verification.md` before testing or delivery.

Use `assets/reference-page/` as the canonical implementation. For a new lecture, run:

```bash
python3 <skill-dir>/scripts/scaffold_lecture.py --output <course-repo>/learning_material/<lecture-slug>
```

For an existing lecture, edit its current `index.html`; do not scaffold over it.

## Workflow

1. Inventory every supplied Unity Learn URL and every instructor note.
2. Browse every URL. Treat the notes as authoritative for teaching emphasis and order; treat Unity Learn as authoritative for current controls, terminology, and procedures.
3. Inspect previous course lectures and classify proposed topics as new, deeper application, or recap. Prioritize high-value new material for approximately one hour. Define a concise lecture title, slug, lecture number, learning outcomes, and dependency-ordered section sequence. Keep all material under one lecture page.
4. Build a source map from each note and URL to a page section. Do not omit instructor-specific demonstrations or required exercises.
5. Scaffold a new page from the canonical implementation, or extend the existing page in place.
6. Replace all previous-lecture content, identifiers, links, and unused assets. Preserve the design and interaction contract.
7. Download useful screenshots to the lecture's `assets/` directory. Use descriptive lowercase filenames and relative paths.
8. Begin with a short video of the finished result and a few curiosity questions about how its observable behavior was made, following the opening-preview rules in `references/teaching-contract.md`. Then write a beginner-friendly conceptual overview and teach the mechanisms in practice. Assume learners have not encountered the new concepts: introduce what each means, why it matters, and what they will see, weaving plain-language examples into the prose rather than a separate Examples section. Put formulas, API behavior, settings, and code reasoning in the relevant post-step Explanation. Each practical section begins with a brief introduction, then numbered action groups and individual substeps. After each group, explain what was done and its necessary concepts from first principles in a plain subsection aligned with the article’s left edge. End with an observable practice or verification result.
9. Build code incrementally from starter templates: students write the lesson’s focal logic in small, located additions; explain that code after each step. Label completed downloads **Final references** and reserve them for comparison after implementation. Add required applied work, a focused set of up to 10 interactive quiz questions at relevant new-concept checkpoints, and a clear **What to submit** section. Implement saved checked answers and navbar **Export results** with a printable quiz report as specified in the teaching contract. Supporting FAQs and source videos remain optional. Do not add or retain an optional extension by template habit: use the required/optional scope specified by the instructor and the teaching contract.
10. Inspect Unity Learn for step videos and map relevant demonstrations to the lecture’s action groups. Place official video references in a horizontal row of titled thumbnails after the matching written steps and before their Explanation. Clicking a thumbnail expands its player; procedural playback defaults to 2×. Keep video order, written actions, and post-step explanations synchronized in dependency order; teach a mechanism before a later step uses or tests it. Follow the video rules and synchronization checks in `references/teaching-contract.md` and `references/verification.md`; watching remains optional.
11. Run the validator and browser checks. Fix every error before delivery.

## Consistency rules

- Use the canonical template as a system, not as previous-lecture content.
- Preserve the shared visual tokens, components, theme key, responsive breakpoints, print rules, and interaction behavior.
- Replace the lecture number, progress key, title, content, sources, screenshots, and task identifiers every time.
- Prefer system models, responsibility tables, controlled before/after tests, and failure diagnostics when the topic supports them.
- Required learning tasks, including an extension promoted to required, must be consistently required in headings, timing, checkboxes, and completion criteria. Keep only genuinely supplementary references and FAQs optional unless the user requests other optional work.
- Keep table information complete on mobile. Add `data-label` to each table cell so rows become labeled cards below 680px.

## Output contract

- Save the lecture at `learning_material/<lecture-slug>/index.html` with local assets beside it.
- Keep the sticky table of contents separate from the article column; images must never extend into the menu.
- Keep light/dark mode, reading progress, task persistence, print CSS, responsive layouts, and accessible labels.
- Include an applied task before completion criteria. Keep additional required work within the agreed lesson scope and time; do not add a separate fault-reproduction assignment by template habit. State deliverables, procedures, and observable evidence. Follow explicit user choices when assigning task status.
- Include interactive quizzes, a navbar results export, and simple submission requirements that demonstrate both practice and understanding. Keep every deliverable reference consistent with **What to submit**.
- Provide a **Pro** toggle with checkable goal-focused tasks, checkpoint-specific hints, a Full explanation control, and compact section-based progress markers alongside the guided version. Preserve the lesson flow and track Pro hint use in the exported report; follow the Pro-mode contract in `references/teaching-contract.md`.
- Use relative URLs so the page works locally and under a GitHub Pages project path.
- Use technical, direct language. Avoid marketing phrases, hype, fictional mission framing, and unexplained metaphors.
- Use Unity terms consistently: Unity Hub, Unity Editor, Project window, Hierarchy window, Scene view, Game view, Inspector, GameObject, component, Transform, and Play mode.
- Preserve exact interface labels, menu paths, scene names, and shortcuts from the sources or notes.
- Add future material as new sections before the final verification/sources section and update the table of contents.
- Do not commit, push, publish, or enable GitHub Pages unless the user asks.

## Validation commands

```bash
python3 <skill-dir>/scripts/validate_article.py <course-repo>/learning_material/<lecture-slug>/index.html
```

Then serve the page over local HTTP and verify both themes at 1440px and 1280px desktop plus 390px mobile. Report the output path, included sections, screenshot/video counts, source coverage, and verification result.

## Template precedence

The reference-page asset is a layout scaffold, not an authority over the teaching contract. Replace its legacy PRACTICE labels, reveal-only quizzes, plain Print control, exposed instructor content, green Chapter 2 accents, and automatic optional-extension content as needed. Never copy a completed lecture wholesale as a new lecture.
