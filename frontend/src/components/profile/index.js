import React from 'react';
import { useSelector } from 'react-redux';
import MyQuizFeed from 'components/quiz/MyQuizFeed';
import QuizForm from 'components/quiz/QuizForm';

const Profile = () => {
  const { username, userId } = useSelector((store) => store.user);
  
  return (
    <section>
      <h1>Welcome {username}</h1>
      <MyQuizFeed />
      <QuizForm />
    </section>
  );
};

export default Profile;
