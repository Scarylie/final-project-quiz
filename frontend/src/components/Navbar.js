import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { StyledNavbar } from './styles/GlobalStyles';
import { GhostBtn } from './styles/Buttons';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/quizzies-logo.png';
import user from 'reducers/auth';
import { API_URL } from 'utils/urls';

import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { VscInfo } from 'react-icons/vsc';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Navbar = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { username, userId } = useSelector((store) => store.user);
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

  const onLogOut = () => {
    dispatch(user.actions.logout());
    console.log('Log out');
    location.href = '/';
  };

  let iconStyles = { fontSize: '2em' };

  return (
    <StyledNavbar>
      <NavbarContainer>
        <div>
          <Link to={`/`}>
            <Img src={Logo} alt="Quizzies logo" />
          </Link>
        </div>
        <Logos>
          <div>
            {accessToken ? (
              <Link to={`/home`}>
                <AiOutlineHome style={iconStyles} />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {accessToken ? (
              <Link to={`/create`}>
                <MdOutlineCreateNewFolder style={iconStyles} />
              </Link>
            ) : (
              <Link to={`/about`}>
                <VscInfo style={iconStyles} />
              </Link>
            )}
          </div>
          <LinkWrapper>
            {accessToken ? (
              <Link to={`/profile`}>
                <ProfileIconWrapper>
                  <CgProfile style={iconStyles} /> {username && username}
                  <Menu className="profile-menu">
                    <GhostBtn type="button" onClick={onLogOut}>
                      <LinkWrapper>
                        Logout <RiLogoutBoxRLine style={iconStyles} />
                      </LinkWrapper>
                    </GhostBtn>
                  </Menu>
                </ProfileIconWrapper>
              </Link>
            ) : (
              <div></div>
            )}
          </LinkWrapper>
        </Logos>
      </NavbarContainer>
    </StyledNavbar>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  &:hover .profile-menu {
    display: flex;
  }
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  background: #bb5ff7;
  bottom: -45px;
  padding: 10px;
  right: 0;
`;

const Logos = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Img = styled.img`
  width: 30px;
  margin-left: 30px;
`;
