import React from 'react';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';
import { SlSocialLinkedin } from 'react-icons/sl';
import { VscGithub } from 'react-icons/vsc';
import { BsGithub } from 'react-icons/bs';
import { getBgColor } from '../styles/Colors';
import styled from 'styled-components/macro';
import about from '../../about.json';

const About = () => {
  let iconStyles = { fontSize: '1.5em' };
  return (
    <Container>
      <div>
        <PageHeading>We are the creators of this website</PageHeading>
        <PageSubHeading>
          This page is made as a final project at Technigo web developer
          bootcamp 2022
        </PageSubHeading>
        <div>
          <PageSubHeading>
            <GitRepo
              href="https://github.com/Scarylie/final-project-quiz"
              role="button"
              aria-pressed="false"
              aria-label="linkedin"
              target="_blank"
              rel="noreferrer">
              Take a look at our code 👉 <BsGithub style={iconStyles} />
            </GitRepo>
          </PageSubHeading>
        </div>
      </div>
      <CardContainer>
        {about.map((person) => {
          return (
            <Card
              key={person.name}
              style={{
                background: getBgColor(),
              }}>
              <PageHeadingAbout>{person.name}</PageHeadingAbout>
              <InfoWrapper>
                <div>
                  <AboutCard>
                    <a
                      href={person.portfolio}
                      role="button"
                      aria-pressed="false"
                      aria-label="linkedin"
                      target="_blank"
                      rel="noreferrer">
                      <ImageContainer>
                        <Img src={person.profileImg} alt="profile picture" />
                      </ImageContainer>
                      <DescriptionText>{person.description}</DescriptionText>
                    </a>
                  </AboutCard>
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
  gap: 10px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Card = styled.div`
  background: inherit;
  padding: 20px 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  border-style: solid;
  position: relative;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Img = styled.img`
  border: 2px solid black;
  width: 150px;
  border-radius: 100vw;
  margin: 10px;

  @media (min-width: 600px) {
    width: 200px;
  }
  @media (min-width: 1300px) {
    width: 250px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const AboutCard = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const GitRepo = styled.a`
  align-self: center;
`;

const DescriptionText = styled.p`
  margin: 10px;
  padding-bottom: 20px;
`;

const PageHeadingAbout = styled(PageHeading)`
  height: 40px;
`;
