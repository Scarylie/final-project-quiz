import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/user';

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
      console.log('Request user data', accessToken);
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
      };
      fetch(API_URL('quiz'), options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <p>Username {username}</p>
      <p>userId {userId}</p>
      <p>accessToken {accessToken}</p>

    </section>
  );
};

export default Profile;
