import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
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
  const { username } = useSelector((store) => store.user);

  const API_QUIZ = `${API_URL('quiz')}?creator=${username}`;

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        setMyQuizList(json.response);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('All good!'));
  }, [username]);

  return (
    <Container>
      <StyledFeed
        className={myQuizList?.length <= 0 ? 'no-items' : 'display-items'}>
        <PageHeading>Your created quizes</PageHeading>
        <CardContainer>
          {myQuizList &&
            myQuizList.map((quiz) => (
              <Card key={quiz._id}>
                <Link to={`/play/${quiz._id}`}>{quiz.title}</Link>
              </Card>
            ))}
        </CardContainer>
      </StyledFeed>
    </Container>
  );
};

export default MyQuizFeed;

const StyledFeed = styled.section`
  &.display-items:before {
    text-align: center;
    /* margin-bottom: 25px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 10px auto;
    height: 400px;
    overflow-y: scroll; */
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
