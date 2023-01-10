import React from 'react';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import animationData from '../lotties/loader';

const LoadingPage = () => {
  const loading = useSelector((store) => store.ui.loading);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      {loading && (
        <div className="lottiestyle">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </>
  );
};

export default LoadingPage;
