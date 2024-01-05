import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/img/profile.png';
import { useState } from 'react';
import { BeforeLogin } from './BeforeLogin';
const StyledPadding = styled.div`
  padding-right: 7rem;
`;
const StyledIconLink = styled(Link)`
  text-decoration: none;
`;
const StyledLoginLogo = styled.img`
  margin: 0.625rem;
  width: 2.3rem;
  height: 2.3rem;
`;
const StyledButton = styled.button`
  background-color: var(--green-100);
  margin-right: 10px;
  width: 4rem;
  height: 2.5rem;
  border: 1px solid var(--white);
  color: var(--white);
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
export const AfterLogin = () => {
  const [logout, setlogout] = useState(true);
  const navigator = useNavigate();
  const handlelogout = () => {
    setlogout(false);
    navigator('/');
  };
  if (!logout) {
    return <BeforeLogin />;
  }
  return (
    <>
      <StyledPadding />
      <StyledIconLink to={'mypage'}>
        <StyledLoginLogo src={profile}></StyledLoginLogo>
      </StyledIconLink>
      <StyledButton onClick={handlelogout}>로그아웃</StyledButton>
    </>
  );
};
