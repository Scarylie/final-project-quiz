import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_QUIZ_ID } from 'utils/user';

const MyQuizFeed = () => {
  const [myQuizList, setMyQuizList] = useState([]);

  const userId = useSelector((store) => store.user.userId);
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ_ID, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(API_QUIZ_ID);
        setMyQuizList(json.response);
      });
  }, []);

  return (
    <section>
      <h1>Page of quizfeed</h1>
      <p>Quiztitle with link to play quiz</p>
      <div>
        {myQuizList.map((quiz) => (
          <p key={quiz._id}>{quiz.title}</p>
        ))}
      </div>
    </section>
  );
};

export default MyQuizFeed;
