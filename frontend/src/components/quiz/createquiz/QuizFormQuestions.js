import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_QUIZ } from 'utils/user';
import { SingleAnswer } from './SingleAnswer';
import { Input } from 'components/styles/Forms';
import { FormHeading } from 'components/styles/Forms';
import { QuestionCard } from 'components/styles/cards';
/* import quiz from 'reducers/quiz' */

// att det funkar med POST - databas
// buggar i remove answer och när man förösker setcorrect efter att ha lagt till och tagit bort
// lägga till för img
// endast ett correct

const QuizFormQuestions = (
  {
    /* questionList,
  setQuestionList,
  questionTitle,
  setQuestionTitle, */
  }
) => {
  const [questionList, setQuestionList] = useState([
    {
      question: '',
      answers: [{}],
    },
  ]);
  const [questionTitle, setQuestionTitle] = useState('');

  console.log('QuizFormQuestions questionTitle', questionTitle);
  console.log('QuizFormQuestions setQuestionTitle', setQuestionTitle);

  const handleQuestionAdd = (e) => {
    e.preventDefault();
    setQuestionList([...questionList, { question: '', answers: [{}] }]);
  };

  // This removes the last in the list. Not the one you clicked to remove.
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
          <QuestionCard>
            <div key={questionIndex}>
              <FormHeading>Question</FormHeading>
              <Input
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
              <FormHeading>Answers</FormHeading>
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
                </button>
              }
            </div>
          </QuestionCard>
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
