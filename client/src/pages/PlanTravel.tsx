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
import { open7, close8 } from '../redux/reducers/titleSlice';

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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2rem 0 0 2rem;
  width: 30rem;
  height: 40rem;
  right: 2rem;
  border: 1px solid black;
  border-radius: 1rem;
  flex-direction: column;

  overflow-y: auto;
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
  overflow-y: auto;
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

const ListDistance = styled.div`
  position: absolute;
  margin-top: 5rem;
  width: 5rem;
`;
const Place = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬을 위해 변경 */
  align-items: center;
  background-color: var(--gray-100);
  color: var(--black);
  width: 25rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 650;
  margin: 1rem 0 1rem 0;
  border-radius: 1.5rem;
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

const ListNumber = styled.div`
  position: relative;
  /* 아래의 스타일을 추가하여 왼쪽에 위치시킵니다. */
  margin-right: 2.75rem; /* Place와 ListNumber 사이의 간격을 조정합니다. */
  margin-left: -0.3rem; /* Place 내부에 들어가는 ListNumber를 왼쪽으로 이동시킵니다. */
  height: 100%;
  width: 12%; // 두께 조절
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.0625rem solid var(--black);
`;
const ListNumber2 = styled.div`
  position: relative;
  /* 아래의 스타일을 추가하여 왼쪽에 위치시킵니다. */
  margin-right: 3.75rem; /* Place와 ListNumber 사이의 간격을 조정합니다. */
  margin-left: -0.15rem; /* Place 내부에 들어가는 ListNumber를 왼쪽으로 이동시킵니다. */
  height: 100%;
  width: 10%; // 두께 조절
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.12rem solid var(--black);
`;
const StyledTitle = styled.input`
  border: 0.00625rem solid var(--black);
  width: 30rem;
  height: 70%;
  border-radius: 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  background-color: var(--gray-100);
  &::placeholder {
    color: var(--white);
  }
`;
const StyledTitleBtn = styled.div`
  border: 0.00325rem solid var(--black);
  width: 4.5rem;
  height: 70%;
  border-radius: 0.425rem;
  text-align: center;
  margin-left: 0.5rem;
  margin-left: -3.7rem;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ShowTitle = styled.div``;
export const PlanTravel = () => {
  const [map, setMap] = useState(null); // 지도 상태
  const [isOPen, setIsOpen] = useState(false); //Calendar 상태
  const [isChangeMemo, setIsChangeMemo] = useState(false); //수정 버튼 상태
  const [memo, setIsMemo] = useState(''); // 여행 메모 상태
  const [memoList, setMemoList] = useState([]); // 메모 항목을 저장하는 배열
  const [title, setIstitle] = useState(''); // 여행 제목 상태
  const [titleList, setIstitleList] = useState([]); // 여행 제목 상태
  const isMemoOpen = useSelector((state) => state as any).memo.memostate;
  const isPlaceOpen = useSelector((state) => state as any).place.placestate;
  const isTitleOPen = useSelector((state) => state as any).title.titlestate;
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
  const [distances, setDistances] = useState<number[]>([]); // 장소 간의 거리를 저장 할 배열
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
  const handleOpenTitle = () => {
    // 제목 입력 창 열기
    dispatch(open7());
  };
  const handleCloseTitle = () => {
    // 제목 입력 창 닫기
    dispatch(close8());
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
  // useEffect 안에서 호출하는 부분
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    setMap(map);

    if (selectedPlaceList && selectedPlaceList.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();

      selectedPlaceList.forEach((place: any, index: number) => {
        const markerPosition = new window.kakao.maps.LatLng(
          place.place_lng,
          place.place_lat,
        );

        // 각 마커에 해당하는 번호의 이미지를 사용하도록 수정
        const imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691),
          spriteOrigin: new window.kakao.maps.Point(0, index * 46), // 각 마커에 대한 스프라이트 이미지 좌표 설정
          offset: new window.kakao.maps.Point(13, 37),
        };

        const markerImage = new window.kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
          new window.kakao.maps.Size(36, 45),
          imgOptions,
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${place.place}</div>`,
        });
        infowindow.open(map, marker);
        marker.setMap(map);
        bounds.extend(markerPosition);

        map.setBounds(bounds);
      });
    }
    if (selectedPlaceList.length >= 2) {
      // 거리를 저장할 배열
      const newDistances: number[] = [];

      // 배열의 각 요소를 순회하면서 거리를 계산합니다.
      for (let i = 0; i < selectedPlaceList.length - 1; i++) {
        const place1 = selectedPlaceList[i];
        const place2 = selectedPlaceList[i + 1];

        const distance = calculateDistance(
          place1.place_lat,
          place1.place_lng,
          place2.place_lat,
          place2.place_lng,
        );

        // 계산된 거리를 배열에 추가합니다.
        newDistances.push(distance);
      }

      // 모든 거리 값을 상태로 설정합니다.
      setDistances(newDistances);
    }
  }, [selectedPlaceList]);

  // Haversine 공식을 사용하여 두 지점 사이의 거리를 구하는 함수
  function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 사이의 거리 (단위: km)
    return distance;
  }

  // 각도를 라디안으로 변환하는 함수
  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  // selectedPlaceList 배열의 길이가 2 이상인 경우에만 실행
  if (selectedPlaceList && selectedPlaceList.length >= 2) {
    // 배열의 각 요소를 순회하면서 인접한 요소들의 거리를 계산
    for (let i = 0; i < selectedPlaceList.length - 1; i++) {
      const distance = calculateDistance(
        selectedPlaceList[i].place_lat,
        selectedPlaceList[i].place_lng,
        selectedPlaceList[i + 1].place_lat,
        selectedPlaceList[i + 1].place_lng,
      );
      console.log(
        `지점 ${i + 1}과 지점 ${i + 2} 사이의 거리: ${distance.toFixed(2)} km`,
      );
    }
  } else {
    console.log(
      '선택된 장소가 충분하지 않습니다. 최소한 2개의 장소가 필요합니다.',
    );
  }
  //
  return (
    <>
      <StyledMainContainer>
        <h2 className="title"> 제목:</h2>
        <div className="TitleContainer" onClick={handleOpenTitle}>
          {isTitleOPen ? (
            <TitleWrap>
              <StyledTitle
                value={title}
                onChange={(e) => setIstitle(e.target.value)}
                placeholder="여행 제목을 입력 해주세요"
              ></StyledTitle>
            </TitleWrap>
          ) : (
            <ShowTitle>{title}</ShowTitle>
          )}
        </div>
        <StyledTitleBtn onClick={handleCloseTitle}>입력</StyledTitleBtn>
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
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </StyledMapWrap>
        <StyledListWrap>
          {selectedPlaceList &&
            selectedPlaceList.map((item: any, index: number) => (
              <Place key={`place-${index}`}>
                <ListNumber>{index + 1}</ListNumber>

                {item.place}
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
                {index < selectedPlaceList.length - 1 && (
                  <ListDistance>{`${Number(distances[index]).toFixed(
                    2,
                  )}KM`}</ListDistance>
                )}
              </Place>
            ))}
        </StyledListWrap>
        <StyledPlaceWrap>
          {memoList.map((item: any, index: any) => (
            <Memo key={`place-${index}`}>
              {' '}
              <ListNumber2>{index + 1}</ListNumber2>
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
