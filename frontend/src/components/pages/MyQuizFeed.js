import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteQuiz from './DeleteQuiz';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { Card, CardContainer } from 'components/styles/cards';
import { Container } from 'components/styles/GlobalStyles';
import emptystate from '../../assets/emptystate.png';
import { getBgColor } from '../styles/Colors';

const MyQuizFeed = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [myQuizList, setMyQuizList] = useState([]);
  const { username } = useSelector((store) => store.user);

  const API_QUIZ = `${API_URL('quiz')}?creator=${username}`;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        // prettier-ignore
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      },
    };
    fetch(API_QUIZ, options)
      .then((res) => res.json())
      .then((json) => {
        setMyQuizList(json.response);
      });
  }, [username]);

  return (
    <Container>
      <StyledFeed
        className={myQuizList?.length <= 0 ? 'no-items' : 'display-items'}>
        <YourQuizzes>👇🏼Your created quizes👇🏼</YourQuizzes>
        <CardContainer>
          {myQuizList?.length > 0 &&
            myQuizList?.map((quiz) => (
              <div key={quiz._id}>
                <CardDelete
                  style={{
                    background: getBgColor(),
                  }}>
                  <Link to={`/play/${quiz._id}`}>
                    <p>{quiz.title}</p>
                    <p>{quiz.createdAt && quiz.createdAt.substring(0, 10)}</p>
                  </Link>
                  <DeleteQuiz id={quiz._id} />
                </CardDelete>
              </div>
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
    font-family: 'Raleway', sans-serif;
  }
  &.no-items:after {
    content: '😭 You have not created any quizzes yet 😭';
    font-family: 'Raleway', sans-serif;
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

const CardDelete = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const YourQuizzes = styled.p`
  margin: 10px;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  font-family: 'Raleway', sans-serif;
`;
