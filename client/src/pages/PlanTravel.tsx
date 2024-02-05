import styled from 'styled-components';
import { BlackButton } from 'feature/Button/BlackButton';
import { useState, useEffect } from 'react';
import { StartDateCalendar } from '../component/Calendar/StartDateCalendar';
import { EndDateCalendar } from 'component/Calendar/EndDateCalendar';
import NewMemo from 'feature/Editor/NewMemo';
import { AddMemoModal } from 'feature/Modal/AddMemoModal';
import { useSelector, useDispatch } from 'react-redux';
import { open5, close5 } from '../redux/reducers/memoSlice';
import { open6, close6 } from '../redux/reducers/placeSlice';
import { AddPlaceModal } from 'feature/Modal/AddPlaceModal';
import { AddPlace } from 'component/Map/AddPlace';
import { setPlaceList } from '../redux/reducers/setSelectedPlace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ChangeMemoModal } from 'feature/Modal/ChangeMemoModal';
declare global {
  interface Window {
    kakao: any;
  }
}
export interface propsType {
  searchKeyword?: string;
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
  right: -28%;
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
  align-items: center;
  justify-content: flex-start;
  margin: 2rem 0 0 2rem;
  width: 30rem;
  height: 40rem;
  right: 2rem;
  border: 1px solid black;
  position: relative;
  border-radius: 1rem;
  flex-direction: column;
`;
const StyledPlaceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2rem 0 0 2rem;
  width: 30rem;
  height: 40rem;
  right: 5rem;
  border: 1px solid black;
  position: relative;
  border-radius: 1rem;
  flex-direction: column;
`;
const Memo = styled.div`
  display: flex;
  flex-direction: row; // 가로로 배치
  justify-content: space-between; // 내용과 버튼을 가로로 정렬하고 간격을 벌립니다.
  align-items: center;
  background-color: var(--blue-100);
  color: var(--black);
  width: 25rem;
  max-height: 10rem;
  overflow-y: auto;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem var(--gray-100);

  .List-content {
    flex-grow: 1; // 내용이 더 커질 경우 버튼이 아래로 내려가도록 설정
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
  .List-Button {
    display: flex;
    align-items: center;
    position: relative;
    right: 10%;
    .button-container {
      display: flex;
      flex-direction: row;
      align-items: center; // 버튼들을 세로로 정렬합니다.
      .modify-button {
        width: 2rem;
        height: 1.7rem;
        margin: 0.1rem;
        border-radius: 0.3rem;
      }
      .delete-button {
        width: 2rem;
        height: 1.7rem;
        margin: 0.1rem;
        border-radius: 0.3rem;
        margin-bottom: 0.4rem;
      }
      .reroll-button {
        width: 2rem;
        height: 1.7rem;
        margin: 0.1rem;
        border-radius: 0.3rem;
      }
    }
  }
`;
const ListNumber = styled.div`
  //position: absolute;
  top: 0;
  left: 10%;
  height: 100%;
  width: 1rem; // 두께 조절
  background-color: var(--white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Place = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  color: var(--black);
  width: 25rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 650;
  margin: 1rem 0 1rem 0;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem var(--gray-200);
  //overflow-y: auto;
  .PlaceBtn {
    margin: 1rem;
    &:hover {
      cursor: pointer;
      font-weight: bold;
    }

    &.focused {
      font-weight: bold;
    }
  }
`;

export const PlanTravel = () => {
  const [map, setMap] = useState(null); // 지도 상태
  const [isOPen, setIsOpen] = useState(false); //Calendar 상태
  const [isChangeMemo, setIsChangeMemo] = useState(false); //수정 버튼 상태
  const [memo, setIsMemo] = useState(''); // 여행 메모 상태
  const isMemoOpen = useSelector((state) => state as any).memo.memostate;
  const isPlaceOpen = useSelector((state) => state as any).place.placestate;
  const [memoList, setMemoList] = useState([]); // 메모 항목을 저장하는 배열
  const selectedPlaceList = useSelector((state) => state as any).setplace
    .selectedPlace; // 장소 배열 데이터
  const [isOpenPlaceList, setIsOpenPlaceList] = useState(
    Array(selectedPlaceList.length).fill(false),
  ); //장소 배열을 만들고 그것에 대한 값을 false로 변경
  const [isOpenMemoList, setisOpenMemoList] = useState(
    Array(memoList.length).fill(false),
  ); //메모 데이터를 배열로 만들고 그것에 대한 값을 false로 변경
  const dispatch = useDispatch();
  const [editedMemoIndex, setEditedMemoIndex] = useState(null);

  const combinedList = [...selectedPlaceList]; // Memo,Place 값 합침
  const handleOnClick = () => {
    alert('완료');
  };

  const handleAddText = () => {
    dispatch(open5());
  };
  const handleAddPlace = () => {
    dispatch(open6());
  };

  const handlisOpenCalender = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    // 메모 작성 모달
    dispatch(close5());
    setMemoList((prevMemoList) => [...prevMemoList, memo]);
    setIsMemo('');
  };
  const handleClosemodal2 = () => {
    // 장소 작성 모달
    dispatch(close6());
  };
  const handleRemoveSelectedPlace = (indexToRemove: number) => {
    // 장소 제거 함수
    // selectedPlaceList 배열에서 indexToRemove에 해당하는 요소를 제외한 새로운 배열을 생성
    const updatedSelectedPlaceList = selectedPlaceList.filter(
      (_: any, index: number) => index !== indexToRemove,
    );

    // 새로운 배열을 상태로 설정
    dispatch(setPlaceList(updatedSelectedPlaceList));
    // 삭제 후 배열 상태 업데이트
    const changedSelectedPlaceList = isOpenPlaceList.filter(
      (_: any, index: number) => index !== indexToRemove,
    );
    setIsOpenPlaceList(changedSelectedPlaceList);
  };

