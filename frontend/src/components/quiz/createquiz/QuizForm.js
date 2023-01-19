import React from 'react';
import { Input, FormHeading } from 'components/styles/Forms';
import styled from 'styled-components/macro';

const QuizForm = ({ newTitle, onNewTitleChange, onFormSubmit }) => {
  console.log('onNewTitleChange', onNewTitleChange);
  console.log('newTitle', newTitle);
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
            placeholder="What is your quiz about?"
            autoComplete="off"
          />
        </form>
      </FormDiv>
    </>
  );
};

export default QuizForm;

const FormDiv = styled.div`
  background-color: #eed1f7;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
  font-family: 'Raleway', sans-serif;
`;

const ClonedFormInput = styled(Input)`
  min-width: 45vw;
  margin: 1rem;

  @media (min-width: 700px) {
    min-width: 40vw;
  }
  @media (min-width: 1024px) {
    min-width: 35vw;
  }
  @media (min-width: 1524px) {
    min-width: 25vw;
  }
  @media (min-width: 2024px) {
    min-width: 20vw;
  }
`;
