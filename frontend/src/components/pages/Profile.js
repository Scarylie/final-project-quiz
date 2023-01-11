import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/auth';

import MyQuizFeed from 'components/quiz/MyQuizFeed';

const Profile = () => {
  const { username, userId } = useSelector((store) => store.user);
  const accessToken = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  console.log('<Profile>');
  console.log('accessToken: ', accessToken);
  console.log('username: ', username);
  console.log('setId: ', userId);

  // automatically authenticate user if token is found
  useEffect(() => {
    if (accessToken) {
      // REQUEST USER DATA
      console.log('Request user data accessToken', accessToken);
      // const withoutFirstAndLast = accessToken.slice(1, -1);
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
            console.log('user data: ', data);
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
            // window.location.reload();
          })
        );
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section>
        <p>Username {username}</p>
        <p>userId {userId}</p>
        <p>accessToken {accessToken}</p>
      </section>
      <MyQuizFeed />
    </>
  );
};

export default Profile;
