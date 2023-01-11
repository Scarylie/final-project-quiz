import React, { useState, useEffect } from 'react';
/* import { useSelector } from 'react-redux'; */
import { useParams } from 'react-router-dom';
import { API_QUIZ_ID } from 'utils/user';
import styled from 'styled-components/macro';
import { Card, CardContainer } from 'components/styles/cards';
import { Link } from 'react-router-dom';
import {
  PageHeading,
  PageSubHeading,
  Container,
} from 'components/styles/GlobalStyles';

import emptystate from '../../assets/emptystate.png';

const MyQuizFeed = () => {
  const [myQuizList, setMyQuizList] = useState([]);

  /* const userId = useSelector((store) => store.user.userId); */
  const { id } = useParams();

  console.log('MyQuizFeed myQuizList', myQuizList);
  const fetchMyQuizFeed = () => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ_ID, options) // add loading?
      .then((res) => res.json())
      .then((json) => {
        console.log(API_QUIZ_ID); // not working
        setMyQuizList(json.response.quiz);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('All good!'));
  };
  useEffect(() => {
    fetchMyQuizFeed();
  }, [id, myQuizList._id]);

  return (
    <Container>
      <StyledFeed
        className={myQuizList.length <= 0 ? 'no-items' : 'display-items'}>
        <PageHeading>Your created quizes</PageHeading>
        <CardContainer>
          {myQuizList.map((quiz) => (
            <Card key={quiz._id}>
              <Link to={`/play/${quiz._id}`}>{quiz.title}</Link>
              {quiz.title}
            </Card>
          ))}
        </CardContainer>
      </StyledFeed>
    </Container>
  );
};

export default MyQuizFeed;

const StyledFeed = styled.section`
  &.display-items:after {
    content: 'Click on a card to start a game';
    margin-bottom: 25px;
    font-size: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 10px auto;
    height: 400px;
    overflow-y: scroll;
  }
  &.no-items:after {
    content: 'You have not created any Quiz yet';
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
