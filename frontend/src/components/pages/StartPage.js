import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import LogIn from 'components/auth/LogIn';
import { Container, ContainerWrapper } from 'components/styles/GlobalStyles';

const StartPage = () => {
  const { accessToken } = useSelector((store) => store.user);
  return (
    <ContainerWrapper>
      <Container>
        <Wrapper>
          <Header>
            <div>
              <Body>Play and create quizzes</Body>
            </div>
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
    </ContainerWrapper>
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
  font-size: 30px;
  text-align: center;

  @media (min-width: 600px) {
    margin-top: 50px;
    font-size: 45px;
  }
  @media (min-width: 1200px) {
    margin-top: 50px;
    font-size: 70px;
  }
`;
