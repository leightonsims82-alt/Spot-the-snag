import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  Clock,
  Crosshair,
  ExternalLink,
  Home,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import { rounds } from './rounds.js';
import { quizCategories, quizQuestions } from './questions.js';

const TIME_LIMIT = 20;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function categoryIcon(categoryId, size = 21) {
  if (categoryId === 'nhqc') return <ShieldCheck size={size} />;
  if (categoryId === 'nhbc') return <Building2 size={size} />;
  if (categoryId === 'building-regulations') return <Landmark size={size} />;
  return <Home size={size} />;
}

function createQuizSet(categoryId) {
  if (categoryId !== 'mixed') {
    return shuffle(quizQuestions.filter((question) => question.category === categoryId));
  }

  const guaranteed = quizCategories.flatMap((category) =>
    shuffle(quizQuestions.filter((question) => question.category === category.id)).slice(0, 2)
  );
  const guaranteedIds = new Set(guaranteed.map((question) => question.id));
  const extras = shuffle(quizQuestions.filter((question) => !guaranteedIds.has(question.id))).slice(0, 2);
  return shuffle([...guaranteed, ...extras]);
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
      <a className="text-link" href="?mode=quiz">
        Try the New Build Knowledge Quiz <BookOpen size={16} />
      </a>
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

function SnagApp() {
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

function QuizStartScreen({ onStart }) {
  return (
    <section className="screen quiz-start-screen">
      <div className="brand-mark">SWSC</div>
      <p className="eyebrow">South Wales Snagging Co</p>
      <h1>New Build Knowledge Quiz</h1>
      <p className="lead">How well do you know your rights, standards and the rules that shape a new home?</p>

      <button className="mixed-quiz-card" onClick={() => onStart('mixed')}>
        <span className="mixed-icon"><BookOpen size={25} /></span>
        <span>
          <strong>Mixed Challenge</strong>
          <small>10 questions across all four categories</small>
        </span>
        <ArrowRight size={20} />
      </button>

      <div className="category-grid">
        {quizCategories.map((category) => (
          <button key={category.id} className="category-card" onClick={() => onStart(category.id)}>
            <span className="category-icon">{categoryIcon(category.id)}</span>
            <strong>{category.title}</strong>
            <small>{category.description}</small>
            <b>5 questions</b>
          </button>
        ))}
      </div>

      <a className="text-link" href="?">
        <ChevronLeft size={16} /> Back to Spot the Snag
      </a>
      <p className="small-print">Educational quiz based on current official sources. It is not legal or technical advice.</p>
    </section>
  );
}

function QuizQuestionScreen({ question, index, total, score, onAnswer, onNext }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const answered = selectedIndex !== null;
  const correct = selectedIndex === question.correctIndex;
  const category = quizCategories.find((item) => item.id === question.category);

  const selectAnswer = (answerIndex) => {
    if (answered) return;
    setSelectedIndex(answerIndex);
    onAnswer(answerIndex === question.correctIndex);
  };

  return (
    <section className="screen quiz-question-screen">
      <header className="round-header quiz-header">
        <div>
          <p className="eyebrow">Question {index + 1} of {total}</p>
          <div className="category-pill">{categoryIcon(question.category, 16)} {category?.title}</div>
        </div>
        <div className="score-box">
          <span>Score</span>
          <strong>{score}{answered && correct ? ' +1' : ''}</strong>
        </div>
      </header>

      <div className="progress">
        <span style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <div className="question-card">
        <h2>{question.question}</h2>
      </div>

      <div className="answer-options">
        {question.options.map((option, answerIndex) => {
          let stateClass = '';
          if (answered && answerIndex === question.correctIndex) stateClass = 'correct-answer';
          else if (answered && answerIndex === selectedIndex) stateClass = 'wrong-answer';

          return (
            <button
              key={option}
              className={`answer-option ${stateClass}`}
              onClick={() => selectAnswer(answerIndex)}
              disabled={answered}
            >
              <span>{String.fromCharCode(65 + answerIndex)}</span>
              <strong>{option}</strong>
              {answered && answerIndex === question.correctIndex && <Check size={19} />}
              {answered && answerIndex === selectedIndex && answerIndex !== question.correctIndex && <X size={19} />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="quiz-feedback">
          <div className={`result-banner ${correct ? 'success' : 'failure'}`}>
            <span>{correct ? <Check size={18} /> : <X size={18} />}</span>
            <strong>{correct ? 'Correct' : 'Not quite'}</strong>
            <b>{correct ? '+1' : '+0'}</b>
          </div>
          <div className="explanation source-explanation">
            <p>{question.explanation}</p>
            <a href={question.sourceUrl} target="_blank" rel="noreferrer">
              {question.sourceName} <ExternalLink size={14} />
            </a>
          </div>
          <button className="primary-button" onClick={onNext}>
            {index + 1 === total ? 'See results' : 'Next question'} <ArrowRight size={19} />
          </button>
        </div>
      )}
    </section>
  );
}

function QuizResultsScreen({ score, total, categoryId, onRestart, onChooseAgain }) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const rating = percent >= 90 ? 'New Build Expert' : percent >= 70 ? 'Standards Savvy' : percent >= 50 ? 'Informed Homeowner' : 'Knowledge Under Construction';
  const category = quizCategories.find((item) => item.id === categoryId);

  return (
    <section className="screen results-screen quiz-results-screen">
      <div className="trophy"><Trophy size={38} /></div>
      <p className="eyebrow">Quiz complete</p>
      <h1>{rating}</h1>
      <p className="quiz-result-category">{categoryId === 'mixed' ? 'Mixed Challenge' : category?.title}</p>
      <div className="final-score"><strong>{score}/{total}</strong><span>{percent}% correct</span></div>
      <p className="lead">Knowing the rules is useful. Knowing how to identify defects in the finished home is where a professional inspection makes the difference.</p>
      <a
        className="primary-button link-button"
        href="https://www.southwalessnagging.co.uk"
        target="_blank"
        rel="noreferrer"
      >
        Book a professional inspection <ArrowRight size={19} />
      </a>
      <button className="secondary-button" onClick={onRestart}>
        <RotateCcw size={17} /> Try this quiz again
      </button>
      <button className="text-button" onClick={onChooseAgain}>Choose another category</button>
    </section>
  );
}

function QuizApp() {
  const [phase, setPhase] = useState('start');
  const [categoryId, setCategoryId] = useState('mixed');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const start = (nextCategoryId) => {
    setCategoryId(nextCategoryId);
    setQuestions(createQuizSet(nextCategoryId));
    setIndex(0);
    setScore(0);
    setPhase('playing');
  };

  const next = () => {
    if (index + 1 >= questions.length) setPhase('results');
    else setIndex((value) => value + 1);
  };

  return (
    <main className="app-shell quiz-shell">
      {phase === 'start' && <QuizStartScreen onStart={start} />}
      {phase === 'playing' && questions[index] && (
        <QuizQuestionScreen
          key={`${questions[index].id}-${index}`}
          question={questions[index]}
          index={index}
          total={questions.length}
          score={score}
          onAnswer={(isCorrect) => {
            if (isCorrect) setScore((value) => value + 1);
          }}
          onNext={next}
        />
      )}
      {phase === 'results' && (
        <QuizResultsScreen
          score={score}
          total={questions.length}
          categoryId={categoryId}
          onRestart={() => start(categoryId)}
          onChooseAgain={() => setPhase('start')}
        />
      )}
    </main>
  );
}

export default function App() {
  const mode = new URLSearchParams(window.location.search).get('mode');
  return mode === 'quiz' ? <QuizApp /> : <SnagApp />;
}
