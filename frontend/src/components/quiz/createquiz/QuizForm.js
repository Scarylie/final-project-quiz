import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz';
import QuizFormQuestions from './QuizFormQuestions';

const QuizForm = ({ newTitle, onNewTitleChange, onFormSubmit }) => {
  return (
    <>
      <div>
        <form onSubmit={onFormSubmit}>
          <input
            className="quiz-title"
            type="text"
            value={newTitle}
            onChange={onNewTitleChange}
            placeholder="Add Quiz Title"
            autoComplete="off"
          />
          <button type="submit">save</button>
        </form>
      </div>
    </>
  );
};

export default QuizForm;
