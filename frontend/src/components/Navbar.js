import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { StyledNavbar } from './styles/GlobalStyles';
import { GhostBtn } from './styles/Buttons';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/quizzies-logo.png';
import user from 'reducers/auth';
import { API_URL } from 'utils/urls';

import { AiOutlinePlayCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { VscInfo } from 'react-icons/vsc';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Navbar = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { username } = useSelector((store) => store.user);
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
          })
        );
    }
  }, [accessToken]);

  const onLogOut = () => {
    dispatch(user.actions.logout());
    location.href = '/';
  };

  let iconStyles = { fontSize: '2em' };

  return (
    <StyledNavbar>
      <NavbarContainer>
        <div>
          <Link to={`/profile`}>
            <Img src={Logo} alt="Quizzies logo" />
          </Link>
        </div>
        <Logos>
          <div>
            {accessToken ? (
              <Link
                className="tooltip"
                aria-label="Link to play quiz"
                to={`/home`}>
                <span className="tooltiptext">Play quiz</span>
                <AiOutlinePlayCircle style={iconStyles} />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {accessToken ? (
              <Link
                className="tooltip"
                aria-label="Link to create quiz"
                to={`/create`}>
                <AiOutlinePlusCircle style={iconStyles} />
                <span className="tooltiptext">Create quiz</span>
              </Link>
            ) : (
              <Link
                className="tooltip"
                aria-label="Link to start page"
                to={`/about`}>
                <VscInfo style={iconStyles} />
                <span className="tooltiptext">More about this page</span>
              </Link>
            )}
          </div>
          <LinkWrapper>
            {accessToken ? (
              <Link aria-label="Link to profile page" to={`/profile`}>
                <ProfileIconWrapper>
                  <BsFillPersonFill style={iconStyles} />{' '}
                  <UserName>{username && username}</UserName>
                  <Menu className="profile-menu">
                    <GhostBtn
                      aria-label="Log out button"
                      type="button"
                      onClick={onLogOut}>
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
  border-radius: 10px 10px 0 0;
  bottom: 30px;
  padding: 7px;
  right: -20px;

  @media (min-width: 600px) {
    bottom: -40px;
    border-radius: 0 0 10px 10px;
  }
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

const UserName = styled.div`
  display: flex;
  text-transform: capitalize;
  align-self: flex-end;
  padding-bottom: 2px;
  margin-bottom: 1px;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
`;
