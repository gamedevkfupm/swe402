# SWE 402 Unity Article Design Contract

The canonical implementation is `assets/reference-page/index.html`. Preserve its visual grammar and interaction model. Content may change; the system should not.

## Visual direction

- Retro technical manual with pixel-game references, not a game marketing page.
- Square geometry, 8px background grid, 2–4px borders, hard offset shadows, and restrained chapter accents (green for Chapter 1, purple for Chapter 2) with orange secondary accents.
- Monospace display type for headings and labels; readable sans-serif type for body copy.
- No gradients on text, glassmorphism, rounded cards, glow effects, decorative icons, or presentation-like panels.
- Screenshots remain crisp and unfiltered. Never apply `image-rendering: pixelated` to Unity screenshots.

## Fixed layout

- Overall content width: `min(1280px, calc(100% - 2rem))`.
- Desktop grid: `220px minmax(0, 900px)` with `clamp(2rem, 4vw, 4rem)` gap.
- The table of contents is sticky on desktop and becomes static below 960px.
- Figures use `width: min(100%, 920px)` and never use a negative left margin.
- A breakout figure may be 100% of the article column only. It must not overlap the table of contents or viewport edge.
- At 680px, comparisons and outcomes become one column. Video reference thumbnails retain a horizontally scrollable row; expanded players fit the article width.
- At 680px, data tables become bordered row cards. Every `<td>` must carry a short `data-label` matching its column heading; do not hide technical columns.
- No horizontal overflow at any viewport.

## Required page regions

1. Reading-progress strip.
2. Sticky utility header with course mark, theme toggle, Pro toggle, Reset progress, and Export results with the checked/total quiz count.
3. Hero with lecture identity, technical description, metadata, pixel motif, and lecture number.
4. Desktop table of contents.
5. One semantic `<article>` containing all lecture sections.
6. Required applied task with persistent completion controls.
7. Further required core tasks when needed; optional tasks only when requested or justified by the chosen scope.
8. Completion checklist and official source list.
9. What to submit with a recording checklist, quiz-PDF instructions, and name/student-ID fields.
10. Footer attribution and a print-only quiz results report.

## Required component styles

- Section kicker with number, technical label, and rule.
- Comparison blocks for easily confused concepts.
- Ordered procedure groups with section-based numbering (for example, `4.2`) and numbered individual substeps (`4.2.1`, `4.2.2`).
- Plain post-step explanation subsections aligned with the article section’s left edge, with no quote rule, callout box, or inherited list indentation.
- Sentence-case headings and labels, and theme-aware syntax highlighting for code blocks.
- Notes, warnings, and chapter-accented interactive mini quizzes with labeled choices, Check answer controls, and feedback hidden until checked. Replace legacy PRACTICE wording and reveal-only quiz disclosures in scaffolds.
- Bordered reference tables for mappings and shortcuts.
- Keyboard keys rendered with `<kbd>`.
- Screenshot figures with hard shadow and source caption.
- Horizontal titled video thumbnails after written substeps and before Explanation, expanding to native players with source/fallback links and 2× default playback. Keep players inside the article column and follow the teaching contract’s video behavior.
- Persistent task checkboxes for the required applied tasks; use additional checkboxes when either task has multiple targets.

## Theme contract

- Support explicit light and dark themes with CSS custom properties.
- Initialize from the saved choice, otherwise use `prefers-color-scheme`.
- Persist the manual choice in `localStorage` using the shared key `unity-editor-reference-theme` so the choice follows students across lectures.
- Theme controls must expose current and next state through an accessible label.
- Maintain strong contrast for text, controls, warnings, practice blocks, tables, and keyboard keys in both themes.

## Per-lecture replacements

Always replace these values when scaffolding:

- `<title>` and meta description;
- header course identifier suffix;
- hero kicker, title, description, metadata, and decorative lecture number;
- table of contents, section IDs, section numbers, and headings;
- all content, official links, screenshot sources, alt text, and captions;
- progress-storage key with a unique lecture slug;
- footer text if attribution requirements change.

Keep the shared theme-storage key unchanged.

## Instructional components

Apply `teaching-contract.md` for goal-first step rows, boxed UI actions, inline and block code, stacked concept eyebrows, visible numbered refreshers, optional FAQs, and the backtick instructor toggle. These newer requirements supersede conflicting scaffold examples.
