# Educator guide — complete Unity User Interface chapter

This is a multi-session chapter, not a compressed one-hour lab. The article is the full teaching reference and supplies the exact incremental code. Guided mode explains each mechanism after the actions. Pro mode exposes outcome checkpoints and records hint usage. Backtick reveals contextual educator notes.

## Preparation
- Read the chapter route and compare prior spawning, physics, state and particle work.
- Use Unity 6000.3, a Built-In project, Input System and uGUI/TextMeshPro.
- Download the official Prototype 5, Challenge 5 and Course Library packages before class.
- Save separate core and challenge projects; preserve the challenge's X scripts and grid behavior.
- Rehearse one good hit, one bad hit, one good miss, restart and all difficulty values.
- Check the actual Unit 5 introduction at the top. Procedural videos are optional, mapped to source steps, start at 2× and allow speed adjustment. The introduction starts at 1×.
- Have a prior player project available for the player-specific asset replacement activity. The core click game intentionally has no avatar.

## Session plan
| Block | Estimated teaching/work time | Evidence |
|---|---|---|
| 5.1: preparation, motion, spawning, pointer selection | 75–90 min | One click removes one target; sensor cleans missed objects |
| 5.2: Canvas, score and particles | 60 min | Anchored readable score; accurate positive/negative deltas; burst cleanup |
| 5.3 and 5.4: state, restart, menu and difficulty | 90 min | Full menu/play/loss/restart cycle and distinct intervals |
| Challenge 5 | 60 min | Five diagnosis rows with actual retests |
| Lab 5 assets | 60–90 min | Preserved behavior after target/player/background replacement |
| Feedback, review and demonstration | 30–45 min | Neutral test, observed finding, revision and retest |
Downloads, installation and prior-project recovery may require additional time.

## Prediction prompts and misconceptions
- Four prefabs: why does the integer random range end at Count, not Count minus one?
- Why do all target Update methods see the click, yet only one should respond?
- A mouse press, a held button and pointer entry are three different events.
- Top-left anchors and Canvas scaling solve different problems.
- Score is a number; scoreText is a component reference displaying that number.
- What happens if a round ends during WaitForSeconds and there is no second guard?
- SetActive changes a hierarchy's visibility/activity; it does not implement every game rule.
- Why is the listener registered with a method name without parentheses?
- A smaller spawn interval creates a harder game; difficulty does not alter point values here.
- A new visual can import successfully while its shader or physics ownership is wrong.
- Helping a participant is allowed when needed, but must be recorded as assistance.

## Checkpoint use
The starter ZIP contains empty Target and GameManager classes. Completed reference ZIPs for 5.1–5.4 are deliberately separate. Let learners compare a failing checkpoint after attempting the mechanism; do not introduce the final script as a supplied baseline. Do not import duplicate class files. Inspector references are part of the exercise and must be assigned.

## Assessment evidence
The final recording should show the core loop, positive/negative score, state guards, difficulty, aspect ratios and asset changes, plus the five challenge repairs and one actual feedback/retest summary. The second file is the local ten-question results PDF. Local checkboxes are student-reported; local quiz completion does not certify the external Unity Quiz 5. Optional timer work is not required.

## Source differences to teach explicitly
The current challenge webpage and downloaded U6 archive differ in their mouse-input implementation. The inspected archive uses OnMouseEnter; the written repair replaces it with Input System press detection and a target-specific 3D raycast. Main-project coordinates are deliberately recentered with the background and border. Difficulty references are assigned in the Inspector rather than found by name. State guards and explicit particle cleanup make the reference behavior predictable.

## Scope
All four lessons, all five challenge defects, all asset-lab topics, official quiz routing and user feedback/testing are covered. The timer and external asset acquisition are optional. No participant test results are fabricated; the worked feedback example is explicitly illustrative.
