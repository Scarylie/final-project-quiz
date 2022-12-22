import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { username, userId } = useSelector((store) => store.user);
  return (
    <section>
      <h1>Welcome {username}</h1>
    </section>
  );
};

export default Profile;
