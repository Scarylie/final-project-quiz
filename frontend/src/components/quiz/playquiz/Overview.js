import React from 'react';
import { useSelector } from 'react-redux';

const PlayQuiz = () => {
  const { title } = useSelector((store) => store.quiz);
  console.log('store.quiz', store.quiz);

  return <p>Play this quiz {title}</p>;
};

export default PlayQuiz;
