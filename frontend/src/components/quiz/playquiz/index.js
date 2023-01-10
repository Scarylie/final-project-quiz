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

const PlayQuiz = () => {
  const params = useParams();
  const API_URL = `${API_QUIZ}/${params.id}`;
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState([]);
  const [step, setStep] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [play, setPlay] = useState(false);

  const handleSetActiveAnswer = (event, answer) => {
    console.log('handleSetActiveAnswer', event.target.value);
    setActiveAnswer(answer);
  };

  const handleSetStep = (event, currentQuestion) => {
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    setStep(step + 1);
  };

  const handleFinishQuiz = (event, currentQuestion) => {
    console.log('Quiz is done!');
    if (step <= quiz.questions.length - 1) {
      setResults([
        ...results,
        { question: currentQuestion?.question, activeAnswer },
      ]);
      /*  setStep(step + 1); */
      console.log('results', results);
    }
    // console.log('activeAnswer: ', activeAnswer);
    // if quiz restart reset play variable to false
    // Remove comment and navigate when result is not delayed
    // navigate('/score');
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
      {!play && (
        <IntroContainer>
          <IntroContent>
            <PageHeading>Start game</PageHeading>
            <PageSubHeading>{quiz.title}</PageSubHeading>
            <p>{quiz.creator}</p>
            <button type="button" onClick={() => setPlay(true)}>
              Play
            </button>
          </IntroContent>
        </IntroContainer>
      )}

      {play && (
        <IntroContainer>
          <IntroContent>
            {quiz.questions.map((currentQuestion, index) => {
              return (
                step === index && (
                  <div key={currentQuestion._id}>
                    <div>
                      <PageHeading>{currentQuestion.question}</PageHeading>
                      {currentQuestion.imageUrl && (
                        <Img
                          src={currentQuestion.imageUrl}
                          alt={currentQuestion.imageUrl}
                        />
                      )}
                    </div>
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

const Img = styled.img`
  width: 300px;

  @media (min-width: 600px) {
    width: 400px;
  }
  @media (min-width: 1300px) {
    width: 450px;
  }
`;
