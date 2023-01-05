import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz'
import QuizForm from './QuizForm';
import QuizFormQuestions from './QuizFormQuestions';

const Overview = () => {
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
            /* Authorization: accessToken */
          },
          body: JSON.stringify({ title: newTitle })
        }
        fetch(API_QUIZ, options)
        .then((res) => res.json())
        .then((data) => {
          batch(() => {
          dispatch(quiz.actions.setNewTitle(data.response))
          dispatch(quiz.actions.setError(null))
        })
        })
        .catch((error) => {
          dispatch(quiz.actions.setError(error.response))
        })
        .finally(() => {
          setNewTitle('')
        })
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value)
  };

  const titleList = useSelector((store) => store.quiz.items);

  return (
    <>
  <QuizForm 
    newTitle={newTitle}
    onNewTitleChange={handleNewTitleChange}
    onFormSubmit={handleFormSubmit} />
  <QuizFormQuestions 
    // newQuestion={newQuestion}
    // onNewQuestionChange={handleNewQuestionChange}
    // onFormQuestionSubmit={handleFormQuestionSubmit}
  />
    </> 
  );
};

export default Overview;
