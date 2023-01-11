import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import styled from 'styled-components';
import { API_URL } from 'utils/user';

const PlayQuiz = () => {
  const { username } = useSelector((store) => store.user);
  console.log('Username in PlayQuiz: ', username);

  const params = useParams();
  const API_QUIZ = `${API_URL('quiz')}/${params.id}`;
  const API_SCORE = `${API_URL('score')}`;

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({});
  const [step, setStep] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [state, setState] = useState('intro');
  const [score, setScore] = useState();

  const calculateScore = () => {
    const answeredOn = results.length;
    const totalQuestions = quiz?.questions?.length;

    if (answeredOn === totalQuestions) {
      const filteredArray = results.filter(function (result) {
        return result.activeAnswer.isCorrect === true;
      });
      const numberOfCorrect = filteredArray.length;
      // console.log('numberOfCorrect', numberOfCorrect);

      const correctOfTotal = (numberOfCorrect / totalQuestions) * 100;
      // console.log('correctOfTotal', correctOfTotal);

      return correctOfTotal;
    }
  };

  const handleSetActiveAnswer = (event, answer) => {
    // console.log('handleSetActiveAnswer', event.target.value);
    setActiveAnswer(answer);
  };

  const handleSetQuestion = (event, currentQuestion) => {
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    setStep(step + 1);
  };

  const handleFinishQuiz = (event, currentQuestion) => {
    console.log('handleFinishQuiz()');
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    const correctOfTotal = calculateScore();
    console.log('correctOfTotal, ', correctOfTotal);
    setScore(correctOfTotal);
    console.log('player:', username, 'quizId:', params.id, 'score:', score);
    if (
      results.length === quiz.questions.length
      // && username &&
      // params.id &&
      // correctOfTotal
    ) {
      console.log('results', results);
      console.log('we have correct number of results');

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: username,
          quizId: params.id,
          score: correctOfTotal,
        }),
      };
      fetch(API_SCORE, options)
        .then((res) => res.json())
        .then(() => {
          setState('score');
        })
        .catch((error) => console.error(error))
        .finally(() => console.log('Score posted to database'));
    }
  };

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        setQuiz(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('Quiz ready to play'));
  }, []);

  // useEffect(() => {
  //   calculateScore();
  // }, [score]);
  const [buttonText, setButtonText] = useState("Finished");
  return (
    <Container>
      {state === 'intro' && (
        <IntroContainer>
          <IntroContent>
            <PageHeading>Start game</PageHeading>
            <PageSubHeading>{quiz.title}</PageSubHeading>
            <p>{quiz.creator}</p>
            <StyledButton><button className='button' type="button" onClick={() => setState('isPlaying')}>
              Play
            </button></StyledButton>
          </IntroContent>
        </IntroContainer>
      )}

      {state === 'isPlaying' && (
        <IntroContainer>
          <IntroContent>
            {quiz?.questions.map((currentQuestion, index) => {
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
                        <StyledButton><button className='button'
                          type="button"
                          onClick={(event) => {
                            handleFinishQuiz(event, currentQuestion)
                            
                              setButtonText("Submit");
                          }}>
                          {buttonText}
                        </button></StyledButton>
                      ) : (
                        <button
                          type="button"
                          onClick={(event) =>
                            handleSetQuestion(event, currentQuestion)
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

      {state === 'score' && (
        <IntroContainer>
          <IntroContent>
            <div>You scored {score}% on this quiz!</div>
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

const StyledButton = styled.button `

.button {
  align-items: center;
  appearance: none;
  background-clip: padding-box;
  background-color: initial;
  background-image: none;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  flex-direction: row;
  flex-shrink: 0;
  /* font-family: Eina01,sans-serif; */
  font-size: 16px;
  font-weight: 800;
  justify-content: center;
  line-height: 24px;
  margin: 0;
  min-height: 64px;
  outline: none;
  overflow: visible;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: auto;
  word-break: keep-all;
  z-index: 0;
}

@media (min-width: 768px) {
  .button {
    padding: 19px 32px;
  }
}

.button:before,
.button:after {
  border-radius: 80px;
}

.button:before {
  background-color: rgba(249, 58, 19, .32);
  content: "";
  display: block;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
}

.button:after {
  background-color: initial;
  background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  bottom: 4px;
  content: "";
  display: block;
  left: 4px;
  overflow: hidden;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: all 100ms ease-out;
  z-index: -1;
}

.button:hover:not(:disabled):after {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition-timing-function: ease-in;
}

.button:active:not(:disabled) {
  color: #ccc;
}

.button:active:not(:disabled):after {
  background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
  bottom: 4px;
  left: 4px;
  right: 4px;
  top: 4px;
}

.button:disabled {
  cursor: default;
  opacity: .24;
}
`