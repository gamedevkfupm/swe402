/* Pro tasks keep the same learning outcomes; the existing walkthrough is each task's hint. */
(() => {
  const key = 'unity-user-interface-pro-progress';
  const tasks = {"1.1": ["Prepare and save the Unity 6.3 project.", "Complete the checkpoints and verify the stated result."], "1.2": ["Create four reusable target prefabs and one scene manager.", "Complete the checkpoints and verify the stated result."], "2.1": ["Write the target’s random launch behavior.", "Complete the checkpoints and verify the stated result."], "2.2": ["Write a manager that spawns a random target every 1.5 seconds.", "Complete the checkpoints and verify the stated result."], "3.1": ["Add mouse input that selects only the target under the cursor.", "Complete the checkpoints and verify the stated result."], "3.2": ["Add cleanup for targets that fall below the screen.", "Complete the checkpoints and verify the stated result."], "4.1": ["Create and position a responsive score display.", "Complete the checkpoints and verify the stated result."], "4.2": ["Write score tracking and connect target hits to it.", "Complete the checkpoints and verify the stated result."], "5.1": ["Add particle feedback to confirmed target hits.", "Complete the checkpoints and verify the stated result."], "6.1": ["Add a game-over message and distinguish good misses from bad misses.", "Complete the checkpoints and verify the stated result."], "6.2": ["Block spawning, hits and score changes after game over.", "Complete the checkpoints and verify the stated result."], "7.1": ["Create a restart button and connect it to a fresh scene load.", "Complete the checkpoints and verify the stated result."], "8.1": ["Build a title menu with Easy, Medium and Hard buttons.", "Complete the checkpoints and verify the stated result."], "8.2": ["Separate the initial menu state from starting a round.", "Complete the checkpoints and verify the stated result."], "8.3": ["Write and attach the difficulty-button behavior.", "Complete the checkpoints and verify the stated result."], "9.1": ["Reproduce and diagnose the five Whack-a-Food faults.", "Complete the checkpoints and verify the stated result."], "9.2": ["Repair each Whack-a-Food fault and record its retest.", "Complete the checkpoints and verify the stated result."], "9.3": ["Optional: add a 60-second countdown to the challenge.", "Complete the checkpoints and verify the stated result."], "10.1": ["Replace target models while retaining their gameplay behavior.", "Complete the checkpoints and verify the stated result."], "10.2": ["Replace a player model and assess an alternative asset.", "Complete the checkpoints and verify the stated result."], "10.3": ["Replace the background material and test scene readability.", "Complete the checkpoints and verify the stated result."], "11.1": ["Run a user test, improve one issue and retest it.", "Complete the checkpoints and verify the stated result."], "12.1": ["Demonstrate the completed game, challenge repairs and user-test findings.", "Complete the checkpoints and verify the stated result."]};
  const checklistItems = {"1.1": ["Create a fresh Unity 6.3 Built-In project, import the official Prototype 5 assets, and save a copy of Prototype 5 as User Interface.", "Configure the project to use the new Input System and process mouse input during dynamic updates.", "Position Main Camera at (0, 0, −10), Background at (0, 0, 2), and Border at (0, 0, 0). Give the camera zero rotation, tag MainCamera, orthographic projection and size 5.", "Configure Sensor at (0, −10, 0) with unit scale and tag DestroyZone. Give it a 3D trigger box centered on the object, sized (30, 1, 4), to catch targets below the visible area.", "Place the supplied empty Target.cs and GameManager.cs classes in Assets/Scripts. Resolve any compilation errors before continuing."], "1.2": ["Create a root object named Good 1 at the origin and give it an apple-model child named Visual. Reset the child’s local position and rotation, size it to roughly a one-unit cube, and leave physics components off the child.", "Add Target, one Rigidbody and one solid Box Collider to Good 1’s root. Fit the collider to the apple; use gravity, mass 1 and zero linear damping, prevent Z movement, and leave the body non-kinematic.", "Save Good 1, Good 2 and Good 3 as three visibly different food prefabs, and Bad 1 as a bomb prefab, in Assets/Prefabs. Give all four the same root/visual structure. Tag only Bad 1 as Bad; leave good roots Untagged.", "Create one scene object named Game Manager with the GameManager script. Remove the temporary target instances while retaining their prefab assets, and save the scene with one manager and one camera."], "2.1": ["In Target.cs, declare a Rigidbody reference named targetRb and five launch-setting fields: minSpeed = 12, maxSpeed = 16, maxTorque = 10, xRange = 4, and ySpawnPos = −6.", "In Target.cs, create three methods:\n1. RandomForce: return an upward vector with random magnitude between minSpeed and maxSpeed.\n2. RandomTorque: return a random number between −maxTorque and maxTorque.\n3. RandomSpawnPos: return a position with random X between −xRange and xRange, Y equal to ySpawnPos, and Z equal to 0.", "Implement Target’s Start method to obtain its own Rigidbody, choose a starting position, and give the target one upward impulse and one random rotational impulse. Use the three methods you just created; do not apply the launch repeatedly.", "Test one good target in Play mode several times. Confirm that it rises, rotates and falls with different launches, then remove the temporary scene instance. Falling-target cleanup comes later."], "2.2": ["In GameManager.cs, declare an Inspector-editable list of target prefab references named targets and a spawn interval named spawnRate, initially 1.5 seconds.", "Create a SpawnTarget coroutine that repeatedly waits for the interval, selects one random prefab from the list and creates an instance. Start that coroutine when GameManager starts; the first target should appear after the first wait.", "Fill the scene manager’s targets list with exactly four prefab assets: Good 1, Good 2, Good 3 and Bad 1. Leave no missing entries or references to temporary scene objects.", "Run the scene long enough to observe several spawns. Check that one moving target appears about every 1.5 seconds without list-index or missing-reference errors; random selection may repeat a prefab."], "3.1": ["In Target.cs, create an Update method that detects a fresh left-button press through the new Input System and logs Click detected. Handle the absence of a mouse. Test that holding the button produces no further messages; each active target currently logs the same press.", "Extend Target.Update to create a ray through the cursor’s position in the camera view. Replace the temporary log with a red debug drawing of that ray, 100 world units long and visible for two seconds.", "Extend Target.Update to test the ray against 3D colliders and remove this target only when it owns the first collider hit. Remove the whole target object, including its visual, while leaving every other target intact.", "Test a fresh click, an empty-space click, a held button and two overlapping targets. Confirm that only a fresh click removes an object and, for overlapping colliders, only the nearer target disappears."], "3.2": ["In Target.cs, add a trigger-entry response that removes this target when it enters Sensor, tagged DestroyZone. Ignore differently tagged triggers in this cleanup response.", "Run the scene without clicking. Confirm that falling targets leave the Hierarchy after reaching Sensor while new targets continue to spawn.", "Save the working 5.1 checkpoint after testing random launches, repeated spawning, one-target-per-click selection and falling-target cleanup. Use the completed reference only for comparison after your own implementation."], "4.1": ["Create a TextMeshPro UI object named Score Text under a Canvas. Keep exactly one Canvas and one EventSystem in the scene.", "Configure the Canvas to overlay the game and scale from a 1280 × 720 reference, with width/height match 0.5. Configure the EventSystem to support the project’s new Input System.", "Set Score Text to Score: 0 in size-36 type within a 350 × 60 rectangle. Keep it 24 UI units right and down from the upper-left, with left/top text alignment and strong background contrast. Prevent the text from intercepting UI pointer input.", "Test the layout at 16:9 and 4:3. Confirm that the score stays upper-left, remains fully visible and does not cover important targets, then return the Game view to 16:9."], "4.2": ["In GameManager.cs, declare an integer score and a TextMeshPro reference named scoreText. Assign the scene’s Score Text component to that reference.", "Create an UpdateScore method that accepts an integer point change, adds it to the stored score and displays the new total after Score:. Initialize the score to 0 at startup and use this method to display its initial value.", "In Target.cs, add an assignable integer pointValue and a reference to the scene’s GameManager. Obtain the manager when the target starts, then report this target’s points once per confirmed hit, before removing it. Award nothing for spawning or misses.", "Set Good 1, Good 2, Good 3 and Bad 1 to +10, +20, +30 and −50 points respectively. Test that +10, +20 and −50 from zero produce −20 in both the stored score and its display."], "5.1": ["In Target.cs, declare an assignable particle-effect reference named explosionParticle. Create an Explode method that creates an independent effect at the target’s world position and removes the effect after a cleanup delay, initially three seconds.", "Call your Explode method on a confirmed target hit, after updating the score and before removing the target. Do not produce hit effects for empty-space clicks or misses.", "Assign a particle prefab to every target prefab. Configure each effect to play immediately without looping, and make its cleanup delay long enough for the effect to finish.", "Test hits on the target prefabs. Confirm that each burst appears at its target’s position, finishes after the target disappears, and then leaves the Hierarchy. Save the 5.2 checkpoint."], "6.1": ["Create Game Over Text under Canvas as a sibling of Score Text. Set its text to Game over, centered in size-56 type within a 550 × 100 rectangle, 70 UI units above the screen center. Prevent it from intercepting UI pointer input.", "In GameManager.cs, add an active-round flag and a reference to Game Over Text. Create a GameOver method that ends an active round once and reveals the message. Initialize a new round as active with the message hidden, and assign the text reference.", "Change Target’s trigger-entry response so that entering DestroyZone still removes any target, but also ends the round if the target is not tagged Bad.", "Test a missed bomb and a missed food target. Confirm that only the food miss reveals Game over. Other gameplay can still continue at this intermediate checkpoint; stop it in group 6.2."], "6.2": ["Modify GameManager’s SpawnTarget coroutine so it creates targets only during an active round, including when a round ends during an already-started spawn delay.", "Modify Target.Update and GameManager.UpdateScore to reject activity outside an active round. Inactive clicks must not remove targets or create effects, and inactive score requests must not change the total.", "Lose by missing a good target, continue clicking, and wait at least two seconds. Confirm that the score stays fixed and no new targets appear, while existing targets can still fall into Sensor and disappear."], "7.1": ["Create a Restart Button under Canvas, sized 220 × 70 and centered 40 UI units below the screen center. Set its visible label to Restart in centered size-32 type.", "In GameManager.cs, add a Button reference named restartButton and create a public RestartGame method that reloads the current scene, clearing the old round’s objects and restoring the saved scene state.", "Assign the scene’s Restart Button to GameManager. Keep the button hidden in the saved scene and during active play, and reveal it when GameOver ends the round.", "Connect Restart Button’s persistent Inspector click event to the scene manager’s RestartGame method. Keep exactly one event so a press requests one restart.", "Enable User Interface in the active build scene list and test two consecutive loss/restart cycles. At this 5.3 checkpoint, each restart should reset the score to 0 and start a new round. Save the working checkpoint."], "8.1": ["Create a centered Title Screen group under Canvas, sized 900 × 400 at unit scale. Add a title reading Click the targets in size-56 type within an 850 × 100 rectangle, centered 100 UI units above the group center.", "Create Easy, Medium and Hard buttons inside Title Screen, each sized 220 × 70, at (−260, −60), (0, −60) and (260, −60). Give them matching visible labels and remove any inherited Restart click events.", "Keep Score Text, Game Over Text and Restart Button outside the Title Screen group so hiding the menu does not hide those controls. Add a titleScreen reference to GameManager and assign the menu group."], "8.2": ["Revise GameManager’s startup behavior to show the title menu, display score 0, mark the round inactive, and hide Game over and Restart. Remove automatic spawning from startup.", "Create a StartGame method that accepts a difficulty value, resets the score, hides the menu/loss controls and starts active play. Values 1, 2 and 3 must give spawn intervals of 1.5, 0.75 and 0.5 seconds. Limit other values to the nearest endpoint and reject another start request during play.", "Test scene startup by waiting at the menu for more than three seconds. Confirm that the score stays 0 and no target appears. The difficulty buttons will start rounds after group 8.3."], "8.3": ["Create DifficultyButton.cs with an assignable GameManager reference and integer difficulty value. Register one click response when the component starts; its SetDifficulty method must ask the manager to start a round with that button’s value.", "Attach DifficultyButton to each difficulty button. Assign the same scene manager to all three and set Easy = 1, Medium = 2 and Hard = 3. Leave their Inspector click-event lists empty to avoid duplicating the scripted response.", "Test each difficulty in a separate round. Confirm that it hides the menu, starts at score 0, and produces its first target after about 1.5, 0.75 or 0.5 seconds respectively. Check that Restart returns to the menu and all choices work at 16:9 and 4:3.", "Save the 5.4 checkpoint and explain the button-to-manager event sequence: what invokes SetDifficulty, which value reaches StartGame, and why the hidden menu cannot start another round. Compare your completed scripts with the final reference if needed."], "9.1": ["Import the official Challenge 5 assets into a separate Built-In project using the new Input System. Save a working copy of Challenge 5.unity, enable it in the build scene list, and give its EventSystem compatible UI input.", "Before repairing gameplay, test text alignment, hover removal, numeric score, Restart visibility after loss and difficulty timing. Record each observed symptom in the diagnosis sheet; identify any behavior already correct in your starter version.", "Inspect the scene and TargetX.cs, GameManagerX.cs and DifficultyButtonX.cs. For each observed fault, write a likely cause and one proposed correction before opening its solution hint."], "9.2": ["Correct the challenge’s text layout. Keep the score in its intended corner, center the title and game-over message, and center each button label inside its button. Test that all labels fit at both 16:9 and 4:3.", "Replace TargetX’s hover-based removal with fresh-click selection during active play. A click must remove only the nearest target under the cursor; hovering or holding the button must remove nothing. Retest all three inputs.", "Repair GameManagerX.UpdateScore so it displays Score: followed by the accumulated number and rejects score changes after game over. Test both a good hit and a bad hit against the expected total.", "Repair GameManagerX.GameOver so Restart becomes visible after a loss, and connect the button to the scene’s restart action. Test two consecutive loss/restart cycles, confirming that each restart returns to the initial menu.", "Modify GameManagerX.StartGame to accept the chosen difficulty and DifficultyButtonX to supply it. Give Easy, Medium and Hard values 1, 2 and 3 with fresh-round intervals of 1.5, 0.75 and 0.5 seconds; prevent repeated rounds from progressively shortening the interval.", "Record an actual passing retest for all five diagnosis rows and save the challenge. Preserve its grid positions and timeout behavior: an unclicked good target must still move behind the board into its Sensor and end the round."], "9.3": ["Optional, after the five repairs: create a readable upper-right Timer Text display labeled Time: 60. In GameManagerX, add a reference to that text and a remaining-time value, and assign the display reference.", "Optional: initialize remaining time to 60 for every round and add an Update method that counts down only during active play. Display whole seconds remaining, never a negative number, and end the round at 0.", "Optional: test with a temporary five-second round. Confirm that 0 triggers game over, blocks further scoring and still allows restart, then restore both the starting time and initial display to 60 before saving."], "10.1": ["Back up the completed scene and prefabs. Import any missing supplied course-library assets without duplicating existing ones, and choose replacement models, materials and textures for a consistent visual theme.", "Replace a target prefab’s visual model beneath its original root. Keep the root’s Target component, Rigidbody, tag and point value, so only the appearance changes.", "Adjust the replacement model’s size and orientation and fit the root collider to its silhouette. Remove extra physics components and the obsolete visual; retain one solid root collider, one physics owner and the fixed Z position.", "Replace the other target visuals and test all four. Check center/edge selection, launch motion, original points, particles and good/bad miss behavior. Make harmful and helpful targets distinguishable by shape as well as color."], "10.2": ["In a saved copy of a prior project with a moving Player, replace the primitive visual with a model child. Preserve the Player root’s movement script, physics, input references and required tag, and fit its collider to the new appearance.", "Test the replaced player’s movement directions, facing, ground contact, collisions and camera framing. Correct visual alignment without changing the movement behavior. Do this in the prior player project; the click-target game needs no added avatar.", "Compare one Asset Store candidate with a supplied-library asset. Record Unity-version and render-pipeline support, license conditions, dependencies, scale and included scripts, then decide whether the candidate suits the project. Acquisition is optional.", "Optional: import one compatible asset you already have access to into a test copy. Test a single replacement visual for rendering, scale and retained gameplay before replacing more objects; retain the project’s current render pipeline."], "10.3": ["Give Background its own copy of the current material before changing it, and keep it behind targets at Z = 2. Confirm that edits do not change unrelated objects using the original material.", "Apply a compatible background texture and compare tiling (1, 1) with (2, 2). Adjust surface reflections as needed, then keep a result with intentional repetition and no glare obscuring targets, score or menu text.", "Test the revised scene at 16:9 and 4:3. Check good/bad recognition, visible click boundaries, particles, score contrast, menu spacing, game over and restart; correct any regression before saving."], "11.1": ["Write one research question about first-time use and identify the build to test. Recruit one willing peer unfamiliar with it and prepare observation notes; obtain separate permission if recording them.", "Ask the participant to choose a level and start, play until the round ends, begin another round, and try to increase the score. Let them attempt each task without first identifying the correct controls or explaining the scoring rules.", "Record each task’s first action, any assistance, and an observation or exact quote. Classify the result as unassisted completion, assisted completion or non-completion; do not count helped attempts as unassisted success.", "Ask at least one open question about the player’s expectations and one focused closed question about the interface. Record their answers separately from observed actions and avoid wording that suggests the answer you want.", "Choose one issue supported by the notes, state a predicted improvement and implement the change in a copy. Ask a willing participant to repeat the relevant task and record the actual result, including no improvement if that is what happened."], "12.1": ["Show the initial menu with score 0 and no automatic spawning. Start an Easy round, hit a good target and a bad target, and show their positive/negative score changes and particle bursts.", "Miss a good target to show Game over and Restart. Continue clicking and wait more than 1.5 seconds to show no new points or targets. Restart to the menu and demonstrate the interval difference between Easy at 1.5 seconds and Hard at 0.5 seconds.", "Show the interface at 16:9 and 4:3, including a replacement target and background. Explain aloud how one target is selected, how a pending spawn is prevented after loss, and how a button supplies its difficulty value.", "Demonstrate the challenge’s aligned labels, click-only selection, numeric score, working Restart and three difficulty timings. Summarize one real user-test observation, the change it led to and the actual retest result."]};
  const checkpointSources = {"1.1": [[1], [2], [3], [4], [5]], "1.2": [[1], [2], [3], [4]], "2.1": [[1], [2], [3], [4]], "2.2": [[1], [2], [3], [4]], "3.1": [[1], [2], [3], [4]], "3.2": [[1], [2], [3]], "4.1": [[1], [2], [3], [4]], "4.2": [[1], [2], [3], [4]], "5.1": [[1], [2], [3], [4]], "6.1": [[1], [2], [3], [4]], "6.2": [[1], [2], [3]], "7.1": [[1], [2], [3], [4], [5]], "8.1": [[1], [2], [3]], "8.2": [[1], [2], [3]], "8.3": [[1], [2], [3], [4]], "9.1": [[1], [2], [3]], "9.2": [[1], [2], [3], [4], [5], [6]], "9.3": [[1], [2], [3]], "10.1": [[1], [2], [3], [4]], "10.2": [[1], [2], [3], [4]], "10.3": [[1], [2], [3]], "11.1": [[1], [2], [3], [4], [5]], "12.1": [[1], [2], [3], [4]]};
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
        text.textContent = 'Compare your completed scripts after step 8.3. Opening the full solutions counts as a hint.';
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
      } else if (current && node.matches('.section-faq, .step-videos, .step-explanation, .concept-summary, .code-sample, .source-figure, .video-context, table, h3')) {
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
    try { records = JSON.parse(localStorage.getItem('unity-user-interface-quiz-progress') || '{}').quizzes || {}; } catch {}
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
