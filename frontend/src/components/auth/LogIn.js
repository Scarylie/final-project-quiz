import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { API_URL } from 'utils/user';
import user from 'reducers/auth';
import {
  SignInContainer,
  PageHeading,
  PageSubHeading,
  ErrorText,
} from 'components/styles/GlobalStyles';
import { Form, FormHeading, Input, Button } from 'components/styles/Forms';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('login');
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  // const accessToken = useSelector((store) => store.user.accessToken);

  const onFormSubmit = (event) => {
    console.log('onFormSubmit in Login.js');
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    if (username && password) {
      fetch(API_URL(mode), options)
        .then((response) => response.json())
        .then((response) => {
          localStorage.setItem('accessToken', response.response.accessToken);
          return response;
        })
        .then((data) => {
          if (data.success) {
            batch(() => {
              console.log(data);
              dispatch(user.actions.setUsername(data.response.username));
              dispatch(user.actions.setUserId(data.response.id));
              // dispatch(user.actions.setAccessToken());
              //email is not sent back from backend
              dispatch(user.actions.setEmail(data.response.email));
              dispatch(user.actions.setError(null));
              navigate('/profile');
              // window.location.reload();
            });
          } else {
            setInputErrorMessage(data.response);
          }
        });
    } else {
      setInputError(true);
      setInputErrorMessage('Fill in your credentials');
    }
  };

  //This is not being used...
  if (accessToken) {
    console.log('if accessToken, navigate to profile in Login.js');
    return <Navigate to="/profile" />;
  }

  return (
    <SignInContainer>
      <section>
        {/* Sign in */}
        <div>
          <PageHeading>Welcome Back!</PageHeading>
          <PageSubHeading>Sign in to start quizzing.</PageSubHeading>
        </div>

        <div>
          <Form className="signup-form" action="#" onSubmit={onFormSubmit}>
            <FormHeading>Sign in</FormHeading>

            <Input
              className="signup-input"
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="signup-input"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {inputError && <ErrorText>{inputErrorMessage}</ErrorText>}

            <Button type="submit">Sign In</Button>
          </Form>

          <p>
            Don´t have an account? <Link to={`/register`}>Sign up here!</Link>
          </p>
        </div>
      </section>
    </SignInContainer>
  );
};

export default LogIn;
