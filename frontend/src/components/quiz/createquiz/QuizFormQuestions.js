import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
/* import quiz from 'reducers/quiz' */
import QuizAnswer from './QuizAnswer';

const QuizFormQuestions = () => {
  const [questionList, setQuestionList] = useState([
    {
      question: '',
      answers: [{}],
    },
  ]);
  const [answers, setAnswers] = useState([{}]);
  const [questionTitle, setQuestionTitle] = useState('');

  console.log('QuizFormQuestions answers', answers);
  console.log('QuizFormQuestions setAnswers', setAnswers);
  console.log('QuizFormQuestions questionTitle', questionTitle);
  console.log('QuizFormQuestions setQuestionTitle', setQuestionTitle);

  const handleQuestionAdd = (e) => {
    e.preventDefault();
    console.log('QuizFormQuestions onFormQuestionSubmit ha');
    setQuestionList([...questionList, { question: '', answers: [{}] }]);
  };

  const handleQuestionRemove = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  console.log('QuizFormQuestions questionList', questionList);

  return (
    <div id="questionForm">
      <div>
        {questionList.map((singleQuestion, index) => (
          <div key={index}>
            <p>Question</p>
            <input
              name="question"
              id="question"
              type="text"
              value={singleQuestion.questionTitle}
              onChange={(e) => handleQuestionChange(e, index)}
              placeholder="question title"
              autoComplete="off"
            />
            {questionList.length > 1 && (
              <button
                className="removeBtn"
                onClick={() => handleQuestionRemove(index)}>
                🆇
              </button>
            )}

            {answers.map((answer) => (
              <div key={answer.answerList}>
                <QuizAnswer
                  answerList={answer.answerList}
                  isCorrect={answer.isCorrect}
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          className="addQuestionBtn"
          onClick={handleQuestionAdd}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default QuizFormQuestions;
