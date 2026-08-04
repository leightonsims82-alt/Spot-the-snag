function getDriveFileId(url = '') {
  try {
    const parsed = new URL(url, window.location.href);
    const queryId = parsed.searchParams.get('id');
    if (queryId) return queryId;

    const directMatch = parsed.pathname.match(/\/d\/([^/=]+)/);
    if (directMatch) return directMatch[1];
  } catch {
    return null;
  }

  return null;
}

function imageCandidates(source) {
  const fileId = getDriveFileId(source);
  if (!fileId) return [source];

  return [
    `https://lh3.googleusercontent.com/d/${fileId}=w1600`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`,
  ];
}

function prepareImage(image) {
  if (!image || image.dataset.mobileImageReady === 'true') return;

  const source = image.currentSrc || image.getAttribute('src') || '';
  const candidates = imageCandidates(source);
  if (!candidates.length) return;

  image.dataset.mobileImageReady = 'true';
  image.dataset.sourceIndex = '0';
  image.classList.add('swsc-image-loading');
  image.loading = image.closest('.photo-frame') ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.referrerPolicy = 'no-referrer';

  const showLoaded = () => {
    image.classList.remove('swsc-image-loading', 'swsc-image-failed');
    image.classList.add('swsc-image-loaded');
  };

  const tryNext = () => {
    const nextIndex = Number(image.dataset.sourceIndex || 0) + 1;

    if (nextIndex >= candidates.length) {
      image.classList.remove('swsc-image-loading');
      image.classList.add('swsc-image-failed');
      image.closest('.photo-frame, .defect-preview-card, .review-card')?.classList.add('swsc-frame-failed');
      return;
    }

    image.dataset.sourceIndex = String(nextIndex);
    image.src = candidates[nextIndex];
  };

  image.addEventListener('load', showLoaded);
  image.addEventListener('error', tryNext);

  if (image.complete && image.naturalWidth > 0) {
    showLoaded();
  } else if (image.src !== candidates[0]) {
    image.src = candidates[0];
  }
}

function prepareAllImages() {
  document.querySelectorAll('.photo-frame img, .defect-preview-card img, .review-card img').forEach(prepareImage);
}

const observer = new MutationObserver(prepareAllImages);

function startImageLoader() {
  prepareAllImages();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startImageLoader, { once: true });
} else {
  startImageLoader();
}
