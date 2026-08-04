import React, { useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';

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
  context.arc(canvas.width / 2, 190, 100, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#07111f';
  context.font = '700 46px Arial';
  context.textAlign = 'center';
  context.fillText('SWSC', canvas.width / 2, 208);

  context.fillStyle = '#f7f4eb';
  context.font = '700 66px Arial';
  context.fillText(title, canvas.width / 2, 370);
  context.fillStyle = '#efd085';
  context.font = '700 76px Arial';
  context.fillText(rating, canvas.width / 2, 510);
  context.fillStyle = '#f7f4eb';
  context.font = '700 118px Arial';
  context.fillText(scoreLine, canvas.width / 2, 720);

  context.fillStyle = '#bac3cd';
  context.font = '40px Arial';
  const words = subtitle.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > 850) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  lines.forEach((text, index) => context.fillText(text, canvas.width / 2, 860 + index * 55));

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
  const resultUrl = 'https://www.southwalessnagging.co.uk/spot-the-snag';

  const share = async () => {
    try {
      const blob = await createResultCardBlob({ title, rating, scoreLine, subtitle });
      const file = blob ? new File([blob], 'challenge-the-inspector-result.png', { type: 'image/png' }) : null;
      if (navigator.share) {
        const payload = { title, text: shareText, url: resultUrl };
        if (file && navigator.canShare?.({ files: [file] })) payload.files = [file];
        await navigator.share(payload);
        setMessage('Result shared.');
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${resultUrl}`);
      setMessage('Result copied to your clipboard.');
    } catch (error) {
      if (error?.name !== 'AbortError') setMessage('Sharing was not available on this device.');
    }
  };

  const download = async () => {
    const blob = await createResultCardBlob({ title, rating, scoreLine, subtitle });
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'challenge-the-inspector-result.png';
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('Result card downloaded.');
  };

  const copy = async () => {
    await navigator.clipboard.writeText(`${shareText} ${resultUrl}`);
    setMessage('Result copied to your clipboard.');
  };

  return (
    <div className="share-result-block">
      <p><strong>Challenge someone else</strong> and see whether they can beat your score.</p>
      <div className="share-result-actions">
        <button className="secondary-button" onClick={share}><Share2 size={17} /> Share result</button>
        <button className="secondary-button" onClick={download}><Download size={17} /> Result card</button>
        <button className="text-button copy-result-button" onClick={copy}><Copy size={16} /> Copy score</button>
      </div>
      {message && <p className="share-message" aria-live="polite">{message}</p>}
    </div>
  );
}
