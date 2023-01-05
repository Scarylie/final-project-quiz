/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { quiz } from 'reducers/quiz';

// WHAT NEEDS TO BE DONE IN THIS COMPONENT
// This components is copied from repository
// https://github.com/miadahlgren/project-redux-quiz
// So it needs to be updated to match out project.
// Remove these comments when work is done

export const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answers = useSelector((store) => store.quiz.answers);
  const nrOfCorrect = useSelector((store) =>
    store.quiz.answers.filter((answer) => answer.isCorrect)
  );
  console.log(nrOfCorrect);
  const nrOfQuestion = useSelector((store) => store.quiz.questions);

  const handleRestart = () => {
    dispatch(quiz.actions.restart());
    navigate('/');
  };

  return (
    <>
      <div className="credits-wrapper">
        {answers.map((answer) => (
          <div className="table-div" key={answer.question.id}>
            <tr>
              <td>
                <p className="question-p">Question {answer.question.id}</p>
              </td>
              <td>
                <span className="isCorrect-span">
                  {' '}
                  {answer.isCorrect ? ' ✅' : ' ❌'}
                </span>
              </td>
            </tr>
          </div>
        ))}
      </div>

      <h2>
        {' '}
        {`${nrOfCorrect.length}`}/{nrOfQuestion.length} correct{' '}
      </h2>

      <button onClick={handleRestart} type="button">
        <img
          src={restartBtn}
          width="50"
          height="50"
          viewBox="0 0 24 24"
          alt="next question"
          className=""
        />
      </button>
    </>
  );
};
