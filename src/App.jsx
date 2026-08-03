import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@base44/sdk';
import { ArrowRight, Check, Clock, Crosshair, RotateCcw, Target, Trophy, X } from 'lucide-react';

const APP_ID = '6a6f961e623a5566b54e62e6';
const TIME_LIMIT = 20;
const base44 = createClient({ appId: APP_ID });

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function StartScreen({ count, onStart }) {
  return (
    <section className="screen start-screen">
      <div className="brand-mark">SWSC</div>
      <p className="eyebrow">South Wales Snagging Co</p>
      <h1>Spot the Snag</h1>
      <p className="lead">
        Test your eye against real defects found during professional snagging inspections.
      </p>
      <div className="start-card">
        <div><strong>{count}</strong><span>real inspection photos</span></div>
        <div><strong>{TIME_LIMIT}s</strong><span>per round</span></div>
        <div><strong>100</strong><span>points available</span></div>
      </div>
      <button className="primary-button" onClick={onStart}>
        Start the challenge <ArrowRight size={19} />
      </button>
      <p className="small-print">Tap the exact area where you think the defect is.</p>
    </section>
  );
}

function RoundScreen({ round, index, total, score, onComplete, onNext }) {
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

  return (
    <section className="screen round-screen">
      <header className="round-header">
        <div>
          <p className="eyebrow">Round {index + 1} of {total}</p>
          <h2>{round.title}</h2>
        </div>
        <div className="score-box">
          <span>{answered ? 'Score' : 'Time'}</span>
          <strong className={timeLeft <= 5 && !answered ? 'urgent' : ''}>
            {answered ? score : `${timeLeft}s`}
          </strong>
        </div>
      </header>

      <div className="progress"><span style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} /></div>

      <div className="photo-frame">
        <img
          ref={imageRef}
          src={round.photo_url}
          alt={round.title}
          onClick={handleClick}
          draggable="false"
          referrerPolicy="no-referrer"
        />

        {!answered && (
          <div className="tap-hint"><Crosshair size={15} /> Tap the snag</div>
        )}

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
            <div className="marker correct-marker" style={{ left: `${round.defect_x}%`, top: `${round.defect_y}%` }}>
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
            {index + 1 === total ? 'See results' : 'Next round'} <ArrowRight size={19} />
          </button>
        </div>
      )}
    </section>
  );
}

function ResultsScreen({ score, total, onRestart }) {
  const maximum = total * 100;
  const percent = maximum ? Math.round((score / maximum) * 100) : 0;
  const rating = percent >= 80 ? 'Inspection Expert' : percent >= 50 ? 'Snag Spotter' : 'Homeowner in Training';

  return (
    <section className="screen results-screen">
      <div className="trophy"><Trophy size={38} /></div>
      <p className="eyebrow">Challenge complete</p>
      <h1>{rating}</h1>
      <div className="final-score"><strong>{score}</strong><span>out of {maximum}</span></div>
      <p className="lead">You scored {percent}%. Real defects are often easier to miss than they first appear.</p>
      <a className="primary-button link-button" href="https://www.southwalessnagging.co.uk" target="_blank" rel="noreferrer">
        Book a professional inspection <ArrowRight size={19} />
      </a>
      <button className="secondary-button" onClick={onRestart}><RotateCcw size={17} /> Play again</button>
    </section>
  );
}

export default function App() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('start');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    base44.entities.SnagRound
      .filter({ active: true, location_confirmed: true }, 'round_order', 50)
      .then((items) => {
        setRounds(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('The game could not load its rounds. Please try again shortly.');
        setLoading(false);
      });
  }, []);

  const currentRound = rounds[index];
  const roundKey = useMemo(() => currentRound ? `${currentRound.id}-${index}` : 'none', [currentRound, index]);

  const start = () => {
    setScore(0);
    setIndex(0);
    setPhase('playing');
  };

  const next = () => {
    if (index + 1 >= rounds.length) setPhase('results');
    else setIndex((value) => value + 1);
  };

  if (loading) return <main className="app-shell"><div className="loading-spinner" /><p>Loading Spot the Snag…</p></main>;
  if (error) return <main className="app-shell"><section className="screen empty-screen"><h1>Unable to load</h1><p>{error}</p></section></main>;
  if (!rounds.length) {
    return (
      <main className="app-shell">
        <section className="screen empty-screen">
          <div className="brand-mark">SWSC</div>
          <h1>Spot the Snag is being prepared</h1>
          <p>The inspection photographs are loaded. The correct defect locations are being confirmed before the game goes live.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      {phase === 'start' && <StartScreen count={rounds.length} onStart={start} />}
      {phase === 'playing' && currentRound && (
        <RoundScreen
          key={roundKey}
          round={currentRound}
          index={index}
          total={rounds.length}
          score={score}
          onComplete={(outcome) => setScore((value) => value + outcome.points)}
          onNext={next}
        />
      )}
      {phase === 'results' && <ResultsScreen score={score} total={rounds.length} onRestart={start} />}
    </main>
  );
}
