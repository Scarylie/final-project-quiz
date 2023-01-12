import React, { useState } from 'react';
import { Input } from 'components/styles/Forms';
import { FormHeading } from 'components/styles/Forms';
import { QuestionCard } from 'components/styles/cards';
import { GhostBtn } from 'components/styles/Buttons';
import styled from 'styled-components/macro';
import add from 'assets/addsmall.png';
import remove from 'assets/removesmall.png';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrAddCircle } from 'react-icons/gr';

/* import quiz from 'reducers/quiz' */

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};
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
      key: generateKey('question'),
      answers: [
        {
          key: generateKey('answer'),
          answer: '',
          isCorrect: false,
        },
      ],
    },
  ]);
  const [questionTitle, setQuestionTitle] = useState('');

  const handleQuestionAdd = (e) => {
    e.preventDefault();
    setQuestionList([
      ...questionList,
      {
        question: '',
        key: generateKey('question'),
        answers: [{ key: generateKey('answer'), answer: '', isCorrect: false }],
      },
    ]);
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

  const handleAnswerTextChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[questionIndex].answers[answerIndex].answer = value;
    setQuestionList(list);
  };
  const handleIsCorrectChange = (questionIndex, answerIndex) => {
    const list = [...questionList];
    list[questionIndex].answers[answerIndex].isCorrect =
      !list[questionIndex].answers[answerIndex].isCorrect;
    setQuestionList(list);
  };
  const handleRemoveAnswer = (questionIndex, key) => {
    const list = [...questionList];
    const filtered = list[questionIndex].answers.filter((el) => el.key != key);
    list[questionIndex].answers = filtered;
    setQuestionList(list);
    console.log('list[questionIndex].answers', list[questionIndex].answers);
  };
  const handleAnswerAdd = (questionIndex) => {
    const list = [...questionList];
    list[questionIndex].answers.push({
      answer: '',
      isCorrect: false,
      key: generateKey('answer'),
    });
    setQuestionList(list);
  };
  const toggleAnswerCorrect = (questionIndex, answerIndex) => {
    console.log('questionIndex', questionIndex);

    const list = questionList;
    console.log('list', list);

    list[questionIndex].answers.map((singleAnswer, index) => {
      if (index !== answerIndex) {
        list[questionIndex].answers[index] = false;
      }
      if (answerIndex === index) {
        list[questionIndex].answers[answerIndex] =
          !list[questionIndex].answers[answerIndex];
      }
    });
    setQuestionList(list);
  };

  const colors = [
    '#5697fe',
    '#2490d0',
    '#20cced',
    '#fff2f0',
    '#ffe437',
    '#ff4966',
    '#d85dfb',
    '#fd4472',
    '#fd4472',
    '#da43ff',
    '#ff7e46',
    '#7f60ff',
    '#ffaf20',
    '#ffcec2',
    '#ffcec2',
  ];
  const getBgColor = () => {
    const color = Math.floor(Math.random() * colors.length);
    return colors[color];
  };

  let iconStyles = { fontSize: '3em' };

  return (
    <div id="questionForm">
      <div>
        {questionList.map((singleQuestion, questionIndex) => (
          <QuestionCard
            key={singleQuestion.key}
            style={{
              background: getBgColor(),
            }}>
            <QuestionInputDiv>
              <RemoveQBtnDiv>
                {questionList.length > 1 && (
                  <GhostBtn
                    className="removeBtn"
                    onClick={() => handleQuestionRemove(questionIndex)}>
                    <RiDeleteBin6Line style={iconStyles} />
                    {/* <img
                      className="removeQ-icon"
                      aria-label="remove-button"
                      src={remove}
                    /> */}
                  </GhostBtn>
                )}
              </RemoveQBtnDiv>
              <div>
                <ClonedFormHeading>Question</ClonedFormHeading>
                <ClonedInput
                  name="question"
                  id="question"
                  type="text"
                  value={singleQuestion.questionTitle}
                  onChange={(e) => handleQuestionChange(e, questionIndex)}
                  placeholder="Question"
                  autoComplete="off"
                />
              </div>
            </QuestionInputDiv>
            <InputDiv>
              <ClonedFormHeading>Image url</ClonedFormHeading>
              <ClonedInput type="url" placeholder="https://..." />
            </InputDiv>
            <InputDiv>
              <ClonedFormHeading>Answers</ClonedFormHeading>
              {singleQuestion.answers.length > 0 &&
                singleQuestion.answers.map((answer, answerIndex) => (
                  <AnswerDiv key={answer.key}>
                    {/*   <TrueFalseBtn
                      className={answer.isCorrect ? 'True' : 'False'}
                      onClick={() =>
                        toggleAnswerCorrect(questionIndex, answerIndex)
                      }>
                      {answer.isCorrect ? 'True' : 'False'}
                    </TrueFalseBtn> */}
                    <ClonedAnswerInput
                      name="answer"
                      id="answer"
                      type="text"
                      value={answer.answer}
                      onChange={(e) =>
                        handleAnswerTextChange(e, questionIndex, answerIndex)
                      }
                      placeholder="Answer"
                      autoComplete="off"
                    />

                    <GhostBtn
                      className="removeAnswerBtn"
                      onClick={() =>
                        handleRemoveAnswer(questionIndex, answer.key)
                      }>
                      {/* <RiDeleteBin6Line style={iconStyles} /> */}
                      <img
                        className="removeA-icon"
                        aria-label="remove-button"
                        src={remove}
                      />
                    </GhostBtn>
                  </AnswerDiv>
                ))}
              <AddABtnDiv>
                {
                  <GhostBtn
                    className="addAnswerBtn"
                    type="button"
                    onClick={() => handleAnswerAdd(questionIndex)}>
                    <GrAddCircle style={iconStyles} />
                    {/*                     <img
                      className="addA-icon"
                      aria-label="add-button"
                      src={add}
                    /> */}
                  </GhostBtn>
                }
              </AddABtnDiv>
            </InputDiv>
          </QuestionCard>
        ))}
        <AddQBtnDiv>
          <GhostBtn
            type="button"
            className="addQuestionBtn"
            onClick={handleQuestionAdd}>
            <img className="addQ-icon" aria-label="add-button" src={add} />
          </GhostBtn>
          <label>Add another Question</label>
        </AddQBtnDiv>
      </div>
    </div>
  );
};

export default QuizFormQuestions;

const TrueFalseBtn = styled.button`
  &.True {
    color: green;
  }
  &.False {
    color: red;
  }
`;

const QuestionInputDiv = styled.div`
  position: relative;
  padding: 1rem;
`;

const AnswerDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1%;
  margin: 1%;
  position: relative;
  box-shadow: 1px 2px 3px gray;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
`;

const ClonedAnswerInput = styled(Input)`
  width: 70%;
  margin-right: 1rem;
`;

const ClonedInput = styled(Input)`
  width: 65%;
  /*   min-width: 10vw;
  width: 100%;
  max-width: 40vw; */
  margin-left: 8px;
`;

const InputDiv = styled.div`
  padding: 1rem;
`;

const ClonedFormHeading = styled(FormHeading)`
  margin-left: 5px;
  margin-bottom: 12px;
`;

const RemoveQBtnDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 2%;
  align-items: center;
  position: absolute;
  align-items: top;
  right: 0;
  top: 0;
`;

const AddQBtnDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 2%;
  align-items: center;
`;

const AddABtnDiv = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`;
