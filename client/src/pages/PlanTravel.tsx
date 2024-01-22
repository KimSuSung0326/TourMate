import styled from 'styled-components';
import { BlackButton } from 'feature/BlackButton';
import { TravelItems } from 'component/Travel/TravelItems';
import { useState, useEffect } from 'react';
import { StartDateCalendar } from '../component/Calendar/StartDateCalendar';
import { EndDateCalendar } from 'component/Calendar/EndDateCalendar';
import NewMemo from 'feature/Editor/NewMemo';
import { AddMemoModal } from 'feature/Modal/AddMemoModal';
import { useSelector, useDispatch } from 'react-redux';
import { open5, close5 } from '../redux/reducers/memoSlice';
declare global {
  interface Window {
    kakao: any;
  }
}
const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 2%;
  .TitleContainer {
    border: 1px solid var(--black);
    border-radius: 1rem;
    width: 40rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 1%;
    font-weight: 550;
  }
`;

const StyledMargin = styled.div`
  margin: 2rem 0 2rem 0;
`;
const TravelDate = styled.div`
  position: relative;
  left: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const StyledSubDate = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
const StyledMarginRight = styled.div`
  margin: 0 1rem 0 0;
`;

const StyledBlueButton = styled.div`
  background-color: var(--blue-100);
  border-radius: 0.3rem;
  color: var(--white);
  width: 5.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: -60.5%;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;
const StyeldMapContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 0 1rem;
  width: 100%;
  height: 40rem;
  z-index: 1; /* 추가된 부분 */
`;

const StyledMainContainer2 = styled(StyledMainContainer)`
  z-index: 2; /* 추가된 부분 */
`;

const StyledMapWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 0 2rem;
  width: 50rem;
  height: 40rem;
  left: 1rem;
  border: 1px solid black;
  position: relative;
`;
const StyledListWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem 0 0 2rem;
  width: 30rem;
  height: 40rem;
  left: -15%;
  border: 1px solid black;
  position: relative;
  border-radius: 1rem;
`;
const Memo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue-100);
  color: var(--black);
  width: 25rem;
  height: 3rem;
  font-size: 2rem;
  font-weight: 650;
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem var(--gray-100);
  overflow-y: auto;
`;
export const PlanTravel = () => {
  const [map, setMap] = useState(null); // 지도 상태
  const [isOPen, setIsOpen] = useState(false);
  const [memo, setIsMemo] = useState(''); // 여행 메모 상태
  const isMemoOpen = useSelector((state) => state as any).memo.memostate;
  const dispatch = useDispatch();
  const handleOnClick = () => {
    alert('완료');
  };

  const handleAddText = () => {
    dispatch(open5());
  };
  const handleAddPlace = () => {
    alert('장소 추가');
  };

  const handlisOpenCalender = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    dispatch(close5());
  };
  // 지도 그리기
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표 설정
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []);
  return (
    <>
      <StyledMainContainer>
        <h2 className="title"> 제목:</h2>
        <div className="TitleContainer">신나는 강릉 여행</div>
        <BlackButton onClick={handleOnClick}>완료</BlackButton>
      </StyledMainContainer>
      <StyledMargin />
      <StyledMainContainer2>
        <h3 className="subTitle"> 🌏 여행 경로</h3>
        {/* TravelDaTe 클릭 시 날짜 지정 */}
        <TravelDate onClick={handlisOpenCalender}>
          여행기간: <StyledMarginRight />
          <StartDateCalendar />
          <StyledMarginRight /> ~
          <EndDateCalendar />
        </TravelDate>

        <StyledBlueButton onClick={handleAddText}>메모 추가</StyledBlueButton>
        {isMemoOpen ? (
          <AddMemoModal onClick={handleCloseModal}>
            <NewMemo setContents={setIsMemo} contents={memo} />
          </AddMemoModal>
        ) : null}
        <StyledMarginRight />
        <StyledBlueButton onClick={handleAddPlace}>장소 추가</StyledBlueButton>
      </StyledMainContainer2>
      <StyeldMapContainer>
        <StyledMapWrap>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </StyledMapWrap>
        <StyledListWrap>
          <Memo>{<div dangerouslySetInnerHTML={{ __html: memo }}></div>}</Memo>
        </StyledListWrap>
      </StyeldMapContainer>
    </>
  );
};
