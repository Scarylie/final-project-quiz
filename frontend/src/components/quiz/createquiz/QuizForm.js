import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz';
import { Form, FormHeading } from 'components/styles/Forms';

const QuizForm = ({ newTitle, onNewTitleChange, onFormSubmit }) => {
  return (
    <>
      <div>
        <FormHeading>Quiz title</FormHeading>
        <form onSubmit={onFormSubmit}>
          <input
            className="quiz-title"
            type="text"
            value={newTitle}
            onChange={onNewTitleChange}
            placeholder="Add Quiz Title"
            autoComplete="off"
          />
        </form>
      </div>
    </>
  );
};

export default QuizForm;
