'use strict';

const portrait = document.querySelector('.portrait-panel img');
if (portrait) {
  portrait.classList.add('is-loading');
  const revealPortrait = () => {
    portrait.classList.remove('is-loading');
    portrait.classList.add('is-visible');
  };
  if (portrait.complete && portrait.naturalWidth > 0) revealPortrait();
  else portrait.addEventListener('load', revealPortrait, { once: true });
  portrait.addEventListener('error', () => portrait.classList.remove('is-loading'), { once: true });
}

document.querySelectorAll('[data-jump]').forEach((control) => {
  control.addEventListener('click', () => {
    const target = document.getElementById(control.dataset.jump);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('[data-filter-btn]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim().toLowerCase();
    document.querySelectorAll('[data-filter-btn]').forEach((filter) => filter.classList.toggle('active', filter === button));
    document.querySelectorAll('[data-filter-item]').forEach((item) => {
      item.hidden = category !== 'all' && item.dataset.category.trim().toLowerCase() !== category;
    });
  });
});
