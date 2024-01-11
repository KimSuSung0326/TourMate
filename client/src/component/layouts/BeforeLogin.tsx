import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 요소를 우측으로 정렬합니다. */
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: var(--blue-100);
  color: var(--white);
  width: 4rem;
  height: 2.49rem;
  border-radius: 0.313rem;
  margin-right: 10px;
  border: 0.063rem solid var(--white);
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  &.focused {
    font-weight: bold;
  }
`;

export const BeforeLogin = () => {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation('/login');
  };
  const handleSignUp = () => {
    navigation('/signup');
  };
  return (
    <StyledButtonContainer>
      <StyledButton onClick={handleLogin}>로그인</StyledButton>
      <StyledButton onClick={handleSignUp}>회원가입</StyledButton>
    </StyledButtonContainer>
  );
};
