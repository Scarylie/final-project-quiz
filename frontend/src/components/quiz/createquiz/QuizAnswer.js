import React from 'react';
import { useState } from 'react';

const QuizAnswer = ({ answerText, isCorrect }) => {
  console.log('QuizAnswer answerText', answerText);
  console.log('QuizAnswer isCorrect', isCorrect);

  const [isCorrectData, setIsCorrectData] = useState(false);
  const [answerList, setAnswerList] = useState([{ answer: '' }]);

  console.log('QuizAnswer isCorrectData', isCorrectData);
  console.log('QuizAnswer answerList', answerList);

  // https://reactjs.org/docs/lifting-state-up.html

  const handleAnswerAdd = () => {
    setAnswerList([...answerList, { answer: '' }]);
  };

  const handleAnswerRemove = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleAnswerChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setAnswerList(list);
  };

  return (
    <div>
      <div id="answerInput">
        <label className="addAnswerLabel" htmlFor="answer">
          <p>Answer</p>
          {answerList.map((singleAnswer, index) => (
            <div key={index}>
              <input
                name="answer"
                id="answer"
                type="radio"
                value="isCorrect"
                checked={isCorrectData === true}
                onChange={() => setIsCorrectData(true)}
              />
              <input
                name="answer"
                id="answer"
                type="text"
                value={singleAnswer.answer}
                onChange={(e) => handleAnswerChange(e, index)}
                placeholder="answer"
                autoComplete="off"
              />
              {answerList.length > 2 && (
                <button
                  className="removeBtn"
                  onClick={() => handleAnswerRemove(index)}>
                  🆇
                </button>
              )}
              {answerList.length - 1 === index && answerList.length < 4 && (
                <button
                  className="addAnswerBtn"
                  type="button"
                  onClick={handleAnswerAdd}>
                  <span>Add Answer</span>
                </button>
              )}
            </div>
          ))}
        </label>
      </div>
    </div>
  );
};

export default QuizAnswer;
