import React from 'react';
import styled from 'styled-components/macro';

export const Form = styled.form`
  background: white;
  padding: 66px 50px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  background-color: rgba(255, 255, 255, 0.7);
`;

export const FormHeading = styled.h2`
  margin-bottom: 5px;
  font-weight: bold;
  margin: 1rem;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  padding: 15px 10px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  margin-top: 10px;

  background-color: var(--navy);

  background-image: linear-gradient(
    45deg,
    var(--navy) 16%,
    var(--purple) 16%,
    var(--purple) 33%,
    var(--teal) 33%,
    var(--teal) 50%,
    var(--red) 50%,
    var(--red) 66%,
    var(--blue) 66%,
    var(--blue) 83%,
    var(--yellow) 83%,
    var(--yellow) 100%
  );

  box-shadow: 0 0 10px grey;
`;
