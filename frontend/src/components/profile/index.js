import React from 'react';
import { useSelector/* , useDispatch */ } from 'react-redux';

const Profile = () => {
  const { username, userId } = useSelector((store) => store.user);
  const quiz = useSelector((store) => store.quiz.items);
  /* const dispatch = useDispatch(); */

  return (
    <section>
      <h1>Welcome {username}</h1>

      <h2>Quiz</h2>
      <ul>
      {quiz.map((quizes) => (
                    <li key={quizes.id}>
                        {quizes.title}
                    </li>
                ))}
      </ul>
    </section>
  );
};

export default Profile;