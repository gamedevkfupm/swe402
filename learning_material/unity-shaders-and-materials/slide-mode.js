/* A theory-first route through the same concepts as the practical article. */
(() => {
  const slides = [
  {
    "id": "intro",
    "title": "One shape, several surfaces",
    "topic": "What you will understand",
    "body": "<p>In <a href=\"../unity-3d-essentials/\">Unity 3D Essentials</a>, you assigned materials to objects. Here we explain why those settings change what a surface appears to be made of.</p><p>By the end, you should be able to connect the parts that draw a surface, predict which objects a material edit affects, and justify settings for plastic, metal or a textured surface.</p>",
    "visual": "<figure class=\"slide-figure\"><img src=\"assets/material-study-preview.png\" alt=\"Unity scene with three turquoise spheres showing matte, polished and metallic appearances, beside a textured cube\"><figcaption>Course Unity preview: from left, matte non-metal, polished non-metal, polished metal, then a textured cube. The three spheres have the same shape.</figcaption></figure><p class=\"slide-caption\">No Editor work yet. Read, predict, then reveal each explanation. The practical uses a supplied Unity gallery: a project containing objects, materials and lighting for comparisons.</p>",
    "question": "Which differences can you already see between the three spheres?",
    "answer": "The first has a softer highlight, the second has sharper highlights, and the third has darker areas and colored reflections. These observations suggest different surface settings; we will learn how to test that explanation. Appearance also depends on the light and surroundings."
  },
  {
    "id": "shape",
    "title": "Shape, drawing and collision",
    "topic": "Start with one sphere",
    "body": "<p>A <strong>mesh</strong> describes a shape using points called vertices, joined into triangles. On our sphere, the <strong>Mesh Filter</strong> component refers to this mesh. The <strong>Mesh Renderer</strong> component draws it using a material, which stores its appearance settings.</p><p>A <strong>collider</strong> is a separate physics boundary used to detect contact. The renderer controls drawing; the collider controls contact. Disabling one does not automatically disable the other.</p>",
    "visual": "<div class=\"reference-model\"><h3>Sphere GameObject</h3><div class=\"slide-pair\"><div><strong>Mesh Filter → sphere mesh</strong><p>Which shape to draw</p></div><div><strong>Mesh Renderer → material</strong><p>Which appearance to use</p></div></div><p><strong>Sphere Collider → contact boundary</strong><br>Separate from the parts responsible for drawing.</p></div><p class=\"slide-caption\">These arrows mean “refers to,” not a sequence of calculations. Next we will look inside the material.</p>",
    "question": "A sphere vanishes but still blocks the player. Which component would you inspect first?",
    "answer": "Inspect the Mesh Renderer: it may be disabled even though the Sphere Collider is still enabled. That is one possible cause, not proof; if the renderer is enabled, also check placement and camera visibility."
  },
  {
    "id": "material",
    "title": "Inside the material",
    "topic": "Shader, values and texture",
    "body": "<p>A <strong>shader</strong> is the program that calculates surface appearance. A <strong>material</strong> selects a shader and supplies its values. A <strong>texture</strong> is an image that can vary a value across the surface, such as the colors in a stone pattern.</p><p>For the URP/Lit shader used in this lesson, <strong>Base Map</strong> provides base color through a color setting and an optional texture. Without a texture, one color covers the surface; with a texture, colors can vary by location.</p>",
    "visual": "<div class=\"reference-model\"><h3>Continue following the sphere’s references</h3><p><strong>Mesh Renderer → Study_Lit material</strong></p><ul><li><strong>Shader:</strong> URP/Lit — the program to use.</li><li><strong>Values:</strong> turquoise base color, smoothness and metalness.</li><li><strong>Texture:</strong> an optional image in Base Map.</li></ul></div><p class=\"slide-caption\">When drawing, the shader uses these settings on the mesh. The camera, lighting and rendering system also affect the displayed result.</p>",
    "question": "You want a stone pattern instead of one turquoise color. Which material input is relevant?",
    "answer": "The Base Map texture input supplies a color image. You can keep the mesh and a compatible shader; the surface’s existing UV coordinates, explained later, determine where each part of the image appears."
  },
  {
    "id": "sharing",
    "title": "Shared asset, shared change",
    "topic": "References and copies",
    "body": "<p>An <strong>asset</strong> is a reusable resource saved in the project. A <strong>reference</strong> points to that resource rather than making a separate copy. Two sphere renderers can point to the same material asset.</p><p>Editing the shared material affects both spheres. Duplicating a GameObject, or saving another scene, does not automatically duplicate its materials. For independent appearance, copy the material <strong>and assign the copy</strong>.</p>",
    "visual": "<div class=\"slide-pair\"><div><h3>Before: one shared asset</h3><p>Sphere A → Study_Lit<br>Sphere B → Study_Lit</p><p>Change Study_Lit: both change.</p></div><div><h3>After: independent assets</h3><p>Sphere A → Study_Lit<br>Sphere B → Study_B</p><p>Change Study_B: only B changes.</p></div></div>",
    "question": "You edit B’s color, but A changes too. What should you check before editing more values?",
    "answer": "Check the material assigned to each renderer. If both point to the same asset, duplicate that material and assign the copy to B. Creating a copy without assigning it will not separate their appearances."
  },
  {
    "id": "pipeline",
    "title": "Choose a compatible shader",
    "topic": "The project’s rendering system",
    "body": "<p>A <strong>render pipeline</strong> coordinates the work that turns a scene into an image. Our supplied gallery uses the <strong>Universal Render Pipeline (URP)</strong>. Its materials therefore need shaders that support URP.</p><p><strong>Standard</strong> is a shader associated with Unity’s Built-in Render Pipeline. Some gallery examples use it to demonstrate a mismatch. A bright pink surface can signal an unsupported, missing or failed shader.</p>",
    "visual": "<div class=\"slide-pair\"><div><h3>Compatible example</h3><p>URP project + URP/Lit shader.<br>Next, choose whether the surface should respond to lighting.</p></div><div><h3>Mismatch to investigate</h3><p>URP project + Built-in Standard shader.<br>Check compatibility before changing appearance values.</p></div></div>",
    "question": "A material becomes pink after moving into this URP project. What is your first check, and why?",
    "answer": "Inspect its shader and any shader errors. A pipeline mismatch can prevent the intended shader from drawing. Select a compatible shader where appropriate, then verify its textures and settings; some properties may need reassignment."
  },
  {
    "id": "lighting",
    "title": "Lit responds to the light",
    "topic": "Compare one light change",
    "body": "<p>A <strong>lit</strong> shader uses lighting to calculate variations in brightness and color, called <strong>shading</strong>. An <strong>unlit</strong> shader uses its color or image without calculating that scene-light response.</p><p>Below, move the light from left to right. The lit sphere’s bright side moves; the unlit sphere stays flat. Both keep the same geometry and base color. Later image processing can still affect either displayed result.</p>",
    "visual": "<div class=\"light-demo\"><button type=\"button\" class=\"quiet-button\" id=\"moveSlideLight\" aria-pressed=\"false\">Move light to the right →</button><div class=\"slide-pair\"><div><h3>Lit</h3><div class=\"demo-sphere lit-sphere\" role=\"img\" aria-label=\"Lit sphere with its brighter side on the left\"></div><p>Useful for an object that should respond to scene lights.</p></div><div><h3>Unlit</h3><div class=\"demo-sphere unlit-sphere\" role=\"img\" aria-label=\"Unlit sphere with uniform turquoise color\"></div><p>Useful for a deliberately flat graphic.</p></div></div><p class=\"slide-caption\">Conceptual lighting diagram, not a Unity render. It isolates light direction.</p></div>",
    "question": "A flat in-world graphic must keep its color when a nearby lamp moves. Which shader type fits, and what appearance do you give up?",
    "answer": "Unlit fits that goal. It will not gain the lamp-dependent shading that helps communicate roundness and surface lighting. This choice changes appearance, not the object’s shape or collider."
  },
  {
    "id": "smoothness",
    "title": "Smoothness controls highlight spread",
    "topic": "Rough and polished non-metals",
    "body": "<p>A <strong>highlight</strong> is a bright reflection of a light source. Microscopic variations in a rough surface spread reflected light across many directions, producing broader highlights. A smoother surface concentrates those reflections into sharper highlights.</p><p>Compare the apples below from left to right. To test smoothness on your spheres, keep color, metalness, geometry, lighting and viewpoint unchanged.</p>",
    "visual": "<figure class=\"slide-figure\"><img src=\"assets/smoothness.png\" alt=\"Five red apple renders with increasingly concentrated highlights from left to right\"><figcaption>Unity Learn illustration: highlights become sharper as smoothness increases. <a href=\"https://learn.unity.com/tutorial/simulate-solid-surfaces?version=6.3\" target=\"_blank\" rel=\"noreferrer\">Source: Simulate solid surfaces</a>.</figcaption></figure><p>A shiny plastic cup is still a non-metal. Next we separate “how polished?” from “what kind of surface?”</p>",
    "question": "You change smoothness and move the light at the same time. Can you attribute the new highlight to smoothness alone?",
    "answer": "No. Either change can alter the highlight. Restore the original light and viewpoint, then change only smoothness. Compare the highlight’s width and sharpness, not just whether the object looks brighter."
  },
  {
    "id": "metalness",
    "title": "A shiny object need not be metal",
    "topic": "Two independent decisions",
    "body": "<p>On red plastic, the broad red color comes from light scattered within the material and back out. This is <strong>diffuse reflection</strong>. The plastic also has surface reflections, including highlights. Polishing it sharpens those reflections without turning it into metal.</p><p>For an ideal metal, appearance comes mainly from surface reflections rather than diffuse color. Brass colors those reflections. In URP/Lit’s <strong>Metallic workflow</strong>—the mode using the Metallic control—Base Map supplies diffuse color for a non-metal or reflection color for a metal.</p>",
    "visual": "<div class=\"surface-grid\" aria-label=\"Four illustrative combinations of metalness and smoothness\"><div><i class=\"sample matte\"></i><strong>Rough plastic</strong><span>Non-metal · low smoothness</span></div><div><i class=\"sample polished\"></i><strong>Polished plastic</strong><span>Non-metal · high smoothness</span></div><div><i class=\"sample rough-metal\"></i><strong>Rough brass</strong><span>Metal · low smoothness</span></div><div><i class=\"sample metal\"></i><strong>Polished brass</strong><span>Metal · high smoothness</span></div></div><p class=\"slide-caption\">Conceptual surface illustrations, not measured Unity renders. For clean, uncoated surfaces, Metallic 0 models non-metal and 1 models metal. Dirt and coatings can require other material arrangements.</p>",
    "question": "A rough metal and polished plastic both look plausible. Which two controls distinguish their intended surfaces?",
    "answer": "The rough metal uses a metal response with lower smoothness; polished plastic uses a non-metal response with higher smoothness. Metalness chooses the response type; smoothness controls reflection spread. A metal can look dark when its surroundings offer little bright light to reflect."
  },
  {
    "id": "uv",
    "title": "UVs are addresses in an image",
    "topic": "From color to location",
    "body": "<p>A mesh’s <strong>UV coordinates</strong> tell the shader where to read, or <strong>sample</strong>, a texture. U is horizontal and V is vertical. Across one image, 0 to 1 spans its full width or height.</p><p>In this example, (0, 0) is bottom-left. U = 0.75 goes three-quarters across; V = 0.75 goes three-quarters up. That address selects region B. A point on the mesh carrying that address receives a color from B.</p>",
    "visual": "<div class=\"uv-example\"><div><p class=\"uv-top\">V = 1 · top</p><div class=\"uv-grid\" role=\"img\" aria-label=\"UV image: A top-left, B top-right, C bottom-left, D bottom-right. Address U 0.75 V 0.75 lies in B.\"><span>A</span><span class=\"uv-selected\">B</span><span>C</span><span>D</span></div><p class=\"uv-axis\">U = 0 ← bottom edge → U = 1<br>V = 0 · bottom<br>● Address: (0.75, 0.75)</p></div><div><h3>One address, one sampled region</h3><p>Mesh point → (0.75, 0.75) → region B’s color.</p><p>A character’s mesh assigns skin and clothing to different image regions. Another mesh has different addresses, so the same picture need not align correctly.</p></div></div>",
    "question": "Which region would the address U = 0.25, V = 0.75 sample?",
    "answer": "Region A: a quarter of the way from the left and three-quarters of the way up. Changing the image changes the colors at these addresses; it does not automatically move the addresses or add geometry."
  },
  {
    "id": "tint",
    "title": "Tint multiplies each color channel",
    "topic": "A complete RGB example",
    "body": "<p><strong>RGB</strong> stores red, green and blue separately; each is a <strong>channel</strong>. For this calculation, values run from 0 (none) to 1 (full). White is (1, 1, 1); black is (0, 0, 0).</p><p>Base Map combines the texture color with its tint by multiplying matching channels: red × red, green × green, blue × blue. These are values used in shading, not a promise of exact final screen colors.</p>",
    "visual": "<div class=\"rgb-worked\"><h3>One sampled texture color × one tint</h3><p>Texture RGB: <strong>(0.8, 0.4, 0.2)</strong><br>Tint RGB: <strong>(0.5, 1, 0.5)</strong></p><ul><li>Red: 0.8 × 0.5 = <strong>0.4</strong></li><li>Green: 0.4 × 1 = <strong>0.4</strong></li><li>Blue: 0.2 × 0.5 = <strong>0.1</strong></li></ul><p>Result: <strong>(0.4, 0.4, 0.1)</strong>. Red and blue decrease; green stays the same.</p></div><div class=\"texture-comparison\"><figure><div class=\"texture-example\" role=\"img\" aria-label=\"Orange arrow pattern with neutral white tint\"></div><figcaption>White tint: preserves the pattern’s colors</figcaption></figure><figure><div class=\"texture-example tinted\" role=\"img\" aria-label=\"Same arrow pattern with reduced red and blue from a green tint\"></div><figcaption>Green tint: reduces red and blue</figcaption></figure></div><p class=\"slide-caption\">Illustrative tint preview. White multiplies every channel by 1 and is the neutral starting point.</p>",
    "question": "A texture looks green on the object but normal in the image file. What should you inspect first, and what would white tint do?",
    "answer": "Inspect the Base Map color control. A colored tint can reduce some channels more than others. White preserves each sampled channel before lighting and later image processing. Black image regions remain black under multiplication."
  },
  {
    "id": "tiling",
    "title": "Tiling repeats the same picture",
    "topic": "More repeats, smaller features",
    "body": "<p><strong>Tiling</strong> multiplies UV coordinates. On this face, 1×1 fits the picture once; 3×3 fits it three times across and three times up. Each pictured arrow becomes smaller while the surface stays the same size.</p><p>Sampling beyond an image edge depends on <strong>Wrap Mode</strong>, the texture’s edge-handling setting. Repeat wraps back to the other edge; Clamp extends the edge color instead.</p>",
    "visual": "<div class=\"texture-comparison\"><figure><div class=\"texture-example\" role=\"img\" aria-label=\"One orange arrow in a square surface\"></div><figcaption>1×1: one copy</figcaption></figure><figure><div class=\"texture-example repeats\" role=\"img\" aria-label=\"Nine smaller orange arrows in the same sized square surface\"></div><figcaption>3×3: nine copies, same surface size</figcaption></figure></div><p class=\"slide-caption\">Diagram of a repeating Base Map. No triangles are added, and the object does not grow.</p>",
    "question": "You want smaller pictured stones across the same cube face. What changes, and what must stay the same?",
    "answer": "Increase texture tiling while keeping the object’s size unchanged. With Repeat enabled, more copies fit across the face, so each pictured stone appears smaller. This changes the visible pattern, not the mesh."
  },
  {
    "id": "offset",
    "title": "Offset shifts the pattern",
    "topic": "Same size, different placement",
    "body": "<p><strong>Offset</strong> adds a shift to the UV addresses after tiling. It changes where the picture appears without changing repeat density. Keep tiling at 1×1 while comparing these two surfaces.</p><p>Here U Offset = 0.5 means “sample half an image-width farther right.” The visible arrow therefore shifts left by half a width. With Repeat enabled, the part crossing the left edge reappears at the right.</p>",
    "visual": "<div class=\"texture-comparison\"><figure><div class=\"texture-example\" role=\"img\" aria-label=\"One arrow centered with zero UV offset\"></div><figcaption>U Offset 0: centered arrow</figcaption></figure><figure><div class=\"texture-example shifted\" role=\"img\" aria-label=\"Same sized arrow shifted left half a width and wrapping across the square edges\"></div><figcaption>U Offset 0.5: shifted, same size</figcaption></figure></div><p class=\"slide-caption\">Compare with the previous slide: tiling changes repetition density; offset changes placement.</p>",
    "question": "The stone pattern is the right size, but a seam is in the wrong place. Which property would you try first?",
    "answer": "Try Offset, keeping tiling unchanged. Offset shifts placement without changing pattern size. It cannot repair every seam: discontinuities in the mesh’s UV layout or a non-seamless image may need separate fixes."
  },
  {
    "id": "ready",
    "title": "Can you explain your first change?",
    "topic": "Ready for the practical",
    "body": "<p>You can now connect the sphere’s geometry and renderer to its material, distinguish shared assets from copies, and separate lighting response, metalness, smoothness and texture placement.</p><p>In the practical, create a working scene in the supplied gallery, compare simple surfaces, then justify your own material choices. Keep the light and viewpoint steady, change one property at a time, and describe the visible evidence.</p>",
    "visual": "<div class=\"readiness\"><h3>Before opening Unity</h3><p>Two matte plastic spheres share one material. Make only B look like polished plastic while A stays matte.</p><ol><li>What must become independent?</li><li>Which surface property should change, and which should not?</li><li>What visible result would support your prediction?</li></ol></div><p class=\"slide-caption\">Answer aloud or in your own notes, then reveal the explanation. These prompts are ungraded. Use Start practical when you can explain your choices; the existing quizzes and submission stay in the article.</p>",
    "question": "How would you approach the two-sphere challenge?",
    "answer": "Duplicate the shared material and assign the copy only to B. Increase B’s Smoothness while keeping Metallic at 0 and its base color unchanged. Keep geometry, lighting and viewpoint comparable. B should show sharper highlights while A remains matte. If A changes too, inspect their material references. If this reasoning is unclear, revisit Shared asset, Smoothness and Metalness before starting."
  }
];

  const key = 'unity-shaders-and-materials-slide-mode';
  let state = { enabled: false, index: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      const legacyTopics = ['intro','shape','material','pipeline','lighting','sharing','smoothness','metalness','uv','tint','tiling','ready'];
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
    get('slideTopicLabel').textContent = `Lecture 12 / ${s.topic}`;
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
    const button = event.target.closest('#moveSlideLight');
    if (!button) return;
    const right = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(right));
    button.textContent = right ? '← Move light to the left' : 'Move light to the right →';
    deck.querySelector('.light-demo').classList.toggle('light-right', right);
    deck.querySelector('.lit-sphere').setAttribute('aria-label', `Lit sphere with its brighter side on the ${right ? 'right' : 'left'}`);
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
