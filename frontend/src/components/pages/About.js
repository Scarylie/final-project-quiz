import React from 'react';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { SlSocialLinkedin } from 'react-icons/sl';
import { VscGithub } from 'react-icons/vsc';
import { BsGithub } from 'react-icons/bs';

import styled from 'styled-components/macro';

import Saralie from '../../assets/saralie.jpg';
import Sarah from '../../assets/sarah.jpg';
import Younas from '../../assets/younas.png';

const presentation = [
  {
    name: 'Sarah Kneedler',
    profileImg: Sarah,
    descrition:
      'Hi! I am a curios frontend developer with a background in social work. I am eager to continue learning and I am inspired and amazed by what can be done with code. My hope is to combine my new found love for coding with my previous work experience and bring a different insight in to the creative world of tech. I am a problem solver and used to collaborate and work in teams across different professions and roles.',
    linkedIn: 'https://www.linkedin.com/in/sarah-kneedler/',
    github: 'https://github.com/Kneedler',
    portfolio: 'https://sarahkneedler-portfolio.netlify.app/',
  },
  {
    name: 'Saralie Bognandi',
    profileImg: Saralie,
    descrition:
      'I am a Frontend Developer with a background as a Design Engineer who love to improve user experience for digital services that the users love while working with a modern tech stack. I have experience working as a team leader and enjoy enabling teams to collaborate and thrive while reaching their full potential.',
    linkedIn: 'https://www.linkedin.com/in/saralie-bognandi-439939b3/',
    github: 'https://github.com/Scarylie',
    portfolio: 'https://saralie-bognandi.netlify.app/',
  },
  {
    name: 'Younas Tesfamariam',
    profileImg: Younas,
    descrition:
      'Currently studying at Technigo to become a frontend developer.I have a bachelor degree in Information Systems and work today as an Senior IT Operations Specialist to ensure that the day-to-day operations run smoothly. My goal is to strive to learn and gain more knowledge in programming.',
    linkedIn: 'https://www.linkedin.com/',
    github: 'https://www.linkedin.com/',
    portfolio: 'https://www.linkedin.com/',
  },
];

const About = () => {
  let iconStyles = { fontSize: '1.5em' };

  return (
    <Container>
      <Card>
        <PageHeading>We are the creators of this website</PageHeading>
        <PageSubHeading>
          This page is made as a final project at Technigo web developer
          bootcamp 2022
        </PageSubHeading>
        <PageSubHeading>
          👇🏼Have a look at our code here👇🏼
          <a
            href="https://github.com/Scarylie/final-project-quiz"
            role="button"
            aria-pressed="false"
            aria-label="linkedin"
            target="_blank"
            rel="noreferrer">
            <BsGithub style={iconStyles} />
          </a>
        </PageSubHeading>
      </Card>
      <CardContainer>
        {presentation.map((person) => {
          return (
            <Card key={person.name}>
              <PageHeading>{person.name}</PageHeading>
              <InfoWrapper>
                <div>
                  <ImgWrapper>
                    <a
                      href={person.portfolio}
                      role="button"
                      aria-pressed="false"
                      aria-label="linkedin"
                      target="_blank"
                      rel="noreferrer">
                      <p>{person.descrition}</p>
                      <Img src={person.profileImg} alt="profile picture" />
                    </a>
                  </ImgWrapper>
                  <Links>
                    <div>
                      <a
                        href={person.linkedIn}
                        role="button"
                        aria-pressed="false"
                        aria-label="linkedin"
                        target="_blank"
                        rel="noreferrer">
                        <SlSocialLinkedin style={iconStyles} />
                      </a>
                    </div>
                    <div>
                      <a
                        href={person.github}
                        role="button"
                        aria-pressed="false"
                        aria-label="linkedin"
                        target="_blank"
                        rel="noreferrer">
                        <VscGithub style={iconStyles} />
                      </a>
                    </div>
                  </Links>
                </div>
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
`;
const Img = styled.img`
  border: 2px solid black;
  width: 100px;
  border-radius: 100vw;

  @media (min-width: 600px) {
    width: 150px;
  }
  @media (min-width: 1300px) {
    width: 200px;
  }
`;
const ImgWrapper = styled.div`
  margin: 0 auto;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;
