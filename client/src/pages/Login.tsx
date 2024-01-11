import styled from 'styled-components';
import React from 'react';
import { InputBar } from 'feature/InputBar';
import { useState, useEffect } from 'react';
import { BlueButton } from 'feature/BlueButton';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from 'feature/GoogleButton';
const LoginContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LoginTitle = styled.h1`
  font-size: 2.7rem;
  font-weight: 550;
`;
const LoginSubTitle = styled.span`
  color: #808080;
`;
const LoginSupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledeEmail = styled.span`
  color: #4a4543;
  margin-top: 0.5rem;
`;
const StyledPassWord = styled(StyledeEmail)`
  margin-top: 0.5rem;
`;

// const StyledLostPassWord = styled.div`
//   color: rgba(134, 190, 255, 1);
//   margin-top: 0.5rem;
//   font-size: 0.7rem;
// `;
const StyledSignupContainer = styled.div`
  color: gray;
  font-size: 0.8rem;
  margin-top: 1rem;
  span {
    color: rgba(134, 190, 255, 1);
  }
`;
const StyledSignUpLink = styled(Link)`
  text-decoration: none;
`;
export const Login = () => {
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [errors, setErrors] = useState([]); //에러
  const navigate = useNavigate();
  const handleChangeLogin = () => {
    navigate('/');
  };
  const handleChangeLoginGoogle = () => {
    //구글 OAuth 일단은 메인 페이지로 이동
    //추후 구현
    navigate('/');
  };
  return (
    <>
      <LoginContainer>
        <LoginTitle>Welcome back</LoginTitle>
        <LoginSubTitle>Welcome back! Pleace enter your details.</LoginSubTitle>
        <LoginSupContainer>
          <StyledeEmail>Email</StyledeEmail>
          <InputBar
            placeholder=" Enter your email"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <StyledPassWord>PassWord</StyledPassWord>
          <InputBar
            placeholder="●●●●"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </LoginSupContainer>
        {/* <StyledLostPassWord>Forgot PassWord </StyledLostPassWord> */}
        <BlueButton onClick={handleChangeLogin}>Log in</BlueButton>
        <GoogleButton onClick={handleChangeLoginGoogle}>
          Log in With Google
        </GoogleButton>
        <StyledSignupContainer>
          Dont't have an account?
          <StyledSignUpLink to={'/signup'}>
            <span> Sign Up</span>
          </StyledSignUpLink>
        </StyledSignupContainer>
      </LoginContainer>
    </>
  );
};
