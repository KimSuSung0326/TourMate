import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
const StyledHeaderContainer = styled.div`
  display: flex;
  background-color: var(--white);
`;
const StyledLogo = styled.img`
  margin: 0.625rem;
  width: 200px;
  height: 200px;
`;
export const Header = () => {
  return (
    <>
      <StyledHeaderContainer>
        <StyledLogo src={logo}></StyledLogo>
      </StyledHeaderContainer>
    </>
  );
};
