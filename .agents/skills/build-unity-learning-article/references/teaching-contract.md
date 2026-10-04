# SWE 402 teaching and presentation contract

These are the instructor’s established preferences from the Player Control, Basic Gameplay, and Sound and Effects lecture revisions. Apply them to this course’s lecture sheets unless a later request overrides them. Do not propagate course-specific defaults to unrelated deliverables.

## Scope and continuity

- Read the actual previous lectures before choosing content. Internally map every candidate topic to **new**, **deeper application**, or **recap**, with the earlier lesson and section as evidence. Do not call an API new merely because the setting or scene changed.
- Select the highest-value additions from the supplied unit, not the entire unit. Exclude repeated lessons, low-value details, obsolete approaches, and edge cases. Keep practical work comparable in length to prior lectures and completable in about 60 minutes.
- Open with a concrete connection to earlier work: what students already did, what changes now, and the capability gained. Label a concise prior-knowledge recap separately. Keep most attention on the new material.
- Refer to the actual lecture title and link to its relevant section. Avoid vague references such as “the earlier Editor lesson.”
- A conceptual dependency does not require previous project files. Start from a fresh project and an official starter/template when available. Inspect the source’s starter contents and give the exact download, import, scene, and save instructions. Provide starter templates for support outside the lesson focus and complete working scripts labeled **Final references** for later comparison. The sheet must support both instructor preparation and students following independently.
- Put downloads, imports, and restarts in clearly identified pre-class preparation if they would consume the hour. Do not claim the entire workflow fits an hour while hiding required work.

## Teaching sequence and prose

- Open with a short finished-result video before the conceptual overview and setup. Let learners see and hear what they will build before explaining its machinery. Prefer the matching official Unity Learn introductory/result video when it represents the lesson; use a verified capture of the actual final scene when needed; for sound lessons, retain audible game audio. Keep native controls visible, do not autoplay, and play this result preview at normal speed. The 2× default applies to procedural reference videos.
- Immediately below the preview, ask a few inviting “How was this made?” questions grounded in visible or audible behavior. For example: what is moving when the character runs in place, how does the game reject a second jump, or how does one collision coordinate animation and sound? Questions should invite observation and guesses without requiring API names or prior technical knowledge. Do not grade them or reveal the answers here; the practical work should answer them.
- Use real footage with an accurate caption and a working source or fallback link. Disclose relevant automation or differences from the lesson’s expected result. Inspect the video before selecting it; do not present a mockup, unrelated scene, or unfinished capture as the completed lesson. If suitable footage is unavailable, report that concrete gap rather than inventing a demonstration.
- Start with a concise conceptual overview before practice. Assume the learner has never seen the new concepts. Explain what each idea means, why the game needs it, and what the learner will build or observe. Define essential terms in plain language. Earlier-course links provide context, but must not substitute for introducing unfamiliar material.
- Keep formulas, API calls, parameter types, callback timing, implementation rules, and code-level cautions in the relevant post-step **Explanation**. The introduction should orient the learner; each Explanation should teach the mechanism from first principles, connect it to the actions just performed, and explain why it produces the observed result. Define unfamiliar terms before using them in the reasoning.
- Example: introduce an impulse as the brief upward push that starts a jump, with gravity bringing the character down. After the jump steps, explain `AddForce`, impulse divided by mass, the grounded check, and why this one-time push is not multiplied by `deltaTime`. Likewise, introduce animation switching through running, jumping, and crashing before teaching Trigger, Bool, and Int parameters after the Animator steps.
- Write short, connected paragraphs with meaningful technical headings. Avoid a single dense paragraph for several concepts and semicolon-compressed explanations.
- Use direct, practical, technical language. Remove marketing, motivational framing, and slogan-like lead-ins such as “Familiar value, new source,” “New capability,” “Reused foundation,” or “Prove the new behavior.” Retain informative labels such as “Target reference.”
- Weave concrete examples into the introductory concept prose as each idea is explained. Connect the definition, purpose, and example in a continuous passage; do not append a separate Examples heading or labeled list to an introductory concept. Use observable behavior and plain language, with varied examples where useful rather than a fixed count. Reserve numerical calculations and code traces for post-step explanations. Clearly distinguish illustrative examples from additional implementation tasks.
- Retain context for unfamiliar terms even when explaining only new material. A recap can be short without assuming students understand new terminology.
- Each practical section, including preparation, starts with a brief introduction stating what students will do. Follow it with practical steps. Immediately after each action group, explain what students just did and the necessary theory, using concrete values or a traced example when the mechanism is unfamiliar. Move long theoretical preambles into these relevant explanations.
- Use sentence case; do not use all-caps headings, labels, or CSS text transforms. Preserve capitalization in official acronyms, identifiers, and exact UI labels.
- Under **Learning outcomes**, write “By the end of this lecture, you will be able to:” followed by a numbered list.

