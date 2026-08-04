import { rounds } from './rounds.js';

const previewRounds = rounds.slice(0, 3);

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text) element.textContent = text;
  return element;
}

function buildPreviewStrip() {
  const strip = createElement('div', 'defect-preview-strip');
  strip.setAttribute('aria-label', 'Preview of real inspection defects');

  previewRounds.forEach((round) => {
    const card = createElement('div', 'defect-preview-card');
    const image = document.createElement('img');
    image.src = round.photo_url;
    image.alt = round.title;
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';

    const label = createElement('span', 'defect-preview-label', round.title);
    card.append(image, label);
    strip.append(card);
  });

  return strip;
}

function upgradeSnagLanding(screen) {
  if (screen.dataset.premiumLanding === 'true') return;
  screen.dataset.premiumLanding = 'true';
  screen.classList.add('premium-landing');

  const heading = screen.querySelector('h1');
  const lead = screen.querySelector('.lead');
  const stats = screen.querySelector('.start-card');
  const primaryButton = screen.querySelector('.primary-button');
  const quizLink = screen.querySelector('a[href="?mode=quiz"]');
  const smallPrint = screen.querySelector('.small-print');

  if (heading && !screen.querySelector('.landing-hook')) {
    heading.before(createElement('p', 'landing-hook', 'Think you could beat a professional inspector?'));
  }

  if (lead) {
    lead.textContent = 'Test your eye against real defects found during professional snagging inspections.';
    const authority = createElement(
      'p',
      'authority-line',
      'Built using genuine defects identified during professional new-build inspections across South Wales.'
    );
    lead.after(authority);
  }

  if (stats) {
    const cards = stats.querySelectorAll(':scope > div');
    if (cards[0]) {
      cards[0].querySelector('strong').textContent = String(rounds.length);
      cards[0].querySelector('span').textContent = 'Real defects';
    }
    if (cards[1]) {
      cards[1].querySelector('strong').textContent = '20 sec';
      cards[1].querySelector('span').textContent = 'Default level';
    }
    if (cards[2]) {
      cards[2].querySelector('strong').textContent = String(rounds.length * 100);
      cards[2].querySelector('span').textContent = 'Maximum score';
    }
  }

  if (primaryButton) {
    primaryButton.classList.add('landing-primary-button');
    primaryButton.innerHTML = '<span>Start Spot the Defect</span><span aria-hidden="true">→</span>';
  }

  if (quizLink) {
    quizLink.classList.add('quiz-feature-button');
    quizLink.innerHTML = '<span>Take the New Build Knowledge Quiz</span><span aria-hidden="true">→</span>';

    if (!screen.querySelector('.quiz-cta-note')) {
      const note = createElement(
        'p',
        'quiz-cta-note',
        'Test your knowledge of finishes, tolerances, defects and warranty-provider expectations.'
      );
      quizLink.after(note);
    }
  }

  if (!screen.querySelector('.defect-preview-strip')) {
    const previews = buildPreviewStrip();
    if (smallPrint) smallPrint.before(previews);
    else screen.append(previews);
  }

  if (smallPrint) {
    smallPrint.textContent = 'Choose your level, find the defects and share your score. Keyboard users can use the arrow keys and press Enter.';
  }
}

function upgradeQuizLanding(screen) {
  if (screen.dataset.premiumQuizLanding === 'true') return;
  screen.dataset.premiumQuizLanding = 'true';
  screen.classList.add('premium-quiz-home');

  const heading = screen.querySelector('h1');
  const lead = screen.querySelector('.lead');

  if (heading && !screen.querySelector('.quiz-landing-hook')) {
    heading.before(createElement('p', 'quiz-landing-hook', 'Part of Challenge the Inspector'));
  }

  if (lead) {
    lead.textContent = 'Put your practical knowledge of finishes, tolerances, timber-frame movement, windows and common defect consequences to the test.';

    if (!screen.querySelector('.quiz-authority-line')) {
      lead.after(createElement(
        'p',
        'quiz-authority-line',
        '20 referenced questions based on NHBC Standards and warranty-provider guidance.'
      ));
    }
  }
}

function applyLandingUpgrades() {
  document.querySelectorAll('.start-screen').forEach(upgradeSnagLanding);
  document.querySelectorAll('.quiz-start-screen').forEach(upgradeQuizLanding);
}

const observer = new MutationObserver(applyLandingUpgrades);

function startObserver() {
  applyLandingUpgrades();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startObserver, { once: true });
} else {
  startObserver();
}
