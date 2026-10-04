(() => {
  const script = document.currentScript;
  const base = new URL('../', script.src);
  const sheets = [
    ['unity-editor-first-contact', 'Unity Editor first contact'],
    ['unity-3d-essentials', 'Unity 3D Essentials'],
    ['unity-2d-essentials', 'Unity 2D Essentials'],
    ['unity-audio-essentials', 'Unity Audio Essentials'],
    ['unity-programming-essentials', 'Unity Programming Essentials'],
    ['unity-player-control', 'Unity Player Control'],
    ['unity-basic-gameplay', 'Unity Basic Gameplay'],
    ['unity-sound-and-effects', 'Unity Sound and Effects'],
    ['unity-gameplay-mechanics', 'Unity Gameplay Mechanics'],
    ['unity-publishing-essentials', 'Unity Publishing Essentials'],
  ];
  const header = document.querySelector('.site-header');
  const mark = header?.querySelector('.site-mark');
  if (!header || !mark) return;

  const heading = document.createElement('div');
  heading.className = 'course-heading';
  mark.before(heading);
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'course-menu-toggle';
  toggle.setAttribute('aria-label', 'Browse course sheets');
  toggle.setAttribute('aria-haspopup', 'dialog');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'course-sheet-menu');
  toggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M2 4h14M2 9h14M2 14h14" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  heading.append(toggle, mark);

  const dialog = document.createElement('dialog');
  dialog.id = 'course-sheet-menu';
  dialog.className = 'course-sheet-menu';
  dialog.setAttribute('aria-labelledby', 'course-menu-title');
  const top = document.createElement('div');
  top.className = 'course-menu-top';
  const title = document.createElement('h2');
  title.id = 'course-menu-title';
  title.textContent = 'Course sheets';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'course-menu-close';
  close.setAttribute('aria-label', 'Close course sheets');
  close.textContent = '×';
  top.append(title, close);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'All course sheets');
  const list = document.createElement('ul');
  for (const [slug, label] of sheets) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const url = new URL(`${slug}/index.html`, base);
    link.href = url.href;
    link.textContent = label;
    if (location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') === url.pathname.replace(/index\.html$/, '').replace(/\/$/, '')) {
      link.setAttribute('aria-current', 'page');
    }
    item.append(link);
    list.append(item);
  }
  nav.append(list);
  dialog.append(top, nav);
  document.body.append(dialog);
  toggle.addEventListener('click', () => {
    dialog.showModal();
    toggle.setAttribute('aria-expanded', 'true');
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
})();
