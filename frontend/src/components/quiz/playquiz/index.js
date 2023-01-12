import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlayButton } from 'components/styles/Buttons';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { Input } from 'components/styles/Forms';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components/macro';
import { API_URL } from 'utils/urls';

const PlayQuiz = () => {
  let iconStyles = { fontSize: '2em' };
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
      const correctOfTotal = (numberOfCorrect / totalQuestions) * 100;

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
    console.log('correctOfTotal, ', correctOfTotal);
    setScore(correctOfTotal);
    console.log(
      'player:',
      username,
      'quizId:',
      params.id,
      'score:',
      correctOfTotal
    );
    if (results.length === quiz.questions.length) {
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
        console.log('json', json);
        setQuiz(json.response.quiz);
        setHighScore(json.response.highScore);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('Quiz ready to play'));
  }, []);

  const totalQuestions = quiz?.questions?.length;

  const [buttonText, setButtonText] = useState('Finish');
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

            <PlayButton type="button" onClick={() => setState('isPlaying')}>
              Play
            </PlayButton>
            <div>
              {highScore.length > 0 && (
                <div>
                  <h2>High score:</h2>
                  {highScore.map((singleScore, index) => {
                    return (
                      <div key={index}>
                        {singleScore?.player}: {singleScore.score} % correct
                      </div>
                    );
                  })}
                </div>
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
                    {currentQuestion.answers.map((answer) => {
                      return (
                        <div key={answer._id}>
                          <Input
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
                          onClick={(event) => {
                            handleFinishQuiz(event, currentQuestion);

                            setButtonText('Submit');
                          }}>
                          {buttonText}
                        </button>
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

      <ExitGame>
        <Link to={`/profile`}>
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
`;
const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExitGame = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const Img = styled.img`
  width: 300px;

  @media (min-width: 600px) {
    width: 400px;
  }
  @media (min-width: 1300px) {
    width: 450px;
  }
`;
