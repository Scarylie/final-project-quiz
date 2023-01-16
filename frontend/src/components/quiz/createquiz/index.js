import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_URL } from 'utils/urls';
import quiz from 'reducers/quiz';
import QuizForm from './QuizForm';
import QuizFormQuestions from './QuizFormQuestions';
import { Container } from 'components/styles/GlobalStyles';
import { CreateCard } from 'components/styles/cards';
import { PlaySaveButton } from 'components/styles/Buttons';

const CreateQuiz = () => {
  const [newTitle, setNewTitle] = useState('');
  const questionList = useSelector((store) => store.quiz.questionList);

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    console.log('Inside handeFormSubmit');
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
          dispatch(quiz.actions.setError(null));
          console.log('HandleFormSubmit send to database');
        });
      })
      .catch((error) => {
        dispatch(quiz.actions.setError(error.response));
      })
      .finally(() => {
        setNewTitle('');
        dispatch(quiz.actions.setQuestionList(null));
      });
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <Container>
      <CreateCard>
        <QuizForm
          newTitle={newTitle}
          onNewTitleChange={handleNewTitleChange}
          onFormSubmit={handleFormSubmit}
        />
        <QuizFormQuestions />
        <div>
          <PlaySaveButton
            disabled={!newTitle}
            type="submit"
            onSubmit={handleFormSubmit}>
            save
          </PlaySaveButton>
        </div>
      </CreateCard>
    </Container>
  );
};

export default CreateQuiz;
