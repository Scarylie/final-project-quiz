import React from 'react';
import Lottie from 'react-lottie';
import winner from './lotties/winner';

const WinnerAnimations = ({ height, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: winner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default WinnerAnimations;
