import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz'

const QuizForm = () => {
 /*  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); */
  const [title, setTitle] = useState('');
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
// displayes on /quiz (tror ej det är kopplat till specifik användare)
  return (
    <>
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="quiz-title"
          type="text"
          value={newTitle}
          onChange={handleNewTitleChange}
          placeholder="Add Quiz name"
          autoComplete="off" />
        <button type="submit">save</button>
      </form>
    </div>
    <div 
      className="title-list"> 
        {titleList.map((quiz) => {
          return (
            <article key={quiz._id}>
              <p>{quiz.title}</p>
            </article>
          )
        })}
      </div>
    
    </> 
  );
};

export default QuizForm;
