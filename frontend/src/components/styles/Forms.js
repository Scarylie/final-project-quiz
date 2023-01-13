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
`;
