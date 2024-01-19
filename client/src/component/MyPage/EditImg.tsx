import styled from 'styled-components';
import { SmallButton } from 'feature/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { open2, close2 } from '../../redux/reducers/profileSlice';
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
const StyledImg = styled.img`
  border-radius: 50%;
`;
const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export const EditImg = () => {
  const dispatch = useDispatch();
  const handleChoice = () => {
    // 사진 찾기 함수
    console.log('사진찾기');
  };
  const handleChangePicture = () => {
    // 사진 변경 버튼 함수
    dispatch(close2());
    alert('프로필을 변경 하였습니다.');
  };
  return (
    <>
      <StyledEditContainer>
        {/* 여기 주소에는 내가 선택한 파일이 들어가야 함 */}
        <StyledImg src="aaa" alt="프로필 이미지"></StyledImg>
        <StyledBtnContainer>
          <SmallButton onClick={handleChoice}>사진 찾기</SmallButton>
          <SmallButton onClick={handleChangePicture}>변경하기</SmallButton>
        </StyledBtnContainer>
      </StyledEditContainer>
    </>
  );
};
