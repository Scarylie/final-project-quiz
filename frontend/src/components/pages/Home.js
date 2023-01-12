import React, { useState, useEffect } from 'react';
import { API_URL } from 'utils/urls';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import emptystate from '../../assets/emptystate.png';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { CardContainer, Card } from 'components/styles/cards';

const QuizFeed = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_URL('quiz'), options)
      .then((res) => res.json())
      .then((json) => {
        setQuizList(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('All good!'));
  }, []);

  const colors = [
    '#BB5FF7',
    '#FE734C',
    '#D446FD',
    '#21CBEC',
    '#21CBEC',
    '#FDDF1D',
    '#05D1F4',
    '#4E7CC7',
    '#4E7CC7',
  ];
  const getBgColor = () => {
    const color = Math.floor(Math.random() * colors.length);
    return colors[color];
  };

  return (
    <Container>
      <PageHeading>What do you want to play today?</PageHeading>
      <PageSubHeading>Click on a card to start a game</PageSubHeading>
      <StyledFeed
        className={quizList.length <= 0 ? 'no-items' : 'display-items'}>
        <CardContainer>
          {quizList.map((quiz) => (
            <Link to={`/play/${quiz._id}`} key={quiz._id}>
              <Card
                style={{
                  background: getBgColor(),
                }}>
                <QuizTitle>{quiz.title}</QuizTitle>
                {quiz.creator && (
                  <QuizAuthor> Created by: {quiz.creator}</QuizAuthor>
                )}
                <QuizDate>{quiz.createdAt.substring(0, 10)}</QuizDate>
              </Card>
            </Link>
          ))}
        </CardContainer>
      </StyledFeed>
    </Container>
  );
};

export default QuizFeed;

const StyledFeed = styled.section`
  &.display-items {
    /*   margin-bottom: 25px;
    font-size: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 10px auto;
    height: 400px;
    overflow-y: scroll; */
  }
  &.no-items {
    margin-bottom: 25px;
    font-size: 16px;
    text-align: center;
    background-image: url(${emptystate});
    height: 500px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const QuizTitle = styled.h6`
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

const QuizAuthor = styled.p`
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
`;

const QuizDate = styled.p`
  font-size: 12px;
`;
