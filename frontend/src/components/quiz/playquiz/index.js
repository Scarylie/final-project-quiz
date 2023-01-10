import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import styled from 'styled-components';
import { API_QUIZ } from 'utils/user';

// TODO: quizData temporary data. Get correct data from backend
// import quizData from './quiz.json';

const PlayQuiz = () => {
  const params = useParams();
  const API_URL = `${API_QUIZ}/${params.id}`;
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [quiz, setQuiz] = useState([]);

  // console.log('PlayQuizData: quizData', quizData);
  // console.log('PlayQuizData: quizData._id', quizData._id);

  const handleSetStep = (event, currentQuestion) => {
    event.preventDefault();
    // console.log('currentQuestion: ', currentQuestion);
    setStep(step + 1);
    if (step > 0) {
      setResults([
        ...results,
        { question: currentQuestion?.question, activeAnswer },
      ]);
    }
  };

  const handleSetActiveAnswer = (event, answer) => {
    // console.log('handleSetActiveAnswer', event.target.value);
    setActiveAnswer(answer);
  };

  const handleFinishQuiz = (event, currentQuestion) => {
    event.preventDefault();
    console.log('Quiz is done!');

    // console.log('activeAnswer: ', activeAnswer);
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    // console.log('activeAnswer: ', activeAnswer);
    console.log('Results', results);
    navigate('/score');
  };

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(API_URL);
        setQuiz(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('Quiz ready to play'));
  }, []);

  return (
    <Container>
      {step === 0 && (
        <IntroContainer>
          <IntroContent>
            <PageHeading>Start game</PageHeading>
            <PageSubHeading>{quiz.title}</PageSubHeading>
            <p>{quiz.creator}</p>
            <button type="button" onClick={handleSetStep}>
              Play
            </button>
          </IntroContent>
        </IntroContainer>
      )}

      {step > 0 && (
        <IntroContainer>
          <IntroContent>
            {quiz.questions.map((currentQuestion, index) => {
              return (
                step - 1 === index && (
                  <div key={currentQuestion._id}>
                    <PageHeading>{currentQuestion.question}</PageHeading>

                    {currentQuestion.answers.map((answer) => {
                      return (
                        <div key={answer._id}>
                          <input
                            type="radio"
                            value={answer.answer}
                            onChange={(event) =>
                              handleSetActiveAnswer(event, answer)
                            }
                            checked={answer._id === activeAnswer?._id}
                          />
                          {answer.answer}
                        </div>
                      );
                    })}
                    <div>
                      {index === quiz.questions.length - 1 ? (
                        <button
                          type="button"
                          onClick={(event) =>
                            handleFinishQuiz(event, currentQuestion)
                          }>
                          Finish
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(event) =>
                            handleSetStep(event, currentQuestion)
                          }>
                          next
                        </button>
                      )}
                    </div>
                  </div>
                )
              );
            })}
          </IntroContent>
        </IntroContainer>
      )}
    </Container>
  );
};

export default PlayQuiz;

const IntroContainer = styled.div`
  /*   width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgrey; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroContent = styled.div``;
