/* Theory is independently readable before practice; prompts are ungraded. */
(() => {
  const slides = [
  {
    "id": "purpose",
    "title": "Many short lives make one continuous effect",
    "topic": "Connect to Animation",
    "body": "<p>Lecture 14 used a clip to change an object over time. A particle effect creates many small visual elements, each with its own birth and death. One Particle System component can manage many particles; they are not separate Hierarchy GameObjects.</p><p>Snow is continuous because new flakes replace old ones. A smoke puff is brief because its births are grouped together. In this lecture you author both, then use a supplied keyboard script to connect the puff to fire and light.</p>",
    "question": "Does continuous snowfall require an infinite lifetime?",
    "answer": "No. Continuous births can replace particles that die. Infinite life would accumulate unnecessary particles.",
    "visual": ""
  },
  {
    "id": "owners",
    "title": "Separate birth, behavior and appearance",
    "topic": "Module responsibilities",
    "body": "<p>The Main module sets initial properties such as lifetime, speed and size. Emission controls birth timing and count. Shape controls the birth region and initial directions. Renderer controls how particles are drawn with a material.</p><p>Color and Size over Lifetime change particles as they age; Noise perturbs motion. The shader/material distinction from Lecture 12 still applies. A visible bright flame does not automatically illuminate nearby rocks: the Point Light remains separate, as in Lecture 13.</p>",
    "question": "Correct snowflake image, wrong number of new flakes: which responsibility is involved?",
    "answer": "Birth rate in Emission. Changing the material would change appearance instead.",
    "visual": ""
  },
  {
    "id": "clocks",
    "title": "The system and the particle have different clocks",
    "topic": "Duration, lifetime and loops",
    "body": "<p>Duration defines a system cycle. Looping repeats that cycle. Start Lifetime defines how long an individual particle remains alive after its birth. A particle can be born near the end of a cycle and continue living afterward.</p><p>Imagine one burst at system time zero, a 2-second duration, and a 1-second particle lifetime. The puff can disappear after one second even though the system cycle is two seconds long. With Looping enabled, another cycle could create another puff.</p>",
    "question": "Would turning Looping off make an existing particle die immediately?",
    "answer": "No. It prevents another cycle. Already living particles still follow their lifetime unless explicitly cleared.",
    "visual": ""
  },
  {
    "id": "births",
    "title": "Use a rate for weather and a burst for an event",
    "topic": "Birth timing",
    "body": "<p>Rate over Time means births per second: a rate of 80 requests 80 new particles each second. A burst requests a group at a chosen system time: Count 30 at time zero requests 30 together.</p><p>A system can contain both. To make one isolated puff, disable Looping, set continuous rates to zero and use one burst. Randomness in Start Lifetime or Start Speed varies individual particles without turning a puff into a stream.</p>",
    "question": "A one-shot system still emits for several seconds. What might remain enabled?",
    "answer": "A nonzero continuous emission rate can create particles during the current duration even with Looping off.",
    "visual": ""
  },
  {
    "id": "travel",
    "title": "Lifetime limits how far particles can travel",
    "topic": "Distance, speed and assumptions",
    "body": "<p>Assume constant velocity, no gravity, no noise and no collision. A particle moving at 1 unit per second for 5 seconds travels 5 units. A particle born 10 units above the target would disappear before reaching it.</p><p>Distance = speed × lifetime. At 2 units per second, the same 10-unit trip requires 5 seconds. This calculation is a useful baseline, not a collision model: particles can pass through the ground when Collision is disabled.</p>",
    "question": "If speed halves but the required travel stays fixed, what happens to the necessary lifetime?",
    "answer": "It doubles under the same constant-velocity assumptions.",
    "visual": ""
  },
  {
    "id": "capacity",
    "title": "A budget is a ceiling, not a spawn command",
    "topic": "Rate × lifetime",
    "body": "<p>For steady continuous emission with fixed lifetime and no early deaths, approximate live count = rate × lifetime. At 80 births per second and 10 seconds of life, about 800 particles are needed. Max Particles = 1000 gives headroom; it does not request 1000 births.</p><p>The model below compares demand with capacity. A lower cap can block intended births. Simulation cost and transparent pixels drawn both matter; this count estimate is not a frame-rate benchmark.</p>",
    "question": "What happens to steady demand if the rate doubles while lifetime stays fixed?",
    "answer": "It doubles. The capacity does not grow automatically.",
    "visual": "<div data-budget-demo></div>"
  },
  {
    "id": "space",
    "title": "The emitter region is not the particle size",
    "topic": "Shape, space and startup",
    "body": "<p>A Box Shape distributes births across a volume. Enlarging that box spreads the same birth rate across more area; it does not enlarge each particle. Start Size controls each particle’s starting size.</p><p>World simulation lets emitted particles remain in world space when the emitter moves. Local simulation makes them follow its Transform. Prewarm initializes a looping effect with a simulated cycle, making weather populated at startup. These are three separate decisions.</p>",
    "question": "Which change makes a wider patch of weather without changing the snowflake image or size?",
    "answer": "Increase the emitter’s Shape region. Then assess whether its birth rate still gives the intended density.",
    "visual": ""
  },
  {
    "id": "age",
    "title": "Read lifetime curves from birth to death",
    "topic": "Normalized age",
    "body": "<p>Normalized age = elapsed age ÷ lifetime. It runs from 0 at birth to 1 at death for every particle. A peak at 0.2 happens 20% through that particle’s life.</p><p>With a 1-second lifetime, the peak occurs after 0.2 seconds. With a 2-second lifetime, the same relative peak occurs after 0.4 seconds. This differs from Lecture 14’s clip timeline in seconds or frame divisions.</p>",
    "question": "Two particles have different lifetimes but the same peak at 0.5. Must they peak at the same real-time age?",
    "answer": "No. Each peaks halfway through its own life, so a longer lifetime reaches the peak later.",
    "visual": ""
  },
  {
    "id": "appearance",
    "title": "Use a multiplier and opacity to shape a puff",
    "topic": "Size and alpha",
    "body": "<p>Size over Lifetime multiplies Start Size. A starting size of 2 with a factor of 0.3 gives size 0.6. Alpha is opacity: 0 is transparent and 1 is fully opaque; some color controls display full alpha as 255.</p><p>Our puff grows and becomes opaque quickly, then shrinks and fades. The graph, readout and patch below share one normalized envelope. This is a conceptual model, not a Unity renderer. A transparent Start Color cannot be made opaque by multiplying it.</p>",
    "question": "Would a size factor of one force every particle to be one unit large?",
    "answer": "No. It preserves that particle’s configured Start Size.",
    "visual": "<div data-envelope-demo></div>"
  },
  {
    "id": "sheet",
    "title": "One texture can contain several particle images",
    "topic": "Tiles and variation",
    "body": "<p>A texture sheet is one image containing smaller tiles. A 2×2 sheet has four tiles. Without the correct tiling, every particle displays all four images at once.</p><p>Cycling through tiles gives flipbook motion. Randomly choosing a starting tile and avoiding visible cycling gives variation: each smoke particle uses essentially one patch. These choices alter appearance, not how many particles are born.</p>",
    "question": "Why does changing burst Count fail to fix four smoke images appearing on each particle?",
    "answer": "Count changes how many particles exist. Tiling controls which region of the image each one displays.",
    "visual": "<figure class=\"source-figure\"><img src=\"assets/smoke-sheet.png\" alt=\"Four smoke tiles in a two by two source texture\"><figcaption>Unity source texture: four possible images inside one asset.</figcaption></figure>"
  },
  {
    "id": "event",
    "title": "One event coordinates separate systems",
    "topic": "Input, playback and light",
    "body": "<p>The supplied script listens for a key press in Play mode. It plays or stops fire emission, plays the smoke burst and separately switches the Point Light. The smoke GameObject stays active, but Play on Awake is off so the puff waits for the event.</p><p>Stopping emission does not necessarily clear particles already alive. Disabling the controller’s GameObject would also stop it listening for the next press. For this simple supplied script, wait until the effect has finished before triggering again.</p>",
    "question": "Why might the light be off while some fire particles are still visible?",
    "answer": "The light changed immediately, while existing particles continue to the end of their lives after emission stops.",
    "visual": ""
  },
  {
    "id": "graph",
    "title": "Read a graph as a lifecycle",
    "topic": "Spawn → Initialize → Update → Output",
    "body": "<p>Spawn controls births. Initialize Particle assigns starting values and capacity. Update Particle advances simulation and changes properties. Output Particle controls drawing. These responsibilities connect to Emission, Main/Shape, lifetime behavior and Renderer.</p><p>VFX Graph simulates particles on the GPU and can suit large visual effects. The component-based Particle System can be convenient for Unity physics integration. Graph collision techniques exist, but they are not automatic Rigidbody/Collider participation. Choose for behavior and device support, then measure performance.</p>",
    "question": "Birth count looks right, but particles disappear too soon. Where would you begin?",
    "answer": "Inspect the initial lifetime in Initialize Particle before changing birth rate or the output texture.",
    "visual": ""
  },
  {
    "id": "ready",
    "title": "Predict, author, observe, then explain",
    "topic": "Synthesis and readiness",
    "body": "<p>An effect combines a birth pattern, initial values, changes over each lifetime and a drawing method. Weather needs replacement births and sufficient travel. A puff needs an isolated burst and a deliberate appearance envelope. A gameplay event coordinates the puff with other systems.</p><p>Readiness check: a particle lives for 2 seconds and should peak after 0.6 seconds. Its normalized peak is 0.6 ÷ 2 = 0.3. If your estimate and preview disagree, inspect one relevant setting at a time. Use Start practical to open the fresh-project preparation.</p>",
    "question": "What stays fixed if you move only that peak to age 0.15 while keeping the lifetime?",
    "answer": "The particle still dies after 2 seconds. Its peak moves to 0.3 seconds after birth. Count and starting speed have not been changed.",
    "visual": ""
  }
];
  const key = 'unity-vfx-slide-mode';
  let state = { enabled: false, index: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      const legacyTopics = slides.map(slide => slide.id);
      const topic = saved.topic || legacyTopics[saved.index];
      state = { enabled: saved.enabled === true, index: Math.max(0, slides.findIndex(slide => slide.id === topic)) };
    }
  } catch { /* The walkthrough also works without storage. */ }
  let articleScroll = 0;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'slideToggle';
  toggle.className = 'quiet-button';
  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('aria-label', 'Slide mode');
  toggle.setAttribute('aria-controls', 'theorySlides');
  document.querySelector('.site-actions').prepend(toggle);

  const deck = document.createElement('section');
  deck.id = 'theorySlides';
  deck.className = 'theory-slides';
  deck.setAttribute('aria-label', 'Theory slides');
  deck.innerHTML = `<div class="slide-toolbar"><label for="slideTopic">Theory before practice</label><select id="slideTopic" aria-label="Choose a theory slide">${slides.map((s, i) => `<option value="${i}">${i + 1}. ${s.title}</option>`).join('')}</select><button type="button" class="quiet-button" id="slidePractice">Start practical →</button></div><nav class="slide-controls" aria-label="Slide navigation"><button type="button" class="quiet-button" id="slidePrevious">← Previous</button><span id="slideCount" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" class="quiet-button" id="slideNext">Next →</button></nav><div class="slide-surface"><p class="slide-eyebrow" id="slideTopicLabel"></p><h2 id="slideTitle" tabindex="-1"></h2><div id="slideBody"></div><div id="slideVisual"></div><details class="slide-prediction"><summary id="slideQuestion"></summary><p id="slideAnswer"></p></details></div><nav class="slide-controls slide-controls-bottom" aria-label="Slide navigation after content"><button type="button" class="quiet-button" data-slide-move="-1">← Previous</button><span class="slide-count-copy"></span><button type="button" class="quiet-button" data-slide-move="1">Next →</button></nav><p class="slide-help">Use ← / → to move between slides. Escape returns to the article. Open a question to reveal its explanation.</p>`;
  document.querySelector('.hero').before(deck);
  const get = id => document.getElementById(id);
  const save = () => { try { localStorage.setItem(key, JSON.stringify({ ...state, topic: slides[state.index].id })); } catch {} };
  function render(focus = false) {
    const s = slides[state.index];
    get('slideTitle').textContent = s.title;
    get('slideTopicLabel').textContent = `Lecture 15 / ${s.topic}`;
    get('slideBody').innerHTML = s.body;
    get('slideVisual').innerHTML = s.visual || '';
    document.dispatchEvent(new Event('lesson-slide-render'));
    get('slideQuestion').textContent = `Think it through: ${s.question}`;
    get('slideAnswer').textContent = s.answer;
    deck.querySelector('details').open = false;
    get('slideCount').textContent = `${state.index + 1} / ${slides.length}`;
    get('slideTopic').value = state.index;
    deck.querySelector('.slide-count-copy').textContent = get('slideCount').textContent;
    deck.querySelector('[data-slide-move="-1"]').disabled = state.index === 0;
    deck.querySelector('[data-slide-move="1"]').disabled = state.index === slides.length - 1;
    get('slidePrevious').disabled = state.index === 0;
    get('slideNext').disabled = state.index === slides.length - 1;
    save();
    if (focus) get('slideTitle').focus({ preventScroll: true });
  }
  function setMode(enabled, focus = true) {
    if (enabled && !state.enabled) articleScroll = window.scrollY;
    state.enabled = enabled;
    document.body.classList.toggle('slide-mode', enabled);
    deck.hidden = !enabled;
    toggle.setAttribute('aria-checked', String(enabled));
    toggle.innerHTML = `Slide mode <span>${enabled ? 'On' : 'Off'}</span>`;
    if (enabled) document.querySelectorAll('video').forEach(video => video.pause());
    save();
    if (!focus) return;
    if (enabled) { window.scrollTo({ top: 0, behavior: 'instant' }); get('slideTitle').focus({ preventScroll: true }); }
    else { window.scrollTo({ top: articleScroll, behavior: 'instant' }); toggle.focus({ preventScroll: true }); }
  }
  function move(index) {
    state.index = Math.max(0, Math.min(slides.length - 1, index));
    render(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  toggle.addEventListener('click', () => setMode(!state.enabled));
  get('slidePrevious').addEventListener('click', () => move(state.index - 1));
  get('slideNext').addEventListener('click', () => move(state.index + 1));
  get('slideTopic').addEventListener('change', event => move(Number(event.target.value)));
  get('slidePractice').addEventListener('click', () => {
    setMode(false, false);
    const target = get('preparation');
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'instant' });
  });
  deck.addEventListener('click', event => {
    const navigation = event.target.closest('[data-slide-move]');
    if (navigation) { move(state.index + Number(navigation.dataset.slideMove)); return; }
  });
  deck.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('select,input,textarea,[contenteditable]')) return;
    const moves = { ArrowRight: state.index + 1, ArrowLeft: state.index - 1, Home: 0, End: slides.length - 1 };
    if (event.key === 'Escape') { event.preventDefault(); setMode(false); }
    else if (event.key in moves) { event.preventDefault(); move(moves[event.key]); }
  });
  render();
  setMode(state.enabled, false);
})();
