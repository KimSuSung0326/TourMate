import styled from 'styled-components';
import { SmallButton } from 'feature/Button/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { open2, close2 } from '../../redux/reducers/profileSlice';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
  .inputContainer {
    display: flex;
    flex-direction: row;
  }
  .Xbutton {
    display: flex;
    position: relative;
    left: -17rem;
    margin: 1rem 0 0.5rem 0;
  }
`;
const StyledImg = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  &:hover {
    cursor: pointer;
  }
`;
const StyledBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
export const EditImg = () => {
  const [communityImage, setCommunityImage] = useState<
    string | ArrayBuffer | null
  >('https://i.ibb.co/7XzCWpg/profile2.png');

  const [showFileInput, setShowFileInput] = useState(false); // 파일 입력 창을 보여줄지 여부 상태
  const imageRef = useRef<HTMLInputElement>(null);
  const isImgOpen = useSelector((state) => state as any).profile.imgstate;
  const dispatch = useDispatch();

  const handleChoice = () => {
    // 사진 찾기 버튼 클릭 시
    setShowFileInput(true); // 파일 입력 창을 보여줌
  };

  const handleChangePicture = () => {
    // 사진 변경 버튼 클릭 시
    dispatch(close2());
    alert('프로필을 변경 하였습니다.');
  };

  const handelChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setCommunityImage(reader.result);
      };
    }
  };

  const handleDeleteFile = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.value = '';
      setCommunityImage('https://i.ibb.co/vjJJRHK/2023-06-26-10-57-48.png');
    }
  };
  const handleDeleteImg = () => {
    dispatch(close2());
  };
  return (
    <>
      <StyledEditContainer>
        <div className="Xbutton" onClick={handleDeleteImg}>
          <FontAwesomeIcon icon={faX} color="red" />
        </div>

        {/* 파일 입력 창을 보여줄지 여부에 따라 조건부 렌더링 */}
        <div className="inputContainer">
          {showFileInput && (
            <>
              <input type="file" onChange={handelChangeImg} ref={imageRef} />
              <button onClick={handleDeleteFile}>삭제</button>
            </>
          )}
        </div>
        <StyledImg
          src={communityImage ? communityImage.toString() : '기본 이미지 경로'}
        />

        <StyledBtnContainer>
          <SmallButton onClick={handleChoice}>사진 찾기</SmallButton>
          <SmallButton onClick={handleChangePicture}>변경하기</SmallButton>
        </StyledBtnContainer>
      </StyledEditContainer>
    </>
  );
};
