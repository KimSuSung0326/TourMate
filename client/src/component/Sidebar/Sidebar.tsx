import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faXRay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const StyledSideBarWrap = styled.div`
  z-index: 10;
  border-radius: 0 1rem 1rem 0;
  height: 100%;
  width: 20%;
  background-color: var(--gray-100);
  top: 0;
  position: fixed;
  left: -20%;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.5s ease;
  }
  border: 1px solid red;
`;
const StyledCloseBtn = styled.div`
  position: absolute;
  left: 5%;
  top: 3%;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
const StyledMenuWrap = styled.div`
  border: 1px solid red;
  margin-top: 16%;
`;
const StyledMenuList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 550;
  margin: 1rem 0 1rem 0;
  position: relative;
  color: var(--blue-100);
  border: 1px solid blue;
`;
const StyledMenuLink = styled(Link)`
  text-decoration: none;
`;
interface Props {
  isOpen: boolean;
  setIsOpen: any;
}
interface Menu {
  id: string;
  name: string;
  link: string;
}
const MenuList: Menu[] = [
  { id: '1', name: '마이페이지', link: '/mypage' },
  { id: '2', name: '사진 지도', link: '/photo' },
  { id: '3', name: '내 여행일정', link: '/mytravel' },
  { id: '4', name: '공유한 사진 지도', link: '/sharephoto' },
  { id: '5', name: '공유 여행일정', link: '/sharetravel' },
];
export const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousedown', handleOutSide);
    return () => {
      document.removeEventListener('mousedown', handleOutSide);
    };
  });
  const handleOutSide = (e: any) => {
    if (!outside.current.contains(e.target)) {
      // 참조값이 거짓일 경우, 밖을 클릭 했을경우
      toggleSide(); // isOpen 값을 false로 바꿔서 창 닫기
    }
  };
  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* isopen이 true이면 */}
      <StyledSideBarWrap
        onClick={toggleSide}
        className={isOpen ? 'open' : ''}
        ref={outside} //slider에 대한 참조값 생성
      >
        <StyledCloseBtn>
          <FontAwesomeIcon icon={faX} color="white"></FontAwesomeIcon>
        </StyledCloseBtn>
        <StyledMenuWrap>
          {MenuList.map((list) => {
            return (
              <StyledMenuLink key={list.id} to={list.link}>
                <StyledMenuList>{list.name}</StyledMenuList>
              </StyledMenuLink>
            );
          })}
        </StyledMenuWrap>
      </StyledSideBarWrap>
    </>
  );
};
