import React from 'react';
import { FormHeading } from 'components/styles/Forms';

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
