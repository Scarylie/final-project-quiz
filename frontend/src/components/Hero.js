import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Hero = () => {
  const { accessToken } = useSelector((store) => store.user);

  return (
    <div>
      {!accessToken ? (
        <HeroBackground>
          <HeroContainer>QUIZZIS</HeroContainer>
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
