import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz';
import { Form } from 'components/styles/Forms';

import QuizFormQuestions from './QuizFormQuestions';

const QuizForm = ({ newTitle, onNewTitleChange, onFormSubmit }) => {
  return (
    <>
      <div>
        <Form onSubmit={onFormSubmit}>
          <input
            className="quiz-title"
            type="text"
            value={newTitle}
            onChange={onNewTitleChange}
            placeholder="Add Quiz Title"
            autoComplete="off"
          />
          <QuizFormQuestions
          // newQuestion={newQuestion}
          // onNewQuestionChange={handleNewQuestionChange}
          // onFormQuestionSubmit={handleFormQuestionSubmit}
          />
          <button type="submit">save</button>
        </Form>
      </div>
    </>
  );
};

export default QuizForm;
