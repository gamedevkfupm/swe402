/* Explanations stay visible in every learning mode; procedural walkthroughs are hints. */
(() => {
  const key = 'unity-shaders-and-materials-pro-progress';
  const tasks = {"1.1": ["Open a working copy of the material gallery.", "Complete the checkpoints and verify the stated result."], "2.1": ["Trace what makes a sphere visible.", "Complete the checkpoints and verify the stated result."], "2.2": ["Compare a lit surface with an unlit surface.", "Complete the checkpoints and verify the stated result."], "3.1": ["Observe an intentional shared-material edit.", "Complete the checkpoints and verify the stated result."], "3.2": ["Give each sphere an independent surface.", "Complete the checkpoints and verify the stated result."], "4.1": ["Separate smoothness from metalness.", "Complete the checkpoints and verify the stated result."], "5.1": ["Apply a repeating image and control its tint.", "Complete the checkpoints and verify the stated result."], "5.2": ["Recognize a texture that belongs to one model.", "Complete the checkpoints and verify the stated result."], "6.1": ["Compose, test and record your material study.", "Complete the checkpoints and verify the stated result."]};
  const checklistItems = {"1.1": ["Open the supplied Unity 6.3 gallery as its own project and finish the import.", "Find the gallery workbench and frame an object in Scene view.", "Save a separate MaterialStudy scene and a folder for your own material assets."], "2.1": ["Place Study A at unit scale on a clearly lit workbench surface; establish its position as the comparison baseline.", "Demonstrate that visibility can change without removing geometry or collision components; restore visibility.", "Give Study A your own URP-compatible lit material named Study_Lit."], "2.2": ["Place an equal-size Study B 1.5 units along X from A at the same height/depth, with an independent unlit material.", "Compare the same base color on lit and unlit spheres without textures.", "Predict the effect of Editor preview lighting, compare both spheres, and restore Scene Lighting."], "3.1": ["Make both spheres refer to one material asset.", "Demonstrate a shared color edit affecting both spheres, then restore the previous color."], "3.2": ["Assign a separate material asset named Study_Polished to Study B.", "Verify that only B changes; diagnose any shared reference and restore matching turquoise colors.", "Identify the shader on a supplied pink example and confirm that your own materials match URP."], "4.1": ["Compare two non-metals at Smoothness 0.15 and 0.85 with identical color and no maps.", "Identify highlight-width differences at a fixed view while both materials remain non-metallic.", "Place C 1.5 units along X from B at equal height/depth, with independent Metallic 1 and Smoothness 0.85; compare and save."], "5.1": ["Create a textured non-metal cube with its own material.", "Map the supplied A/B/C/D test image to the cube with white tint and 1×1 tiling; locate region B on a face.", "Predict and compare tint changes, restore white, then apply Pavement_SmallMoss_Albedo.png.", "Explain 1×1 versus 3×3 repetition and a half-width shift; finish at 3×3, zero offset and white tint."], "5.2": ["Trace a recognizable region from Ellen’s flat texture to its location on her surface.", "Explain why the cube would place Ellen’s image differently; leave the supplied character unchanged."], "6.1": ["Keep the four-object row, then create independently configured matte-rubber and polished-brass samples without a numerical recipe.", "Predict the property differences, vary one at a time and revise one choice using visible evidence.", "Record your choices and one revision, demonstrate 1×1/3×3 texture repetition, and restore the final texture settings.", "Save the row and two samples with independent materials and intentional placement; retain the project locally."]};
  const checkpointSources = {"1.1": [[1], [2], [3]], "2.1": [[1], [2], [3]], "2.2": [[1], [2], [3]], "3.1": [[1], [2]], "3.2": [[1], [2], [3]], "4.1": [[1], [2], [3]], "5.1": [[1], [2], [3], [4]], "5.2": [[1], [2]], "6.1": [[1], [2], [3], [4]]};
  const checkpointNotes = {};
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
    // Reading the theory never requires a hint or adds to assistance history.
    if (node.matches('.step-explanation')) return;
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
        if (step.querySelector('.substeps a:not([href*="final-reference"])')) {
          const resources = document.createElement('p');
          resources.className = 'pro-only pro-resources';
          resources.append('Resources: ');
          const links = [...step.querySelectorAll('.substeps a:not([href*="final-reference"])')];
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
        text.textContent = 'Compare your completed materials after the practical work. Opening the full solutions counts as a hint.';
        controls.append(heading, text);
        node.before(controls);
        mark(node, addGroup('final-references', 'Final references · Completed materials', controls));
      } else if (section.id === 'review' && node.matches('table')) {
        const controls = document.createElement('div');
        controls.className = 'pro-only pro-extra';
        const text = document.createElement('p');
        text.textContent = 'Check the completed scene against the required behaviors. If a result is wrong, identify its cause and retest your correction.';
        controls.append(text);
        node.before(controls);
        mark(node, addGroup('diagnosis-reference', 'Verification · Troubleshooting reference', controls));
      } else if (current && node.matches('.section-faq, .step-videos, .observation-check, .concept-summary, .code-sample, .source-figure, .video-context, table, h3')) {
        mark(node, current);
        // The support-script introduction belongs with its code, not the task brief.
        if (node.matches('h3') && node.nextElementSibling?.matches('p')) mark(node.nextElementSibling, current);
      }
    });
  });
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
    try { records = JSON.parse(localStorage.getItem('unity-shaders-and-materials-quiz-progress') || '{}').quizzes || {}; } catch {}
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
      group.button.textContent = group.checkpoint ? '?' : (group.open ? 'Hide full walkthrough' : 'Full walkthrough');
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
      ? `Pro: work from the goals below. Use ? beside a checkpoint for its specific instructions. Explanations are always visible and do not count as hints. “Full walkthrough” reveals the task instructions and videos. Hints opened: ${state.hints.length}. Each checkpoint hint and full-task hint counts once, even if reopened.`
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
      appendText(report, 'p', 'Explanations are always visible and do not count as hints. Each checkpoint hint and full-task hint counts separately, once when first opened in Pro. Reopening it does not add to the count. This is browser-recorded study activity, not a measure of independent mastery. Reset progress clears this history.');
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
