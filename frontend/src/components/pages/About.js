import React from 'react';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';

import styled from 'styled-components';

import Saralie from '../../utils/img/saralie.jpg';

const presentation = [
  {
    name: 'Sarah Kneedler',
    profileImg: Saralie,
    descrition:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat elit vel pharetra mattis. Integer eu risus lacus. Curabitur sit amet nulla eget orci fringilla scelerisque. Suspendisse potenti. Quisque ac efficitur dui. Nam convallis eros in malesuada maximus.',
    linkedIn: 'https://www.linkedin.com/',
    portfolio: 'https://www.linkedin.com/',
  },
  {
    name: 'Saralie Bognandi',
    profileImg: Saralie,
    descrition:
      'I am a Frontend Developer with a background as a Design Engineer who love to improve user experience for digital services that the users love while working with a modern tech stack. I have experience working as a team leader and enjoy enabling teams to collaborate and thrive while reaching their full potential.',
    linkedIn: 'https://www.linkedin.com/in/saralie-bognandi-439939b3/',
    portfolio: 'https://saralie-bognandi.netlify.app/',
  },
  {
    name: 'Younas Tesfamariam',
    profileImg: Saralie,
    descrition:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat elit vel pharetra mattis. Integer eu risus lacus. Curabitur sit amet nulla eget orci fringilla scelerisque. Suspendisse potenti. Quisque ac efficitur dui. Nam convallis eros in malesuada maximus.',
    linkedIn: 'https://www.linkedin.com/',
    portfolio: 'https://www.linkedin.com/',
  },
];

const About = () => {
  return (
    <Container>
      <Card>
        <PageHeading>We are the creators of this website</PageHeading>
        <PageSubHeading>
          This page is made as a final project at Technigo web developer
          bootcamp 2022
        </PageSubHeading>
      </Card>
      <CardContainer>
        {presentation.map((person) => {
          return (
            <Card key={person.name}>
              <PageHeading>{person.name}</PageHeading>
              <InfoWrapper>
                <div>
                  <Img src={person.profileImg} alt="profile picture" />
                  <a
                    href={person.linkedIn}
                    role="button"
                    aria-pressed="false"
                    aria-label="linkedin"
                    target="_blank"
                    rel="noreferrer">
                    LinkedIn
                  </a>
                  <a
                    href={person.portfolio}
                    role="button"
                    aria-pressed="false"
                    aria-label="linkedin"
                    target="_blank"
                    rel="noreferrer">
                    portfolio
                  </a>
                </div>
                <p>{person.descrition}</p>

                <div></div>
              </InfoWrapper>
            </Card>
          );
        })}
      </CardContainer>
    </Container>
  );
};

export default About;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 20px 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  border-style: solid;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const Img = styled.img`
  border: 2px solid black;
  width: 100px;

  @media (min-width: 600px) {
    width: 150px;
  }
  @media (min-width: 1300px) {
    width: 200px;
  }
`;
