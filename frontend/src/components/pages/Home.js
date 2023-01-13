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
      });
  }, []);

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
      <PageHeading>What do you want to play today?</PageHeading>
      {quizList?.length > 0 ? (
        <PageSubHeading>Click on a card to start a game</PageSubHeading>
      ) : (
        <PageSubHeading>No quizzes created yet!</PageSubHeading>
      )}
      <StyledFeed
        className={quizList.length <= 0 ? 'no-items' : 'display-items'}>
        <CardContainer>
          {quizList?.map((quiz) => (
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
