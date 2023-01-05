import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import LogIn from 'components/auth/LogIn';
import { Container } from 'components/styles/GlobalStyles';

const StartPage = () => {
  const { accessToken } = useSelector((store) => store.user);
  return (
    <Container>
      <Wrapper>
        <Header>
          <Body>Play and create quizzes with friends</Body>
        </Header>

        {!accessToken ? (
          <div>
            <LogIn />
          </div>
        ) : (
          <div></div>
        )}
      </Wrapper>
    </Container>
  );
};

export default StartPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 100px;
  }
`;

const Header = styled.div`
  max-width: 400px;
`;

const Body = styled.h1`
  font-size: 80px;
  text-align: center;

  @media (min-width: 600px) {
    margin-top: 50px;
  }
`;
