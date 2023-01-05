import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { StyledNavbar } from './styles/GlobalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../utils/img/quizzies-logo.png';
import user from 'reducers/auth';

const Navbar = () => {
  const { accessToken } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(user.actions.logout());
    console.log('Log out');
    location.href = '/';
  };

  // automatically authenticate user if token is found
  //   useEffect(() => {
  //     if (accessToken) {
  //       dispatch(getUserDetails());
  //     }
  //   }, [accessToken, dispatch]);

  return (
    <StyledNavbar>
      <NavbarContainer>
        <div>
          <Link to={`/`}>
            <Img src={Logo} alt="Quizzies logo" />
          </Link>
        </div>
        <div>
          {accessToken ? (
            <Link to={`/home`}>Home</Link>
          ) : (
            <Link to={`/`}>Home</Link>
          )}
        </div>
        <div>
          {accessToken ? (
            <Link to={`/profile`}>Profile</Link>
          ) : (
            <Link to={`/about`}>About</Link>
          )}
        </div>
        <div>
          {accessToken ? (
            <Link to={`/create`}>Create</Link>
          ) : (
            <Link to={`/register`}>Register</Link>
          )}
        </div>
        <div>
          {accessToken ? (
            <button type="button" onClick={onLogOut}>
              Log out
            </button>
          ) : (
            <Link to={`/login`}>Log in</Link>
          )}
        </div>
      </NavbarContainer>
    </StyledNavbar>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
`;
