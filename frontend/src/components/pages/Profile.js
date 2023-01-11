import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import user from 'reducers/auth';
import { Navigate } from 'react-router-dom';
import { API_URL } from 'utils/user';

const Profile = () => {
  const { accessToken, username, userId } = useSelector((store) => store.user);
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
      const options = {
        method: 'GET',
        headers: {
          // prettier-ignore
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      };
      fetch(API_URL(`user`), options)
        .then((response) => response.json())
        .then((data) => {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response._id));
            // dispatch(
            //   user.actions.setAccessToken(`"${data.response.accessToken}"`)
            // );
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
            console.log(`data`, data);
            //window.location.reload();
          });
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
