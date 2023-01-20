import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { Card, CardContainer } from 'components/styles/cards';
import { Link } from 'react-router-dom';
import { PageSubHeading, Container } from 'components/styles/GlobalStyles';
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
      });
  }, [username]);

  const colors = [
    '#5697fe',
    '#2490d0',
    '#20cced',
    '#ffe437',
    '#ff4966',
    '#d85dfb',
    '#fd4472',
    '#fd4472',
    '#da43ff',
    '#ff7e46',
    '#7f60ff',
    '#ffaf20',
  ];
  const getBgColor = () => {
    const color = Math.floor(Math.random() * colors.length);
    return colors[color];
  };

  return (
    <Container>
      <StyledFeed
        className={myQuizList?.length <= 0 ? 'no-items' : 'display-items'}>
        <YourQuizzes>👇🏼Your created quizes👇🏼</YourQuizzes>
        <CardContainer>
          {myQuizList &&
            myQuizList.map((quiz) => (
              <Card
                key={quiz._id}
                style={{
                  background: getBgColor(),
                }}>
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

const YourQuizzes = styled.p`
  margin: 10px;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  font-family: 'Raleway', sans-serif;
`;
