import React from 'react';
import { Input, FormHeading } from 'components/styles/Forms';
import styled from 'styled-components';

const QuizForm = ({ newTitle, onNewTitleChange, onFormSubmit }) => {
  return (
    <>
      <FormDiv>
        <FormHeading>Qreate Your Own Quiz</FormHeading>
        <form onSubmit={onFormSubmit}>
          <ClonedFormInput
            className="quiz-title"
            type="text"
            value={newTitle}
            onChange={onNewTitleChange}
            placeholder="Add Quiz Title"
            autoComplete="off"
          />
        </form>
      </FormDiv>
    </>
  );
};

export default QuizForm;

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
`;

const ClonedFormInput = styled(Input)`
  min-width: 40vw;
  width: 100%;
  max-width: 40vw;
  margin: 1rem;
`;
