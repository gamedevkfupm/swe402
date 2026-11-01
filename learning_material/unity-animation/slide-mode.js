/* Lecture 14: theory before practice. Ungraded prompts do not count as hints. */
(() => {
  const slides = [
  {
    "id": "purpose",
    "title": "Who decides where the ball goes?",
    "topic": "Authored motion and prior knowledge",
    "body": "<p>In 2D Essentials, you created a clip from sprite frames. In Sound and Effects, the Animator selected existing character motion. Now we author numeric Transform values and shape their interpolation. We will make a ball bounce, change its sense of weight, and relocate the whole action.</p><p>A physics simulation calculates motion from forces and collisions. An authored animation follows chosen values over time. Our repeated bounce continues even if its platform is removed: contact is part of our visual design.</p>",
    "question": "Does a convincing animated bounce prove gravity is acting on a Rigidbody?",
    "answer": "No. The same visible path can be authored with keys. You must inspect what drives the motion.",
    "visual": "<div class=\"slide-pair\"><div><h3>Physics-driven ball</h3><p>Forces and contacts influence the next position.</p></div><div><h3>Our animated ball</h3><p>A clip supplies the position at the current animation time.</p></div></div>"
  },
  {
    "id": "system",
    "title": "Separate the data from the player",
    "topic": "Clip, Controller and component",
    "body": "<p>An <strong>Animation Clip</strong> is an asset containing property changes over time. An <strong>Animator Controller</strong> is an asset containing states and the rules for selecting them. A <strong>state</strong> references a clip and playback settings.</p><p>The <strong>Animator component</strong> lives on the GameObject and uses that Controller to apply animation. The Controller’s default state plays first. In this lecture, one default state is enough; gameplay transitions remain familiar from Lecture 9.</p>",
    "question": "A ball pulses in Play mode even though you just previewed its bounce. Is the bounce necessarily broken?",
    "answer": "No. Preview and runtime state selection differ. Check which state is the Controller’s default and which clip it references.",
    "visual": "<div class=\"slide-pair\"><div><h3>Animation window</h3><p>Edit and preview the values inside a clip.</p></div><div><h3>Animator window</h3><p>Inspect states and choose which clip runs.</p></div></div>"
  },
  {
    "id": "keys",
    "title": "A few values describe many poses",
    "topic": "Keyframes and interpolation",
    "body": "<p>A <strong>keyframe</strong> records a property value at a particular time. A <strong>pose</strong> is the resulting arrangement or shape. You can key only Scale while leaving Position unchanged.</p><p><strong>Interpolation</strong> computes values between keys. For a scale pulse, key normal size at 0 seconds, larger size at 0.5 seconds, and normal size at 1 second. Unity can draw intermediate sizes without a separate key for every displayed frame.</p>",
    "question": "If the first and last keys have identical values, must the object stay still?",
    "answer": "No. An intermediate key can change the value before it returns to the starting pose.",
    "visual": "<div class=\"slide-pair\"><div><h3>Keyed poses</h3><p>Normal → larger → normal</p></div><div><h3>Between the poses</h3><p>The property changes continuously according to its curves.</p></div></div>"
  },
  {
    "id": "time",
    "title": "Read the timeline as time",
    "topic": "Samples and rendered frames",
    "body": "<p><strong>Sample rate</strong> defines the frame divisions used to author the clip. At 24 samples per second, frame 12 is 12 ÷ 24 = 0.5 seconds. Frame 24 is 1 second.</p><p>With seconds displayed, the ruler’s <strong>1:12</strong> means 1 second and 12 frames: 1 + 12/24 = 1.5 seconds. It does not mean 1.12 seconds. The game can still render at 60 frames per second while evaluating this clip.</p>",
    "question": "At 24 samples per second, what does 0:18 mean?",
    "answer": "18/24 = 0.75 seconds. There are zero whole seconds before the colon and eighteen frame divisions after it.",
    "visual": "<div class=\"slide-pair\"><div><h3>Authoring timeline</h3><p>Where the keys are placed in time.</p></div><div><h3>Game frame rate</h3><p>How often the game presents a rendered image.</p></div></div>"
  },
  {
    "id": "curves",
    "title": "Read height, then read its slope",
    "topic": "Position curves",
    "body": "<p>An <strong>animation curve</strong> plots a property’s value against time. For vertical position, horizontal distance means elapsed time and vertical distance means height in Unity units.</p><p>The curve’s <strong>slope</strong> describes vertical velocity: change in height divided by change in time. A flat region means little vertical movement. A steep falling region means a rapid descent. The height itself is not the speed.</p>",
    "question": "Can a ball be high above the floor and almost stationary?",
    "answer": "Yes. At the top of a bounce, height is large while the position curve can have a nearly flat tangent.",
    "visual": "<svg viewBox=\"0 0 640 240\" role=\"img\" aria-label=\"Conceptual height curve, flat at the top and steep near contact\" style=\"width:100%;color:var(--purple)\"><path d=\"M70 25V195H600\" stroke=\"currentColor\" fill=\"none\"/><path d=\"M95 45 C190 45 220 75 325 175 C430 75 460 45 555 45\" stroke=\"currentColor\" stroke-width=\"4\" fill=\"none\"/><g fill=\"currentColor\" font-size=\"16\"><text x=\"9\" y=\"22\">Height</text><text x=\"510\" y=\"224\">Time →</text><text x=\"90\" y=\"30\">slow</text><text x=\"285\" y=\"205\">contact</text><text x=\"482\" y=\"30\">slow</text></g></svg><p class=\"slide-caption\">Conceptual illustration, not a Unity screenshot. The curve shows height over time, not the ball’s sideways path.</p>"
  },
  {
    "id": "linear",
    "title": "Same endpoints, different motion",
    "topic": "A worked linear example",
    "body": "<p>Assume a linear descent from center Y = 4.75 to Y = 2.75 over 0.5 seconds. The height changes by −2 units, giving vertical velocity −2 ÷ 0.5 = <strong>−4 units/second</strong>. The minus sign means downward.</p><p>Halfway through that interval, at 0.25 seconds, the center is Y = 3.75. A curved interpolation can keep the same endpoints and duration while producing a different value at that halfway time.</p>",
    "question": "If you keep the two heights but double the duration of a linear descent, what happens to speed?",
    "answer": "The same distance takes twice as long, so the speed halves. Here the downward velocity becomes −2 units/second.",
    "visual": ""
  },
  {
    "id": "tangents",
    "title": "Make the reversal fit the impact",
    "topic": "Easing and tangent directions",
    "body": "<p><strong>Easing</strong> changes speed gradually. A <strong>tangent</strong> sets the direction of a curve as it enters or leaves a key. Gentle slopes near a high pose suggest a brief pause.</p><p>At ground contact, a smooth rounded bottom slows the ball before reversing; this can look floaty. A sharp V has a fast downward approach and upward departure. <strong>Broken tangents</strong> allow those two directions to differ; free handles let you adjust their slopes.</p>",
    "question": "Does making the contact curve steeper automatically move the contact to an earlier time?",
    "answer": "No. If the key’s time stays fixed, contact still happens at that time. You changed the interpolation around the key.",
    "visual": "<div class=\"learning-demo\" data-learning-demo=\"curves\"></div>"
  },
  {
    "id": "loop",
    "title": "A loop reconnects its end to its start",
    "topic": "Endpoint continuity",
    "body": "<p>A looping clip repeats after its duration. Matching the first and last property values avoids a visible pose jump at the join. Compatible slopes also keep the speed from changing abruptly there.</p><p>Our bounce starts and ends at the same high pose. It repeats with the same height each cycle; it is a stylized perpetual bounce, not a simulation of energy loss. The contact corner is intentional, while a jump at the loop boundary is not.</p>",
    "question": "Would matching Position endpoints fix a loop whose Scale endpoints differ?",
    "answer": "No. Each animated property needs an appropriate join. Position can be continuous while scale still jumps.",
    "visual": ""
  },
  {
    "id": "shape",
    "title": "Use shape to communicate softness",
    "topic": "Squash, stretch and timing",
    "body": "<p><strong>Squash</strong> compresses the ball at impact. <strong>Stretch</strong> lengthens it just after contact. Increasing width as height shrinks can preserve the impression of volume.</p><p>The preceding normal pose determines when squash begins. A normal scale key one frame before contact keeps the fall round until then. Returning to normal a few frames afterward prevents the stretched shape from lasting through the whole ascent.</p>",
    "question": "Why can three scale keys—normal at start, flat at contact, normal at end—make the ball look wrong?",
    "answer": "Interpolation changes the scale across the entire fall and rise. Add normal poses near contact to confine the deformation.",
    "visual": "<div class=\"slide-pair\"><div><h3>Brief impact</h3><p>Normal → squash → stretch → normal</p></div><div><h3>Perceived material</h3><p>Timing and deformation suggest softness; the material shader can remain unchanged.</p></div></div>"
  },
  {
    "id": "ground",
    "title": "A changed shape needs a changed center",
    "topic": "Ground contact and scale",
    "body": "<p>Assume a unit-diameter sphere, a center pivot, an unscaled parent, and a horizontal platform at Y = 2.25. With Y scale 0.7, its half-height is 0.5 × 0.7 = 0.35 units. Contact therefore needs center Y = <strong>2.60</strong>.</p><p>A stretched pose at Y scale 1.2 has half-height 0.60. Center Y = 3.0 puts its bottom at 2.40, just above the platform. Position and Scale curves must agree between keys too; inspect the bottom of the visible mesh while scrubbing.</p>",
    "question": "Why is center Y = 2.75 too high for exact contact when Y scale is 0.7?",
    "answer": "The bottom would be 2.75 − 0.35 = 2.40, which leaves a 0.15-unit gap above the platform.",
    "visual": "<figure class=\"contact-figure\"><div class=\"motion-pair\"><div><h4>Normal: Y scale 1</h4><svg class=\"contact-diagram\" viewBox=\"0 0 350 240\" role=\"img\" aria-label=\"Normal sphere: center 2.75, half-height 0.50, platform 2.25\"><path d=\"M20 175H330\" stroke=\"currentColor\" stroke-width=\"3\"/><ellipse cx=\"110\" cy=\"110\" rx=\"65\" ry=\"65\" fill=\"var(--purple-soft)\" stroke=\"var(--purple)\" stroke-width=\"2\"/><circle cx=\"110\" cy=\"110\" r=\"4\" fill=\"var(--purple)\"/><path d=\"M110 110H235M215 110V175M208 110H222M208 175H222\" stroke=\"currentColor\" fill=\"none\"/><text x=\"170\" y=\"98\">Center 2.75</text><text x=\"232\" y=\"147.5\">0.50</text><text x=\"20\" y=\"202\">Platform top: Y = 2.25</text><text x=\"20\" y=\"226\">2.25 + (0.5 × 1) = 2.75</text></svg></div><div><h4>Squashed: Y scale 0.7</h4><svg class=\"contact-diagram\" viewBox=\"0 0 350 240\" role=\"img\" aria-label=\"Squashed sphere: center 2.60, half-height 0.35, platform 2.25\"><path d=\"M20 175H330\" stroke=\"currentColor\" stroke-width=\"3\"/><ellipse cx=\"110\" cy=\"129.5\" rx=\"78\" ry=\"45.5\" fill=\"var(--purple-soft)\" stroke=\"var(--purple)\" stroke-width=\"2\"/><circle cx=\"110\" cy=\"129.5\" r=\"4\" fill=\"var(--purple)\"/><path d=\"M110 129.5H235M215 129.5V175M208 129.5H222M208 175H222\" stroke=\"currentColor\" fill=\"none\"/><text x=\"170\" y=\"117.5\">Center 2.60</text><text x=\"232\" y=\"157.25\">0.35</text><text x=\"20\" y=\"202\">Platform top: Y = 2.25</text><text x=\"20\" y=\"226\">2.25 + (0.5 × 0.7) = 2.60</text></svg></div></div><figcaption>Conceptual cross-sections, not Unity screenshots. With a centered pivot and unscaled parent, center height = platform height + scaled half-height. Lower the center when the ball becomes shorter; otherwise a gap appears.</figcaption></figure>"
  },
  {
    "id": "local",
    "title": "Give placement to an unanimated parent",
    "topic": "Local and world coordinates",
    "body": "<p>A child Transform’s <strong>local position</strong> is measured relative to its parent. <strong>World position</strong> is its location in the scene. The clip keeps writing local values, so moving the animated child can be overwritten.</p><p>Keep the Animator on Ball. Put Ball under an unanimated Ball Parent to offset the whole action. If the parent has no rotation and unit scale, parent X = 1 plus child local X = −3.87 gives world X = −2.87. Reset the parent before reparenting to preserve the original frame of reference.</p>",
    "question": "Would this simple addition still fully describe the motion if the parent were rotated or scaled?",
    "answer": "No. The parent’s rotation and scale would also transform the child’s motion. The simple numeric example assumes zero rotation and unit scale.",
    "visual": "<div class=\"slide-pair\"><div><h3>Ball Parent</h3><p>Owns scene placement.</p></div><div><h3>Ball + Animator</h3><p>Owns the same local motion at each new placement.</p></div></div>"
  },
  {
    "id": "ready",
    "title": "Predict, isolate, observe, explain",
    "topic": "Synthesis and practical handoff",
    "body": "<p>Keys describe values and times; curves shape the motion between them. Deformation needs matching contact geometry. A Controller selects the clip, while an unanimated parent can relocate its local motion.</p><p>In the practical, make a pulse and bounce, compare curve shapes, add brief deformation, then diagnose a placement overwrite. Finish by choosing a different apex height while keeping the cycle duration fixed.</p><p>Then create a new two-second pulse using your own key choices and diagnose a faulty scale curve. Explain the cause of the motion you observe.</p>",
    "question": "You raise the apex but keep the contact time and platform unchanged. What must you inspect and what motion change do you expect?",
    "answer": "Expect greater average downward speed over the same time interval. Inspect the curve, mesh clearance at contact, and loop endpoints. Keep deformation timing and parent placement unchanged so you can attribute the difference to height.",
    "visual": ""
  }
];

  const key = 'unity-animation-slide-mode';
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
    get('slideTopicLabel').textContent = `Lecture 14 / ${s.topic}`;
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
