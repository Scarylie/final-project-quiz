import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/auth';
// Styles
import {
  SignInContainer,
  PageHeading,
  PageSubHeading,
  ErrorText,
  ContainerWrapper,
} from 'components/styles/GlobalStyles';
import { LoginRegisterDiv } from 'components/styles/cards';
import { Form, FormHeading, Input, Button } from 'components/styles/Forms';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken, navigate]);

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
        email: email,
      }),
    };

    fetch(API_URL('register'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setEmail(data.response.email));
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
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setInputError(true);
          setInputError('Fill in your credentials');
          setInputErrorMessage(data.response);
        }
      });
  };

  return (
    <ContainerWrapper>
      <SignInContainer>
        <section>
          <div>
            <PageHeading>Don't have an account?</PageHeading>
            <PageSubHeading>
              Register and start your journey with us!
            </PageSubHeading>
          </div>
          <div>
            <Form onSubmit={onFormSubmit}>
              <FormHeading>Create Account</FormHeading>

              <Input
                className="signup-input"
                type="text"
                value={username}
                placeholder="Username"
                aria-label="Input Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                className="signup-input"
                type="email"
                value={email}
                placeholder="Email"
                aria-label="Input email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                className="signup-input"
                type="password"
                value={password}
                placeholder="Password"
                aria-label="Input password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {inputError && <ErrorText>{inputErrorMessage}</ErrorText>}

              <Button type="submit">Sign Up</Button>
            </Form>
            <LoginRegisterDiv>
              <p>
                Already have an account? <Link to={`/login`}>Log in here!</Link>
              </p>
            </LoginRegisterDiv>
          </div>
        </section>
      </SignInContainer>
    </ContainerWrapper>
  );
};

export default Register;
