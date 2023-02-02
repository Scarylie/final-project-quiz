import React, { useState } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/auth';
import {
  SignInContainer,
  PageHeading,
  PageSubHeading,
  ErrorText,
  ContainerWrapper,
} from 'components/styles/GlobalStyles';
import { LoginRegisterDiv } from 'components/styles/cards';
import { Form, FormHeading, Input, Button } from 'components/styles/Forms';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(API_URL('login'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setError(null));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            localStorage.setItem('accessToken', data.response.accessToken);
            localStorage.setItem('userId', JSON.stringify(data.response.id));
            localStorage.setItem('username', data.response.username);
            navigate(`/profile`);
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setInputError(true);
          setInputError('Fill in your credentials');
          setInputErrorMessage(data.response);
        }
      })
      .catch((data) => {
        setInputError(true);
        setInputError('Fill in your credentials');
        setInputErrorMessage(data.response);
      });
  };

  if (accessToken) {
    return <Navigate to="/profile" />;
  }

  return (
    <ContainerWrapper>
      <SignInContainer>
        <section>
          <div>
            <PageHeading>Welcome to Quizzis!</PageHeading>
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
                aria-label="Input Username"
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="signup-input"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                aria-label="input password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {inputError && <ErrorText>{inputErrorMessage}</ErrorText>}
              <Button type="submit">Sign In</Button>
            </Form>
            <LoginRegisterDiv>
              <p>
                Don´t have an account?{' '}
                <Link to={`/register`}>Sign up here!</Link>
              </p>
            </LoginRegisterDiv>
          </div>
        </section>
      </SignInContainer>
    </ContainerWrapper>
  );
};

export default LogIn;
