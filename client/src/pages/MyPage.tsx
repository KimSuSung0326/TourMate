import styled from 'styled-components';
import Profile from '../assets/img/profile2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { open, close } from '../redux/reducers/modalSlice';
import { open1, close1 } from '../redux/reducers/logoutSlice';
import { open2 } from '../redux/reducers/profileSlice';
import { open3 } from '../redux/reducers/nicknameSlice';
import { open4 } from '../redux/reducers/passwordSlice';
import { Modal } from '../feature/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EditImg } from 'component/MyPage/EditImg';
import { Editname } from 'component/MyPage/Editname';
import { EditPassword } from 'component/MyPage/EditPassword';
import { DummyList } from 'component/MyPage/DummyList';
import { MyList } from '../component/MyPage/MyList';
const StyledMyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border: 0.03rem solid var(--gray-100);
  border-radius: 1rem;
  box-shadow: 0.15rem 0.15rem 0.15rem var(--gray-200);
  width: 99%;
  margin: 0 auto;
`;

const StyledProfile = styled.img`
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .user-name {
    font-size: 2rem;
    font-weight: 550;
    margin: 1rem 0 1rem 0;
    .Icon {
      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }

  .user-password {
    font-size: 2rem;
    font-weight: 550;
  }

  .Icon {
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
`;

const StyledLogoutWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 65%;
  margin-top: 3rem;
  margin-bottom: 1rem;
  .Logout {
    background-color: var(--blue-100);
    border-radius: 0.5rem;
    color: white;
    width: 8rem;
    height: 2.59rem;
    border-color: var(--blue-100);
    margin-right: 1rem;
    font-size: 1.1rem;
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }

    &.focused {
      font-weight: bold;
    }
  }

  .Out {
    background-color: var(--blue-100);
    border-radius: 0.5rem;
    color: white;
    width: 8rem;
    height: 2.59rem;
    border-color: var(--blue-100);
    margin-right: 1rem;
    font-size: 1.1rem;
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }

    &.focused {
      font-weight: bold;
    }
  }
`;
const SingleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 1rem;
  h2 {
    margin-left: 2rem;
  }
`;
const StyledMargin = styled.div`
  margin: 0.5rem 0 0.5rem 0;
`;
export const MyPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state as any).modal.isOpen;
  const isImgOpen = useSelector((state) => state as any).profile.imgstate;
  const isNickNameOpen = useSelector((state) => state as any).nickname
    .nicknamestate;
  const isPassWordOpen = useSelector((state) => state as any).password
    .passwordstate;
  const navigator = useNavigate();
  const handleOpenModal = () => {
    dispatch(open({ modalType: 'ChangeName' }));
  };

  const handleCloseModal = () => {
    // 회원탈퇴 함수
    dispatch(close());
  };

  const handlelogout = () => {
    // 로그아웃 함수
    dispatch(close1());
  };
  const handleChangeImg = () => {
    // 이미지 변경 함수
    dispatch(open2());
  };
  const handleChangeName = () => {
    // 닉네임 변경 함수
    dispatch(open3());
  };
  const handleChangePassword = () => {
    //비밀번호 변경 함수
    dispatch(open4());
  };
  return (
    <>
      <StyledMyPageWrap>
        <StyledProfile
          src={'https://i.ibb.co/7XzCWpg/profile2.png'}
          onClick={handleChangeImg}
        />
        {isImgOpen ? <EditImg /> : null}
        <StyledInputContainer>
          {/* 여기에는 나중에 API로 받아온 유저 이름, 비밀번호 */}
          <div className="user-name" onClick={handleChangeName}>
            User1
            <FontAwesomeIcon icon={faPenToSquare} className="Icon" />
          </div>
          {isNickNameOpen ? <Editname /> : null}
          <div className="user-password" onClick={handleChangePassword}>
            비밀번호 <FontAwesomeIcon icon={faPenToSquare} className="Icon" />
          </div>
          {isPassWordOpen ? <EditPassword /> : null}
        </StyledInputContainer>

        <StyledLogoutWrap>
          <button className="Logout" onClick={handlelogout}>
            로그아웃
          </button>
          <button className="Out" onClick={handleOpenModal}>
            회원탈퇴
          </button>
        </StyledLogoutWrap>

        {isModalOpen && (
          <Modal onClick={handleCloseModal}>정말로 탈퇴하시겠습니까 ? </Modal>
        )}
      </StyledMyPageWrap>
      <StyledMargin />
      <StyledMyPageWrap>
        <StyledMargin />
        <SingleContainer>
          {DummyList.slice(0, 3).map((item, index) => (
            <MyList item={item} key={index}></MyList>
          ))}
        </SingleContainer>
      </StyledMyPageWrap>
    </>
  );
};
