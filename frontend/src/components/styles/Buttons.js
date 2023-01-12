import styled from 'styled-components/macro';

export const GhostBtn = styled.button`
  background-color: inherit;
  cursor: pointer;
  border: none;
  padding: 0;
  .submit-icon {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PlayButton = styled.button`
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  margin: 0;
  padding: 19px 26px;
  pointer-events: auto;
  position: relative;
  width: auto;
  z-index: 0;

  /*    @media (min-width: 768px) & {  NOT SURE HOW TO USE ThIS
    padding: 19px 32px; 
  } */

  &:before,
  :after {
    border-radius: 80px;
  }

  &:before {
    background-color: rgba(249, 58, 19, 0.32);
    content: '';
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &:after {
    background-color: initial;
    background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
    bottom: 4px;
    content: '';
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
  }

  &:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
  }
`;
