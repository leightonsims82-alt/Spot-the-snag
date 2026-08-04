import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronLeft,
  ExternalLink,
  Home,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Trophy,
  X,
} from 'lucide-react';
import { quizCategories } from '../questions.js';
import ShareResultButtons from './share.jsx';
import { BRAND_NAME, QUIZ_REVIEWED, createQuizSet, whyThisMatters } from './config.js';

function categoryIcon(categoryId, size = 21) {
  if (categoryId === 'nhqc') return <ShieldCheck size={size} />;
  if (categoryId === 'nhbc') return <Building2 size={size} />;
  if (categoryId === 'building-regulations') return <Landmark size={size} />;
  return <Home size={size} />;
}

function QuizStartScreen({ onStart }) {
  return (
    <section className="screen quiz-start-screen">
      <div className="brand-mark">SWSC</div>
      <p className="eyebrow">{BRAND_NAME}</p>
      <h1>New Build Knowledge Quiz</h1>
      <p className="lead">How well do you know the standards, tolerances and details that shape a new home?</p>

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
        <ChevronLeft size={16} /> Back to {BRAND_NAME}
      </a>
      <p className="small-print">Educational quiz based on named official and warranty-provider sources. Last reviewed {QUIZ_REVIEWED}. It is not legal or technical advice.</p>
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
    onAnswer({
      questionId: question.id,
      selectedIndex: answerIndex,
      correct: answerIndex === question.correctIndex,
    });
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
          <strong>{score}</strong>
        </div>
      </header>

      <div className="progress" aria-label={`Quiz progress, question ${index + 1} of ${total}`}>
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
              aria-label={`Answer ${String.fromCharCode(65 + answerIndex)}: ${option}`}
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
        <div className="quiz-feedback" aria-live="polite">
          <div className={`result-banner ${correct ? 'success' : 'failure'}`}>
            <span>{correct ? <Check size={18} /> : <X size={18} />}</span>
            <strong>{correct ? 'Correct' : 'Not quite'}</strong>
            <b>{correct ? '+1' : '+0'}</b>
          </div>
          <div className="explanation source-explanation enhanced-source-explanation">
            <p>{question.explanation}</p>
            <div className="why-it-matters">
              <strong>Why this matters</strong>
              <p>{whyThisMatters(question.category)}</p>
            </div>
            <a href={question.sourceUrl} target="_blank" rel="noreferrer">
              {question.sourceName} <ExternalLink size={14} />
            </a>
            <small>Source basis reviewed for this quiz: {QUIZ_REVIEWED}</small>
          </div>
          <button className="primary-button" onClick={onNext}>
            {index + 1 === total ? 'See results' : 'Next question'} <ArrowRight size={19} />
          </button>
        </div>
      )}
    </section>
  );
}

function QuizReview({ questions, attempts }) {
  const missed = questions.filter((question) => !attempts.find((attempt) => attempt.questionId === question.id)?.correct);

  return (
    <section className="challenge-review quiz-review" aria-labelledby="quiz-review-title">
      <h2 id="quiz-review-title">Review missed questions</h2>
      {missed.length === 0 ? (
        <p className="review-perfect">You answered every question correctly. Excellent work.</p>
      ) : (
        <div className="review-list">
          {missed.map((question) => (
            <details key={question.id} className="review-card quiz-review-card">
              <summary>
                <span className="review-status review-missed"><X size={16} /> Review</span>
                <strong>{question.question}</strong>
              </summary>
              <div>
                <p><strong>Correct answer:</strong> {question.options[question.correctIndex]}</p>
                <p>{question.explanation}</p>
                <a href={question.sourceUrl} target="_blank" rel="noreferrer">
                  {question.sourceName} <ExternalLink size={14} />
                </a>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}

function QuizResultsScreen({ score, total, categoryId, questions, attempts, onRestart, onChooseAgain }) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const rating = percent >= 90 ? 'New Build Expert' : percent >= 70 ? 'Standards Savvy' : percent >= 50 ? 'Informed Homeowner' : 'Knowledge Under Construction';
  const category = quizCategories.find((item) => item.id === categoryId);
  const categoryLabel = categoryId === 'mixed' ? 'Mixed Challenge' : category?.title;

  return (
    <section className="screen results-screen quiz-results-screen enhanced-results-screen">
      <div className="trophy"><Trophy size={38} /></div>
      <p className="eyebrow">{BRAND_NAME} quiz complete</p>
      <h1>{rating}</h1>
      <p className="quiz-result-category">{categoryLabel}</p>
      <div className="final-score"><strong>{score}/{total}</strong><span>{percent}% correct</span></div>
      <p className="lead">Knowing the standards helps. Knowing how to identify and record visible defects throughout the finished home is where a professional inspection makes the difference.</p>

      <ShareResultButtons
        title={`${BRAND_NAME} Quiz`}
        rating={rating}
        scoreLine={`${score}/${total}`}
        subtitle={categoryLabel || 'New Build Knowledge Quiz'}
      />

      <QuizReview questions={questions} attempts={attempts} />

      <a className="primary-button link-button" href="https://forms.gle/t1KYdKcqugDXDhxH8" target="_blank" rel="noreferrer">
        Check inspection availability <ArrowRight size={19} />
      </a>
      <button className="secondary-button" onClick={onRestart}>
        <RotateCcw size={17} /> Try this quiz again
      </button>
      <button className="text-button" onClick={onChooseAgain}>Choose another category</button>
    </section>
  );
}

export default function QuizApp() {
  const [phase, setPhase] = useState('start');
  const [categoryId, setCategoryId] = useState('mixed');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);

  const start = (nextCategoryId) => {
    setCategoryId(nextCategoryId);
    setQuestions(createQuizSet(nextCategoryId));
    setIndex(0);
    setScore(0);
    setAttempts([]);
    setPhase('playing');
  };

  const next = () => {
    if (index + 1 >= questions.length) setPhase('results');
    else setIndex((value) => value + 1);
  };

  const recordAnswer = (attempt) => {
    setAttempts((current) => [...current, attempt]);
    if (attempt.correct) setScore((value) => value + 1);
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
          onAnswer={recordAnswer}
          onNext={next}
        />
      )}
      {phase === 'results' && (
        <QuizResultsScreen
          score={score}
          total={questions.length}
          categoryId={categoryId}
          questions={questions}
          attempts={attempts}
          onRestart={() => start(categoryId)}
          onChooseAgain={() => setPhase('start')}
        />
      )}
    </main>
  );
}
