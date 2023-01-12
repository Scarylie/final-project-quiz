import React from 'react';
import error404 from '../assets/error404.jpg';

export const NotFound = () => {
  return (
    <div>
      <h1>Error code: 404</h1>
      <h2>Page not found</h2>
      <img src={error404} alt="error 404" />
    </div>
  );
};
