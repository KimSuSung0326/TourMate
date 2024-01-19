import styled from 'styled-components';
import { SmallButton } from 'feature/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { close3 } from '../../redux/reducers/nicknameSlice';
import { InputBar } from 'feature/InputBar';
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
export const Editname = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''); // 닉네임 변수

  const handleChangePicture = () => {
    // 닉네임 변경 함수
    dispatch(close3());
    alert('프로필을 변경 하였습니다.');
  };
  return (
    <>
      <StyledEditContainer>
        {/* 변경 닉네임 들어갈 곳 */}
        <InputBar
          type="text"
          placeholder="변경 닉네임을 입력하세요."
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <StyledBtnContainer>
          <SmallButton onClick={handleChangePicture}>
            닉네임 변경하기
          </SmallButton>
        </StyledBtnContainer>
      </StyledEditContainer>
    </>
  );
};
