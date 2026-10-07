(() => {
  const cards = [...document.querySelectorAll('[data-video-target]')];
  function close(card) {
    const panel = document.getElementById(card.dataset.videoTarget);
    panel.querySelector('.video-content video').pause();
    panel.hidden = true;
    card.setAttribute('aria-expanded', 'false');
  }
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const open = card.getAttribute('aria-expanded') !== 'true';
      cards.forEach(close);
      if (open) {
        const panel = document.getElementById(card.dataset.videoTarget);
        panel.hidden = false;
        const video = panel.querySelector('.video-content video');
        if (video.error) {
          panel.querySelector('.video-error').hidden = true;
          video.load();
        }
        card.setAttribute('aria-expanded', 'true');
      }
      window.dispatchEvent(new Event('scroll'));
    });
  });
})();
