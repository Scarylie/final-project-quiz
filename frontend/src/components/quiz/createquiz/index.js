import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_URL } from 'utils/urls';
import quiz from 'reducers/quiz';
//import QuizForm from './QuizForm';
import QuizFormQuestions from './QuizFormQuestions';
import { Container } from 'components/styles/GlobalStyles';
import { CreateCard } from 'components/styles/cards';
import { PlaySaveButton } from 'components/styles/Buttons';
import { Input, FormHeading } from 'components/styles/Forms';
import styled from 'styled-components/macro';

const CreateQuiz = ({ handleAnswerTextChange }) => {
  const [newTitle, setNewTitle] = useState('');
  const questionList = useSelector((store) => store.quiz.questionList);

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    console.log('You clicked on save');
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /* 'Authorization': accessToken */
      },
      body: JSON.stringify({ title: newTitle, questions: questionList }),
    };

    fetch(API_URL('quiz'), options)
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(quiz.actions.setNewTitle(data.response));
          dispatch(quiz.action.setQuestionList(data.respone));
          dispatch(quiz.actions.setError(null));
          console.log('HandleFormSubmit send to database');
        });
      })
      .catch((error) => {
        dispatch(quiz.actions.setError(error.response));
      })
      .finally(() => {
        setNewTitle('');
        questionList({});
      });
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <Container>
      <CreateCard>
        <form onSubmit={handleFormSubmit}>
          <FormDiv>
            <FormHeading>Qreate Your Own Quiz</FormHeading>

            <ClonedFormInput
              className="quiz-title"
              type="text"
              value={newTitle}
              onChange={handleNewTitleChange}
              placeholder="What is your quiz about?"
              autoComplete="off"
            />
          </FormDiv>
          <QuizFormQuestions handleAnswerTextChange={handleAnswerTextChange} />
          <div>
            <PlaySaveButton
              disabled={!newTitle}
              type="submit"
              onSubmit={handleFormSubmit}>
              save
            </PlaySaveButton>
          </div>
        </form>
      </CreateCard>
    </Container>
  );
};

export default CreateQuiz;

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
