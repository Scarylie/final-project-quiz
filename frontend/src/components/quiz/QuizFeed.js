import React, { useState, useEffect } from 'react';
/* import { useSelector } from 'react-redux'; */
/* import { useParams } from 'react-router-dom'; */
import { API_QUIZ } from 'utils/user';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Link } from 'react-router-dom';

const QuizFeed = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(API_QUIZ);
        setQuizList(json.response);
      });
  }, []);

  return (
    <section>
      <h1>Page of quizfeed</h1>
      <p>Quiztitle with link to play quiz</p>
      <div>
        {quizList.map((quiz) => (
          <div key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizFeed;
