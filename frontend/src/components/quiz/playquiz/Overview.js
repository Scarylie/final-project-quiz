import React from 'react';
import { useSelector } from 'react-redux';

const PlayQuiz = () => {
  const { title } = useSelector((store) => store.quiz);
  console.log('store.quiz', store.quiz);

  //do a GET here

  return <p>Play this quiz {title}</p>;
  quizList.map((singleQuiz) => {
    singleQuiz.questions.map((singleQuestion) => {
      singleQuestion.answers.map((singleAnswer) => {});
    });
  });
};

export default PlayQuiz;
