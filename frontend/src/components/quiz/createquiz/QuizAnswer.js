import React from 'react';
import { useState } from 'react';

const QuizAnswer = ({ answerText, isCorrect }) => {
  console.log('QuizAnswer', answerText);
  console.log('QuizAnswer', isCorrect);

  const [isCorrectData, setIsCorrectData] = useState(false);
  /* const [answerTextData, setAnswerTextData] = useState('') */
  const [answerList, setAnswerList] = useState([{ answer: '' }]);

  console.log(isCorrectData);
  console.log(answerList);

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
          <p>Answers</p>
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
              {answerList.length - 1 === index && answerList.length < 4 && (
                <button
                  className="addAnswerBtn"
                  type="button"
                  onClick={handleAnswerAdd}>
                  <span>Add Answer</span>
                </button>
              )}
              {answerList.length > 2 && (
                <button
                  className="removeBtn"
                  onClick={() => handleAnswerRemove(index)}>
                  🆇
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
