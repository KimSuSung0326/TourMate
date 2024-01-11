import styled from 'styled-components';
import React from 'react';
import { InputBar } from 'feature/InputBar';
import { useState, useEffect } from 'react';
import { BlueButton } from 'feature/BlueButton';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleButton } from 'feature/GoogleButton';
const SignUpContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const SignUpTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 550;
`;
const SignUpSupContainer = styled.div`
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
const StyledNickName = styled(StyledeEmail)`
  margin-top: 0.5rem;
`;

// const StyledLostPassWord = styled.div`
//   color: rgba(134, 190, 255, 1);
//   margin-top: 0.5rem;
//   font-size: 0.7rem;
// `;

export const SignUp = () => {
  const [nickname, setnickname] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [errors, setErrors] = useState([]); //에러
  const navigate = useNavigate();
  const handleChangeSignUp = () => {
    navigate('/');
  };
  const handleChangeSignUpGoogle = () => {
    //구글 OAuth 일단은 메인 페이지로 이동
    //추후 구현
    navigate('/');
  };
  return (
    <>
      <SignUpContainer>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpSupContainer>
          <StyledNickName>닉네임</StyledNickName>
          <InputBar
            placeholder=" Enter your email"
            type="text"
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setnickname(e.target.value)
            }
          />
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
        </SignUpSupContainer>
        {/* <StyledLostPassWord>Forgot PassWord </StyledLostPassWord> */}
        <BlueButton onClick={handleChangeSignUp}>Sign up</BlueButton>
        <GoogleButton onClick={handleChangeSignUpGoogle}>
          Log in With Google
        </GoogleButton>
      </SignUpContainer>
    </>
  );
};
