'use strict';

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

function showPage(pageName) {
  const page = [...pages].find((item) => item.dataset.page === pageName);
  if (!page) return;
  pages.forEach((item) => item.classList.toggle('active', item === page));
  navigationLinks.forEach((link) => link.classList.toggle('active', link.textContent.trim().toLowerCase().startsWith(pageName)));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navigationLinks.forEach((link) => link.addEventListener('click', () => showPage(link.firstChild.textContent.trim().toLowerCase())));
document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.jump)));
document.querySelectorAll('[data-filter-btn]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim().toLowerCase();
    document.querySelectorAll('[data-filter-btn]').forEach((filter) => filter.classList.toggle('active', filter === button));
    document.querySelectorAll('[data-filter-item]').forEach((item) => {
      item.hidden = category !== 'all' && item.dataset.category.trim().toLowerCase() !== category;
    });
  });
});
