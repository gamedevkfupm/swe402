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
        if (video.error || video.readyState === 0) {
          video.preload = 'metadata';
          panel.querySelector('.video-error').hidden = true;
          video.load();
        }
        card.setAttribute('aria-expanded', 'true');
      }
      window.dispatchEvent(new Event('scroll'));
    });
  });
})();

// Seek thumbnails after metadata so they show a useful frame without autoplay.
document.querySelectorAll('.video-thumbnail video').forEach(video => {
  const seek=()=>{if(Number.isFinite(video.duration)) video.currentTime=Math.min(5,video.duration/2);};
  video.addEventListener('loadedmetadata',seek,{once:true});
  if(video.readyState>=1) seek();
});
