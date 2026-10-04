# Verification Checklist

## Content

- Every supplied URL was opened and used.
- Every substantive instructor note maps to a section, demonstration, instruction, or exercise.
- Learning outcomes match the procedures and final checklist.
- A dedicated required applied task combines the lecture's core concepts and states an observable result.
- All core tasks have consistent required status. Only intentionally optional work is labeled optional.
- Required tasks include persistent `data-task` checkboxes and were derived from the user's instructions or supplied sources.
- Technical labels, menu paths, scene names, and shortcuts match the selected Unity version.
- No accidental copied lecture text, progress key, or unused screenshots remain. Deliberate links to actual prior lessons are correct.
- Prose is instructional and technical rather than promotional.
- Learning outcomes begin with “By the end of this lecture, you will be able to:” and a numbered list. Headings and labels use sentence case.
- Every practical section has a brief introduction, numbered action groups and individual substeps, and a relevant explanation after each group and its video-reference row.
- Starter-download links resolve to actual packages or archives rather than tutorial images. Displayed code matches downloadable scripts.

## HTML and assets

- Run `scripts/validate_article.py` and resolve every error.
- Keep one `<h1>`, one semantic `<article>`, descriptive metadata, and logical heading order.
- Give every informative image useful alt text and a source caption.
- Use relative local image paths and verify every referenced asset exists.
- Keep external source/video links direct and functional.
- Check each embedded video’s lecture-step mapping and placement: written steps → horizontal titled thumbnails → Explanation → selected quiz if present. Check thumbnail expand/collapse, accurate aria states, pausing on collapse, and mobile scrolling without page overflow.
- Review the rendered lesson in reading order against the video-to-substep map. Confirm prerequisite mechanisms are taught before later collision/effect tests, and that the order of videos agrees with the order of written actions and explanations. Check exact mapping labels after moves; final demonstration steps must not introduce their first instruction for a core mechanism.
- Audit requested and in-scope mechanisms for missing videos or written implementation. Distinguish intentionally excluded topics from accidental gaps. Check that official-video differences and any supplementary scripts are stated beside the player. HTML validation and successful playback alone do not prove instructional alignment.
- Verify official media loads, metadata reports a positive duration, and one representative video plays. Check captions where supplied, source/fallback links, and that playing one video pauses the others.
- After a fresh load, confirm every player has `defaultPlaybackRate === 2` and `playbackRate === 2`. Verify the speed can be changed without a play handler resetting it. Check video sizing in both themes and desktop/mobile layouts.
- Keep all controls keyboard accessible and visibly focused.
- Give each body cell in `.window-table` and `.shortcut-table` a concise `data-label`; mobile layouts must retain every column.
- Remove screenshots copied from the reference page when they are not used by the new lecture.

## Browser checks

Serve the course repository locally over HTTP. Do not rely only on `file://` behavior.

At 1440 × 1000 and 1280 × 900:

- inspect the hero and at least one screenshot/table/practice sequence;
- verify the sticky table of contents never covers figures;
- verify figures remain inside the 900px article column;
- switch themes, reload, and confirm the selected theme persists;
- complete one required-task checkbox, reload, and confirm it persists; then use Reset progress and confirm task and quiz results clear;
- check that all images have nonzero natural dimensions;
- check for console errors and horizontal overflow.

At 390 × 844:

- verify the menu becomes static;
- verify the utility header wraps cleanly;
- verify tables become labeled cards and retain every field;
- verify `document.documentElement.scrollWidth === innerWidth`.

Test print preview and results export whenever quiz behavior or report content changes.

## Quiz and submission checks

- The sheet has the agreed question total (10 for Sound and Effects; up to 10 by default), focused on new concepts in the section where each is taught. Counters, report denominators, and submission wording match actual questions. Question IDs are unique and remain stable during revisions.
- Checking without a selection produces a prompt and no recorded attempt. A wrong answer shows a useful reason; changing and checking a correct answer retains the first answer and records the latest result. Rechecking an unchanged choice does not add attempts.
- Reload restores checked results and feedback. Draft-only selections remain uncompleted in the navbar count, scores, and report. Reset clears both tasks and quiz progress.
- Export with partial completion marks unanswered questions explicitly; export with full completion includes every question. Verify first/latest scores, answers, correctness, attempt counts, name/ID, and timestamp against the checked browser state. Keyboard/browser printing generates the same current report.
- Inspect a generated PDF for legible layout and complete results, with no article or utility controls. Practical checklist claims are labeled student-reported. Restore the prior browser state after using synthetic QA answers.
- What to submit specifies the recording and quiz PDF, a concrete demonstration checklist, a brief spoken explanation, export steps, and filenames. All other deliverable references agree. No unnecessary extra submission artifacts remain.

