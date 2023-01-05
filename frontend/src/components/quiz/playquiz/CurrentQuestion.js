import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { quiz } from 'reducers/quiz';
import { Results } from './Results';

// WHAT NEEDS TO BE DONE IN THIS COMPONENT
// This components is copied from repository
// https://github.com/miadahlgren/project-redux-quiz
// So it needs to be updated to match out project.
// Remove these comments when work is done

export const CurrentQuestion = () => {
  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex] // currentQuestionIndex is not in backend
  );
  const answer = useSelector(
    (state) => state.quiz.answers.find((a) => a.questionId === question.id) // not sure where "question" is from in the other project
  );
  const wholeStore = useSelector((store) => store);
  const isQuizOver = useSelector((state) => state.quiz.quizOver);

  console.log(wholeStore);
  console.log(question);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch(quiz.actions.restart());
    navigate('/'); // where do we want to navigate to? - scoreboard?
  };

  if (!question) {
    return <h1>Question not found</h1>;
  }

  if (isQuizOver === true) {
    return <Results />;
  }

  const onAnswerSubmit = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId, answerIndex }));
  };
  return (
    <>
      <img src={question.backdropImg} alt={`Question${question.id}`} />
      <h2>{question.questionText}</h2>{' '}
      {/* questionText is the actual question from the other project */}
      {question.options.map((option, index) => {
        return (
          <button
            onClick={() => onAnswerSubmit(question.id, index)}
            className={
              !answer
                ? 'answerbutton'
                : index === question.correctAnswerIndex
                ? 'correct'
                : 'wrong'
            }
            key={option}
            disabled={answer}
            type="button">
            {option}
            <Feedback
              className={
                !answer
                  ? 'noAnswerFeedback'
                  : index === question.correctAnswerIndex
                  ? 'correctFeedback'
                  : 'wrongFeedback'
              }
            />
          </button>
        );
      })}
      <button onClick={handleRestart} type="button">
        <img
          src={restartBtn}
          width="40"
          height="40"
          alt="next question"
          className=""
        />
      </button>
      <button
        onClick={() => dispatch(quiz.actions.goToNextQuestion())}
        type="button"
        disabled={!answer}
        className="hidden">
        <img
          src={nextBtn}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="black"
          alt="next question"
        />
      </button>
    </>
  );
};
