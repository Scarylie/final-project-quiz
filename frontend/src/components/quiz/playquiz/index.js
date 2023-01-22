import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Loading
import LoadingPage from 'components/LoadingPage';
// Pages
import ScoreBoard from './ScoreBoard';
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
import WinnerAnimation from '../../WinnerAnimation';

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
  const [isLoading, setisLoading] = useState(false)

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
    setisLoading(true)
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        setisLoading(false)
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
    '#ffe437',
    '#ff4966',
    '#d85dfb',
    '#fd4472',
    '#fd4472',
    '#da43ff',
    '#ff7e46',
    '#7f60ff',
    '#ffaf20',
  ];
  const getBgColor = () => {
    const color = Math.floor(Math.random() * colors.length);
    return colors[color];
  };

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <Container>
      {state === 'intro' && (
        <PlayWrapper>
          <QuizContent>
            <QuestionPageHeading>{quiz?.title}</QuestionPageHeading>
            <PageSubHeading>
              This quiz has {totalQuestions} questions
            </PageSubHeading>
            {quiz.creator && (
              <PageSubHeading>
                Created By: <QuizAuthor>{quiz.creator}</QuizAuthor>
              </PageSubHeading>
            )}
            <PageSubHeading>
              {quiz.createdAt && quiz.createdAt.substring(0, 10)}
            </PageSubHeading>
            <ScoreBoard highScore={highScore} />

            <PlaySaveButton
              aria-label="play button"
              type="button"
              onClick={() => setState('isPlaying')}>
              <ButtonSpan>Play</ButtonSpan>
            </PlaySaveButton>
          </QuizContent>
        </PlayWrapper>
      )}
      {state === 'isPlaying' && (
        <PlayWrapper>
          <QuizContent>
            {quiz?.questions.map((currentQuestion, index) => {
              return (
                step === index && (
                  <div key={currentQuestion._id}>
                    <div>
                      <QuestionPageHeading>
                        {currentQuestion.question}
                      </QuestionPageHeading>
                      {currentQuestion.imageUrl && (
                        <ImgDiv>
                          <Img
                            src={currentQuestion.imageUrl}
                            alt={currentQuestion.imageUrl}
                          />
                        </ImgDiv>
                      )}
                    </div>
                    <ResponseContainer>
                      <AnswersInputContainer>
                        {currentQuestion.answers.map((answer, answerIndex) => {
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
                              <AnswerSpan>{answer.answer}</AnswerSpan>
                            </SingleAnswerContainer>
                          );
                        })}
                      </AnswersInputContainer>
                    </ResponseContainer>
                    <AnswerButtonContainer>
                      {index === quiz.questions.length - 1 ? (
                        <PlaySaveButton
                          type="button"
                          aria-label="submit button"
                          onClick={(event) => {
                            handleFinishQuiz(event, currentQuestion);

                            setButtonText('Submit');
                          }}>
                          <ButtonSpan>{buttonText}</ButtonSpan>
                        </PlaySaveButton>
                      ) : (
                        <GhostBtn
                          type="button"
                          aria-label="next button"
                          onClick={(event) =>
                            handleSetQuestion(event, currentQuestion)
                          }>
                          <FiArrowRightCircle style={iconStyles} />
                        </GhostBtn>
                      )}
                    </AnswerButtonContainer>
                  </div>
                )
              );
            })}
          </QuizContent>
        </PlayWrapper>
      )}

      {state === 'score' && (
        <PlayWrapper>
          <QuizContent>
            <PageHeading>You scored {score}% on this quiz!</PageHeading>
            <WinnerAnimation width="200px" height="200px" />
            <ScoreBoard highScore={highScore} />
          </QuizContent>
        </PlayWrapper>
      )}

      <ExitGame>
        <Link aria-label="Link to home" to={`/home`}>
          <GrClose style={iconStyles} />
        </Link>
      </ExitGame>
    </Container>
  );
};

export default PlayQuiz;

const PlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(133, 233, 156);
  background: linear-gradient(
    45deg,
    rgba(133, 233, 156, 1) 0%,
    rgba(9, 124, 139, 1) 35%,
    rgba(106, 9, 121, 1) 100%
  );
`;
const QuizContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 3%;
  box-shadow: 5px 10px 15px rgb(133, 233, 156);
  margin: 50px;
  min-width: 17rem;

  @media (min-width: 778px) {
    padding: 50px;
  }
  @media (min-width: 1024px) {
    padding: 50px;
    min-width: 30rem;
  }
`;
const ButtonSpan = styled.span`
  text-shadow: 0 0 7px #cbc3c3, 0 0 11px #cbc3c3, 0 0 17px #cbc3c3;
`;
const AnswersInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 5px;

  @media (min-width: 778px) {
    gap: 15px;
    margin: 10px;
  }
`;
const SingleAnswerContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  padding: 12px;
  box-shadow: 3px 7px 20px white;

  @media (min-width: 778px) {
    padding: 15px;
  }
`;

const AnswerSpan = styled.span`
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  margin-left: 5px;
`;

const ExitGame = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 10;
`;
const QuizAuthor = styled.span`
  font-size: 15px;
  text-transform: uppercase;
`;
const QuestionPageHeading = styled(PageHeading)`
  margin: 20px;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;
const Img = styled.img`
  width: 200px;

  @media (min-width: 600px) {
    width: 300px;
  }
  @media (min-width: 1300px) {
    width: 350px;
  }
`;
const ResponseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-content: center;
`;

const AnswerButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StyledRadio = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  height: 30px;
  width: 30px;
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
    width: 30px;
    height: 30px;
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
      height: 30px;
      width: 30px;
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
  @media (min-width: 778px) {
    height: 40px;
    width: 40px;
    min-width: 30px;
  }
`;