## Pro mode checks

- Read every Pro brief without opening hints: it must state an achievable goal and its success criteria, retain necessary resources and experimental constraints, and avoid revealing the implementation. Confirm section order, quizzes, required status, and deliverables match guided mode.
- In Pro with no hints opened, check that procedural videos, walkthroughs, code solutions, detailed explanations, and troubleshooting answers are hidden. Reveal representative hints and verify their content matches the task; return to guided mode and confirm the full lesson is restored.
- Open one hint, hide and reopen it, reload, then switch modes: the count remains one. Open another hint: it becomes two. Verify all hints close on each mode toggle and on reload, without erasing or inflating history. Guided mode still shows full instructions. Check per-task labels, keyboard controls, and video pausing when hidden.
- Export in guided-only mode, Pro with zero hints, Pro with several hints, and guided mode after using Pro. Verify total, hint list, mode history, and existing quiz/student results. Browser printing must produce the same current report.
- Reset progress and reload: hint counts, tasks, and quiz results clear; identity and selected mode remain. Use an isolated QA browser or restore prior state so synthetic hints do not enter the student's report.
- Check both modes in light/dark themes at desktop and mobile widths; inspect the generated report and verify no hidden lesson content or controls leak into print.

## Delivery

Report:

- the clickable absolute path to `index.html`;
- the lecture title and sections created or changed;
- the number of local screenshots and video links;
- desktop/mobile and light/dark verification results;
- any source limitation or unresolved version mismatch.

Only commit, push, or publish when explicitly requested. If GitHub Pages is enabled, the expected project URL is `https://<owner>.github.io/<repo>/learning_material/<lecture-slug>/`.

## Teaching-contract checks

- The lesson opens with a representative finished-result video followed immediately by curiosity questions, before the concept overview. Verify that the footage matches the claimed behavior, loads and plays at normal speed, and retains audio for sound lessons. Captions disclose relevant differences or automation.
- Opening questions refer to observable behavior and invite guesses without requiring unfamiliar terminology. They remain ungraded; the later practical explanations supply the answers.
- Prior lectures were inspected and new versus reused learning is explicit.
- Read the introduction as a first-time learner: each new concept has a plain-language meaning and purpose, with observable examples woven into the passage rather than a detached Examples heading or list. Formulas, API details, and implementation cautions appear in the relevant post-step explanations.
- Read each post-step Explanation independently: it defines the unfamiliar terms, explains the mechanism and why the preceding actions work, and uses concrete values or a code trace where useful. Refreshers recap material already taught rather than introducing technical details early.
- Every action group states its goal first. Individual actions are on separate lines. Only action tokens receive boxed mechanical typography.
- Concept eyebrows sit above titles; topic and concept headings have visibly distinct hierarchy.
- Relevant refreshers stay visible, use per-concept repeat counts, and agree with the introduction. No extra legacy theory blocks repeat them.
- All code mentions use consistent semantic markup; declarations and scripts use blocks. No nested code markup or modified source contents.
- Quiz feedback starts hidden until checked; FAQs start closed. Student instructions remain visible.
- Instructor content starts hidden, toggles with backtick, stays unaffected by typing into controls, and resets on reload.
- Skip to practice resolves to the first necessary practical section.
- Verify Chapter 2 purple in both themes, step-counter alignment, long code and UI-path wrapping, and mobile overflow.
- Verify explanation headings and content are flush with the article section’s left edge in desktop and mobile layouts, without borders or quote-style indentation. Check syntax highlighting in both themes.
- Preserve progress keys, check required/final-state consistency, verify example counts and refresher numbering after restructuring.
- Audit the whole document for slogans, duplicated preambles, stale section titles, ambiguous camera/version questions, and redundant material outside deliberate refreshers.

## Checkpoint and release regression checks

- Verify checkpoint persistence/reset, exact hint content, full-explanation behavior, counts and report entries, and closing on mode toggles. Keep synthetic QA state out of the student's browser.
- Verify section-row membership, checkpoint colors, quiz stars after checking/retrying, marker navigation, matching star/square centers, both themes, mobile overflow, and hidden progress UI in print.
- Audit final sections for duplicate requirements. Confirm every sheet's hamburger links resolve locally and on the public project path before sharing.