  const handleRerollSelectedPlace = (index: number) => {
    // 취소버튼 클릭 시 ℹ 버튼으로 돌아오는 함수
    const updatedIsOpenList = [...isOpenPlaceList];
    updatedIsOpenList[index] = false;
    setIsOpenPlaceList(updatedIsOpenList);
  };
  const handleIsopen2 = (item: any, index: number) => {
    // 삭제버튼 클릭 시 삭제하는 함수
    const updatedIsOpenList = [...isOpenPlaceList];
    updatedIsOpenList[index] = !updatedIsOpenList[index];
    setIsOpenPlaceList(updatedIsOpenList);
  };
  const handeIsopenMemo = (index: any) => {
    const updateMemoList = [...isOpenMemoList];
    updateMemoList[index] = !updateMemoList[index];
    setisOpenMemoList(updateMemoList);
  };
  const handleDeletMemo = (indexToRemove: number) => {
    // 메모 제거 함수
    // selectedPlaceList 배열에서 indexToRemove에 해당하는 요소를 제외한 새로운 배열을 생성
    const updatedSelectedMemoList = memoList.filter(
      (_: any, index: number) => index !== indexToRemove,
    );

    // 새로운 배열을 상태로 설정
    setMemoList(updatedSelectedMemoList);
    // 삭제 후 배열 상태 업데이트
    const changedSelectedMemoList = isOpenPlaceList.filter(
      (_: any, index: number) => index !== indexToRemove,
    );
    setisOpenMemoList(changedSelectedMemoList);
  };
  const handleRerollMemoSelectedPlace = (index: number) => {
    const updateMemoList = [...isOpenMemoList];
    updateMemoList[index] = !updateMemoList[index];
    setisOpenMemoList(updateMemoList);
  };
  const handelIsChangeText = (index: number) => {
    setIsChangeMemo(true);
    setEditedMemoIndex(index);
    setIsMemo(memoList[index]);
  };
  const handelChangeText = () => {
    // Memo 수정하기
    if (memo.trim() !== '') {
      if (editedMemoIndex !== null) {
        // 수정 중이라면 수정된 메모로 업데이트
        setMemoList((prevMemoList) =>
          prevMemoList.map((item, index) =>
            index === editedMemoIndex ? memo : item,
          ),
        );
        setEditedMemoIndex(null);
      } else {
        // 새로운 메모를 추가하는 경우
        setMemoList((prevMemoList) => [...prevMemoList, memo]);
      }
    }
    setIsMemo('');
    setIsChangeMemo(false);
  };

  // 지도 그리기
  // useEffect(() => {
  //   const mapContainer = document.getElementById('map');
  //   const mapOption = {
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표 설정
  //     level: 3,
  //   };
  //   const map = new window.kakao.maps.Map(mapContainer, mapOption);
  //   setMap(map);
  // }, []);
  console.log(combinedList);
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
            <NewMemo setContents={setIsMemo} contents={memo}></NewMemo>
          </AddMemoModal>
        ) : null}
        {isPlaceOpen ? (
          <AddPlaceModal onClick={handleClosemodal2}>
            <AddPlace></AddPlace>
          </AddPlaceModal>
        ) : null}

        <StyledMarginRight />
        <StyledBlueButton onClick={handleAddPlace}>장소 추가</StyledBlueButton>
      </StyledMainContainer2>
      <StyeldMapContainer>
        <StyledMapWrap>
          {/* <div id="map" style={{ width: '100%', height: '100%' }}></div> */}
        </StyledMapWrap>
        <StyledListWrap>
          {selectedPlaceList &&
            selectedPlaceList.map((item: any, index: number) => (
              <Place key={`place-${index}`}>
                {item}
                {isOpenPlaceList[index] ? (
                  <>
                    <button onClick={() => handleRemoveSelectedPlace(index)}>
                      삭제
                    </button>
                    <button onClick={() => handleRerollSelectedPlace(index)}>
                      취소
                    </button>
                  </>
                ) : (
                  <div
                    className="PlaceBtn"
                    onClick={() => handleIsopen2(item, index)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                )}
              </Place>
            ))}
        </StyledListWrap>
        <StyledPlaceWrap>
          {memoList.map((item: any, index: any) => (
            <Memo key={`place-${index}`}>
              {' '}
              <ListNumber>{index + 1}</ListNumber>
              <div className="List-content">
                <div dangerouslySetInnerHTML={{ __html: item }}></div>
              </div>
              <div className="List-Button">
                {isOpenMemoList[index] ? (
                  <>
                    <div className="button-container">
                      <button
                        className="modify-button"
                        onClick={() => handelIsChangeText(index)}
                      >
                        수정
                      </button>
                      {isChangeMemo ? (
                        <ChangeMemoModal onClick={() => handelChangeText()}>
                          <NewMemo
                            setContents={setIsMemo}
                            contents={memo}
                          ></NewMemo>
                        </ChangeMemoModal>
                      ) : null}
                      <div>
                        <button
                          className="delete-button"
                          onClick={() => handleDeletMemo(index)}
                        >
                          삭제
                        </button>
                        <button
                          className="reroll-button"
                          onClick={() => handleRerollMemoSelectedPlace(index)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="faEllipsisVertical"
                    onClick={() => handeIsopenMemo(index)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                )}
              </div>
            </Memo>
          ))}
        </StyledPlaceWrap>
      </StyeldMapContainer>
    </>
  );
};
