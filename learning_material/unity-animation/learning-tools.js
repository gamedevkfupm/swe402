/* Conceptual models, not Unity simulation. Shared by theory slides and article. */
(() => {
  const height = (t, sharp) => sharp ? 5 - 2 * Math.pow(t <= .5 ? 2*t : 2*(1-t), 2) : 4 + Math.cos(2*Math.PI*t);
  const scaleAt = (keys, frame) => {
    const sorted = [...keys].sort((a,b)=>a[0]-b[0]);
    for(let i=1;i<sorted.length;i++) if(frame<=sorted[i][0]) {
      const [a,x]=sorted[i-1], [b,y]=sorted[i]; return x+(y-x)*(frame-a)/(b-a);
    }
    return sorted.at(-1)[1];
  };
  const repaired = keys => [0,11,12,24].every((f,i)=>Math.abs(scaleAt(keys,f)-[1,1,.7,1][i])<.0001)
    && Array.from({length:111},(_,i)=>i/10).every(f=>Math.abs(scaleAt(keys,f)-1)<.0001);
  const api = {height, scaleAt, repaired};
  if(typeof document==='undefined') { globalThis.AnimationLearning=api; return; }
  const key='unity-animation-learning-tools';
  let state={prediction:'',diagnosis:'',keys:[[0,1],[12,.7],[24,1]],repairs:0};
  try { const saved=JSON.parse(localStorage.getItem(key)||'null'); if(saved) {
    state.prediction=['rounded','sharp'].includes(saved.prediction)?saved.prediction:'';
    state.diagnosis=typeof saved.diagnosis==='string'?saved.diagnosis.slice(0,1200):'';
    if(Array.isArray(saved.keys)&&saved.keys.length>=3&&saved.keys.every(k=>Array.isArray(k)&&k.length===2&&Number.isFinite(k[0])&&k[0]>=0&&k[0]<=24&&Number.isFinite(k[1])&&k[1]>=.2&&k[1]<=1.5)) state.keys=saved.keys;
    state.repairs=Number.isInteger(saved.repairs)&&saved.repairs>=0?saved.repairs:0;
  }} catch {}
  const persist=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
  const chart=(sharp)=>{
    const path=Array.from({length:101},(_,i)=>`${i?'L':'M'}${40+220*i/100},${170-60*(height(i/100,sharp)-3)}`).join(' ');
    return `<svg viewBox="0 0 440 215" role="img" aria-label="${sharp?'Sharp':'Rounded'} contact: height versus time and a ball evaluated at the same time"><path d="M40 25V170H265" fill="none" stroke="currentColor"/><path d="${path}" fill="none" stroke="var(--purple)" stroke-width="3"/><text x="40" y="18">Height (units)</text><text x="18" y="54">5</text><text x="18" y="174">3</text><text x="35" y="190">0</text><text x="134" y="190">0.5</text><text x="250" y="190">1 s</text><text x="95" y="210">Time →</text><line data-cursor x1="40" x2="40" y1="30" y2="170" stroke="var(--orange)" stroke-dasharray="4 3"/><circle data-point cx="40" cy="50" r="5" fill="var(--orange)"/><path d="M300 170H420" stroke="currentColor" stroke-width="3"/><circle data-ball cx="360" cy="39" r="11" fill="var(--purple)"/><text x="310" y="190">Same instant</text></svg>`;
  };
  function mountCurve(root) {
    root.innerHTML=`<h3>Predict, then compare the motion</h3><p>Both balls start at center height 5, touch at height 3 after 0.5 seconds, and return at 1 second. Which ball slows down just before contact?</p><label>My prediction <select aria-label="Curve comparison prediction"><option value="">Choose before playing</option><option value="rounded">Rounded contact</option><option value="sharp">Sharp contact</option></select></label><div class="motion-pair"><div class="motion-panel"><h4>Rounded contact</h4>${chart(false)}</div><div class="motion-panel"><h4>Sharp contact</h4>${chart(true)}</div></div><div class="demo-controls"><button type="button" class="quiet-button" data-play>Play both</button><label>Time <input type="range" aria-label="Comparison time in seconds" min="0" max="1" step="0.01" value="0"></label><output data-time aria-live="off">0.00 s</output></div><p data-feedback role="status"></p><p class="demo-caption">Conceptual browser demonstration, not a Unity capture. The dot, time marker and ball use the same evaluated height. The graph is height over time, not the ball’s path across the floor. Scrubbing works without playback.</p>`;
    const select=root.querySelector('select'), slider=root.querySelector('input'), button=root.querySelector('[data-play]');
    select.value=state.prediction;
    let raf=0;
    function draw(t) {
      root.querySelectorAll('svg').forEach((svg,i)=>{
        const h=height(t,!!i), x=40+220*t, y=170-60*(h-3);
        svg.querySelector('[data-cursor]').setAttribute('x1',x); svg.querySelector('[data-cursor]').setAttribute('x2',x);
        svg.querySelector('[data-point]').setAttribute('cx',x); svg.querySelector('[data-point]').setAttribute('cy',y);
        svg.querySelector('[data-ball]').setAttribute('cy',y-11);
      });
      slider.value=t; root.querySelector('[data-time]').textContent=`${t.toFixed(2)} s`;
    }
    function stop(){cancelAnimationFrame(raf);raf=0;button.textContent='Play both';}
    select.addEventListener('change',()=>{state.prediction=select.value;document.querySelectorAll('[data-learning-demo="curves"] select').forEach(other=>other.value=state.prediction);persist();});
    slider.addEventListener('input',()=>{stop();draw(Number(slider.value));});
    button.addEventListener('click',()=>{
      if(raf){stop();return;}
      if(!select.value){root.querySelector('[data-feedback]').textContent='Choose a prediction first; then compare it with what you observe.';select.focus();return;}
      state.prediction=select.value;persist();button.textContent='Pause';root.querySelector('[data-feedback]').textContent='Compare the approach to contact in both panels.';
      const start=performance.now();
      const tick=now=>{
        if(!root.isConnected||!root.getClientRects().length||document.hidden){stop();return;}
        const t=Math.min((now-start)/1000,1);draw(t);
        if(t<1)raf=requestAnimationFrame(tick); else {
          stop();root.querySelector('[data-feedback]').textContent='The rounded curve flattens before contact, so the ball slows down. The sharp curve keeps a steep slope into contact. Both contact times are still 0.5 s. Compare this with your prediction.';
        }
      };raf=requestAnimationFrame(tick);
    });
    draw(0);
    root.resetDemo=()=>{stop();select.value='';draw(0);root.querySelector('[data-feedback]').textContent='';};
  }
  function mountRepair(root) {
    root.innerHTML=`<h3>Repair an unfamiliar scale curve</h3><p>This browser clip has one fault. The ball should remain round through frame 11, squash to Y scale 0.7 at frame 12, and return to scale 1 at frame 24. Scrub the current clip. Explain the cause, then add or update one scale key. The interpolation is linear; position is deliberately omitted so you can isolate shape.</p><svg viewBox="0 0 440 220" role="img" aria-label="Editable Y scale curve and corresponding ball shape"><path d="M40 30V170H265" fill="none" stroke="currentColor"/><text x="40" y="20">Y scale</text><text x="10" y="94">1</text><text x="6" y="124">0.7</text><text x="35" y="190">0</text><text x="140" y="190">12</text><text x="245" y="190">24</text><text x="100" y="211">Frame →</text><path data-scale-path fill="none" stroke="var(--purple)" stroke-width="3"/><circle data-scale-point r="5" fill="var(--orange)"/><ellipse data-shape cx="350" cy="100" rx="26" ry="26" fill="var(--purple)"/></svg><div class="demo-controls"><label>Scrub frame <input type="range" min="0" max="24" step="0.25" value="6" aria-label="Repair preview frame"></label><output data-repair-time aria-live="off"></output></div><p class="repair-keys" data-key-list></p><label>My diagnosis before editing<textarea aria-label="Diagnosis before editing" maxlength="1200" placeholder="Which interval changes the shape too early, and why?"></textarea></label><div class="demo-controls"><label>Key frame <input type="number" min="0" max="24" step="1" aria-label="Repair key frame"></label><label>Y scale <input type="number" min="0.2" max="1.5" step="0.01" aria-label="Repair key Y scale"></label><button type="button" class="quiet-button" data-repair>Apply key and check</button><button type="button" class="quiet-button" data-restart>Restore faulty curve</button></div><p data-repair-feedback role="status"></p><p class="demo-caption">Conceptual browser exercise, not a Unity project. Save your cause-and-fix explanation in the quiz PDF; demonstrate the repaired curve in your recording.</p>`;
    const range=root.querySelector('input[type=range]'), diagnosis=root.querySelector('textarea');
    diagnosis.value=state.diagnosis;
    function draw(){
      const frame=Number(range.value), s=scaleAt(state.keys,frame);
      root.querySelector('[data-scale-path]').setAttribute('d',[...state.keys].sort((a,b)=>a[0]-b[0]).map(([f,v],i)=>`${i?'L':'M'}${40+220*f/24},${190-v*100}`).join(' '));
      const point=root.querySelector('[data-scale-point]');point.setAttribute('cx',40+220*frame/24);point.setAttribute('cy',190-s*100);
      const shape=root.querySelector('[data-shape]');shape.setAttribute('ry',26*s);shape.setAttribute('rx',26/Math.sqrt(s));
      root.querySelector('[data-repair-time]').textContent=`Frame ${frame.toFixed(2)} · Y scale ${s.toFixed(3)}`;
      root.querySelector('[data-key-list]').textContent='Current keys: '+[...state.keys].sort((a,b)=>a[0]-b[0]).map(([f,v])=>`frame ${f}: ${v}`).join(' · ');
    }
    range.addEventListener('input',draw);
    diagnosis.addEventListener('input',()=>{state.diagnosis=diagnosis.value;persist();});
    root.querySelector('[data-repair]').addEventListener('click',()=>{
      const fields=root.querySelectorAll('input[type=number]'), f=fields[0].valueAsNumber, s=fields[1].valueAsNumber, feedback=root.querySelector('[data-repair-feedback]');
      if(!diagnosis.value.trim()){feedback.textContent='Write your diagnosis before changing the curve.';diagnosis.focus();return;}
      if(!Number.isInteger(f)||f<0||f>24||!Number.isFinite(s)||s<.2||s>1.5){feedback.textContent='Enter a whole frame from 0 to 24 and a Y scale from 0.2 to 1.5.';return;}
      state.keys=state.keys.filter(k=>k[0]!==f);state.keys.push([f,s]);state.repairs++;persist();draw();
      feedback.textContent=repaired(state.keys)?'The curve now meets the target: round through frame 11, squash at 12, normal at 24. Explain why the added key changed the interval.':'The curve still misses the target. Scrub frames 0–11 and inspect the interval before contact; keep the contact and end poses unchanged.';
    });
    function reset(){state.keys=[[0,1],[12,.7],[24,1]];state.repairs=0;state.diagnosis='';diagnosis.value='';root.querySelectorAll('input[type=number]').forEach(x=>x.value='');root.querySelector('[data-repair-feedback]').textContent='';range.value=6;persist();draw();}
    root.querySelector('[data-restart]').addEventListener('click',reset);root.resetDemo=reset;draw();
    if(state.repairs)root.querySelector('[data-repair-feedback]').textContent=repaired(state.keys)?'Saved repair meets the target.':'Saved curve still needs a correction.';
  }
  function mount(scope=document){scope.querySelectorAll('[data-learning-demo]:not([data-mounted])').forEach(root=>{root.dataset.mounted='true';if(root.dataset.learningDemo==='curves')mountCurve(root);if(root.dataset.learningDemo==='repair')mountRepair(root);});}
  api.mount=mount;
  api.appendReport=(report,append)=>{
    append(report,'h2','Prediction and debugging exercise');
    append(report,'p','Curve prediction: '+(state.prediction?state.prediction+' contact slows before impact':'Not recorded')+'. This is a learning prediction, not a quiz score.');
    append(report,'p','Diagnosis (student-written): '+(state.diagnosis.trim()||'Not entered'));
    append(report,'p',`Browser repair: ${state.repairs ? (repaired(state.keys)?'Target met':'Target not yet met'):'Not attempted'} · ${state.repairs} applied edits. This checks the browser curve, not Unity execution or explanation quality.`);
    append(report,'p','Saved scale keys: '+[...state.keys].sort((a,b)=>a[0]-b[0]).map(([f,s])=>`${f}: ${s}`).join('; '));
  };
  window.animationLearning=api;
  document.addEventListener('lesson-slide-render',()=>mount());
  document.getElementById('resetProgress').addEventListener('click',()=>{state={prediction:'',diagnosis:'',keys:[[0,1],[12,.7],[24,1]],repairs:0};document.querySelectorAll('[data-learning-demo]').forEach(x=>x.resetDemo?.());persist();});
  mount();
})();
