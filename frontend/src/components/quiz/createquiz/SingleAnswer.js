import React, { useState } from 'react';
import { Input } from 'components/styles/Forms';

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
    console.log('handleAnswerChange', handleAnswerChange);
  };
  return (
    <>
      <button onClick={() => setIsCorrect(!isCorrect)}>
        {isCorrect ? 'IsCorrect' : ''}
      </button>

      <Input
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
        🆇
      </button>
    </>
  );
};
