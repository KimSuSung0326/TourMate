import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import { BeforeLogin } from './BeforeLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AfterLogin } from './AfterLogin';
import { useState } from 'react';
import { Sidebar } from 'component/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { open1, close1 } from '../../redux/reducers/logoutSlice';
const StyledHeaderContainer = styled.nav`
  display: flex;
  justify-content: flex;
  align-items: center;
  background-color: var(--white);
`;

const StyledLogo = styled.img`
  width: 8.5rem;
  height: 8.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledBeforeLogin = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-left: auto;
`;
const StyledBar = styled.div`
  margin-left: 1.875rem;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
export const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state as any).logout.isOpen;

  const [IsShop, setIsShop] = useState(true); // After Login 상태
  const [IsOpen, setIsOpen] = useState(false); // 사이트바 상태
  const toggleSide = () => {
    // 메뉴 버튼 클릭 함수
    setIsOpen(true);
  };
  console.log(isLogin);
  return (
    <>
      <StyledHeaderContainer>
        <StyledBar onClick={toggleSide}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </StyledBar>

        <Sidebar isOpen={IsOpen} setIsOpen={setIsOpen} />
        <StyledLink to={'/'}>
          <StyledLogo src={logo} />
        </StyledLink>
        <StyledBeforeLogin>
          {isLogin ? <AfterLogin /> : <BeforeLogin />}
        </StyledBeforeLogin>
      </StyledHeaderContainer>
    </>
  );
};
