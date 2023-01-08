import React, { useState, useEffect } from 'react';
import { API_QUIZ } from 'utils/user';
import { Link } from 'react-router-dom';
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
      <CardContainer>
        {quizList.map((quiz) => (
          <Card key={quiz._id}>
            <Link to={`/play/${quiz._id}`}>{quiz.title}</Link>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default QuizFeed;
