import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Crosshair,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import { rounds } from '../rounds.js';
import ShareResultButtons from './share.jsx';
import {
  BRAND_NAME,
  LEVELS,
  clamp,
  createFullChallenge,
  currentMonthlyChallenge,
  gameBestKey,
  readStoredScore,
  saveBestScore,
} from './config.js';

function scoreLabel(score, maximum) {
  return score > 0 ? `${score}/${maximum}` : 'No score yet';
}

function StartScreen({ levelId, onLevelChange, onStart }) {
  const monthly = useMemo(currentMonthlyChallenge, []);
  const selectedLevel = LEVELS[levelId];
  const fullBest = readStoredScore(gameBestKey('full', levelId));
  const monthlyBest = readStoredScore(gameBestKey('monthly', levelId));

  return (
    <section className="screen start-screen">
      <div className="brand-mark">SWSC</div>
      <p className="eyebrow">South Wales Snagging Co</p>
      <h1>{BRAND_NAME}</h1>
      <p className="challenge-subtitle">Spot the Defect</p>
      <p className="lead">Test your eye against real defects found during professional snagging inspections.</p>

      <div className="level-selector" aria-label="Choose your challenge level">
        <p><strong>Choose your level</strong></p>
        <div className="level-options">
          {Object.values(LEVELS).map((level) => (
            <button
              key={level.id}
              type="button"
              className={levelId === level.id ? 'level-option active' : 'level-option'}
              onClick={() => onLevelChange(level.id)}
              aria-pressed={levelId === level.id}
            >
              <strong>{level.label}</strong>
              <span>{level.timeLimit}s per defect</span>
            </button>
          ))}
        </div>
        <p className="level-description">{selectedLevel.description}</p>
        <p className="level-best-line">Personal best: {scoreLabel(fullBest, rounds.length * 100)}</p>
      </div>

      <div className="start-card">
        <div><strong>{rounds.length}</strong><span>real inspection photos</span></div>
        <div><strong>{selectedLevel.timeLimit}s</strong><span>per round</span></div>
        <div><strong>{rounds.length * 100}</strong><span>maximum score</span></div>
      </div>

      <button className="primary-button" onClick={() => onStart('full')}>
        Start Spot the Defect <ArrowRight size={19} />
      </button>

      <button className="monthly-challenge-button" onClick={() => onStart('monthly')}>
        <Sparkles size={19} />
        <span>
          <strong>{monthly.label} Challenge</strong>
          <small>
            {monthlyBest > 0
              ? `Your best: ${monthlyBest}/${monthly.rounds.length * 100}`
              : 'Five selected defects with one monthly score'}
          </small>
        </span>
        <ArrowRight size={19} />
      </button>

      <a className="text-link" href="?mode=quiz">
        Try the New Build Knowledge Quiz <BookOpen size={16} />
      </a>
      <p className="small-print">Tap the exact area where you think the defect is. Keyboard users can move the target with the arrow keys and press Enter.</p>
    </section>
  );
}

