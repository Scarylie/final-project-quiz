import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { API_URL } from 'utils/urls';
import quiz from 'reducers/quiz';
//import QuizForm from './QuizForm';
/* import QuizFormQuestions from './QuizFormQuestions'; */
import { Container } from 'components/styles/GlobalStyles';
import { CreateCard } from 'components/styles/cards';
import { PlaySaveButton } from 'components/styles/Buttons';
import { Input, FormHeading } from 'components/styles/Forms';
import styled from 'styled-components/macro';
import { QuestionCard } from 'components/styles/cards';
import { GhostBtn } from 'components/styles/Buttons';
import remove from 'assets/removesmall.png';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrAddCircle } from 'react-icons/gr';

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const CreateQuiz = () => {
  const [newTitle, setNewTitle] = useState('');
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

  const { username } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        /* 'Authorization': accessToken */
      },
      body: JSON.stringify({
        title: newTitle,
        creator: username,
        questions: questionList,
      }),
    };

    fetch(API_URL('quiz'), options)
      .then((res) => res.json())
      .then((data) => {
        batch(() => {
          dispatch(quiz.actions.setNewTitle(data.response));
          dispatch(quiz.action.setQuestionList(data.respone));
          dispatch(quiz.actions.setError(null));
        });
      })
      .catch((error) => {
        dispatch(quiz.actions.setError(error.response));
      })
      .finally(() => {
        setNewTitle('');
        setQuestionList([
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
      });
  };

  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleQuestionAdd = (e) => {
    e.preventDefault();
    setQuestionList([
      ...questionList,
      {
        question: '',
        imageUrl: '',
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

  //************** HANDLING WHEN INPUT'S UPDATE ************** //
  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };
  const handleImageUrlChange = (e, index) => {
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

  //************** ADDING AND REMOVING ANSWERS ************** //
  const handleAnswerAdd = (questionIndex) => {
    const list = [...questionList];
    list[questionIndex].answers.push({
      answer: '',
      isCorrect: false,
      key: generateKey('answer'),
    });
    setQuestionList(list);
  };
  const handleRemoveAnswer = (questionIndex, key) => {
    const list = [...questionList];
    const filtered = list[questionIndex].answers.filter((el) => el.key != key);
    list[questionIndex].answers = filtered;
    setQuestionList(list);
  };

  //************** HANDLING ISCORRECT ************** //
  const toggleAnswerCorrect = (questionIndex, answerIndex) => {
    const list = [...questionList];

    list[questionIndex].answers[answerIndex].isCorrect =
      !list[questionIndex].answers[answerIndex].isCorrect;

    setQuestionList(list);
  };

  //************** RANDOM BACKGROUND COLOR ************** //
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
    <Container>
      <CreateCard>
        <form onSubmit={handleFormSubmit}>
          <FormDiv>
            <FormHeading>Qreate Your Own Quiz</FormHeading>

            <ClonedFormInput
              className="quiz-title"
              type="text"
              value={newTitle}
              onChange={handleNewTitleChange}
              placeholder="What is your quiz about?"
              autoComplete="off"
            />
          </FormDiv>

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
                    <ClonedInput
                      type="url"
                      placeholder="https://..."
                      name="imageUrl"
                      id="imageUrl"
                      value={singleQuestion.questionImage}
                      onChange={(e) => handleImageUrlChange(e, questionIndex)}
                      autoComplete="off"
                    />
                  </InputDiv>
                  <InputDiv>
                    <ClonedFormHeading>Answers</ClonedFormHeading>
                    {singleQuestion.answers.length > 0 &&
                      singleQuestion.answers.map((answer, answerIndex) => (
                        <AnswerDiv key={answer.key}>
                          <TrueFalseBtn
                            type="button"
                            className={answer.isCorrect ? 'True' : 'False'}
                            onClick={() =>
                              toggleAnswerCorrect(questionIndex, answerIndex)
                            }>
                            {answer.isCorrect ? 'True' : 'False'}
                          </TrueFalseBtn>
                          <ClonedAnswerInput
                            name="answer"
                            id="answer"
                            type="text"
                            value={answer.answer}
                            onChange={(e) =>
                              handleAnswerTextChange(
                                e,
                                questionIndex,
                                answerIndex
                              )
                            }
                            placeholder="Answer"
                            autoComplete="off"
                          />
                          <GhostBtn
                            className="removeAnswerBtn"
                            onClick={() =>
                              handleRemoveAnswer(questionIndex, answer.key)
                            }>
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
                  <GrAddCircle style={iconStyles} />
                </GhostBtn>
                <label>Add another Question</label>
              </AddQBtnDiv>
            </div>
          </div>
          <div>
            <PlaySaveButton
              disabled={!newTitle}
              type="submit"
              onSubmit={handleFormSubmit}>
              save
            </PlaySaveButton>
          </div>
        </form>
      </CreateCard>
    </Container>
  );
};

export default CreateQuiz;

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
  font-family: 'Raleway', sans-serif;
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
  font-family: 'Raleway', sans-serif;
`;

const ClonedAnswerInput = styled(Input)`
  width: 70%;
  margin-right: 1rem;
`;

const ClonedInput = styled(Input)`
  width: 65%;
  margin-left: 11px;
`;

const InputDiv = styled.div`
  padding: 1rem;
  font-family: 'Raleway', sans-serif;
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

const FormDiv = styled.div`
  background-color: #eed1f7;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
  font-family: 'Raleway', sans-serif;
`;

const ClonedFormInput = styled(Input)`
  min-width: 45vw;
  margin: 1rem;

  @media (min-width: 700px) {
    min-width: 40vw;
  }
  @media (min-width: 1024px) {
    min-width: 35vw;
  }
  @media (min-width: 1524px) {
    min-width: 25vw;
  }
  @media (min-width: 2024px) {
    min-width: 20vw;
  }
`;