## Concept headings and deliberate refreshers

- Introduce each new core concept with a small **New concept** eyebrow on its own line above the concept name. Use a restrained purple accent and left rule for Chapter 2. Do not put the label beside the title.
- Keep new/deeper/recap classification internal. Do not expose “Deeper application” as a student-facing tag; use **New concept** for the concept-heading treatment.
- Maintain an obvious hierarchy: numbered topic headings larger than concept headings, neutral primary text and section dividers, concept names smaller and accented. Do not repeat “New:” in topic headings when the concept eyebrow already communicates it.
- At the end of each practical section, recap only concepts and examples already introduced or taught in that section. These **refreshers are deliberate repetition**. They may summarize the technical explanation after it has been taught, but must not introduce mechanisms before the relevant post-step Explanation. Keep their meaning consistent with the introductory overview; do not copy detailed refreshers back into the introduction.
- Refreshers are visible, not collapsed and not wrapped in a generic disclosure box. Use the same concept-heading treatment with **Refresher (1)**, **Refresher (2)**, etc. Count occurrences separately for each concept in document reading order. The original introduction does not count. Recompute counts after reordering or removing content.
- Follow with optional FAQs answering likely student questions. FAQs may use closed disclosure controls. Do not introduce another unlabeled theory block alongside the refresher.

## Action steps and code

- Start each numbered action group with a plain-language end goal explaining what the student is trying to achieve. Then place each individual instruction on its own line.
- Number action groups within their section (for example, `4.2`), and number their individual substeps (`4.2.1`, `4.2.2`, `4.2.3`). Numbering only the action-group headings does not satisfy substep numbering. Split distinct actions into separate substeps.
- Present each post-step explanation as a plain subsection with an **Explanation** heading. Align its heading, prose, code blocks, and figures with the article section’s left edge. Do not use a quote-style rule, callout box, or the step list’s number-column indentation. Verify the rendered alignment; removing the explanation’s own padding does not remove a parent list’s padding.
- Keep explanatory prose in the normal sans-serif body font. Apply the mechanical/monospace font and subtle light box only to actionable UI paths, control labels, selected values, or filenames—not entire paragraphs or steps.
- Preserve exact UI names and full paths. For this Unity 6.3 lab the verified path is **Project Settings → Input System Package → Settings**. Treat such paths as version-specific, not permanent instructions for all Unity releases.
- Distinguish object names from verbs, for example: drag “Player” from the Hierarchy into Target.
- Align step numbers with the first line of the goal, including wrapped goals. Remove paragraph top margins that offset the text from the counter.
- Mark all code references consistently with semantic code markup: event/API names, fields, types, attributes, expressions, and numeric vector examples. Inline code uses monospace, a subtle background/border, and a distinct theme-aware color. Format plain-text mentions in explanations, examples, tables, quizzes, answers, and refreshers too.
- Put complete statements/declarations and scripts in separate pre/code blocks with preserved whitespace. Do not nest code tags. Do not alter code content while styling it. Menu paths are UI actions, not C# code.
- Syntax-highlight code blocks with theme-aware token colors, preserving copyable source and indentation. Keep displayed scripts consistent with their downloadable files. When asking students to attach components, explicitly identify them as scripts and name the target root GameObjects.

## Incremental student-written code

- The learner writes the focal behavior. Supply starter templates only for out-of-scope support, scaffolding, or already taught mechanisms; distinguish supplied behavior from code still to be written.
- Break implementation into small code blocks in the relevant guided steps and Pro hints. Name the script and exact insertion/replacement location, and say what earlier code to retain. Later steps extend the same scripts instead of restarting them or assuming completed files were imported.
- Explain the code just written in the following Explanation: fields, conditions, callbacks, units, state changes, and observable results. Introduce dependencies before a later step uses them.
- Label completed files, download links, archives, and full listings **Final references**. Place them after implementation for comparison; hide solutions behind a counted hint in Pro. Keep starter downloads accessible in both modes.
- Verify intermediate checkpoints compile where tooling permits, and compare the assembled final code with the downloadable references. Audit setup prose for obsolete assumptions that finished scripts exist from the beginning.

