import React from 'react'
import styled from 'styled-components'
import Loader from '../assets/Loader.gif'

 const LoadingPage = () => {
  
  return (
    <BackgroundBlur>
    <LoadingWrapper>
      <Loadergif src={Loader} alt="Loader" />
      </LoadingWrapper>
      </BackgroundBlur>
  );
};

export default LoadingPage

const Loadergif = styled.img`
  display: flex; 
  width: auto;
  height: auto;
  align-items:center;
  justify-content: center; 
`
const BackgroundBlur = styled.div`
width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const LoadingWrapper = styled.div`
display: flex; 
justify-content: center; 
align-items: center;
position: relative;
  `