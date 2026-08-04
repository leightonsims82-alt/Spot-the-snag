import React from 'react';
import ReactDOM from 'react-dom/client';
import ChallengeApp from './ChallengeApp.jsx';
import './styles.css';
import './quiz.css';
import './logo.css';
import './premium.css';
import './landing-upgrade.css';
import './marketing.css';
import './image-loader.css';
import './challenge-upgrades.css';
import './landing-upgrade.js';
import './marketing.js';
import './image-loader.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChallengeApp />
  </React.StrictMode>,
);
