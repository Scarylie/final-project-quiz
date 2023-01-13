import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Url
import { API_URL } from 'utils/urls';
// Styles
import styled from 'styled-components/macro';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { PlaySaveButton } from 'components/styles/Buttons';
import { GhostBtn } from 'components/styles/Buttons';

// Icons
import { FiArrowRightCircle } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

const PlayQuiz = () => {
  let iconStyles = { fontSize: '3em' };
  const { username } = useSelector((store) => store.user);

  const params = useParams();
  const API_QUIZ = `${API_URL('quiz')}/${params.id}`;
  const API_SCORE = `${API_URL('score')}`;

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({});
  const [step, setStep] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [state, setState] = useState('intro');
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState();

  const calculateScore = () => {
    const answeredOn = results.length;
    const totalQuestions = quiz?.questions?.length;

    if (answeredOn === totalQuestions) {
      const filteredArray = results.filter(function (result) {
        return result.activeAnswer.isCorrect === true;
      });
      const numberOfCorrect = filteredArray.length;
      const scoreCalculate = (numberOfCorrect / totalQuestions) * 100;
      const correctOfTotal = Math.round(scoreCalculate);

      return correctOfTotal;
    }
  };

  const handleSetActiveAnswer = (event, answer) => {
    setActiveAnswer(answer);
  };

  const handleSetQuestion = (event, currentQuestion) => {
    alert(activeAnswer.isCorrect ? 'Correct answer' : 'Wrong answer');
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    setStep(step + 1);
  };

  const handleFinishQuiz = (event, currentQuestion) => {
    alert(activeAnswer.isCorrect ? 'Correct answer' : 'Wrong answer');
    setResults([
      ...results,
      { question: currentQuestion?.question, activeAnswer },
    ]);
    const correctOfTotal = calculateScore();

    setScore(correctOfTotal);

    if (results.length === quiz.questions.length) {
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
        });
    }
  };

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        setQuiz(json.response.quiz);
        setHighScore(json.response.highScore);
      });
  }, []);

  const totalQuestions = quiz?.questions?.length;

  const [buttonText, setButtonText] = useState('Finish');

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

  return (
    <Container>
      {state === 'intro' && (
        <IntroContainer>
          <IntroContent>
            <PageHeading>{quiz?.title}</PageHeading>
            <PageSubHeading>
              This quiz has {totalQuestions} questions
            </PageSubHeading>
            {quiz.creator && (
              <PageSubHeading>Created By: {quiz.creator}</PageSubHeading>
            )}
            <PageSubHeading>
              {quiz.createdAt && quiz.createdAt.substring(0, 10)}
            </PageSubHeading>

            <PlaySaveButton type="button" onClick={() => setState('isPlaying')}>
              Play
            </PlaySaveButton>
            <div>
              {highScore.length > 0 && (
                <ScoreWrapper>
                  <PageHeading>High score:</PageHeading>
                  {highScore.map((singleScore, index) => {
                    return (
                      <div key={index}>
                        <ScoreBoard>
                          <PageSubHeading>
                            {singleScore?.player}: {singleScore.score}% correct
                          </PageSubHeading>
                        </ScoreBoard>
                      </div>
                    );
                  })}
                </ScoreWrapper>
              )}
            </div>
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
                    <ResponseContainer>
                      <AnswersInputContainer>
                        {currentQuestion.answers.map((answer) => {
                          return (
                            <SingleAnswerContainer
                              key={answer._id}
                              style={{
                                background: getBgColor(),
                              }}>
                              <label>
                                <StyledRadio
                                  type="radio"
                                  value={answer.answer}
                                  onChange={(event) =>
                                    handleSetActiveAnswer(event, answer)
                                  }
                                  checked={answer._id === activeAnswer?._id}
                                />
                              </label>
                              {answer.answer}
                            </SingleAnswerContainer>
                          );
                        })}
                      </AnswersInputContainer>
                      <div>
                        {index === quiz.questions.length - 1 ? (
                          <PlaySaveButton
                            type="button"
                            onClick={(event) => {
                              handleFinishQuiz(event, currentQuestion);

                              setButtonText('Submit');
                            }}>
                            {buttonText}
                          </PlaySaveButton>
                        ) : (
                          <GhostBtn
                            type="button"
                            onClick={(event) =>
                              handleSetQuestion(event, currentQuestion)
                            }>
                            <FiArrowRightCircle style={iconStyles} />
                          </GhostBtn>
                        )}
                      </div>
                    </ResponseContainer>
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
            <PageHeading>You scored {score}% on this quiz!</PageHeading>
          </IntroContent>
        </IntroContainer>
      )}

      <ExitGame>
        <Link to={`/home`}>
          <GrClose style={iconStyles} />
        </Link>
      </ExitGame>
    </Container>
  );
};

export default PlayQuiz;

const IntroContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffd0b5;
`;
const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AnswersInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const SingleAnswerContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  padding: 8px;
`;

const ExitGame = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
const QuizAuthor = styled.p`
  font-size: 15px;
  text-transform: uppercase;
`;
const Img = styled.img`
  width: 300px;

  @media (min-width: 600px) {
    width: 350px;
  }
  @media (min-width: 1300px) {
    width: 450px;
  }
`;

const ScoreWrapper = styled.div`
  background-color: #fef7ee;
  border-radius: 10px;
  padding: 10px;
  border: solid grey;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

const ScoreBoard = styled.div`
  text-transform: capitalize;
`;
const ResponseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledRadio = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  height: 40px;
  width: 40px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
  border-radius: 50%;
  font-family: 'Raleway', sans-serif;
  :checked {
    background: #17b047;
  }
  :checked::before {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :checked::after {
    -webkit-animation: click-wave 0.65s;
    -moz-animation: click-wave 0.65s;
    animation: click-wave 0.65s;
    background: #17b047;
    content: '';
    display: block;
    position: relative;
    z-index: 100;
  }
  :after {
    border-radius: 50%;
  }

  @keyframes click-wave {
    0% {
      height: 40px;
      width: 40px;
      opacity: 0.35;
      position: relative;
    }
    100% {
      height: 200px;
      width: 200px;
      margin-left: -80px;
      margin-top: -80px;
      opacity: 0;
    }
  }
`;
