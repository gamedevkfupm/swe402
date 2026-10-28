/* A theory-first route through the same concepts as the practical article. */
(() => {
  const slides = [
  {
    "id": "purpose",
    "title": "Same surfaces, different light",
    "topic": "Purpose and prior knowledge",
    "body": "<p>In the materials lab, you changed how a surface responds to light. Here you change the illumination arriving at that surface. A white wall can look cool in shade and warm beneath a lamp without changing its material.</p><p>Our goal is a readable night scene: enough light to understand the steps, but enough contrast for a route to stand out. Keep surfaces unchanged while testing lighting.</p>",
    "question": "Why keep the material and viewpoint fixed when comparing two light settings?",
    "answer": "So the visible difference can be attributed to the changed lighting rather than a new surface or viewing angle.",
    "visual": "<figure class=\"slide-figure\"><img src=\"assets/outdoor-reference.png\" alt=\"Unity outdoor amphitheater with localized warm lights against a dark environment\"><figcaption>Official Unity outdoor reference. Colored baked accents exceed this lab’s realtime task.</figcaption></figure>"
  },
  {
    "id": "paths",
    "title": "Where the illumination comes from",
    "topic": "Direct and indirect light",
    "body": "<p><strong>Direct light</strong> reaches a surface from a source. <strong>Indirect light</strong> has reflected from another surface first. A sunlit red wall can send some reddish light onto nearby paving.</p><p><strong>Environmental lighting</strong> represents broad illumination from the surroundings, including the sky. In this lab, an ambient color provides simple diffuse fill: a baseline that makes shaded faces readable. It does not reproduce detailed bounces between walls.</p>",
    "question": "A shaded face remains visible after you turn off a nearby lamp. Must that lamp still be active?",
    "answer": "No. Other lights and environmental fill can still illuminate it. Isolate one contribution at a time.",
    "visual": "<div class=\"slide-pair\"><div><h3>Direct path</h3><p>Lamp → paving → camera</p></div><div><h3>Indirect path</h3><p>Lamp → wall → paving → camera</p></div></div><p class=\"slide-caption\">Conceptual light paths: arrows indicate light travelling between surfaces, not required Editor operations.</p>"
  },
  {
    "id": "shapes",
    "title": "Choose a light shape first",
    "topic": "Directional, Point and Spot",
    "body": "<p>A <strong>Directional Light</strong> approximates a distant sun with parallel rays. Its rotation matters; its position does not change the illumination.</p><p>A <strong>Point Light</strong> illuminates around a local position. A <strong>Spot Light</strong> restricts illumination to a cone. Moving either local light changes what is nearby; rotating a Spot changes where its cone points.</p>",
    "question": "Why is a Spot usually a better starting point than a Directional Light for a downward street lamp?",
    "answer": "Its local position and cone describe a fixture illuminating one patch. A Directional Light illuminates in parallel across the scene and does not have a local reach.",
    "visual": "<div class=\"slide-pair\"><div><h3>Sun or moon</h3><p>Distant source; use direction to choose brighter faces.</p></div><div><h3>Street lamp</h3><p>Local source; choose position, direction and a limited pool.</p></div></div>"
  },
  {
    "id": "controls",
    "title": "Reach is different from strength",
    "topic": "Range, intensity and cone width",
    "body": "<p><strong>Range</strong> is the cutoff distance for a local light. <strong>Intensity</strong> adjusts its strength within its influence. <strong>Spot angle</strong> controls the width of a Spot Light’s cone.</p><p>Imagine a lamp with a Range of 5 Unity units and a floor point 6 units from the light. With the source fixed, raising Intensity cannot bring that point inside the cutoff. Increase Range or change placement first. If one unit represents one metre in your scene, these distances represent 5 m and 6 m.</p>",
    "question": "The target is inside the cone and range, but its paving becomes featureless white. What is a useful first comparison?",
    "answer": "Reduce only Intensity and look for the paving detail to return. Keep viewpoint, materials and other lights steady.",
    "visual": "<div class=\"reference-model\"><h3>Controlled test</h3><p>Same position + same cone + same range → change only intensity → compare surface detail.</p><p>The arrow describes the sequence of a comparison, not a lighting equation.</p></div>"
  },
  {
    "id": "environment",
    "title": "Separate the sky from the fill",
    "topic": "Skybox and ambient illumination",
    "body": "<p>A <strong>skybox</strong> draws distant surroundings behind the scene. A procedural sky material generates its appearance from settings. Its Exposure changes that sky’s brightness.</p><p>The Directional Light’s Intensity controls its direct contribution. Environment Lighting controls broad fill. When its Source is <strong>Color</strong>, the ambient color is independent of the visible sky. A dark sky can coexist with overly bright shaded surfaces.</p>",
    "question": "You lower the sky’s exposure but the shaded steps remain bright. Why can that be correct?",
    "answer": "In the Color-source setup, sky appearance and ambient fill have separate controls. Inspect the fill and other lights instead of assuming the sky edit failed.",
    "visual": "<div class=\"slide-pair\"><div><h3>Background</h3><p>NightSky material → visible distant sky</p></div><div><h3>Illumination</h3><p>Directional Light + local lights + ambient fill → lit surface response</p></div></div><p class=\"slide-caption\">Arrows mean “contributes to.” This model assumes the lab’s Color-source environment.</p>"
  },
  {
    "id": "timing",
    "title": "When is the light calculated?",
    "topic": "Realtime and baked",
    "body": "<p><strong>Realtime lighting</strong> responds as the scene is drawn. Move a realtime street lamp and its pool can move with it. <strong>Baked lighting</strong> is calculated earlier and stored. A <strong>lightmap</strong> stores that result in a texture for fixed surfaces.</p><p>Moving a lamp model does not update the stored floor illumination. A new bake is needed to change that data. Realtime direct lights do not automatically calculate bounced light each frame in this project. <strong>Mixed</strong> mode combines realtime and baked contributions; the supplied lamps use it, so their direct pools can move while stored indirect lighting stays unchanged.</p>",
    "question": "Why can the baked patch stay behind even though you can visibly move the lamp model?",
    "answer": "The model’s current Transform and the stored lighting texture are separate data. Moving one does not recalculate the other.",
    "visual": "<div class=\"slide-pair\"><div><h3>Realtime lamp</h3><p>Current light transform → current direct illumination</p></div><div><h3>Baked lamp</h3><p>Earlier bake → stored floor patch, until rebaked</p></div></div>"
  },
  {
    "id": "shadows",
    "title": "A bright surface can have no shadow",
    "topic": "Occlusion and shadow settings",
    "body": "<p>A shadow indicates that geometry blocks light from reaching a surface. Realtime shadow maps record depth from a light’s viewpoint, helping the renderer decide which surfaces are blocked.</p><p>A renderer must cast a shadow, the receiving surface must display it, the light must request it, and the active render pipeline must support it. Missing any link can leave the floor illuminated with no visible shadow.</p>",
    "question": "The floor is lit, but the cube does not cast a visible shadow. Does that prove the light is broken?",
    "answer": "No. Inspect the caster, receiver, light shadow setting and active pipeline shadow support separately. Direct illumination can work while shadow rendering is disabled.",
    "visual": "<div class=\"reference-model\"><h3>Four checks</h3><p>Caster → receiver → Light shadow setting → active URP support</p><p>These arrows are a diagnostic checklist, not the order of the rendering calculation.</p></div>"
  },
  {
    "id": "distance",
    "title": "Light range and shadow distance differ",
    "topic": "Quality and performance",
    "body": "<p><strong>Shadow Max Distance</strong> is measured from the viewing camera. It limits how far realtime shadows are rendered. Local light <strong>Range</strong> is measured from the light and limits its illumination.</p><p>Setting shadow distance to zero can remove shadows while leaving illumination visible. Soft Shadows smooths shadow-map edges; it cannot restore a disabled shadow path. Extra shadow lights and filtering cost rendering work.</p>",
    "question": "Would increasing lamp range repair shadows disabled by a zero Max Distance?",
    "answer": "No. Restore nonzero shadow distance in the active URP asset. Changing range affects where the light reaches, not the camera-relative shadow cutoff.",
    "visual": "<div class=\"slide-pair\"><div><h3>Light → surface distance</h3><p>Range: can this local light reach it?</p></div><div><h3>Camera → surface distance</h3><p>Max Distance: should its realtime shadow be rendered?</p></div></div>"
  },
  {
    "id": "contrast",
    "title": "Guide attention with a visible difference",
    "topic": "Apply the controls together",
    "body": "<p><strong>Contrast</strong> is a visible difference between regions. A warmer, brighter route against subdued surroundings can attract attention while preserving a night setting.</p><p>Hold the camera and materials steady, predict one change, and compare it. If the seating is as bright as the route, test lower environmental fill before adding lights. Preserve enough fill to read the steps.</p>",
    "question": "How do you decide whether a revision helped rather than merely changed the scene?",
    "answer": "Compare it against the intention: the route should become easier to identify while necessary geometry and surface detail remain readable. Explain the observed evidence.",
    "visual": ""
  },
  {
    "id": "ready",
    "title": "Explain the change before making it",
    "topic": "Synthesis and handoff",
    "body": "<p>Choose light shape for the source, separate sky appearance from fill, and tune one local-light control at a time. Distinguish current realtime illumination from stored baked results. Check shadow settings independently of illumination.</p><p>You are ready to open the supplied project, observe its completed example, then build your own night study. Preparation comes first even if the theory already feels familiar.</p>",
    "question": "A Spot misses the next step, seating looks too bright, and the cube has no shadow. How would you investigate without changing everything at once?",
    "answer": "First inspect cone direction and Range for the missed step. Then test lower ambient fill from a fixed view. Finally check caster, receiver, the Light shadow setting and the active URP shadow settings. Observe each result before making the next change.",
    "visual": ""
  }
];

  const key = 'unity-lighting-slide-mode';
  let state = { enabled: false, index: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      const legacyTopics = ["purpose", "paths", "shapes", "controls", "environment", "timing", "shadows", "distance", "contrast", "ready"];
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
    get('slideTopicLabel').textContent = `Lecture 13 / ${s.topic}`;
    get('slideBody').innerHTML = s.body;
    get('slideVisual').innerHTML = s.visual || '';
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
