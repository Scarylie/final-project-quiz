import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
/* import quiz from 'reducers/quiz' */
import QuizAnswer from './QuizAnswer';

export const SingleAnswer = ({
  answerText,
  setAnswerText,
  isCorrect,
  setIsCorrect,
  handleAnswerRemove,
  answerIndex,
}) => {
  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value);
  };
  return (
    <>
      <button onClick={() => setIsCorrect(!isCorrect)}>
        {' '}
        {/* Make it so you only can activate one per question */}
        {isCorrect ? 'IsCorrect' : ''}
      </button>
      {/* <input
        name="answer"
        id="answer"
        type="radio"
        value={answerText}
        checked={ }
        onChange={() => setIsCorrect(!isCorrect)}
      /> */}
      <input
        name="answer"
        id="answer"
        type="text"
        value={answerText}
        onChange={(e) => handleAnswerChange(e)}
        placeholder="answer"
        autoComplete="off"
      />
      <button
        className="removeBtn"
        onClick={() => handleAnswerRemove(answerIndex)}>
        {' '}
        🆇
      </button>
    </>
  );
};

const QuizFormQuestions = () => {
  const [questionList, setQuestionList] = useState([
    {
      question: '',
      answers: [{}],
    },
  ]);
  // const [answers, setAnswers] = useState([{}]);
  const [questionTitle, setQuestionTitle] = useState('');

  /* console.log('QuizFormQuestions answers', answers); */
  /* console.log('QuizFormQuestions setAnswers', setAnswers); */
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
  const handleAnswerTextChange = (questionIndex, answerIndex) => {
    const list = [...questionList];
    list[questionIndex].answers[answerIndex].answer = e.target.value;
    setQuestionList(list);
  };
  const handleIsCorrectChange = (questionIndex, answerIndex) => {
    const list = [...questionList];
    list[questionIndex].answers[answerIndex].isCorrect =
      !list[questionIndex].answers[answerIndex].isCorrect;
    setQuestionList(list);
  };
  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const list = [...questionList];
    list[questionIndex].answers.splice(answerIndex, 1);
    setQuestionList(list);
  };
  const handleAnswerAdd = (questionIndex) => {
    const list = [...questionList];
    list[questionIndex].answers.push({
      answer: '',
      isCorrect: false,
    });
    setQuestionList(list);
  };
  return (
    <div id="questionForm">
      <div>
        {questionList.map((singleQuestion, questionIndex) => (
          <div key={questionIndex}>
            <p>Question</p>
            <input
              name="question"
              id="question"
              type="text"
              value={singleQuestion.questionTitle}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              placeholder="question title"
              autoComplete="off"
            />
            {questionList.length > 1 && (
              <button
                className="removeBtn"
                onClick={() => handleQuestionRemove(questionIndex)}>
                🆇
              </button>
            )}
            {singleQuestion.answers.map((answer, answerIndex) => (
              <div key={answer.answer}>
                <SingleAnswer
                  answerText={answer.answerText}
                  setAnswerText={() =>
                    handleAnswerTextChange(questionIndex, answerIndex)
                  }
                  isCorrect={answer.isCorrect}
                  setIsCorrect={() => {
                    handleIsCorrectChange(questionIndex, answerIndex);
                  }}
                  handleAnswerRemove={() =>
                    handleRemoveAnswer(questionIndex, answerIndex)
                  }
                />
              </div>
            ))}
            {
              <button
                className="addAnswerBtn"
                type="button"
                onClick={() => handleAnswerAdd(questionIndex)}>
                <span>Add Answer</span>
                {/* make it so you can max add 4 */}
              </button>
            }
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