## Tasks, navigation, and instructor content

- Use up to **10 questions total** by default, concentrated on new concepts at relevant post-explanation checkpoints. Sound and Effects uses exactly 10. Do not attach a quiz to every step: omit routine setup recall, repeated checks, and submission/checklist questions. Ask students to predict, calculate, explain, or diagnose what that section actually taught. Use fewer when the material warrants it; follow explicit instructor totals. Keep required procedure instructions outside hidden feedback.
- Required applied tasks and further core tasks remain required. The former Player Control optional chase-camera section was explicitly made required. Do not force optional extensions into future lectures just because the old scaffold contains one. Optional FAQs and reference videos remain optional.
- When removing a task, remove its TOC entry, Pro brief, completion checkbox, report requirement, and submission evidence; renumber later sections. Do not restore it through a template. Sound and Effects no longer includes the separate playback-fault task; its event-playback concept belongs in the particles section. Preserve the agreed quiz total by relocating a relevant question only where it is actually taught.
- Core background scrolling, when in scope as in Sound and Effects, is required and has its own incremental code, explanation, and Pro hint.
- Use one **Skip to practice** link near the introduction. Link to the first required practical/preparation section so students do not bypass necessary setup.
- Hide instructor-specific content by default: timing plans, opening demonstrations, scope decisions, teaching prompts, and preparation commentary. Toggle it with the backtick character (`). Ignore repeated keys, modifier shortcuts, and typing inside form controls or contenteditable elements. Instructor mode resets to hidden on reload. Required student instructions must never depend on this toggle.
- Chapter 2 uses purple tones rather than Chapter 1’s green, in both themes. Preserve the course layout and secondary accents. Do not recolor previous chapters automatically.

## Unity Learn step videos

- Inspect the official tutorial’s numbered steps for available videos. Map each relevant demonstration to this lecture’s action group and substeps; source numbering need not match lecture numbering. Do not invent a video for course-specific tests or procedures.
- Order each group as **written steps → video reference thumbnails → Explanation → selected quiz, if any**. Arrange titled thumbnails horizontally, with scrolling on narrow screens. Clicking a thumbnail expands its native player below the row; clicking again collapses it. Keep players collapsed initially, pause hidden players, and provide keyboard-operable controls with accurate expanded states. The opening preview remains a visible player.
- Embed official media with native video controls, `playsinline`, and `preload="metadata"`. Link to the original tutorial step and an **Open video** fallback. Include verified official English captions when available. Label source demonstrations that use different scripts or intermediate settings, and keep the lecture’s final procedure authoritative.
- Set both `video.defaultPlaybackRate = 2` and `video.playbackRate = 2` when initializing each player. Students can change the speed; do not force it back to 2× on every play event. Do not autoplay. Pause other embedded players when one starts.
- Videos are optional references, not additional required class time. Keep the written instructions self-sufficient.

### Synchronize videos and written content

- Choose the teaching sequence by prerequisites, then put both videos and written actions in that order. A video group is part of its action group, not a collection of links to append wherever space is available. Introduce a mechanism before students are asked to use or diagnose it; for example, teach collision-based game over and stopped movement/spawning before testing crash animation and effects. Final applied tasks should verify mechanisms already taught.
- Within a group, order the demonstrations to match the written substeps. When the instructor reorders videos, also review and, where needed, reorder the actions and explanation; changing player order alone does not establish alignment. For example, camera music setup should precede Audio Clip variables when that is the chosen teaching sequence, and explosion customization should precede dirt setup when requested.
- Map each video to the exact actions it demonstrates, not merely a related topic or a later final test. Keep displayed step ranges, nearby prose, script names, Inspector settings, and links accurate after any move or renumbering. Explain relevant differences between official footage and the supplied implementation beside the player.
- Check coverage of every mechanism included in the written lesson or requested by the instructor. Inspect the source tutorial for missing demonstrations and prerequisite clips; for example, an endless-background sequence needs movement, position reset, and seam/repeat-distance setup rather than only a video of the final effect. Do not make an instructor-requested core mechanism optional merely because an earlier draft omitted it. Follow the agreed scope; label genuine supplementary content and its additional script requirements clearly.
- Keep the written path sufficient for a student who skips every video: give the actual setup and code needed, explain why they work after the actions, and state what students should observe. A video does not substitute for a missing implementation step or explanation.


## Interactive quizzes and results export

- Use a short question with meaningful answer choices and a **Check answer** button. Group choices with a labeled fieldset and native radio controls. Hide correctness and the explanation until a response is checked; announce feedback through an accessible live region. A missing selection prompts the student to choose without recording an attempt.
- Give correct/incorrect feedback with a brief reason. Allow students to change their choice and check again. Preserve the first checked answer, the latest checked answer, and the number of checked attempts. Rechecking an unchanged choice must not inflate the attempt count. Selecting an option alone is a draft, not a checked result.
- Persist quiz progress under a unique lecture-specific localStorage key with stable question IDs. Restore selections, checked feedback, and attempt counts after reload. Keep existing task and theme keys stable during revisions. **Reset progress** clears task and quiz results together; retain student identity unless the user asks otherwise.
- Use a navbar **Export results** button with a live checked/total count. Collect name and student ID in the submission section. On export, generate the current report and open browser printing so students can save a PDF. Also generate it on `beforeprint` so keyboard printing uses current results.
- The printable report includes lecture identity, student name/ID, export time, checked/total count, first-answer and latest-answer scores with clear denominators, and each question’s first/latest checked answers, correctness, and attempt count. Mark unchecked questions **Not answered**; never count a draft as completed. Show missing identity explicitly. Any practical completion checkboxes in the report must be labeled student-reported.
- Print the results as a legible report without navigation, buttons, or the full article. Populate student text safely. Export the student’s actual saved results; keep synthetic QA answers out of the delivered browser state.

## Pro mode and hints

- Provide a clearly labeled **Pro** toggle in the utility header. The guided version remains the default. Both modes follow the same sections, action groups, learning outcomes, quizzes, required tasks, and submission requirements.
- Author a concise Pro brief for each action group: tell the student **what to accomplish** and what observable result counts as success. Retain necessary constraints, starting resources, and target values for controlled comparisons. Put menu paths, click sequences, exact API calls, worked solutions, and implementation reasoning behind hints. Do not merely shorten the walkthrough or hide it without supplying an actionable brief.
- Give each task a **Full explanation** button that reveals the relevant guided instructions, post-step explanation, code examples, screenshots, and procedural videos. Preserve their teaching order and video/content mapping. Keep the opening finished-result preview, introductory overview, quizzes, completion criteria, and necessary starter resources available. Supplementary walkthroughs and troubleshooting references also need a hint control if they reveal how to perform the work.
- Reuse the existing guided material as the hint content so the two modes stay synchronized. Every Pro on/off toggle closes all hint disclosures; re-entering Pro starts with all hints hidden. Reload also starts with closed hints. Switching back to guided mode restores the full guided material. In Pro, hidden instructions must not remain visible through duplicate code blocks, tables, or refreshers. Pause a procedural video when its hint is hidden.
- Count each distinct hint once, on its first reveal in Pro. Hiding, reopening, refreshing, or switching modes must not inflate the count. Make this counting rule visible to the student. Use stable task/hint IDs and preserve them across content revisions.
- Keep disclosure state separate from usage history: do not reopen a hint merely because its ID appears in the history. Persist the chosen mode, whether Pro has been used, and the set of previously used hints under a lecture-specific storage key. Preserve existing task, quiz, identity, and theme behavior. **Reset progress** clears hint history along with task and quiz results; retain the selected mode and student identity. If storage is unavailable, keep the page usable and explain that activity lasts only for the current visit.
- The exported report records whether Pro was used, the current mode, the number and task names of hints opened, and whether the student returned to guided mode after entering Pro. Keep that history when the current mode is guided. Distinguish **Pro not used** from **Pro used with zero hints**. The count describes hints opened through the sheet, not independently verified mastery or all outside assistance.
- Use an accessible toggle state and hint buttons with accurate expanded states and controlled-content IDs. Preserve keyboard operation, both themes, mobile layout, and results-only printing. Test the report from both the Export results button and browser printing.

## What to submit

- Include a visible **What to submit** section and TOC entry. Default to two files: a short screen recording demonstrating the required practice, and a PDF exported from the completed quizzes. Avoid extra screenshots, logs, or written reports unless the instructor requests them or they supply necessary evidence that those two files cannot show.
- Tailor a concise recording checklist to the lecture’s outcomes: show the working behavior, one meaningful rejected action or controlled fault and its correction when relevant, and briefly explain a key mechanism aloud. Require audible playback for sound tasks. A 1–2 minute recording is a useful default, adjusted to the actual demonstration.
- Tell students to check every quiz, read feedback, retry mistakes, enter their name/student ID, click **Export results**, and choose **Save as PDF**. Give simple student-ID-based filenames and state exactly which files to submit.
- Keep practice assets and final saved scene requirements distinct from the files to upload. Align applied-task deliverables, completion criteria, and submission wording; do not leave older separate test-log or prediction-note requirements when the recording now provides that evidence. The recording demonstrates practice and the checked answers/corrections provide evidence of understanding; the export alone does not verify Unity runtime behavior.

## Whole-document revision audit

After edits, read the whole sheet, not only the changed block:

- Remove obsolete theory sections, duplicated preambles, repeated definitions outside intentional refreshers, slogan fragments, and abandoned labels from previous iterations. Preserve unique useful information by moving it into the relevant explanation/refresher.
- Keep one clear sequence: context → concepts → preparation → guided work → application → verification → sources. Put section refreshers near the work they support.
- Check consistency across timings, section names, TOC, required status, steps, code, quizzes, answers, FAQs, and final deliverables. Qualify questions when multiple versions exist, such as fixed-heading versus chase camera.
- Make the saved final state explicit. Keep backup C# files outside Assets when an in-project copy would create a duplicate class. Keep earlier task evidence distinct from final-state requirements.
- Preserve stable progress keys and existing anchors during revisions, even if a legacy internal ID contains “optional.” User-facing wording and required task metadata must reflect the final scope.
- Do not erase intentional intro-to-refresher repetition during deduplication. Check per-concept repeat counts and three-example lists after every structural change.
- Include relevant refreshers after Section 01 preparation as well as later practical sections. Remove redundant explanations outside these deliberate refreshers without stripping the background beginners need.
- Verify starter-download links target the actual package or archive, not an image linked from the tutorial. Check the response/file type and package contents when feasible.

## Pro checkpoints and compact progress

- Present Pro task goals as individually checkable outcomes. Keep the requested result and constraints visible, and implementation details behind hints. Persist each check across reloads and mode switches; Reset progress clears checks.
- Beside each checkpoint, provide a small `?` button that reveals only the matching instructions and code. Reuse precisely mapped guided substeps or write a focused note. Keep **Full explanation** for the entire task walkthrough; its open label is **Hide full explanation**.
- Count each distinct checkpoint hint and full explanation once. Preserve history on toggles and reloads, but close all disclosures. A full explanation counts as assistance for every checkpoint in that task; a checkpoint hint affects only that checkpoint. Keep report labels explicit about this distinction.
- Show a compact, unboxed bottom-left progress display only in Pro: one row per practical section, squares for checkpoints and centered SVG stars for quizzes in reading order. No visible title or legend. Use approximately 9px marker boxes with consistent centers, small gaps, and accessible labels/tooltips.
- Checkpoint squares: gray unchecked, yellow completed without a relevant hint, orange completed with one. Quiz stars: gray unchecked, yellow latest checked answer correct, orange incorrect. A draft answer is not a checked result. Clicking a marker navigates to its checkpoint or quiz.
- Include the shared top-left hamburger navigation on every sheet, with all course-sheet links, current-page indication, keyboard dismissal, and mobile support. Verify links on the deployed project path.

## Finish without repetition

- Keep the final applied task as the single authoritative test/recording sequence. Avoid repeating it as a behavior table, multiple checklists, a refresher, and submission prose.
- Follow with troubleshooting and final references. Submission lists the required files, filenames, and export steps, linking back to the test rather than repeating it.
- Before release, read as a first-time student: clarify where fields go, which object/component to select, when to leave Play mode, and which values to restore. Keep code, Pro checkpoints, specific hints, video mappings, quizzes, and submission evidence consistent after edits.
