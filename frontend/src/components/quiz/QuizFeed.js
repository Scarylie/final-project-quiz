import React, { useState, useEffect } from 'react';
import { API_QUIZ } from 'utils/user';
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
    fetch(API_QUIZ, options) // add loading?
      .then((res) => res.json())
      .then((json) => {
        console.log(API_QUIZ);
        setQuizList(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('All good!'));
  }, []); // behöver vi något mer felmeddelande i frontend här?

  return (
    <Container>
      <PageHeading>What do you want to play today?</PageHeading>
      <PageSubHeading>Click on a card to start a game</PageSubHeading>
      <StyledFeed
        className={quizList.length <= 0 ? 'no-items' : 'display-items'}>
        <CardContainer>
          {quizList.map((quiz) => (
            <Card key={quiz._id}>
              <Link to={`/play/${quiz._id}`}>{quiz.title}</Link>
            </Card>
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
