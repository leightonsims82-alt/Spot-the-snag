import React, { useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';

const RESULT_URL = 'https://www.southwalessnagging.co.uk/spot-the-snag';

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  lines.slice(0, maxLines).forEach((value, index) => {
    context.fillText(value, x, y + index * lineHeight);
  });

  return y + Math.min(lines.length, maxLines) * lineHeight;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

async function createResultCardBlob({ title, rating, scoreLine, subtitle }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#0d2035');
  gradient.addColorStop(1, '#030912');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = '#d6ae53';
  context.lineWidth = 8;
  context.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);

  context.fillStyle = '#d6ae53';
  context.beginPath();
  context.arc(canvas.width / 2, 175, 94, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#07111f';
  context.font = '700 44px Arial';
  context.textAlign = 'center';
  context.fillText('SWSC', canvas.width / 2, 192);

  context.fillStyle = '#f7f4eb';
  context.font = '700 60px Arial';
  drawWrappedText(context, title, canvas.width / 2, 345, 900, 66, 2);

  context.fillStyle = '#efd085';
  context.font = '700 68px Arial';
  drawWrappedText(context, rating, canvas.width / 2, 500, 900, 74, 2);

  context.fillStyle = '#f7f4eb';
  context.font = '700 118px Arial';
  context.fillText(scoreLine, canvas.width / 2, 760);

  context.fillStyle = '#bac3cd';
  context.font = '38px Arial';
  drawWrappedText(context, subtitle, canvas.width / 2, 875, 850, 52, 3);

  context.fillStyle = '#d6ae53';
  context.fillRect(150, 1060, 780, 4);
  context.fillStyle = '#f7f4eb';
  context.font = '700 42px Arial';
  context.fillText('Can you beat my score?', canvas.width / 2, 1150);
  context.fillStyle = '#efd085';
  context.font = '34px Arial';
  context.fillText('southwalessnagging.co.uk/spot-the-snag', canvas.width / 2, 1240);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export default function ShareResultButtons({ title, rating, scoreLine, subtitle }) {
  const [message, setMessage] = useState('');
  const shareText = `${title}: I scored ${scoreLine} and earned ${rating}. Can you beat me?`;
  const fullShareText = `${shareText} ${RESULT_URL}`;

  const share = async () => {
    try {
      const blob = await createResultCardBlob({ title, rating, scoreLine, subtitle });
      const file = blob ? new File([blob], 'challenge-the-inspector-result.png', { type: 'image/png' }) : null;

      if (navigator.share) {
        const payload = { title, text: shareText, url: RESULT_URL };
        if (file && navigator.canShare?.({ files: [file] })) payload.files = [file];
        await navigator.share(payload);
        setMessage('Result shared.');
        return;
      }

      await copyText(fullShareText);
      setMessage('Result copied. Paste it into your social post or message.');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setMessage('Sharing was not available. Use Copy score instead.');
      }
    }
  };

  const download = async () => {
    try {
      const blob = await createResultCardBlob({ title, rating, scoreLine, subtitle });
      if (!blob) throw new Error('Result card unavailable');
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'challenge-the-inspector-result.png';
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage('Result card downloaded.');
    } catch {
      setMessage('The result card could not be downloaded on this device.');
    }
  };

  const copy = async () => {
    try {
      await copyText(fullShareText);
      setMessage('Result copied. Paste it wherever you would like to share it.');
    } catch {
      setMessage('Copying was not available on this device.');
    }
  };

  return (
    <div className="share-result-block">
      <p><strong>Challenge someone else</strong> and see whether they can beat your score.</p>
      <div className="share-result-actions">
        <button type="button" className="secondary-button" onClick={share}><Share2 size={17} /> Share result</button>
        <button type="button" className="secondary-button" onClick={download}><Download size={17} /> Result card</button>
        <button type="button" className="text-button copy-result-button" onClick={copy}><Copy size={16} /> Copy score</button>
      </div>
      {message && <p className="share-message" aria-live="polite">{message}</p>}
    </div>
  );
}
