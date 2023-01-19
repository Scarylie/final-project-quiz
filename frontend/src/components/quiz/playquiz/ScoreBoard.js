import React from 'react';
import styled from 'styled-components/macro';
import { PageHeading, PageSubHeading } from 'components/styles/GlobalStyles';

const ScoreBoard = ({ highScore }) => {
  console.log('highScore', highScore);
  return (
    <div>
      {highScore.length > 0 && (
        <ScoreWrapper>
          <PageHeading>High score:</PageHeading>
          {highScore.map((singleScore, index) => {
            return (
              <div key={index}>
                <ScoreBoardWrapper>
                  <PageSubHeading>
                    {singleScore?.player}: {singleScore.score}% correct
                  </PageSubHeading>
                </ScoreBoardWrapper>
              </div>
            );
          })}
        </ScoreWrapper>
      )}
    </div>
  );
};

export default ScoreBoard;

const ScoreWrapper = styled.div`
  background-color: #fef7ee;
  border-radius: 10px;
  padding: 10px;
  border: solid grey;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const ScoreBoardWrapper = styled.div`
  text-transform: capitalize;
`;
