import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/user';

import MyQuizFeed from 'components/quiz/MyQuizFeed';

const Profile = () => {
  const { accessToken, username, userId } = useSelector((store) => store.user);

  console.log('<Profile>');
  console.log('accessToken: ', accessToken);
  console.log('username: ', username);
  console.log('setId: ', userId);

  // automatically authenticate user if token is found
  useEffect(() => {
    if (accessToken) {
      // REQUEST USER DATA
      console.log('Request user data accessToken', accessToken);
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      };
      fetch(API_URL, options)
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
        });
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
