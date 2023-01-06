import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
/* import quiz from 'reducers/quiz' */
import QuizAnswer from './QuizAnswer';

import { Form } from 'components/styles/Forms';

const QuizFormQuestions = () => {
  const [answers, setAnswers] = useState([{}])
  const [questionTitle, setQuestionTitle] = useState('')


console.log('QuizFormQuestions answers', answers)
console.log('QuizFormQuestions setAnswers', setAnswers)
console.log('QuizFormQuestions questionTitle', questionTitle)
console.log('setQuestionTitle', setQuestionTitle)

const onFormQuestionSubmit = (event) => {
  event.preventDefault();
}; 

  return (
 
    <Form onSubmit={onFormQuestionSubmit}>
        <input
          className="question"  
          type="text" 
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)} 
          placeholder="question title"
          autoComplete="off" />

          {answers.map((answer) => (
          <div key={answer.answerText}>
            <QuizAnswer answerText={answer.answerText} isCorrect={answer.isCorrect}/>
         </div>
        ))}
          
          <button type="submit" className="addQuestionBtn">Next Question</button>
    </Form>
    
  );
};

export default QuizFormQuestions;


