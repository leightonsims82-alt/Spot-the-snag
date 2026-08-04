import React from 'react';
import GameApp from './challenge/game.jsx';
import QuizApp from './challenge/quiz.jsx';

export default function ChallengeApp() {
  const mode = new URLSearchParams(window.location.search).get('mode');
  return mode === 'quiz' ? <QuizApp /> : <GameApp />;
}
