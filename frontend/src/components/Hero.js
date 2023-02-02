import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Hero = () => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div>
      {!accessToken ? (
        <HeroBackground>
          <HeroContainer>
            <HeroText>QUIZZIS</HeroText>
          </HeroContainer>
        </HeroBackground>
      ) : (
        <MiniHeroBackground>{''}</MiniHeroBackground>
      )}
    </div>
  );
};

export default Hero;

const HeroBackground = styled.section`
  width: 100vw;
  background-image: url('https://img.freepik.com/free-vector/abstract-colorful-shapes-background_23-2148769631.jpg?w=1380&t=st=1672852427~exp=1672853027~hmac=aaf9402c0cc1fc18fc601b059369cb6d8af20a7a3afc560aeebea51ceab9590d');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MiniHeroBackground = styled.section`
  height: 50px;
  width: 100vw;
  background-image: url('https://img.freepik.com/free-vector/abstract-colorful-shapes-background_23-2148769631.jpg?w=1380&t=st=1672852427~exp=1672853027~hmac=aaf9402c0cc1fc18fc601b059369cb6d8af20a7a3afc560aeebea51ceab9590d');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const HeroContainer = styled.div`
  width: 100vw;
  color: rgba(255, 255, 255, 0.8);
  font-size: 3.5em;
  text-align: center;
  padding: 5vh 0 5vh 0;
  font-weight: 800;

  @media (min-width: 600px) {
    font-size: 7em;
  }

  @media (min-width: 1200px) {
    font-size: 10em;
  }
`;

const HeroText = styled.h1`
  margin-top: 20px;
  font-size: 50px;
  font-weight: 500;
  color: white;
  font-family: 'Raleway', sans-serif;
  text-shadow:
  /* White glow */ 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
    /* Green glow */ 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa,
    0 0 151px #0fa;

  @media (min-width: 350px) {
    font-size: 70px;
  }
  @media (min-width: 500px) {
    font-size: 90px;
  }
  @media (min-width: 778px) {
    font-size: 120px;
  }
`;
