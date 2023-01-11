import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/auth';
import { Container, PageHeading } from 'components/styles/GlobalStyles';

import MyQuizFeed from 'components/quiz/MyQuizFeed';

const Profile = () => {
  const { username, userId } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem('accessToken');

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          // prettier-ignore
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      };
      fetch(API_URL('user'), options)
        .then((response) => response.json())
        .then((data) =>
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
          })
        );
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <section>
        <PageHeading>Welcome {username}!</PageHeading>
      </section>
      <MyQuizFeed />
    </Container>
  );
};

export default Profile;
