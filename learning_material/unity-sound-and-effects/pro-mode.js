/* Pro tasks keep the same learning outcomes; the existing walkthrough is each task's hint. */
(() => {
  const key = 'unity-sound-and-effects-pro-progress';
  const tasks = {
    '1.1': ['Prepare a fresh Prototype 3 project.', 'Use Unity 6.3 Universal 3D, the official starter assets, and the starter templates. Save a separate Sound and Effects scene, with the new Input System ready and no compilation errors.'],
    '1.2': ['Prepare a physical player that can land on a solid floor.', 'Use the road-worker character and RunnerController. The player must face right, remain fixed horizontally, and move vertically under physics. Start with mass 1. Jumping and animation code will be written later.'],
    '1.3': ['Prepare incoming obstacles.', 'Create a reusable solid cube obstacle and connect RunnerObstacle and RunnerSpawner to the player. Obstacles should approach from the right at speed 6, every 3 seconds. Keep spawning disabled for the first jump test, and frame the scene with the camera.'],
    '1.4': ['Verify and save the mechanics-only baseline.', 'Confirm that Player lands without horizontal drift or Console errors. Space should do nothing until you write the jump. Keep animation, particles, and event sounds inactive for now.'],
    '2.1': ['Write one accepted jump at a time.', 'Extend your starter script to accept a fresh Space press from the ground and apply one impulse. Demonstrate one jump from the ground, a rejected airborne press, and no automatic repeated jumping when Space is held. Explain how your controller carries an accepted press into the physics update.'],
    '2.2': ['Investigate the effect of mass.', 'Predict and compare jumps at masses 1 and 2 while keeping impulse at 7 and gravity unchanged. Explain the difference and what permits another jump. Restore mass 1 afterward.'],
    '2.3': ['Write the shared game-over behavior.', 'Extend your controller, obstacle, and spawner scripts so the first obstacle collision ends the run. Then test a collision before adding animation or effects. Confirm that further jumps, obstacle movement, and new spawns stop; observe for at least six seconds. Explain how the components share the decision. Leave spawning disabled for the next setup.'],
    '2.4': ['Write an endlessly repeating background.', 'Create a fourth script, RunnerBackground, that scrolls the scenery left at 6 units per second, loops without a visible join, and stops when the run ends. Keep the floor stationary. Demonstrate at least two repeats and a crash.'],
    '3.1': ['Give the runner its own animation controller.', 'Preserve the imported controller for other characters. Write the startup animation request so this player runs in place when play starts, while physics continues to control its position.'],
    '3.2': ['Match the character’s animation to gameplay.', 'Extend your existing jump and collision code to request a jump pose on accepted jumps and a death pose after an obstacle collision. Further jump input must be rejected after a crash. Adjust the jump pose timing if needed without changing the physical arc.'],
    '4.1': ['Add a crash burst and running dust.', 'Add particle references and playback calls to the controller you have built. Prepare a single explosion for the first crash and dust that trails behind a living player on the ground. Dust must stop emitting in the air, resume on landing, and stay off after a crash. Neither effect should fire merely because the scene starts.'],
    '4.2': ['Add music and event sounds.', 'Keep background music looping quietly. Add clip references and event playback to your existing controller. Play one sound for each accepted jump and one for the first crash; rejected jump input must be silent. Make both effects audible over the music.'],
    '5.1': ['Record the complete event sequence.', 'Produce a 1–2 minute recording with sound: two seamless background repeats, run, jump, rejected airborne press, landing, crash, and rejected post-crash input. You may record background repeats in a first run with spawning disabled, then enable spawning for the event sequence. Show that background and obstacle motion and spawning stay stopped for at least six seconds after the crash. Explain why a later landing cannot restart dust, then save the final scene.'],
  };
  const checklistItems = {
  "1.1": [
    "Prepare a fresh Unity 6.3 Universal 3D project with the official Prototype 3 assets.",
    "Save a separate Sound and Effects scene.",
    "Set up the new Input System for Space input.",
    "Import only the three starter templates and resolve compilation errors."
  ],
  "1.2": [
    "Prepare a solid floor tagged Ground.",
    "Prepare the right-facing player with RunnerController and solid collision.",
    "Allow vertical physics movement while preventing horizontal drift and rotation; use mass 1.",
    "Keep animation from moving the player’s position."
  ],
  "1.3": [
    "Prepare a reusable solid cube obstacle tagged Obstacle with RunnerObstacle; use speed 6.",
    "Connect RunnerSpawner to Player and the obstacle prefab; use interval 3 seconds.",
    "Frame the scene in a 16:9 Game view.",
    "Leave spawning disabled and Background stationary for the first jump test."
  ],
  "1.4": [
    "Keep event audio silent at startup.",
    "Confirm Player lands without horizontal drift or Console errors.",
    "Confirm Space has no effect yet; jump code comes next.",
    "Stop Play mode and save the baseline scene."
  ],
  "2.1": [
    "Extend RunnerController to recognize a supporting ground contact.",
    "Accept a fresh Space press only while grounded.",
    "Carry each accepted press into physics and apply one impulse.",
    "Test a ground jump, a rejected airborne press, and holding Space without repeated jumps."
  ],
  "2.2": [
    "Predict and observe the jump with mass 1 and impulse 7.",
    "Change only mass to 2 and compare peak height.",
    "Explain the difference and what permits the next jump.",
    "Restore mass 1 outside Play mode and save."
  ],
  "2.3": [
    "Make the first obstacle collision end the run.",
    "Reject further jumps and any pending jump after game over.",
    "Stop existing obstacle movement and new spawns using the same game-over state.",
    "Test a crash and observe for at least six seconds.",
    "Disable spawning again before background setup."
  ],
  "2.4": [
    "Create RunnerBackground as the fourth script; keep Ground stationary.",
    "Scroll the scenery left at 6 units per second.",
    "Repeat it seamlessly and demonstrate two complete repeats.",
    "Stop scrolling when the shared game-over state changes.",
    "Test a crash, then disable spawning for animation setup."
  ],
  "3.1": [
    "Give Player its own copy of the imported animation controller.",
    "Preserve its Avatar and keep physics in charge of position.",
    "Write the startup animation request and enable animation.",
    "Verify a running pose without horizontal movement."
  ],
  "3.2": [
    "Request a jump pose only for an accepted physical jump.",
    "Request the death pose after the first obstacle collision.",
    "Verify airborne presses cannot request another jump and post-crash input is rejected.",
    "Adjust jump-pose timing if needed without changing the physical arc."
  ],
  "4.1": [
    "Prepare one crash burst that does not play at startup.",
    "Prepare running dust behind the player without an automatic startup burst.",
    "Extend the controller with references and event-driven particle playback.",
    "Verify dust starts on landing, stops emitting in the air, and resumes on a living landing.",
    "Verify one crash burst and no dust restart after game over."
  ],
  "4.2": [
    "Add quiet, looping background music.",
    "Extend the controller with jump and crash clip references and playback.",
    "Play one sound per accepted jump and one for the first crash.",
    "Verify rejected presses are silent and both effects are audible over the music.",
    "Save the scene."
  ],
  "5.1": [
    "Record 1–2 minutes with sound, including two seamless background repeats; a separate run with spawning disabled is allowed.",
    "With spawning enabled, show a jump pose and one jump sound, a rejected airborne press, and dust stopping then resuming on landing.",
    "Show one death animation, crash burst, and crash sound; demonstrate rejected post-crash input.",
    "Continue for six seconds: background and obstacles remain stopped and no new clones appear.",
    "Explain why a later landing cannot restart dust, then save the final scene."
  ]
};
  // Each checkpoint maps only to the guided substeps needed for that outcome.
  const checkpointSources = {"1.1": [[1, 2], [3], [4, 5, 6], [7]], "1.2": [[1, 2], [3, 4, 5, 6], [7], [8]], "1.3": [[1, 2, 3, 4], [5, 6], [7], []], "1.4": [[1], [2, 3], [3], [4]], "2.1": [[1, 2], [3], [4], [5]], "2.2": [[1], [2], [], [3]], "2.3": [[1, 2], [3], [4, 5], [6], []], "2.4": [[1, 2], [4], [3, 5], [], [6]], "3.1": [[1, 2, 3], [3], [4, 5, 6, 7], [7]], "3.2": [[1, 2], [4, 5], [3, 6], [7]], "4.1": [[1], [2, 3, 4], [5, 6, 7, 8], [], []], "4.2": [[2], [1, 3, 6], [4, 5], [7, 8], []], "5.1": [[1], [2], [3, 4], [3], [5]]};
  const checkpointNotes = {"1.3-4": "Outside Play mode, uncheck RunnerSpawner in its component header. Leave Background where it is; its scrolling script is introduced in step 2.4.", "1.4-3": "Focus Game view and press Space. Nothing should happen yet: the starter Update and FixedUpdate methods are empty. Write the jump in step 2.1.", "2.2-3": "Velocity change is impulse divided by mass: 7 / 1 = 7 units/s; 7 / 2 = 3.5 units/s. The slower launch rises less. Another jump requires a Ground-tagged supporting contact with normal.y greater than 0.5.", "2.3-5": "Stop Play mode, then uncheck RunnerSpawner in its component header. Save before setting up the background.", "2.4-4": "In RunnerBackground.Update, keep the runner.GameOver check in the early-return condition before changing distance or position. Assign Player to Runner so the background reads the same state as the obstacle and spawner.", "4.1-4": "Assign Dirt to the controller\u2019s Dirt field. With spawning disabled, enter Play mode and let Player land: dirt should start. Press Space: new particles should stop, though existing ones may fade. Land again: dirt should resume. Check the calls after grounded = true and after the jump impulse if a phase is missing.", "4.1-5": "Assign Crash to the controller\u2019s Crash field. Stop Play mode, enable spawning, and allow an obstacle to hit. Expect one burst. The GameOver guard at the top of OnCollisionEnter must return before any later Ground branch can call dirt.Play().", "4.2-5": "Stop Play mode before saving settings. Save the scene after assigning the clips and adjusting music volume; Inspector changes made during Play mode are normally discarded when play stops.", "5.1-4": "After the first crash, wait at least six seconds without stopping the recording. Watch the background and existing obstacles for movement, and the Hierarchy for newly created obstacle clones."};
  const groups = new Map();
  let state = { enabled: false, usedPro: false, guidedAfterPro: false, hints: [], checks: {} };
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && typeof saved === 'object') {
      state = { enabled: saved.enabled === true, usedPro: saved.usedPro === true,
        guidedAfterPro: saved.guidedAfterPro === true,
        checks: saved.checks && typeof saved.checks === 'object' ? saved.checks : {},
        hints: Array.isArray(saved.hints) ? saved.hints.filter(x => typeof x === 'string') : [] };
    }
  } catch { storageAvailable = false; }

  const toggle = document.getElementById('proToggle');
  const status = document.getElementById('proStatus');
  const summary = document.getElementById('proReportSummary');
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch { storageAvailable = false; }
  }
  function mark(node, group) {
    if (!node.id) node.id = `pro-hint-${group.id.replaceAll('.', '-')}-${group.nodes.length + 1}`;
    node.dataset.proHint = group.id;
    group.nodes.push(node);
  }
  function addGroup(id, title, host, checkpoint = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiet-button pro-only hint-button';
    button.dataset.hintFor = id;
    button.setAttribute('aria-label', `Give me a hint: ${title}`);
    const group = { id, title, button, nodes: [], open: false, checkpoint };
    groups.set(id, group);
    host.append(button);
    button.addEventListener('click', () => {
      if (!state.enabled) return;
      group.open = !group.open;
      if (group.open && !state.hints.includes(id)) {
        state.hints.push(id);
        persist();
      }
      render();
    });
    return group;
  }

  document.querySelectorAll('article > .article-section').forEach(section => {
    let current;
    // Snapshot children: inserting hint controls must not change traversal order.
    [...section.children].forEach(node => {
      const step = node.matches('ol.steps') ? node.querySelector('[data-step]') : null;
      if (step && tasks[step.dataset.step]) {
        const id = step.dataset.step;
        const [title, brief] = tasks[id];
        const goal = step.querySelector('.step-goal');
        goal.classList.add('guided-goal');
        const proGoal = document.createElement('p');
        proGoal.className = 'step-goal pro-only';
        proGoal.textContent = title;
        const proBrief = document.createElement('ul');
        proBrief.className = 'pro-only pro-brief pro-checklist';
        proBrief.setAttribute('aria-label', `Step ${id} checklist`);
        checklistItems[id].forEach((text, index) => {
          const item = document.createElement('li');
          const label = document.createElement('label');
          const input = document.createElement('input');
          input.type = 'checkbox';
          input.dataset.proCheck = `${id}-${index + 1}`;
          input.checked = state.checks[input.dataset.proCheck] === true;
          input.addEventListener('change', () => {
            state.checks[input.dataset.proCheck] = input.checked;
            persist();
            render();
          });
          const caption = document.createElement('span');
          caption.textContent = text;
          label.append(input, caption);
          const row = document.createElement('div');
          row.className = 'checkpoint-row';
          row.append(label);
          item.append(row);
          const hintId = `checkpoint-${id}-${index + 1}`;
          const hint = addGroup(hintId, `Checkpoint ${id}.${index + 1} · ${text}`, row, true);
          hint.button.classList.add('checkpoint-hint-button');
          const panel = document.createElement('div');
          panel.className = 'checkpoint-hint-content';
          panel.id = `hint-${hintId}`;
          const note = checkpointNotes[`${id}-${index + 1}`];
          if (note) {
            const paragraph = document.createElement('p');
            paragraph.textContent = note;
            panel.append(paragraph);
          } else {
            checkpointSources[id][index].forEach(number => {
              const source = step.querySelector(`[data-substep="${id}.${number}"] .substep-text`);
              const copy = source.cloneNode(true);
              copy.removeAttribute('id');
              copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
              panel.append(copy);
            });
          }
          mark(panel, hint);
          item.append(panel);
          proBrief.append(item);
        });
        const existing = [...step.children].filter(child => child !== goal);
        goal.after(proGoal, proBrief);
        const controls = document.createElement('div');
        controls.className = 'pro-only pro-hint-controls';
        proBrief.after(controls);
        current = addGroup(id, `${id} · ${title}`, controls);
        existing.forEach(child => mark(child, current));
        // Required resources remain available; accessing the supplied baseline isn't a hint.
        if (id === '1.1') {
          const resources = document.createElement('p');
          resources.className = 'pro-only pro-resources';
          resources.append('Resources: ');
          const links = [...step.querySelectorAll('.substeps a')];
          links.forEach((link, index) => {
            if (index) resources.append(' · ');
            resources.append(link.cloneNode(true));
          });
          proBrief.after(resources);
        }
      } else if (node.matches('.final-references')) {
        const controls = document.createElement('div');
        controls.className = 'pro-only pro-extra';
        const heading = document.createElement('h3');
        heading.textContent = 'Final references';
        const text = document.createElement('p');
        text.textContent = 'Compare your completed scripts after step 4.2. Opening the full solutions counts as a hint.';
        controls.append(heading, text);
        node.before(controls);
        mark(node, addGroup('final-references', 'Final references · Completed scripts', controls));
      } else if (section.id === 'review' && node.matches('table')) {
        const controls = document.createElement('div');
        controls.className = 'pro-only pro-extra';
        const text = document.createElement('p');
        text.textContent = 'Check the completed scene against the required behaviors. If a result is wrong, identify its cause and retest your correction.';
        controls.append(text);
        node.before(controls);
        mark(node, addGroup('diagnosis-reference', 'Verification · Troubleshooting reference', controls));
      } else if (current && node.matches('.step-videos, .step-explanation, .concept-summary, .code-sample, .source-figure, .video-context, table, h3')) {
        mark(node, current);
        // The support-script introduction belongs with its code, not the task brief.
        if (node.matches('h3') && node.nextElementSibling?.matches('p')) mark(node.nextElementSibling, current);
      }
    });
  });
  state.hints = state.hints.map(id => id === 'background' ? '2.4' : id);
  state.hints = [...new Set(state.hints)].filter(id => groups.has(id));
  if (state.enabled || state.hints.length) state.usedPro = true;

  const progressPanel = document.createElement('aside');
  progressPanel.className = 'pro-only pro-check-progress';
  progressPanel.setAttribute('aria-label', 'Pro checkpoint progress');
  const progressGrid = document.createElement('div');
  progressGrid.className = 'pro-check-progress-grid';
  progressPanel.append(progressGrid);
  document.body.append(progressPanel);
  const checkpointSquares = [...document.querySelectorAll('[data-pro-check]')].map((input, index) => {
    const square = document.createElement('button');
    square.type = 'button';
    square.className = 'pro-check-square';
    square.dataset.checkSquare = input.dataset.proCheck;
    square.addEventListener('click', () => {
      input.closest('li').scrollIntoView({ block: 'center', behavior: 'smooth' });
      input.focus({ preventScroll: true });
    });
    progressGrid.append(square);
    return { input, square, index, text: input.nextElementSibling.textContent };
  });
  const quizStars = [...document.querySelectorAll('form[data-quiz]')].map((form, index) => {
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'pro-quiz-star';
    star.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 1.5 15.2 8.2 22.6 9.2 17.2 14.4 18.5 21.8 12 18.3 5.5 21.8 6.8 14.4 1.4 9.2 8.8 8.2Z"/></svg>';
    star.dataset.quizStar = form.dataset.quiz;
    star.addEventListener('click', () => {
      form.scrollIntoView({ block: 'center', behavior: 'smooth' });
      form.querySelector('input').focus({ preventScroll: true });
    });
    return { form, star, index };
  });
  const entries = [
    ...checkpointSquares.map(item => ({ node: item.input, button: item.square })),
    ...quizStars.map(item => ({ node: item.form, button: item.star }))
  ];
  entries.sort((a,b) => a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  const sectionRows = new Map();
  entries.forEach(item => {
    const section = item.node.closest('.article-section');
    if (!sectionRows.has(section.id)) {
      const row = document.createElement('div');
      row.className = 'pro-progress-section-row';
      row.dataset.progressSection = section.id;
      row.setAttribute('role', 'group');
      const heading = section.querySelector('h2').textContent;
      row.setAttribute('aria-label', heading);
      row.title = heading;
      sectionRows.set(section.id, row);
      progressGrid.append(row);
    }
    sectionRows.get(section.id).append(item.button);
  });
  window.addEventListener('lesson-quiz-progress', renderCheckpointProgress);

  function renderCheckpointProgress() {
    checkpointSquares.forEach(({input, square, index, text}) => {
      const id = input.dataset.proCheck;
      const taskId = id.slice(0, id.lastIndexOf('-'));
      const checked = state.checks[id] === true;
      const assisted = state.hints.includes(`checkpoint-${id}`) || state.hints.includes(taskId);
      const result = checked ? (assisted ? 'Completed with hint' : 'Completed without hint') : 'Not checked';
      square.classList.toggle('without-hint', checked && !assisted);
      square.classList.toggle('with-hint', checked && assisted);
      square.setAttribute('aria-label', `${index + 1}. ${text} ${result}. Go to checkpoint.`);
      square.title = `${index + 1}. ${text} — ${result}`;
    });
    let records = {};
    try { records = JSON.parse(localStorage.getItem('unity-sound-and-effects-quiz-progress') || '{}').quizzes || {}; } catch {}
    quizStars.forEach(({form, star, index}) => {
      const record = records[form.dataset.quiz];
      const checked = Number.isInteger(record?.latest);
      const correct = checked && record.latest === Number(form.dataset.answer);
      star.classList.toggle('quiz-correct', correct);
      star.classList.toggle('quiz-incorrect', checked && !correct);
      const result = checked ? (correct ? 'Correct' : 'Incorrect; retry') : 'Not checked';
      const text = form.querySelector('.quiz-question').textContent;
      star.title = `Quiz ${index + 1}: ${text} — ${result}`;
      star.setAttribute('aria-label', `${star.title}. Go to quiz.`);
    });
  }

  function reportText() {
    return state.usedPro
      ? `Pro used · ${state.hints.length} of ${groups.size} hints opened · Current mode: ${state.enabled ? 'Pro' : 'Guided'} · Guided view opened after entering Pro: ${state.guidedAfterPro ? 'Yes' : 'No'}.`
      : 'Pro mode not used. Hint usage: not applicable.';
  }
  function render() {
    document.body.classList.toggle('pro-mode', state.enabled);
    toggle.setAttribute('aria-pressed', String(state.enabled));
    toggle.setAttribute('aria-label', `Pro mode ${state.enabled ? 'on' : 'off'}. ${state.enabled ? 'Show guided instructions' : 'Show goals with hints on request'}.`);
    document.getElementById('proToggleState').textContent = state.enabled ? 'On' : 'Off';
    groups.forEach(group => {
      const action = group.open ? 'Hide hint' : (state.hints.includes(group.id) ? 'Show hint again' : 'Give me a hint');
      group.button.textContent = group.checkpoint ? '?' : (group.open ? 'Hide full explanation' : 'Full explanation');
      group.button.setAttribute('aria-label', `${group.checkpoint ? action : group.button.textContent}: ${group.title}`);
      if (group.checkpoint) group.button.title = group.open ? 'Hide checkpoint hint' : 'Show checkpoint hint';
      group.button.setAttribute('aria-expanded', String(group.open));
      group.button.setAttribute('aria-controls', group.nodes.map(n => n.id).join(' '));
      group.nodes.forEach(node => node.classList.toggle('hint-revealed', group.open));
    });
    document.querySelectorAll('.step-video video').forEach(video => {
      if (!video.getClientRects().length) video.pause();
    });
    status.textContent = state.enabled
      ? `Pro: work from the goals below. Use ? beside a checkpoint for its specific instructions. “Full explanation” reveals the full task walkthrough, explanation, and videos. Hints opened: ${state.hints.length}. Each checkpoint hint and full-task hint counts once, even if reopened.`
      : 'Guided: full instructions and explanations are visible. Turn on Pro to work from goals and request hints when needed.';
    if (!storageAvailable) status.textContent += ' Browser storage is unavailable; progress is kept only for this visit.';
    summary.textContent = reportText();
    renderCheckpointProgress();
    window.dispatchEvent(new Event('scroll'));
  }
  toggle.addEventListener('click', () => {
    state.enabled = !state.enabled;
    // Disclosure state is temporary; hint history remains available to the report.
    groups.forEach(group => { group.open = false; });
    if (state.enabled) state.usedPro = true;
    else if (state.usedPro) state.guidedAfterPro = true;
    persist();
    render();
  });
  document.getElementById('resetProgress').addEventListener('click', () => {
    state = { enabled: state.enabled, usedPro: state.enabled, guidedAfterPro: false, hints: [], checks: {} };
    groups.forEach(group => { group.open = false; });
    document.querySelectorAll('[data-pro-check]').forEach(input => { input.checked = false; });
    persist();
    render();
  });
  window.lessonPro = {
    appendReport(report, appendText) {
      appendText(report, 'h2', 'Learning mode and hints');
      appendText(report, 'p', reportText());
      if (!state.usedPro) return;
      appendText(report, 'p', 'Each checkpoint hint and full-task hint counts separately, once when first opened in Pro. Reopening it does not add to the count. This is browser-recorded study activity, not a measure of independent mastery. Reset progress clears this history.');
      if (!storageAvailable) appendText(report, 'p', 'Browser storage unavailable: this report includes only activity retained during this visit.');
      if (!state.hints.length) appendText(report, 'p', 'No Pro hints opened.');
      else {
        const list = document.createElement('ul');
        report.append(list);
        state.hints.forEach(id => appendText(list, 'li', groups.get(id).title));
      }
    }
  };
  render();
})();
