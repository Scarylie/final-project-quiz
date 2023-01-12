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

  const colors = ['yellow', 'lightblue', 'lightpink'];
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
                {quiz.title}
                {quiz.creator && <p>Created by: {quiz.creator}</p>}
                <p>Created at: {quiz.createdAt.substring(0, 10)}</p>
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
