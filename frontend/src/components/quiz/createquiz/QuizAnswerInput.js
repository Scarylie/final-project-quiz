import React from 'react';

const QuizAnswerInput = ({ label, value, singleAnswer, setter }) => {
  return (
    <label>
      <input
        type="text"
        value={singleAnswer}
        onChange={() => setter(value)}
        placeholder="answer"
        autoComplete="off"
      />
      <span>{label}</span>
    </label>
  );
};

export default QuizAnswerInput;
