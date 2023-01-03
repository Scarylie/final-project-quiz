import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import quiz from 'reducers/quiz'

//////////////////////// Not working yet 


const QuizFormQuestions = () => {
 /*  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken); */
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: [],
  })

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            /* Authorization: accessToken */
          },
          body: JSON.stringify({ ...newQuestion })
        }
        fetch(API_QUIZ, options)
        .then((res) => res.json())
        .then((data) => {
          batch(() => {
          dispatch(quiz.actions.addQuestion(data.response))
          dispatch(quiz.actions.setError(null))
        })
        })
        .catch((error) => {
          dispatch(quiz.actions.setError(error.response))
        })
        .finally(() => {
          setNewQuestion({
            question: "",
            answer: []
          })
        })
  };

  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value)
  };

  const questionList = useSelector((store) => store.quiz.items);

  return (
    <>
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="quiz-title"
          type="text"
          value={newQuestion}
          onChange={handleNewQuestionChange}
          placeholder="Add Question"
          autoComplete="off" />
        <button type="submit">save</button>
      </form>
    </div>
    <div 
      className="title-list"> 
        {questionList.map((quiz) => {
          return (
            <article key={quiz._id}>
              <p>{quiz.question}</p> 
            </article>
          )
        })} 
      </div>
    
    </> 
  );
};

export default QuizFormQuestions;
