import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlayButton } from 'components/styles/Buttons';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import styled from 'styled-components/macro';
import { API_URL } from 'utils/urls';

const PlayQuiz = () => {
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
        setQuiz(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('Quiz ready to play'));
  }, []);

  const totalQuestions = quiz?.questions?.length;
  const timestamp = quiz.createdAt;

  const [buttonText, setButtonText] = useState('Finish');
  return (
    <Container>
      {state === 'intro' && (
        <IntroContainer>
          <IntroContent>
            <PageHeading>{quiz.title}</PageHeading>
            <PageSubHeading>
              This quiz has {totalQuestions} questions
            </PageSubHeading>
            {quiz.creator && (
              <PageSubHeading>Created By: {quiz.creator}</PageSubHeading>
            )}
            <PageSubHeading>{timestamp}</PageSubHeading>
            <PlayButton type="button" onClick={() => setState('isPlaying')}>
              Play
            </PlayButton>
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
