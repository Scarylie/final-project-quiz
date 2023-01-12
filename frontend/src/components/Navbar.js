import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { StyledNavbar } from './styles/GlobalStyles';
import { GhostBtn } from './styles/Buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/quizzies-logo.png';
import user from 'reducers/auth';

import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { VscInfo } from 'react-icons/vsc';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Navbar = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { username, userId } = useSelector((store) => store.user);
  const dispatch = useDispatch();

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
          {!accessToken ? (
            <Img src={Logo} alt="Quizzies logo" />
          ) : (
            <Link to={`/`}>
              <Img src={Logo} alt="Quizzies logo" />
            </Link>
          )}
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
              <Link to={`/profile`}>
                <CgProfile style={iconStyles} />
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
          <div>
            {accessToken ? (
              <GhostBtn type="button" onClick={onLogOut}>
                <RiLogoutBoxRLine style={iconStyles} />
              </GhostBtn>
            ) : (
              <Link to={`/`}>
                <AiOutlineHome style={iconStyles} />
              </Link>
            )}
          </div>
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

const Logos = styled.div`
  display: flex;
  gap: 10px;
`;

const Img = styled.img`
  width: 30px;
`;
