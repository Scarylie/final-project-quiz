import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/auth';
import styled from 'styled-components/macro';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import MyQuizFeed from 'components/quiz/MyQuizFeed';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { username } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem('accessToken');

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          // prettier-ignore
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      };
      fetch(API_URL('user'), options)
        .then((response) => response.json())
        .then((data) =>
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
          })
        );
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <section>
        <PageHeading>
          <UserName>Welcome {username}!</UserName>
          <PageSubHeading>What do you want to do?</PageSubHeading>
          <LinksContainerWrapper>
            <LinksContainer>
              <PageSubHeading>👇🏼Play quizzes here👇🏼</PageSubHeading>
              <Link to={`/home`}>PLAY</Link>
            </LinksContainer>
            <LinksContainer>
              <PageSubHeading>👇🏼Create you own quiz here👇🏼</PageSubHeading>
              <Link to={`/create`}>CREATE</Link>
            </LinksContainer>
          </LinksContainerWrapper>
        </PageHeading>
      </section>
      <MyQuizFeed />
    </Container>
  );
};

export default Profile;

const UserName = styled.div`
  text-transform: capitalize;
  font-size: 30px;
  font-weight: bold;
`;

const LinksContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
