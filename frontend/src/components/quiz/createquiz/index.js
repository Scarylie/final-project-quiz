import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz';
import QuizForm from './QuizForm';
import QuizFormQuestions from './QuizFormQuestions';
import { Container } from 'components/styles/GlobalStyles';
import { Card } from 'components/styles/cards';

const CreateQuiz = () => {
  /*  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); */

  const [newTitle, setNewTitle] = useState('');

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /* 'Authorization': accessToken */
      },
      body: JSON.stringify({ title: newTitle }),
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(quiz.actions.setNewTitle(data.response));
          dispatch(quiz.actions.setError(null));
        });
      })
      .catch((error) => {
        dispatch(quiz.actions.setError(error.response));
      })
      .finally(() => {
        setNewTitle('');
      });
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <Container>
      <Card>
        <QuizForm
          newTitle={newTitle}
          onNewTitleChange={handleNewTitleChange}
          onFormSubmit={handleFormSubmit}
        />
        <QuizFormQuestions />
        <button disabled={!newTitle} type="submit" onSubmit={handleFormSubmit}>
          save
        </button>
      </Card>
    </Container>
  );
};

export default CreateQuiz;
