import React from 'react';
// import { useSelector } from 'react-redux';
import {
  Container,
  PageHeading,
  PageSubHeading,
} from 'components/styles/GlobalStyles';

const PlayQuiz = () => {
  // const { _id } = useSelector((store) => store.quiz);
  // console.log('store.quiz', store.quiz);

  return (
    <Container>
      <PageHeading>Play this quiz </PageHeading>
      <PageSubHeading>Click button to play</PageSubHeading>
      <button type="buton">Play</button>
    </Container>
  );
};

export default PlayQuiz;
