import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Clock, Crosshair, RotateCcw, Target, Trophy, X } from 'lucide-react';
import { rounds } from './rounds.js';

const TIME_LIMIT = 20;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function StartScreen({ onStart }) {
  return (
    <section className="screen start-screen">
      <div className="brand-mark">SWSC</div>
      <p className="eyebrow">South Wales Snagging Co</p>
      <h1>Spot the Snag</h1>
      <p className="lead">
        Test your eye against real defects found during professional snagging inspections.
      </p>
      <div className="start-card">
        <div><strong>{rounds.length}</strong><span>real inspection photos</span></div>
        <div><strong>{TIME_LIMIT}s</strong><span>per round</span></div>
        <div><strong>100</strong><span>points per round</span></div>
      </div>
      <button className="primary-button" onClick={onStart}>
        Start the challenge <ArrowRight size={19} />
      </button>
      <p className="small-print">Tap the exact area where you think the defect is.</p>
    </section>
  );
}

function RoundScreen({ round, index, score, onComplete, onNext }) {
  const imageRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const answered = result !== null;

  const finishRound = useCallback((tap) => {
    if (answered) return;

    if (!tap) {
      const outcome = { tap: null, correct: false, points: 0, timedOut: true };
      setResult(outcome);
      onComplete(outcome);
      return;
    }

    const radius = Number(round.defect_radius || 15);
    const dx = tap.x - Number(round.defect_x);
    const dy = tap.y - Number(round.defect_y);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const correct = distance <= radius;
    const points = correct ? Math.max(10, Math.round(100 * (1 - distance / radius))) : 0;
    const outcome = { tap, correct, points, timedOut: false };

    setAnswer(tap);
    setResult(outcome);
    onComplete(outcome);
  }, [answered, onComplete, round]);

  useEffect(() => {
    if (answered) return undefined;
    if (timeLeft <= 0) {
      finishRound(null);
      return undefined;
    }

    const timer = window.setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [answered, finishRound, timeLeft]);

  const handleClick = (event) => {
    if (answered || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    finishRound({
      x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    });
  };

  const status = result?.timedOut ? 'Time is up' : result?.correct ? 'Spot on' : 'Not quite';
  const displayedScore = score + (result?.points || 0);

  return (
    <section className="screen round-screen">
      <header className="round-header">
        <div>
          <p className="eyebrow">Round {index + 1} of {rounds.length}</p>
          <h2>{round.title}</h2>
        </div>
        <div className="score-box">
          <span>{answered ? 'Score' : 'Time'}</span>
          <strong className={timeLeft <= 5 && !answered ? 'urgent' : ''}>
            {answered ? displayedScore : `${timeLeft}s`}
          </strong>
        </div>
      </header>

      <div className="progress">
        <span style={{ width: `${((index + (answered ? 1 : 0)) / rounds.length) * 100}%` }} />
      </div>

      <div className="photo-frame">
        <img
          ref={imageRef}
          src={round.photo_url}
          alt={round.title}
          onClick={handleClick}
          draggable="false"
          referrerPolicy="no-referrer"
        />

        {!answered && <div className="tap-hint"><Crosshair size={15} /> Tap the snag</div>}

        {answered && (
          <>
            <div
              className="correct-area"
              style={{
                left: `${round.defect_x}%`,
                top: `${round.defect_y}%`,
                width: `${Number(round.defect_radius || 15) * 2}%`,
              }}
            />
            <div
              className="marker correct-marker"
              style={{ left: `${round.defect_x}%`, top: `${round.defect_y}%` }}
            >
              <Target size={20} />
            </div>
          </>
        )}

        {answer && (
          <div
            className={`marker player-marker ${result?.correct ? 'player-correct' : 'player-wrong'}`}
            style={{ left: `${answer.x}%`, top: `${answer.y}%` }}
          >
            {result?.correct ? <Check size={18} /> : <X size={18} />}
          </div>
        )}
      </div>

      {!answered ? (
        <p className="instruction"><Clock size={16} /> Tap the photograph before time runs out.</p>
      ) : (
        <div className="answer-panel">
          <div className={`result-banner ${result.correct ? 'success' : 'failure'}`}>
            <span>{result.correct ? <Check size={18} /> : result.timedOut ? <Clock size={18} /> : <X size={18} />}</span>
            <strong>{status}</strong>
            <b>+{result.points}</b>
          </div>
          <div className="explanation">
            <h3>{round.defect_label}</h3>
            <p>{round.explanation}</p>
          </div>
          <button className="primary-button" onClick={onNext}>
            {index + 1 === rounds.length ? 'See results' : 'Next round'} <ArrowRight size={19} />
          </button>
        </div>
      )}
    </section>
  );
}

function ResultsScreen({ score, onRestart }) {
  const maximum = rounds.length * 100;
  const percent = maximum ? Math.round((score / maximum) * 100) : 0;
  const rating = percent >= 80 ? 'Inspection Expert' : percent >= 50 ? 'Snag Spotter' : 'Homeowner in Training';

  return (
    <section className="screen results-screen">
      <div className="trophy"><Trophy size={38} /></div>
      <p className="eyebrow">Challenge complete</p>
      <h1>{rating}</h1>
      <div className="final-score"><strong>{score}</strong><span>out of {maximum}</span></div>
      <p className="lead">You scored {percent}%. Real defects are often easier to miss than they first appear.</p>
      <a
        className="primary-button link-button"
        href="https://www.southwalessnagging.co.uk"
        target="_blank"
        rel="noreferrer"
      >
        Book a professional inspection <ArrowRight size={19} />
      </a>
      <button className="secondary-button" onClick={onRestart}>
        <RotateCcw size={17} /> Play again
      </button>
    </section>
  );
}

export default function App() {
  const [phase, setPhase] = useState('start');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const start = () => {
    setScore(0);
    setIndex(0);
    setPhase('playing');
  };

  const next = () => {
    if (index + 1 >= rounds.length) setPhase('results');
    else setIndex((value) => value + 1);
  };

  return (
    <main className="app-shell">
      {phase === 'start' && <StartScreen onStart={start} />}
      {phase === 'playing' && (
        <RoundScreen
          key={`${rounds[index].id}-${index}`}
          round={rounds[index]}
          index={index}
          score={score}
          onComplete={(outcome) => setScore((value) => value + outcome.points)}
          onNext={next}
        />
      )}
      {phase === 'results' && <ResultsScreen score={score} onRestart={start} />}
    </main>
  );
}
