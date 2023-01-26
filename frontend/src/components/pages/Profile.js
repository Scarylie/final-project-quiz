import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import MyQuizFeed from 'components/pages/MyQuizFeed';
import { Link } from 'react-router-dom';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';

let iconStyles = { fontSize: '3em' };

const Profile = () => {
  const { username } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem('accessToken');

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
              <Link to={`/home`}>
                <AiOutlinePlayCircle style={iconStyles} />
              </Link>
            </LinksContainer>
            <LinksContainer>
              <PageSubHeading>👇🏼Create you own quiz here👇🏼</PageSubHeading>
              <Link to={`/create`}>
                <AiOutlinePlusCircle style={iconStyles} />
              </Link>
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
  margin-bottom: 20px;
`;

const LinksContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
