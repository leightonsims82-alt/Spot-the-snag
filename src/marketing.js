const SITE_BASE = 'https://www.southwalessnagging.co.uk';
const GAME_PAGE = `${SITE_BASE}/spot-the-snag`;
const BOOKING_URL = 'https://forms.gle/t1KYdKcqugDXDhxH8';
const CHECKLIST_URL = 'https://drive.google.com/file/d/1SzCwotwR3SzW3i9VQsUAoHhulLhgGzCo/view?usp=sharing';

function campaignUrl(url, content) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_source=spot_the_snag&utm_medium=interactive&utm_campaign=game_conversion&utm_content=${encodeURIComponent(content)}`;
}

function track(eventName, detail = {}) {
  const payload = {
    event: 'swsc_interactive',
    swsc_event: eventName,
    page_mode: new URLSearchParams(window.location.search).get('mode') || 'game',
    timestamp: new Date().toISOString(),
    ...detail,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('swsc-analytics', { detail: payload }));

  if (window.parent !== window) {
    window.parent.postMessage({ type: 'SWSC_ANALYTICS', payload }, '*');
  }
}

function createLink(label, href, className, eventName, target = '_top') {
  const link = document.createElement('a');
  link.className = className;
  link.textContent = label;
  link.href = href;
  link.target = target;
  link.rel = 'noreferrer';
  link.addEventListener('click', () => track(eventName, { destination: href }));
  return link;
}

function upgradeResults(screen) {
  if (screen.dataset.conversionReady === 'true') return;
  screen.dataset.conversionReady = 'true';

  const isQuiz = screen.classList.contains('quiz-results-screen');
  const score = screen.querySelector('.final-score strong')?.textContent?.trim() || '';
  const percent = screen.querySelector('.final-score span')?.textContent?.trim() || '';
  const lead = screen.querySelector('.lead');
  const existingPrimary = screen.querySelector('a.primary-button');

  track(isQuiz ? 'quiz_results_view' : 'game_results_view', { score, percent });

  if (lead) {
    lead.textContent = isQuiz
      ? 'Knowing the standards helps, but a professional inspection checks the full property and records visible defects clearly for your developer.'
      : 'This challenge contains 10 defects. A professional snagging inspection checks hundreds of visible components throughout your new home.';
  }

  if (existingPrimary) {
    existingPrimary.href = BOOKING_URL;
    existingPrimary.target = '_blank';
    existingPrimary.innerHTML = 'Check inspection availability <span aria-hidden="true">→</span>';
    existingPrimary.addEventListener('click', () => track('booking_click', { source: isQuiz ? 'quiz_results' : 'game_results' }));
  }

  const panel = document.createElement('div');
  panel.className = 'conversion-panel';

  const heading = document.createElement('h2');
  heading.textContent = 'Ready to check your own new home?';

  const copy = document.createElement('p');
  copy.textContent = 'See inspection options, check availability or download the free pre-completion checklist.';

  const actions = document.createElement('div');
  actions.className = 'conversion-actions';
  actions.append(
    createLink(
      'View prices and services',
      campaignUrl(SITE_BASE, isQuiz ? 'quiz_results_prices' : 'game_results_prices'),
      'conversion-link conversion-link-gold',
      'website_prices_click'
    ),
    createLink(
      'Free handover checklist',
      CHECKLIST_URL,
      'conversion-link conversion-link-outline',
      'checklist_click',
      '_blank'
    )
  );

  panel.append(heading, copy, actions);
  if (existingPrimary) existingPrimary.before(panel);
  else screen.append(panel);
}

function bindInteractionTracking() {
  document.querySelectorAll('.landing-primary-button:not([data-tracked])').forEach((button) => {
    button.dataset.tracked = 'true';
    button.addEventListener('click', () => track('game_start'));
  });

  document.querySelectorAll('.mixed-quiz-card:not([data-tracked])').forEach((button) => {
    button.dataset.tracked = 'true';
    button.addEventListener('click', () => track('quiz_start', { category: 'mixed' }));
  });

  document.querySelectorAll('.category-card:not([data-tracked])').forEach((button) => {
    button.dataset.tracked = 'true';
    button.addEventListener('click', () => track('quiz_start', {
      category: button.querySelector('strong')?.textContent?.trim() || 'category',
    }));
  });

  document.querySelectorAll('.photo-frame img:not([data-tracked])').forEach((image) => {
    image.dataset.tracked = 'true';
    image.addEventListener('click', () => track('game_answer', { round: image.alt || 'unknown' }));
  });

  document.querySelectorAll('.answer-option:not([data-tracked])').forEach((button) => {
    button.dataset.tracked = 'true';
    button.addEventListener('click', () => track('quiz_answer', {
      option: button.querySelector('span')?.textContent || '',
    }));
  });

  document.querySelectorAll('.source-explanation a:not([data-tracked])').forEach((link) => {
    link.dataset.tracked = 'true';
    link.addEventListener('click', () => track('reference_click', { source: link.textContent?.trim() || '' }));
  });
}

function buildHomepageTeaser(screen) {
  if (new URLSearchParams(window.location.search).get('mode') !== 'teaser') return;
  if (screen.dataset.homepageTeaser === 'true') return;
  screen.dataset.homepageTeaser = 'true';
  screen.classList.add('homepage-teaser');
  document.body.classList.add('teaser-mode');

  const hook = screen.querySelector('.landing-hook');
  const heading = screen.querySelector('h1');
  const lead = screen.querySelector('.lead');
  const primary = screen.querySelector('.primary-button');
  const quizLink = screen.querySelector('a[href="?mode=quiz"]');
  const previewStrip = screen.querySelector('.defect-preview-strip');

  if (hook) hook.textContent = 'Interactive new-build challenge';
  if (heading) heading.textContent = 'Could you spot what the builder missed?';
  if (lead) lead.textContent = 'Try real defects found during professional snagging inspections, then test your technical new-build knowledge.';

  if (primary) {
    const playLink = createLink(
      'Play Spot the Snag',
      campaignUrl(GAME_PAGE, 'homepage_teaser_play'),
      `${primary.className} homepage-teaser-primary`,
      'homepage_teaser_play'
    );
    playLink.innerHTML = 'Play Spot the Snag <span aria-hidden="true">→</span>';
    primary.replaceWith(playLink);
  }

  if (quizLink) {
    const siteLink = createLink(
      'View inspection prices',
      campaignUrl(SITE_BASE, 'homepage_teaser_prices'),
      `${quizLink.className} homepage-teaser-secondary`,
      'homepage_teaser_prices'
    );
    siteLink.innerHTML = 'View inspection prices <span aria-hidden="true">→</span>';
    quizLink.replaceWith(siteLink);
  }

  if (previewStrip) {
    [...previewStrip.children].slice(1).forEach((item) => item.remove());
  }

  const smallPrint = screen.querySelector('.small-print');
  if (smallPrint) smallPrint.textContent = '10 real defects • 20 referenced technical questions';

  track('homepage_teaser_view');
}

function applyMarketingUpgrades() {
  document.querySelectorAll('.start-screen').forEach(buildHomepageTeaser);
  document.querySelectorAll('.results-screen').forEach(upgradeResults);
  bindInteractionTracking();
}

const observer = new MutationObserver(applyMarketingUpgrades);

function start() {
  track('interactive_view');
  applyMarketingUpgrades();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
