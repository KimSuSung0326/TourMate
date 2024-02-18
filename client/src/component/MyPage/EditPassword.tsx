import styled from 'styled-components';
import { SmallButton } from 'feature/Button/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { close4 } from '../../redux/reducers/passwordSlice';
import { InputBar } from 'feature/Input/InputBar';
import { useState } from 'react';
const StyledEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  border: 0.03rem solid var(--gray-100);
  border-radius: 1rem;
  box-shadow: 0.15rem 0.15rem 0.15rem var(--gray-200);
  width: 37rem;
  margin-bottom: 1rem;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export const EditPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(''); // 비밀번호

  const handleChangePicture = () => {
    // 비밀번호 변경 함수 patch 요청 보내기
    dispatch(close4());
    alert('프로필을 변경 하였습니다.');
  };
  return (
    <>
      <StyledEditContainer>
        {/* 변경 닉네임 들어갈 곳 */}
        <InputBar
          type="password"
          placeholder="변경 비밀번호를 입력하세요."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <StyledBtnContainer>
          <SmallButton onClick={handleChangePicture}>
            비밀번호 변경하기
          </SmallButton>
        </StyledBtnContainer>
      </StyledEditContainer>
    </>
  );
};
