/* Explanations stay visible in every learning mode; procedural walkthroughs are hints. */
(() => {
  const key = 'unity-lighting-pro-progress';
  const tasks = {"1.1": ["Open the official project and protect the source scenes.", "Use the checkpoints to judge your result."], "2.1": ["Compare live direct light with stored illumination.", "Use the checkpoints to judge your result."], "3.1": ["Separate light direction from light position.", "Use the checkpoints to judge your result."], "3.2": ["Give your working scene its own night sky and ambient fill.", "Use the checkpoints to judge your result."], "4.1": ["Compare a cone of light with an all-direction light.", "Use the checkpoints to judge your result."], "4.2": ["Tune reach and strength without confusing them.", "Use the checkpoints to judge your result."], "5.1": ["Create and diagnose one readable realtime shadow.", "Use the checkpoints to judge your result."], "6.1": ["Make a welcoming route into a quiet night scene.", "Use the checkpoints to judge your result."]};
  const checklistItems = {"1.1": ["Open the complete supplied Unity 6.3 project without unresolved Console errors.", "Locate the completed outdoor example and view its actual scene lighting.", "Keep the two lighting windows accessible and preserve the supplied baked data."], "2.1": ["Identify Mixed mode and demonstrate its moving direct pool of light; restore the lamp transform.", "Demonstrate the fixed baked patch, distinguish it from the prop, and restore the prop.", "Save LightingStudy from the tutorial scene, with no other scene open and official examples preserved.", "Give LightingStudy independent lighting settings with baked GI disabled.", "Remove inherited baked data only from the working scene, then save the clean realtime baseline."], "3.1": ["Show that translating the Directional Light leaves the illumination unchanged; restore position.", "Establish low, cool directional illumination with a clear direction and readable structure."], "3.2": ["Assign a separate NightSky procedural material to LightingStudy and link its sun to the Directional Light.", "Create a dark sky while preserving the amphitheater silhouette; keep the sun direction coherent.", "Compare two ambient fill levels independently of the sky and retain readable, restrained Color-source fill."], "4.1": ["Place one StudyLamp on the floor with its light inside the fixture and a nearby step available for comparison.", "Demonstrate that disabling its realtime Light removes its illumination while the prop remains.", "Compare Spot and Point at the same position, then restore a downward Spot with a visible pool."], "4.2": ["Establish a range that reaches the target floor and step while leaving Indirect Multiplier at 1.", "Separately compare intensity and cone width, retaining surface detail and a local pool.", "Create two motivated warm lamps against a cool environment, with visible separation between their lit regions."], "5.1": ["Place a grounded lit cube inside one lamp pool, with a receiving floor visible.", "Establish a realtime shadow cast by the cube, keeping renderer and additional-light shadow support enabled.", "Reproduce a zero-distance shadow failure in the active URP asset and restore its original nonzero value.", "Enable supported soft shadows and save a scene with a readable grounded shadow."], "6.1": ["Use two lamps to make a route visibly brighter than the surrounding seating while retaining a night setting.", "Justify one controlled lighting revision from a fixed viewpoint using visible evidence.", "Record the complete scene, lamp contribution, revision, shadow and explanation of baked behavior.", "Restore the intended final settings and save LightingStudy; retain the project locally."]};
  const checkpointSources = {"1.1": [[1], [2], [3]], "2.1": [[1], [2], [3], [4], [5]], "3.1": [[1], [2]], "3.2": [[1], [2], [3]], "4.1": [[1], [2], [3]], "4.2": [[1], [2], [3]], "5.1": [[1], [2], [3], [4]], "6.1": [[1], [2], [3], [4]]};
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
        text.textContent = 'Compare your completed lighting after the practical work. Opening the full solutions counts as a hint.';
        controls.append(heading, text);
        node.before(controls);
        mark(node, addGroup('final-references', 'Final references · Completed lighting', controls));
      } else if (section.id === 'review' && node.matches('table')) {
        const controls = document.createElement('div');
        controls.className = 'pro-only pro-extra';
        const text = document.createElement('p');
        text.textContent = 'Check the completed scene against the required behaviors. If a result is wrong, identify its cause and retest your correction.';
        controls.append(text);
        node.before(controls);
        mark(node, addGroup('diagnosis-reference', 'Verification · Troubleshooting reference', controls));
      } else if (current && node.matches('.section-faq, .step-videos, .video-reference, .observation-check, .code-sample, .source-figure, .video-context, table, h3')) {
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
    try { records = JSON.parse(localStorage.getItem('unity-lighting-quiz-progress') || '{}').quizzes || {}; } catch {}
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