function RoundScreen({ round, index, total, score, level, onComplete, onNext }) {
  const imageRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(level.timeLimit);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [keyboardPoint, setKeyboardPoint] = useState(null);
  const answered = result !== null;

  const finishRound = useCallback((tap) => {
    if (answered) return;

    if (!tap) {
      const outcome = { roundId: round.id, tap: null, correct: false, points: 0, timedOut: true };
      setResult(outcome);
      onComplete(outcome);
      return;
    }

    const radius = Number(round.defect_radius || 15) * level.radiusMultiplier;
    const dx = tap.x - Number(round.defect_x);
    const dy = tap.y - Number(round.defect_y);
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const correct = distance <= radius;
    const points = correct ? Math.max(10, Math.round(100 * (1 - distance / radius))) : 0;
    const outcome = { roundId: round.id, tap, correct, points, timedOut: false };

    setAnswer(tap);
    setResult(outcome);
    onComplete(outcome);
  }, [answered, level.radiusMultiplier, onComplete, round]);

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

  const handleKeyDown = (event) => {
    if (answered) return;
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const point = keyboardPoint || { x: 50, y: 50 };
    if (event.key === 'Enter' || event.key === ' ') {
      finishRound(point);
      return;
    }

    const step = event.shiftKey ? 1 : 4;
    const nextPoint = { ...point };
    if (event.key === 'ArrowUp') nextPoint.y = clamp(point.y - step, 0, 100);
    if (event.key === 'ArrowDown') nextPoint.y = clamp(point.y + step, 0, 100);
    if (event.key === 'ArrowLeft') nextPoint.x = clamp(point.x - step, 0, 100);
    if (event.key === 'ArrowRight') nextPoint.x = clamp(point.x + step, 0, 100);
    setKeyboardPoint(nextPoint);
  };

  const status = result?.timedOut ? 'Time is up' : result?.correct ? 'Spot on' : 'Not quite';

  return (
    <section className="screen round-screen">
      <header className="round-header">
        <div>
          <p className="eyebrow">Round {index + 1} of {total} · {level.label}</p>
          <h2>{round.title}</h2>
        </div>
        <div className="score-box">
          <span>{answered ? 'Score' : 'Time'}</span>
          <strong className={timeLeft <= 5 && !answered ? 'urgent' : ''}>
            {answered ? score : `${timeLeft}s`}
          </strong>
        </div>
      </header>

      <div className="progress" aria-label={`Challenge progress, round ${index + 1} of ${total}`}>
        <span style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <div
        className="photo-frame interactive-photo-frame"
        role="button"
        tabIndex={answered ? -1 : 0}
        aria-disabled={answered}
        aria-label={`Spot the defect in ${round.title}. Use the arrow keys to move the target, then press Enter to submit.`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <img
          ref={imageRef}
          src={round.photo_url}
          alt={`Inspection photograph: ${round.title}`}
          draggable="false"
          referrerPolicy="no-referrer"
        />

        {!answered && <div className="tap-hint"><Crosshair size={15} /> Tap the defect</div>}

        {!answered && keyboardPoint && (
          <div
            className="marker keyboard-marker"
            style={{ left: `${keyboardPoint.x}%`, top: `${keyboardPoint.y}%` }}
            aria-hidden="true"
          >
            <Crosshair size={20} />
          </div>
        )}

        {answered && (
          <>
            <div
              className="correct-area"
              style={{
                left: `${round.defect_x}%`,
                top: `${round.defect_y}%`,
                width: `${Number(round.defect_radius || 15) * level.radiusMultiplier * 2}%`,
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
        <p className="instruction"><Clock size={16} /> Tap, click or use the keyboard before time runs out.</p>
      ) : (
        <div className="answer-panel" aria-live="polite">
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

function GameReview({ challengeRounds, attempts }) {
  const found = attempts.filter((attempt) => attempt.correct).length;
  const missed = challengeRounds.length - found;

  return (
    <section className="challenge-review" aria-labelledby="challenge-review-title">
      <div className="review-summary">
        <div><strong>{found}</strong><span>defects found</span></div>
        <div><strong>{missed}</strong><span>defects missed</span></div>
      </div>
      <h2 id="challenge-review-title">Review every defect</h2>
      <div className="review-list">
        {challengeRounds.map((round) => {
          const attempt = attempts.find((item) => item.roundId === round.id);
          const correct = Boolean(attempt?.correct);
          const resultLabel = correct ? 'Found' : attempt?.timedOut ? 'Timed out' : 'Missed';

          return (
            <details key={round.id} className={correct ? 'review-card review-card-found' : 'review-card review-card-missed'}>
              <summary>
                <span className={correct ? 'review-status review-found' : 'review-status review-missed'}>
                  {correct ? <Check size={16} /> : <X size={16} />} {resultLabel}
                </span>
                <strong>{round.title}</strong>
              </summary>
              <img src={round.photo_url} alt={`Inspection defect: ${round.title}`} referrerPolicy="no-referrer" loading="lazy" />
              <div>
                <h3>{round.defect_label}</h3>
                <p>{round.explanation}</p>
                <p className="review-points">Your score for this defect: <strong>{attempt?.points || 0}/100</strong></p>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function ResultsScreen({ score, challengeRounds, attempts, level, challengeType, onRestart }) {
  const maximum = challengeRounds.length * 100;
  const percent = maximum ? Math.round((score / maximum) * 100) : 0;
  const found = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = challengeRounds.length ? Math.round((found / challengeRounds.length) * 100) : 0;
  const rating = percent >= 80 ? 'Inspection Expert' : percent >= 50 ? 'Defect Spotter' : 'Homeowner in Training';
  const challengeLabel = challengeType === 'monthly' ? `${currentMonthlyChallenge().label} Challenge` : 'Full Challenge';
  const bestKey = gameBestKey(challengeType, level.id);
  const [previousBest] = useState(() => readStoredScore(bestKey));
  const personalBest = Math.max(previousBest, score);
  const isNewBest = score > previousBest;

  useEffect(() => {
    saveBestScore(bestKey, score);
  }, [bestKey, score]);

  return (
    <section className="screen results-screen enhanced-results-screen">
      <div className="trophy"><Trophy size={38} /></div>
      <p className="eyebrow">{BRAND_NAME} complete</p>
      <h1>{rating}</h1>
      <p className="quiz-result-category">{challengeLabel} · {level.label} level</p>
      <div className="final-score"><strong>{score}</strong><span>out of {maximum}</span></div>
      <p className="lead">You scored {percent}%. Real defects are often easier to miss than they first appear.</p>

      <div className="result-meta-grid">
        <div><strong>{found}/{challengeRounds.length}</strong><span>defects found</span></div>
        <div><strong>{accuracy}%</strong><span>accuracy</span></div>
        <div className={isNewBest ? 'new-best' : ''}>
          <strong>{personalBest}</strong>
          <span>{isNewBest ? 'new personal best' : 'personal best'}</span>
        </div>
      </div>

      <ShareResultButtons
        title={BRAND_NAME}
        rating={rating}
        scoreLine={`${score}/${maximum}`}
        subtitle={`${challengeLabel}, ${level.label} level`}
      />

      <GameReview challengeRounds={challengeRounds} attempts={attempts} />

      <a className="primary-button link-button" href="https://forms.gle/t1KYdKcqugDXDhxH8" target="_blank" rel="noreferrer">
        Check inspection availability <ArrowRight size={19} />
      </a>
      <button className="secondary-button" onClick={onRestart}>
        <RotateCcw size={17} /> Choose another challenge
      </button>
    </section>
  );
}

export default function GameApp() {
  const [phase, setPhase] = useState('start');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [levelId, setLevelId] = useState('siteManager');
  const [challengeType, setChallengeType] = useState('full');
  const [challengeRounds, setChallengeRounds] = useState(() => createFullChallenge());
  const [attempts, setAttempts] = useState([]);
  const level = LEVELS[levelId];

  const start = (type = challengeType) => {
    const nextRounds = type === 'monthly' ? currentMonthlyChallenge().rounds : createFullChallenge();
    setChallengeType(type);
    setChallengeRounds(nextRounds);
    setAttempts([]);
    setScore(0);
    setIndex(0);
    setPhase('playing');
  };

  const next = () => {
    if (index + 1 >= challengeRounds.length) setPhase('results');
    else setIndex((value) => value + 1);
  };

  const recordOutcome = (outcome) => {
    setAttempts((current) => [...current, outcome]);
    setScore((value) => value + outcome.points);
  };

  return (
    <main className="app-shell">
      {phase === 'start' && <StartScreen levelId={levelId} onLevelChange={setLevelId} onStart={start} />}
      {phase === 'playing' && challengeRounds[index] && (
        <RoundScreen
          key={`${challengeRounds[index].id}-${index}-${levelId}`}
          round={challengeRounds[index]}
          index={index}
          total={challengeRounds.length}
          score={score}
          level={level}
          onComplete={recordOutcome}
          onNext={next}
        />
      )}
      {phase === 'results' && (
        <ResultsScreen
          score={score}
          challengeRounds={challengeRounds}
          attempts={attempts}
          level={level}
          challengeType={challengeType}
          onRestart={() => setPhase('start')}
        />
      )}
    </main>
  );
}
