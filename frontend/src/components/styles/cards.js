import React from 'react';
import styled from 'styled-components/macro';

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Card = styled.div`
  background: white;
  padding: 20px 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  border-style: solid;

  :hover & {
    border-style: solid;
  }
`;

export const QuestionCard = styled.div`
  background: rgba(0, 0, 0, 0.05);
  padding: 20px 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  border-style: solid;

  :hover & {
    border-style: solid;
  }
`;
